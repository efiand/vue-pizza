import { shallowMount } from "@vue/test-utils";
import BlockInput from "@/common/components/BlockInput";

describe("BlockInput", () => {
  const propsData = {
    label: "Label",
    name: "name",
    value: "value",
  };
  const defaultType = "text";
  const testType = "tel";
  const testValue = "test";
  const testPlaceholder = "test placeholder";
  const bigLabelClassName = "input--big-label";
  const visuallyHiddenClassName = "visually-hidden";

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockInput, { propsData, ...options });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("label.input").exists()).toBeTruthy();
  });

  it("It sets the initial model value", () => {
    createComponent();
    expect(wrapper.find("input").element.value).toBe(propsData.value);
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
    inputWrapper.element.value = testValue;
    await inputWrapper.trigger("input");
    expect(wrapper.emitted().input[0][0]).toEqual(testValue);
  });

  it("Input name is prop name", () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("name")).toBe(propsData.name);
  });

  it("Input label is prop label", () => {
    createComponent();
    const labelWrapper = wrapper.find("span");
    expect(labelWrapper.html()).toContain(propsData.label);
  });

  it("Input type is default type", () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("type")).toBe(defaultType);
  });

  it("Input placeholder is empty string", () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("placeholder")).toBe("");
  });

  it("Input is not readonly", () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("readonly")).toBeUndefined();
  });

  it("Input is not required", () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("required")).toBeUndefined();
  });

  it("Input has not big label", () => {
    createComponent();
    expect(wrapper.classes()).not.toContain(bigLabelClassName);
  });

  it("Label is not visually hidden", () => {
    createComponent();
    const labelWrapper = wrapper.find("span");
    expect(labelWrapper.classes()).not.toContain(visuallyHiddenClassName);
  });

  it("Input type is prop type when prop added", () => {
    createComponent({ propsData: { ...propsData, type: testType } });
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("type")).toBe(testType);
  });

  it("Input placeholder is prop placeholder when prop added", () => {
    createComponent({
      propsData: { ...propsData, placeholder: testPlaceholder },
    });
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("placeholder")).toBe(testPlaceholder);
  });

  it("Input is readonly when prop added", () => {
    createComponent({ propsData: { ...propsData, readonly: true } });
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("readonly")).toBe("readonly");
  });

  it("Input is required when prop added", () => {
    createComponent({ propsData: { ...propsData, required: true } });
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("required")).toBe("required");
  });

  it("Input has big label when prop added", () => {
    createComponent({ propsData: { ...propsData, bigLabel: true } });
    expect(wrapper.classes()).toContain(bigLabelClassName);
  });

  it("Label is visually hidden when prop added", () => {
    createComponent({ propsData: { ...propsData, hideLabel: true } });
    const labelWrapper = wrapper.find("span");
    expect(labelWrapper.attributes("class")).toContain(visuallyHiddenClassName);
  });
});
