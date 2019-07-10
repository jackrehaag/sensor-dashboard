import React from "react";
import Chart from "chart.js";

class StatisticsChart extends React.Component {
  state = {};
  chartRef = React.createRef();

  componentDidMount() {
    this.context = this.chartRef.current.getContext("2d");
    this.myChart = new Chart(this.context, {
      type: "line",
      data: {
        xAxisID: "time",
        yAxisID: "value",
        datasets: [
          {
            label: this.props.name,
            data: this.props.data,
            backgroundColor: ["rgba(97, 186, 255, 0.2)"],
            borderColor: ["rgba(97, 186, 255, 1)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        elements: {
          line: {
            tension: 0 // disables bezier curves
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              id: "time",
              type: "time"
            }
          ]
        }
      }
    });
  }

  componentDidUpdate() {
    if (this.props.data) {
      this.myChart.data.datasets[0].data = this.props.data;
      this.myChart.update();
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} width="400" height="270" />
      </div>
    );
  }
}

export default StatisticsChart;
