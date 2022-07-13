import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  ReadOnlyApiService,
} from "@/services/api";
import { API_URL } from "@/common/constants";

export const createOrder = () => ({
  userId: null,
  phone: "",
  address: null,
  pizzas: [],
});

export const createAddress = (userId = null) => ({
  userId,
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

export const adaptAddress = (address) => {
  if (!address.flat) {
    address.flat = "";
  }
  if (!address.comment) {
    address.comment = "";
  }
  return address;
};

export const createResources = (notifier) => ({
  [resources.AUTH]: new AuthApiService(notifier),
  [resources.DOUGH]: new ReadOnlyApiService(resources.DOUGH, notifier),
  [resources.INGREDIENTS]: new ReadOnlyApiService(
    resources.INGREDIENTS,
    notifier
  ),
  [resources.MISC]: new ReadOnlyApiService(resources.MISC, notifier),
  [resources.SAUCES]: new ReadOnlyApiService(resources.SAUCES, notifier),
  [resources.SIZES]: new ReadOnlyApiService(resources.SIZES, notifier),
  [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
  [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
});

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Profile/getMe");
};

export const getFileName = (url) => url.replace(/^.*\/(.*?)\..*$/, "$1");

export const adaptContentItem = (contentItem) => {
  if (contentItem.image) {
    contentItem.image = `${API_URL}${contentItem.image}`;
  }

  return contentItem;
};

export const getSrcset = (url, targetExt = "jpg") => {
  const fileName = getFileName(url);
  const fileNameWithExt = `${fileName}.jpg`;

  return {
    x1: url.replace(fileNameWithExt, `${fileName}.${targetExt}`),
    x2: url.replace(fileNameWithExt, `${fileName}@2x.${targetExt}`),
    x4: url.replace(fileNameWithExt, `${fileName}@4x.${targetExt}`),
  };
};

export const adaptUserData = (userData) => {
  const avatar = `${API_URL}${userData.avatar}`;

  return {
    ...userData,
    avatar,
    srcset: getSrcset(avatar),
    webpset: getSrcset(avatar, "webp"),
  };
};

export const adaptContentEntity = (contentEntity) => {
  const newContentEntity = [];

  for (const contentItem of contentEntity) {
    if (!newContentEntity.some(({ name }) => name === contentItem.name)) {
      newContentEntity.push(adaptContentItem(contentItem));
    }
  }
  return newContentEntity;
};

export const accumulateSrc = (srcset, firstIndex = 1) =>
  srcset.map((filename, i) => `${filename} ${i + firstIndex}x`).join(", ");
