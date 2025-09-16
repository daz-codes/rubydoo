import { defineProperties } from "./define_properites.js";

defineProperties(Array.prototype, {
  // Accessors
  first: function () {
    return this[0];
  },
  second: function () {
    return this[1];
  },
  third: function () {
    return this[2];
  },
  fourth: function () {
    return this[3];
  },
  fifth: function () {
    return this[4];
  },
  forty_two: function () {
    return this[41];
  },
  third_to_last: function () {
    return this[this.length - 3];
  },
  second_to_last: function () {
    return this[this.length - 2];
  },
  last: function () {
    return this[this.length - 1];
  },
  empty: function () {
    return this.length === 0;
  },
  size: function () {
    return this.length;
  },
  min: function () {
    return this.length ? Math.min(...this) : undefined;
  },
  max: function () {
    return this.length ? Math.max(...this) : undefined;
  },
  uniq: function () {
    return Array.from(new Set(this));
  },
  sum: function () {
    return this.reduce((sum, x) => sum + x, 0);
  },
  compact: function () {
    return this.filter((x) => x != null);
  },
  to_param: function () {
    return this.join("/");
  },
  to_sentence: function () {
    if (this.length === 0) return "";
    if (this.length === 1) return String(this[0]);
    return this.slice(0, -1).join(", ") + " and " + this.last;
  },
  tally: function () {
    return this.reduce((totals, x) => {
      totals[x] = (totals[x] || 0) + 1;
      return totals;
    }, {});
  },

  // Methods
  clear: function () {
    this.length = 0;
    return this;
  },
  shuffle: function () {
    const arr = [...this];
    for (let i = arr.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[r]] = [arr[r], arr[i]];
    }
    return arr;
  },
  transpose: function () {
    return this.length === 0
      ? []
      : this[0].map((_, i) => this.map((row) => row[i]));
  },
  sample: function (n = 1) {
    const arr = [...this];
    const sample = [];
    for (let i = 0; i < n; i++) {
      if (!arr.length) break;
      const index = Math.floor(Math.random() * arr.length);
      sample.push(arr.splice(index, 1)[0]);
    }
    return n === 1 ? sample[0] : sample;
  },
  any: function (func) {
    return func ? this.some(func) : this.length > 0;
  },
  one: function (func) {
    return func ? this.filter(func).length === 1 : this.length === 1;
  },
  reject: function (func) {
    return func ? this.filter((x) => !func(x)) : this;
  },
  partition: function (func) {
    return [this.filter(func), this.filter((x) => !func(x))];
  },
  count: function (func) {
    return func ? this.filter(func).length : this.length;
  },
  pluck: function (prop) {
    return this.map((obj) => obj[prop]);
  },
  from: function (n) {
    return this.slice(n) || [];
  },
  combination: function (n) {
    if (n <= 0 || n > this.length) return [];
    const result = [];
    const comb = (arr, temp = []) => {
      if (temp.length === n) {
        result.push(temp);
        return;
      }
      for (let i = 0; i < arr.length; i++)
        comb(arr.slice(i + 1), temp.concat(arr[i]));
    };
    comb(this);
    return result;
  },
  product: function (arr) {
    if (!arr) return this.map((x) => [x]);
    if (arr.length === 0) return [];
    return this.flatMap((x) => arr.map((y) => [x, y]));
  },
  each_cons: function (n, func) {
    const cons = this.map((_, i) => this.slice(i, i + n)).slice(0, -(n - 1));
    return this.length < n ? [] : func ? cons.map(func) : cons;
  },
  rotate: function (n = 1) {
    return [...this.slice(n % this.length), ...this.slice(0, n % this.length)];
  },
  zip: function (arr) {
    return this.map((n, i) => (arr[i] ? [n, arr[i]] : null)).filter(Boolean);
  },
  union: function (...arrs) {
    return [...new Set([...this, ...arrs.flat()])];
  },
  intersection: function (...arrs) {
    return [...new Set(this.filter((v) => arrs.every((a) => a.includes(v))))];
  },
  difference: function (...arrs) {
    return [...new Set(this.filter((v) => arrs.every((a) => !a.includes(v))))];
  },
  delete_at: function (n) {
    if (n < -this.length || n >= this.length) return undefined;
    return this.splice(n < 0 ? this.length + n : n, 1)[0];
  },
  dig: function (...indices) {
    return indices.reduce((current, index) => current?.[index], this);
  },

  // Aliases
  collect: Array.prototype.map,
  all: Array.prototype.every,
  select: Array.prototype.filter,
  each: Array.prototype.forEach,
  detect: Array.prototype.find,
  inject: Array.prototype.reduce,
  delete_if: Array.prototype.reject,
  drop: Array.prototype.slice,
});
