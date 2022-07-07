import { shallowMount } from "@vue/test-utils";
import { accumulateSrc } from "@/common/helpers";
import BlockPicture from "@/common/components/BlockPicture";

describe("BlockPicture", () => {
  const srcset = [
    "http://localhost:3000/public/img/users/user.jpg",
    "http://localhost:3000/public/img/users/user@2x.jpg",
  ];
  const webpset = [
    "http://localhost:3000/public/img/users/user.webp",
    "http://localhost:3000/public/img/users/user@2x.webp",
  ];
  const size = {
    width: "32",
    height: "32",
  };
  const propsData = {
    alt: "Вася Пупкин",
    remote: true,
    srcset: ["http://localhost:3000/public/img/users/user.jpg"],
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(BlockPicture, { propsData, ...options });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("Is rendered", () => {
    createComponent();
    expect(wrapper.find("picture").exists()).toBeTruthy();
  });

  it("Image tag with one picture has not width/height by default", async () => {
    createComponent();
    const imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("width")).toBeUndefined();
    expect(imgWrapper.attributes("height")).toBeUndefined();

    await wrapper.setProps({ ...size });
    expect(imgWrapper.attributes("width")).toEqual(size.width);
    expect(imgWrapper.attributes("height")).toEqual(size.height);
  });

  it("Image alt is prop alt", () => {
    createComponent();
    const imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("alt")).toEqual(propsData.alt);
  });

  it("Image tag with one picture has not srcset attribute", async () => {
    createComponent();
    const imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("srcset")).toBeUndefined();

    await wrapper.setProps({ srcset });
    expect(imgWrapper.attributes("srcset")).toEqual(
      accumulateSrc(srcset.slice(1), 2)
    );
  });

  it("It has source tag when webp set is added", async () => {
    createComponent();
    expect(wrapper.find("source").exists()).toBeFalsy();

    await wrapper.setProps({ webpset });
    expect(wrapper.find("source").attributes("srcset")).toEqual(
      accumulateSrc(webpset)
    );
  });
});
