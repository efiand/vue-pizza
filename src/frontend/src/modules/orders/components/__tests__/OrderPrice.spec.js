import { shallowMount } from "@vue/test-utils";
import { content } from "@/store/mocks";
import { MOCK_ORDER, MockPrice } from "@/store/mocks/data";
import OrderPrice from "@/modules/orders/components/OrderPrice";

describe("OrderPrice", () => {
  const DEFAULT_PROPS = {
    content,
    pizzas: [],
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(OrderPrice, {
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();

    const spanWrapper = wrapper.find("span");
    expect(spanWrapper.exists()).toBeTruthy();
  });

  it("Empty order has zero price", () => {
    createComponent();

    expect(wrapper.text()).toEqual("0 ₽");
  });

  it(`Test order has a value of ${MockPrice.ORDER}`, () => {
    const { pizzas, misc } = MOCK_ORDER;
    createComponent({ propsData: { pizzas, misc } });

    expect(wrapper.text()).toEqual(MockPrice.ORDER);
  });
});
