import { shallowMount } from "@vue/test-utils";
import BlockSubheading from "@/common/components/BlockSubheading";

describe("BlockSubheading", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockSubheading, options);
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
