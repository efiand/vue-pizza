import { shallowMount } from "@vue/test-utils";
import BaseSubheading from "@/common/components/BaseSubheading";

describe("BaseSubheading", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BaseSubheading, options);
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("h2.subheading").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
