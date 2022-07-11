import { shallowMount } from "@vue/test-utils";
import BlockInput from "@/common/components/BlockInput";

describe("BlockInput", () => {
  const DEFAULT_PROPS = {
    label: "Test",
    name: "Test",
    value: "Test",
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(BlockInput, {
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("label.input").exists()).toBeTruthy();
  });

  it("It sets the initial model value", () => {
    const value = "Test";
    createComponent({ propsData: { value } });
    expect(wrapper.find("input").element.value).toBe(value);
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
    const testValue = "Test";
    inputWrapper.element.value = testValue;

    await inputWrapper.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual(testValue);
  });

  it("Input name is prop name", () => {
    const name = "Test";
    createComponent({ propsData: { name } });

    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("name")).toBe(name);
  });

  it("Input label is prop label", () => {
    const label = "Test";
    createComponent({ propsData: { label } });

    const labelWrapper = wrapper.find("span");
    expect(labelWrapper.html()).toContain(label);
  });

  it("Input type is default type but is prop type when prop added", async () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("type")).toBe("text");

    const type = "tel";
    await wrapper.setProps({ type });
    expect(inputWrapper.attributes("type")).toBe(type);
  });

  it("Input placeholder is empty string but is prop placeholder when prop added", async () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("placeholder")).toBe("");

    const placeholder = "Test";
    await wrapper.setProps({ placeholder });
    expect(inputWrapper.attributes("placeholder")).toBe(placeholder);
  });

  it("Input is readonly when prop added", async () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("readonly")).toBeUndefined();

    await wrapper.setProps({ readonly: true });
    expect(inputWrapper.attributes("readonly")).toBe("readonly");
  });

  it("Input is required when prop added", async () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("required")).toBeUndefined();

    await wrapper.setProps({ required: true });
    expect(inputWrapper.attributes("required")).toBe("required");
  });

  it("Input has big label when prop added", async () => {
    const bigLabelClassName = "input--big-label";
    createComponent();
    expect(wrapper.classes()).not.toContain(bigLabelClassName);

    await wrapper.setProps({ bigLabel: true });
    expect(wrapper.classes()).toContain(bigLabelClassName);
  });

  it("Label is visually hidden when prop added", async () => {
    const visuallyHiddenClassName = "visually-hidden";
    createComponent();

    const labelWrapper = wrapper.find("span");
    expect(labelWrapper.classes()).not.toContain(visuallyHiddenClassName);

    await wrapper.setProps({ hideLabel: true });
    expect(labelWrapper.attributes("class")).toContain(visuallyHiddenClassName);
  });
});
