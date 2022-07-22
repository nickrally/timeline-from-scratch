import React, { useState, useCallback } from "react";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./TimelineToolbar";
import "./App.css";

function App() {
  const [bars, setBars] = useState(null);
  return (
    <div className="wrapper">
      <div className="toolbar">
        <TimelineToolbar />
      </div>
      <div className="tree">
        <Tree setBars={setBars} />
      </div>
      <div className="timeline">
        <Timeline bars={bars} />
      </div>
    </div>
  );
}

export default App;
