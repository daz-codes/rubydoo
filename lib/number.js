import { defineProperties } from "./define_properites.js";

defineProperties(Number.prototype, {
  // Accessors
  isEven: function () {
    return this % 2 === 0;
  },
  isOdd: function () {
    return this % 2 !== 0;
  },
  to_s: function () {
    return this.toString();
  },
  next: function () {
    return this + 1;
  },
  round: function () {
    return Math.round(this);
  },
  ceil: function () {
    return Math.ceil(this);
  },
  floor: function () {
    return Math.floor(this);
  },
  digits: function () {
    return [...Math.abs(this).toString()].map(Number);
  },
  factors: function () {
    return [...Array(Math.abs(this) + 1).keys()]
      .slice(1)
      .filter((x) => this % x === 0);
  },
  isPrime: function () {
    if (this < 2) return false;
    if (this % 2 === 0 && this !== 2) return false;
    for (let i = 3; i <= Math.sqrt(this); i += 2) {
      if (this % i === 0) return false;
    }
    return true;
  },
  isInteger: function () {
    return Number.isInteger(this);
  },
  isPositive: function () {
    return this > 0;
  },
  isNegative: function () {
    return this < 0;
  },
  isZero: function () {
    return this === 0;
  },
  isNonzero: function () {
    return this !== 0;
  },
  squared: function () {
    return this * this;
  },
  cubed: function () {
    return this ** 3;
  },
  ordinal: function () {
    if ([11, 12, 13].includes(this % 100)) return "th";
    return ["st", "nd", "rd"][(this % 10) - 1] || "th";
  },
  ordinalize: function () {
    return this.toString() + this.ordinal;
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
  lcm: function (n) {
    return (this * n) / this.gcd(n);
  },
  between: function (a, b) {
    return this >= a && this <= b;
  },
});
