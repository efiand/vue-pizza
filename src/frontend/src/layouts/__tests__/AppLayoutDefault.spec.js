import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import "@/plugins/ui";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutDefault", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutDefault, {
      ...options,
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
      },
      stubs: ["RouterView", "RouterLink"],
    });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.html()).toBeTruthy();
  });

  it("View is not rendered if it has not content", () => {
    createComponent();
    const viewWrapper = wrapper.find("routerview-stub");
    expect(viewWrapper.exists()).toBeFalsy();
  });

  it("View is rendered if it has content", () => {
    createComponent({ propsData: { content: store.state.content } });
    const viewWrapper = wrapper.find("routerview-stub");
    expect(viewWrapper.exists()).toBeTruthy();
  });

  it("Header is rendered", () => {
    createComponent();
    const headerWrapper = wrapper.find("header");
    expect(headerWrapper.html()).toBeTruthy();
  });
});
