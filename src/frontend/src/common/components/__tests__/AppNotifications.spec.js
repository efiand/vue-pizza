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
    wrapper.destroy();
    mocks.$store.state["Notifications"].notifications = [];
  });

  it("Doesn't render out when no notifications", () => {
    createComponent();
    expect(wrapper.html()).toBeFalsy();
  });

  it("Renders out when we have notifications", () => {
    mocks.$store.state["Notifications"].notifications = [
      { text: "text", type: "warning" },
    ];
    createComponent();
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
