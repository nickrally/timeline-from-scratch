import React from "react";
import Tree from "./Tree/Tree";
import Timeline from "./Timeline/Timeline";
import TimelineToolbar from "./TimelineToolbar";
import { useDataContext } from "../context/DataContextProvider";
import "./App.css";

function App() {
  const [data, error, isLoading, isFetching, isError] = useDataContext();
  return (
    <div className="wrapper">
      <div className="toolbar">
        <TimelineToolbar />
      </div>
      <div className="tree">
        <Tree />
      </div>
      <div className="timeline">
        {data && data.QueryResult && data.QueryResult.Results && (
          <Timeline rows={data.QueryResult.Results} />
        )}
      </div>
    </div>
  );
}

export default App;
