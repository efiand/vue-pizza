import { mount } from "@vue/test-utils";
import "@/plugins/ui";
import { Message } from "@/common/constants";
import NotFoundView from "@/views/NotFoundView";

describe("NotFoundView", () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount(NotFoundView);
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find(".content").exists()).toBeTruthy();
  });

  it("Heading has correct message", () => {
    createComponent();
    expect(wrapper.find(".heading.content__title").text()).toStrictEqual(
      Message.PAGE_NOT_FOUND
    );
  });
});
