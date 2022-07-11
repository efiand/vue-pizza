import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { generateMockStore, content } from "@/store/mocks";
import { USER } from "@/store/mocks/data";
import { adaptUserData } from "@/common/helpers";
import routes from "@/router/routes";
import AppLayoutWithSidebar from "@/layouts/AppLayoutWithSidebar";

describe("AppLayoutWithSidebar", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutWithSidebar, {
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
