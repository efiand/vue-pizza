import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import CartList from "@/modules/cart/components/CartList";

describe("CartList", () => {
  const stubs = { RouterLink: RouterLinkStub };
  let wrapper;

  const createComponent = (options) => {
    const { pizzas } = MOCK_ORDER;
    wrapper = mount(CartList, {
      stubs,
      propsData: { content, pizzas },
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".cart-list").exists()).toBeTruthy();
  });

  it("The length of the list is equal to the number of pizzas", () => {
    createComponent();

    const { wrappers } = wrapper.findAll(".cart-list__item");
    expect(wrappers.length).toStrictEqual(wrapper.vm.pizzas.length);
  });

  it("A position change event is generated when the number of units in the child component is changed", () => {
    createComponent();

    const itemWrapper = wrapper.find(".cart-list__item:last-child");
    const updatedPizza = {
      ...wrapper.vm.pizzas[1],
      quantity: 0,
    };

    itemWrapper.vm.$emit("input", updatedPizza);

    expect(wrapper.emitted().changePizzas[0][0]).toEqual([
      wrapper.vm.pizzas[0],
    ]);
  });
});
