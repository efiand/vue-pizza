import { shallowMount } from "@vue/test-utils";
import AppNotifications from "@/common/components/AppNotifications";

describe("AppNotifications", () => {
  const mocks = {
    $store: {
      state: {
        Notifications: { notifications: [] },
      },
    },
  };
  let wrapper;

  const createComponent = () => {
    wrapper = shallowMount(AppNotifications, { mocks });
  };

  afterEach(() => {
    mocks.$store.state["Notifications"].notifications = [];
  });

  it("Doesn't render out when no notifications", async () => {
    createComponent();
    expect(wrapper.find("ul.notifications").exists()).toBeFalsy();

    mocks.$store.state["Notifications"].notifications = [
      { text: "text", type: "warning" },
    ];
    await wrapper.vm.$nextTick();
    expect(wrapper.find("ul.notifications").exists()).toBeTruthy();
  });

  it("Renders out notification", () => {
    const text = "text";
    mocks.$store.state["Notifications"].notifications = [
      { text, type: "error" },
    ];
    createComponent();
    expect(wrapper.find("li").classes()).toContain(
      "notifications__item--error"
    );
    expect(wrapper.html()).toContain(text);
  });
});
