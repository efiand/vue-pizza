import { shallowMount } from "@vue/test-utils";
import AppDrop from "@/common/components/AppDrop";

describe("AppDrop", () => {
  let wrapper;
  const slots = { default: "Test" };

  const createComponent = (options) => {
    wrapper = shallowMount(AppDrop, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(`[data-test="AppDrop"]`).exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("Emit data after drop", async () => {
    createComponent();
    const eventStub = {
      dataTransfer: {
        getData() {
          return `{ "test": true }`;
        },
      },
    };

    await wrapper.trigger("drop", eventStub);

    expect(wrapper.emitted().drop[0][0]).toEqual(
      JSON.parse(eventStub.dataTransfer.getData())
    );
  });
});
