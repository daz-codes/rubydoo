Object.defineProperties(Number.prototype, {
  even: {
    /**
     * Checks if the number is even.
     * @returns {boolean} True if even, false otherwise.
     */
    get: function() {
      return this % 2 === 0; 
    },
    configurable: true,
    enumerable: false
  },

  odd: {
    /**
     * Checks if the number is odd.
     * @returns {boolean} True if odd, false otherwise.
     */
    get: function() {
      return this % 2 !== 0; 
    },
    configurable: true,
    enumerable: false
  },

  to_s: {
    /**
     * Converts the number to a string.
     * @returns {string} String representation of the number.
     */
    get: function() {
      return this.toString(); 
    },
    configurable: true,
    enumerable: false
  },

  next: {
    /**
     * Returns the next integer.
     * @returns {number} The number incremented by 1.
     */
    get: function() {
      return this + 1; 
    },
    configurable: true,
    enumerable: false
  },

  round: {
    /**
     * Rounds the number to the nearest integer.
     * @returns {number} Rounded number.
     */
    get: function() {
      return Math.round(this); 
    },
    configurable: true,
    enumerable: false
  },

  ceil: {
    /**
     * Returns the smallest integer greater than or equal to the number.
     * @returns {number} Ceiled number.
     */
    get: function() {
      return Math.ceil(this); 
    },
    configurable: true,
    enumerable: false
  },

  floor: {
    /**
     * Returns the largest integer less than or equal to the number.
     * @returns {number} Floored number.
     */
    get: function() {
      return Math.floor(this); 
    },
    configurable: true,
    enumerable: false
  },

  digits: {
    /**
     * Returns an array of the digits in the number.
     * @returns {number[]} Array of digits.
     */
    get: function() {
      return [...Math.abs(this).toString()].map(Number);
    },
    configurable: true,
    enumerable: false
  },

  factors: {
    /**
     * Returns an array of factors of the number.
     * @returns {number[]} Array of factors.
     */
    get: function() {
      return [...Array(Math.abs(this) + 1).keys()].slice(1).filter(x => this % x === 0);
    },
    configurable: true,
    enumerable: false    
  },

  prime: {
    /**
     * Checks if the number is prime.
     * @returns {boolean} True if prime, false otherwise.
     */
    get: function() {
      if (this < 2) return false;
      if (this % 2 === 0 && this !== 2) return false;
      for (let i = 3; i <= Math.sqrt(this); i += 2) {
        if (this % i === 0) return false;
      }
      return true;
    },
    configurable: true,
    enumerable: false    
  },

  integer: {
    /**
     * Checks if the number is an integer.
     * @returns {boolean} True if integer, false otherwise.
     */
    get: function() {
      return Number.isInteger(this);
    },
    configurable: true,
    enumerable: false    
  },

  positive: {
    /**
     * Checks if the number is positive.
     * @returns {boolean} True if positive, false otherwise.
     */
    get: function() {
      return this > 0;
    },
    configurable: true,
    enumerable: false    
  },

  negative: {
    /**
     * Checks if the number is negative.
     * @returns {boolean} True if negative, false otherwise.
     */
    get: function() {
      return this < 0;
    },
    configurable: true,
    enumerable: false    
  },

  zero: {
    /**
     * Checks if the number is zero.
     * @returns {boolean} false if zero, false otherwise.
     */
    get: function() {
      return this === 0;
    },
    configurable: true,
    enumerable: false    
  },

  nonzero: {
    /**
     * Checks if the number is not zero.
     * @returns {boolean} false if zero, true otherwise.
     */
    get: function() {
      return this !== 0;
    },
    configurable: true,
    enumerable: false    
  },

  squared: {
    /**
     * Returns the square of the number.
     * @returns {number} Squared number.
     */
    get: function() {
      return this * this;
    },
    configurable: true,
    enumerable: false    
  },

  cubed: {
    /**
     * Returns the cube of the number.
     * @returns {number} Cubed number.
     */
    get: function() {
      return this ** 3;
    },
    configurable: true,
    enumerable: false    
  },

  ordinal: {
    /**
     * Returns the ordinal suffix of the number.
     * @returns {string} Ordinal suffix (e.g., "st", "nd", "rd", "th").
     */
    get: function() {
      if ([11, 12, 13].includes(this % 100)) return "th";
      return ["st", "nd", "rd"][(this % 10) - 1] || "th";
    },
    configurable: true,
    enumerable: false    
  },

  ordinalize: {
    /**
     * Converts the number into an ordinal string.
     * @returns {string} Ordinalized string (e.g., "1st", "2nd").
     */
    get: function() {
      return this.to_s + this.ordinal;
    },
    configurable: true,
    enumerable: false    
  }
});

Number.prototype.upto = function(n, func) {
  /**
   * Calls a function for each number from this number up to `n`.
   * @param {number} n - The upper limit.
   * @param {function} [func] - Optional callback function.
   * @returns {number[]} Array of numbers from this to `n`.
   */
  const arr = [...Array(Math.max(0, n - this + 1)).keys()].map(x => x + this);
  return typeof func === "function" ? arr.forEach(func) : arr;
};

Number.prototype.times = function(func) {
  /**
   * Calls the provided function `this` many times.
   * @param {function} func - Function to be called.
   */
  for (let i = 0; i < this; i++) func(i);
};

Number.prototype.mod = function(n) {
  /**
   * Returns the modulus of the number.
   * @param {number} n - The divisor.
   * @returns {number} The remainder.
   */
  return this % n;
};

Number.prototype.divmod = function(n) {
  /**
   * Returns an array with the quotient and remainder.
   * @param {number} n - The divisor.
   * @returns {[number, number]} [quotient, remainder].
   */
  return [Math.floor(this / n), this % n];
};

Number.prototype.gcd = function(n) {
  return n ? n.gcd(this % n) : this;
};

Number.prototype.lcm = function(n) {
  return (this * n) / this.gcd(n);
};

Number.prototype.between = function(a, b) {
  /**
   * Checks if the number is between `a` and `b`.
   * @returns {boolean} True if within range, false otherwise.
   */
  return this >= a && this <= b;
};
