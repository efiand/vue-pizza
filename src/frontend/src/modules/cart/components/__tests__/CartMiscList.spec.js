import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import CartMiscList from "@/modules/cart/components/CartMiscList";

describe("CartMiscList", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartMiscList, {
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

  it("A misc change event is generated when the number of units in the child component is changed", async () => {
    createComponent();

    const itemWrapper = wrapper.find(".additional-item:first-child");
    const newValue = wrapper.vm.value.slice();
    newValue[0].quantity++;

    await itemWrapper.vm.$emit("input");

    expect(wrapper.emitted().input[0][0]).toEqual(newValue);
  });
});
