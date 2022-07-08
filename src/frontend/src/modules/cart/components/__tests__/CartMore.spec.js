import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import CartMore from "@/modules/cart/components/CartMore";

describe("CartMore", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(CartMore, options);
  };

  it("Is rendered as link", () => {
    createComponent({ stubs: { RouterLink: RouterLinkStub } });
    expect(wrapper.find("a.cart-more").exists()).toBeTruthy();
  });

  it("Router-link point to main page", () => {
    createComponent({ stubs: ["RouterLink"] });
    expect(wrapper.find(".cart-more").attributes("to")).toStrictEqual("/");
  });
});
