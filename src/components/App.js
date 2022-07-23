import React, { useState, useCallback } from "react";
import { ViewModelContextProvider } from "../context/ViewModelContext";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./TimelineToolbar";
import "./App.css";

function App() {
  const [bars, setBars] = useState(null);
  return (
    <ViewModelContextProvider>
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
    </ViewModelContextProvider>
  );
}

export default App;
