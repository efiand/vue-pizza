import { mount } from "@vue/test-utils";
import { generateMockStore, content } from "@/store/mocks";
import "@/plugins/ui";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";

describe("AppLayoutDefault", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutDefault, {
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
