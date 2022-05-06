export function getPositiveIntFromValue(value) {
  const number = parseInt(value, 10);
  const notPositive = isNaN(number) || number < 0;
  return notPositive ? 0 : number;
}

export function findItemByAlias(list, checkableAlias) {
  return list.find(({ alias }) => alias === checkableAlias);
}

export function accumulateSumByKey(arr, key, getMultiplier = () => 1) {
  return arr.reduce((sum, item) => {
    return sum + item[key] * getMultiplier(item);
  }, 0);
}

export function accumulateStructureByAliases(list) {
  return list.reduce((obj, { alias }) => {
    obj[alias] = 0;
    return obj;
  }, {});
}

export function spacifyNumber(number, delimiter = "\u00A0") {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}
