import { defineProperties } from "./define_properites.js";

defineProperties(String.prototype, {
  // Accessors
  reverse: function () {
    return this.split("").reverse().join("");
  },
  size: function () {
    return this.length;
  },
  to_i: function () {
    const n = parseInt(this);
    return isNaN(n) ? 0 : n;
  },
  to_f: function () {
    const n = parseFloat(this);
    return isNaN(n) ? 0 : n;
  },
  downcase: function () {
    return this.toLowerCase();
  },
  upcase: function () {
    return this.toUpperCase();
  },
  upcase_first: function () {
    return this[0].toUpperCase() + this.slice(1);
  },
  downcase_first: function () {
    return this[0].toLowerCase() + this.slice(1);
  },
  squish: function () {
    return this.replace(/\s+/g, " ").trim();
  },
  blank: function () {
    return this.trim() === "";
  },
  empty: function () {
    return this === "";
  },
  humanize: function () {
    const str = this.slice(-3) === "_id" ? this.slice(0, -3) : this;
    return str.replace(/_/g, " ").upcase_first;
  },
  titleize: function () {
    return this.humanize
      .split(" ")
      .map((word) => word.upcase_first)
      .join(" ");
  },
  titlecase: function () {
    return this.titleize;
  },
  parameterize: function () {
    return this.trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  },
  chars: function () {
    return this.split("");
  },

  // Methods
  count: function (str) {
    return this.split(str).length - 1;
  },
  starts_with: function (str) {
    return this.slice(0, str.length) === str;
  },
  ends_with: function (str) {
    return this.slice(-str.length) === str;
  },
  first: function (n) {
    return n ? this.slice(0, n) : this[0];
  },
  last: function (n) {
    return n ? this.slice(-n) : this[this.length - 1];
  },
});
