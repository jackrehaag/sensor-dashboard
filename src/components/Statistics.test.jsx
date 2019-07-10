import React from "react";
import Statistics from "./Statistics";
import renderer from "react-test-renderer";

test("it renders", () => {
  const component = renderer.create(
    <Statistics
      lastTemperature={21}
      lastHumidity={50}
      lastMotionDetection="2019-06-21 16:04:02"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
