import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";
import renderer from "react-test-renderer";

describe("HomePage component", () => {
  it("should render Link to Login", () => {
    const wrapper = shallow(<HomePage />);
    const Link = wrapper.find("Link");
    expect(Link.props().to).toBe("/login");
  });
});
