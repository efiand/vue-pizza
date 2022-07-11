import { shallowMount } from "@vue/test-utils";
import BlockSheet from "@/common/components/BlockSheet";

describe("BlockSheet", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BlockSheet, {
      stubs: ["BlockSubheading"],
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

  it("BlockSubheading does not exists when title is not exists", async () => {
    createComponent();
    expect(wrapper.find("blocksubheading-stub").exists()).toBeFalsy();

    const title = "Title";
    await wrapper.setProps({ title });
    expect(wrapper.find("blocksubheading-stub").text()).toStrictEqual(title);
  });
});
