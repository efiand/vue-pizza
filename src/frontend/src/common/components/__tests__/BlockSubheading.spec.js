import { shallowMount } from "@vue/test-utils";
import BlockSubheading from "@/common/components/BlockSubheading";

describe("BlockSubheading", () => {
  const slots = { default: "Subheading" };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockSubheading, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("h2.subheading").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
