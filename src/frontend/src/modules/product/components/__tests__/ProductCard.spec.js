import { mount, RouterLinkStub } from "@vue/test-utils";
import "@/plugins/ui";
import { content } from "@/store/mocks";
import { MOCK_ORDER } from "@/store/mocks/data";
import ProductCard from "@/modules/product/components/ProductCard";

describe("ProductCard", () => {
  const [pizza] = MOCK_ORDER.pizzas;
  let wrapper;

  const createComponent = () => {
    wrapper = mount(ProductCard, {
      stubs: { RouterLink: RouterLinkStub },
      propsData: {
        content,
        pizza,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".product").exists()).toBeTruthy();
  });

  it("Render heading with product name", () => {
    createComponent();
    expect(wrapper.find(".product__text h2").html()).toContain(pizza.name);
  });

  it("Render product info", () => {
    const texts = [
      "45 см, на тонком тесте",
      "Соус: томатный",
      "Начинка: грибы, томаты",
    ];
    createComponent();

    wrapper.findAll(".product__text li").wrappers.forEach((itemWrapper, i) => {
      expect(itemWrapper.element.textContent).toStrictEqual(texts[i]);
    });
  });
});
