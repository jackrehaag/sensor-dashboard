import React from "react";
import ChartDisplay from "./ChartDisplay";
import renderer from "react-test-renderer";
jest.mock("chart.js");
jest.mock("../services/readings-api");
import Chart from "chart.js";
import getData from "../services/readings-api";
import Enzyme from "enzyme";

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
  const component = renderer.create(<ChartDisplay />, {
    createNodeMock
  });
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("interface functionality", () => {
  const component = Enzyme.mount(<ChartDisplay />);
  component.state().dateSelection = "2019-07-02";
  component.state().metricSelection = null;

  test("it updates the state when the temperature button is clicked", () => {
    const temperatureButton = component.find('[value="temperature"]');
    temperatureButton.simulate("click");
    expect(component.state()).toEqual({
      dateSelection: "2019-07-02",
      metricSelection: "temperature"
    });
  });

  test("it updates the state when the humidity button is clicked", () => {
    const humidityButton = component.find('[value="humidity"]');
    humidityButton.simulate("click");
    expect(component.state()).toEqual({
      dateSelection: "2019-07-02",
      metricSelection: "humidity"
    });
  });

  test("it updates the state when the motion detection button is clicked", () => {
    const motionDetectionButton = component.find('[value="motion_detection"]');
    motionDetectionButton.simulate("click");
    expect(component.state()).toEqual({
      dateSelection: "2019-07-02",
      metricSelection: "motion_detection"
    });
  });

  test("it updates the state when the date is changed", () => {
    const dateInput = component.find("#chartControlDateField");
    dateInput.simulate("change", { target: { value: "2019-07-03" } });
    expect(component.state()).toEqual({
      data: undefined,
      dateSelection: "2019-07-03",
      metricSelection: "motion_detection"
    });
  });

  test("it sends a request when the submit button is pressed", () => {
    const submitButton = component.find("#chartControlDateField");
    submitButton.simulate("click");
    expect(component.state()).toEqual({
      data: undefined,
      dateSelection: "2019-07-03",
      metricSelection: "motion_detection"
    });
  });
});
