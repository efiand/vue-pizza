import { mount, RouterLinkStub } from "@vue/test-utils";
import flushPromises from "flush-promises";
import "@/plugins/ui";
import { generateMockStore } from "@/store/mocks";
import { USER } from "@/store/mocks/data";
import LoginView from "@/views/index/^LoginView";

export const Res = {
  SUCCESS: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzMDFiMDBhLTk4MTgtNDNlOS05MmVjLWQ3ZjIxOTZhZGZjOCIsIm5hbWUiOiLQktCw0YHRjyDQn9GD0L_QutC40L0iLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE2NTY4NzIzNTUsImV4cCI6MTY1Njg5Mzk1NX0.BaYpb1Uk2E1ul3bc4o-olM4GBuZwxvXZKePHaTa-HwQ",
  },
  ERROR: {
    error: {
      statusCode: 400,
      name: "BadRequestError",
      message: "Логин и/или пароль неверны",
    },
  },
};

describe("LoginView", () => {
  const stubs = { RouterLink: RouterLinkStub };
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(LoginView, {
      store,
      stubs,
      ...options,
    });
  };

  beforeEach(() => {
    store = generateMockStore();

    store.$api.auth.login = jest.fn(({ email, password }) => {
      if (email === USER.email && password === USER.email) {
        return Promise.resolve(Res.SUCCESS);
      }
      return Promise.reject(Res.ERROR);
    });

    store.$api.auth.getMe = jest.fn(() => Promise.resolve(USER));
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".login").exists()).toBeTruthy();
  });

  it.each(["email", "pass"])(
    "Form cannot be submitted when one field is empty",
    async (name) => {
      createComponent();

      const fieldWrapper = wrapper.find(`[name="${name}"]`);
      fieldWrapper.element.value = USER.email;
      await fieldWrapper.trigger("input");

      const submitWrapper = wrapper.find(".login__button");
      expect(submitWrapper.attributes("disabled")).toBeTruthy();
    }
  );

  it("Form cannot be submitted when email is invalid", async () => {
    createComponent();

    const emailWrapper = wrapper.find(`[name="email"]`);
    emailWrapper.element.value = "test";
    await emailWrapper.trigger("input");

    const passwordWrapper = wrapper.find(`[name="pass"]`);
    passwordWrapper.element.value = USER.email;
    await passwordWrapper.trigger("input");

    const submitWrapper = wrapper.find(".login__button");
    expect(submitWrapper.attributes("disabled")).toBeTruthy();
  });

  it("Form can be submitted when it is valid", async () => {
    createComponent();

    const emailWrapper = wrapper.find(`[name="email"]`);
    emailWrapper.element.value = USER.email;
    await emailWrapper.trigger("input");

    const password = wrapper.find(`[name="pass"]`);
    password.element.value = USER.email;
    await password.trigger("input");

    const submitWrapper = wrapper.find(".login__button");
    expect(submitWrapper.attributes("disabled")).toBeFalsy();
  });

  it("Calls the vuex action on submit form and redirect to main page", async () => {
    createComponent({
      mocks: {
        $router: {
          push: jest.fn(),
        },
      },
    });
    wrapper.vm.email = USER.email;
    wrapper.vm.password = USER.email;
    await wrapper.vm.$nextTick();

    const spyOnLogin = jest.spyOn(wrapper.vm, "login");
    const formWrapper = wrapper.find(".login__form");

    await formWrapper.trigger("submit");
    await flushPromises();

    expect(spyOnLogin).toHaveBeenCalled();
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/");
    expect(store.$api.auth.login).toHaveBeenCalledWith({
      email: USER.email,
      password: USER.email,
    });
    expect(store.$api.auth.getMe).toHaveBeenCalled();
  });

  it("Calls the vuex action on submit form with incorrect password and notify about error", async () => {
    createComponent({
      mocks: {
        $router: {
          push: jest.fn(),
        },
        $notifier: {
          error: jest.fn(),
        },
      },
    });
    wrapper.vm.email = USER.email;
    wrapper.vm.password = "test";
    await wrapper.vm.$nextTick();

    const formWrapper = wrapper.find(".login__form");

    await formWrapper.trigger("submit");
    await flushPromises();

    expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
    expect(wrapper.vm.invalid).toBeTruthy();
    expect(store.$api.auth.getMe).not.toHaveBeenCalled();
  });
});
