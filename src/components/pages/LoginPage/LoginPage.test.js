import React from "react";
import { shallow } from "enzyme";
import LoginPage from "./LoginPage";
import renderer from "react-test-renderer";
import LoginForm from "../../forms/LoginForm";

describe("LoginPage component", () => {
  it("Renders an h1 with title Login Page", () => {
    const wrapper = shallow(<LoginPage />);
    const h1 = wrapper.find("h1");
    expect(h1.text()).toBe("Login Page");
  });

  it("Renders LoginForm", () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});
