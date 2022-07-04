import { createLocalVue, mount } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import BuilderFillingSelector from "@/modules/builder/components/BuilderFillingSelector";

const localVue = createLocalVue();

describe("BuilderFillingSelector", () => {
  let pizzaIngredients;
  let propsData;
  let wrapper;

  const createComponent = (options) => {
    pizzaIngredients = MOCK_ORDER.pizzas[0].ingredients.slice();
    propsData = {
      ingredients: content.ingredients,
      value: pizzaIngredients,
    };
    wrapper = mount(BuilderFillingSelector, {
      localVue,
      propsData,
      ...options,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".filling").exists()).toBeTruthy();
  });

  it("All ingredients render with correct counters", () => {
    createComponent();
    wrapper.findAll(".counter__input").wrappers.forEach((counter, i) => {
      expect(+counter.element.value).toStrictEqual(
        pizzaIngredients[i].quantity
      );
    });
  });

  it("Calls the inputHandler", async () => {
    createComponent();
    const spyOnUpdate = jest.spyOn(wrapper.vm, "inputHandler");
    const increaserWrapper = wrapper.find(`.counter__button--plus`);
    const { quantity } = pizzaIngredients[0];

    await increaserWrapper.trigger("click");
    expect(spyOnUpdate).toHaveBeenCalledWith(quantity + 1, 0);
  });

  it("All ingredients are draggable", () => {
    createComponent();
    wrapper
      .findAll(`[data-test^="ingredient-"]`)
      .wrappers.forEach((ingredientWrapper) => {
        expect(ingredientWrapper.attributes("draggable")).toStrictEqual("true");
      });
  });

  it("Ingredient with max quantity is not draggable", async () => {
    const value = pizzaIngredients.slice();
    value[0].quantity = 3;
    createComponent({ propsData: { ...propsData, value } });

    const ingredientWrapper = wrapper.find(`[data-test="ingredient-1"]`);
    expect(ingredientWrapper.attributes("draggable")).toStrictEqual("false");
  });
});
