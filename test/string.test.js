import assert from "assert";
import "../lib/string.js";

const str = "Ruby Dooby Doo!"

describe("reverse function", function () {
  it("return the string written backwards", function () {
    assert.equal(str.reverse, "!ooD ybooD ybuR");
  });
});