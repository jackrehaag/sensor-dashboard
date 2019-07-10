import React from "react";
import HumidityStat from "./HumidityStat";
import renderer from "react-test-renderer";

test("it renders", () => {
  const component = renderer.create(<HumidityStat humidity={50} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
