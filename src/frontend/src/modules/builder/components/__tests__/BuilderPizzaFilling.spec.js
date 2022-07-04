import { shallowMount } from "@vue/test-utils";
import BuilderPizzaFilling from "@/modules/builder/components/BuilderPizzaFilling";

describe("BuilderPizzaFilling", () => {
  let wrapper;

  const createComponent = (quantity = 1) => {
    wrapper = shallowMount(BuilderPizzaFilling, {
      propsData: {
        id: 1,
        quantity,
      },
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered with 1 image by default", () => {
    createComponent();
    expect(wrapper.find(`.pizza-filling--ingredient--1`).exists()).toBeTruthy();
    expect(wrapper.find(`.pizza-filling--second`).exists()).toBeFalsy();
    expect(wrapper.find(`.pizza-filling--third`).exists()).toBeFalsy();
  });

  it("Is rendered with 2 images", () => {
    createComponent(2);
    expect(wrapper.find(`.pizza-filling--second`).exists()).toBeTruthy();
    expect(wrapper.find(`.pizza-filling--third`).exists()).toBeFalsy();
  });

  it("Is rendered with 3 images", () => {
    createComponent(3);
    expect(wrapper.find(`.pizza-filling--second`).exists()).toBeTruthy();
    expect(wrapper.find(`.pizza-filling--third`).exists()).toBeTruthy();
  });
});
