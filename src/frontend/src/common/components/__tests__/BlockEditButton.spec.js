import { shallowMount } from "@vue/test-utils";
import BlockEditButton from "@/common/components/BlockEditButton";

describe("BlockEditButton", () => {
  const slots = { default: "My button" };
  const defaultBtnType = "button";
  const propsData = {
    type: "submit",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockEditButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("button.edit").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    const textWrapper = wrapper.find("span.visually-hidden");
    expect(textWrapper.html()).toContain(slots.default);
  });

  it("Raises the click event on click", async () => {
    createComponent();

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("Button type is button", () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe(defaultBtnType);
  });

  it("Button type is submit after adding prop", () => {
    createComponent({
      propsData,
    });
    expect(wrapper.attributes("type")).toBe(propsData.type);
  });
});
