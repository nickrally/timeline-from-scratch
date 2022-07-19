import React from "react";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./TimelineToolbar";
//import { useDataContext } from "../context/DataContextProvider";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <div className="toolbar">
        <TimelineToolbar />
      </div>
      <div className="tree">
        <Tree />
      </div>
      <div className="timeline">foo</div>
    </div>
  );
}

export default App;
