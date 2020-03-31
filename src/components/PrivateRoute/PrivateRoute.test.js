import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";
import { PrivateRoute } from "./PrivateRoute";
Enzyme.configure({ adapter: new Adapter() });

describe("PrivateRoute Component", () => {
  test("PrivateRoute  Renders ", () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(wrapper.exists()).toBe(true);
  });
});
