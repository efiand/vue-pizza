import { shallowMount } from "@vue/test-utils";
import BlockCounter from "@/common/components/BlockCounter";

describe("BlockCounter", () => {
  const propsData = {
    value: 0,
    max: 3,
  };
  const secondaryClassName = "counter__button--secondary";

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockCounter, { propsData, ...options });
  };

  afterEach(() => {
    propsData.value = 0;
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".counter").exists()).toBeTruthy();
  });

  it("It sets the initial model value", () => {
    createComponent();

    expect(+wrapper.find("input").element.value).toBe(propsData.value);
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
    propsData.value++;
    createComponent();

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
    createComponent({ propsData: { ...propsData, value: propsData.max } });

    expect(wrapper.find(".counter__button--plus").attributes("disabled")).toBe(
      "disabled"
    );
  });

  it("If typed value is greater than max, value and max are equal", async () => {
    createComponent();

    const inputWrapper = wrapper.find("input");

    inputWrapper.element.value = "4";
    await inputWrapper.trigger("input");

    expect(wrapper.emitted().input[0][0]).toEqual(propsData.max);
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

  it("The plus button has not secondary class by default", () => {
    createComponent();

    const buttonWrapper = wrapper.find(".counter__button--plus");

    expect(buttonWrapper.classes()).not.toContain(secondaryClassName);
  });

  it("The plus button has secondary class when prop passed", () => {
    createComponent({ propsData: { ...propsData, secondaryStyle: true } });

    const buttonWrapper = wrapper.find(".counter__button--plus");

    expect(buttonWrapper.classes()).toContain(secondaryClassName);
  });
});
