import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { MOCK_ORDER } from "@/store/mocks/data";
import BuilderPizza from "@/modules/builder/components/BuilderPizza";

describe("BuilderPizza", () => {
  const [{ doughId, sauceId, sizeId, ingredients }] = MOCK_ORDER.pizzas;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizza, {
      propsData: {
        doughId,
        sauceId,
        sizeId,
        ingredients,
      },
      ...options,
    });
  };

  it("Is rendered with correct CSS classes", () => {
    createComponent();
    const pizzaWrapper = wrapper.find(
      `.pizza--foundation--${doughId}-${sauceId}.pizza--size--${sizeId}`
    );
    expect(pizzaWrapper.exists()).toBeTruthy();
  });

  it(`There are ${ingredients.length} ingredients`, () => {
    createComponent();
    const { wrappers } = wrapper.findAll(`[data-test^="filling"]`);
    expect(wrappers.length).toStrictEqual(ingredients.length);

    wrappers.forEach((item, i) => {
      const fillingWrappers = item.findAll(".pizza-filling").wrappers;
      expect(fillingWrappers.length).toStrictEqual(ingredients[i].quantity);
    });
  });
});
