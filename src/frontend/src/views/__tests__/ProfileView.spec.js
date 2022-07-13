import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import "@/plugins/ui";
import flushPromises from "flush-promises";
import { adaptUserData } from "@/common/helpers";
import { SET_ADDRESSES } from "@/store/mutation-types";
import { generateMockStore } from "@/store/mocks";
import { USER, ADDRESSES } from "@/store/mocks/data";
import ProfileView from "@/views/ProfileView";

describe("ProfileView", () => {
  const title = "Мои данные";
  const mocks = {
    $route: {
      meta: {
        title,
      },
    },
  };
  let addresses;
  let store;
  let wrapper;

  const checkLength = (diff = 0) => {
    const { length } = wrapper.vm.addresses;
    const addressWrapper = wrapper.findAll(".profile__address");

    expect(length).toStrictEqual(ADDRESSES.length + diff);
    expect(addressWrapper.wrappers.length).toStrictEqual(length);
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileView, {
      store,
      mocks,
      propsData: { user: adaptUserData(USER) },
      ...options,
    });
  };

  beforeEach(() => {
    addresses = cloneDeep(ADDRESSES);
    store = generateMockStore();
    store.$api.addresses.post = jest.fn((address) =>
      Promise.resolve({
        ...address,
        id: store.state.Profile.addresses.length + 1,
      })
    );
    store.$api.addresses.put = jest.fn();
    store.$api.addresses.delete = jest.fn();
    store.$notifier.success = jest.fn();

    store.commit(`Profile/${SET_ADDRESSES}`, addresses);
  });

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".profile").exists()).toBeTruthy();
  });

  it("Title is correct", () => {
    createComponent();

    expect(wrapper.find(".profile__title").text()).toStrictEqual(title);
  });

  it("Profile block is rendered", () => {
    createComponent();

    expect(wrapper.find(".profile__user").exists()).toBeTruthy();
  });

  it("The number of addresses cards is correct", () => {
    createComponent();

    checkLength();
  });

  it("Calls the vuex action on create address and rerender view", async () => {
    const testAddress = {
      name: "Тестовая 3",
      street: "Test",
      building: "100",
      flat: "4",
      comment: "Test Adding",
    };
    createComponent();

    const newWrapper = wrapper.find(`[data-test="new-address"]`);
    await newWrapper.trigger("click");

    const addressWrapper = wrapper.find(".profile__address--new");

    await Promise.all(
      Object.keys(testAddress).map(async (field) => {
        const fieldWrapper = addressWrapper.find(`[name="${field}"]`);
        fieldWrapper.element.value = testAddress[field];
        await fieldWrapper.trigger("input");
      })
    );

    const saveWrapper = addressWrapper.find(`[data-test="save-address"]`);
    await saveWrapper.trigger("click");
    await flushPromises();

    expect(store.$api.addresses.post).toHaveBeenCalledWith({
      ...testAddress,
      userId: USER.id,
    });
    expect(store.$notifier.success).toHaveBeenCalled();

    checkLength(1);
  });

  it("Calls the vuex action on update address and rerender view", async () => {
    createComponent();

    const testComment = "New test comment";
    const addressWrapper = wrapper.find(".profile__address");
    const editWrapper = addressWrapper.find(".edit");
    await editWrapper.trigger("click");

    const commentWrapper = addressWrapper.find(`[name="comment"]`);
    commentWrapper.element.value = testComment;
    await commentWrapper.trigger("input");

    const saveWrapper = addressWrapper.find(`[data-test="save-address"]`);
    await saveWrapper.trigger("click");
    await flushPromises();

    expect(store.$api.addresses.put).toHaveBeenCalledWith(
      wrapper.vm.addresses[0]
    );
    expect(store.$notifier.success).toHaveBeenCalled();
    expect(
      addressWrapper.find(`[data-test="comment-output"]`).text()
    ).toStrictEqual(testComment);
  });

  it("Calls the vuex action on delete address and rerender view", async () => {
    createComponent();

    const addressWrapper = wrapper.find(".profile__address");
    const editWrapper = addressWrapper.find(".profile__address .edit");
    await editWrapper.trigger("click");

    const delWrapper = addressWrapper.find(`[data-test="delete-address"]`);
    await delWrapper.trigger("click");
    await flushPromises();

    expect(store.$api.addresses.delete).toHaveBeenCalledWith(1);
    expect(store.$notifier.success).toHaveBeenCalled();
    expect(wrapper.findAll(".profile__address").wrappers.length).toStrictEqual(
      1
    );
  });
});
