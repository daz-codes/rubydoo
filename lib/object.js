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
        return this.reject((k,v) => v == null); 
      },
      configurable: true,
      enumerable: false
    }
})

Object.prototype.map = function(func){
    return Object.entries(this).map((entry) => func(entry))
}

Object.prototype.keep_if = Object.prototype.select = Object.prototype.filter = function(func){
    return Object.entries(this).filter((entry) => func(entry))
}

Object.prototype.delete_if = Object.prototype.reject = function(func){
    return Object.entries(this).filter((entry) => !func(entry))
}

Object.prototype.reduce = function(func){
    return Object.entries(this).reduce((entry) => func(entry))
}

Object.prototype.include = Object.prototype.has_key = 
Object.prototype.key = Object.prototype.member = function(value){
    return Object.keys(this).includes(value)
}

Object.prototype.value = Object.prototype.has_value = function(value){
    return Object.values(this).includes(value)
}

Object.prototype.key = function(value){
    return Object.entries(this).find(arr => arr[1] === value)[0]
}

Object.prototype.any = function(func){
    return func ? Object.entries(this).some(func) : this.entries.length > 0
}

Object.prototype.except = function(...keys){
    return this.reject(([k,v]) => keys.includes(k))
}