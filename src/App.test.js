import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import renderer from "react-test-renderer";

describe("App component", () => {
  it("should render <Route />", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Route").length).toEqual(2);
  });
});
