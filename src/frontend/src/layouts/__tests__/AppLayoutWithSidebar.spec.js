import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import "@/plugins/ui";
import { generateMockStore, content } from "@/store/mocks";
import { USER } from "@/store/mocks/data";
import { adaptUserData } from "@/common/helpers";
import routes from "@/router/routes";
import AppLayoutWithSidebar from "@/layouts/AppLayoutWithSidebar";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayoutWithSidebar", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutWithSidebar, {
      localVue,
      store,
      mocks: {
        $route: {
          path: "/orders",
        },
        $router: {
          options: {
            routes,
          },
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

  it("Sidebar is rendered if layout has user and content", async () => {
    createComponent();
    expect(wrapper.find(".layout__sidebar").exists()).toBeFalsy();

    await wrapper.setProps({ user: adaptUserData(USER) });
    expect(wrapper.find(".layout__sidebar").exists()).toBeFalsy();

    await wrapper.setProps({ content });
    expect(wrapper.find(".layout__sidebar").exists()).toBeTruthy();
  });
});
