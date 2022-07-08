import { shallowMount } from "@vue/test-utils";
import { accumulateSrc } from "@/common/helpers";
import BlockPicture from "@/common/components/BlockPicture";

describe("BlockPicture", () => {
  const DEFAULT_PROPS = {
    remote: true,
    srcset: ["http://localhost:3000/public/img/users/user.jpg"],
  };
  let wrapper;

  const createComponent = (options = {}) => {
    wrapper = shallowMount(BlockPicture, {
      ...options,
      propsData: {
        ...DEFAULT_PROPS,
        ...options.propsData,
      },
    });
  };

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("picture").exists()).toBeTruthy();
  });

  it("Image tag with one picture has not width/height by default", async () => {
    createComponent();
    const imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("width")).toBeUndefined();
    expect(imgWrapper.attributes("height")).toBeUndefined();

    const width = "32";
    const height = "32";
    await wrapper.setProps({ width, height });
    expect(imgWrapper.attributes("width")).toEqual(width);
    expect(imgWrapper.attributes("height")).toEqual(height);
  });

  it("Image alt is prop alt", () => {
    const alt = "Test";
    createComponent({ propsData: { alt } });

    const imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("alt")).toEqual(alt);
  });

  it("Image tag with one picture has not srcset attribute", async () => {
    createComponent();
    const imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("srcset")).toBeUndefined();

    const srcset = [
      "http://localhost:3000/public/img/users/user.jpg",
      "http://localhost:3000/public/img/users/user@2x.jpg",
      "http://localhost:3000/public/img/users/user@4x.jpg",
    ];
    await wrapper.setProps({ srcset });
    expect(imgWrapper.attributes("srcset")).toEqual(
      accumulateSrc(srcset.slice(1), 2)
    );
  });

  it("It has source tag when webp set is added", async () => {
    createComponent();
    expect(wrapper.find("source").exists()).toBeFalsy();

    const webpset = [
      "http://localhost:3000/public/img/users/user.webp",
      "http://localhost:3000/public/img/users/user@2x.webp",
      "http://localhost:3000/public/img/users/user@4x.webp",
    ];
    await wrapper.setProps({ webpset });
    expect(wrapper.find("source").attributes("srcset")).toEqual(
      accumulateSrc(webpset)
    );
  });
});
