import { shallowMount } from "@vue/test-utils";
import BaseSelect from "@/common/components/BaseSelect";

describe("BaseSelect", () => {
  const DEFAULT_PROPS = {
    name: "name",
    options: [
      {
        id: "1",
        name: "Test 1",
      },
      {
        id: "2",
        name: "Test 2",
      },
    ],
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(BaseSelect, {
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("select.select").exists()).toBeTruthy();
  });

  it("It select the first option", () => {
    createComponent();
    expect(wrapper.element.value).toBe("1");
  });

  it("It emits an change event when changed and add selected attribute", async () => {
    createComponent();
    wrapper.element.value = "2";
    await wrapper.trigger("change");
    expect(wrapper.emitted().input[0][0]).toBe("2");
  });

  it("Select name is prop name", () => {
    const name = "Test";
    createComponent({ propsData: { name } });

    expect(wrapper.attributes("name")).toBe(name);
  });

  it("Select option include option name", () => {
    const options = [
      {
        id: "1",
        name: "Test 1",
      },
    ];
    createComponent({ propsData: { options } });

    const optionWrapper = wrapper.find("option:nth-child(1)");
    expect(optionWrapper.html()).toContain(options[0].name);
  });
});
