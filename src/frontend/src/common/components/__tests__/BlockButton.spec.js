import { shallowMount } from "@vue/test-utils";
import BlockButton from "@/common/components/BlockButton";

describe("BlockButton", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockButton, options);
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("button.button").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Raises the click event on click", async () => {
    createComponent();

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("Button type is button by default but is submit after adding prop", async () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe("button");

    const type = "submit";
    await wrapper.setProps({ type });
    expect(wrapper.attributes("type")).toBe(type);
  });

  it("Button is disabled after adding prop", async () => {
    createComponent();
    expect(wrapper.attributes("disabled")).toBeUndefined();

    await wrapper.setProps({ disabled: true });
    expect(Boolean(wrapper.attributes("disabled"))).toBeTruthy();
  });

  it("Button has one class .button by default but three class after adding props", async () => {
    const classes = ["button", "button--bordered", "button--transparent"];

    createComponent();
    expect(wrapper.attributes("class")).toStrictEqual(classes[0]);

    await wrapper.setProps({
      bordered: true,
      transparent: true,
    });
    expect(wrapper.classes()).toEqual(classes);
  });
});
