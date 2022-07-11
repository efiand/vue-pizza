import { shallowMount } from "@vue/test-utils";
import BuilderPizzaFilling from "@/modules/builder/components/BuilderPizzaFilling";

describe("BuilderPizzaFilling", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = shallowMount(BuilderPizzaFilling, {
      propsData: {
        id: 1,
        quantity: 1,
      },
    });
  };

  it("Is rendered with 1 (by default), 2, 3 images", async () => {
    createComponent();
    expect(wrapper.find(`.pizza-filling--ingredient--1`).exists()).toBeTruthy();
    expect(wrapper.find(`.pizza-filling--second`).exists()).toBeFalsy();
    expect(wrapper.find(`.pizza-filling--third`).exists()).toBeFalsy();

    await wrapper.setProps({ quantity: 2 });
    expect(wrapper.find(`.pizza-filling--second`).exists()).toBeTruthy();
    expect(wrapper.find(`.pizza-filling--third`).exists()).toBeFalsy();

    await wrapper.setProps({ quantity: 3 });
    expect(wrapper.find(`.pizza-filling--second`).exists()).toBeTruthy();
    expect(wrapper.find(`.pizza-filling--third`).exists()).toBeTruthy();
  });
});
