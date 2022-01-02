import { useState } from "react";
import Connections from "./components/Connections";
import "./App.css";

const App: React.FC = () => {
  const [filter, setFilter]: [string, (filter: string) => void] =
    useState("all");

  const handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter(e.target.value);
  };

  return (
    <div className="App">
      <div className="header">
        <h2>Connections</h2>
        <select value={filter} onChange={(e) => handleSelect(e)}>
          <option value="">Select activity</option>
          <option value="all">All</option>
          <option value="connected">Connected</option>
          <option value="disconnected">Disconnected</option>
        </select>
      </div>

      <Connections activity={filter}/>
    </div>
  );
};

export default App;
