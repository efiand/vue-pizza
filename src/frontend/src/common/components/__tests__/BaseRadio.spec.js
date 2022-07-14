import { shallowMount } from "@vue/test-utils";
import BaseRadio from "@/common/components/BaseRadio";

describe("BaseRadio", () => {
  const DEFAULT_PROPS = {
    name: "Test",
    option: {
      id: "Test",
      name: "Test",
    },
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(BaseRadio, {
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("label.radio").exists()).toBeTruthy();
  });

  it("It sets the initial model value", () => {
    const option = {
      id: "Test",
      name: "Test",
    };
    createComponent({
      propsData: {
        option,
      },
    });

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.element.value).toBe(option.id);
  });

  it("It is not checked by default", () => {
    createComponent();

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("checked")).toBeUndefined();
  });

  it("It emits an change event when changed and add checked attribute", async () => {
    createComponent();

    const inputWrapper = wrapper.find("input");
    await inputWrapper.trigger("change");
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("Input name is prop name", () => {
    const name = "Test";
    createComponent({ propsData: { name } });

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("name")).toBe(name);
  });

  it("Input option include option name", () => {
    const option = {
      id: "Test",
      name: "Test",
    };
    createComponent({
      propsData: {
        option,
      },
    });

    const optionWrapper = wrapper.find("span");
    expect(optionWrapper.html()).toContain(option.name);
  });

  it("Input option include option description when prop passed", async () => {
    const option = {
      id: "Test",
      name: "Test",
      description: "Test",
    };

    createComponent();
    expect(wrapper.find("small").exists()).toBeFalsy();

    await wrapper.setProps({ option });
    expect(wrapper.find("small").html()).toContain(option.description);
  });

  it("Input include small class by default and change to big class when prop passed", async () => {
    const bigClassName = "radio__input--big";
    const smallClassName = "radio__input--small";
    createComponent();

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.classes()).toContain(smallClassName);
    expect(inputWrapper.classes()).not.toContain(bigClassName);

    await wrapper.setProps({ big: true });
    expect(inputWrapper.classes()).toContain(bigClassName);
    expect(inputWrapper.classes()).not.toContain(smallClassName);
  });

  it("Input class modifier is prop className", () => {
    const className = "test";
    createComponent({ propsData: { className } });

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.classes()).toContain("radio__input--test");
  });
});
