import React from "react";

const ChartControls = props => {
  return (
    <div>
      <button
        id="chartControlTemperatureButton"
        className="ui button small"
        type="button"
        value="temperature"
        onClick={props.onMetricSelection}
      >
        <i className="thermometer icon" />
        Temperature
      </button>
      <button
        id="chartControlHumidityButton"
        className="ui button small"
        type="button"
        value="humidity"
        onClick={props.onMetricSelection}
      >
        <i className="tint icon" />
        Humidity
      </button>
      <button
        id="chartControlMotionDetectionButton"
        className="ui button small"
        type="button"
        value="motion_detection"
        onClick={props.onMetricSelection}
      >
        <i className="street view icon" />
        Motion detection
      </button>
      <form
        className="ui form"
        onSubmit={props.onSubmit}
        style={{ display: "inline", padding: ".5833em .833em" }}
      >
        <div className="ui action small input">
          <input
            type="text"
            id="chartControlDateField"
            placeholder="Date"
            onChange={props.onDateChange}
            value={props.dateSelection}
          />
          <button id="chartControlSubmitButton" className="ui button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChartControls;
