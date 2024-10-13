import assert from "assert";
import "../lib/array.js";

const arr = [1,2,3,4,5]

describe("first,second,third,fourth and fifth", function () {
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
  it('should return the last element', function () {
    assert.equal(arr.last, 5);
  });
});