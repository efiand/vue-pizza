import { shallowMount } from "@vue/test-utils";
import BaseHeading from "@/common/components/BaseHeading";

describe("BaseHeading", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BaseHeading, options);
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("h1.heading").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
