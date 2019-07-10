import React from "react";
import HumidityStat from "./HumidityStat";
import TemperatureStat from "./TemperatureStat";

class Statistics extends React.Component {
  render(props) {
    return (
      <div>
        <div className="ui two statistics">
          <TemperatureStat temp={this.props.lastTemperature} />
          <HumidityStat humidity={this.props.lastHumidity} />
        </div>
        <div className="ui mini center aligned grid statistics">
          <div className="ui orange statistic">
            <div className="value">{this.props.lastMotionDetection}</div>
            <div className="label">
              Last motion detection
              <i className="street view icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
