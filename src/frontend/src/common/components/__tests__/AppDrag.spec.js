import { shallowMount } from "@vue/test-utils";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag", () => {
  const DEFAULT_PROPS = {
    transferData: { test: true },
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(AppDrag, {
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(`[data-test="AppDrag"]`).exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Wrapper is draggable by default but is not draggable with prop", async () => {
    createComponent();
    expect(wrapper.attributes("draggable")).toStrictEqual("true");

    await wrapper.setProps({ draggable: false });
    expect(wrapper.attributes("draggable")).toStrictEqual("false");
  });

  it("Transfer data after start drag", async () => {
    const transferData = { test: true };
    createComponent({
      propsData: { transferData },
    });
    const eventStub = {
      dataTransfer: {
        data: {},
        setData(key, value) {
          this.data[key] = value;
        },
      },
    };

    const spyOnDrag = jest.spyOn(wrapper.vm, "onDrag");

    await wrapper.trigger("dragstart", eventStub);

    expect(spyOnDrag).toHaveBeenCalled();
    expect(
      JSON.parse(eventStub.dataTransfer.data[DATA_TRANSFER_PAYLOAD])
    ).toEqual(transferData);
  });
});
