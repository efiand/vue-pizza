import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import CartStatus from "@/modules/cart/components/CartStatus";

describe("CartStatus", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount(CartStatus);
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".cart-status").exists()).toBeTruthy();
  });

  it("Render heading", () => {
    createComponent();
    expect(wrapper.find(".cart-status__title").exists()).toBeTruthy();
  });

  it("Closing event occurs when the button is clicked", async () => {
    createComponent();

    const buttonWrapper = wrapper.find(".cart-status__button");
    await buttonWrapper.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
