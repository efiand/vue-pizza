import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import "@/plugins/ui";
import routes from "@/router/routes";
import AppLayout from "@/layouts/AppLayout";

describe("AppLayout", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayout, {
      store,
      stubs: ["RouterView", "RouterLink"],
      ...options,
    });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  it.each(["AppLayoutDefault", "AppLayoutWithSidebar"])(
    "Is rendered with app layout",
    async (layout) => {
      createComponent({
        mocks: {
          $route: {
            ...routes[0],
            meta: {
              layout,
            },
          },
        },
      });
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find(`[data-test="${layout}"]`).exists()).toBeTruthy();
    }
  );
});
