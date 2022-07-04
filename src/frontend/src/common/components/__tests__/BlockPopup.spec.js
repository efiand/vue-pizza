import { shallowMount } from "@vue/test-utils";
import BlockPopup from "@/common/components/BlockPopup";

describe("BlockPopup", () => {
  const slots = { default: "Popup content" };
  const stubs = ["BlockClose"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockPopup, { ...options, stubs });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".popup").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Raises the close event on close", () => {
    createComponent();
    wrapper.find("blockclose-stub").vm.$emit("close");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
