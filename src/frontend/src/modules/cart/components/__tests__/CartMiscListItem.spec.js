import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import CartMiscListItem from "@/modules/cart/components/CartMiscListItem";

describe("CartMiscListItem", () => {
  const [misc] = content.misc;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartMiscListItem, {
      propsData: {
        misc: {
          ...misc,
          quantity: 0,
        },
      },
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".additional-item").exists()).toBeTruthy();
  });

  it("Description has the correct title", () => {
    createComponent();

    const descriptionWrapper = wrapper.find(".additional-item__description");
    expect(descriptionWrapper.text()).toStrictEqual(misc.name);
  });

  it("A misc change event is generated when the number of units in the child component is changed", async () => {
    createComponent();

    const increaserWrapper = wrapper.find(".counter__button--plus");
    const priceWrapper = wrapper.find(".additional-item__price");

    await increaserWrapper.trigger("click");

    expect(wrapper.emitted().input[0][0]).toEqual(1);
    expect(priceWrapper.text()).toContain(misc.price);
  });
});
