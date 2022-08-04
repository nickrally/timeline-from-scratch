import React, { useState, useCallback } from "react";
import { ViewModelContextProvider } from "../context/ViewModelContext";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./Toolbar/TimelineToolbar";
import DatesHeader from "./DatesHeader";
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
    <>
      <ViewModelContextProvider>
        <div className="wrapper">
          <div className="toolbar">
            <TimelineToolbar
              selectedPiType={selectedPiType}
              setSelectedPiType={setSelectedPiType}
            />
          </div>
          <div className="tree">
            <div className="header"></div>
            <Tree setBars={setBars} selectedPiType={selectedPiType} />
          </div>
          <div className="timeline">
            <DatesHeader />
            <Timeline bars={bars} />
          </div>
        </div>
      </ViewModelContextProvider>
      <div className="footer">&nbsp;</div>
    </>
  );
}

export default App;
