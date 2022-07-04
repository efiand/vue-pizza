import { shallowMount } from "@vue/test-utils";
import BlockContent from "@/common/components/BlockContent";

describe("BlockContent", () => {
  const slots = { default: "Content" };
  const propsData = {
    title: "Title",
  };
  const stubs = ["BlockHeading"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockContent, { ...options, stubs, propsData });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".content").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Title is slot of BlockHeading", () => {
    createComponent();
    const headingWrapper = wrapper.find("blockheading-stub");
    expect(headingWrapper.html()).toContain(propsData.title);
  });
});
