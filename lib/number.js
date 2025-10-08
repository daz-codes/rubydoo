import { defineProperties } from "./define_properties.js";

defineProperties(Number.prototype, {
  // Accessors (getters)
  isEven: {
    get() {
      return this % 2 === 0;
    },
  },
  even: {
    get() {
      return this % 2 === 0;
    },
  },
  isOdd: {
    get() {
      return this % 2 !== 0;
    },
  },
  odd: {
    get() {
      return this % 2 !== 0;
    },
  },
  next: {
    get() {
      return this + 1;
    },
  },
  squared: {
    get() {
      return this * this;
    },
  },
  cubed: {
    get() {
      return this ** 3;
    },
  },
  ordinal: {
    get() {
      if ([11, 12, 13].includes(this % 100)) return "th";
      return ["st", "nd", "rd"][(this % 10) - 1] || "th";
    },
  },
  ordinalize: {
    get() {
      return this.toString() + this.ordinal;
    },
  },
  isInteger: {
    get() {
      return Number.isInteger(this);
    },
  },
  integer: {
    get() {
      return Number.isInteger(this);
    },
  },
  isPositive: {
    get() {
      return this > 0;
    },
  },
  positive: {
    get() {
      return this > 0;
    },
  },
  isNegative: {
    get() {
      return this < 0;
    },
  },
  negative: {
    get() {
      return this < 0;
    },
  },
  isZero: {
    get() {
      return this === 0;
    },
  },
  zero: {
    get() {
      return this === 0;
    },
  },
  isNonzero: {
    get() {
      return this !== 0;
    },
  },
  nonzero: {
    get() {
      return this === 0 ? undefined : this;
    },
  },
  digits: {
    get() {
      return [...Math.abs(this).toString()].map(Number);
    },
  },
  factors: {
    get() {
      return [...Array(Math.abs(this) + 1).keys()]
        .slice(1)
        .filter((x) => this % x === 0);
    },
  },
  isPrime: {
    get() {
      if (this < 2) return false;
      if (this % 2 === 0 && this !== 2) return false;
      for (let i = 3; i <= Math.sqrt(this); i += 2) {
        if (this % i === 0) return false;
      }
      return true;
    },
  },
  prime: {
    get() {
      this.isPrime;
    },
  },
  to_s: {
    get() {
      return this.toString();
    },
  },
  abs: {
    get() {
      return Math.abs(this);
    },
  },
  round: {
    get() {
      return this < 0 ? -1 * Math.round(Math.abs(this)) : Math.round(this);
    },
  },
  ceil: {
    get() {
      return Math.ceil(this);
    },
  },
  floor: {
    get() {
      return Math.floor(this);
    },
  },

  // Methods
  upto: function (n, func) {
    const arr = [...Array(Math.max(0, n - this + 1)).keys()].map(
      (x) => x + this,
    );
    return typeof func === "function" ? arr.forEach(func) : arr;
  },
  times: function (func) {
    for (let i = 0; i < this; i++) func(i);
  },
  mod: function (n) {
    return this % n;
  },
  divmod: function (n) {
    return [Math.floor(this / n), this % n];
  },
  gcd: function (n) {
    return n ? n.gcd(this % n) : this;
  },
  hcf: function (n) {
    return this.gcd(n);
  },
  lcm: function (n) {
    return (this * n) / this.gcd(n);
  },
  isBetween: function (a, b) {
    return this >= a && this <= b;
  },
  between: function (a, b) {
    return this >= a && this <= b;
  },
  eql: function (n) {
    return this === n;
  },
  multiple_of: function (n) {
    return this % n === 0;
  },
  divisible_by: function (n) {
    return this % n === 0;
  },
  divisor_of: function (n) {
    return n % this === 0;
  },
  factor_of: function (n) {
    return n % this === 0;
  },
});
