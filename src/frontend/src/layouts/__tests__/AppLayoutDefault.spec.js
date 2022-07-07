import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore, content } from "@/store/mocks";
import "@/plugins/ui";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutDefault", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutDefault, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/",
        },
      },
      stubs: ["RouterView", "RouterLink"],
      ...options,
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
    expect(wrapper.exists()).toBeTruthy();
  });

  it("Header is rendered", () => {
    createComponent();
    expect(wrapper.find("header").exists()).toBeTruthy();
  });

  it("View is rendered if it has content", async () => {
    createComponent();
    expect(wrapper.find("routerview-stub").exists()).toBeFalsy();

    await wrapper.setProps({ content });
    expect(wrapper.find("routerview-stub").exists()).toBeTruthy();
  });
});
