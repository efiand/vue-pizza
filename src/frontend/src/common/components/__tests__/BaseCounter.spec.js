import { shallowMount } from "@vue/test-utils";
import BaseCounter from "@/common/components/BaseCounter";

describe("BaseCounter", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BaseCounter, options);
  };

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".counter").exists()).toBeTruthy();
  });

  it("It sets the initial model value", () => {
    const value = 0;
    createComponent({
      propsData: {
        value,
      },
    });

    expect(+wrapper.find("input").element.value).toBe(value);
  });

  it("It emits an input event when typing", async () => {
    createComponent();

    const inputWrapper = wrapper.find("input");
    await inputWrapper.trigger("input");

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("Emits the current input value when typing", async () => {
    createComponent();

    const inputWrapper = wrapper.find("input");
    inputWrapper.element.value = "2";

    await inputWrapper.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(2);
  });

  it("The click on the plus button increase value", async () => {
    createComponent();

    await wrapper.find(".counter__button--plus").trigger("click");

    expect(wrapper.emitted().input[0][0]).toEqual(1);
  });

  it("The click on the minus button decrease value", async () => {
    createComponent({
      propsData: {
        value: 1,
      },
    });

    await wrapper.find(".counter__button--minus").trigger("click");

    expect(wrapper.emitted().input[0][0]).toEqual(0);
  });

  it("The minus button is disabled when value is zero", () => {
    createComponent();

    expect(wrapper.find(".counter__button--minus").attributes("disabled")).toBe(
      "disabled"
    );
  });

  it("The plus button is disabled when value is max", () => {
    createComponent({ propsData: { value: 3, max: 3 } });

    expect(wrapper.find(".counter__button--plus").attributes("disabled")).toBe(
      "disabled"
    );
  });

  it("If typed value is greater than max, value and max are equal", async () => {
    const max = 3;
    createComponent({ propsData: { max } });

    const inputWrapper = wrapper.find("input");

    inputWrapper.element.value = "4";
    await inputWrapper.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(max);
  });

  it("If typed value is less than 0, value is 0", async () => {
    createComponent();

    const inputWrapper = wrapper.find("input");

    inputWrapper.element.value = "-4";
    await inputWrapper.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(0);
  });

  it("If typed value is not a number, value is 0", async () => {
    createComponent();

    const input = wrapper.find("input");

    input.element.value = "test";
    await input.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(0);
  });

  it("The plus button has secondary class when prop passed", async () => {
    const secondaryClassName = "counter__button--secondary";
    createComponent();

    const buttonWrapper = wrapper.find(".counter__button--plus");
    expect(buttonWrapper.classes()).not.toContain(secondaryClassName);

    await wrapper.setProps({ secondaryStyle: true });
    expect(buttonWrapper.classes()).toContain(secondaryClassName);
  });
});
