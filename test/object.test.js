import assert from "assert";
import "../lib/object.js";
import "../lib/string.js";

describe("Monkey patched Object methods", function () {
  
  const obj = { a: 1, b: 2, c: 3 };
  const emptyObj = {};

  describe(".empty", function () {
    it("should return true for an empty object", function () {
      assert.equal(emptyObj.empty, true);
    });

    it("should return false for a non-empty object", function () {
      assert.equal(obj.empty, false);
    });
  });

  describe(".size", function () {
    it("should return 0 for an empty object", function () {
      assert.equal(emptyObj.size, 0);
    });

    it("should return the correct size for a non-empty object", function () {
      assert.equal(obj.size, 3);
    });
  });

  describe(".values", function () {
    it("should return the correct values for a non-empty object", function () {
      assert.deepEqual(obj.values, [1, 2, 3]);
    });
  });

  describe(".keys", function () {
    it("should return the correct keys for a non-empty object", function () {
      assert.deepEqual(obj.keys, ["a", "b", "c"]);
    });
  });

  describe(".entries", function () {
    it("should return the correct entries for a non-empty object", function () {
      assert.deepEqual(obj.entries, [["a", 1], ["b", 2], ["c", 3]]);
    });
  });

  describe(".clear", function () {
    it("should clear all properties from an object", function () {
      const objCopy = { ...obj };
      objCopy.clear;
      assert.equal(objCopy.empty, true);
    });
  });

  describe(".compact", function () {
    it("should remove null or undefined values", function () {
      const objWithNulls = { a: 1, b: null, c: undefined, d: 4 };
      assert.deepEqual(objWithNulls.compact, { a: 1, d: 4 });
    });
  });

  describe(".map", function () {
    it("should map entries of the object", function () {
      const result = obj.map(([k, v]) => [k, v * 2]);
      assert.deepEqual(result, [["a", 2], ["b", 4], ["c", 6]]);
    });
  });

  describe(".select", function () {
    it("should select entries based on the given function", function () {
      const result = obj.select(([k, v]) => v > 1);
      assert.deepEqual(result, [["b", 2], ["c", 3]]);
    });
  });

  describe(".reject", function () {
    it("should reject entries based on the given function", function () {
      const result = obj.reject(([k, v]) => v > 1);
      assert.deepEqual(result, [["a", 1]]);
    });
  });

  describe(".any", function () {
    it("should return true if any entry matches the condition", function () {
      assert.equal(obj.any(([k, v]) => v > 2), true);
    });

    it("should return false if no entry matches the condition", function () {
      assert.equal(obj.any(([k, v]) => v > 3), false);
    });

    it("should return true if the object has any entries", function () {
      assert.equal(obj.any(), true);
    });

    it("should return false if the object is empty", function () {
      assert.equal(emptyObj.any(), false);
    });
  });

});