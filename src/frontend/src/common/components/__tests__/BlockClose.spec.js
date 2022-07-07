import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import BlockClose from "@/common/components/BlockClose";

describe("BlockClose", () => {
  const slots = { default: "Close" };
  const listeners = { close: null };
  const propsData = {
    isWhite: true,
    to: "/", // Пропс отвечает за генерацию ссылки вместо кнопки
  };
  const stubs = { RouterLink: RouterLinkStub };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockClose, { ...options, stubs });
  };

  beforeEach(() => {
    listeners.close = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".close").exists()).toBeTruthy();
  });

  it("Renders out the slot content", () => {
    createComponent({ slots });
    const textWrapper = wrapper.find("span.visually-hidden");
    expect(textWrapper.html()).toContain(slots.default);
  });

  it("Raises the close event on click", async () => {
    createComponent({ listeners });
    await wrapper.find(".close").trigger("click");
    expect(listeners.close).toHaveBeenCalled();
  });

  it("It is button", () => {
    createComponent();
    expect(wrapper.find("button.close").exists()).toBeTruthy();
  });

  it("It is white link when props passed", () => {
    createComponent({ propsData });
    const linkWrapper = wrapper.find("a.close.close--white");
    expect(linkWrapper.exists()).toBeTruthy();
  });
});