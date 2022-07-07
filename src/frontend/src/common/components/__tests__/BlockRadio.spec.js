import { shallowMount } from "@vue/test-utils";
import BlockRadio from "@/common/components/BlockRadio";

describe("BlockRadio", () => {
  const propsData = {
    name: "name",
    option: {
      id: "option",
      name: "Option name",
    },
  };
  const bigClassName = "radio__input--big";
  const smallClassName = "radio__input--small";

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockRadio, { propsData, ...options });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("label.radio").exists()).toBeTruthy();
  });

  it("It sets the initial model value", () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.element.value).toBe(propsData.option.id);
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
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.attributes("name")).toBe(propsData.name);
  });

  it("Input option include option name", () => {
    createComponent();
    const optionWrapper = wrapper.find("span");
    expect(optionWrapper.html()).toContain(propsData.option.name);
  });

  it("Input option include option description when prop passed", async () => {
    const option = {
      id: "option",
      name: "Option name",
      description: "Description",
    };

    createComponent();
    expect(wrapper.find("small").exists()).toBeFalsy();

    await wrapper.setProps({ option });
    expect(wrapper.find("small").html()).toContain(option.description);
  });

  it("Input include small class by default and change to big class when prop passed", async () => {
    createComponent();
    const inputWrapper = wrapper.find("input");
    expect(inputWrapper.classes()).toContain(smallClassName);
    expect(inputWrapper.classes()).not.toContain(bigClassName);

    await wrapper.setProps({ big: true });
    expect(inputWrapper.classes()).toContain(bigClassName);
    expect(inputWrapper.classes()).not.toContain(smallClassName);
  });
});
