import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import "@/plugins/ui";
import { generateMockStore } from "@/store/mocks";
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
      ...options,
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

  it("Sidebar is rendered if layout has user and content", () => {
    createComponent({
      propsData: { content: store.state.content, user: adaptUserData(USER) },
    });
    const sidebarWrapper = wrapper.find(".layout__sidebar");
    expect(sidebarWrapper.exists()).toBeTruthy();
  });

  it("Sidebar is not rendered if layout has not content", () => {
    createComponent({ propsData: { user: adaptUserData(USER) } });
    const sidebarWrapper = wrapper.find(".layout__sidebar");
    expect(sidebarWrapper.exists()).toBeFalsy();
  });

  it("Sidebar is not rendered if layout has not content", () => {
    createComponent({ propsData: { content: store.state.content } });
    const sidebarWrapper = wrapper.find(".layout__sidebar");
    expect(sidebarWrapper.exists()).toBeFalsy();
  });

  it("Header is rendered", () => {
    createComponent();
    const headerWrapper = wrapper.find("header");
    expect(headerWrapper.exists()).toBeTruthy();
  });
});
