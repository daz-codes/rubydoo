import assert from "assert";
import "../lib/number.js";
import "../lib/string.js";
import "../lib/array.js";

const arr = (1).upto(50)
console.log(arr)

describe("first,second,third,fourth, fifth and 42nd", function () {
  it('should return the first element', function () {
    assert.equal(arr.first, 1);
  });
  it('should return the second element', function () {
    assert.equal(arr.second, 2);
  });
  it('should return the third element', function () {
    assert.equal(arr.third, 3);
  });
  it('should return the fouth element', function () {
    assert.equal(arr.fourth, 4);
  });
  it('should return the fifth element', function () {
    assert.equal(arr.fifth, 5);
  });
  it('should return the 42nd element', function () {
    assert.equal(arr.forty_two, 42);
  });
  it('should return the third to last element', function () {
    assert.equal(arr.third_to_last, 48);
  });
  it('should return the second to last element', function () {
    assert.equal(arr.second_to_last, 49);
  });
  it('should return the last element', function () {
    assert.equal(arr.last, 50);
  });
});

describe("empty", function () {
  it('should return true if the array is empty', function () {
    assert.equal([].empty, true);
  });
  it('should return false if the array is not empty', function () {
    assert.equal(arr.empty, false);
  });
});

describe("clear", function () {
  it('should return an empty array', function () {
    assert.deepEqual([1,2,3].clear, []);
  });
  it('should return an empty array, even if it starts empty', function () {
    assert.deepEqual([].clear, []);
  });
});

describe("size", function () {
  it('should return the number of items in the array', function () {
    assert.equal(arr.size, 50);
  });
});

describe("max, min, sum", function () {
  it('should return the largest value in the array', function () {
    assert.equal(arr.max, 50);
  });
  it('should return the smallest value in the array', function () {
    assert.equal(arr.min, 1);
  });
  it('should return the result of summing all the values in the array', function () {
    assert.equal(arr.sum, 1275);
  });
});

describe("uniq", function () {
  it('should return the the array with any duplicated values removed', function () {
    assert.deepEqual([1,2,2,3,3,3].uniq, [1,2,3]);
  });
});

describe("compact", function () {
  it('should return the the array with any null or undefined values removed', function () {
    assert.deepEqual([1,2,null,undefined,3,null,undefined].compact, [1,2,3]);
  });
});

describe("to_sentence", function () {
  it('should return a string that joins all the values in the array with commas with and at the end', function () {
    assert.equal(["Ruby","Dooby","Doo"].to_sentence, "Ruby, Dooby, and Doo");
  });
});

describe("to_param", function () {
  it('should return a string that joins all the values with /', function () {
    assert.equal(["Ruby","Dooby","Doo"].to_param, "Ruby/Dooby/Doo");
  });
});

describe("any", function () {
  it('should return true if at least one of the items returns true for the function provided', function () {
    assert.equal(arr.any(n => n.even), true);
  });
  it('should return false if none of the items returns true for the function provided', function () {
    assert.equal(arr.any(n => n > 100), false);
  });
  it('should return true if a function is not provided but the array has some items', function () {
    assert.equal(arr.any(), true);
  });
  it('should return false if a function is not provided but the array is empty', function () {
    assert.equal([].any(), false);
  });
});

describe("reject", function () {
  it('should return items that return false to the function provided', function () {
    assert.deepEqual(arr.reject(n => n > 3), [1,2,3]);
  });
});

describe("partition", function () {
  it('should return a nested array, the first array should contain all the values that return true to the function given and the second array should contain all the items that return false', function () {
    assert.deepEqual(["Ruby","Dooby","Doo"].partition(word => word.starts_with("D")), [["Dooby","Doo"],["Ruby"]]);
  });
});

describe("count", function () {
  it('should return the number of items that return true for the function provided', function () {
    assert.equal(arr.count(n => n.even), 25);
  });
  it('should return false if none of the items returns true for the function provided', function () {
    assert.equal(arr.count(n => n > 100), 0);
  });
  it('should return the length of the array if a function is not provided but the array has some items', function () {
    assert.equal(arr.count(), 50);
  });
  it('should return zero if a function is not provided but the array is empty', function () {
    assert.equal([].count(), 0);
  });
});

describe("pluck", function () {
  it('should return an array of just the values of the key provided', function () {
    assert.deepEqual([{id: 1, name: "Ruby"},{id: 2, name: "Dooby"},{id: 3, name: "Doo"}].pluck("id"), [1,2,3]);
  });
});

describe("from", function () {
  it('should return an array starting from the index provided', function () {
    assert.deepEqual(arr.from(45), [46,47,48,49,50]);
  });
});