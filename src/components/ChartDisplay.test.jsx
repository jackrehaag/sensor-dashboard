import React from "react";
import ChartDisplay from "./ChartDisplay";
import renderer from "react-test-renderer";
jest.mock("chart.js");
jest.mock("./StatisticsChart");
import StatisticsChart from "./StatisticsChart";
jest.mock("../services/readings-api");
import Chart from "chart.js";
import Enzyme from "enzyme";
import getData from "../services/readings-api";

jest.mock("../services/readings-api", () => ({
  __esModule: true,
  default: jest.fn((metric, date) => {
    return new Promise((resolve, reject) => {
      if (metric == "temperature") {
        resolve([{ x: 1, y: 2 }]);
      } else if (metric == "humidity") {
        resolve([{ x: 3, y: 4 }]);
      } else if (metric == "motion_detection") {
        resolve([{ x: 5, y: 6 }]);
      } else {
        resolve([{ x: 0, y: 0 }]);
      }
    });
  })
}));

function createNodeMock(element) {
  if (element.type === "canvas") {
    return {
      getContext() {
        return {};
      }
    };
  }
}

test("it renders", () => {
  const component = renderer.create(<ChartDisplay />, { createNodeMock });
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("interface functionality", () => {
  beforeEach(() => {
    getData.mockClear();
  });

  const component = Enzyme.mount(<ChartDisplay />, {
    disableLifestyleMethods: true
  });
  const temperatureButton = component.find('[value="temperature"]');
  const humidityButton = component.find('[value="humidity"]');
  const motionDetectionButton = component.find('[value="motion_detection"]');
  const dateInput = component.find("#chartControlDateField");
  const submitButton = component.find("button#chartControlSubmitButton");

  test("it updates the state when the temperature button is clicked", () => {
    temperatureButton.simulate("click");
    expect(component.state()).toEqual({
      activeData: [{ x: 1, y: 2 }],
      dateSelection: "2019-07-02",
      metricSelection: "temperature",
      temperatureData: [{ x: 1, y: 2 }],
      humidityData: [{ x: 3, y: 4 }],
      motionDetectionData: [{ x: 5, y: 6 }]
    });
  });

  test("it updates the state when the humidity button is clicked", () => {
    humidityButton.simulate("click");
    expect(component.state()).toEqual({
      activeData: [{ x: 3, y: 4 }],
      dateSelection: "2019-07-02",
      metricSelection: "humidity",
      temperatureData: [{ x: 1, y: 2 }],
      humidityData: [{ x: 3, y: 4 }],
      motionDetectionData: [{ x: 5, y: 6 }]
    });
  });

  test("it updates the state when the motion detection button is clicked", () => {
    motionDetectionButton.simulate("click");
    expect(component.state()).toEqual({
      activeData: [{ x: 5, y: 6 }],
      dateSelection: "2019-07-02",
      metricSelection: "motion_detection",
      temperatureData: [{ x: 1, y: 2 }],
      humidityData: [{ x: 3, y: 4 }],
      motionDetectionData: [{ x: 5, y: 6 }]
    });
  });

  test("it updates the state when the date is changed", () => {
    dateInput.simulate("change", { target: { value: "2019-07-03" } });
    expect(component.state()).toEqual({
      activeData: [{ x: 5, y: 6 }],
      dateSelection: "2019-07-03",
      metricSelection: "motion_detection",
      temperatureData: [{ x: 1, y: 2 }],
      humidityData: [{ x: 3, y: 4 }],
      motionDetectionData: [{ x: 5, y: 6 }]
    });
  });

  test("it sends a request when the submit button is pressed", () => {
    submitButton.simulate("submit");
    expect(getData.mock.calls).toEqual([
      ["temperature", "2019-07-03"],
      ["humidity", "2019-07-03"],
      ["motion_detection", "2019-07-03"]
    ]);
  });

  test("it sets the correct data set as activeData", () => {
    humidityButton.simulate("click");
    component.update();
    submitButton.simulate("submit");

    expect(component.state()).toEqual({
      activeData: [{ x: 3, y: 4 }],
      dateSelection: "2019-07-03",
      metricSelection: "humidity",
      temperatureData: [{ x: 1, y: 2 }],
      humidityData: [{ x: 3, y: 4 }],
      motionDetectionData: [{ x: 5, y: 6 }]
    });
  });
});
