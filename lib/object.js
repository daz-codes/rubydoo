Object.defineProperties(Object.prototype, {
    empty: {
      get: function() {
        return Object.keys(this).length === 0; 
      },
      configurable: true,
      enumerable: false
    },
    size: {
      get: function() {
        return Object.keys(this).length; 
      },
      configurable: true,
      enumerable: false
    },
    values: {
      get: function() {
        return Object.values(this); 
      },
      configurable: true,
      enumerable: false
    },
    keys: {
      get: function() {
        return Object.keys(this); 
      },
      configurable: true,
      enumerable: false
    },
    entries: {
      get: function() {
        return Object.entries(this); 
      },
      configurable: true,
      enumerable: false
    },
    clear: {
      get: function() {
        for (let key in this) {
          if (this.hasOwnProperty(key)) {
            delete this[key];
          }
        }
        return this;
      },
      configurable: true,
      enumerable: false
    },
    compact: {
      get: function() {
        const obj = {...this}
        for (let key in obj) {
          if (obj[key] == null) {
            delete obj[key];
          }
        }
        return obj;
      },
      configurable: true,
      enumerable: false
    },
    map: {
      value: function(func) {
        return Object.entries(this).map((entry) => func(entry));
      },
      configurable: true,
      enumerable: false
    },
    select: {
      value: function(func) {
        return Object.entries(this).filter((entry) => func(entry))
      },
      configurable: true,
      enumerable: false
    },
    keep_if: {
      value: function(func) {
        return Object.entries(this).filter((entry) => func(entry))
      },
      configurable: true,
      enumerable: false
    },
    reject: {
      value: function(func) {
        return Object.entries(this).filter((entry) => !func(entry))
      },
      configurable: true,
      enumerable: false
    },
    delete_if: {
      value: function(func) {
        return Object.entries(this).filter((entry) => !func(entry))
      },
      configurable: true,
      enumerable: false
    },
    has_key: {
      value: function(func) {
        return Object.keys(this).includes(value)
      },
      configurable: true,
      enumerable: false
    },
    has_value: {
      value: function(func) {
        return Object.values(this).includes(value)
      },
      configurable: true,
      enumerable: false
    },
    key: {
      value: function(func) {
        return Object.entries(this).find(arr => arr[1] === value)[0]
      },
      configurable: true,
      enumerable: false
    },
    any: {
      value: function(func) {
        return func ? Object.entries(this).some(func) : this.entries.length > 0
      },
      configurable: true,
      enumerable: false
    },
    except: {
      value: function(func) {
        return this.reject(([k,v]) => keys.includes(k))

      },
      configurable: true,
      enumerable: false
    }
})