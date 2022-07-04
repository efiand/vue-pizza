import { shallowMount } from "@vue/test-utils";
import BlockHeading from "@/common/components/BlockHeading";

describe("BlockHeading", () => {
  const slots = { default: "Heading" };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockHeading, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("h1.heading").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
