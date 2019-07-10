import React from "react";
import StatisticsChart from "./StatisticsChart";
import renderer from "react-test-renderer";
jest.mock("chart.js");
import Chart from "chart.js";

function createNodeMock(element) {
  if (element.type === "canvas") {
    return {
      getContext() {
        return {};
      }
    };
  }
}

describe("default chart", () => {
  const chartName = "snapshot chart";
  const component = renderer.create(
    <StatisticsChart name={chartName} data={[{ x: 123, y: 456 }]} />,
    {
      createNodeMock
    }
  );
  const tree = component.toJSON();

  test("it renders", () => {
    expect(tree).toMatchSnapshot();
  });

  test("it calls chart.js with the correct config", () => {
    expect(Chart.mock.calls).toMatchSnapshot();
  });
});
