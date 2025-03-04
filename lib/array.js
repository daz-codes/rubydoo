Object.defineProperties(Array.prototype, {
  first: { get: function() { return this[0]; }, configurable: true, enumerable: false },
  second: { get: function() { return this[1]; }, configurable: true, enumerable: false },
  third: { get: function() { return this[2]; }, configurable: true, enumerable: false },
  fourth: { get: function() { return this[3]; }, configurable: true, enumerable: false },
  fifth: { get: function() { return this[4]; }, configurable: true, enumerable: false },
  forty_two: { get: function() { return this[41]; }, configurable: true, enumerable: false },
  third_to_last: { get: function() { return this[this.length - 3]; }, configurable: true, enumerable: false },
  second_to_last: { get: function() { return this[this.length - 2]; }, configurable: true, enumerable: false },
  last: { get: function() { return this[this.length - 1]; }, configurable: true, enumerable: false },
  empty: { get: function() { return this.length === 0; }, configurable: true, enumerable: false },
  clear: { value: function() { this.length = 0; return this; }, configurable: true, enumerable: false },
  size: { get: function() { return this.length; }, configurable: true, enumerable: false },
  min: { get: function() { return this.length > 0 ? Math.min(...this) : undefined; }, configurable: true, enumerable: false },
  max: { get: function() { return this.length > 0 ? Math.max(...this) : undefined; }, configurable: true, enumerable: false },
  uniq: { get: function() { return Array.from(new Set(this)); }, configurable: true, enumerable: false },
  to_sentence: {
      get: function() {
          if (this.length === 0) return "";
          if (this.length === 1) return String(this[0]);
          return this.slice(0, -1).join(", ") + " and " + this.last;
      },
      configurable: true, enumerable: false
  },
  compact: { get: function() { return this.filter(x => x != null); }, configurable: true, enumerable: false },
  to_param: { get: function() { return this.join("/"); }, configurable: true, enumerable: false },
  shuffle: { 
      get: function() {
          const arr = [...this];
          for (let i = arr.length - 1, r; i > 0; i--) {
              r = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[r]] = [arr[r], arr[i]];
          }
          return arr;
      },
      configurable: true, enumerable: false 
  },
  transpose: { 
      get: function() {
          return this[0].map((_, i) => this.map(row => row[i]));
      },
      configurable: true, enumerable: false 
  }
});

Array.prototype.any = function(func) {
  return func ? this.some(func) : this.length > 0;
};

Array.prototype.one = function(func) {
  return func ? this.filter(func).length === 1 : this.length === 1;
};

Array.prototype.sum = function(func) {
  return (func ? this.map(func) : this).reduce((sum, x) => sum + x, 0);
};

Array.prototype.reject = function(func) {
  return func ? this.filter(x => !func(x)) : this;
};

Array.prototype.partition = function(func) {
  return [this.filter(func), this.filter(x => !func(x))];
};

Array.prototype.count = function(func) {
  return func ? this.filter(func).length : this.length;
};

Array.prototype.pluck = function(prop) {
  return this.map(obj => obj[prop]);
};

Array.prototype.from = function(n) {
  return this.slice(n) || [];
};

Array.prototype.combination = function(n) {
  if (n <= 0 || n > this.length) return [];
  const result = [];
  const comb = (arr, temp = []) => {
      if (temp.length === n) {
          result.push(temp);
          return;
      }
      for (let i = 0; i < arr.length; i++) {
          comb(arr.slice(i + 1), temp.concat(arr[i]));
      }
  };
  comb(this);
  return result;
};

Array.prototype.tally = function() {
  return this.reduce((totals, x) => {
      totals[x] = (totals[x] || 0) + 1;
      return totals;
  }, {});
};

Array.prototype.each_cons = function(n) {
  return this.length < n ? [] : this.map((_, i) => this.slice(i, i + n)).slice(0, -(n - 1));
};

Array.prototype.rotate = function(n = 1) {
  return [...this.slice(n % this.length), ...this.slice(0, n % this.length)];
};

Array.prototype.sample = function(n = 1) {
  const arr = [...this];
  const sample = [];
  for (let i = 0; i < n; i++) {
      if (!arr.length) break;
      const index = Math.floor(Math.random() * arr.length);
      sample.push(arr.splice(index, 1)[0]);
  }
  return n === 1 ? sample[0] : sample;
};

Array.prototype.zip = function(arr) {
  return this.map((n, i) => arr[i] ? [n, arr[i]] : null).filter(Boolean);
};

Array.prototype.union = function(...arrs) {
  return [...new Set([...this, ...arrs.flat()])];
};

Array.prototype.collect = Array.prototype.map;
Array.prototype.all = Array.prototype.every;
Array.prototype.select = Array.prototype.filter;
Array.prototype.each = Array.prototype.forEach;
Array.prototype.detect = Array.prototype.find;
Array.prototype.inject = Array.prototype.reduce;
Array.prototype.delete_if = Array.prototype.reject;
