import { shallowMount } from "@vue/test-utils";
import BlockSelect from "@/common/components/BlockSelect";

describe("BlockSelect", () => {
  const propsData = {
    name: "name",
    options: [
      {
        id: "1",
        name: "Option 1 name",
      },
      {
        id: "2",
        name: "Option 2 name",
      },
    ],
  };

  let wrapper;
  const createComponent = () => {
    wrapper = shallowMount(BlockSelect, { propsData });
  };

  afterEach(() => {
    wrapper.destroy();
  });

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
    createComponent();
    expect(wrapper.attributes("name")).toBe(propsData.name);
  });

  it("Select option include option name", () => {
    createComponent();
    const optionWrapper = wrapper.find("option:nth-child(1)");
    expect(optionWrapper.html()).toContain(propsData.options[0].name);
  });
});
