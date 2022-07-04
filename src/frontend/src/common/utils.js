export const getPositiveIntFromValue = (value) => {
  const number = parseInt(value, 10);
  const notPositive = isNaN(number) || number < 0;
  return notPositive ? 0 : number;
};

export const findItemById = (list, id) => {
  return list.find((item) => item.id === id);
};

export const spacifyNumber = (number, delimiter = "\u00A0") => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
};

export const wait = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));
