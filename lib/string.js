import { defineProperties } from "./define_properties.js";

defineProperties(String.prototype, {
  // Accessors (getters)
  reverse: {
    get() {
      return this.split("").reverse().join("");
    },
  },
  size: {
    get() {
      return this.length;
    },
  },
  to_i: {
    get() {
      const n = parseInt(this);
      return isNaN(n) ? 0 : n;
    },
  },
  to_f: {
    get() {
      const n = parseFloat(this);
      return isNaN(n) ? 0 : n;
    },
  },
  to_s: {
    get() {
      return this;
    },
  },
  downcase: {
    get() {
      return this.toLowerCase();
    },
  },
  upcase: {
    get() {
      return this.toUpperCase();
    },
  },
  upcase_first: {
    get() {
      return this[0].toUpperCase() + this.slice(1);
    },
  },
  downcase_first: {
    get() {
      return this[0].toLowerCase() + this.slice(1);
    },
  },
  squish: {
    get() {
      return this.replace(/\s+/g, " ").trim();
    },
  },
  isBlank: {
    get() {
      return this.trim() === "";
    },
  },
  isEmpty: {
    get() {
      return this === "";
    },
  },
  humanize: {
    get() {
      const str = this.slice(-3) === "_id" ? this.slice(0, -3) : this;
      return str.replace(/_/g, " ").upcase_first;
    },
  },
  titleize: {
    get() {
      return this.humanize
        .split(" ")
        .map((word) => word.upcase_first)
        .join(" ");
    },
  },
  titlecase: {
    get() {
      return this.titleize;
    },
  },
  parameterize: {
    get() {
      return this.trim()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-");
    },
  },
  chars: {
    get() {
      return this.split("");
    },
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
