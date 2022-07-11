import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { ADDRESSES } from "@/store/mocks/data";
import { createAddress } from "@/common/helpers";
import CartForm from "@/modules/cart/components/CartForm";

describe("CartForm", () => {
  const addressFields = ["street", "building", "flat"];
  const phone = "911";
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartForm, {
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent({ propsData: { addresses: [] } });

    expect(wrapper.find(".cart-form").exists()).toBeTruthy();
  });

  it("Select has 2 options by default but 4 options, when there are two addresses", async () => {
    createComponent({ propsData: { addresses: [] } });
    let { wrappers } = wrapper.findAll(`[name="mode"] option`);
    expect(wrapper.vm.modes.length).toStrictEqual(2);
    expect(wrappers.length).toStrictEqual(wrapper.vm.modes.length);

    await wrapper.setProps({ addresses: ADDRESSES });
    wrappers = wrapper.findAll(`[name="mode"] option`).wrappers;
    expect(wrapper.vm.modes.length).toStrictEqual(4);
    expect(wrappers.length).toStrictEqual(wrapper.vm.modes.length);
    expect(wrappers[2].text()).toStrictEqual(ADDRESSES[0].name);
  });

  it("The phone input field contains the phone number if it is present in the input props", () => {
    createComponent({ propsData: { addresses: [], phone } });

    const inputWrapper = wrapper.find(`[name="phone"]`);

    expect(inputWrapper.element.value).toStrictEqual(phone);
  });

  it("Emits the current phone values when typing", async () => {
    createComponent({
      propsData: { addresses: ADDRESSES, address: createAddress() },
    });

    const inputWrapper = wrapper.find(`[name="phone"]`);

    inputWrapper.element.value = phone;
    await inputWrapper.trigger("input");

    expect(wrapper.emitted().changePhone[0][0]).toEqual(phone);
  });

  it("Fields for adding an address are not displayed in self mode", () => {
    createComponent({ propsData: { addresses: [] } });

    const optionWrapper = wrapper.find(`option[value="self"]`);
    const addressWrapper = wrapper.find(".cart-form__address");

    expect(optionWrapper.element.selected).toBeTruthy();
    expect(addressWrapper.exists()).toBeFalsy();
  });

  it("Fields for adding an address are empty in new address mode", () => {
    createComponent({ propsData: { addresses: [], address: createAddress() } });

    const optionWrapper = wrapper.find(`option[value="new"]`);
    const addressWrapper = wrapper.find(".cart-form__address");

    expect(optionWrapper.element.selected).toBeTruthy();
    addressFields.forEach((name) => {
      const inputWrapper = addressWrapper.find(`[name="${name}"]`);
      expect(inputWrapper.element.value).toStrictEqual("");
    });
  });

  it("Fields for adding an address have values in existed address mode", () => {
    const [address] = ADDRESSES;
    createComponent({ propsData: { addresses: ADDRESSES, address } });

    const optionWrapper = wrapper.find(`option[value="${address.id}"]`);
    const addressWrapper = wrapper.find(".cart-form__address");

    expect(optionWrapper.element.selected).toBeTruthy();
    addressFields.forEach((name) => {
      const inputWrapper = addressWrapper.find(`[name="${name}"]`);
      expect(inputWrapper.element.value).toStrictEqual(address[name]);
    });
  });

  it("Select current address triggers address change event", async () => {
    const [address] = ADDRESSES;
    createComponent({ propsData: { addresses: ADDRESSES, address } });

    const selectedWrapper = wrapper.find(`[name="mode"]`);

    await selectedWrapper.trigger("change");

    expect(wrapper.emitted().changeAddress[0][0]).toEqual(address);
  });

  it("Select 'new' mode triggers address change event", async () => {
    createComponent({
      propsData: { addresses: ADDRESSES, address: createAddress() },
    });

    const selectedWrapper = wrapper.find(`[name="mode"]`);

    await selectedWrapper.trigger("change");

    expect(wrapper.emitted().changeAddress[0][0]).toEqual({
      street: "",
      building: "",
      flat: "",
    });
  });

  it("Select 'self' mode triggers address change event", async () => {
    createComponent({ propsData: { addresses: [] } });

    const selectedWrapper = wrapper.find(`[name="mode"]`);

    await selectedWrapper.trigger("change");

    expect(wrapper.emitted().changeAddress[0][0]).toBeNull();
  });

  it.each(addressFields)(
    "Emits the current field value when typing",
    async (name) => {
      const [address] = ADDRESSES;
      const value = `test-${name}`;

      createComponent({ propsData: { addresses: ADDRESSES, address } });

      const inputWrapper = wrapper.find(`[name="${name}"]`);

      inputWrapper.element.value = value;
      await inputWrapper.trigger("input");

      expect(wrapper.emitted().updateAddress[0][0]).toEqual({ [name]: value });
    }
  );
});
