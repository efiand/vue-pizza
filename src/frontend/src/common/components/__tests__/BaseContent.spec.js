import { shallowMount } from "@vue/test-utils";
import BaseContent from "@/common/components/BaseContent";

describe("BaseContent", () => {
  const DEFAULT_PROPS = {
    title: "Test",
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(BaseContent, {
      stubs: ["BaseHeading"],
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

  it("Title is slot of BaseHeading", () => {
    const title = "Test";
    createComponent({
      propsData: { title },
    });
    const headingWrapper = wrapper.find("baseheading-stub");
    expect(headingWrapper.html()).toContain(title);
  });
});
