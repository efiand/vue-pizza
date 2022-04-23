export function getPositiveIntFromValue(value) {
  const number = parseInt(value, 10);
  return isNaN(number) || number < 0 ? 0 : number;
}

export function findItemByAlias(list, checkableAlias) {
  return list.find(({ alias }) => alias === checkableAlias);
}

export function accumulateSumByKey(arr, key, getMultiplier = () => 1) {
  return arr.reduce((sum, item) => {
    return sum + item[key] * getMultiplier(item);
  }, 0);
}
