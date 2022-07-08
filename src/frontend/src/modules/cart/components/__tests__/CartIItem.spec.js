import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import CartItem from "@/modules/cart/components/CartItem";

describe("CartItem", () => {
  const stubs = { RouterLink: RouterLinkStub };
  let wrapper;

  const createComponent = () => {
    const index = 0;

    wrapper = mount(CartItem, {
      stubs,
      propsData: {
        content,
        pizza: MOCK_ORDER.pizzas[index],
        index,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".cart-item").exists()).toBeTruthy();
  });

  it("Render product block", () => {
    createComponent();
    expect(wrapper.find(".cart-item__product").isVisible()).toBeTruthy();
  });

  it("Render price block", () => {
    createComponent();
    expect(wrapper.find(".cart-item__price").isVisible()).toBeTruthy();
  });

  it("Render edit link", () => {
    createComponent();
    expect(wrapper.find(".cart-item__edit").isVisible()).toBeTruthy();
  });

  it("A position change event is generated when the number of units in the child component is changed", async () => {
    createComponent();

    const increaserWrapper = wrapper.find(".counter__button--plus");
    const updatedQuantity = wrapper.vm.pizza.quantity + 1;

    await increaserWrapper.trigger("click");

    expect(wrapper.emitted().input[0][0]).toEqual({
      ...wrapper.vm.pizza,
      quantity: updatedQuantity,
    });
  });
});
