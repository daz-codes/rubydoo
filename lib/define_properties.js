export function defineProperties(proto, props) {
  const descriptors = {};
  for (const [key, value] of Object.entries(props)) {
    if (value && typeof value === "object" && typeof value.get === "function") {
      // getter
      descriptors[key] = {
        get: value.get,
        configurable: true,
        enumerable: false,
      };
    } else {
      // normal method
      descriptors[key] = {
        value,
        configurable: true,
        enumerable: false,
        writable: true,
      };
    }
  }
  Object.defineProperties(proto, descriptors);
}
