import React from "react";
import ChartControls from "./ChartControls";
import StatisticsChart from "./StatisticsChart";
import getData from "../services/readings-api";

const defaultDate = "2019-07-02";
const defaultMetric = "temperature";

class ChartDisplay extends React.Component {
  state = { dateSelection: defaultDate, metricSelection: defaultMetric };

  fetchNewData = async () => {
    const data = await getData(
      this.state.metricSelection,
      this.state.dateSelection
    );
    this.setState({
      data: data
    });
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
    this.fetchNewData();
  }

  onMetricSelection = e => {
    e.preventDefault();
    this.setState({ metricSelection: e.target.value }, this.fetchNewData);
  };

  render() {
    return (
      <div className="ui column">
        <ChartControls
          onDateChange={this.onDateChange}
          onSubmit={this.onDateSubmit}
          dateSelection={this.state.dateSelection}
          onMetricSelection={this.onMetricSelection}
        />
        <StatisticsChart name="Humidity percentage" data={this.state.data} />
      </div>
    );
  }
}

export default ChartDisplay;
