import { shallowMount } from "@vue/test-utils";
import BasePopup from "@/common/components/BasePopup";

describe("BasePopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BasePopup, {
      stubs: ["BaseClose"],
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".popup").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Raises the close event on close", () => {
    createComponent();
    wrapper.find("baseclose-stub").vm.$emit("close");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
