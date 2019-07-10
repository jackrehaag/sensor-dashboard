import React from "react";
import TemperatureStat from "./TemperatureStat";
import renderer from "react-test-renderer";

describe("changing the color class based on temperature prop", () => {
  test("it sets class to blue when temperature is below 10", () => {
    const component = renderer.create(<TemperatureStat temp={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to blue when temperature is below 10 (minus value)", () => {
    const component = renderer.create(<TemperatureStat temp={-3} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to yellow when temperature is 10", () => {
    const component = renderer.create(<TemperatureStat temp={10} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to yellow when temperature is above 10", () => {
    const component = renderer.create(<TemperatureStat temp={11} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to orange when temperature is 20", () => {
    const component = renderer.create(<TemperatureStat temp={20} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to orange when temperature is above 20", () => {
    const component = renderer.create(<TemperatureStat temp={22} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to red when temperature is 30", () => {
    const component = renderer.create(<TemperatureStat temp={30} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to red when temperature is above 30", () => {
    const component = renderer.create(<TemperatureStat temp={35} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("it sets class to black when temperature is NaN", () => {
    const component = renderer.create(<TemperatureStat temp={"NaN"} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
