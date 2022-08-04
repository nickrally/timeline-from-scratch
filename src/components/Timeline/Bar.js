import React from "react";

const Bar = ({ bar, onDragStart }) => {
  return (
    <div
      id={`drag-${bar.objectID}`}
      draggable="true"
      onDragStart={(e) => onDragStart(e, bar)}
      style={{
        backgroundColor: "lightgreen",
        border: "1px solid green",
      }}
    >
      &nbsp;
    </div>
  );
};

export default Bar;
