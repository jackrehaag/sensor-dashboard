import React from "react";

const HumidityStat = ({ humidity }) => {
  return (
    <div className="teal current-temp statistic">
      <div className="value">{humidity}%</div>
      <div className="label">
        Humidity <i className="tint icon" />
      </div>
    </div>
  );
};

export default HumidityStat;
