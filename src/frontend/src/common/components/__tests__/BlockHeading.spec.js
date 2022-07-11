import { shallowMount } from "@vue/test-utils";
import BlockHeading from "@/common/components/BlockHeading";

describe("BlockHeading", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BlockHeading, options);
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
