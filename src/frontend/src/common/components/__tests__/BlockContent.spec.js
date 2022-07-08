import { shallowMount } from "@vue/test-utils";
import BlockContent from "@/common/components/BlockContent";

describe("BlockContent", () => {
  const DEFAULT_PROPS = {
    title: "Test",
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(BlockContent, {
      stubs: ["BlockHeading"],
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".content").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Title is slot of BlockHeading", () => {
    const title = "Test";
    createComponent({
      propsData: { title },
    });
    const headingWrapper = wrapper.find("blockheading-stub");
    expect(headingWrapper.html()).toContain(title);
  });
});
