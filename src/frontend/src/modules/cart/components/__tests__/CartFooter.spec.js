import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER, MockPrice } from "@/store/mocks/data";
import CartFooter from "@/modules/cart/components/CartFooter";

describe("CartFooter", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartFooter, {
      stubs: { RouterLink: RouterLinkStub },
      propsData: {
        content,
        currentOrder: MOCK_ORDER,
      },
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".cart-footer").exists()).toBeTruthy();
  });

  it("Correct order value specified", () => {
    createComponent();

    const priceWrapper = wrapper.find(`.cart-footer__price-value`);

    expect(priceWrapper.text()).toStrictEqual(MockPrice.ORDER);
  });

  it("Submit button is disabled if not isValid or isSending ", async () => {
    createComponent();
    const submitWrapper = wrapper.find(`.cart-footer__submit button`);
    expect(submitWrapper.attributes("disabled")).toBeTruthy();

    await wrapper.setProps({ isValid: true });
    expect(submitWrapper.attributes("disabled")).toBeFalsy();

    await wrapper.setProps({ isSending: true });
    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });
});
