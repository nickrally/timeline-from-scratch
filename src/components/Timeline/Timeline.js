import React, { useState, useRef, useEffect, useCallback } from "react";
import { useContainerWidth } from "../utils/useContainerWidth";
import { useViewModelContext } from "../../context/ViewModelContext";
import { useMutation, useQueryClient } from "react-query";
import { updateItem } from "../../api/wsapi";
import "./Timeline.css";
import moment from "moment";

const Timeline = ({ bars }) => {
  const [currentBar, setCurrentBar] = useState(null);
  const { mutateAsync } = useMutation(updateItem);
  const queryClient = useQueryClient();

  const bars2 = bars?.filter((bar) => bar.startsWith("/portfolioitem/"));

  const pills = bars2?.map((bar) => {
    const ref = bar.split("*")[0];
    const datesAndColor = bar.split("*")[1];
    const dates = datesAndColor.split("~")[0];
    const color = datesAndColor.split("~")[1];
    const plannedStartDate = dates.split("=")[0];
    const plannedEndDate = dates.split("=")[1];

    return {
      plannedStartDate,
      plannedEndDate,
      color,
      ref,
    };
  });

  const { startDate, endDate, numberOfWeeks, numberOfDays } =
    useViewModelContext();
  const timelineRef = useRef();
  const width = useContainerWidth(timelineRef);
  const weekColumnWidth = width / numberOfWeeks;
  const unit = width / numberOfDays;

  const start = moment(startDate, "YYYY-MM-DD");

  const calcStartPos = (pill) => {
    const barStart = moment(pill.plannedStartDate, "YYYY-MM-DD");
    return Math.floor(moment.duration(barStart.diff(start)).asDays());
  };

  const calcPos = (pill) => {
    const barStart = moment(pill.plannedStartDate, "YYYY-MM-DD");
    const barEnd = moment(pill.plannedEndDate, "YYYY-MM-DD");
    const length = Math.floor(moment.duration(barEnd.diff(barStart)).asDays());
    return {
      start: Math.floor(moment.duration(barStart.diff(start)).asDays()),
      length: length,
    };
  };

  const onDragOver = (e) => {
    e.preventDefault();
    return false;
  };

  const handleMouseDown = (item) => {
    setCurrentBar({ ...item, ...calcPos(item) });
  };

  const handleMouseUp = (e) => {
    setCurrentBar(null);
  };

  const onDragEnd = (e) => {
    setCurrentBar(null);
  };

  useEffect(() => {
    const handleUpdate = async function (
      newPlannedStartDate,
      newPlannedEndDate
    ) {
      const lastIdx = currentBar.ref.lastIndexOf("/");
      const type = currentBar.ref.slice(1, lastIdx);
      await mutateAsync({
        ref: currentBar.ref,
        plannedstartdate: newPlannedStartDate,
        plannedenddate: newPlannedEndDate,
      });
      queryClient.invalidateQueries([type, startDate, endDate]);
      return false;
    };

    const getNewPlannedDates = (left, leftOfDropzone) => {
      const leftInt = +left.split("px")[0];
      const diffInDays = Math.floor(leftInt / unit);
      const newPlannedStartDate = moment(
        startDate.split("T")[0],
        "YYYY-MM-DD"
      ).add(currentBar.start + diffInDays, "days");
      const newPlannedEndDate = moment(
        newPlannedStartDate.toISOString().split("T"),
        "YYYY-MM-DD"
      ).add(currentBar.length, "days");
      return {
        newPlannedStartDate: newPlannedStartDate.toISOString().split("T")[0],
        newPlannedEndDate: newPlannedEndDate.toISOString().split("T")[0],
      };
    };

    const dropzone = document.getElementById("dropzone");
    const { left, right } = dropzone.getBoundingClientRect();

    const onDragStart = (event) => {
      const style = window.getComputedStyle(event.target, null);
      event.dataTransfer.setData(
        currentBar.ref,
        parseInt(style.getPropertyValue("left"), 10) - event.clientX
      );
    };

    const onDrop = (event) => {
      event.preventDefault();
      const dragItemId = `drag-${currentBar.ref}`;
      const leftOffset = event.dataTransfer.getData(currentBar.ref);
      const dm = document.getElementById(dragItemId);
      dm.style.left = event.clientX + parseInt(leftOffset, 10) + "px"; //add x coordinate of mouse to old x coordinate (left) of the bar
      const { newPlannedStartDate, newPlannedEndDate } = getNewPlannedDates(
        dm.style.left,
        left
      );
      handleUpdate(newPlannedStartDate, newPlannedEndDate);
      return false;
    };

    if (currentBar) {
      const dragItemId = `drag-${currentBar.ref}`;
      const dm = document.getElementById(dragItemId);
      dm.addEventListener("dragstart", onDragStart, false);
      const dz = document.getElementById("dropzone");
      dz.addEventListener("dragover", onDragOver, false);
      dz.addEventListener("drop", onDrop, false);
      return () => {
        dm.removeEventListener("dragstart", onDragStart, false);
        dz.removeEventListener("dragover", onDragOver, false);
        dz.removeEventListener("drop", onDrop, false);
      };
    }
  }, [currentBar]);

  return (
    <>
      <div ref={timelineRef} className="container">
        {new Array(numberOfWeeks).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={idx % 2 === 0 ? "vl vl3" : "vl"}
            style={{ right: `${(idx + 1) * weekColumnWidth}px` }}
          ></div>
        ))}
        <div id="dropzone">
          {pills?.map((pill, idx) => (
            <div className="row" key={idx}>
              <div
                style={{
                  display: "inline-block",
                  paddingLeft: `${calcPos(pill).start * unit}px`,
                  width: `${calcPos(pill).length * unit}px`,
                }}
              >
                <div
                  key={pill.id}
                  id={`drag-${pill.ref}`}
                  className="draggable"
                  draggable="true"
                  onMouseDown={() => handleMouseDown(pill)}
                  onMouseUp={(e) => handleMouseUp(e)}
                  onDragEnd={(e) => onDragEnd(e)}
                  style={{
                    backgroundColor: `${pill.color}`,
                    border: "1px solid green",
                  }}
                >
                  &nbsp;
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timeline;
