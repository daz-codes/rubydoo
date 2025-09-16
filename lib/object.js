import { defineProperties } from "./define_properties.js";

defineProperties(Object.prototype, {
  // Accessors (getters)
  isEmpty: {
    get() {
      return Object.keys(this).length === 0;
    },
  },
  size: {
    get() {
      return Object.keys(this).length;
    },
  },
  values: {
    get() {
      return Object.values(this);
    },
  },
  keys: {
    get() {
      return Object.keys(this);
    },
  },
  entries: {
    get() {
      return Object.entries(this);
    },
  },
  clear: {
    get() {
      Object.keys(this).forEach((key) => delete this[key]);
      return this;
    },
  },
  compact: {
    get() {
      const obj = { ...this };
      for (let key in obj) {
        if (obj[key] == null) delete obj[key];
      }
      return obj;
    },
  },

  // Methods
  transform_keys: function (func) {
    const obj = Object.fromEntries(
      Object.entries(this).map(([key, value]) => [func(key), value]),
    );
    return obj;
  },
  transform_values: function (func) {
    const obj = Object.fromEntries(
      Object.entries(this).map(([key, value]) => [key, func(value)]),
    );
    return obj;
  },
  select: function (func) {
    return Object.entries(this).filter((entry) => func(entry));
  },
  keep_if: function (func) {
    return Object.entries(this).filter((entry) => func(entry));
  },
  reject: function (func) {
    return Object.entries(this).filter((entry) => !func(entry));
  },
  delete_if: function (func) {
    return Object.entries(this).filter((entry) => !func(entry));
  },
  has_key: function (key) {
    return Object.keys(this).includes(key);
  },
  has_value: function (val) {
    return Object.values(this).includes(val);
  },
  key: function (val) {
    const entry = Object.entries(this).find(([_, v]) => v === val);
    return entry ? entry[0] : undefined;
  },
  any: function (func) {
    return func
      ? Object.entries(this).some((entry) => func(entry))
      : Object.keys(this).length > 0;
  },
  except: function (...keys) {
    return Object.fromEntries(
      Object.entries(this).filter(([k]) => !keys.includes(k)),
    );
  },
});
