import React from "react";
import ChartControls from "./ChartControls";
import StatisticsChart from "./StatisticsChart";
import getData from "../services/readings-api";

const TEMPERATURE_METRIC = "temperature";
const HUMIDITY_METRIC = "humidity";
const MOTION_DETECTION_METRIC = "motion_detection";

const date = new Date();
const defaultDate = date.toISOString().slice(0, 10);
const defaultMetric = TEMPERATURE_METRIC;

const metricDataSets = {
  [TEMPERATURE_METRIC]: "temperatureData",
  [HUMIDITY_METRIC]: "humidityData",
  [MOTION_DETECTION_METRIC]: "motionDetectionData"
};

class ChartDisplay extends React.Component {
  _isMounted = false;
  state = {
    activeData: [],
    dateSelection: defaultDate,
    metricSelection: defaultMetric
  };

  fetchNewData = async () => {
    let [
      temperatureData,
      humidityData,
      motionDetectionData
    ] = await Promise.all([
      getData(TEMPERATURE_METRIC, this.state.dateSelection),
      getData(HUMIDITY_METRIC, this.state.dateSelection),
      getData(MOTION_DETECTION_METRIC, this.state.dateSelection)
    ]);

    if (this._isMounted == true) {
      this.setState(
        {
          temperatureData: temperatureData,
          humidityData: humidityData,
          motionDetectionData: motionDetectionData
        },
        this.setActiveData
      );
    }
  };

  onDateChange = e => {
    e.preventDefault();
    this.setState({ dateSelection: e.target.value });
  };

  onDateSubmit = e => {
    e.preventDefault();
    this.fetchNewData();
  };

  componentDidMount() {
    this._isMounted = true;
    this.fetchNewData();
  }

  setActiveData = () => {
    if (this.state.metricSelection) {
      const dataSet = metricDataSets[this.state.metricSelection];
      if (dataSet && this.state[dataSet]) {
        this.setState({ activeData: this.state[dataSet] });
      }
    }
  };

  onMetricSelection = e => {
    e.preventDefault();
    this.setState({ metricSelection: e.target.value }, this.setActiveData);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="ui column">
        <ChartControls
          onDateChange={this.onDateChange}
          onSubmit={this.onDateSubmit}
          dateSelection={this.state.dateSelection}
          onMetricSelection={this.onMetricSelection}
        />
        <StatisticsChart
          name="Humidity percentage"
          data={this.state.activeData}
        />
      </div>
    );
  }
}

export default ChartDisplay;
