import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import CartMiscList from "@/modules/cart/components/CartMiscList";

describe("CartMiscList", () => {
  const stubs = { RouterLink: RouterLinkStub };
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartMiscList, {
      stubs,
      propsData: {
        misc: content.misc,
        value: MOCK_ORDER.misc,
      },
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".additional-list").exists()).toBeTruthy();
  });

  it("The length of the list is equal to the number of misces", () => {
    createComponent();

    const { wrappers } = wrapper.findAll(".additional-list__item");
    expect(wrappers.length).toStrictEqual(wrapper.vm.value.length);
  });

  it("Descriptions have the correct titles", () => {
    createComponent();

    const { wrappers } = wrapper.findAll(".additional-list__description");
    wrappers.forEach((descriptionWrapper, i) => {
      expect(descriptionWrapper.text()).toStrictEqual(content.misc[i].name);
    });
  });

  it("A misc change event is generated when the number of units in the child component is changed", async () => {
    createComponent();

    const itemWrapper = wrapper.find(".additional-list__item:first-child");
    const increaserWrapper = itemWrapper.find(".counter__button--plus");
    const priceWrapper = itemWrapper.find(".additional-list__price");
    const newValue = wrapper.vm.value.slice();
    newValue[0].quantity++;

    await increaserWrapper.trigger("click");

    expect(wrapper.emitted().input[0][0]).toEqual(newValue);
    expect(priceWrapper.text()).toContain(content.misc[0].price);
  });
});
