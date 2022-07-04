import { shallowMount } from "@vue/test-utils";
import { content } from "@/store/mocks";
import { MOCK_ORDER, MockPrice } from "@/store/mocks/data";
import OrderPrice from "@/modules/orders/components/OrderPrice";

describe("OrderPrice", () => {
  let wrapper;
  const createComponent = (props) => {
    wrapper = shallowMount(OrderPrice, { propsData: { content, ...props } });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent({ pizzas: [] });
    const spanWrapper = wrapper.find("span");
    expect(spanWrapper.exists()).toBeTruthy();
  });

  it("Empty order has zero price", () => {
    createComponent({ pizzas: [] });
    expect(wrapper.text()).toEqual("0 ₽");
  });

  it(`Test order has a value of ${MockPrice.ORDER}`, () => {
    const { pizzas, misc } = MOCK_ORDER;
    createComponent({ pizzas, misc });
    expect(wrapper.text()).toEqual(MockPrice.ORDER);
  });
});
