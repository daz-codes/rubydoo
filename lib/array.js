Object.defineProperties(Array.prototype, {
    first: {
      get: function() {
        return this[0]; 
      },
      configurable: true,
      enumerable: false
    },
    second: {
      get: function() {
        return this[1]; 
      },
      configurable: true,
      enumerable: false
    },
    third: {
      get: function() {
        return this[2]; 
      },
      configurable: true,
      enumerable: false
    },
    fourth: {
      get: function() {
        return this[3]; 
      },
      configurable: true,
      enumerable: false
    },
    fifth: {
      get: function() {
        return this[4]; 
      },
      configurable: true,
      enumerable: false
    },
    forty_two: {
      get: function() {
        return this[41]; 
    },
      configurable: true,
      enumerable: false
    },
    third_to_last: {
      get: function() {
        return this[this.length-3]; 
      },
      configurable: true,
      enumerable: false
    },
    second_to_last: {
      get: function() {
        return this[this.length-2]; 
      },
      configurable: true,
      enumerable: false
    },
    last: {
      get: function() {
        return this[this.length - 1]; 
      },
      configurable: true,
      enumerable: false
    },
    empty: {
      get: function() {
        return this.length === 0; 
      },
      configurable: true,
      enumerable: false
    },
    clear: {
      get: function() {
        this.length = 0;
        return this; 
      },
      configurable: true,
      enumerable: false
    },
    size: {
      get: function() {
        return this.length; 
      },
      configurable: true,
      enumerable: false
    },
    min: {
      get: function() {
        return this.length > 0 ? Math.min(...this) : undefined; 
      },
      configurable: true,
      enumerable: false
    },
    max: {
      get: function() {
        return this.length > 0 ? Math.max(...this) : undefined; 
      },
      configurable: true,
      enumerable: false
    },
    sum: {
      get: function() {
        return this.reduce((S,x)=> x+S,0); 
      },
      configurable: true,
      enumerable: false
    },
    uniq: {
      get: function() {
        return Array.from(new Set(this)); 
      },
      configurable: true,
      enumerable: false
    },
    to_sentence: {
    get: function() {
      this[this.length - 1] = "and " + this.last
      return this.join(", "); 
    },
    configurable: true,
    enumerable: false
    },
    compact: {
    get: function() {
      return this.reject(x => x == null); 
    },
    configurable: true,
    enumerable: false
    },
    to_param: {
    get: function() {
      return this.join("/"); 
    },
    configurable: true,
    enumerable: false
    }
})
  
Array.prototype.collect = Array.prototype.map
Array.prototype.select = Array.prototype.filter
Array.prototype.each = Array.prototype.forEach
Array.prototype.detect = Array.prototype.find
Array.prototype.inject = Array.prototype.reduce

Array.prototype.any = function(func){
  return func ? this.some(func) : this.length > 0
}

Array.prototype.reject = function(func){
    return this.filter(x => !func(x))
}

Array.prototype.partition = function(func){
    return [this.select(func),this.reject(func)]
}

Array.prototype.count = function(func){
    return func ? this.select(func).length : this.length
}

Array.prototype.pluck = function(prop){
    return this.map(obj => obj[prop])
}

Array.prototype.from = function(n){
  return this.slice(n) || []
}