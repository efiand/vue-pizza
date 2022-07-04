import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import "@/plugins/ui";
import routes from "@/router/routes";
import AppLayout from "@/layouts/AppLayout";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppLayout", () => {
  const mocks = {
    $route: routes[0],
  };

  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayout, {
      ...options,
      stubs: ["RouterView", "RouterLink"],
    });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered with AppLayoutDefault", async () => {
    const layout = "AppLayoutDefault";
    createComponent({ localVue, store, mocks });
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    expect(wrapper.find(`[data-test="${layout}"]`).exists()).toBeTruthy();
  });

  it("Is rendered with AppLayoutWithSidebar", async () => {
    const layout = "AppLayoutWithSidebar";
    createComponent({
      localVue,
      store,
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
  });
});
