import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import "@/plugins/ui";
import flushPromises from "flush-promises";
import { generateMockStore, content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import OrdersView from "@/views/OrdersView";

const getServeredOrder = (payload, i = 0) => {
  const order = cloneDeep(payload);

  order.id = i + 1;
  order.orderAddress = order.address;
  order.orderPizzas = order.pizzas;
  order.orderMisc = order.misc;

  delete order.pizzas;
  delete order.misc;
  delete order.address;

  return order;
};

describe("OrdersView", () => {
  const title = "История заказов";
  const mocks = {
    $route: {
      meta: {
        title,
      },
    },
    $router: {
      push: jest.fn(),
    },
  };
  let orders = [MOCK_ORDER];
  let store;
  let wrapper;

  const createComponent = async (options) => {
    wrapper = mount(OrdersView, {
      store,
      mocks,
      propsData: { content },
      ...options,
    });
    await flushPromises();
  };

  beforeEach(() => {
    store = generateMockStore();
    store.$api.orders.get = jest.fn(() =>
      Promise.resolve(orders.map(getServeredOrder))
    );
    store.$api.orders.delete = jest.fn((id) =>
      Promise.resolve(Boolean(orders[id - 1]))
    );
    store.$notifier.success = jest.fn();
  });

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".orders").exists()).toBeTruthy();
  });

  it("Title is correct", () => {
    createComponent();

    expect(wrapper.find(".orders__title").text()).toStrictEqual(title);
  });

  it("Getting orders before creation", () => {
    createComponent();

    expect(store.$api.orders.get).toHaveBeenCalled();
  });

  it("The number of order cards is correct", async () => {
    orders.push(MOCK_ORDER);
    await createComponent();

    const { length } = wrapper.vm.orders;
    const cardWrappers = wrapper.findAll(".orders__card");

    expect(length).toStrictEqual(orders.length);
    expect(cardWrappers.wrappers.length).toStrictEqual(length);
  });

  it("If there are no orders, the corresponding block is shown", async () => {
    orders = [];
    await createComponent();

    const cardWrapper = wrapper.find(".orders__card");
    const emptyWrapper = wrapper.find(".orders__empty");

    expect(cardWrapper.exists()).toBeFalsy();
    expect(emptyWrapper.exists()).toBeTruthy();
  });

  it("Calls the vuex action on delete order and rerender view", async () => {
    orders = [MOCK_ORDER];
    await createComponent();

    const [{ id }] = wrapper.vm.orders;
    const delWrapper = wrapper.find(`[data-test="delete-order-${id}"]`);

    await delWrapper.trigger("click");
    await flushPromises();

    expect(store.$api.orders.delete).toHaveBeenCalledWith(id);
    expect(store.$notifier.success).toHaveBeenCalled();
    expect(wrapper.findAll(".orders__card").wrappers.length).toStrictEqual(0);
    expect(wrapper.find(".orders__empty").exists()).toBeTruthy();
  });

  it("Calls the vuex mutation on repeat order", async () => {
    orders = [MOCK_ORDER];
    await createComponent();

    const cardWrapper = wrapper.find(`.orders__card`);
    cardWrapper.vm.$emit("repeatOrder", { id: "test-repeat" });

    expect(store.state.Cart.currentOrder.id).toStrictEqual("test-repeat");
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/cart");
  });
});
