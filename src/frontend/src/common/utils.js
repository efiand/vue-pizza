export function makeCheckable(item, i) {
  return {
    ...item,
    checked: item.checked || !i,
  };
}

export function changeRadio(items, checkedItem) {
  return items.map((item) => ({
    ...item,
    checked: item === checkedItem,
  }));
}

export function findCheckedItem(arr) {
  return arr.find(({ checked }) => checked);
}

export function accumulateSumByKey(arr, key, getMultiplier = () => 1) {
  return arr.reduce((acc, item) => {
    return acc + item[key] * getMultiplier(item);
  }, 0);
}
