import { createLocalVue, mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER, MockPrice } from "@/store/mocks/data";
import CartFooter from "@/modules/cart/components/CartFooter";

const localVue = createLocalVue();

describe("CartFooter", () => {
  const propsData = {
    content,
    currentOrder: MOCK_ORDER,
  };
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartFooter, {
      localVue,
      stubs: { RouterLink: RouterLinkStub },
      propsData,
      ...options,
    });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".cart-footer").exists()).toBeTruthy();
  });

  it("Correct order value specified", () => {
    createComponent();

    const priceWrapper = wrapper.find(`.cart-footer__price-value`);

    expect(priceWrapper.text()).toStrictEqual(MockPrice.ORDER);
  });

  it("Submit button is disabled", () => {
    createComponent();

    const submitWrapper = wrapper.find(`.cart-footer__submit button`);

    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });

  it("Submit button is enabled then isValid prop passed", () => {
    createComponent({ propsData: { ...propsData, isValid: true } });

    const submitWrapper = wrapper.find(`.cart-footer__submit button`);

    expect(submitWrapper.attributes("disabled")).toBeFalsy();
  });

  it("Submit button is disabled then isSending prop passed", () => {
    createComponent({
      propsData: { ...propsData, isValid: true, isSending: true },
    });

    const submitWrapper = wrapper.find(`.cart-footer__submit button`);

    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });
});
