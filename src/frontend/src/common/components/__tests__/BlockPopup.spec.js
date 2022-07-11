import { shallowMount } from "@vue/test-utils";
import BlockPopup from "@/common/components/BlockPopup";

describe("BlockPopup", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BlockPopup, {
      stubs: ["BlockClose"],
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
    wrapper.find("blockclose-stub").vm.$emit("close");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
