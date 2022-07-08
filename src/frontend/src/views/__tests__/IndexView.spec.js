import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { UPDATE_ORDER } from "@/store/mutation-types";
import { generateMockStore, content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import IndexView from "@/views/IndexView";

describe("IndexView", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(IndexView, {
      store,
      stubs: ["RouterView"],
      mocks: {
        $route: {
          query: {},
        },
      },
      propsData: { content },
      ...options,
    });
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".index").exists()).toBeTruthy();
  });

  it("Renders dough", () => {
    createComponent();
    const doughWrapper = wrapper.findAll(".index__dough-radio");
    expect(doughWrapper.wrappers.length).toStrictEqual(content.dough.length);
  });

  it("Dough checked according to default value", () => {
    createComponent();
    const { doughId } = wrapper.vm.pizza;
    const inputWrapper = wrapper.find(`.index__dough-radio :checked`);
    expect(+inputWrapper.element.value).toStrictEqual(doughId);
  });

  it("Choosing a dough leads to a change in pizza data", async () => {
    createComponent();
    const inputWrapper = wrapper.find(`.index__dough-radio:last-child input`);
    await inputWrapper.trigger("change");
    const { doughId } = wrapper.vm.pizza;
    expect(doughId).toStrictEqual(+inputWrapper.element.value);
  });

  it("Renders sizes", () => {
    createComponent();
    const sizeWrappers = wrapper.findAll(".index__size-radio").wrappers;
    expect(sizeWrappers.length).toStrictEqual(content.sizes.length);
  });

  it("Size checked according to default value", () => {
    createComponent();
    const { sizeId } = wrapper.vm.pizza;
    const inputWrapper = wrapper.find(`.index__size-radio :checked`);
    expect(+inputWrapper.element.value).toStrictEqual(sizeId);
  });

  it("Choosing a size leads to a change in pizza data", async () => {
    createComponent();
    const inputWrapper = wrapper.find(`.index__size-radio:last-child input`);
    await inputWrapper.trigger("change");
    const { sizeId } = wrapper.vm.pizza;
    expect(sizeId).toStrictEqual(+inputWrapper.element.value);
  });

  it("Renders sauces", () => {
    createComponent();
    const sauceWrapper = wrapper.findAll(".index__sauce-radio");
    expect(sauceWrapper.wrappers.length).toStrictEqual(content.sauces.length);
  });

  it("Sauce checked according to default value", () => {
    createComponent();
    const { sauceId } = wrapper.vm.pizza;
    const inputWrapper = wrapper.find(`.index__sauce-radio :checked`);
    expect(+inputWrapper.element.value).toStrictEqual(sauceId);
  });

  it("Choosing a sauce leads to a change in pizza data", async () => {
    createComponent();
    const inputWrapper = wrapper.find(`.index__sauce-radio:last-of-type input`);
    await inputWrapper.trigger("change");
    const { sauceId } = wrapper.vm.pizza;
    expect(sauceId).toStrictEqual(+inputWrapper.element.value);
  });

  it("Choosing an ingredient leads to a change in pizza data", async () => {
    createComponent();
    const increaserWrapper = wrapper.find(`.counter__button--plus`);
    await increaserWrapper.trigger("click");
    const [{ quantity }] = wrapper.vm.pizza.ingredients;
    expect(quantity).toStrictEqual(1);
  });

  it("Submit button is enabled when type name and choose one ingredient", async () => {
    createComponent();
    const submitWrapper = wrapper.find(`button[type="submit"]`);
    expect(submitWrapper.attributes("disabled")).toBeTruthy();

    const increaserWrapper = wrapper.find(`.counter__button--plus`);
    const nameWrapper = wrapper.find(`input[name="pizza_name"]`);
    nameWrapper.element.value = "Test";
    await Promise.all([
      increaserWrapper.trigger("click"),
      nameWrapper.trigger("input"),
    ]);
    expect(submitWrapper.attributes("disabled")).toBeFalsy();
  });

  it("Render with default pizza with route param and no pizzas", async () => {
    createComponent({
      mocks: {
        $route: {
          query: {
            i: "0",
          },
        },
      },
    });
    const nameWrapper = wrapper.find(`input[name="pizza_name"]`);
    expect(nameWrapper.element.value).toBeFalsy();
  });

  it("Render with existed pizza with route param", async () => {
    store.commit(`Cart/${UPDATE_ORDER}`, MOCK_ORDER);
    createComponent({
      mocks: {
        $route: {
          query: {
            i: "1",
          },
        },
      },
    });
    const nameWrapper = wrapper.find(`input[name="pizza_name"]`);
    expect(nameWrapper.element.value).toStrictEqual(MOCK_ORDER.pizzas[1].name);
  });

  it("Calls the vuex mutation on submit form and clear interface", async () => {
    createComponent();

    const spyOnMutation = jest.spyOn(wrapper.vm, "updateOrder");
    const increaserWrapper = wrapper.find(`.counter__button--plus`);
    const nameWrapper = wrapper.find(`input[name="pizza_name"]`);
    const formWrapper = wrapper.find(`form`);
    const submitData = {
      pizzas: [...wrapper.vm.currentOrder.pizzas, wrapper.vm.pizza],
    };

    await Promise.all([
      increaserWrapper.trigger("click"),
      nameWrapper.trigger("input"),
    ]);
    await formWrapper.trigger("submit");

    expect(spyOnMutation).toHaveBeenCalledWith(submitData);
    expect(nameWrapper.element.value).toBeFalsy(); // Clear form
  });

  it("Drag and drop ingredient", async () => {
    createComponent();

    const TEST_ID = 10;
    const { quantity } = wrapper.vm.pizza.ingredients[TEST_ID - 1];
    const eventStub = {
      dataTransfer: {
        setData() {},
        getData() {
          return `{ "ingredientId": ${TEST_ID} }`;
        },
      },
    };

    const ingredientWrapper = wrapper.find('[data-test="ingredient-10"]');
    const pizzaWrapper = wrapper.find(".pizza");

    await ingredientWrapper.trigger("dragstart", eventStub);
    await pizzaWrapper.trigger("drop", eventStub);

    expect(wrapper.vm.pizza.ingredients[TEST_ID - 1].quantity).toStrictEqual(
      quantity + 1
    );
  });
});
