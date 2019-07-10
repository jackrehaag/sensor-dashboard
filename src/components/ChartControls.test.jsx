import React from "react";
import ReactDOM from "react-dom";
import ChartControls from "./ChartControls";
import renderer from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";

beforeAll(() => {
  const onMetricSelection = () => {};
  const onSubmit = () => {};
  const onDateChange = () => {};
  const dateSelection = () => {};
});

test("it renders", () => {
  const component = renderer.create(
    <ChartControls dateSelection="2019-06-24" />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("callback functions are set", () => {
  const selectionMock = jest.fn();
  const submitMock = jest.fn();
  const dateChangeMock = jest.fn();

  const component = renderer.create(
    <ChartControls
      dateSelection="2019-06-24"
      metricSelection="humidity"
      onSubmit={submitMock}
      onMetricSelection={selectionMock}
      onDateChange={dateChangeMock}
    />
  );

  const root = component.root;

  test("it triggers the metric selection function on button click", () => {
    const humidityButton = root.find(
      element => element.props.value == "humidity"
    );
    humidityButton.props.onClick();
    expect(selectionMock).toHaveBeenCalled();
  });

  test("it triggers the submission callback function form submission", () => {
    const form = root.findByType("form");
    form.props.onSubmit();
    expect(submitMock).toHaveBeenCalled();
  });

  test("it triggers the date change function on updating the date", () => {
    const dateField = root.findByProps(
      element => element.props.id == "chartControlMotionDetectionButton"
    );
    dateField.props.onDateChange();
    expect(selectionMock).toHaveBeenCalled();
  });
});
