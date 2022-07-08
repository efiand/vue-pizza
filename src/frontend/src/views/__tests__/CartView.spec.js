import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import flushPromises from "flush-promises";
import { UPDATE_ORDER } from "@/store/mutation-types";
import { generateMockStore, content } from "@/store/mocks";
import { MOCK_ORDER, ADDRESSES, MockPrice } from "@/store/mocks/data";
import { Message } from "@/common/constants";
import { wait } from "@/common/utils";
import CartView from "@/views/CartView";

describe("CartView", () => {
  const LEAVE_TIMEOUT = 600;
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const DEFAULT_PROPS = { content };
  const phone = "911";
  let store;
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = mount(CartView, {
      store,
      stubs: { RouterLink: RouterLinkStub },
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  beforeEach(() => {
    store = generateMockStore();
    store.$api.orders.post = jest.fn(() => Promise.resolve(true));
    store.$api.addresses.get = jest.fn(() => Promise.resolve(ADDRESSES));
    store.$notifier.info = jest.fn();

    store.commit(`Cart/${UPDATE_ORDER}`, MOCK_ORDER);
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".cart").exists()).toBeTruthy();
  });

  it("Render pizzas list", () => {
    createComponent();
    expect(wrapper.find(".cart__list").exists()).toBeTruthy();
  });

  it("Render misces list", () => {
    createComponent();
    expect(wrapper.find(".cart__additional").exists()).toBeTruthy();
  });

  it("Render contacts form", () => {
    createComponent();
    expect(wrapper.find(".cart__order").exists()).toBeTruthy();
  });

  it("Render footer", () => {
    createComponent();
    expect(wrapper.find(".cart__footer").exists()).toBeTruthy();
  });

  it("The form is displayed when there are pizzas on the order", () => {
    createComponent();
    expect(wrapper.find(".cart__order").exists()).toBeTruthy();
    expect(wrapper.find(".cart__empty").exists()).toBeFalsy();
  });

  it("The form does not render when there are no pizzas on the order", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, {
      pizzas: [],
    });
    createComponent();
    expect(wrapper.find(".cart__order").exists()).toBeFalsy();

    const emptyWrapper = wrapper.find(".cart__empty p");
    expect(emptyWrapper.exists()).toBeTruthy();
    expect(emptyWrapper.html()).toContain(Message.EMPTY_CART);
  });

  it("The form disappears when all orders are deleted", async () => {
    const [pizza] = store.state.Cart.currentOrder.pizzas;
    store.commit(`Cart/${UPDATE_ORDER}`, {
      pizzas: [
        {
          ...pizza,
          quantity: 1,
        },
      ],
    });
    createComponent();
    expect(wrapper.find(".cart__order").exists()).toBeTruthy();

    const listWrapper = wrapper.find(".cart__list");
    const decreaseWrapper = listWrapper.find(".counter__button--minus");
    const spyOnAction = jest.spyOn(wrapper.vm, "updateOrder");
    const updatedData = { pizzas: [] };

    await decreaseWrapper.trigger("click");
    expect(spyOnAction).toHaveBeenCalledWith(updatedData);
    expect(wrapper.find(".cart__order").exists()).toBeFalsy();
    expect(wrapper.find(".cart__empty").exists()).toBeTruthy();
  });

  it("Pizza price changes as quantity changes", async () => {
    createComponent();

    const increaseWrapper = wrapper.find(".counter__button--plus");
    const priceWrapper = wrapper.find(".cart-item__price");
    const spyOnAction = jest.spyOn(wrapper.vm, "updateOrder");
    const updatedData = store.state.Cart.currentOrder.pizzas.slice();
    updatedData[0].quantity++;

    await increaseWrapper.trigger("click");
    expect(spyOnAction).toHaveBeenCalledWith({ pizzas: updatedData });
    expect(priceWrapper.text()).toStrictEqual(MockPrice.PIZZA_X_3);
  });

  it("Order is ready to submit when address is null and phone is not empty", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, { address: null, phone });
    createComponent();

    const submitWrapper = wrapper.find('[type="submit"]');

    expect(submitWrapper.attributes("disabled")).toBeFalsy();
  });

  it("Order is not ready to submit when address is null and phone is empty", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, { address: null });
    createComponent();

    const submitWrapper = wrapper.find('[type="submit"]');

    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });

  it("Order is ready to submit when street, building and phone are not empty", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, {
      address: {
        ...MOCK_ORDER.address,
        street: "Test",
        building: "1",
      },
      phone,
    });
    createComponent();

    const submitWrapper = wrapper.find('[type="submit"]');

    expect(submitWrapper.attributes("disabled")).toBeFalsy();
  });

  it("Order is not ready to submit when street, building are not empty, but phone is empty", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, {
      address: {
        ...MOCK_ORDER.address,
        street: "Test",
        building: "1",
      },
    });
    createComponent();

    const submitWrapper = wrapper.find('[type="submit"]');

    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });

  it("Order is not ready to submit when address and phone are not empty, but street is empty", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, {
      address: {
        ...MOCK_ORDER.address,
        building: "1",
      },
      phone,
    });
    createComponent();

    const submitWrapper = wrapper.find('[type="submit"]');

    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });

  it("Order is not ready to submit when address and phone are not empty, but building is empty", () => {
    store.commit(`Cart/${UPDATE_ORDER}`, {
      address: {
        ...MOCK_ORDER.address,
        street: "Test",
      },
      phone,
    });
    createComponent();

    const submitWrapper = wrapper.find('[type="submit"]');

    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });

  it("Calls the vuex action on submit form and clear interface", async () => {
    const updatedOrder = {
      ...MOCK_ORDER,
      address: {
        ...MOCK_ORDER.address,
        street: "Test",
        building: "1",
      },
      phone,
    };
    store.commit(`Cart/${UPDATE_ORDER}`, updatedOrder);
    createComponent();

    const spyOnAction = jest.spyOn(wrapper.vm, "handleOrder");
    const spyOnAdding = jest.spyOn(wrapper.vm, "addOrder");
    const formWrapper = wrapper.find(".cart__order");

    await formWrapper.trigger("submit");
    await flushPromises();

    expect(spyOnAction).toHaveBeenCalled();
    expect(spyOnAdding).toHaveBeenCalledWith(updatedOrder);
    expect(store.$api.orders.post).toHaveBeenCalledWith(updatedOrder);

    expect(wrapper.find(".cart__order").exists()).toBeFalsy();
    expect(wrapper.find(".cart__popup").exists()).toBeTruthy();
  });

  it("The new address is added to the user's addresses", async () => {
    const updatedOrder = {
      ...MOCK_ORDER,
      address: {
        ...MOCK_ORDER.address,
        street: "Test",
        building: "1",
      },
      phone,
      userId: "test",
    };
    store.commit(`Cart/${UPDATE_ORDER}`, updatedOrder);
    createComponent();

    const formWrapper = wrapper.find(".cart__order");

    await formWrapper.trigger("submit");
    await flushPromises();

    expect(store.$api.addresses.get).toHaveBeenCalled();
    expect(store.$notifier.info).toHaveBeenCalled();
  });

  it("When the popup is closed, unauthorizes user goes to the main page", async () => {
    createComponent({
      mocks,
    });
    wrapper.vm.isSended = true;
    await wrapper.vm.$nextTick();

    const statusWrapper = wrapper.find(".cart-status");
    const closeWrapper = statusWrapper.find(".cart-status__button");
    expect(closeWrapper.exists()).toBeTruthy();

    await closeWrapper.trigger("click");
    expect(statusWrapper.emitted().close).toBeTruthy();

    await wait(LEAVE_TIMEOUT);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/");
  });

  it("When the popup is closed, authorized user goes to the orders page", async () => {
    createComponent({
      mocks,
      propsData: {
        user: {},
      },
    });
    wrapper.vm.isSended = true;
    await wrapper.vm.$nextTick();

    const closeWrapper = wrapper.find(".cart-status__button");
    await closeWrapper.trigger("click");

    await wait(LEAVE_TIMEOUT);
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/orders");
  });
});
