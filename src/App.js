import React from "react";
import Statistics from "./components/Statistics";
import ChartDisplay from "./components/ChartDisplay";

function App() {
  return (
    <div>
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
