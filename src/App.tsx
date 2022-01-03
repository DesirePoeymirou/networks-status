import { useState } from "react";
import Connections from "./components/Connections";
import "./App.css";

const App: React.FC = () => {
  const [filter, setFilter]: [string, (filter: string) => void] =
    useState("");

  const handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter(e.target.value);
  };

  return (
    <div className="App">
      <div className="header">
        <div>Connections</div>
        <select value={filter} onChange={(e) => handleSelect(e)}>
          <option disabled selected>Select activity</option>
          <option value="all">All</option>
          <option value="connected">Connected</option>
          <option value="disconnected">Disconnected</option>
        </select>
      </div>
      <main>
        <Connections activity={filter} />
      </main>
    </div>
  );
};

export default App;
