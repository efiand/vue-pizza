import { shallowMount } from "@vue/test-utils";
import BlockButton from "@/common/components/BlockButton";

describe("BlockButton", () => {
  const slots = { default: "My button" };
  const defaultBtnType = "button";
  const listeners = { click: null };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockButton, options);
  };

  beforeEach(() => {
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("button.button").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Raises the click event on click", async () => {
    createComponent({ listeners });
    await wrapper.find("button").trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });

  it("Button type is button", () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe(defaultBtnType);
  });

  it("Button type is submit after adding prop", () => {
    const type = "submit";
    createComponent({
      propsData: {
        type,
      },
    });
    expect(wrapper.attributes("type")).toBe(type);
  });

  it("Button is not disabled", () => {
    createComponent();
    expect(wrapper.attributes("disabled")).toBeUndefined();
  });

  it("Button is disabled after adding prop", () => {
    createComponent({
      propsData: {
        disabled: true,
      },
    });
    expect(wrapper.attributes("disabled")).toBeTruthy();
  });

  it("Button has one class .button by default", () => {
    createComponent();
    expect(wrapper.attributes("class")).toStrictEqual("button");
  });

  it("Button has three class after adding props", () => {
    const classes = ["button", "button--bordered", "button--transparent"];
    createComponent({
      propsData: {
        bordered: true,
        transparent: true,
      },
    });
    expect(wrapper.classes()).toEqual(classes);
  });
});
