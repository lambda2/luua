import { shallow } from "enzyme";
import React from "react";

import App from "../../pages/index";

describe("Homepage", () => {
  it('App shows "Hello world" in a <h1> tag', () => {
    const app = shallow(<App />);
    expect(app.find("h1").text()).toEqual("Hello world");
  });
});
