import React, { useState, useCallback } from "react";
import { ViewModelContextProvider } from "../context/ViewModelContext";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./Toolbar/TimelineToolbar";
import "./App.css";

function App() {
  const [bars, setBars] = useState(null);
  const initPi = {
    TypePath: "PortfolioItem/Feature",
    ElementName: "Feature",
    Ordinal: 0,
  };
  const [selectedPiType, setSelectedPiType] = useState(initPi);
  return (
    <ViewModelContextProvider>
      <div className="wrapper">
        <div className="toolbar">
          <TimelineToolbar
            selectedPiType={selectedPiType}
            setSelectedPiType={setSelectedPiType}
          />
        </div>
        <div className="tree">
          <Tree setBars={setBars} selectedPiType={selectedPiType} />
        </div>
        <div className="timeline">
          <Timeline bars={bars} />
        </div>
      </div>
    </ViewModelContextProvider>
  );
}

export default App;
