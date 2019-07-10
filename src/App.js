import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Statistics from "./components/Statistics";
import ChartDisplay from "./components/ChartDisplay";
import Menu from "./components/Menu";

function App() {
  return (
    <div>
      <Menu />
      <div className="ui container">
        <div className="ui grid">
          <div className="ui eleven wide column">
            <ChartDisplay />
          </div>
          <div className="ui five wide column">
            <Statistics
              lastTemperature={17}
              lastHumidity={27}
              lastMotionDetection={"2019-06-21 16:04:02"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
