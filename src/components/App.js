import React, { useState } from "react";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./TimelineToolbar";
import { DataContextProvider } from "../context/DataContext";
import "./App.css";

function App() {
  const rows = ["one", "two", "three"];
  const [nodes, setNodes] = useState([]);
  const handleNodeAdd = (items) => setNodes(items);
  return (
    <div className="wrapper">
      <div className="toolbar">
        <TimelineToolbar />
      </div>
      <div className="tree">
        <Tree handleNodeAdd={handleNodeAdd} />
      </div>
      <div className="timeline">
        <Timeline nodes={nodes} />
      </div>
    </div>
  );
}

/* function App() {
  const rows = ["one", "two", "three"];
  return (
    <DataContextProvider>
      <div className="wrapper">
        <div className="toolbar">
          <TimelineToolbar />
        </div>
        <div className="tree">
          <Tree />
        </div>
        <div className="timeline">
          <Timeline />
        </div>
      </div>
    </DataContextProvider>
  );
} */

export default App;
