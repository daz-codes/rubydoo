import assert from "assert";
import "../lib/number.js";

const n = 29
const decimal = 29.5

describe("odd and even", function () {
  it("should return if a number is even", function () {
    assert.equal(n.even, false);
  });
  it("should return if a number is odd", function () {
    assert.equal(n.odd, true);
  });
});

describe("to _s", function () {
  it("should return the number as a string", function () {
    assert.equal(n.to_s, "29");
  });
});

describe("next", function () {
  it("should return the next integer", function () {
    assert.equal(n.next, 30);
  });
});

describe("rounding", function () {
  it("should return the integer part of the number", function () {
    assert.equal(decimal.floor, 29);
  });
  it("should return the number if it is an integer or the next integer if it has a decimal part", function () {
    assert.equal(decimal.ceil, 30);
  });
  it("should return the number rounded up or down depending on the decimal part", function () {
    assert.equal(decimal.round, 30);
  });
});

describe("information about the number", function () {
  it("should return true if the number is positive", function () {
    assert.equal(n.positive, true);
  });
  it("should return true if the number is negative", function () {
    assert.equal(n.negative, false);
  });
  it("should return true if the number is zero", function () {
    assert.equal(n.zero, false);
  });
  it("should return true if the number is non-zero", function () {
    assert.equal(n.nonzero, true);
  });
  it("should return true if the number is prime", function () {
    assert.equal(n.prime, true);
  });
  it("should return true if the number is an integer", function () {
    assert.equal(n.integer, true);
  });
});

describe("factors", function () {
  it("should return an array of factors of the number", function () {
    assert.deepEqual(n.factors, [1,29]);
  });
});

describe("digits", function () {
  it("should return an array of the digits of the number", function () {
    assert.deepEqual(n.digits, [2,9]);
  });
});

describe("ordinalize", function () {
  it("should return the string th if the number ends in anything except 1,2 or 3", function () {
    assert.equal(n.ordinal, "th");
  });
  it("should return st if the number ends in a 1", function () {
    assert.equal((121).ordinal, "st");
  });
  it("should return nd on if the number ends in a 2", function () {
    assert.equal((42).ordinal, "nd");
  });
  it("should return rd if the number ends in a 3", function () {
    assert.equal((3).ordinal, "rd");
  });
});

describe("ordinalize", function () {
  it("should return a string with th on the end of the number if it ends in anything except 1,2 or 3", function () {
    assert.equal(n.ordinalize, "29th");
  });
  it("should return a next a string with st on the end if the number ends in a 1", function () {
    assert.equal((121).ordinalize, "121st");
  });
  it("should return the a string with nd on the end if the number ends in a 2", function () {
    assert.equal((42).ordinalize, "42nd");
  });
  it("should return the a string with rd on the end if the number ends in a 3", function () {
    assert.equal((3).ordinalize, "3rd");
  });
});

describe("upto", function () {
  it("should return an array of the numbers from the number up to and including the number provided as an argument", function () {
    assert.deepEqual(n.upto(35), [29,30,31,32,33,34,35]);
  });
});

describe("times", function () {
  it("should perform a funtion the given number of times", function () {
    let count = 0
    n.times(() => count ++)
    assert.equal(count, n);
  });
});

describe("mod and divmod", function () {
  it("should return the number remainder when the number is divided by the argument provided", function () {
    assert.equal(n.mod(5), 4);
  });
  it("should return an array containing the integer part of the result of dividing by the argument provided and the remainder", function () {
    assert.deepEqual(n.divmod(5), [5,4]);
  });
});

describe("between", function () {
  it("should return true if the number is between the two numbers provided as arguments", function () {
    assert.equal(n.between(20,30), true);
  });
  it("should return false if the number is not between the two numbers provided as arguments", function () {
    assert.equal(n.between(30,40), false);
  });
});

describe("square and cubed", function () {
  it("should return the number squared", function () {
    assert.equal(n.squared, 841);
  });
  it("should return the number cubed", function () {
    assert.equal(n.cubed, 24389);
  });
});

