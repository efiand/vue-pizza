import { shallowMount } from "@vue/test-utils";
import BlockSheet from "@/common/components/BlockSheet";

describe("BlockSheet", () => {
  const slots = { default: "Sheet" };
  const stubs = ["BlockSubheading"];

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockSheet, { ...options, stubs });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".sheet").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
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
