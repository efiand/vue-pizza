import { shallowMount } from "@vue/test-utils";
import BlockSheet from "@/common/components/BlockSheet";

describe("BlockSheet", () => {
  const slots = { default: "Sheet" };
  const stubs = ["BlockSubheading"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockSheet, { ...options, stubs });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".sheet").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("BlockSubheading does not exists when title is not exists", () => {
    createComponent();
    const subheadingWrapper = wrapper.find("blocksubheading-stub");
    expect(subheadingWrapper.element).toBeUndefined();
  });

  it("Title is slot of BlockSubheading", () => {
    const title = "Title";
    createComponent({ propsData: { title } });
    const subheadingWrapper = wrapper.find("blocksubheading-stub");
    expect(subheadingWrapper.html()).toContain(title);
  });
});
