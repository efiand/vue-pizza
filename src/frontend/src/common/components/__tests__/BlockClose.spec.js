import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import BlockClose from "@/common/components/BlockClose";

describe("BlockClose", () => {
  const stubs = { RouterLink: RouterLinkStub };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(BlockClose, {
      stubs,
      ...options,
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".close").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    const slots = { default: "Test" };
    createComponent({ slots });
    const textWrapper = wrapper.find("span.visually-hidden");
    expect(textWrapper.html()).toContain(slots.default);
  });

  it("Raises the close event on click", async () => {
    createComponent();

    const closerWrapper = wrapper.find(".close");
    await closerWrapper.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("It is a button by default and become a white link when props passed", async () => {
    createComponent();
    expect(wrapper.find("button.close").exists()).toBeTruthy();

    await wrapper.setProps({
      isWhite: true,
      to: "/", // Пропс отвечает за генерацию ссылки вместо кнопки
    });
    expect(wrapper.find("a.close.close--white").exists()).toBeTruthy();
  });
});
