Object.defineProperties(String.prototype, {
      reverse: {
      get: function() {
        return this.split('').reverse().join(''); 
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
      to_i: {
      get: function() {
        const n = parseInt(this)
        return isNaN(n) ? 0 : n; 
      },
      configurable: true,
      enumerable: false
    },
      to_f: {
      get: function() {
        const n = parseFloat(this)
        return isNaN(n) ? 0 : n; 
      },
      configurable: true,
      enumerable: false
    },
    downcase: {
      get: function() {
        return this.toLowerCase();  
      },
      configurable: true,
      enumerable: false
    },
    upcase: {
      get: function() {
        return this.toUpperCase(); 
      },
      configurable: true,
      enumerable: false
    },
    upcase_first: {
      get: function() {
        return this[0].toUpperCase() + this.slice(1); 
      },
      configurable: true,
      enumerable: false
    },
    downcase_first: {
      get: function() {
        return this[0].toLowerCase() + this.slice(1); 
      },
      configurable: true,
      enumerable: false
    },
    squish: {
      get: function() {
        return this.replace(/\s+/g," ").trim(); 
      },
      configurable: true,
      enumerable: false
    },
    blank: {
      get: function() {
        return this.trim() === ""; 
      },
      configurable: true,
      enumerable: false
    },
    empty: {
      get: function() {
        return this === ""; 
      },
      configurable: true,
      enumerable: false
    },
    humanize: {
      get: function() {
        const str = this.slice(-3) === ("_id") ? this.slice(0,-3) : this
        return str.replace(/_/g," ").upcase_first; 
      },
      configurable: true,
      enumerable: false
    },
    titleize: {
      get: function() {
        return this.humanize.split(" ").map(word => word.upcase_first).join(" "); 
      },
      configurable: true,
      enumerable: false
    },
    titlecase: {
      get: function() {
        return this.titleize; 
      },
      configurable: true,
      enumerable: false
    }
    ,
    parameterize: {
      get: function() {
        return this.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase().replace(/\s+/g,"-"); 
      },
      configurable: true,
      enumerable: false
    }
  })

String.prototype.count = function(func){
  return [...this].filter(func).length
}

String.prototype.starts_with = function(str){
  return this.slice(0,str.length) === str
}

String.prototype.ends_with = function(str){
  return this.slice(-str.length) === str
}

String.prototype.first = function(n){
  return n ? this.slice(0,n) : this[0]
}

String.prototype.last = function(n){
  return n ? this.slice(-n) : this[this.length - 1]
}