import { mount } from "@vue/test-utils";
import { cloneDeep } from "lodash";
import "@/plugins/ui";
import { ADDRESSES } from "@/store/mocks/data";
import { formatAddress } from "@/modules/profile/helpers";
import ProfileAddressForm from "@/modules/profile/components/ProfileAddressForm";

describe("ProfileAddressForm", () => {
  let address;
  let wrapper;

  const clickToEdit = async () => await wrapper.find(".edit").trigger("click");

  const createComponent = (options) => {
    wrapper = mount(ProfileAddressForm, {
      propsData: { address },
      ...options,
    });
  };

  beforeEach(() => {
    address = cloneDeep(ADDRESSES[0]);
  });

  it("Is rendered", () => {
    createComponent();

    expect(wrapper.find(".address-form").exists()).toBeTruthy();
  });

  it("Data are render correctly", async () => {
    createComponent();

    const titleWrapper = wrapper.find(".address-form__title");
    const addressWrapper = wrapper.find(`[data-test="address-output"]`);
    const commentWrapper = wrapper.find(`[data-test="comment-output"]`);

    expect(titleWrapper.text()).toContain(address.id);
    expect(titleWrapper.text()).toContain(address.name);
    expect(addressWrapper.text()).toStrictEqual(formatAddress(address));
    expect(commentWrapper.text()).toStrictEqual(address.comment);

    await clickToEdit();

    ["name", "street", "building", "flat", "comment"].forEach((field) => {
      const { value } = wrapper.find(`[name="${field}"]`).element;
      expect(value).toStrictEqual(address[field]);
    });
  });

  it.each(["name", "street", "building"])(
    "Save button is disabled when field is empty",
    async (field) => {
      createComponent();

      await clickToEdit();
      await wrapper.vm.$nextTick();

      const saveWrapper = wrapper.find(`[data-test="save-address"]`);

      expect(saveWrapper.attributes("disabled")).toBeFalsy();

      const fieldWrapper = wrapper.find(`[name="${field}"]`);
      fieldWrapper.element.value = "";
      await fieldWrapper.trigger("input");

      expect(saveWrapper.attributes("disabled")).toBeTruthy();
    }
  );

  it("Delete button triggers the delete event", async () => {
    createComponent();

    await clickToEdit();

    const delWrapper = wrapper.find(`[data-test="delete-address"]`);
    await delWrapper.trigger("click");

    expect(wrapper.emitted().delete).toBeTruthy();
  });

  it("Save button triggers the change event", async () => {
    createComponent();

    await clickToEdit();

    const saveWrapper = wrapper.find(`[data-test="save-address"]`);
    await saveWrapper.trigger("click");

    expect(wrapper.emitted().change).toBeTruthy();
  });
});
