import { shallowMount } from "@vue/test-utils";
import BaseSheet from "@/common/components/BaseSheet";

describe("BaseSheet", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BaseSheet, {
      stubs: ["BaseSubheading"],
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".sheet").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("BaseSubheading does not exists when title is not exists", async () => {
    createComponent();
    expect(wrapper.find("basesubheading-stub").exists()).toBeFalsy();

    const title = "Title";
    await wrapper.setProps({ title });
    expect(wrapper.find("basesubheading-stub").text()).toStrictEqual(title);
  });
});
