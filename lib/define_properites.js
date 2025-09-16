export function defineProperties(proto, props) {
  const descriptors = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === "function") {
      // normal method
      descriptors[key] = {
        value,
        configurable: true,
        enumerable: false,
        writable: true,
      };
    } else {
      // getter
      descriptors[key] = {
        get: value,
        configurable: true,
        enumerable: false,
      };
    }
  }
  Object.defineProperties(proto, descriptors);
}
