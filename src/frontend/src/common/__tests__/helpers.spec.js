import {
  createOrder,
  createAddress,
  adaptAddress,
  getFileName,
  adaptContentItem,
  getSrcset,
  adaptUserData,
  adaptContentEntity,
} from "@/common/helpers";
import { API_URL } from "@/common/constants";
import { DOUGH } from "@/store/mocks/data";

describe("Testing helpers functions", () => {
  const image = `/public/img/users/user.jpg`;

  it("Test createOrder", () => {
    const emptyOrder = {
      userId: null,
      phone: "",
      address: null,
      pizzas: [],
    };
    const order = createOrder();
    expect(order).toStrictEqual(emptyOrder);
  });

  it("Test createAddress", () => {
    const userId = 1;
    const emptyAddress = {
      userId,
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    };
    expect(createAddress(userId)).toStrictEqual(emptyAddress);

    emptyAddress.userId = null;
    expect(createAddress()).toStrictEqual(emptyAddress);
  });

  it("Test adaptAddress", () => {
    const emptyAddress = {
      flat: "",
      comment: "",
    };
    expect(adaptAddress({})).toStrictEqual(emptyAddress);
  });

  it("Test getFileName", () => {
    const fileName = "user";

    expect(getFileName(image)).toStrictEqual(fileName);
  });

  it("Test adaptContentItem", () => {
    expect(adaptContentItem({ image }).image).toStrictEqual(`${API_URL}${image}`);
  });

  it("Test getSrcset", () => {
    const jpgSet = {
      x1: "/public/img/users/user.jpg",
      x2: "/public/img/users/user@2x.jpg",
      x4: "/public/img/users/user@4x.jpg",
    };
    const webpSet = {
      x1: "/public/img/users/user.webp",
      x2: "/public/img/users/user@2x.webp",
      x4: "/public/img/users/user@4x.webp",
    };
    expect(getSrcset(image)).toStrictEqual(jpgSet);
    expect(getSrcset(image, "webp")).toStrictEqual(webpSet);
  });

  it("Test adaptUserData", () => {
    const avatar = `${API_URL}${image}`;
    const expectedUserData = {
      avatar,
      srcset: getSrcset(avatar),
      webpset: getSrcset(avatar, "webp"),
    };
    expect(adaptUserData({ avatar: image })).toStrictEqual(expectedUserData);
  });

  it("Test adaptContentEntity", () => {
    const expectedItems = DOUGH.slice(0, 2);
    expect(adaptContentEntity(DOUGH)).toStrictEqual(expectedItems);
  });
});
