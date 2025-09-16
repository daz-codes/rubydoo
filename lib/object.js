import defineProperties from "./defineProperties.js";

defineProperties(Object.prototype, {
  // Accessors
  empty: function () {
    return Object.keys(this).length === 0;
  },
  size: function () {
    return Object.keys(this).length;
  },
  values: function () {
    return Object.values(this);
  },
  keys: function () {
    return Object.keys(this);
  },
  entries: function () {
    return Object.entries(this);
  },
  clear: function () {
    Object.keys(this).forEach((key) => delete this[key]);
    return this;
  },
  compact: function () {
    const obj = { ...this };
    for (let key in obj) {
      if (obj[key] == null) delete obj[key];
    }
    return obj;
  },

  // Methods
  map: function (func) {
    return Object.entries(this).map((entry) => func(entry));
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
