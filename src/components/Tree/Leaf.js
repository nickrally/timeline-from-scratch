import React from "react";
import "./Tree.css";

const Leaf = ({ item, hasChildren, level, onSelected, selected }) => {
  const projectOid = item.Project.ObjectID;
  const shortref = item._ref.split("v2.0")[1];
  const start = item.PlannedStartDate.split("T")[0];
  const end = item.PlannedEndDate.split("T")[0];
  const name = item.Name;
  const fid = item.FormattedID;
  const color = item.DisplayColor;
  const title = `${shortref}*${start}=${end}~${color}`;

  const constructUrl = () => {
    const baseUrl = "https://rally1.rallydev.com/#";
    return `${baseUrl}/${projectOid}/portfolioitemstreegrid?detail=${shortref}`;
  };

  return (
    <div
      style={{
        paddingLeft: `${level * 16}px`,
        border: "1px solid #717D7E",
        paddingBottom: "3px",
        paddingTop: "3px",
      }}
      className="title"
    >
      <span style={{ fontSize: "109.25%", color: "#D3D3D3" }}>
        <a href={constructUrl()} target="_blank">
          {fid}
        </a>{" "}
        {name}
      </span>
      <span style={{ fontSize: "0%" }}>{title}</span>
      {hasChildren && (
        <span
          className={!selected ? "arrow" : "arrow-down"}
          onClick={onSelected}
        ></span>
      )}
    </div>
  );
};

export default Leaf;
