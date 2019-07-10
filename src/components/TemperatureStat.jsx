import React from "react";

const TemperatureStat = ({ temp }) => {
  let color;
  if (temp < 10) {
    color = "blue";
  } else if (temp >= 10 && temp < 20) {
    color = "yellow";
  } else if (temp >= 20 && temp < 30) {
    color = "orange";
  } else if (temp >= 30) {
    color = "red";
  } else {
    color = "black";
  }
  return (
    <div className={color + " current-temp statistic"}>
      <div className="value">{temp}°C</div>
      <div className="label">
        Temperature <i className="thermometer half icon" />
      </div>
    </div>
  );
};

export default TemperatureStat;
