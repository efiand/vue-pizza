import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import flushPromises from "flush-promises";
import { UPDATE_ORDER } from "@/store/mutation-types";
import { generateMockStore, content } from "@/store/mocks";
import { USER, MOCK_ORDER, MockPrice } from "@/store/mocks/data";
import { adaptUserData } from "@/common/helpers";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

describe("AppLayoutHeader", () => {
  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      success: jest.fn(),
    },
  };
  const user = adaptUserData(USER);
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, {
      store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
      ...options,
    });
  };

  beforeEach(() => {
    store = generateMockStore();
    store.$api.auth.logout = jest.fn();
  });

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find("header.header").exists()).toBeTruthy();
  });

  it("Cart and user blocks are rendered when add content", async () => {
    createComponent();
    expect(wrapper.find(".header__logo").exists()).toBeTruthy();
    expect(wrapper.find(".header__cart").exists()).toBeFalsy();
    expect(wrapper.find(".header__user").exists()).toBeFalsy();

    await wrapper.setProps({ content });
    expect(wrapper.find(".header__cart").exists()).toBeTruthy();
    expect(wrapper.find(".header__user").exists()).toBeTruthy();
  });

  it("Profile link has image and text with user name", () => {
    createComponent({
      propsData: { content, user },
    });

    expect(wrapper.find(".header__user img").attributes("alt")).toStrictEqual(
      user.name
    );
    expect(wrapper.find(".header__user span").text()).toStrictEqual(user.name);
  });

  it("Link to login is rendered when has not user data, otherwise link to logout is rendered", async () => {
    createComponent({ propsData: { content } });
    expect(wrapper.find(".header__login").exists()).toBeTruthy();
    expect(wrapper.find(".header__logout").exists()).toBeFalsy();

    await wrapper.setProps({ user });
    expect(wrapper.find(".header__login").exists()).toBeFalsy();
    expect(wrapper.find(".header__logout").exists()).toBeTruthy();
  });

  it("Price changes after order is added", async () => {
    const ZERO_PRICE = "0 ₽";
    createComponent({ propsData: { content } });

    const priceWrapper = wrapper.find(".header__cart span");
    expect(priceWrapper.element.textContent).toStrictEqual(ZERO_PRICE);

    store.commit(`Cart/${UPDATE_ORDER}`, MOCK_ORDER);
    await wrapper.vm.$nextTick();
    expect(priceWrapper.element.textContent).toStrictEqual(MockPrice.ORDER);
  });

  it("Clicking on the exit link leads to logging out with notification", async () => {
    createComponent({
      propsData: { content, user },
      mocks: {
        ...mocks,
        $route: {
          path: "/",
        },
      },
    });

    const logoutWrapper = wrapper.find(".header__logout");

    logoutWrapper.trigger("click");
    await flushPromises();

    expect(store.$api.auth.logout).toHaveBeenCalled();
    expect(wrapper.vm.$notifier.success).toHaveBeenCalled();
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
  });

  it("Clicking on the exit link leads to logging out with the transition to the main page", async () => {
    createComponent({
      propsData: { content, user },
      mocks: {
        ...mocks,
        $route: {
          path: "/test",
        },
      },
    });

    const logoutWrapper = wrapper.find(".header__logout");

    logoutWrapper.trigger("click");
    await flushPromises();

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/");
  });
});
