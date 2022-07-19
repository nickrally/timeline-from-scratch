import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { QueryClientProvider, QueryClient } from "react-query";
import { DataContextProvider } from "../src/context/DataContextProvider";
import { ViewModelContextProvider } from "../src/context/ViewModelContext";

const queryClient = new QueryClient();

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ViewModelContextProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </ViewModelContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
