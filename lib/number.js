Object.defineProperties(Number.prototype, {
    even: {
      get: function() {
        return this%2 === 0; 
      },
      configurable: true,
      enumerable: false
    },
    odd: {
      get: function() {
        return this%2 === 1; 
      },
      configurable: true,
      enumerable: false
    },
    to_s: {
      get: function() {
        return this.toString(); 
      },
      configurable: true,
      enumerable: false
    },
    next: {
      get: function() {
        return this + 1; 
      },
      configurable: true,
      enumerable: false
    },
    round: {
      get: function() {
        return Math.round(this); 
      },
      configurable: true,
      enumerable: false
    },
    ceil: {
      get: function() {
        return Math.ceil(this); 
      },
      configurable: true,
      enumerable: false
    },
    floor: {
      get: function() {
        return Math.floor(this); 
      },
      configurable: true,
      enumerable: false
    },
    digits: {
      get: function() {
        return [...this.toString()].map(d => Number(d)); 
      },
      configurable: true,
      enumerable: false
    },
    factors: {
      get: function() {
        return [...Array(Math.abs(this))].map((_,i)=>++i).filter(x => this%x === 0)
      },
      configurable: true,
      enumerable: false    
    },
    prime: {
      get: function() {
        return !(this < 2 || (this > 2 && this%2 ===0) || [...Array(Math.floor(this**.5/2))].map((_,i)=>i*2+3).filter(x => this%x === 0).length)
      },
      configurable: true,
      enumerable: false    
    },
    integer: {
      get: function() {
        return Math.floor(this) - this === 0
      },
      configurable: true,
      enumerable: false    
    },
    positive: {
      get: function() {
        return this > 0
      },
      configurable: true,
      enumerable: false    
    },
    negative: {
      get: function() {
        return this < 0
      },
      configurable: true,
      enumerable: false    
    },
    nonzero: {
      get: function() {
        return this < 0 || this > 0
      },
      configurable: true,
      enumerable: false    
    },
    zero: {
      get: function() {
        return !(this < 0 || this > 0)
      },
      configurable: true,
      enumerable: false    
    },
    squared: {
      get: function() {
        return this * this
      },
      configurable: true,
      enumerable: false    
    },
    cubed: {
      get: function() {
        return this * this * this
      },
      configurable: true,
      enumerable: false    
    },
    ordinal: {
      get: function() {
        const last_digit = this%10
        return last_digit === 1 ? "st" 
               : last_digit === 2 ? "nd" 
               : last_digit === 3 ? "rd" 
               : "th"
      },
      configurable: true,
      enumerable: false    
    },
    ordinalize: {
      get: function() {
        return this.to_s + this.ordinal
      },
      configurable: true,
      enumerable: false    
    } 
  })
  
  Number.prototype.upto = function(n,func){
    const arr = [...Array(n-this+1).keys()].map(x => x+this)
    return typeof(func) === "function" ? arr.forEach(y => func(y)) : arr
  }
  
  Number.prototype.times = function(func){
    for(let i=0;i<this;i++) func(i)
  }
  
  Number.prototype.mod = function(n){
    return this%n
  }
  
  Number.prototype.divmod = function(n){
    return [Math.floor(this/n),this%n]
  }
  
  Number.prototype.gcd = function(n){
    return n ? n.gcd(this%n) : this
  }
  Number.prototype.lcm = function(n){
    return (this*n)/this.gcd(n)
  }
  
  Number.prototype.between = function(a,b){
    return this >= a && this <= b
  }