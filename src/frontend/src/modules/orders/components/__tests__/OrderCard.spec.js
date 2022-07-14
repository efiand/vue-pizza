import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { ADDRESSES, MOCK_ORDER, MockPrice } from "@/store/mocks/data";
import { findItemById } from "@/common/utils";
import { formatAddress } from "@/modules/profile/helpers";
import OrderCard from "@/modules/orders/components/OrderCard";

const createOrder = (order, addition) => ({
  id: 1,
  ...cloneDeep(order),
  ...addition,
});

describe("OrderCard", () => {
  let currentOrder = createOrder(MOCK_ORDER);
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(OrderCard, {
      propsData: { content, currentOrder },
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".order").exists()).toBeTruthy();
  });

  it("Id is correct", () => {
    createComponent();

    const headingWrapper = wrapper.find(".order__number");

    expect(headingWrapper.text()).toContain(`#${currentOrder.id}`);
  });

  it("Price is correct", () => {
    createComponent();

    const priceWrapper = wrapper.find(".order__price");

    expect(priceWrapper.text()).toStrictEqual(MockPrice.ORDER);
  });

  it("The card component renders the correct content using the header example", () => {
    createComponent();

    const titleWrapper = wrapper.find(".product__title");

    expect(titleWrapper.text()).toStrictEqual(currentOrder.pizzas[0].name);
  });

  it("Pizza list contains the correct number of items", () => {
    createComponent();

    const { wrappers } = wrapper.findAll(`.order__item`);

    expect(wrappers.length).toStrictEqual(currentOrder.pizzas.length);
  });

  it("Misc list contains the correct number of items", () => {
    createComponent();

    const { wrappers } = wrapper.findAll(`.order__misc`);
    const { length } = currentOrder.misc.filter(({ quantity }) => quantity);

    expect(wrappers.length).toStrictEqual(length);
  });

  it("Misc item contains correct content", () => {
    currentOrder = createOrder(MOCK_ORDER);
    currentOrder.misc[0].quantity = 1;
    createComponent();

    const miscWrapper = wrapper.find(".order__misc");
    const nameWrapper = miscWrapper.find(".order__misc-name");
    const priceWrapper = miscWrapper.find(".order__misc-price");
    const imgWrapper = miscWrapper.find("img");
    const misc = findItemById(content.misc, currentOrder.misc[0].miscId);

    expect(imgWrapper.attributes("src")).toStrictEqual(misc.image);
    expect(nameWrapper.text()).toStrictEqual(misc.name);
    expect(priceWrapper.text()).toStrictEqual(`${misc.price} ₽`);
  });

  it("Misc price block contains correct data when quantity is more than one", () => {
    const QUANTITY = 5;
    currentOrder = createOrder(MOCK_ORDER);
    currentOrder.misc[0].quantity = QUANTITY;
    createComponent();

    const priceWrapper = wrapper.find(".order__misc-price");
    const misc = findItemById(content.misc, currentOrder.misc[0].miscId);

    expect(priceWrapper.text()).toStrictEqual(`${QUANTITY}x${misc.price} ₽`);
  });

  it("Pizza list not rendered when there are no pizzas", () => {
    currentOrder = createOrder(MOCK_ORDER, { pizzas: [] });
    createComponent();

    const pizzasWrapper = wrapper.find(".order__list");

    expect(pizzasWrapper.exists()).toBeFalsy();
  });

  it("Misc list not rendered when there are no misces", () => {
    currentOrder = createOrder(MOCK_ORDER, { misc: [] });
    createComponent();

    const additionalWrapper = wrapper.find(".order__additional");

    expect(additionalWrapper.exists()).toBeFalsy();
  });

  it("Address block not rendered when address is empty", () => {
    currentOrder = createOrder(MOCK_ORDER, { address: null });
    createComponent();

    const addressWrapper = wrapper.find(".order__address");

    expect(addressWrapper.exists()).toBeFalsy();
  });

  it("Address block has correct content when address is not empty", () => {
    currentOrder = createOrder(MOCK_ORDER, { address: ADDRESSES[0] });
    createComponent();

    const addressWrapper = wrapper.find(".order__address");

    expect(addressWrapper.text()).toContain(formatAddress(ADDRESSES[0]));
  });

  it("Delete button triggers the delete event of the current order", async () => {
    currentOrder = createOrder(MOCK_ORDER);
    createComponent();

    const delWrapper = wrapper.find(`[data-test="delete-order-1"]`);
    await delWrapper.trigger("click");

    expect(wrapper.emitted().deleteOrder[0][0]).toEqual(currentOrder);
  });

  it("Repeat button triggers the repeat event of the current order", async () => {
    createComponent();

    const repeatWrapper = wrapper.find(`[data-test="repeat-order-1"]`);
    await repeatWrapper.trigger("click");

    expect(wrapper.emitted().repeatOrder[0][0]).toEqual(MOCK_ORDER);
  });
});
