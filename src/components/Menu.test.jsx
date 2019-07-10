import React from "react";
import Menu from "./Menu";
import renderer from "react-test-renderer";

test("it renders", () => {
  const component = renderer.create(<Menu />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
