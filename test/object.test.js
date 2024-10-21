import assert from "assert";
import "../lib/object.js";
import "../lib/string.js";


const obj = {
  name: "Ruby Dooby Doo"
}


describe("empty", function () {
  it('should return true if an object has no properties', function () {
    assert.equal({}.empty, true);
  });
  it('should return false if an object has some properties', function () {
    assert.equal(obj.empty, false);
  });
});

describe("map", function () {
  it('should return an array', function () {
    assert.deepEqual(obj.map(([k,v]) => v.upcase), ["RUBY DOOBY DOO"]);
  });
});