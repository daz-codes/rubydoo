class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  // Helper to clone a date in UTC
  _cloneUTC(date) {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ),
    );
  }

  includes(date) {
    return date >= this.start && date <= this.end;
  }

  each(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCDate(d.getUTCDate() + step);
    }
    return this;
  }

  each_day(callback, step = 1) {
    return this.each(callback, step);
  }

  each_week(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCDate(d.getUTCDate() + step * 7);
    }
    return this;
  }

  each_month(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCMonth(d.getUTCMonth() + step);
    }
    return this;
  }

  each_quarter(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCMonth(d.getUTCMonth() + step * 3);
    }
    return this;
  }

  each_year(callback, step = 1) {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      callback(this._cloneUTC(d));
      d.setUTCFullYear(d.getUTCFullYear() + step);
    }
    return this;
  }

  *[Symbol.iterator]() {
    let d = this._cloneUTC(this.start);
    while (d <= this.end) {
      yield this._cloneUTC(d);
      d.setUTCDate(d.getUTCDate() + 1);
    }
  }
}

class Duration {
  constructor({
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = {}) {
    this.years = years;
    this.months = months;
    this.weeks = weeks;
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  get ago() {
    return this.since(Date.current);
  }

  until(date) {
    return this.advance_from(date);
  }

  before(date) {
    return this.until(date);
  }

  after(date) {
    return this.since(date);
  }

  since(date) {
    const negated = new Duration(
      Object.fromEntries(Object.entries(this).map(([k, v]) => [k, -v])),
    );
    return negated.advance_from(date);
  }

  get from_now() {
    return this.until(Date.current);
  }

  advance_from(date) {
    let d = new Date(date);
    d.setSeconds(d.getSeconds() + this.seconds);
    d.setMinutes(d.getMinutes() + this.minutes);
    d.setHours(d.getHours() + this.hours);
    d.setDate(d.getDate() + this.days + this.weeks * 7);
    d.setMonth(d.getMonth() + this.months + this.years * 12);
    return d;
  }
}

for (const unit of [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "year",
]) {
  const plural = unit + "s";
  Object.defineProperty(Number.prototype, plural, {
    get() {
      return new Duration({ [plural]: this });
    },
    configurable: true,
  });
  Object.defineProperty(Number.prototype, unit, {
    get() {
      return this[plural];
    },
    configurable: true,
  });
}

for (const unit of ["day", "week", "month", "quarter", "year"]) {
  Object.defineProperty(Date.prototype, `all_${unit}`, {
    get() {
      return new DateRange(
        this[`beginning_of_${unit}`],
        this[`end_of_${unit}`],
      );
    },
    configurable: true,
  });
  Object.defineProperty(Date.prototype, `at_beginning_of_${unit}`, {
    get() {
      return this[`beginning_of_${unit}`];
    },
    configurable: true,
  });
  Object.defineProperty(Date.prototype, `at_end_of_${unit}`, {
    get() {
      return this[`end_of_${unit}`];
    },
    configurable: true,
  });
}

for (const unit of ["Yesterday", "Today", "Tomorrow"]) {
  Object.defineProperty(Date.prototype, `is${unit}`, {
    get() {
      return this.all_day.includes(Date[unit.toLowerCase()]);
    },
    configurable: true,
  });
}

Object.defineProperty(Date, "current", {
  get: function () {
    const d = new Date();
    return new Date(
      Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds(),
      ),
    );
  },
  configurable: true,
  enumerable: false,
});
Object.defineProperty(Date, "today", {
  get: function () {
    const d = new Date();
    return new Date(
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
    );
  },
  configurable: true,
  enumerable: false,
});
Object.defineProperty(Date, "yesterday", {
  get: function () {
    return new Date(Date.today.getTime() - 24 * 3600000);
  },
  configurable: true,
  enumerable: false,
});
Object.defineProperty(Date, "tomorrow", {
  get: function () {
    return new Date(Date.today.getTime() + 24 * 3600000);
  },
  configurable: true,
  enumerable: false,
});

Object.defineProperties(Date.prototype, {
  yesterday: {
    get: function () {
      return this.advance({ days: -1 }).beginning_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  tomorrow: {
    get: function () {
      return this.advance({ days: 1 }).beginning_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_minute: {
    get: function () {
      return new Date(
        Date.UTC(
          this.getFullYear(),
          this.getMonth(),
          this.getDate(),
          this.getHours(),
          this.getMinutes(),
          0,
          0,
        ),
      );
    },
    configurable: true,
    enumerable: false,
  },
  end_of_minute: {
    get: function () {
      return new Date(
        Date.UTC(
          this.getFullYear(),
          this.getMonth(),
          this.getDate(),
          this.getHours(),
          this.getMinutes(),
          59,
          999,
        ),
      );
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_hour: {
    get: function () {
      return new Date(
        Date.UTC(
          this.getFullYear(),
          this.getMonth(),
          this.getDate(),
          this.getHours(),
          0,
          0,
          0,
        ),
      );
    },
    configurable: true,
    enumerable: false,
  },
  end_of_hour: {
    get: function () {
      return new Date(
        Date.UTC(
          this.getFullYear(),
          this.getMonth(),
          this.getDate(),
          this.getHours(),
          59,
          59,
          999,
        ),
      );
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_day: {
    get: function () {
      return new Date(
        Date.UTC(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0),
      );
    },
    configurable: true,
    enumerable: false,
  },
  end_of_day: {
    get: function () {
      return new Date(
        Date.UTC(
          this.getFullYear(),
          this.getMonth(),
          this.getDate(),
          23,
          59,
          59,
          999,
        ),
      );
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_week: {
    get: function () {
      const day = this.getDay();
      const offset = day == 0 ? 6 : day - 1;
      return offset.days.ago.beginning_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  end_of_week: {
    get: function () {
      const day = this.getDay();
      const offset = (7 - day) % 7;
      return offset.days.from_now.end_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_month: {
    get: function () {
      return new Date(
        Date.UTC(this.getFullYear(), this.getMonth(), 1, 0, 0, 0),
      );
    },
    configurable: true,
    enumerable: false,
  },
  end_of_month: {
    get: function () {
      const nextMonth = new Date(
        Date.UTC(this.getUTCFullYear(), this.getUTCMonth() + 1, 1),
      );
      return new Date(nextMonth.getTime() - 1);
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_quarter: {
    get: function () {
      const quarter = Math.floor(this.getMonth() / 3);
      const month = quarter * 3;
      return new Date(Date.UTC(this.getFullYear(), month, 1, 0, 0, 0));
    },
    configurable: true,
    enumerable: false,
  },
  end_of_quarter: {
    get: function () {
      const quarter = Math.floor(this.getMonth() / 3);
      const month = quarter * 3 + 2;
      return new Date(Date.UTC(this.getFullYear(), month, 1)).end_of_month;
    },
    configurable: true,
    enumerable: false,
  },
  beginning_of_year: {
    get: function () {
      return new Date(Date.UTC(this.getFullYear(), 0, 1, 0, 0, 0));
    },
    configurable: true,
    enumerable: false,
  },
  end_of_year: {
    get: function () {
      return new Date(Date.UTC(this.getFullYear(), 11, 31, 23, 59, 59, 999));
    },
    configurable: true,
    enumerable: false,
  },
  next_week: {
    get: function () {
      const day = Date.today.getDay();
      const offset = (8 - day) % 7;
      return offset.days.from_now.beginning_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  prev_week: {
    get: function () {
      const day = Date.today.getDay();
      const offset = day == 0 ? 13 : day + 6;
      return offset.days.ago.beginning_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  next_month: {
    get: function () {
      return (1).month.from_now;
    },
    configurable: true,
    enumerable: false,
  },
  prev_month: {
    get: function () {
      return (1).month.ago;
    },
    configurable: true,
    enumerable: false,
  },
  next_year: {
    get: function () {
      return (1).year.from_now;
    },
    configurable: true,
    enumerable: false,
  },
  prev_year: {
    get: function () {
      return (1).year.ago;
    },
    configurable: true,
    enumerable: false,
  },
  inFuture: {
    get: function () {
      return this.getTime() > Date.now();
    },
    configurable: true,
    enumerable: false,
  },
  inPast: {
    get: function () {
      return this.getTime() < Date.now();
    },
    configurable: true,
    enumerable: false,
  },
  midday: {
    get: function () {
      return this.change({ hour: 12, minute: 0, second: 0, ms: 0 });
    },
    configurable: true,
    enumerable: false,
  },
  noon: {
    get: function () {
      return this.midday;
    },
    configurable: true,
    enumerable: false,
  },
  midnight: {
    get: function () {
      return this.beginning_of_day;
    },
    configurable: true,
    enumerable: false,
  },
  at_midnight: {
    get: function () {
      return this.midnight;
    },
    configurable: true,
    enumerable: false,
  },
  isWeekend: {
    get: function () {
      const day = this.getDay();
      return day == 6 || day == 0;
    },
    configurable: true,
    enumerable: false,
  },
  isWeekday: {
    get: function () {
      return !this.isWeekend;
    },
    configurable: true,
    enumerable: false,
  },
});

Date.prototype.advance = function (duration) {
  return new Duration(duration).advance_from(this);
};

Date.prototype.change = function ({
  year,
  month,
  day,
  hour,
  minute,
  second,
  ms,
} = {}) {
  return new Date(
    Date.UTC(
      year ?? this.getUTCFullYear(),
      month ?? this.getUTCMonth(),
      day ?? this.getUTCDate(),
      hour ?? this.getUTCHours(),
      minute ?? this.getUTCMinutes(),
      second ?? this.getUTCSeconds(),
      ms ?? this.getUTCMilliseconds(),
    ),
  );
};
