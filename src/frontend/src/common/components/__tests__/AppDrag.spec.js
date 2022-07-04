import { shallowMount } from "@vue/test-utils";
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag", () => {
  let wrapper;
  const propsData = {
    transferData: { test: true },
  };
  const slots = { default: "Test" };

  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, {
      propsData,
      ...options,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(`[data-test="AppDrag"]`).exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Wrapper is draggable by default", () => {
    createComponent();
    expect(wrapper.attributes("draggable")).toStrictEqual("true");
  });

  it("Wrapper is not draggable with prop", () => {
    createComponent({ propsData: { ...propsData, draggable: false } });
    expect(wrapper.attributes("draggable")).toStrictEqual("false");
  });

  it("Transfer data after start drag", async () => {
    createComponent();
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
    ).toEqual(propsData.transferData);
  });
});
