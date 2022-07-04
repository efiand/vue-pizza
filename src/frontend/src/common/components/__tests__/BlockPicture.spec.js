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

  it("Image tag with one picture has not srcset attribute", () => {
    createComponent();
    let imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("srcset")).toBeUndefined();
  });

  it("Image tag with one picture has not width/height by default", () => {
    createComponent();
    let imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("width")).toBeUndefined();
    expect(imgWrapper.attributes("height")).toBeUndefined();
  });

  it("Image tag with one picture has not width/height by default", () => {
    createComponent({ propsData: { ...propsData, ...size } });
    let imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("width")).toEqual(size.width);
    expect(imgWrapper.attributes("height")).toEqual(size.height);
  });

  it("Image alt is prop alt", () => {
    createComponent();
    let imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("alt")).toEqual(propsData.alt);
  });

  it("It has not source tag when webp set is default (empty)", () => {
    createComponent();
    let imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("srcset")).toBeUndefined();
  });

  it("Image tag with two pictures has srcset attribute", () => {
    createComponent({ propsData: { ...propsData, srcset } });
    let imgWrapper = wrapper.find("img");
    expect(imgWrapper.attributes("srcset")).toEqual(
      accumulateSrc(srcset.slice(1), 2)
    );
  });

  it("It has source tag when webp set is added", () => {
    createComponent({ propsData: { ...propsData, webpset } });
    let sourceWrapper = wrapper.find("source");
    expect(sourceWrapper.attributes("srcset")).toEqual(accumulateSrc(webpset));
  });
});
