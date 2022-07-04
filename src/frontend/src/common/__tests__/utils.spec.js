import {
  getPositiveIntFromValue,
  findItemById,
  spacifyNumber,
} from "@/common/utils";

describe("Test utilities", () => {
  it("Test getPositiveIntFromValue", () => {
    expect(getPositiveIntFromValue(10)).toStrictEqual(10);
    expect(getPositiveIntFromValue("8")).toStrictEqual(8);
    expect(getPositiveIntFromValue("4.33")).toStrictEqual(4);
    expect(getPositiveIntFromValue("test")).toStrictEqual(0);
    expect(getPositiveIntFromValue(true)).toStrictEqual(0);
    expect(getPositiveIntFromValue("-16")).toStrictEqual(0);
    expect(getPositiveIntFromValue(NaN)).toStrictEqual(0);
  });

  it("Test findItemById", () => {
    const list = [{ id: 2 }, { id: 1 }, { id: "test" }];
    expect(findItemById(list, 1)).toEqual(list[1]);
    expect(findItemById(list, "test")).toEqual(list[2]);
  });

  it("Test spacifyNumber", () => {
    expect(spacifyNumber(1004003)).toEqual("1\u00A0004\u00A0003");
    expect(spacifyNumber("1000000000", "-")).toEqual("1-000-000-000");
  });
});
