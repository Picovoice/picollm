function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _typeof$3(o) {
  "@babel/helpers - typeof";

  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof$3(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof$3(i) ? i : String(i);
}

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var regeneratorRuntime$2 = {exports: {}};

var _typeof$2 = {exports: {}};

_typeof$2.exports;

(function (module) {
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (_typeof$2));

var _typeofExports$1 = _typeof$2.exports;

regeneratorRuntime$2.exports;

(function (module) {
	var _typeof = _typeofExports$1["default"];
	function _regeneratorRuntime() {
	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
	    return e;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  var t,
	    e = {},
	    r = Object.prototype,
	    n = r.hasOwnProperty,
	    o = Object.defineProperty || function (t, e, r) {
	      t[e] = r.value;
	    },
	    i = "function" == typeof Symbol ? Symbol : {},
	    a = i.iterator || "@@iterator",
	    c = i.asyncIterator || "@@asyncIterator",
	    u = i.toStringTag || "@@toStringTag";
	  function define(t, e, r) {
	    return Object.defineProperty(t, e, {
	      value: r,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), t[e];
	  }
	  try {
	    define({}, "");
	  } catch (t) {
	    define = function define(t, e, r) {
	      return t[e] = r;
	    };
	  }
	  function wrap(t, e, r, n) {
	    var i = e && e.prototype instanceof Generator ? e : Generator,
	      a = Object.create(i.prototype),
	      c = new Context(n || []);
	    return o(a, "_invoke", {
	      value: makeInvokeMethod(t, r, c)
	    }), a;
	  }
	  function tryCatch(t, e, r) {
	    try {
	      return {
	        type: "normal",
	        arg: t.call(e, r)
	      };
	    } catch (t) {
	      return {
	        type: "throw",
	        arg: t
	      };
	    }
	  }
	  e.wrap = wrap;
	  var h = "suspendedStart",
	    l = "suspendedYield",
	    f = "executing",
	    s = "completed",
	    y = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var p = {};
	  define(p, a, function () {
	    return this;
	  });
	  var d = Object.getPrototypeOf,
	    v = d && d(d(values([])));
	  v && v !== r && n.call(v, a) && (p = v);
	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
	  function defineIteratorMethods(t) {
	    ["next", "throw", "return"].forEach(function (e) {
	      define(t, e, function (t) {
	        return this._invoke(e, t);
	      });
	    });
	  }
	  function AsyncIterator(t, e) {
	    function invoke(r, o, i, a) {
	      var c = tryCatch(t[r], t, o);
	      if ("throw" !== c.type) {
	        var u = c.arg,
	          h = u.value;
	        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
	          invoke("next", t, i, a);
	        }, function (t) {
	          invoke("throw", t, i, a);
	        }) : e.resolve(h).then(function (t) {
	          u.value = t, i(u);
	        }, function (t) {
	          return invoke("throw", t, i, a);
	        });
	      }
	      a(c.arg);
	    }
	    var r;
	    o(this, "_invoke", {
	      value: function value(t, n) {
	        function callInvokeWithMethodAndArg() {
	          return new e(function (e, r) {
	            invoke(t, n, e, r);
	          });
	        }
	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(e, r, n) {
	    var o = h;
	    return function (i, a) {
	      if (o === f) throw new Error("Generator is already running");
	      if (o === s) {
	        if ("throw" === i) throw a;
	        return {
	          value: t,
	          done: !0
	        };
	      }
	      for (n.method = i, n.arg = a;;) {
	        var c = n.delegate;
	        if (c) {
	          var u = maybeInvokeDelegate(c, n);
	          if (u) {
	            if (u === y) continue;
	            return u;
	          }
	        }
	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
	          if (o === h) throw o = s, n.arg;
	          n.dispatchException(n.arg);
	        } else "return" === n.method && n.abrupt("return", n.arg);
	        o = f;
	        var p = tryCatch(e, r, n);
	        if ("normal" === p.type) {
	          if (o = n.done ? s : l, p.arg === y) continue;
	          return {
	            value: p.arg,
	            done: n.done
	          };
	        }
	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(e, r) {
	    var n = r.method,
	      o = e.iterator[n];
	    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
	    var i = tryCatch(o, e.iterator, r.arg);
	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
	    var a = i.arg;
	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
	  }
	  function pushTryEntry(t) {
	    var e = {
	      tryLoc: t[0]
	    };
	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
	  }
	  function resetTryEntry(t) {
	    var e = t.completion || {};
	    e.type = "normal", delete e.arg, t.completion = e;
	  }
	  function Context(t) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], t.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(e) {
	    if (e || "" === e) {
	      var r = e[a];
	      if (r) return r.call(e);
	      if ("function" == typeof e.next) return e;
	      if (!isNaN(e.length)) {
	        var o = -1,
	          i = function next() {
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
	            return next.value = t, next.done = !0, next;
	          };
	        return i.next = i;
	      }
	    }
	    throw new TypeError(_typeof(e) + " is not iterable");
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), o(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
	    var e = "function" == typeof t && t.constructor;
	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
	  }, e.mark = function (t) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
	  }, e.awrap = function (t) {
	    return {
	      __await: t
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
	    return this;
	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
	    void 0 === i && (i = Promise);
	    var a = new AsyncIterator(wrap(t, r, n, o), i);
	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
	      return t.done ? t.value : a.next();
	    });
	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
	    return this;
	  }), define(g, "toString", function () {
	    return "[object Generator]";
	  }), e.keys = function (t) {
	    var e = Object(t),
	      r = [];
	    for (var n in e) r.push(n);
	    return r.reverse(), function next() {
	      for (; r.length;) {
	        var t = r.pop();
	        if (t in e) return next.value = t, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, e.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function reset(e) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
	    },
	    stop: function stop() {
	      this.done = !0;
	      var t = this.tryEntries[0].completion;
	      if ("throw" === t.type) throw t.arg;
	      return this.rval;
	    },
	    dispatchException: function dispatchException(e) {
	      if (this.done) throw e;
	      var r = this;
	      function handle(n, o) {
	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
	      }
	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
	        var i = this.tryEntries[o],
	          a = i.completion;
	        if ("root" === i.tryLoc) return handle("end");
	        if (i.tryLoc <= this.prev) {
	          var c = n.call(i, "catchLoc"),
	            u = n.call(i, "finallyLoc");
	          if (c && u) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          } else if (c) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	          } else {
	            if (!u) throw new Error("try statement without catch or finally");
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function abrupt(t, e) {
	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	        var o = this.tryEntries[r];
	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
	          var i = o;
	          break;
	        }
	      }
	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
	      var a = i ? i.completion : {};
	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
	    },
	    complete: function complete(t, e) {
	      if ("throw" === t.type) throw t.arg;
	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
	    },
	    finish: function finish(t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
	      }
	    },
	    "catch": function _catch(t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.tryLoc === t) {
	          var n = r.completion;
	          if ("throw" === n.type) {
	            var o = n.arg;
	            resetTryEntry(r);
	          }
	          return o;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function delegateYield(e, r, n) {
	      return this.delegate = {
	        iterator: values(e),
	        resultName: r,
	        nextLoc: n
	      }, "next" === this.method && (this.arg = t), y;
	    }
	  }, e;
	}
	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (regeneratorRuntime$2));

var regeneratorRuntimeExports$1 = regeneratorRuntime$2.exports;

// TODO(Babel 8): Remove this file.

var runtime$1 = regeneratorRuntimeExports$1();
var regenerator = runtime$1;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime$1;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime$1;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime$1);
  }
}

var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator);

// NOTE: this list must be up-to-date with browsers listed in
// test/acceptance/useragentstrings.yml
const BROWSER_ALIASES_MAP = {
  'Amazon Silk': 'amazon_silk',
  'Android Browser': 'android',
  Bada: 'bada',
  BlackBerry: 'blackberry',
  Chrome: 'chrome',
  Chromium: 'chromium',
  Electron: 'electron',
  Epiphany: 'epiphany',
  Firefox: 'firefox',
  Focus: 'focus',
  Generic: 'generic',
  'Google Search': 'google_search',
  Googlebot: 'googlebot',
  'Internet Explorer': 'ie',
  'K-Meleon': 'k_meleon',
  Maxthon: 'maxthon',
  'Microsoft Edge': 'edge',
  'MZ Browser': 'mz',
  'NAVER Whale Browser': 'naver',
  Opera: 'opera',
  'Opera Coast': 'opera_coast',
  PhantomJS: 'phantomjs',
  Puffin: 'puffin',
  QupZilla: 'qupzilla',
  QQ: 'qq',
  QQLite: 'qqlite',
  Safari: 'safari',
  Sailfish: 'sailfish',
  'Samsung Internet for Android': 'samsung_internet',
  SeaMonkey: 'seamonkey',
  Sleipnir: 'sleipnir',
  Swing: 'swing',
  Tizen: 'tizen',
  'UC Browser': 'uc',
  Vivaldi: 'vivaldi',
  'WebOS Browser': 'webos',
  WeChat: 'wechat',
  'Yandex Browser': 'yandex',
  Roku: 'roku',
};

const BROWSER_MAP = {
  amazon_silk: 'Amazon Silk',
  android: 'Android Browser',
  bada: 'Bada',
  blackberry: 'BlackBerry',
  chrome: 'Chrome',
  chromium: 'Chromium',
  electron: 'Electron',
  epiphany: 'Epiphany',
  firefox: 'Firefox',
  focus: 'Focus',
  generic: 'Generic',
  googlebot: 'Googlebot',
  google_search: 'Google Search',
  ie: 'Internet Explorer',
  k_meleon: 'K-Meleon',
  maxthon: 'Maxthon',
  edge: 'Microsoft Edge',
  mz: 'MZ Browser',
  naver: 'NAVER Whale Browser',
  opera: 'Opera',
  opera_coast: 'Opera Coast',
  phantomjs: 'PhantomJS',
  puffin: 'Puffin',
  qupzilla: 'QupZilla',
  qq: 'QQ Browser',
  qqlite: 'QQ Browser Lite',
  safari: 'Safari',
  sailfish: 'Sailfish',
  samsung_internet: 'Samsung Internet for Android',
  seamonkey: 'SeaMonkey',
  sleipnir: 'Sleipnir',
  swing: 'Swing',
  tizen: 'Tizen',
  uc: 'UC Browser',
  vivaldi: 'Vivaldi',
  webos: 'WebOS Browser',
  wechat: 'WeChat',
  yandex: 'Yandex Browser',
};

const PLATFORMS_MAP = {
  tablet: 'tablet',
  mobile: 'mobile',
  desktop: 'desktop',
  tv: 'tv',
};

const OS_MAP = {
  WindowsPhone: 'Windows Phone',
  Windows: 'Windows',
  MacOS: 'macOS',
  iOS: 'iOS',
  Android: 'Android',
  WebOS: 'WebOS',
  BlackBerry: 'BlackBerry',
  Bada: 'Bada',
  Tizen: 'Tizen',
  Linux: 'Linux',
  ChromeOS: 'Chrome OS',
  PlayStation4: 'PlayStation 4',
  Roku: 'Roku',
};

const ENGINE_MAP = {
  EdgeHTML: 'EdgeHTML',
  Blink: 'Blink',
  Trident: 'Trident',
  Presto: 'Presto',
  Gecko: 'Gecko',
  WebKit: 'WebKit',
};

class Utils {
  /**
   * Get first matched item for a string
   * @param {RegExp} regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getFirstMatch(regexp, ua) {
    const match = ua.match(regexp);
    return (match && match.length > 0 && match[1]) || '';
  }

  /**
   * Get second matched item for a string
   * @param regexp
   * @param {String} ua
   * @return {Array|{index: number, input: string}|*|boolean|string}
   */
  static getSecondMatch(regexp, ua) {
    const match = ua.match(regexp);
    return (match && match.length > 1 && match[2]) || '';
  }

  /**
   * Match a regexp and return a constant or undefined
   * @param {RegExp} regexp
   * @param {String} ua
   * @param {*} _const Any const that will be returned if regexp matches the string
   * @return {*}
   */
  static matchAndReturnConst(regexp, ua, _const) {
    if (regexp.test(ua)) {
      return _const;
    }
    return void (0);
  }

  static getWindowsVersionName(version) {
    switch (version) {
      case 'NT': return 'NT';
      case 'XP': return 'XP';
      case 'NT 5.0': return '2000';
      case 'NT 5.1': return 'XP';
      case 'NT 5.2': return '2003';
      case 'NT 6.0': return 'Vista';
      case 'NT 6.1': return '7';
      case 'NT 6.2': return '8';
      case 'NT 6.3': return '8.1';
      case 'NT 10.0': return '10';
      default: return undefined;
    }
  }

  /**
   * Get macOS version name
   *    10.5 - Leopard
   *    10.6 - Snow Leopard
   *    10.7 - Lion
   *    10.8 - Mountain Lion
   *    10.9 - Mavericks
   *    10.10 - Yosemite
   *    10.11 - El Capitan
   *    10.12 - Sierra
   *    10.13 - High Sierra
   *    10.14 - Mojave
   *    10.15 - Catalina
   *
   * @example
   *   getMacOSVersionName("10.14") // 'Mojave'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getMacOSVersionName(version) {
    const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
    v.push(0);
    if (v[0] !== 10) return undefined;
    switch (v[1]) {
      case 5: return 'Leopard';
      case 6: return 'Snow Leopard';
      case 7: return 'Lion';
      case 8: return 'Mountain Lion';
      case 9: return 'Mavericks';
      case 10: return 'Yosemite';
      case 11: return 'El Capitan';
      case 12: return 'Sierra';
      case 13: return 'High Sierra';
      case 14: return 'Mojave';
      case 15: return 'Catalina';
      default: return undefined;
    }
  }

  /**
   * Get Android version name
   *    1.5 - Cupcake
   *    1.6 - Donut
   *    2.0 - Eclair
   *    2.1 - Eclair
   *    2.2 - Froyo
   *    2.x - Gingerbread
   *    3.x - Honeycomb
   *    4.0 - Ice Cream Sandwich
   *    4.1 - Jelly Bean
   *    4.4 - KitKat
   *    5.x - Lollipop
   *    6.x - Marshmallow
   *    7.x - Nougat
   *    8.x - Oreo
   *    9.x - Pie
   *
   * @example
   *   getAndroidVersionName("7.0") // 'Nougat'
   *
   * @param  {string} version
   * @return {string} versionName
   */
  static getAndroidVersionName(version) {
    const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
    v.push(0);
    if (v[0] === 1 && v[1] < 5) return undefined;
    if (v[0] === 1 && v[1] < 6) return 'Cupcake';
    if (v[0] === 1 && v[1] >= 6) return 'Donut';
    if (v[0] === 2 && v[1] < 2) return 'Eclair';
    if (v[0] === 2 && v[1] === 2) return 'Froyo';
    if (v[0] === 2 && v[1] > 2) return 'Gingerbread';
    if (v[0] === 3) return 'Honeycomb';
    if (v[0] === 4 && v[1] < 1) return 'Ice Cream Sandwich';
    if (v[0] === 4 && v[1] < 4) return 'Jelly Bean';
    if (v[0] === 4 && v[1] >= 4) return 'KitKat';
    if (v[0] === 5) return 'Lollipop';
    if (v[0] === 6) return 'Marshmallow';
    if (v[0] === 7) return 'Nougat';
    if (v[0] === 8) return 'Oreo';
    if (v[0] === 9) return 'Pie';
    return undefined;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  static getVersionPrecision(version) {
    return version.split('.').length;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
   *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
   *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
   *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
   *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
   *
   * @param {String} versionA versions versions to compare
   * @param {String} versionB versions versions to compare
   * @param {boolean} [isLoose] enable loose comparison
   * @return {Number} comparison result: -1 when versionA is lower,
   * 1 when versionA is bigger, 0 when both equal
   */
  /* eslint consistent-return: 1 */
  static compareVersions(versionA, versionB, isLoose = false) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    const versionAPrecision = Utils.getVersionPrecision(versionA);
    const versionBPrecision = Utils.getVersionPrecision(versionB);

    let precision = Math.max(versionAPrecision, versionBPrecision);
    let lastPrecision = 0;

    const chunks = Utils.map([versionA, versionB], (version) => {
      const delta = precision - Utils.getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      const _version = version + new Array(delta + 1).join('.0');

      // 3) "9.0" -> ["000000000"", "000000009"]
      return Utils.map(_version.split('.'), chunk => new Array(20 - chunk.length).join('0') + chunk).reverse();
    });

    // adjust precision for loose comparison
    if (isLoose) {
      lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
    }

    // iterate in reverse order by reversed chunks array
    precision -= 1;
    while (precision >= lastPrecision) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }

      if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === lastPrecision) {
          // all version chunks are same
          return 0;
        }

        precision -= 1;
      } else if (chunks[0][precision] < chunks[1][precision]) {
        return -1;
      }
    }

    return undefined;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  static map(arr, iterator) {
    const result = [];
    let i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i += 1) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Array::find polyfill
   *
   * @param  {Array} arr
   * @param  {Function} predicate
   * @return {Array}
   */
  static find(arr, predicate) {
    let i;
    let l;
    if (Array.prototype.find) {
      return Array.prototype.find.call(arr, predicate);
    }
    for (i = 0, l = arr.length; i < l; i += 1) {
      const value = arr[i];
      if (predicate(value, i)) {
        return value;
      }
    }
    return undefined;
  }

  /**
   * Object::assign polyfill
   *
   * @param  {Object} obj
   * @param  {Object} ...objs
   * @return {Object}
   */
  static assign(obj, ...assigners) {
    const result = obj;
    let i;
    let l;
    if (Object.assign) {
      return Object.assign(obj, ...assigners);
    }
    for (i = 0, l = assigners.length; i < l; i += 1) {
      const assigner = assigners[i];
      if (typeof assigner === 'object' && assigner !== null) {
        const keys = Object.keys(assigner);
        keys.forEach((key) => {
          result[key] = assigner[key];
        });
      }
    }
    return obj;
  }

  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('Microsoft Edge') // edge
   *
   * @param  {string} browserName
   * @return {string}
   */
  static getBrowserAlias(browserName) {
    return BROWSER_ALIASES_MAP[browserName];
  }

  /**
   * Get short version/alias for a browser name
   *
   * @example
   *   getBrowserAlias('edge') // Microsoft Edge
   *
   * @param  {string} browserAlias
   * @return {string}
   */
  static getBrowserTypeByAlias(browserAlias) {
    return BROWSER_MAP[browserAlias] || '';
  }
}

/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */

const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;

const browsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe(ua) {
      const browser = {
        name: 'Googlebot',
      };
      const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Opera < 13.0 */
  {
    test: [/opera/i],
    describe(ua) {
      const browser = {
        name: 'Opera',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Opera > 13.0 */
  {
    test: [/opr\/|opios/i],
    describe(ua) {
      const browser = {
        name: 'Opera',
      };
      const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/SamsungBrowser/i],
    describe(ua) {
      const browser = {
        name: 'Samsung Internet for Android',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/Whale/i],
    describe(ua) {
      const browser = {
        name: 'NAVER Whale Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/MZBrowser/i],
    describe(ua) {
      const browser = {
        name: 'MZ Browser',
      };
      const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/focus/i],
    describe(ua) {
      const browser = {
        name: 'Focus',
      };
      const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/swing/i],
    describe(ua) {
      const browser = {
        name: 'Swing',
      };
      const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/coast/i],
    describe(ua) {
      const browser = {
        name: 'Opera Coast',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/opt\/\d+(?:.?_?\d+)+/i],
    describe(ua) {
      const browser = {
        name: 'Opera Touch',
      };
      const version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/yabrowser/i],
    describe(ua) {
      const browser = {
        name: 'Yandex Browser',
      };
      const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/ucbrowser/i],
    describe(ua) {
      const browser = {
        name: 'UC Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/Maxthon|mxios/i],
    describe(ua) {
      const browser = {
        name: 'Maxthon',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/epiphany/i],
    describe(ua) {
      const browser = {
        name: 'Epiphany',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/puffin/i],
    describe(ua) {
      const browser = {
        name: 'Puffin',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/sleipnir/i],
    describe(ua) {
      const browser = {
        name: 'Sleipnir',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/k-meleon/i],
    describe(ua) {
      const browser = {
        name: 'K-Meleon',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/micromessenger/i],
    describe(ua) {
      const browser = {
        name: 'WeChat',
      };
      const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/qqbrowser/i],
    describe(ua) {
      const browser = {
        name: (/qqbrowserlite/i).test(ua) ? 'QQ Browser Lite' : 'QQ Browser',
      };
      const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/msie|trident/i],
    describe(ua) {
      const browser = {
        name: 'Internet Explorer',
      };
      const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/\sedg\//i],
    describe(ua) {
      const browser = {
        name: 'Microsoft Edge',
      };

      const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/edg([ea]|ios)/i],
    describe(ua) {
      const browser = {
        name: 'Microsoft Edge',
      };

      const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/vivaldi/i],
    describe(ua) {
      const browser = {
        name: 'Vivaldi',
      };
      const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/seamonkey/i],
    describe(ua) {
      const browser = {
        name: 'SeaMonkey',
      };
      const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/sailfish/i],
    describe(ua) {
      const browser = {
        name: 'Sailfish',
      };

      const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/silk/i],
    describe(ua) {
      const browser = {
        name: 'Amazon Silk',
      };
      const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/phantom/i],
    describe(ua) {
      const browser = {
        name: 'PhantomJS',
      };
      const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/slimerjs/i],
    describe(ua) {
      const browser = {
        name: 'SlimerJS',
      };
      const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const browser = {
        name: 'BlackBerry',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const browser = {
        name: 'WebOS Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/bada/i],
    describe(ua) {
      const browser = {
        name: 'Bada',
      };
      const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/tizen/i],
    describe(ua) {
      const browser = {
        name: 'Tizen',
      };
      const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/qupzilla/i],
    describe(ua) {
      const browser = {
        name: 'QupZilla',
      };
      const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/firefox|iceweasel|fxios/i],
    describe(ua) {
      const browser = {
        name: 'Firefox',
      };
      const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/electron/i],
    describe(ua) {
      const browser = {
        name: 'Electron',
      };
      const version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/MiuiBrowser/i],
    describe(ua) {
      const browser = {
        name: 'Miui',
      };
      const version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/chromium/i],
    describe(ua) {
      const browser = {
        name: 'Chromium',
      };
      const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/chrome|crios|crmo/i],
    describe(ua) {
      const browser = {
        name: 'Chrome',
      };
      const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },
  {
    test: [/GSA/i],
    describe(ua) {
      const browser = {
        name: 'Google Search',
      };
      const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Android Browser */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const browser = {
        name: 'Android Browser',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* PlayStation 4 */
  {
    test: [/playstation 4/i],
    describe(ua) {
      const browser = {
        name: 'PlayStation 4',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Safari */
  {
    test: [/safari|applewebkit/i],
    describe(ua) {
      const browser = {
        name: 'Safari',
      };
      const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

      if (version) {
        browser.version = version;
      }

      return browser;
    },
  },

  /* Something else */
  {
    test: [/.*/i],
    describe(ua) {
      /* Here we try to make sure that there are explicit details about the device
       * in order to decide what regexp exactly we want to apply
       * (as there is a specific decision based on that conclusion)
       */
      const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
      const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
      const hasDeviceSpec = ua.search('\\(') !== -1;
      const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
      return {
        name: Utils.getFirstMatch(regexp, ua),
        version: Utils.getSecondMatch(regexp, ua),
      };
    },
  },
];

var osParsersList = [
  /* Roku */
  {
    test: [/Roku\/DVP/],
    describe(ua) {
      const version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
      return {
        name: OS_MAP.Roku,
        version,
      };
    },
  },

  /* Windows Phone */
  {
    test: [/windows phone/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.WindowsPhone,
        version,
      };
    },
  },

  /* Windows */
  {
    test: [/windows /i],
    describe(ua) {
      const version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
      const versionName = Utils.getWindowsVersionName(version);

      return {
        name: OS_MAP.Windows,
        version,
        versionName,
      };
    },
  },

  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe(ua) {
      const result = {
        name: OS_MAP.iOS,
      };
      const version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
      if (version) {
        result.version = version;
      }
      return result;
    },
  },

  /* macOS */
  {
    test: [/macintosh/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
      const versionName = Utils.getMacOSVersionName(version);

      const os = {
        name: OS_MAP.MacOS,
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* iOS */
  {
    test: [/(ipod|iphone|ipad)/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');

      return {
        name: OS_MAP.iOS,
        version,
      };
    },
  },

  /* Android */
  {
    test(parser) {
      const notLikeAndroid = !parser.test(/like android/i);
      const butAndroid = parser.test(/android/i);
      return notLikeAndroid && butAndroid;
    },
    describe(ua) {
      const version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
      const versionName = Utils.getAndroidVersionName(version);
      const os = {
        name: OS_MAP.Android,
        version,
      };
      if (versionName) {
        os.versionName = versionName;
      }
      return os;
    },
  },

  /* WebOS */
  {
    test: [/(web|hpw)[o0]s/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
      const os = {
        name: OS_MAP.WebOS,
      };

      if (version && version.length) {
        os.version = version;
      }
      return os;
    },
  },

  /* BlackBerry */
  {
    test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua)
        || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua)
        || Utils.getFirstMatch(/\bbb(\d+)/i, ua);

      return {
        name: OS_MAP.BlackBerry,
        version,
      };
    },
  },

  /* Bada */
  {
    test: [/bada/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);

      return {
        name: OS_MAP.Bada,
        version,
      };
    },
  },

  /* Tizen */
  {
    test: [/tizen/i],
    describe(ua) {
      const version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);

      return {
        name: OS_MAP.Tizen,
        version,
      };
    },
  },

  /* Linux */
  {
    test: [/linux/i],
    describe() {
      return {
        name: OS_MAP.Linux,
      };
    },
  },

  /* Chrome OS */
  {
    test: [/CrOS/],
    describe() {
      return {
        name: OS_MAP.ChromeOS,
      };
    },
  },

  /* Playstation 4 */
  {
    test: [/PlayStation 4/],
    describe(ua) {
      const version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
      return {
        name: OS_MAP.PlayStation4,
        version,
      };
    },
  },
];

/*
 * Tablets go first since usually they have more specific
 * signs to detect.
 */

var platformParsersList = [
  /* Googlebot */
  {
    test: [/googlebot/i],
    describe() {
      return {
        type: 'bot',
        vendor: 'Google',
      };
    },
  },

  /* Huawei */
  {
    test: [/huawei/i],
    describe(ua) {
      const model = Utils.getFirstMatch(/(can-l01)/i, ua) && 'Nova';
      const platform = {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Huawei',
      };
      if (model) {
        platform.model = model;
      }
      return platform;
    },
  },

  /* Nexus Tablet */
  {
    test: [/nexus\s*(?:7|8|9|10).*/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Nexus',
      };
    },
  },

  /* iPad */
  {
    test: [/ipad/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Apple',
        model: 'iPad',
      };
    },
  },

  /* Firefox on iPad */
  {
    test: [/Macintosh(.*?) FxiOS(.*?)\//],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Apple',
        model: 'iPad',
      };
    },
  },

  /* Amazon Kindle Fire */
  {
    test: [/kftt build/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Amazon',
        model: 'Kindle Fire HD 7',
      };
    },
  },

  /* Another Amazon Tablet with Silk */
  {
    test: [/silk/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
        vendor: 'Amazon',
      };
    },
  },

  /* Tablet */
  {
    test: [/tablet(?! pc)/i],
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
      };
    },
  },

  /* iPod/iPhone */
  {
    test(parser) {
      const iDevice = parser.test(/ipod|iphone/i);
      const likeIDevice = parser.test(/like (ipod|iphone)/i);
      return iDevice && !likeIDevice;
    },
    describe(ua) {
      const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Apple',
        model,
      };
    },
  },

  /* Nexus Mobile */
  {
    test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Nexus',
      };
    },
  },

  /* Mobile */
  {
    test: [/[^-]mobi/i],
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* BlackBerry */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'blackberry';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'BlackBerry',
      };
    },
  },

  /* Bada */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'bada';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* Windows Phone */
  {
    test(parser) {
      return parser.getBrowserName() === 'windows phone';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
        vendor: 'Microsoft',
      };
    },
  },

  /* Android Tablet */
  {
    test(parser) {
      const osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
      return parser.getOSName(true) === 'android' && (osMajorVersion >= 3);
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tablet,
      };
    },
  },

  /* Android Mobile */
  {
    test(parser) {
      return parser.getOSName(true) === 'android';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.mobile,
      };
    },
  },

  /* desktop */
  {
    test(parser) {
      return parser.getOSName(true) === 'macos';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
        vendor: 'Apple',
      };
    },
  },

  /* Windows */
  {
    test(parser) {
      return parser.getOSName(true) === 'windows';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
      };
    },
  },

  /* Linux */
  {
    test(parser) {
      return parser.getOSName(true) === 'linux';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.desktop,
      };
    },
  },

  /* PlayStation 4 */
  {
    test(parser) {
      return parser.getOSName(true) === 'playstation 4';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv,
      };
    },
  },

  /* Roku */
  {
    test(parser) {
      return parser.getOSName(true) === 'roku';
    },
    describe() {
      return {
        type: PLATFORMS_MAP.tv,
      };
    },
  },
];

/*
 * More specific goes first
 */
var enginesParsersList = [
  /* EdgeHTML */
  {
    test(parser) {
      return parser.getBrowserName(true) === 'microsoft edge';
    },
    describe(ua) {
      const isBlinkBased = /\sedg\//i.test(ua);

      // return blink if it's blink-based one
      if (isBlinkBased) {
        return {
          name: ENGINE_MAP.Blink,
        };
      }

      // otherwise match the version and return EdgeHTML
      const version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);

      return {
        name: ENGINE_MAP.EdgeHTML,
        version,
      };
    },
  },

  /* Trident */
  {
    test: [/trident/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Trident,
      };

      const version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Presto */
  {
    test(parser) {
      return parser.test(/presto/i);
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Presto,
      };

      const version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Gecko */
  {
    test(parser) {
      const isGecko = parser.test(/gecko/i);
      const likeGecko = parser.test(/like gecko/i);
      return isGecko && !likeGecko;
    },
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.Gecko,
      };

      const version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },

  /* Blink */
  {
    test: [/(apple)?webkit\/537\.36/i],
    describe() {
      return {
        name: ENGINE_MAP.Blink,
      };
    },
  },

  /* WebKit */
  {
    test: [/(apple)?webkit/i],
    describe(ua) {
      const engine = {
        name: ENGINE_MAP.WebKit,
      };

      const version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);

      if (version) {
        engine.version = version;
      }

      return engine;
    },
  },
];

/**
 * The main class that arranges the whole parsing process.
 */
class Parser {
  /**
   * Create instance of Parser
   *
   * @param {String} UA User-Agent string
   * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
   * improvements if you need to make a more particular parsing
   * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
   *
   * @throw {Error} in case of empty UA String
   *
   * @constructor
   */
  constructor(UA, skipParsing = false) {
    if (UA === void (0) || UA === null || UA === '') {
      throw new Error("UserAgent parameter can't be empty");
    }

    this._ua = UA;

    /**
     * @typedef ParsedResult
     * @property {Object} browser
     * @property {String|undefined} [browser.name]
     * Browser name, like `"Chrome"` or `"Internet Explorer"`
     * @property {String|undefined} [browser.version] Browser version as a String `"12.01.45334.10"`
     * @property {Object} os
     * @property {String|undefined} [os.name] OS name, like `"Windows"` or `"macOS"`
     * @property {String|undefined} [os.version] OS version, like `"NT 5.1"` or `"10.11.1"`
     * @property {String|undefined} [os.versionName] OS name, like `"XP"` or `"High Sierra"`
     * @property {Object} platform
     * @property {String|undefined} [platform.type]
     * platform type, can be either `"desktop"`, `"tablet"` or `"mobile"`
     * @property {String|undefined} [platform.vendor] Vendor of the device,
     * like `"Apple"` or `"Samsung"`
     * @property {String|undefined} [platform.model] Device model,
     * like `"iPhone"` or `"Kindle Fire HD 7"`
     * @property {Object} engine
     * @property {String|undefined} [engine.name]
     * Can be any of this: `WebKit`, `Blink`, `Gecko`, `Trident`, `Presto`, `EdgeHTML`
     * @property {String|undefined} [engine.version] String version of the engine
     */
    this.parsedResult = {};

    if (skipParsing !== true) {
      this.parse();
    }
  }

  /**
   * Get UserAgent string of current Parser instance
   * @return {String} User-Agent String of the current <Parser> object
   *
   * @public
   */
  getUA() {
    return this._ua;
  }

  /**
   * Test a UA string for a regexp
   * @param {RegExp} regex
   * @return {Boolean}
   */
  test(regex) {
    return regex.test(this._ua);
  }

  /**
   * Get parsed browser object
   * @return {Object}
   */
  parseBrowser() {
    this.parsedResult.browser = {};

    const browserDescriptor = Utils.find(browsersList, (_browser) => {
      if (typeof _browser.test === 'function') {
        return _browser.test(this);
      }

      if (_browser.test instanceof Array) {
        return _browser.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (browserDescriptor) {
      this.parsedResult.browser = browserDescriptor.describe(this.getUA());
    }

    return this.parsedResult.browser;
  }

  /**
   * Get parsed browser object
   * @return {Object}
   *
   * @public
   */
  getBrowser() {
    if (this.parsedResult.browser) {
      return this.parsedResult.browser;
    }

    return this.parseBrowser();
  }

  /**
   * Get browser's name
   * @return {String} Browser's name or an empty string
   *
   * @public
   */
  getBrowserName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getBrowser().name).toLowerCase() || '';
    }
    return this.getBrowser().name || '';
  }


  /**
   * Get browser's version
   * @return {String} version of browser
   *
   * @public
   */
  getBrowserVersion() {
    return this.getBrowser().version;
  }

  /**
   * Get OS
   * @return {Object}
   *
   * @example
   * this.getOS();
   * {
   *   name: 'macOS',
   *   version: '10.11.12'
   * }
   */
  getOS() {
    if (this.parsedResult.os) {
      return this.parsedResult.os;
    }

    return this.parseOS();
  }

  /**
   * Parse OS and save it to this.parsedResult.os
   * @return {*|{}}
   */
  parseOS() {
    this.parsedResult.os = {};

    const os = Utils.find(osParsersList, (_os) => {
      if (typeof _os.test === 'function') {
        return _os.test(this);
      }

      if (_os.test instanceof Array) {
        return _os.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (os) {
      this.parsedResult.os = os.describe(this.getUA());
    }

    return this.parsedResult.os;
  }

  /**
   * Get OS name
   * @param {Boolean} [toLowerCase] return lower-cased value
   * @return {String} name of the OS — macOS, Windows, Linux, etc.
   */
  getOSName(toLowerCase) {
    const { name } = this.getOS();

    if (toLowerCase) {
      return String(name).toLowerCase() || '';
    }

    return name || '';
  }

  /**
   * Get OS version
   * @return {String} full version with dots ('10.11.12', '5.6', etc)
   */
  getOSVersion() {
    return this.getOS().version;
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  getPlatform() {
    if (this.parsedResult.platform) {
      return this.parsedResult.platform;
    }

    return this.parsePlatform();
  }

  /**
   * Get platform name
   * @param {Boolean} [toLowerCase=false]
   * @return {*}
   */
  getPlatformType(toLowerCase = false) {
    const { type } = this.getPlatform();

    if (toLowerCase) {
      return String(type).toLowerCase() || '';
    }

    return type || '';
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parsePlatform() {
    this.parsedResult.platform = {};

    const platform = Utils.find(platformParsersList, (_platform) => {
      if (typeof _platform.test === 'function') {
        return _platform.test(this);
      }

      if (_platform.test instanceof Array) {
        return _platform.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (platform) {
      this.parsedResult.platform = platform.describe(this.getUA());
    }

    return this.parsedResult.platform;
  }

  /**
   * Get parsed engine
   * @return {{}}
   */
  getEngine() {
    if (this.parsedResult.engine) {
      return this.parsedResult.engine;
    }

    return this.parseEngine();
  }

  /**
   * Get engines's name
   * @return {String} Engines's name or an empty string
   *
   * @public
   */
  getEngineName(toLowerCase) {
    if (toLowerCase) {
      return String(this.getEngine().name).toLowerCase() || '';
    }
    return this.getEngine().name || '';
  }

  /**
   * Get parsed platform
   * @return {{}}
   */
  parseEngine() {
    this.parsedResult.engine = {};

    const engine = Utils.find(enginesParsersList, (_engine) => {
      if (typeof _engine.test === 'function') {
        return _engine.test(this);
      }

      if (_engine.test instanceof Array) {
        return _engine.test.some(condition => this.test(condition));
      }

      throw new Error("Browser's test function is not valid");
    });

    if (engine) {
      this.parsedResult.engine = engine.describe(this.getUA());
    }

    return this.parsedResult.engine;
  }

  /**
   * Parse full information about the browser
   * @returns {Parser}
   */
  parse() {
    this.parseBrowser();
    this.parseOS();
    this.parsePlatform();
    this.parseEngine();

    return this;
  }

  /**
   * Get parsed result
   * @return {ParsedResult}
   */
  getResult() {
    return Utils.assign({}, this.parsedResult);
  }

  /**
   * Check if parsed browser matches certain conditions
   *
   * @param {Object} checkTree It's one or two layered object,
   * which can include a platform or an OS on the first layer
   * and should have browsers specs on the bottom-laying layer
   *
   * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
   * Returns `undefined` when the browser is no described in the checkTree object.
   *
   * @example
   * const browser = Bowser.getParser(window.navigator.userAgent);
   * if (browser.satisfies({chrome: '>118.01.1322' }))
   * // or with os
   * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
   * // or with platforms
   * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
   */
  satisfies(checkTree) {
    const platformsAndOSes = {};
    let platformsAndOSCounter = 0;
    const browsers = {};
    let browsersCounter = 0;

    const allDefinitions = Object.keys(checkTree);

    allDefinitions.forEach((key) => {
      const currentDefinition = checkTree[key];
      if (typeof currentDefinition === 'string') {
        browsers[key] = currentDefinition;
        browsersCounter += 1;
      } else if (typeof currentDefinition === 'object') {
        platformsAndOSes[key] = currentDefinition;
        platformsAndOSCounter += 1;
      }
    });

    if (platformsAndOSCounter > 0) {
      const platformsAndOSNames = Object.keys(platformsAndOSes);
      const OSMatchingDefinition = Utils.find(platformsAndOSNames, name => (this.isOS(name)));

      if (OSMatchingDefinition) {
        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);

        if (osResult !== void 0) {
          return osResult;
        }
      }

      const platformMatchingDefinition = Utils.find(
        platformsAndOSNames,
        name => (this.isPlatform(name)),
      );
      if (platformMatchingDefinition) {
        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);

        if (platformResult !== void 0) {
          return platformResult;
        }
      }
    }

    if (browsersCounter > 0) {
      const browserNames = Object.keys(browsers);
      const matchingDefinition = Utils.find(browserNames, name => (this.isBrowser(name, true)));

      if (matchingDefinition !== void 0) {
        return this.compareVersion(browsers[matchingDefinition]);
      }
    }

    return undefined;
  }

  /**
   * Check if the browser name equals the passed string
   * @param browserName The string to compare with the browser name
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {boolean}
   */
  isBrowser(browserName, includingAlias = false) {
    const defaultBrowserName = this.getBrowserName().toLowerCase();
    let browserNameLower = browserName.toLowerCase();
    const alias = Utils.getBrowserTypeByAlias(browserNameLower);

    if (includingAlias && alias) {
      browserNameLower = alias.toLowerCase();
    }
    return browserNameLower === defaultBrowserName;
  }

  compareVersion(version) {
    let expectedResults = [0];
    let comparableVersion = version;
    let isLoose = false;

    const currentBrowserVersion = this.getBrowserVersion();

    if (typeof currentBrowserVersion !== 'string') {
      return void 0;
    }

    if (version[0] === '>' || version[0] === '<') {
      comparableVersion = version.substr(1);
      if (version[1] === '=') {
        isLoose = true;
        comparableVersion = version.substr(2);
      } else {
        expectedResults = [];
      }
      if (version[0] === '>') {
        expectedResults.push(1);
      } else {
        expectedResults.push(-1);
      }
    } else if (version[0] === '=') {
      comparableVersion = version.substr(1);
    } else if (version[0] === '~') {
      isLoose = true;
      comparableVersion = version.substr(1);
    }

    return expectedResults.indexOf(
      Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose),
    ) > -1;
  }

  isOS(osName) {
    return this.getOSName(true) === String(osName).toLowerCase();
  }

  isPlatform(platformType) {
    return this.getPlatformType(true) === String(platformType).toLowerCase();
  }

  isEngine(engineName) {
    return this.getEngineName(true) === String(engineName).toLowerCase();
  }

  /**
   * Is anything? Check if the browser is called "anything",
   * the OS called "anything" or the platform called "anything"
   * @param {String} anything
   * @param [includingAlias=false] The flag showing whether alias will be included into comparison
   * @returns {Boolean}
   */
  is(anything, includingAlias = false) {
    return this.isBrowser(anything, includingAlias) || this.isOS(anything)
      || this.isPlatform(anything);
  }

  /**
   * Check if any of the given values satisfies this.is(anything)
   * @param {String[]} anythings
   * @returns {Boolean}
   */
  some(anythings = []) {
    return anythings.some(anything => this.is(anything));
  }
}

/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 */

/**
 * Bowser class.
 * Keep it simple as much as it can be.
 * It's supposed to work with collections of {@link Parser} instances
 * rather then solve one-instance problems.
 * All the one-instance stuff is located in Parser class.
 *
 * @class
 * @classdesc Bowser is a static object, that provides an API to the Parsers
 * @hideconstructor
 */
class Bowser {
  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
  static getParser(UA, skipParsing = false) {
    if (typeof UA !== 'string') {
      throw new Error('UserAgent should be a string');
    }
    return new Parser(UA, skipParsing);
  }

  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
  static parse(UA) {
    return (new Parser(UA)).getResult();
  }

  static get BROWSER_MAP() {
    return BROWSER_MAP;
  }

  static get ENGINE_MAP() {
    return ENGINE_MAP;
  }

  static get OS_MAP() {
    return OS_MAP;
  }

  static get PLATFORMS_MAP() {
    return PLATFORMS_MAP;
  }
}

var regeneratorRuntime$1 = {exports: {}};

var _typeof$1 = {exports: {}};

_typeof$1.exports;

(function (module) {
	function _typeof(o) {
	  "@babel/helpers - typeof";

	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
	    return typeof o;
	  } : function (o) {
	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
	}
	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (_typeof$1));

var _typeofExports = _typeof$1.exports;

regeneratorRuntime$1.exports;

(function (module) {
	var _typeof = _typeofExports["default"];
	function _regeneratorRuntime() {
	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
	    return e;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  var t,
	    e = {},
	    r = Object.prototype,
	    n = r.hasOwnProperty,
	    o = Object.defineProperty || function (t, e, r) {
	      t[e] = r.value;
	    },
	    i = "function" == typeof Symbol ? Symbol : {},
	    a = i.iterator || "@@iterator",
	    c = i.asyncIterator || "@@asyncIterator",
	    u = i.toStringTag || "@@toStringTag";
	  function define(t, e, r) {
	    return Object.defineProperty(t, e, {
	      value: r,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), t[e];
	  }
	  try {
	    define({}, "");
	  } catch (t) {
	    define = function define(t, e, r) {
	      return t[e] = r;
	    };
	  }
	  function wrap(t, e, r, n) {
	    var i = e && e.prototype instanceof Generator ? e : Generator,
	      a = Object.create(i.prototype),
	      c = new Context(n || []);
	    return o(a, "_invoke", {
	      value: makeInvokeMethod(t, r, c)
	    }), a;
	  }
	  function tryCatch(t, e, r) {
	    try {
	      return {
	        type: "normal",
	        arg: t.call(e, r)
	      };
	    } catch (t) {
	      return {
	        type: "throw",
	        arg: t
	      };
	    }
	  }
	  e.wrap = wrap;
	  var h = "suspendedStart",
	    l = "suspendedYield",
	    f = "executing",
	    s = "completed",
	    y = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var p = {};
	  define(p, a, function () {
	    return this;
	  });
	  var d = Object.getPrototypeOf,
	    v = d && d(d(values([])));
	  v && v !== r && n.call(v, a) && (p = v);
	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
	  function defineIteratorMethods(t) {
	    ["next", "throw", "return"].forEach(function (e) {
	      define(t, e, function (t) {
	        return this._invoke(e, t);
	      });
	    });
	  }
	  function AsyncIterator(t, e) {
	    function invoke(r, o, i, a) {
	      var c = tryCatch(t[r], t, o);
	      if ("throw" !== c.type) {
	        var u = c.arg,
	          h = u.value;
	        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
	          invoke("next", t, i, a);
	        }, function (t) {
	          invoke("throw", t, i, a);
	        }) : e.resolve(h).then(function (t) {
	          u.value = t, i(u);
	        }, function (t) {
	          return invoke("throw", t, i, a);
	        });
	      }
	      a(c.arg);
	    }
	    var r;
	    o(this, "_invoke", {
	      value: function value(t, n) {
	        function callInvokeWithMethodAndArg() {
	          return new e(function (e, r) {
	            invoke(t, n, e, r);
	          });
	        }
	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(e, r, n) {
	    var o = h;
	    return function (i, a) {
	      if (o === f) throw new Error("Generator is already running");
	      if (o === s) {
	        if ("throw" === i) throw a;
	        return {
	          value: t,
	          done: !0
	        };
	      }
	      for (n.method = i, n.arg = a;;) {
	        var c = n.delegate;
	        if (c) {
	          var u = maybeInvokeDelegate(c, n);
	          if (u) {
	            if (u === y) continue;
	            return u;
	          }
	        }
	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
	          if (o === h) throw o = s, n.arg;
	          n.dispatchException(n.arg);
	        } else "return" === n.method && n.abrupt("return", n.arg);
	        o = f;
	        var p = tryCatch(e, r, n);
	        if ("normal" === p.type) {
	          if (o = n.done ? s : l, p.arg === y) continue;
	          return {
	            value: p.arg,
	            done: n.done
	          };
	        }
	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(e, r) {
	    var n = r.method,
	      o = e.iterator[n];
	    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
	    var i = tryCatch(o, e.iterator, r.arg);
	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
	    var a = i.arg;
	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
	  }
	  function pushTryEntry(t) {
	    var e = {
	      tryLoc: t[0]
	    };
	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
	  }
	  function resetTryEntry(t) {
	    var e = t.completion || {};
	    e.type = "normal", delete e.arg, t.completion = e;
	  }
	  function Context(t) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], t.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(e) {
	    if (e || "" === e) {
	      var r = e[a];
	      if (r) return r.call(e);
	      if ("function" == typeof e.next) return e;
	      if (!isNaN(e.length)) {
	        var o = -1,
	          i = function next() {
	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
	            return next.value = t, next.done = !0, next;
	          };
	        return i.next = i;
	      }
	    }
	    throw new TypeError(_typeof(e) + " is not iterable");
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), o(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
	    var e = "function" == typeof t && t.constructor;
	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
	  }, e.mark = function (t) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
	  }, e.awrap = function (t) {
	    return {
	      __await: t
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
	    return this;
	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
	    void 0 === i && (i = Promise);
	    var a = new AsyncIterator(wrap(t, r, n, o), i);
	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
	      return t.done ? t.value : a.next();
	    });
	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
	    return this;
	  }), define(g, "toString", function () {
	    return "[object Generator]";
	  }), e.keys = function (t) {
	    var e = Object(t),
	      r = [];
	    for (var n in e) r.push(n);
	    return r.reverse(), function next() {
	      for (; r.length;) {
	        var t = r.pop();
	        if (t in e) return next.value = t, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, e.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function reset(e) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
	    },
	    stop: function stop() {
	      this.done = !0;
	      var t = this.tryEntries[0].completion;
	      if ("throw" === t.type) throw t.arg;
	      return this.rval;
	    },
	    dispatchException: function dispatchException(e) {
	      if (this.done) throw e;
	      var r = this;
	      function handle(n, o) {
	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
	      }
	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
	        var i = this.tryEntries[o],
	          a = i.completion;
	        if ("root" === i.tryLoc) return handle("end");
	        if (i.tryLoc <= this.prev) {
	          var c = n.call(i, "catchLoc"),
	            u = n.call(i, "finallyLoc");
	          if (c && u) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          } else if (c) {
	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
	          } else {
	            if (!u) throw new Error("try statement without catch or finally");
	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function abrupt(t, e) {
	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	        var o = this.tryEntries[r];
	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
	          var i = o;
	          break;
	        }
	      }
	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
	      var a = i ? i.completion : {};
	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
	    },
	    complete: function complete(t, e) {
	      if ("throw" === t.type) throw t.arg;
	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
	    },
	    finish: function finish(t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
	      }
	    },
	    "catch": function _catch(t) {
	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
	        var r = this.tryEntries[e];
	        if (r.tryLoc === t) {
	          var n = r.completion;
	          if ("throw" === n.type) {
	            var o = n.arg;
	            resetTryEntry(r);
	          }
	          return o;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function delegateYield(e, r, n) {
	      return this.delegate = {
	        iterator: values(e),
	        resultName: r,
	        nextLoc: n
	      }, "next" === this.method && (this.arg = t), y;
	    }
	  }, e;
	}
	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
} (regeneratorRuntime$1));

var regeneratorRuntimeExports = regeneratorRuntime$1.exports;

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntimeExports();

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/*
  Copyright 2022-2023 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/
/**
 * BasePvFile Class
 * This class mocks the file system using in-memory storage.
 */
var PvFile = /*#__PURE__*/function () {
  function PvFile() {
    _classCallCheck$1(this, PvFile);
    this._path = '';
  }
  /**
   * Getter for file's meta information.
   */
  _createClass$1(PvFile, [{
    key: "meta",
    get: function get() {
      if (this._meta === undefined) {
        return undefined;
      }
      return Object.assign({
        version: 0
      }, this._meta);
    }
  }, {
    key: "pageSize",
    get: function get() {
      return undefined;
    }
    /**
     * Get the file pointer from the _filePtrs map.
     * @param ptr The pointer to BasePvFile instance to get from the map.
     * @returns BasePvFile returns the current file instance related to ptr.
     */
  }], [{
    key: "getPtr",
    value: function getPtr(ptr) {
      if (PvFile._filePtrs.has(ptr)) {
        return PvFile._filePtrs.get(ptr);
      }
      throw new Error('File instance not found.');
    }
    /**
     * Saves the BasePvFile instance to the map with an associated ptr.
     * @param ptr The file pointer to save as the key.
     * @param instance The BasePvFile instance to save as the value.
     */
  }, {
    key: "setPtr",
    value: function setPtr(ptr, instance) {
      PvFile._filePtrs.set(ptr, instance);
    }
    /**
     * Removes the ptr from the _filePtrs map.
     * @param ptr The file pointer to remove.
     */
  }, {
    key: "removePtr",
    value: function removePtr(ptr) {
      PvFile._filePtrs["delete"](ptr);
    }
  }]);
  return PvFile;
}();
PvFile._filePtrs = new Map();
/**
 * Cast a signed address to unsigned address.
 *
 * @param address The address to cast to unsigned address.
 */
function unsignedAddress(address) {
  if (address < 0) {
    return address >>> 0;
  }
  return address;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var PvWebGPUDevice = /*#__PURE__*/function () {
  function PvWebGPUDevice(device, adapterInfo) {
    _classCallCheck(this, PvWebGPUDevice);
    _defineProperty(this, "_numCommandsEncoded", void 0);
    _defineProperty(this, "_commandEncoder", void 0);
    _defineProperty(this, "_passEncoder", void 0);
    _defineProperty(this, "_stageBuffersPendingMap", void 0);
    _defineProperty(this, "_uniformBuffersPendingRelease", void 0);
    _defineProperty(this, "device", void 0);
    _defineProperty(this, "bufferReusePool", void 0);
    _defineProperty(this, "shaders", void 0);
    _defineProperty(this, "isTimerEnabled", void 0);
    _defineProperty(this, "timestampBuffers", void 0);
    _defineProperty(this, "shaderTimes", void 0);
    _defineProperty(this, "adapterInfo", void 0);
    this._numCommandsEncoded = 0;
    this._commandEncoder = null;
    this._passEncoder = null;
    this._stageBuffersPendingMap = [];
    this._uniformBuffersPendingRelease = [];
    this.device = device;
    this.bufferReusePool = new Map();
    this.shaders = {};
    this.shaderTimes = {};
    this.timestampBuffers = {};
    this.isTimerEnabled = false;
    this.adapterInfo = adapterInfo;
  }
  _createClass(PvWebGPUDevice, [{
    key: "getBufferKey",
    value: function getBufferKey(sizeInBytes, usage) {
      return "".concat(usage, "_").concat(sizeInBytes);
    }
  }, {
    key: "commandEncoder",
    get: function get() {
      if (!this._commandEncoder) {
        this._commandEncoder = this.device.createCommandEncoder();
      }
      return this._commandEncoder;
    }
  }, {
    key: "numCommandsEncoded",
    get: function get() {
      return this._numCommandsEncoded;
    },
    set: function set(value) {
      this._numCommandsEncoded = value;
      if (this._numCommandsEncoded >= 16) {
        this.endComputePass();
        this.flushCommandEncoder();
      }
    }
  }, {
    key: "endComputePass",
    value: function endComputePass() {
      if (this._passEncoder) {
        this._passEncoder.end();
        this._passEncoder = null;
      }
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(sizeBytes, usage) {
      var mappedAtCreation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var label = arguments.length > 3 ? arguments[3] : undefined;
      var key = this.getBufferKey(sizeBytes, usage);
      if (this.bufferReusePool.has(key)) {
        var buffers = this.bufferReusePool.get(key);
        if (buffers && buffers.length > 0) {
          return buffers.pop();
        }
      }
      return this.device.createBuffer({
        size: sizeBytes * Uint8Array.BYTES_PER_ELEMENT,
        usage: usage,
        mappedAtCreation: mappedAtCreation,
        label: label
      });
    }
  }, {
    key: "scheduleUniformBufferForRelease",
    value: function scheduleUniformBufferForRelease(buffer) {
      this._uniformBuffersPendingRelease.push(buffer);
    }
  }, {
    key: "releaseBuffer",
    value: function releaseBuffer(buffer) {
      var clearBuffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (clearBuffer) {
        this.endComputePass();
        this.commandEncoder.clearBuffer(buffer, 0, buffer.size);
      }
      var key = this.getBufferKey(buffer.size, buffer.usage);
      if (!this.bufferReusePool.has(key)) {
        this.bufferReusePool.set(key, []);
      }
      this.bufferReusePool.get(key).push(buffer);
    }
  }, {
    key: "sync",
    value: function () {
      var _sync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this = this;
        var _iterator, _step, k, buffers, _iterator3, _step3, b, _loop, _i, _Object$entries;
        return _regeneratorRuntime.wrap(function _callee$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              this.flushCommandEncoder();
              _context3.next = 3;
              return this.device.queue.onSubmittedWorkDone();
            case 3:
              _iterator = _createForOfIteratorHelper(this.bufferReusePool.keys());
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  k = _step.value;
                  buffers = this.bufferReusePool.get(k);
                  if (buffers && buffers.length > 0) {
                    _iterator3 = _createForOfIteratorHelper(buffers);
                    try {
                      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                        b = _step3.value;
                        b === null || b === void 0 || b.destroy();
                      }
                    } catch (err) {
                      _iterator3.e(err);
                    } finally {
                      _iterator3.f();
                    }
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              this.bufferReusePool.clear();
              _loop = /*#__PURE__*/_regeneratorRuntime.mark(function _loop() {
                var _Object$entries$_i, shaderName, timestampBuffers, _iterator2, _step2, _loop2;
                return _regeneratorRuntime.wrap(function _loop$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), shaderName = _Object$entries$_i[0], timestampBuffers = _Object$entries$_i[1];
                      if (!_this.shaderTimes[shaderName]) {
                        _this.shaderTimes[shaderName] = [];
                      }
                      _iterator2 = _createForOfIteratorHelper(timestampBuffers);
                      _context2.prev = 3;
                      _loop2 = /*#__PURE__*/_regeneratorRuntime.mark(function _loop2() {
                        var timestampBuffer;
                        return _regeneratorRuntime.wrap(function _loop2$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              timestampBuffer = _step2.value;
                              timestampBuffer.mapAsync(GPUMapMode.READ).then(function () {
                                var times = new BigInt64Array(timestampBuffer.getMappedRange());
                                var timeDif = times[1] - times[0];
                                timestampBuffer.unmap();
                                timestampBuffer.destroy();
                                _this.shaderTimes[shaderName].push(timeDif);
                              });
                            case 2:
                            case "end":
                              return _context.stop();
                          }
                        }, _loop2);
                      });
                      _iterator2.s();
                    case 6:
                      if ((_step2 = _iterator2.n()).done) {
                        _context2.next = 10;
                        break;
                      }
                      return _context2.delegateYield(_loop2(), "t0", 8);
                    case 8:
                      _context2.next = 6;
                      break;
                    case 10:
                      _context2.next = 15;
                      break;
                    case 12:
                      _context2.prev = 12;
                      _context2.t1 = _context2["catch"](3);
                      _iterator2.e(_context2.t1);
                    case 15:
                      _context2.prev = 15;
                      _iterator2.f();
                      return _context2.finish(15);
                    case 18:
                    case "end":
                      return _context2.stop();
                  }
                }, _loop, null, [[3, 12, 15, 18]]);
              });
              _i = 0, _Object$entries = Object.entries(this.timestampBuffers);
            case 8:
              if (!(_i < _Object$entries.length)) {
                _context3.next = 13;
                break;
              }
              return _context3.delegateYield(_loop(), "t0", 10);
            case 10:
              _i++;
              _context3.next = 8;
              break;
            case 13:
              this.timestampBuffers = {};
            case 14:
            case "end":
              return _context3.stop();
          }
        }, _callee, this);
      }));
      function sync() {
        return _sync.apply(this, arguments);
      }
      return sync;
    }()
  }, {
    key: "reportShaderTimes",
    value: function reportShaderTimes() {
      for (var _i2 = 0, _Object$entries2 = Object.entries(this.shaderTimes); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          shaderName = _Object$entries2$_i[0],
          shaderTimes = _Object$entries2$_i[1];
        var timeSum = 0n;
        var _iterator4 = _createForOfIteratorHelper(shaderTimes),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var shaderTime = _step4.value;
            timeSum = timeSum + shaderTime;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        var totalSeconds = Number(timeSum) * 1e-9;
        var avgSeconds = (totalSeconds / shaderTimes.length).toFixed(7);
        console.log("".concat(shaderName, ", ").concat(totalSeconds.toFixed(5), ", ").concat(avgSeconds));
      }
      this.shaderTimes = {};
    }
  }, {
    key: "flushCommandEncoder",
    value: function flushCommandEncoder() {
      var _this2 = this;
      this.device.queue.submit([this.commandEncoder.finish()]);
      this._commandEncoder = null;
      this._numCommandsEncoded = 0;
      this._stageBuffersPendingMap.forEach(function (buffer) {
        buffer.destroy();
      });
      this._stageBuffersPendingMap = [];
      this._uniformBuffersPendingRelease.forEach(function (buffer) {
        _this2.releaseBuffer(buffer, false);
      });
      this._uniformBuffersPendingRelease = [];
    }
  }, {
    key: "writeBuffer",
    value: function writeBuffer(sizeBytes, offset, srcArray, dstBuffer) {
      var stagingBuffer = this.getBuffer(sizeBytes, GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC, true);
      new Uint8Array(stagingBuffer.getMappedRange()).set(srcArray);
      stagingBuffer.unmap();
      this._stageBuffersPendingMap.push(stagingBuffer);
      this.endComputePass();
      this.commandEncoder.copyBufferToBuffer(stagingBuffer, 0, dstBuffer, offset, sizeBytes);
      this.numCommandsEncoded++;
    }
  }, {
    key: "dispatchComputerShader",
    value: function dispatchComputerShader(bindGroup, pipeline, shaderName, workgroupCountX, workgroupCountY, workgroupCountZ) {
      if (this.isTimerEnabled) {
        var querySet = this.device.createQuerySet({
          type: 'timestamp',
          count: 2
        });
        var timestampWrites = {
          querySet: querySet,
          beginningOfPassWriteIndex: 0,
          endOfPassWriteIndex: 1
        };
        this.endComputePass();
        this._passEncoder = this.commandEncoder.beginComputePass({
          timestampWrites: timestampWrites
        });
        this._passEncoder.setBindGroup(0, bindGroup);
        this._passEncoder.setPipeline(pipeline);
        this._passEncoder.dispatchWorkgroups(workgroupCountX, workgroupCountY, workgroupCountZ);
        this.endComputePass();
        var size = 2 * BigInt64Array.BYTES_PER_ELEMENT;
        var resolveBuffer = this.device.createBuffer({
          size: size,
          usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.COPY_SRC
        });
        this.commandEncoder.resolveQuerySet(querySet, 0, 2, resolveBuffer, 0);
        var resultBuffer = this.device.createBuffer({
          size: size,
          usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
        });
        this.commandEncoder.copyBufferToBuffer(resolveBuffer, 0, resultBuffer, 0, size);
        if (!this.timestampBuffers[shaderName]) {
          this.timestampBuffers[shaderName] = [];
        }
        this.timestampBuffers[shaderName].push(resultBuffer);
        this.numCommandsEncoded += 3;
      } else {
        if (!this._passEncoder) {
          this._passEncoder = this.commandEncoder.beginComputePass();
        }
        this._passEncoder.setBindGroup(0, bindGroup);
        this._passEncoder.setPipeline(pipeline);
        this._passEncoder.dispatchWorkgroups(workgroupCountX, workgroupCountY, workgroupCountZ);
        this.numCommandsEncoded++;
      }
    }
  }]);
  return PvWebGPUDevice;
}();

var PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE = 256;
var PV_PICOLLM_WEBGPU_MAX_GRID_DIM = 65535;
var gpuDevices = new Map();
var gpuBuffers = new Map();
var emptyShader = "\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main_empty() {}\n";
var shaderEntryPoint = 'main';

var PRECOMPUTE_ENCODING_SHADER_NAME = "pv_picollm_attention_precompute_encoding_shader";
var attentionPrecomputeEncodingShaderSource = "\nstruct argsStruct {\n  dimension: u32,\n  steps: u32,\n  theta: f32,\n  encoding_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> encoding: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(local_invocation_id) local_id: vec3<u32>,\n  @builtin(workgroup_id) workgroup_id: vec3<u32>,\n  @builtin(num_workgroups) num_workgroups: vec3<u32>\n) {\n  let ts = workgroup_id.x;\n  let ds = local_id.x;\n  \n  for (var t = ts; t < args.steps; t += num_workgroups.x) {\n    for (var d = ds; d < (args.dimension / 2u); d += workgroup_size_x) {\n      let f = 2u * d;\n      let x = f32(t) / pow(args.theta, f32(f) / f32(args.dimension));\n      let encoding_idx = args.encoding_offset + (t * args.dimension) + f;\n      encoding[encoding_idx] = cos(x);\n      encoding[encoding_idx + 1] = sin(x);\n    }\n  }            \n}\n\n".concat(emptyShader);
var loadAttentionPrecomputeEncodingShader = function loadAttentionPrecomputeEncodingShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention precompute encoding bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention precompute encoding pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention precompute encoding shader module",
    code: attentionPrecomputeEncodingShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention precompute encoding pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var ENCODE_ROPE_INTERLEAVED_SHADER_NAME = "pv_picollm_attention_encode_rope_interleaved_shader";
var attentionEncodeRopeInterleavedShaderSource = "\nstruct argsStruct {  \n  n: u32,\n  num_heads: u32,\n  head_dimension: u32,\n  rope_dimension: u32,\n  position: u32,\n  encoding_offset: u32,\n  x_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> encoding: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> x: array<f32>;\n          \noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(local_invocation_id) local_id: vec3<u32>,\n  @builtin(workgroup_id) workgroup_id: vec3<u32>,\n  @builtin(num_workgroups) num_workgroups: vec3<u32>\n) {\n  let ts = workgroup_id.x;\n  let h = workgroup_id.y;\n  let ds = local_id.x;\n\n  for (var t = ts; t < args.n; t += num_workgroups.x) {\n    let x_start = args.x_offset + (t * args.num_heads + h) * args.head_dimension;\n    let encoding_start = args.encoding_offset + ((t + args.position) * args.rope_dimension);    \n    for (var d = ds; d < (args.head_dimension / 2u); d += workgroup_size_x) {\n      let i = 2u * d;\n      let x_idx = x_start + i;\n      let encoding_idx = encoding_start + i;\n      \n      let re = x[x_idx];\n      let im = x[x_idx + 1];\n      x[x_idx] = (re * encoding[encoding_idx]) - (im * encoding[encoding_idx + 1]);\n      x[x_idx + 1] = (re * encoding[encoding_idx + 1]) + (im * encoding[encoding_idx]);\n    }\n  }\n}\n\n".concat(emptyShader);
var loadAttentionEncodeRopeInterleavedShader = function loadAttentionEncodeRopeInterleavedShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention encode rope interleave bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention encode rope interleave pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention encode rope interleave shader module",
    code: attentionEncodeRopeInterleavedShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention encode rope interleave pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var ENCODE_SHADER_NAME = "pv_picollm_attention_encode_shader";
var attentionEncodeShaderSource = "\nstruct argsStruct {  \n  n: u32,\n  num_heads: u32,\n  head_dimension: u32,\n  rope_dimension: u32,\n  position: u32,\n  encoding_offset: u32,\n  x_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> encoding: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> x: array<f32>;\n          \noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(local_invocation_id) local_id: vec3<u32>,\n  @builtin(workgroup_id) workgroup_id: vec3<u32>,\n  @builtin(num_workgroups) num_workgroups: vec3<u32>\n) {\n  let ts = workgroup_id.x;\n  let h = workgroup_id.y;\n  let ds = local_id.x;\n\n  for (var t = ts; t < args.n; t += num_workgroups.x) {\n    let half_rope = (args.rope_dimension / 2);\n    let xr_start = args.x_offset + ((t * args.num_heads + h) * args.head_dimension);\n    let xi_start = xr_start + half_rope;\n    let encoding_start = args.encoding_offset + ((t + args.position) * args.rope_dimension);  \n    for (var d = ds; d < half_rope; d += workgroup_size_x) {\n      let xr_idx = xr_start + d;\n      let xi_idx = xi_start + d;\n      let encoding_idx = encoding_start + (2 * d);\n\n      let re = x[xr_idx];\n      let im = x[xi_idx];\n      x[xr_idx] = (re * encoding[encoding_idx]) - (im * encoding[encoding_idx + 1]);\n      x[xi_idx] = (re * encoding[encoding_idx + 1]) + (im * encoding[encoding_idx]);\n    }\n  }\n}\n\n".concat(emptyShader);
var loadAttentionEncodeShader = function loadAttentionEncodeShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention encode bind layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention encode pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention encode shader",
    code: attentionEncodeShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention encode pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var DOT_PRODUCT_SHADER_NAME = "pv_picollm_attention_dot_product_shader";
var attentionDotProductShaderSource = "\nstruct argsStruct {  \n  n: u32,\n  tq: u32,\n  head_dimension: u32,\n  num_heads: u32,\n  num_kv_heads: u32,\n  window_length: u32,\n  start: u32,\n  norm: f32,\n  length1: u32,\n  num_keys: u32,\n  query_offset: u32,\n  keys_offset: u32,\n  key_intercepts_offset: u32,\n  key_slopes_offset: u32,\n  scores_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> query: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> keys: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> key_intercepts: array<f32>;\n\n@group(0) @binding(4)\nvar<storage, read> key_slopes: array<f32>;\n\n@group(0) @binding(5)\nvar<storage, read_write> scores: array<f32>;\n       \noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.num_heads) {\n    return;\n  }\n\n  let head = global_id.x / (args.num_heads / args.num_kv_heads);\n  \n  let head_offset = head * args.window_length;\n  let start_index = head_offset + args.start;\n    \n  let keys_local_a = args.keys_offset + (start_index * args.head_dimension);\n  let key_intercepts_local_a = args.key_intercepts_offset + start_index;  \n  let key_slopes_local_a = args.key_slopes_offset + start_index;\n  \n  let keys_local_b = args.keys_offset + (head_offset * args.head_dimension);\n  let key_intercepts_local_b = args.key_intercepts_offset + head_offset;  \n  let key_slopes_local_b = args.key_slopes_offset + head_offset;\n  \n  let scores_local = args.scores_offset + (global_id.x * args.num_keys);\n  let query_local = args.query_offset + (((global_id.x * args.n) + args.tq) * args.head_dimension);\n    \n  for (var i = 0u; i < args.head_dimension; i++) {      \n    for (var k = 0u; k < args.num_keys; k++) {\n      if (k < args.length1) { \n        let key_idx = keys_local_a + (k * args.head_dimension) + i;\n        let key_val = f32(extractBits(keys[key_idx / 4], (i * 8u) % 32u, 8u));\n        let tmp = query[query_local + i] * (key_intercepts[key_intercepts_local_a + k] + (key_slopes[key_slopes_local_a + k] * key_val));\n        scores[scores_local + k] += tmp;\n      }\n      else {\n        let j = k - args.length1;\n        let key_idx = keys_local_b + (j * args.head_dimension) + i;\n        let key_val = f32(extractBits(keys[key_idx / 4], (i * 8u) % 32u, 8u));\n        let tmp = query[query_local + i] * (key_intercepts[key_intercepts_local_b + j] + (key_slopes[key_slopes_local_b + j] * key_val));\n        scores[scores_local + k] += tmp;\n      }\n    }    \n  }\n  \n  for (var k = 0u; k < args.num_keys; k++) {\n    scores[scores_local + k] *= args.norm;\n  }\n}\n\n".concat(emptyShader);
var loadAttentionDotProductShader = function loadAttentionDotProductShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention dot product bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 4,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 5,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention dot product pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention dot product shader module",
    code: attentionDotProductShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention dot product pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var SOFTMAX_SHADER_NAME = "pv_picollm_attention_softmax_shader";
var attentionSoftmaxShaderSource = "\nstruct argsStruct {  \n  num_heads: u32,\n  num_keys: u32,\n  scores_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> scores: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.num_heads) {\n    return;\n  }\n\n  let scores_start = args.scores_offset + (global_id.x * args.num_keys);\n  \n  var max_index: u32 = 0;\n  for (var i = 1u; i < args.num_keys; i++) {\n    if (scores[scores_start + i] > scores[scores_start + max_index]) {\n      max_index = i;\n    }\n  }\n  let max: f32 = scores[scores_start + max_index];\n\n  var sum: f32 = 0.0;\n  for (var i = 0u; i < args.num_keys; i++) {\n    scores[scores_start + i] = exp(scores[scores_start + i] - max);\n    sum += scores[scores_start + i];\n  }\n\n  for (var i = 0u; i < args.num_keys; i++) {\n    scores[scores_start + i] /= sum;\n  }\n}\n\n".concat(emptyShader);
var loadAttentionSoftmaxShader = function loadAttentionSoftmaxShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention softmax bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention softmax pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention softmax shader module",
    code: attentionSoftmaxShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention softmax pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var FIR_SHADER_NAME = "pv_picollm_attention_fir_shader";
var attentionFirShaderSource = "\nstruct argsStruct {  \n  length1: u32,\n  length2: u32,\n  tq: u32,\n  head_dimension: u32,\n  num_heads: u32,\n  num_kv_heads: u32,\n  window_length: u32,\n  start: u32,\n  values_offset: u32,\n  value_intercepts_offset: u32,\n  value_slopes_offset: u32,\n  scores_offset: u32,\n  output_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> values: array<u32>;\n\n@group(0) @binding(2)\nvar<storage, read> value_intercepts: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read> value_slopes: array<f32>;\n\n@group(0) @binding(4)\nvar<storage, read> scores: array<f32>;\n\n@group(0) @binding(5)\nvar<storage, read_write> output: array<f32>;\n          \noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.num_heads) {\n    return;\n  }\n\n  let head = global_id.x / (args.num_heads / args.num_kv_heads);\n\n  let head_offset = head * args.window_length;\n  let start_index = head_offset + args.start;\n\n  let values_local_a = args.values_offset + (start_index * args.head_dimension);\n  let value_intercepts_local_a = args.value_intercepts_offset + start_index;\n  let value_slopes_local_a = args.value_slopes_offset + start_index;\n  let values_local_b = args.values_offset + (head_offset * args.head_dimension);\n  let value_intercepts_local_b = args.value_intercepts_offset + head_offset;\n  let value_slopes_local_b = args.value_slopes_offset + head_offset;\n  let scores_local = args.scores_offset + (global_id.x * (args.length1 + args.length2));\n  let output_local = args.output_offset + (((args.tq * args.num_heads) + global_id.x) * args.head_dimension);\n\n  for (var i = 0u; i < args.head_dimension; i++) {\n    var tmp: f32 = 0.0;\n    for (var k = 0u; k < args.length1; k++) {\n      let value_idx = values_local_a + (k * args.head_dimension) + i;\n      let value_val = f32(extractBits(values[value_idx / 4], (i * 8u) % 32u, 8u));\n      tmp += scores[scores_local + k] * (value_intercepts[value_intercepts_local_a + k] + (value_slopes[value_slopes_local_a + k] * value_val));             \n    }\n    for (var k = 0u; k < args.length2; k++) {\n      let value_idx = values_local_b + (k * args.head_dimension) + i;\n      let value_val = f32(extractBits(values[value_idx / 4], (i * 8u) % 32u, 8u));\n      tmp += scores[scores_local + args.length1 + k] * (value_intercepts[value_intercepts_local_b + k] + (value_slopes[value_slopes_local_b + k] * value_val));      \n    }\n    output[output_local + i] = tmp;\n  }\n}\n\n".concat(emptyShader);
var loadAttentionFirShader = function loadAttentionFirShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention fir bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 4,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 5,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention fir pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention fir shader module",
    code: attentionFirShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention fir pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var UPDATE_KV_SHADER_NAME = "pv_picollm_attention_update_kv_shader";
var attentionUpdateKvShaderSource = "\nstruct argsStruct {\n  n: u32,\n  num_kv_heads: u32,\n  window_length: u32,\n  position: u32,\n  head_dimension: u32,\n  tf_offset: u32,\n  kv_offset: u32,\n  kv_intercepts_offset: u32,\n  kv_slopes_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> tf: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> kv: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> kv_intercepts: array<f32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> kv_slopes: array<f32>;\n          \noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {  \n  if (global_id.x >= args.num_kv_heads) {\n    return;\n  }\n  \n  for (var i = 0u; i < args.n; i++) {\n    let index = (global_id.x * args.window_length) + ((args.position + i) % args.window_length);\n    let tf_start = args.tf_offset + (((i * args.num_kv_heads) + global_id.x) * args.head_dimension);\n    let kv_start = args.kv_offset + ((index * args.head_dimension) / 4);\n    let kv_intercepts_start = args.kv_intercepts_offset + index;\n    let kv_slopes_start = args.kv_slopes_offset + index;\n    \n    var xmax = tf[tf_start];    \n    var xmin = tf[tf_start];    \n    \n    for (var j = 1u; j < args.head_dimension; j++) {\n      xmax = max(xmax, tf[tf_start + j]);\n      xmin = min(xmin, tf[tf_start + j]);\n    }\n\n    kv_intercepts[kv_intercepts_start] = xmin;\n    kv_slopes[kv_slopes_start] = f32(xmax - xmin) / 255.0;\n\n    for (var j = 0u; j < args.head_dimension; j++) {\n      let kv_idx = kv_start + (j / 4);\n      let kv_val = u32(round((tf[tf_start + j] - xmin) / kv_slopes[kv_slopes_start]));      \n      kv[kv_idx] = insertBits(kv[kv_idx], extractBits(kv_val, 0u, 8u), (j * 8u) % 32u, 8u);      \n    }\n  }\n}\n\n".concat(emptyShader);
var loadAttentionUpdateKvShader = function loadAttentionUpdateKvShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention update kv bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }, {
      binding: 4,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention update kv pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention update kv shader module",
    code: attentionUpdateKvShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention update kv pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var TRANSPOSE_QUERY_SHADER_NAME = "pv_picollm_attention_transpose_query_shader";
var attentionTransposeQueryShaderSource = "\nstruct argsStruct {\n  n: u32,\n  num_heads: u32,\n  head_dimension: u32,\n  tf_offset: u32,\n  hf_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> tf: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> hf: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(workgroup_id) workgroup_id : vec3<u32>,\n  @builtin(local_invocation_id) local_id : vec3<u32>\n) {\n\n  if (workgroup_id.x >= args.num_heads || workgroup_id.y >= args.n || local_id.x >= args.head_dimension) {\n    return;\n  }\n  \n  let tf_idx = args.tf_offset + (workgroup_id.y * args.num_heads * args.head_dimension) + (workgroup_id.x * args.head_dimension) + local_id.x; \n  let hf_idx = args.hf_offset + (workgroup_id.x * args.n * args.head_dimension) + (workgroup_id.y * args.head_dimension) + local_id.x;  \n  hf[hf_idx] = tf[tf_idx];\n}\n\n".concat(emptyShader);
var loadAttentionTransposeQueryShader = function loadAttentionTransposeQueryShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "attention transpose query bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "attention transpose query pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "attention transpose query shader module",
    code: attentionTransposeQueryShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "attention transpose query pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var attentionShaders = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PRECOMPUTE_ENCODING_SHADER_NAME, loadAttentionPrecomputeEncodingShader), ENCODE_ROPE_INTERLEAVED_SHADER_NAME, loadAttentionEncodeRopeInterleavedShader), ENCODE_SHADER_NAME, loadAttentionEncodeShader), DOT_PRODUCT_SHADER_NAME, loadAttentionDotProductShader), SOFTMAX_SHADER_NAME, loadAttentionSoftmaxShader), FIR_SHADER_NAME, loadAttentionFirShader), UPDATE_KV_SHADER_NAME, loadAttentionUpdateKvShader), TRANSPOSE_QUERY_SHADER_NAME, loadAttentionTransposeQueryShader);
var getPicollmAttentionWebGpuFunctions = function getPicollmAttentionWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmAttentionPrecomputeEncodingWebGpu = function pvPicollmAttentionPrecomputeEncodingWebGpu(objAddress, encodingAddress, encodingOffset, dimension, steps, theta, statusAddress) {
    var _gpuBuffers$get;
    objAddress = unsignedAddress(objAddress);
    encodingAddress = unsignedAddress(encodingAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[PRECOMPUTE_ENCODING_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var encodingBuffer = (_gpuBuffers$get = gpuBuffers.get(encodingAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!encodingBuffer) {
      console.error('Encoding buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(4 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention precompute encoding arg buffer");
    var buffer = new ArrayBuffer(argsBuffer.size);
    var view = new DataView(buffer);
    view.setUint32(0, dimension, true);
    view.setUint32(4, steps, true);
    view.setFloat32(8, theta, true);
    view.setUint32(12, encodingOffset / 4, true);
    obj.device.queue.writeBuffer(argsBuffer, 0, buffer);
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention precompute encoding bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: encodingBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, PRECOMPUTE_ENCODING_SHADER_NAME, steps);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAttentionEncodeWebGpu = function pvPicollmAttentionEncodeWebGpu(objAddress, isRopeInterleaved, xAddress, xOffset, n, numHeads, headDimension, ropeDimension, position, encodingAddress, encodingOffset, statusAddress) {
    var _gpuBuffers$get2, _gpuBuffers$get3;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    encodingAddress = unsignedAddress(encodingAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shaderName = isRopeInterleaved ? ENCODE_ROPE_INTERLEAVED_SHADER_NAME : ENCODE_SHADER_NAME;
    var shader = obj.shaders[shaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var encodingBuffer = (_gpuBuffers$get2 = gpuBuffers.get(encodingAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!encodingBuffer) {
      console.error('Encoding buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get3 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(7 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention encode arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, numHeads, headDimension, ropeDimension, position, encodingOffset / 4, xOffset / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention encode bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: encodingBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: xBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, shaderName, Math.min(n, PV_PICOLLM_WEBGPU_MAX_GRID_DIM), numHeads);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAttentionDotProductWebGpu = function pvPicollmAttentionDotProductWebGpu(objAddress, queryAddress, queryOffset, keysAddress, keysOffset, keyInterceptsAddress, keyInterceptsOffset, keySlopesAddress, keySlopesOffset, n, tq, headDimension, numHeads, numKvHeads, windowLength, start, norm, length1, length2, numKeys, scoresAddress, scoresOffset, statusAddress) {
    var _gpuBuffers$get4, _gpuBuffers$get5, _gpuBuffers$get6, _gpuBuffers$get7, _gpuBuffers$get8;
    objAddress = unsignedAddress(objAddress);
    queryAddress = unsignedAddress(queryAddress);
    keysAddress = unsignedAddress(keysAddress);
    keyInterceptsAddress = unsignedAddress(keyInterceptsAddress);
    keySlopesAddress = unsignedAddress(keySlopesAddress);
    scoresAddress = unsignedAddress(scoresAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[DOT_PRODUCT_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var queryBuffer = (_gpuBuffers$get4 = gpuBuffers.get(queryAddress)) === null || _gpuBuffers$get4 === void 0 ? void 0 : _gpuBuffers$get4.buffer;
    if (!queryBuffer) {
      console.error('query buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var keysBuffer = (_gpuBuffers$get5 = gpuBuffers.get(keysAddress)) === null || _gpuBuffers$get5 === void 0 ? void 0 : _gpuBuffers$get5.buffer;
    if (!keysBuffer) {
      console.error('keys buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var keyInterceptsBuffer = (_gpuBuffers$get6 = gpuBuffers.get(keyInterceptsAddress)) === null || _gpuBuffers$get6 === void 0 ? void 0 : _gpuBuffers$get6.buffer;
    if (!keyInterceptsBuffer) {
      console.error('key intercepts buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var keySlopesBuffer = (_gpuBuffers$get7 = gpuBuffers.get(keySlopesAddress)) === null || _gpuBuffers$get7 === void 0 ? void 0 : _gpuBuffers$get7.buffer;
    if (!keySlopesBuffer) {
      console.error('key slopes buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var scoresBuffer = (_gpuBuffers$get8 = gpuBuffers.get(scoresAddress)) === null || _gpuBuffers$get8 === void 0 ? void 0 : _gpuBuffers$get8.buffer;
    if (!scoresBuffer) {
      console.error('scores buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(15 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention dot product arg buffer");
    var buffer = new ArrayBuffer(argsBuffer.size);
    var view = new DataView(buffer);
    view.setUint32(0, n, true);
    view.setUint32(4, tq, true);
    view.setUint32(8, headDimension, true);
    view.setUint32(12, numHeads, true);
    view.setUint32(16, numKvHeads, true);
    view.setUint32(20, windowLength, true);
    view.setUint32(24, start, true);
    view.setFloat32(28, norm, true);
    view.setUint32(32, length1, true);
    view.setUint32(36, numKeys, true);
    view.setUint32(40, scoresOffset, true);
    view.setUint32(44, queryOffset / 4, true);
    view.setUint32(48, keysOffset, true);
    view.setUint32(52, keyInterceptsOffset / 4, true);
    view.setUint32(56, keySlopesOffset / 4, true);
    obj.device.queue.writeBuffer(argsBuffer, 0, buffer);
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention dot product bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: queryBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: keysBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: keyInterceptsBuffer
        }
      }, {
        binding: 4,
        resource: {
          buffer: keySlopesBuffer
        }
      }, {
        binding: 5,
        resource: {
          buffer: scoresBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, DOT_PRODUCT_SHADER_NAME, numHeads);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAttentionSoftmaxWebGpu = function pvPicollmAttentionSoftmaxWebGpu(objAddress, scoresAddress, scoresOffset, numHeads, numKeys, statusAddress) {
    var _gpuBuffers$get9;
    objAddress = unsignedAddress(objAddress);
    scoresAddress = unsignedAddress(scoresAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[SOFTMAX_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var scoresBuffer = (_gpuBuffers$get9 = gpuBuffers.get(scoresAddress)) === null || _gpuBuffers$get9 === void 0 ? void 0 : _gpuBuffers$get9.buffer;
    if (!scoresBuffer) {
      console.error('Scores buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(3 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention softmax arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([numHeads, numKeys, scoresOffset / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention softmax bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: scoresBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, SOFTMAX_SHADER_NAME, numHeads);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAttentionFirWebGpu = function pvPicollmAttentionFirWebGpu(objAddress, valuesAddress, valuesOffset, valueInterceptsAddress, valueInterceptsOffset, valueSlopesAddress, valueSlopesOffset, length1, length2, tq, headDimension, numHeads, numKvHeads, windowLength, start, scoresAddress, scoresOffset, outputAddress, outputOffset, statusAddress) {
    var _gpuBuffers$get10, _gpuBuffers$get11, _gpuBuffers$get12, _gpuBuffers$get13, _gpuBuffers$get14;
    objAddress = unsignedAddress(objAddress);
    valuesAddress = unsignedAddress(valuesAddress);
    valueInterceptsAddress = unsignedAddress(valueInterceptsAddress);
    valueSlopesAddress = unsignedAddress(valueSlopesAddress);
    scoresAddress = unsignedAddress(scoresAddress);
    outputAddress = unsignedAddress(outputAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[FIR_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var valuesBuffer = (_gpuBuffers$get10 = gpuBuffers.get(valuesAddress)) === null || _gpuBuffers$get10 === void 0 ? void 0 : _gpuBuffers$get10.buffer;
    if (!valuesBuffer) {
      console.error('values buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var valueInterceptsBuffer = (_gpuBuffers$get11 = gpuBuffers.get(valueInterceptsAddress)) === null || _gpuBuffers$get11 === void 0 ? void 0 : _gpuBuffers$get11.buffer;
    if (!valueInterceptsBuffer) {
      console.error('value intercepts buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var valueSlopesBuffer = (_gpuBuffers$get12 = gpuBuffers.get(valueSlopesAddress)) === null || _gpuBuffers$get12 === void 0 ? void 0 : _gpuBuffers$get12.buffer;
    if (!valueSlopesBuffer) {
      console.error('value slopes buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var scoresBuffer = (_gpuBuffers$get13 = gpuBuffers.get(scoresAddress)) === null || _gpuBuffers$get13 === void 0 ? void 0 : _gpuBuffers$get13.buffer;
    if (!scoresBuffer) {
      console.error('scores buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var outputBuffer = (_gpuBuffers$get14 = gpuBuffers.get(outputAddress)) === null || _gpuBuffers$get14 === void 0 ? void 0 : _gpuBuffers$get14.buffer;
    if (!outputBuffer) {
      console.error('output buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(13 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention fir arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([length1, length2, tq, headDimension, numHeads, numKvHeads, windowLength, start, valuesOffset, valueInterceptsOffset / 4, valueSlopesOffset / 4, scoresOffset / 4, outputOffset / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention fir bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: valuesBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: valueInterceptsBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: valueSlopesBuffer
        }
      }, {
        binding: 4,
        resource: {
          buffer: scoresBuffer
        }
      }, {
        binding: 5,
        resource: {
          buffer: outputBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, FIR_SHADER_NAME, numHeads);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAttentionUpdateKvWebGpu = function pvPicollmAttentionUpdateKvWebGpu(objAddress, tfAddress, tfOffset, n, kvAddress, kvOffset, kvInterceptsAddress, kvInterceptsOffset, kvSlopesAddress, kvSlopesOffset, numKvHeads, windowLength, position, headDimension, statusAddress) {
    var _gpuBuffers$get15, _gpuBuffers$get16, _gpuBuffers$get17, _gpuBuffers$get18;
    objAddress = unsignedAddress(objAddress);
    tfAddress = unsignedAddress(tfAddress);
    kvAddress = unsignedAddress(kvAddress);
    kvInterceptsAddress = unsignedAddress(kvInterceptsAddress);
    kvSlopesAddress = unsignedAddress(kvSlopesAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[UPDATE_KV_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var tfBuffer = (_gpuBuffers$get15 = gpuBuffers.get(tfAddress)) === null || _gpuBuffers$get15 === void 0 ? void 0 : _gpuBuffers$get15.buffer;
    if (!tfBuffer) {
      console.error('tf buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var kvBuffer = (_gpuBuffers$get16 = gpuBuffers.get(kvAddress)) === null || _gpuBuffers$get16 === void 0 ? void 0 : _gpuBuffers$get16.buffer;
    if (!kvBuffer) {
      console.error('KV buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var kvInterceptsBuffer = (_gpuBuffers$get17 = gpuBuffers.get(kvInterceptsAddress)) === null || _gpuBuffers$get17 === void 0 ? void 0 : _gpuBuffers$get17.buffer;
    if (!kvInterceptsBuffer) {
      console.error('KV intercept buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var kvSlopesBuffer = (_gpuBuffers$get18 = gpuBuffers.get(kvSlopesAddress)) === null || _gpuBuffers$get18 === void 0 ? void 0 : _gpuBuffers$get18.buffer;
    if (!kvSlopesBuffer) {
      console.error('KV slopes buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(9 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention update kv arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, numKvHeads, windowLength, position, headDimension, tfOffset / 4, kvOffset, kvInterceptsOffset / 4, kvSlopesOffset / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention update kv bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: tfBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: kvBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: kvInterceptsBuffer
        }
      }, {
        binding: 4,
        resource: {
          buffer: kvSlopesBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, UPDATE_KV_SHADER_NAME, numKvHeads);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAttentionTransposeQueryWebGpu = function pvPicollmAttentionTransposeQueryWebGpu(objAddress, tfAddress, tfOffset, hfAddress, hfOffset, n, numHeads, headDimension, statusAddress) {
    var _gpuBuffers$get19, _gpuBuffers$get20;
    objAddress = unsignedAddress(objAddress);
    tfAddress = unsignedAddress(tfAddress);
    hfAddress = unsignedAddress(hfAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[TRANSPOSE_QUERY_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var tfBuffer = (_gpuBuffers$get19 = gpuBuffers.get(tfAddress)) === null || _gpuBuffers$get19 === void 0 ? void 0 : _gpuBuffers$get19.buffer;
    if (!tfBuffer) {
      console.error('tf buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var hfBuffer = (_gpuBuffers$get20 = gpuBuffers.get(hfAddress)) === null || _gpuBuffers$get20 === void 0 ? void 0 : _gpuBuffers$get20.buffer;
    if (!hfBuffer) {
      console.error('hf buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(5 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "attention transpose query arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, numHeads, headDimension, tfOffset / 4, hfOffset / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "attention transpose query bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: tfBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: hfBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, TRANSPOSE_QUERY_SHADER_NAME, numHeads, n);
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_attention_precompute_encoding_webgpu_wasm: pvPicollmAttentionPrecomputeEncodingWebGpu,
    pv_picollm_attention_encode_webgpu_wasm: pvPicollmAttentionEncodeWebGpu,
    pv_picollm_attention_dot_product_webgpu_wasm: pvPicollmAttentionDotProductWebGpu,
    pv_picollm_attention_softmax_webgpu_wasm: pvPicollmAttentionSoftmaxWebGpu,
    pv_picollm_attention_fir_webgpu_wasm: pvPicollmAttentionFirWebGpu,
    pv_picollm_attention_update_kv_webgpu_wasm: pvPicollmAttentionUpdateKvWebGpu,
    pv_picollm_attention_transpose_query_webgpu_wasm: pvPicollmAttentionTransposeQueryWebGpu
  };
};

var SILU_SHADER_NAME = "pv_picollm_feed_forward_silu_shader";
var feedForwardSiluShaderSource = "\nstruct argsStruct {\n  n: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> x: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n  x[global_id.x] = x[global_id.x] / (1.0 + exp(-x[global_id.x]));\n}\n\n".concat(emptyShader);
var loadFeedForwardSiluShader = function loadFeedForwardSiluShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "ff silu bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "ff silu pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "ff silu shader module",
    code: feedForwardSiluShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "ff silu pipline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var GELU_SHADER_NAME = "pv_picollm_feed_forward_gelu_shader";
var feedForwardGeluShaderSource = "\nstruct argsStruct {\n  n: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> x: array<f32>;\n\nconst a1: f32 = 0.254829592;\nconst a2: f32 = -0.284496736;\nconst a3: f32 = 1.421413741;\nconst a4: f32 = -1.453152027;\nconst a5: f32 = 1.061405429;\nconst p: f32 = 0.3275911;\n\n// A&S formula 7.1.26\nfn erf(x: f32) -> f32 {    \n    var sign: f32 = 1.0;\n    if (x < 0) {\n        sign = -1.0;\n    }\n    var x_abs: f32 = abs(x);\n    \n    let t: f32 = 1.0 / fma(p, x_abs, 1.0);\n    let y: f32 = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * exp(-x_abs * x_abs);\n\n    return sign * y;\n}\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n  x[global_id.x] = 0.5 * x[global_id.x] * (1.0 + erf(x[global_id.x] * 0.7071067811865475));\n}\n\n".concat(emptyShader);
var loadFeedForwardGeluShader = function loadFeedForwardGeluShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "ff gelu bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "ff gelu pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "ff gelu shader module",
    code: feedForwardGeluShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "ff gelu pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var ALMOST_GELU_SHADER_NAME = "pv_picollm_feed_forward_almost_gelu_shader";
var feedForwardAlmostGeluShaderSource = "\nstruct argsStruct {\n  n: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> x: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n  x[global_id.x] = 0.5 * x[global_id.x] * (1 + tanh(0.7978845608028654 * (x[global_id.x] + (0.044715f * x[global_id.x] * x[global_id.x] * x[global_id.x]))));\n}\n\n".concat(emptyShader);
var loadFeedForwardAlmostGeluShader = function loadFeedForwardAlmostGeluShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "ff almost gelu bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "ff almost gelu pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "ff almost gelu shader module",
    code: feedForwardAlmostGeluShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "ff almost gelu pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var MULTIPLY_BUFFERS_SHADER_NAME = "pv_picollm_feed_forward_multiply_buffers_shader";
var feedForwardMultiplyBuffersShaderSource = "\nstruct argsStruct {\n  n: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n  y[global_id.x] *= x[global_id.x];\n}\n\n".concat(emptyShader);
var loadFeedForwardMultiplyBuffersShader = function loadFeedForwardMultiplyBuffersShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "ff multiply buffers bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "ff multiply buffers pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "ff multiply buffers shader module",
    code: feedForwardMultiplyBuffersShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "ff multiply buffers pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var feedForwardShaders = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, SILU_SHADER_NAME, loadFeedForwardSiluShader), GELU_SHADER_NAME, loadFeedForwardGeluShader), ALMOST_GELU_SHADER_NAME, loadFeedForwardAlmostGeluShader), MULTIPLY_BUFFERS_SHADER_NAME, loadFeedForwardMultiplyBuffersShader);
var getPicollmFeedForwardWebGpuFunctions = function getPicollmFeedForwardWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmFeedForwardSiluWebGpu = function pvPicollmFeedForwardSiluWebGpu(objAddress, n, xAddress, statusAddress) {
    var _gpuBuffers$get;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[SILU_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!xBuffer) {
      console.error('x buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "ff silu arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "ff silu bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, SILU_SHADER_NAME, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  var pvPicollmFeedForwardGeluWebGpu = function pvPicollmFeedForwardGeluWebGpu(objAddress, n, xAddress, statusAddress) {
    var _gpuBuffers$get2;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[GELU_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get2 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!xBuffer) {
      console.error('x buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "ff gelu arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "ff gelu bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, GELU_SHADER_NAME, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  var pvPicollmFeedForwardAlmostGeluWebGpu = function pvPicollmFeedForwardAlmostGeluWebGpu(objAddress, n, xAddress, statusAddress) {
    var _gpuBuffers$get3;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[ALMOST_GELU_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get3 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!xBuffer) {
      console.error('x buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "ff almost gelu arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "ff almost gelu bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, ALMOST_GELU_SHADER_NAME, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  var pvPicollmFeedForwardMultiplyBuffersWebGpu = function pvPicollmFeedForwardMultiplyBuffersWebGpu(objAddress, n, xAddress, yAddress, statusAddress) {
    var _gpuBuffers$get4, _gpuBuffers$get5;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[MULTIPLY_BUFFERS_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get4 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get4 === void 0 ? void 0 : _gpuBuffers$get4.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get5 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get5 === void 0 ? void 0 : _gpuBuffers$get5.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "ff multiply buffers arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "ff multiply buffers bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, MULTIPLY_BUFFERS_SHADER_NAME, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_feed_forward_silu_webgpu_wasm: pvPicollmFeedForwardSiluWebGpu,
    pv_picollm_feed_forward_gelu_webgpu_wasm: pvPicollmFeedForwardGeluWebGpu,
    pv_picollm_feed_forward_almost_gelu_webgpu_wasm: pvPicollmFeedForwardAlmostGeluWebGpu,
    pv_picollm_feed_forward_multiply_buffers_webgpu_wasm: pvPicollmFeedForwardMultiplyBuffersWebGpu
  };
};

var FORWARD_SHADER_NAME$1 = "pv_picollm_gate_forward_shader";
var gateForwardShaderSource = "\n\nstruct pv_picollm_gate_ix_t {\n  i: u32,\n  x: f32,\n}\n\n@group(0) @binding(0)\nvar<storage, read> y: array<f32>;\n\n@group(0) @binding(1)\nvar<storage, read_write> indices: array<u32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> weights: array<f32>;\n\noverride n: u32 = 0;\noverride k: u32 = 0;\noverride num_experts: u32 = 0;\n\noverride y_offset: u32 = 0;\noverride indices_offset: u32 = 0;\noverride weights_offset: u32 = 0;\n\nvar<workgroup> ixs: array<pv_picollm_gate_ix_t, num_experts>;\n  \noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(global_invocation_id) global_id : vec3<u32>\n) {\n  if (global_id.x >= n) {\n    return;\n  }\n  \n  var y_start: u32 = y_offset + global_id.x * num_experts;\n  for (var j = 0u; j < num_experts; j++) {\n      ixs[j].i = j;\n      ixs[j].x = y[y_start + j];\n  }\n\n  for (var i = 0u; i < num_experts - 1; i++) {\n    for (var j = 0u; j < num_experts - i - 1; j++) {\n      if (ixs[j].x < ixs[j + 1].x) {\n        let tmp = ixs[j];\n        ixs[j] = ixs[j + 1];\n        ixs[j + 1] = tmp;\n      }\n    }\n  }\n\n  for (var j = 0u; j < k; j++) {\n      indices[indices_offset + (global_id.x * k) + j] = ixs[j].i;\n      weights[weights_offset + (global_id.x * k) + j] = ixs[j].x;\n  }\n\n  var max_weight: f32 = weights[weights_offset + (global_id.x * k)];\n  for (var j = 1u; j < k; j++) {\n      max_weight = max(max_weight, weights[weights_offset + (global_id.x * k) + j]);\n  }\n\n  var sum_weight: f32 = 0.0;\n  for (var j = 0u; j < k; j++) {\n      weights[weights_offset + (global_id.x * k) + j] = exp(weights[weights_offset + (global_id.x * k) + j] - max_weight);\n      sum_weight += weights[weights_offset + (global_id.x * k) + j];\n  }\n\n  for (var j = 0u; j < k; j++) {\n      weights[weights_offset + (global_id.x * k) + j] /= sum_weight;\n  }\n}\n\n".concat(emptyShader);
var loadGateForwardShader = function loadGateForwardShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "gate forward bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "gate forward pipeline",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "gate forward shader module",
    code: gateForwardShaderSource
  });
  var computePipeline = device.createComputePipeline({
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        num_experts: 1
      }
    }
  });
  return {
    computePipeline: computePipeline,
    pipelineLayout: pipelineLayout,
    shaderModule: shaderModule
  };
};
var gateForwardShader = _defineProperty({}, FORWARD_SHADER_NAME$1, loadGateForwardShader);
var getPicollmGateWebGpuFunctions = function getPicollmGateWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmGateForwardWebGpu = function pvPicollmGateForwardWebGpu(objAddress, n, k, numExperts, yAddress, yOffset, indicesAddress, indicesOffset, weightsAddress, weightsOffset, statusAddress) {
    var _gpuBuffers$get, _gpuBuffers$get2, _gpuBuffers$get3;
    objAddress = unsignedAddress(objAddress);
    yAddress = unsignedAddress(yAddress);
    indicesAddress = unsignedAddress(indicesAddress);
    weightsAddress = unsignedAddress(weightsAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[FORWARD_SHADER_NAME$1];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    // TODO: create this in setup, once we add args to setup procedure
    var pipeline = obj.device.createComputePipeline({
      label: "gate forward pipeline",
      layout: shader.pipelineLayout,
      compute: {
        module: shader.shaderModule,
        entryPoint: shaderEntryPoint,
        constants: {
          n: n,
          k: k,
          num_experts: numExperts,
          y_offset: yOffset / 4,
          indices_offset: indicesOffset / 4,
          weights_offset: weightsOffset / 4
        }
      }
    });
    var yBuffer = (_gpuBuffers$get = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var indicesBuffer = (_gpuBuffers$get2 = gpuBuffers.get(indicesAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!indicesBuffer) {
      console.error('Indices buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var weightsBuffer = (_gpuBuffers$get3 = gpuBuffers.get(weightsAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!weightsBuffer) {
      console.error('Weights buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var bindGroup = obj.device.createBindGroup({
      label: "gate forward bind group",
      layout: pipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: yBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: indicesBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: weightsBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, pipeline, FORWARD_SHADER_NAME$1, n);
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_gate_forward_webgpu_wasm: pvPicollmGateForwardWebGpu
  };
};

var ADD_TO_BUFFER_SHADER_NAME$1 = "pv_picollm_moe_transformer_add_to_buffer_shader";
var moeTransformerAddToBufferShaderSource = "\nstruct argsStruct {\n  n: u32,  \n  x_offset: u32,\n  buffer_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> buffer: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n\n  buffer[args.buffer_offset + global_id.x] += x[args.x_offset + global_id.x];  \n}\n\n".concat(emptyShader);
var loadMoeTransformerAddToBufferShader = function loadMoeTransformerAddToBufferShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "moe transformer add to buffer bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "moe transformer add to buffer pipeline",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "moe transformer add to buffer shader module",
    code: moeTransformerAddToBufferShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "moe transformer add to buffer pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER_SHADER_NAME = "pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_shader";
var moeTransformerMultiplyWeightAndToBufferShaderSource = "\nstruct argsStruct {\n  n: u32,  \n  weights_index: u32,\n  y_index: u32,\n  weights_offset: u32,\n  x_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> weights: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n    \n  y[args.y_offset + args.y_index + global_id.x] += weights[args.weights_index] + x[args.x_offset + global_id.x];   \n}\n\n".concat(emptyShader);
var loadMoeTransformerMultiplyWeightAndAddToBufferShader = function loadMoeTransformerMultiplyWeightAndAddToBufferShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "moe transformer multiply weight and add to buffer bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "moe transformer multiply weight and add to buffer pipeline",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "moe transformer multiply weight and add to buffer shader module",
    code: moeTransformerMultiplyWeightAndToBufferShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "moe transformer multiply weight and add to buffer pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var ADD_BUFFERS_SHADER_NAME$1 = "pv_picollm_moe_transformer_add_buffers_shader";
var moeTransformerAddBuffersShaderSource = "\nstruct argsStruct {\n  n: u32,  \n  buffer1_offset: u32,\n  buffer2_offset: u32,\n  y_offset: u32,  \n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> buffer1: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> buffer2: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n    \n  y[args.y_offset + global_id.x] = buffer1[args.buffer1_offset + global_id.x] + buffer2[args.buffer2_offset + global_id.x];   \n}\n\n".concat(emptyShader);
var loadMoeTransformerAddBuffersShader = function loadMoeTransformerAddBuffersShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "moe transformer add buffers bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "moe transformer add buffers pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "moe transformer add buffers shader module",
    code: moeTransformerAddBuffersShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "moe transformer add buffers pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var moeTransformerForwardShaders = _defineProperty(_defineProperty(_defineProperty({}, ADD_TO_BUFFER_SHADER_NAME$1, loadMoeTransformerAddToBufferShader), MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER_SHADER_NAME, loadMoeTransformerMultiplyWeightAndAddToBufferShader), ADD_BUFFERS_SHADER_NAME$1, loadMoeTransformerAddBuffersShader);
var getPicollmMoeTransformerWebGpuFunctions = function getPicollmMoeTransformerWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmMoeTransformerAddToBufferWebGpu = function pvPicollmMoeTransformerAddToBufferWebGpu(objAddress, n, xAddress, xOffset, bufferAddress, bufferOffset, statusAddress) {
    var _gpuBuffers$get, _gpuBuffers$get2;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    bufferAddress = unsignedAddress(bufferAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[ADD_TO_BUFFER_SHADER_NAME$1];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!xBuffer) {
      console.error('x buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var bufferBuffer = (_gpuBuffers$get2 = gpuBuffers.get(bufferAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!bufferBuffer) {
      console.error('buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(3 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "moe transformer add to buffer arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, xOffset, bufferOffset]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "moe transformer add to buffer bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: bufferBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, ADD_TO_BUFFER_SHADER_NAME$1, n);
    setStatus(statusAddress, 0);
  };
  var pvPicollmMoeTransformerMultiplyWeightAndAddToBufferWebGpu = function pvPicollmMoeTransformerMultiplyWeightAndAddToBufferWebGpu(objAddress, n, weightsIndex, yIndex, weightsAddress, weightsOffset, xAddress, xOffset, yAddress, yOffset, statusAddress) {
    var _gpuBuffers$get3, _gpuBuffers$get4, _gpuBuffers$get5;
    objAddress = unsignedAddress(objAddress);
    weightsAddress = unsignedAddress(weightsAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var weightsBuffer = (_gpuBuffers$get3 = gpuBuffers.get(weightsAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!weightsBuffer) {
      console.error('weights has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get4 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get4 === void 0 ? void 0 : _gpuBuffers$get4.buffer;
    if (!xBuffer) {
      console.error('buffer2 has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get5 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get5 === void 0 ? void 0 : _gpuBuffers$get5.buffer;
    if (!yBuffer) {
      console.error('y has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(6 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "moe transformer multiply weight and add to buffer arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, weightsIndex, yIndex, weightsOffset, xOffset, yOffset]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "moe transformer multiply weight and add to buffer bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: weightsBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER_SHADER_NAME, n);
    setStatus(statusAddress, 0);
  };
  var pvPicollmMoeTransformerAddBuffersWebGpu = function pvPicollmMoeTransformerAddBuffersWebGpu(objAddress, n, buffer1Address, buffer1Offset, buffer2Address, buffer2Offset, yAddress, yOffset, statusAddress) {
    var _gpuBuffers$get6, _gpuBuffers$get7, _gpuBuffers$get8;
    objAddress = unsignedAddress(objAddress);
    buffer1Address = unsignedAddress(buffer1Address);
    buffer2Address = unsignedAddress(buffer2Address);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[ADD_BUFFERS_SHADER_NAME$1];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var buffer1Buffer = (_gpuBuffers$get6 = gpuBuffers.get(buffer1Address)) === null || _gpuBuffers$get6 === void 0 ? void 0 : _gpuBuffers$get6.buffer;
    if (!buffer1Buffer) {
      console.error('buffer1 has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var buffer2Buffer = (_gpuBuffers$get7 = gpuBuffers.get(buffer2Address)) === null || _gpuBuffers$get7 === void 0 ? void 0 : _gpuBuffers$get7.buffer;
    if (!buffer2Buffer) {
      console.error('buffer2 has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get8 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get8 === void 0 ? void 0 : _gpuBuffers$get8.buffer;
    if (!yBuffer) {
      console.error('y has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(4 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "moe transformer add buffers arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, buffer1Offset, buffer2Offset, yOffset]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "moe transformer add buffers bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: buffer1Buffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: buffer2Buffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, ADD_BUFFERS_SHADER_NAME$1, n);
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_moe_transformer_add_to_buffer_webgpu_wasm: pvPicollmMoeTransformerAddToBufferWebGpu,
    pv_picollm_moe_transformer_add_buffers_webgpu_wasm: pvPicollmMoeTransformerAddBuffersWebGpu,
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_webgpu_wasm: pvPicollmMoeTransformerMultiplyWeightAndAddToBufferWebGpu
  };
};

var sdataReduce = "\n  for (var s: u32 = workgroup_size_x / 2; s > 0; s >>= 1) {\n    if tid < s {\n        sdata[tid] += sdata[tid + s];\n    }\n    workgroupBarrier();\n  }\n";
var dividePadFunction = "\n  fn divide_pad(a: u32, b: u32) -> u32 { \n    return (a + b - 1) / b;\n  }\n";

var FORWARD_MULTI_BUFFER_SHADER_NAME$1 = "pv_picollm_norm_forward_multi_buffer_shader";
var FORWARD_SINGLE_BUFFER_SHADER_NAME$1 = "pv_picollm_norm_forward_single_buffer_shader";
var normForwardShaderSource = function normForwardShaderSource(isMulti) {
  return "\nstruct argsStruct {\n  n: u32,\n  dimension: u32,\n  remainder: u32,\n  remainder_start: u32, \n  eps: f32,  \n  x_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> weight: array<f32>;\n\n".concat(isMulti ? "\n@group(0) @binding(2)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(3) \nvar<storage, read_write> y: array<f32>;\n" : "    \n@group(0) @binding(2)\nvar<storage, read_write> x: array<f32>;\n", "\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\nvar<workgroup> sdata: array<vec4<f32>, workgroup_size_x>;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(local_invocation_id) local_id: vec3<u32>,\n  @builtin(workgroup_id) workgroup_id: vec3<u32>\n) {\n  let tid = local_id.x;\n  let m = workgroup_id.x;\n  let block_size = workgroup_size_x;\n  \n  var power_vec: vec4<f32>;\n  let x_start: u32 = args.x_offset + (m * args.dimension);\n  let skip = tid * 4;\n  let shift = (block_size * 4);\n  for (var j = 0u; j + skip < args.remainder_start; j += shift) {\n    let local_index = x_start + j + skip; \n\n    let x_vec = vec4(\n      x[local_index],\n      x[local_index + 1],\n      x[local_index + 2],\n      x[local_index + 3]);\n    \n    power_vec += x_vec * x_vec; \n  }  \n  \n  if (tid == 0 && args.remainder > 0) {\n    var remainder_vec = vec4<f32>(0.0, 0.0, 0.0, 0.0);\n    let x_idx = x_start + args.remainder_start;\n    for (var j = 0u; j < args.remainder; j++) {       \n      remainder_vec[j] = x[x_idx + j];\n    }    \n    power_vec += remainder_vec * remainder_vec;\n  }\n  \n  sdata[tid] = power_vec;\n  workgroupBarrier();\n\n  ").concat(sdataReduce, "\n  \n  let power = sdata[0].x + sdata[0].y + sdata[0].z + sdata[0].w;\n  let norm: vec4<f32> = vec4(1.0 / sqrt((power / f32(args.dimension)) + args.eps));\n  \n  let y_start: u32 = args.y_offset + (m * args.dimension);\n  for (var j = 0u; j + skip < args.remainder_start; j += shift) {\n    let local_index = j + skip;\n    let x_idx = x_start + local_index;\n    let x_vec = vec4(\n      x[x_idx],\n      x[x_idx + 1],\n      x[x_idx + 2],\n      x[x_idx + 3]);\n          \n    let weight_vec = vec4(\n      weight[local_index],\n      weight[local_index + 1],\n      weight[local_index + 2],\n      weight[local_index + 3]);\n    let y_vec = x_vec * norm * weight_vec;\n    \n    let y_idx = y_start + local_index;\n").concat(isMulti ? " \n    y[y_idx] = y_vec.x;\n    y[y_idx + 1] = y_vec.y;\n    y[y_idx + 2] = y_vec.z;\n    y[y_idx + 3] = y_vec.w;\n" : "    \n    x[y_idx] = y_vec.x;\n    x[y_idx + 1] = y_vec.y;\n    x[y_idx + 2] = y_vec.z;\n    x[y_idx + 3] = y_vec.w;\n", "   \n  }\n  \n  if (tid == 0 && args.remainder > 0) {\n    let x_idx = x_start + args.remainder_start;\n    let weight_idx = args.remainder_start;    \n    let y_idx = y_start + args.remainder_start;\n    for (var j = 0u; j < args.remainder; j++) {\n").concat(isMulti ? "    \n      y[y_idx + j] = x[x_idx + j] * norm[j] * weight[weight_idx + j];\n" : "    \n      x[y_idx + j] = x[x_idx + j] * norm[j] * weight[weight_idx + j];\n", " \n    }    \n  }\n}\n\n").concat(emptyShader);
};
var loadNormForwardShader = function loadNormForwardShader(device, isMulti) {
  var entries = [{
    binding: 0,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'uniform'
    }
  }, {
    binding: 1,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }];
  if (isMulti) {
    entries.push({
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    });
    entries.push({
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    });
  } else {
    entries.push({
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    });
  }
  var bindGroupLayout = device.createBindGroupLayout({
    label: "norm forward ".concat(isMulti ? "multi" : "single", " buffer bind group layout"),
    entries: entries
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "norm forward ".concat(isMulti ? "multi" : "single", " buffer pipeline layout"),
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "norm forward ".concat(isMulti ? "multi" : "single", " buffer shader module"),
    code: normForwardShaderSource(isMulti)
  });
  var computePipeline = device.createComputePipeline({
    label: "norm forward ".concat(isMulti ? "multi" : "single", " buffer pipeline"),
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var normForwardShader = _defineProperty(_defineProperty({}, FORWARD_SINGLE_BUFFER_SHADER_NAME$1, function (device) {
  return loadNormForwardShader(device, false);
}), FORWARD_MULTI_BUFFER_SHADER_NAME$1, function (device) {
  return loadNormForwardShader(device, true);
});
var getPicollmNormWebGpuFunctions = function getPicollmNormWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmNormForwardWebGpu = function pvPicollmNormForwardWebGpu(objAddress, dimension, eps, weightAddress, n, xOffset, xAddress, yOffset, yAddress, statusAddress) {
    var _gpuBuffers$get, _gpuBuffers$get2;
    objAddress = unsignedAddress(objAddress);
    weightAddress = unsignedAddress(weightAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shaderName = xAddress === yAddress ? FORWARD_SINGLE_BUFFER_SHADER_NAME$1 : FORWARD_MULTI_BUFFER_SHADER_NAME$1;
    var shader = obj.shaders[shaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var weightBuffer = (_gpuBuffers$get = gpuBuffers.get(weightAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!weightBuffer) {
      console.error('Weight buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get2 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var remainder = dimension % 4;
    var remainder_start = dimension - remainder;
    var argsBuffer = obj.getBuffer(7 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "norm forward multi buffer arg buffer");
    var buffer = new ArrayBuffer(argsBuffer.size);
    var view = new DataView(buffer);
    view.setUint32(0, n, true);
    view.setUint32(4, dimension, true);
    view.setUint32(8, remainder, true);
    view.setUint32(12, remainder_start, true);
    view.setFloat32(16, eps, true);
    view.setUint32(20, xOffset / 4, true);
    view.setUint32(24, yOffset / 4, true);
    obj.device.queue.writeBuffer(argsBuffer, 0, buffer);
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var entries = [{
      binding: 0,
      resource: {
        buffer: argsBuffer
      }
    }, {
      binding: 1,
      resource: {
        buffer: weightBuffer
      }
    }];
    if (xAddress === yAddress) {
      entries.push({
        binding: 2,
        resource: {
          buffer: yBuffer
        }
      });
    } else {
      var _gpuBuffers$get3;
      var xBuffer = (_gpuBuffers$get3 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
      if (!xBuffer) {
        console.error('X buffer has not been allocated');
        setStatus(statusAddress, -1);
        return;
      }
      entries.push({
        binding: 2,
        resource: {
          buffer: xBuffer
        }
      });
      entries.push({
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      });
    }
    var bindGroup = obj.device.createBindGroup({
      label: "norm forward ".concat(xAddress === yAddress ? "single" : "multi", " buffer bind group"),
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: entries
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, shaderName, n);
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_norm_forward_webgpu_wasm: pvPicollmNormForwardWebGpu
  };
};

var FORWARD_MULTI_BUFFER_SHADER_NAME = "pv_picollm_norm_layer_forward_multi_buffer_shader";
var normLayerForwardMultiBufferShaderSource = "\nstruct argsStruct {\n  n: u32,\n  dimension: u32,\n  eps: f32,\n  weight_offset: u32,\n  bias_offset: u32,\n  x_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> weight: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> bias: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n  \n  let x_start: u32 = args.x_offset + (global_id.x * args.dimension);\n\n  var mean: f32 = 0.0;\n  for (var j = 0u; j < args.dimension; j++) {\n      mean += x[x_start + j];\n  }\n  mean /= f32(args.dimension);\n\n  var mean2: f32 = 0.0;\n  for (var j = 0u; j < args.dimension; j++) {\n      mean2 += (x[x_start + j] - mean) * (x[x_start + j] - mean);\n  }\n  mean2 /= f32(args.dimension);\n\n  var norm: f32 = 1.0 / sqrt(mean2 + args.eps);\n\n  var y_start = args.y_offset + (global_id.x * args.dimension);\n  for (var j = 0u; j < args.dimension; j++) {\n    y[y_start + j] = ((x[x_start + j] - mean) * norm * weight[args.weight_offset + j]) + bias[args.bias_offset + j];\n  }\n}\n\n".concat(emptyShader);
var loadNormLayerForwardMultiBufferShader = function loadNormLayerForwardMultiBufferShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "norm layer forward multi buffer bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 4,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "norm layer forward multi buffer pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "norm layer forward multi buffer shader module",
    code: normLayerForwardMultiBufferShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "norm layer forward multi buffer pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var FORWARD_SINGLE_BUFFER_SHADER_NAME = "pv_picollm_norm_layer_forward_single_buffer_shader";
var normLayerForwardSingleBufferShaderSource = "\nstruct argsStruct {\n  n: u32,\n  dimension: u32,\n  eps: f32,\n  weight_offset: u32,\n  bias_offset: u32,\n  x_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> weight: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> bias: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n  \n  let x_start: u32 = args.x_offset + (global_id.x * args.dimension);\n\n  var mean: f32 = 0.0;\n  for (var j = 0u; j < args.dimension; j++) {\n      mean += y[x_start + j];\n  }\n  mean /= f32(args.dimension);\n\n  var mean2: f32 = 0.0;\n  for (var j = 0u; j < args.dimension; j++) {\n      mean2 += (y[x_start + j] - mean) * (y[x_start + j] - mean);\n  }\n  mean2 /= f32(args.dimension);\n\n  var norm: f32 = 1.0 / sqrt(mean2 + args.eps);\n\n  var y_start = args.y_offset + (global_id.x * args.dimension);\n  for (var j = 0u; j < args.dimension; j++) {\n    y[y_start + j] = ((y[x_start + j] - mean) * norm * weight[args.weight_offset + j]) + bias[args.bias_offset + j];\n  }\n}\n\n".concat(emptyShader);
var loadNormLayerForwardSingleBufferShader = function loadNormLayerForwardSingleBufferShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "norm layer forward single buffer bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "norm layer forward single buffer pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "norm layer forward single buffer shader module",
    code: normLayerForwardSingleBufferShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "norm layer forward single buffer pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var normLayerForwardShader = _defineProperty(_defineProperty({}, FORWARD_SINGLE_BUFFER_SHADER_NAME, loadNormLayerForwardSingleBufferShader), FORWARD_MULTI_BUFFER_SHADER_NAME, loadNormLayerForwardMultiBufferShader);
var getPicollmNormLayerWebGpuFunctions = function getPicollmNormLayerWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmNormLayerForwardWebGpu = function pvPicollmNormLayerForwardWebGpu(objAddress, dimension, eps, weightAddress, weightOffset, biasAddress, biasOffset, n, xAddress, xOffset, yAddress, yOffset, statusAddress) {
    var _gpuBuffers$get, _gpuBuffers$get2, _gpuBuffers$get3;
    objAddress = unsignedAddress(objAddress);
    weightAddress = unsignedAddress(weightAddress);
    biasAddress = unsignedAddress(biasAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shaderName = xAddress === yAddress ? FORWARD_SINGLE_BUFFER_SHADER_NAME : FORWARD_MULTI_BUFFER_SHADER_NAME;
    var shader = obj.shaders[shaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var weightBuffer = (_gpuBuffers$get = gpuBuffers.get(weightAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!weightBuffer) {
      console.error('weight buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var biasBuffer = (_gpuBuffers$get2 = gpuBuffers.get(biasAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!biasBuffer) {
      console.error('bias buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get3 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(7 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "norm layer forward multi buffer arg buffer");
    var buffer = new ArrayBuffer(argsBuffer.size);
    var view = new DataView(buffer);
    view.setUint32(0, n, true);
    view.setUint32(4, dimension, true);
    view.setFloat32(8, eps, true);
    view.setUint32(12, weightOffset / 4, true);
    view.setUint32(16, biasOffset / 4, true);
    view.setUint32(20, xOffset / 4, true);
    view.setUint32(24, yOffset / 4, true);
    obj.device.queue.writeBuffer(argsBuffer, 0, buffer);
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup;
    if (xAddress === yAddress) {
      bindGroup = obj.device.createBindGroup({
        label: "norm layer forward single buffer bind group",
        layout: shader.computePipeline.getBindGroupLayout(0),
        entries: [{
          binding: 0,
          resource: {
            buffer: argsBuffer
          }
        }, {
          binding: 1,
          resource: {
            buffer: weightBuffer
          }
        }, {
          binding: 2,
          resource: {
            buffer: biasBuffer
          }
        }, {
          binding: 3,
          resource: {
            buffer: yBuffer
          }
        }]
      });
    } else {
      var _gpuBuffers$get4;
      var xBuffer = (_gpuBuffers$get4 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get4 === void 0 ? void 0 : _gpuBuffers$get4.buffer;
      if (!xBuffer) {
        console.error('X buffer has not been allocated');
        setStatus(statusAddress, -1);
        return;
      }
      bindGroup = obj.device.createBindGroup({
        label: "norm layer forward multi buffer bind group",
        layout: shader.computePipeline.getBindGroupLayout(0),
        entries: [{
          binding: 0,
          resource: {
            buffer: argsBuffer
          }
        }, {
          binding: 1,
          resource: {
            buffer: weightBuffer
          }
        }, {
          binding: 2,
          resource: {
            buffer: biasBuffer
          }
        }, {
          binding: 3,
          resource: {
            buffer: xBuffer
          }
        }, {
          binding: 4,
          resource: {
            buffer: yBuffer
          }
        }]
      });
    }
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, shaderName, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_norm_layer_forward_webgpu_wasm: pvPicollmNormLayerForwardWebGpu
  };
};

var ADD_TO_BUFFER_SHADER_NAME = "pv_picollm_transformer_add_to_buffer_shader";
var transformerAddToBufferShaderSource = "\nstruct argsStruct {\n  n: u32,\n  x_offset: u32,\n  buffer_offset: u32,  \n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> buffer: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n    \n  buffer[args.buffer_offset + global_id.x] += x[args.x_offset + global_id.x];  \n}\n\n".concat(emptyShader);
var loadTransformerAddToBufferShader = function loadTransformerAddToBufferShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "transformer add to buffer bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "transformer add to buffer pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "transformer add to buffer shader module",
    code: transformerAddToBufferShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "transformer add to buffer compute",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var ADD_BUFFERS_SHADER_NAME = "pv_picollm_transformer_add_buffers_shader";
var transformerAddBuffersShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  buffer1_offset: u32,\n  buffer2_offset: u32,\n  y_offset: u32,  \n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> buffer1: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> buffer2: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n) {\n    return;\n  }\n    \n  y[args.y_offset + global_id.x] = buffer1[args.buffer1_offset + global_id.x] + buffer2[args.buffer2_offset + global_id.x];   \n}\n\n".concat(emptyShader);
var loadTransformerAddBuffersShader = function loadTransformerAddBuffersShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "transformer add buffers bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "transformer add buffers pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "transformer add buffers shader module",
    code: transformerAddBuffersShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "transformer add buffers pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var transformerForwardShaders = _defineProperty(_defineProperty({}, ADD_TO_BUFFER_SHADER_NAME, loadTransformerAddToBufferShader), ADD_BUFFERS_SHADER_NAME, loadTransformerAddBuffersShader);
var getPicollmTransformerWebGpuFunctions = function getPicollmTransformerWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmTransformerAddToBufferWebGpu = function pvPicollmTransformerAddToBufferWebGpu(objAddress, n, xAddress, xOffset, bufferAddress, bufferOffset, statusAddress) {
    var _gpuBuffers$get, _gpuBuffers$get2;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    bufferAddress = unsignedAddress(bufferAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[ADD_TO_BUFFER_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!xBuffer) {
      console.error('x buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var bufferBuffer = (_gpuBuffers$get2 = gpuBuffers.get(bufferAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!bufferBuffer) {
      console.error('buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(3 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "transformer add to buffer arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, xOffset, bufferOffset]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "transformer add to buffer bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: bufferBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, ADD_TO_BUFFER_SHADER_NAME, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  var pvPicollmTransformerAddBuffersWebGpu = function pvPicollmTransformerAddBuffersWebGpu(objAddress, n, buffer1Address, buffer1Offset, buffer2Address, buffer2Offset, yAddress, yOffset, statusAddress) {
    var _gpuBuffers$get3, _gpuBuffers$get4, _gpuBuffers$get5;
    objAddress = unsignedAddress(objAddress);
    buffer1Address = unsignedAddress(buffer1Address);
    buffer2Address = unsignedAddress(buffer2Address);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[ADD_BUFFERS_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var buffer1Buffer = (_gpuBuffers$get3 = gpuBuffers.get(buffer1Address)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!buffer1Buffer) {
      console.error('buffer1 has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var buffer2Buffer = (_gpuBuffers$get4 = gpuBuffers.get(buffer2Address)) === null || _gpuBuffers$get4 === void 0 ? void 0 : _gpuBuffers$get4.buffer;
    if (!buffer2Buffer) {
      console.error('buffer2 has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get5 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get5 === void 0 ? void 0 : _gpuBuffers$get5.buffer;
    if (!yBuffer) {
      console.error('y has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(4 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "transformer add buffers arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, buffer1Offset, buffer2Offset, yOffset]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "transformer add buffers bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: buffer1Buffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: buffer2Buffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, ADD_BUFFERS_SHADER_NAME, Math.ceil(n / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_transformer_add_to_buffer_webgpu_wasm: pvPicollmTransformerAddToBufferWebGpu,
    pv_picollm_transformer_add_buffers_webgpu_wasm: pvPicollmTransformerAddBuffersWebGpu
  };
};

var FORWARD_SHADER_NAME = "pv_picollm_weight_float_forward_shader";
var weightFloatForwardShaderSource = "\n\nstruct argsStruct {\n  nr: u32,\n  nc: u32,\n  w_offset: u32,\n  x_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> w: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(workgroup_id) workgroup_id : vec3<u32>,\n  @builtin(local_invocation_id) local_id : vec3<u32>\n) {\n  if (local_id.x >= args.nr) {\n    return;\n  }\n  let x_start: u32 = args.x_offset + (workgroup_id.x * args.nc);\n  let y_idx: u32 = local_id.x + args.y_offset + (workgroup_id.x * args.nr);\n  \n  let w_start: u32 = args.w_offset + (local_id.x * args.nc);\n  for (var j = 0u; j < args.nc; j++) {\n    y[y_idx] += w[w_start + j] * x[x_start + j]; \n  }\n}\n\n".concat(emptyShader);
var loadWeightFloatForwardShader = function loadWeightFloatForwardShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight float forward bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight float forward pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight float forward shader module",
    code: weightFloatForwardShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "weight float forward pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var weightFloatForwardShader = _defineProperty({}, FORWARD_SHADER_NAME, loadWeightFloatForwardShader);
var getPicollmWeightFloatWebGpuFunctions = function getPicollmWeightFloatWebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmWeightFloatForwardWebGpu = function pvPicollmWeightFloatForwardWebGpu(objAddress, n, nc, nr, wOffset, wAddress, xOffset, xAddress, yOffset, yAddress, statusAddress) {
    var _gpuBuffers$get, _gpuBuffers$get2, _gpuBuffers$get3;
    objAddress = unsignedAddress(objAddress);
    wAddress = unsignedAddress(wAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[FORWARD_SHADER_NAME];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var wBuffer = (_gpuBuffers$get = gpuBuffers.get(wAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!wBuffer) {
      console.error('W buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get2 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get3 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(5 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight float forward arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([nr, nc, wOffset, xOffset, yOffset]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight float forward bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: wBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, FORWARD_SHADER_NAME, n);
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_weight_float_forward_webgpu_wasm: pvPicollmWeightFloatForwardWebGpu
  };
};

var rowsPerBlock = 16;
var columnsPerBlock = 8;
var preprocessDim = 16;
var weightBlockSize = 256;
var unpackBlock128BitDepth3 = "\nvar<private> unpacked: array<u32, 128>;\n\nfn unpack_block_128_bit_depth_3(packed_offset: u32) {\n  let val_0 = blocks[packed_offset]; \n  unpacked[0] = extractBits(val_0, 0u, 3u);\n  unpacked[1] = extractBits(val_0, 3u, 3u);\n  unpacked[2] = extractBits(val_0, 6u, 3u);\n  unpacked[3] = extractBits(val_0, 9u, 3u);\n  unpacked[4] = extractBits(val_0, 12u, 3u);\n  unpacked[5] = extractBits(val_0, 15u, 3u);\n  unpacked[6] = extractBits(val_0, 18u, 3u);\n  unpacked[7] = extractBits(val_0, 21u, 3u);\n  unpacked[8] = extractBits(val_0, 24u, 3u);\n  unpacked[9] = extractBits(val_0, 27u, 3u);\n  unpacked[10] = extractBits(val_0, 30u, 2u);\n  \n  let val_1 = blocks[packed_offset + 1];\n  unpacked[10] = insertBits(unpacked[10], extractBits(val_1, 0u, 1u), 2u, 1u);\n  unpacked[11] = extractBits(val_1, 1u, 3u);\n  unpacked[12] = extractBits(val_1, 4u, 3u);\n  unpacked[13] = extractBits(val_1, 7u, 3u);\n  unpacked[14] = extractBits(val_1, 10u, 3u);\n  unpacked[15] = extractBits(val_1, 13u, 3u);\n  unpacked[16] = extractBits(val_1, 16u, 3u);\n  unpacked[17] = extractBits(val_1, 19u, 3u);\n  unpacked[18] = extractBits(val_1, 22u, 3u);\n  unpacked[19] = extractBits(val_1, 25u, 3u);\n  unpacked[20] = extractBits(val_1, 28u, 3u);\n  unpacked[21] = extractBits(val_1, 31u, 1u);\n  \n  let val_2 = blocks[packed_offset + 2];\n  unpacked[21] = insertBits(unpacked[21], extractBits(val_2, 0u, 2u), 1u, 2u); \n  unpacked[22] = extractBits(val_2, 2u, 3u);\n  unpacked[23] = extractBits(val_2, 5u, 3u);\n  unpacked[24] = extractBits(val_2, 8u, 3u);\n  unpacked[25] = extractBits(val_2, 11u, 3u);\n  unpacked[26] = extractBits(val_2, 14u, 3u);\n  unpacked[27] = extractBits(val_2, 17u, 3u);\n  unpacked[28] = extractBits(val_2, 20u, 3u);\n  unpacked[29] = extractBits(val_2, 23u, 3u);\n  unpacked[30] = extractBits(val_2, 26u, 3u);\n  unpacked[31] = extractBits(val_2, 29u, 3u);\n  \n  let val_3 = blocks[packed_offset + 3]; \n  unpacked[32] = extractBits(val_3, 0u, 3u);\n  unpacked[33] = extractBits(val_3, 3u, 3u);\n  unpacked[34] = extractBits(val_3, 6u, 3u);\n  unpacked[35] = extractBits(val_3, 9u, 3u);\n  unpacked[36] = extractBits(val_3, 12u, 3u);\n  unpacked[37] = extractBits(val_3, 15u, 3u);\n  unpacked[38] = extractBits(val_3, 18u, 3u);\n  unpacked[39] = extractBits(val_3, 21u, 3u);\n  unpacked[40] = extractBits(val_3, 24u, 3u);\n  unpacked[41] = extractBits(val_3, 27u, 3u);\n  unpacked[42] = extractBits(val_3, 30u, 2u);\n  \n  let val_4 = blocks[packed_offset + 4];\n  unpacked[42] = insertBits(unpacked[42], extractBits(val_4, 0u, 1u), 2u, 1u);\n  unpacked[43] = extractBits(val_4, 1u, 3u);\n  unpacked[44] = extractBits(val_4, 4u, 3u);\n  unpacked[45] = extractBits(val_4, 7u, 3u);\n  unpacked[46] = extractBits(val_4, 10u, 3u);\n  unpacked[47] = extractBits(val_4, 13u, 3u);\n  unpacked[48] = extractBits(val_4, 16u, 3u);\n  unpacked[49] = extractBits(val_4, 19u, 3u);\n  unpacked[50] = extractBits(val_4, 22u, 3u);\n  unpacked[51] = extractBits(val_4, 25u, 3u);\n  unpacked[52] = extractBits(val_4, 28u, 3u);\n  unpacked[53] = extractBits(val_4, 31u, 1u);\n  \n  let val_5 = blocks[packed_offset + 5];\n  unpacked[53] = insertBits(unpacked[53], extractBits(val_5, 0u, 2u), 1u, 2u); \n  unpacked[54] = extractBits(val_5, 2u, 3u);\n  unpacked[55] = extractBits(val_5, 5u, 3u);\n  unpacked[56] = extractBits(val_5, 8u, 3u);\n  unpacked[57] = extractBits(val_5, 11u, 3u);\n  unpacked[58] = extractBits(val_5, 14u, 3u);\n  unpacked[59] = extractBits(val_5, 17u, 3u);\n  unpacked[60] = extractBits(val_5, 20u, 3u);\n  unpacked[61] = extractBits(val_5, 23u, 3u);\n  unpacked[62] = extractBits(val_5, 26u, 3u);\n  unpacked[63] = extractBits(val_5, 29u, 3u);\n  \n  let val_6 = blocks[packed_offset + 6];\n  unpacked[64] = extractBits(val_6, 0u, 3u);\n  unpacked[65] = extractBits(val_6, 3u, 3u);\n  unpacked[66] = extractBits(val_6, 6u, 3u);\n  unpacked[67] = extractBits(val_6, 9u, 3u);\n  unpacked[68] = extractBits(val_6, 12u, 3u);\n  unpacked[69] = extractBits(val_6, 15u, 3u);\n  unpacked[70] = extractBits(val_6, 18u, 3u);\n  unpacked[71] = extractBits(val_6, 21u, 3u);\n  unpacked[72] = extractBits(val_6, 24u, 3u);\n  unpacked[73] = extractBits(val_6, 27u, 3u);\n  unpacked[74] = extractBits(val_6, 30u, 2u);\n  \n  let val_7 = blocks[packed_offset + 7];\n  unpacked[74] = insertBits(unpacked[74], extractBits(val_7, 0u, 1u), 2u, 1u);\n  unpacked[75] = extractBits(val_7, 1u, 3u);\n  unpacked[76] = extractBits(val_7, 4u, 3u);\n  unpacked[77] = extractBits(val_7, 7u, 3u);\n  unpacked[78] = extractBits(val_7, 10u, 3u);\n  unpacked[79] = extractBits(val_7, 13u, 3u);\n  unpacked[80] = extractBits(val_7, 16u, 3u);\n  unpacked[81] = extractBits(val_7, 19u, 3u);\n  unpacked[82] = extractBits(val_7, 22u, 3u);\n  unpacked[83] = extractBits(val_7, 25u, 3u);\n  unpacked[84] = extractBits(val_7, 28u, 3u);\n  unpacked[85] = extractBits(val_7, 31u, 1u);\n  \n  let val_8 = blocks[packed_offset + 8];\n  unpacked[85] = insertBits(unpacked[85], extractBits(val_8, 0u, 2u), 1u, 2u); \n  unpacked[86] = extractBits(val_8, 2u, 3u);\n  unpacked[87] = extractBits(val_8, 5u, 3u);\n  unpacked[88] = extractBits(val_8, 8u, 3u);\n  unpacked[89] = extractBits(val_8, 11u, 3u);\n  unpacked[90] = extractBits(val_8, 14u, 3u);\n  unpacked[91] = extractBits(val_8, 17u, 3u);\n  unpacked[92] = extractBits(val_8, 20u, 3u);\n  unpacked[93] = extractBits(val_8, 23u, 3u);\n  unpacked[94] = extractBits(val_8, 26u, 3u);\n  unpacked[95] = extractBits(val_8, 29u, 3u);\n  \n  let val_9 = blocks[packed_offset + 9];\n  unpacked[96] = extractBits(val_9, 0u, 3u);\n  unpacked[97] = extractBits(val_9, 3u, 3u);\n  unpacked[98] = extractBits(val_9, 6u, 3u);\n  unpacked[99] = extractBits(val_9, 9u, 3u);\n  unpacked[100] = extractBits(val_9, 12u, 3u);\n  unpacked[101] = extractBits(val_9, 15u, 3u);\n  unpacked[102] = extractBits(val_9, 18u, 3u);\n  unpacked[103] = extractBits(val_9, 21u, 3u);\n  unpacked[104] = extractBits(val_9, 24u, 3u);\n  unpacked[105] = extractBits(val_9, 27u, 3u);\n  unpacked[106] = extractBits(val_9, 30u, 2u);\n  \n  let val_10 = blocks[packed_offset + 10];\n  unpacked[106] = insertBits(unpacked[106], extractBits(val_10, 0u, 1u), 2u, 1u);\n  unpacked[107] = extractBits(val_10, 1u, 3u);\n  unpacked[108] = extractBits(val_10, 4u, 3u);\n  unpacked[109] = extractBits(val_10, 7u, 3u);\n  unpacked[110] = extractBits(val_10, 10u, 3u);\n  unpacked[111] = extractBits(val_10, 13u, 3u);\n  unpacked[112] = extractBits(val_10, 16u, 3u);\n  unpacked[113] = extractBits(val_10, 19u, 3u);\n  unpacked[114] = extractBits(val_10, 22u, 3u);\n  unpacked[115] = extractBits(val_10, 25u, 3u);\n  unpacked[116] = extractBits(val_10, 28u, 3u);\n  unpacked[117] = extractBits(val_10, 31u, 1u);\n  \n  let val_11 = blocks[packed_offset + 11];\n  unpacked[117] = insertBits(unpacked[117], extractBits(val_11, 0u, 2u), 1u, 2u); \n  unpacked[118] = extractBits(val_11, 2u, 3u);\n  unpacked[119] = extractBits(val_11, 5u, 3u);\n  unpacked[120] = extractBits(val_11, 8u, 3u);\n  unpacked[121] = extractBits(val_11, 11u, 3u);\n  unpacked[122] = extractBits(val_11, 14u, 3u);\n  unpacked[123] = extractBits(val_11, 17u, 3u);\n  unpacked[124] = extractBits(val_11, 20u, 3u);\n  unpacked[125] = extractBits(val_11, 23u, 3u);\n  unpacked[126] = extractBits(val_11, 26u, 3u);\n  unpacked[127] = extractBits(val_11, 29u, 3u);\n}\n";
var unpackBlock128BitDepth5 = "\nvar<private> unpacked: array<u32, 128>;\n\nfn unpack_block_128_bit_depth_5(packed_offset: u32) {    \n  let val_0 = blocks[packed_offset];\n  unpacked[0] = extractBits(val_0, 0u, 5u);\n  unpacked[1] = extractBits(val_0, 5u, 5u);\n  unpacked[2] = extractBits(val_0, 10u, 5u);\n  unpacked[3] = extractBits(val_0, 15u, 5u);\n  unpacked[4] = extractBits(val_0, 20u, 5u);\n  unpacked[5] = extractBits(val_0, 25u, 5u);\n  unpacked[6] = extractBits(val_0, 30u, 2u);\n  \n  let val_1 = blocks[packed_offset + 1];\n  unpacked[6] = insertBits(unpacked[6], extractBits(val_1, 0u, 3u), 2u, 3u);    \n  unpacked[7] = extractBits(val_1, 3u, 5u);\n  unpacked[8] = extractBits(val_1, 8u, 5u);\n  unpacked[9] = extractBits(val_1, 13u, 5u);\n  unpacked[10] = extractBits(val_1, 18u, 5u);\n  unpacked[11] = extractBits(val_1, 23u, 5u);\n  unpacked[12] = extractBits(val_1, 28u, 4u);\n  \n  let val_2 = blocks[packed_offset + 2];\n  unpacked[12] = insertBits(unpacked[12], extractBits(val_2, 0u, 1u), 4u, 1u);\n  unpacked[13] = extractBits(val_2, 1u, 5u);\n  unpacked[14] = extractBits(val_2, 6u, 5u);\n  unpacked[15] = extractBits(val_2, 11u, 5u);\n  unpacked[16] = extractBits(val_2, 16u, 5u);\n  unpacked[17] = extractBits(val_2, 21u, 5u);\n  unpacked[18] = extractBits(val_2, 26u, 5u);\n  unpacked[19] = extractBits(val_2, 31u, 1u);\n  \n  let val_3 = blocks[packed_offset + 3];\n  unpacked[19] = insertBits(unpacked[19], extractBits(val_3, 0u, 4u), 1u, 4u);\n  unpacked[20] = extractBits(val_3, 4u, 5u);\n  unpacked[21] = extractBits(val_3, 9u, 5u);\n  unpacked[22] = extractBits(val_3, 14u, 5u);\n  unpacked[23] = extractBits(val_3, 19u, 5u);\n  unpacked[24] = extractBits(val_3, 24u, 5u);\n  unpacked[25] = extractBits(val_3, 29u, 3u);\n  \n  let val_4 = blocks[packed_offset + 4];\n  unpacked[25] = insertBits(unpacked[25], extractBits(val_4, 0u, 2u), 3u, 2u);\n  unpacked[26] = extractBits(val_4, 2u, 5u);\n  unpacked[27] = extractBits(val_4, 7u, 5u);\n  unpacked[28] = extractBits(val_4, 12u, 5u);\n  unpacked[29] = extractBits(val_4, 17u, 5u);\n  unpacked[30] = extractBits(val_4, 22u, 5u);\n  unpacked[31] = extractBits(val_4, 27u, 5u);\n  \n  let val_5 = blocks[packed_offset + 5];\n  unpacked[32] = extractBits(val_5, 0u, 5u);\n  unpacked[33] = extractBits(val_5, 5u, 5u);\n  unpacked[34] = extractBits(val_5, 10u, 5u);\n  unpacked[35] = extractBits(val_5, 15u, 5u);\n  unpacked[36] = extractBits(val_5, 20u, 5u);\n  unpacked[37] = extractBits(val_5, 25u, 5u);\n  unpacked[38] = extractBits(val_5, 30u, 2u);\n\n  let val_6 = blocks[packed_offset + 6];\n  unpacked[38] = insertBits(unpacked[38], extractBits(val_6, 0u, 3u), 2u, 3u);\n  unpacked[39] = extractBits(val_6, 3u, 5u);\n  unpacked[40] = extractBits(val_6, 8u, 5u);\n  unpacked[41] = extractBits(val_6, 13u, 5u);\n  unpacked[42] = extractBits(val_6, 18u, 5u);\n  unpacked[43] = extractBits(val_6, 23u, 5u);\n  unpacked[44] = extractBits(val_6, 28u, 4u);\n\n  let val_7 = blocks[packed_offset + 7];\n  unpacked[44] = insertBits(unpacked[44], extractBits(val_7, 0u, 1u), 4u, 1u);\n  unpacked[45] = extractBits(val_7, 1u, 5u);\n  unpacked[46] = extractBits(val_7, 6u, 5u);\n  unpacked[47] = extractBits(val_7, 11u, 5u);\n  unpacked[48] = extractBits(val_7, 16u, 5u);\n  unpacked[49] = extractBits(val_7, 21u, 5u);\n  unpacked[50] = extractBits(val_7, 26u, 5u);\n  unpacked[51] = extractBits(val_7, 31u, 1u);\n\n  let val_8 = blocks[packed_offset + 8];\n  unpacked[51] = insertBits(unpacked[51], extractBits(val_8, 0u, 4u), 1u, 4u);\n  unpacked[52] = extractBits(val_8, 4u, 5u);\n  unpacked[53] = extractBits(val_8, 9u, 5u);\n  unpacked[54] = extractBits(val_8, 14u, 5u);\n  unpacked[55] = extractBits(val_8, 19u, 5u);\n  unpacked[56] = extractBits(val_8, 24u, 5u);\n  unpacked[57] = extractBits(val_8, 29u, 3u);\n  \n  let val_9 = blocks[packed_offset + 9];\n  unpacked[57] = insertBits(unpacked[57], extractBits(val_9, 0u, 2u), 3u, 2u);\n  unpacked[58] = extractBits(val_9, 2u, 5u);\n  unpacked[59] = extractBits(val_9, 7u, 5u);\n  unpacked[60] = extractBits(val_9, 12u, 5u);\n  unpacked[61] = extractBits(val_9, 17u, 5u);\n  unpacked[62] = extractBits(val_9, 22u, 5u);\n  unpacked[63] = extractBits(val_9, 27u, 5u);\n  \n  let val_10 = blocks[packed_offset + 10];\n  unpacked[64] = extractBits(val_10, 0u, 5u);\n  unpacked[65] = extractBits(val_10, 5u, 5u);\n  unpacked[66] = extractBits(val_10, 10u, 5u);\n  unpacked[67] = extractBits(val_10, 15u, 5u);\n  unpacked[68] = extractBits(val_10, 20u, 5u);\n  unpacked[69] = extractBits(val_10, 25u, 5u);\n  unpacked[70] = extractBits(val_10, 30u, 2u);\n\n  let val_11 = blocks[packed_offset + 11];\n  unpacked[70] = insertBits(unpacked[70], extractBits(val_11, 0u, 3u), 2u, 3u);\n  unpacked[71] = extractBits(val_11, 3u, 5u);\n  unpacked[72] = extractBits(val_11, 8u, 5u);\n  unpacked[73] = extractBits(val_11, 13u, 5u);\n  unpacked[74] = extractBits(val_11, 18u, 5u);\n  unpacked[75] = extractBits(val_11, 23u, 5u);\n  unpacked[76] = extractBits(val_11, 28u, 4u);\n\n  let val_12 = blocks[packed_offset + 12];\n  unpacked[76] = insertBits(unpacked[76], extractBits(val_12, 0u, 1u), 4u, 1u);\n  unpacked[77] = extractBits(val_12, 1u, 5u);\n  unpacked[78] = extractBits(val_12, 6u, 5u);\n  unpacked[79] = extractBits(val_12, 11u, 5u);\n  unpacked[80] = extractBits(val_12, 16u, 5u);\n  unpacked[81] = extractBits(val_12, 21u, 5u);\n  unpacked[82] = extractBits(val_12, 26u, 5u);\n  unpacked[83] = extractBits(val_12, 31u, 1u);\n\n  let val_13 = blocks[packed_offset + 13];\n  unpacked[83] = insertBits(unpacked[83], extractBits(val_13, 0u, 4u), 1u, 4u);\n  unpacked[84] = extractBits(val_13, 4u, 5u);\n  unpacked[85] = extractBits(val_13, 9u, 5u);\n  unpacked[86] = extractBits(val_13, 14u, 5u);\n  unpacked[87] = extractBits(val_13, 19u, 5u);\n  unpacked[88] = extractBits(val_13, 24u, 5u);\n  unpacked[89] = extractBits(val_13, 29u, 3u);\n  \n  let val_14 = blocks[packed_offset + 14];\n  unpacked[89] = insertBits(unpacked[89], extractBits(val_14, 0u, 2u), 3u, 2u);\n  unpacked[90] = extractBits(val_14, 2u, 5u);\n  unpacked[91] = extractBits(val_14, 7u, 5u);\n  unpacked[92] = extractBits(val_14, 12u, 5u);\n  unpacked[93] = extractBits(val_14, 17u, 5u);\n  unpacked[94] = extractBits(val_14, 22u, 5u);\n  unpacked[95] = extractBits(val_14, 27u, 5u);\n\n  let val_15 = blocks[packed_offset + 15];\n  unpacked[96] = extractBits(val_15, 0u, 5u);\n  unpacked[97] = extractBits(val_15, 5u, 5u);\n  unpacked[98] = extractBits(val_15, 10u, 5u);\n  unpacked[99] = extractBits(val_15, 15u, 5u);\n  unpacked[100] = extractBits(val_15, 20u, 5u);\n  unpacked[101] = extractBits(val_15, 25u, 5u);\n  unpacked[102] = extractBits(val_15, 30u, 2u);\n\n  let val_16 = blocks[packed_offset + 16];\n  unpacked[102] = insertBits(unpacked[102], extractBits(val_16, 0u, 3u), 2u, 3u);\n  unpacked[103] = extractBits(val_16, 3u, 5u);\n  unpacked[104] = extractBits(val_16, 8u, 5u);\n  unpacked[105] = extractBits(val_16, 13u, 5u);\n  unpacked[106] = extractBits(val_16, 18u, 5u);\n  unpacked[107] = extractBits(val_16, 23u, 5u);\n  unpacked[108] = extractBits(val_16, 28u, 4u);\n\n  let val_17 = blocks[packed_offset + 17];\n  unpacked[108] = insertBits(unpacked[108], extractBits(val_17, 0u, 1u), 4u, 1u);\n  unpacked[109] = extractBits(val_17, 1u, 5u);\n  unpacked[110] = extractBits(val_17, 6u, 5u);\n  unpacked[111] = extractBits(val_17, 11u, 5u);\n  unpacked[112] = extractBits(val_17, 16u, 5u);\n  unpacked[113] = extractBits(val_17, 21u, 5u);\n  unpacked[114] = extractBits(val_17, 26u, 5u);\n  unpacked[115] = extractBits(val_17, 31u, 1u);\n  \n  let val_18 = blocks[packed_offset + 18];\n  unpacked[115] = insertBits(unpacked[115], extractBits(val_18, 0u, 4u), 1u, 4u);\n  unpacked[116] = extractBits(val_18, 4u, 5u);\n  unpacked[117] = extractBits(val_18, 9u, 5u);\n  unpacked[118] = extractBits(val_18, 14u, 5u);\n  unpacked[119] = extractBits(val_18, 19u, 5u);\n  unpacked[120] = extractBits(val_18, 24u, 5u);\n  unpacked[121] = extractBits(val_18, 29u, 3u);\n\n  let val_19 = blocks[packed_offset + 19];\n  unpacked[121] = insertBits(unpacked[121], extractBits(val_19, 0u, 2u), 3u, 2u);\n  unpacked[122] = extractBits(val_19, 2u, 5u);\n  unpacked[123] = extractBits(val_19, 7u, 5u);\n  unpacked[124] = extractBits(val_19, 12u, 5u);\n  unpacked[125] = extractBits(val_19, 17u, 5u);\n  unpacked[126] = extractBits(val_19, 22u, 5u);\n  unpacked[127] = extractBits(val_19, 27u, 5u);\n}\n";
var unpackBlock128BitDepth6 = "\nvar<private> unpacked: array<u32, 128>;\n\nfn unpack_block_128_bit_depth_6(packed_offset: u32) {\n  let val_0 = blocks[packed_offset];\n  unpacked[0] = extractBits(val_0, 0u, 6u);\n  unpacked[1] = extractBits(val_0, 6u, 6u);\n  unpacked[2] = extractBits(val_0, 12u, 6u);\n  unpacked[3] = extractBits(val_0, 18u, 6u);\n  unpacked[4] = extractBits(val_0, 24u, 6u);\n  unpacked[5] = extractBits(val_0, 30u, 2u);\n  \n  let val_1 = blocks[packed_offset + 1];\n  unpacked[5] = insertBits(unpacked[5], extractBits(val_1, 0u, 4u), 2u, 4u);\n  unpacked[6] = extractBits(val_1, 4u, 6u);\n  unpacked[7] = extractBits(val_1, 10u, 6u);\n  unpacked[8] = extractBits(val_1, 16u, 6u);\n  unpacked[9] = extractBits(val_1, 22u, 6u);\n  unpacked[10] = extractBits(val_1, 28u, 4u);\n  \n  let val_2 = blocks[packed_offset + 2];\n  unpacked[10] = insertBits(unpacked[10], extractBits(val_2, 0u, 2u), 4u, 2u);\n  unpacked[11] = extractBits(val_2, 2u, 6u);\n  unpacked[12] = extractBits(val_2, 8u, 6u);\n  unpacked[13] = extractBits(val_2, 14u, 6u);\n  unpacked[14] = extractBits(val_2, 20u, 6u);\n  unpacked[15] = extractBits(val_2, 26u, 6u);\n  \n  let val_3 = blocks[packed_offset + 3];\n  unpacked[16] = extractBits(val_3, 0u, 6u);\n  unpacked[17] = extractBits(val_3, 6u, 6u);\n  unpacked[18] = extractBits(val_3, 12u, 6u);\n  unpacked[19] = extractBits(val_3, 18u, 6u);\n  unpacked[20] = extractBits(val_3, 24u, 6u);\n  unpacked[21] = extractBits(val_3, 30u, 2u);\n  \n  let val_4 = blocks[packed_offset + 4];\n  unpacked[21] = insertBits(unpacked[21], extractBits(val_4, 0u, 4u), 2u, 4u);\n  unpacked[22] = extractBits(val_4, 4u, 6u);\n  unpacked[23] = extractBits(val_4, 10u, 6u);\n  unpacked[24] = extractBits(val_4, 16u, 6u);\n  unpacked[25] = extractBits(val_4, 22u, 6u);\n  unpacked[26] = extractBits(val_4, 28u, 4u);\n\n  let val_5 = blocks[packed_offset + 5];\n  unpacked[26] = insertBits(unpacked[26], extractBits(val_5, 0u, 2u), 4u, 2u);\n  unpacked[27] = extractBits(val_5, 2u, 6u);\n  unpacked[28] = extractBits(val_5, 8u, 6u);\n  unpacked[29] = extractBits(val_5, 14u, 6u);\n  unpacked[30] = extractBits(val_5, 20u, 6u);\n  unpacked[31] = extractBits(val_5, 26u, 6u);\n\n  let val_6 = blocks[packed_offset + 6];\n  unpacked[32] = extractBits(val_6, 0u, 6u);\n  unpacked[33] = extractBits(val_6, 6u, 6u);\n  unpacked[34] = extractBits(val_6, 12u, 6u);\n  unpacked[35] = extractBits(val_6, 18u, 6u);\n  unpacked[36] = extractBits(val_6, 24u, 6u);\n  unpacked[37] = extractBits(val_6, 30u, 2u);\n\n  let val_7 = blocks[packed_offset + 7];\n  unpacked[37] = insertBits(unpacked[37], extractBits(val_7, 0u, 4u), 2u, 4u);\n  unpacked[38] = extractBits(val_7, 4u, 6u);\n  unpacked[39] = extractBits(val_7, 10u, 6u);\n  unpacked[40] = extractBits(val_7, 16u, 6u);\n  unpacked[41] = extractBits(val_7, 22u, 6u);\n  unpacked[42] = extractBits(val_7, 28u, 4u);\n  \n  let val_8 = blocks[packed_offset + 8];\n  unpacked[42] = insertBits(unpacked[42], extractBits(val_8, 0u, 2u), 4u, 2u);\n  unpacked[43] = extractBits(val_8, 2u, 6u);\n  unpacked[44] = extractBits(val_8, 8u, 6u);\n  unpacked[45] = extractBits(val_8, 14u, 6u);\n  unpacked[46] = extractBits(val_8, 20u, 6u);\n  unpacked[47] = extractBits(val_8, 26u, 6u);\n\n  let val_9 = blocks[packed_offset + 9];\n  unpacked[48] = extractBits(val_9, 0u, 6u);\n  unpacked[49] = extractBits(val_9, 6u, 6u);\n  unpacked[50] = extractBits(val_9, 12u, 6u);\n  unpacked[51] = extractBits(val_9, 18u, 6u);\n  unpacked[52] = extractBits(val_9, 24u, 6u);\n  unpacked[53] = extractBits(val_9, 30u, 2u);\n\n  let val_10 = blocks[packed_offset + 10];\n  unpacked[53] = insertBits(unpacked[53], extractBits(val_10, 0u, 4u), 2u, 4u);\n  unpacked[54] = extractBits(val_10, 4u, 6u);\n  unpacked[55] = extractBits(val_10, 10u, 6u);\n  unpacked[56] = extractBits(val_10, 16u, 6u);\n  unpacked[57] = extractBits(val_10, 22u, 6u);\n  unpacked[58] = extractBits(val_10, 28u, 4u);\n\n  let val_11 = blocks[packed_offset + 11];\n  unpacked[58] = insertBits(unpacked[58], extractBits(val_11, 0u, 2u), 4u, 2u);\n  unpacked[59] = extractBits(val_11, 2u, 6u);\n  unpacked[60] = extractBits(val_11, 8u, 6u);\n  unpacked[61] = extractBits(val_11, 14u, 6u);\n  unpacked[62] = extractBits(val_11, 20u, 6u);\n  unpacked[63] = extractBits(val_11, 26u, 6u);\n  \n  let val_12 = blocks[packed_offset + 12];\n  unpacked[64] = extractBits(val_12, 0u, 6u);\n  unpacked[65] = extractBits(val_12, 6u, 6u);\n  unpacked[66] = extractBits(val_12, 12u, 6u);\n  unpacked[67] = extractBits(val_12, 18u, 6u);\n  unpacked[68] = extractBits(val_12, 24u, 6u);\n  unpacked[69] = extractBits(val_12, 30u, 2u);\n\n  let val_13 = blocks[packed_offset + 13];\n  unpacked[69] = insertBits(unpacked[69], extractBits(val_13, 0u, 4u), 2u, 4u);\n  unpacked[70] = extractBits(val_13, 4u, 6u);\n  unpacked[71] = extractBits(val_13, 10u, 6u);\n  unpacked[72] = extractBits(val_13, 16u, 6u);\n  unpacked[73] = extractBits(val_13, 22u, 6u);\n  unpacked[74] = extractBits(val_13, 28u, 4u);\n\n  let val_14 = blocks[packed_offset + 14];\n  unpacked[74] = insertBits(unpacked[74], extractBits(val_14, 0u, 2u), 4u, 2u);\n  unpacked[75] = extractBits(val_14, 2u, 6u);\n  unpacked[76] = extractBits(val_14, 8u, 6u);\n  unpacked[77] = extractBits(val_14, 14u, 6u);\n  unpacked[78] = extractBits(val_14, 20u, 6u);\n  unpacked[79] = extractBits(val_14, 26u, 6u);\n\n  let val_15 = blocks[packed_offset + 15];\n  unpacked[80] = extractBits(val_15, 0u, 6u);\n  unpacked[81] = extractBits(val_15, 6u, 6u);\n  unpacked[82] = extractBits(val_15, 12u, 6u);\n  unpacked[83] = extractBits(val_15, 18u, 6u);\n  unpacked[84] = extractBits(val_15, 24u, 6u);\n  unpacked[85] = extractBits(val_15, 30u, 2u);\n  \n  let val_16 = blocks[packed_offset + 16];\n  unpacked[85] = insertBits(unpacked[85], extractBits(val_16, 0u, 4u), 2u, 4u);\n  unpacked[86] = extractBits(val_16, 4u, 6u);\n  unpacked[87] = extractBits(val_16, 10u, 6u);\n  unpacked[88] = extractBits(val_16, 16u, 6u);\n  unpacked[89] = extractBits(val_16, 22u, 6u);\n  unpacked[90] = extractBits(val_16, 28u, 4u);\n\n  let val_17 = blocks[packed_offset + 17];\n  unpacked[90] = insertBits(unpacked[90], extractBits(val_17, 0u, 2u), 4u, 2u);\n  unpacked[91] = extractBits(val_17, 2u, 6u);\n  unpacked[92] = extractBits(val_17, 8u, 6u);\n  unpacked[93] = extractBits(val_17, 14u, 6u);\n  unpacked[94] = extractBits(val_17, 20u, 6u);\n  unpacked[95] = extractBits(val_17, 26u, 6u);\n\n  let val_18 = blocks[packed_offset + 18];\n  unpacked[96] = extractBits(val_18, 0u, 6u);\n  unpacked[97] = extractBits(val_18, 6u, 6u);\n  unpacked[98] = extractBits(val_18, 12u, 6u);\n  unpacked[99] = extractBits(val_18, 18u, 6u);\n  unpacked[100] = extractBits(val_18, 24u, 6u);\n  unpacked[101] = extractBits(val_18, 30u, 2u);\n\n  let val_19 = blocks[packed_offset + 19];\n  unpacked[101] = insertBits(unpacked[101], extractBits(val_19, 0u, 4u), 2u, 4u);\n  unpacked[102] = extractBits(val_19, 4u, 6u);\n  unpacked[103] = extractBits(val_19, 10u, 6u);\n  unpacked[104] = extractBits(val_19, 16u, 6u);\n  unpacked[105] = extractBits(val_19, 22u, 6u);\n  unpacked[106] = extractBits(val_19, 28u, 4u);\n  \n  let val_20 = blocks[packed_offset + 20];\n  unpacked[106] = insertBits(unpacked[106], extractBits(val_20, 0u, 2u), 4u, 2u);\n  unpacked[107] = extractBits(val_20, 2u, 6u);\n  unpacked[108] = extractBits(val_20, 8u, 6u);\n  unpacked[109] = extractBits(val_20, 14u, 6u);\n  unpacked[110] = extractBits(val_20, 20u, 6u);\n  unpacked[111] = extractBits(val_20, 26u, 6u);\n\n  let val_21 = blocks[packed_offset + 21];\n  unpacked[112] = extractBits(val_21, 0u, 6u);\n  unpacked[113] = extractBits(val_21, 6u, 6u);\n  unpacked[114] = extractBits(val_21, 12u, 6u);\n  unpacked[115] = extractBits(val_21, 18u, 6u);\n  unpacked[116] = extractBits(val_21, 24u, 6u);\n  unpacked[117] = extractBits(val_21, 30u, 2u);\n\n  let val_22 = blocks[packed_offset + 22];\n  unpacked[117] = insertBits(unpacked[117], extractBits(val_22, 0u, 4u), 2u, 4u);\n  unpacked[118] = extractBits(val_22, 4u, 6u);\n  unpacked[119] = extractBits(val_22, 10u, 6u);\n  unpacked[120] = extractBits(val_22, 16u, 6u);\n  unpacked[121] = extractBits(val_22, 22u, 6u);\n  unpacked[122] = extractBits(val_22, 28u, 4u);\n\n  let val_23 = blocks[packed_offset + 23];\n  unpacked[122] = insertBits(unpacked[122], extractBits(val_23, 0u, 2u), 4u, 2u);\n  unpacked[123] = extractBits(val_23, 2u, 6u);\n  unpacked[124] = extractBits(val_23, 8u, 6u);\n  unpacked[125] = extractBits(val_23, 14u, 6u);\n  unpacked[126] = extractBits(val_23, 20u, 6u);\n  unpacked[127] = extractBits(val_23, 26u, 6u);\n}\n";
var unpackBlock128BitDepth7 = "\nvar<private> unpacked: array<u32, 128>;\n\nfn unpack_block_128_bit_depth_7(packed_offset: u32) {\n  let val_0 = blocks[packed_offset];\n  unpacked[0] = extractBits(val_0, 0u, 7u);\n  unpacked[1] = extractBits(val_0, 7u, 7u);\n  unpacked[2] = extractBits(val_0, 14u, 7u);\n  unpacked[3] = extractBits(val_0, 21u, 7u);\n  unpacked[4] = extractBits(val_0, 28u, 4u);\n  \n  let val_1 = blocks[packed_offset + 1];\n  unpacked[4] = insertBits(unpacked[4], extractBits(val_1, 0u, 3u), 4u, 3u);\n  unpacked[5] = extractBits(val_1, 3u, 7u);\n  unpacked[6] = extractBits(val_1, 10u, 7u);\n  unpacked[7] = extractBits(val_1, 17u, 7u);\n  unpacked[8] = extractBits(val_1, 24u, 7u);\n  unpacked[9] = extractBits(val_1, 31u, 1u);\n  \n  let val_2 = blocks[packed_offset + 2];\n  unpacked[9] = insertBits(unpacked[9], extractBits(val_2, 0u, 6u), 1u, 6u);\n  unpacked[10] = extractBits(val_2, 6u, 7u);\n  unpacked[11] = extractBits(val_2, 13u, 7u);\n  unpacked[12] = extractBits(val_2, 20u, 7u);\n  unpacked[13] = extractBits(val_2, 27u, 5u);\n  \n  let val_3 = blocks[packed_offset + 3];\n  unpacked[13] = insertBits(unpacked[13], extractBits(val_3, 0u, 2u), 5u, 2u);\n  unpacked[14] = extractBits(val_3, 2u, 7u);\n  unpacked[15] = extractBits(val_3, 9u, 7u);\n  unpacked[16] = extractBits(val_3, 16u, 7u);\n  unpacked[17] = extractBits(val_3, 23u, 7u);\n  unpacked[18] = extractBits(val_3, 30u, 2u);\n  \n  let val_4 = blocks[packed_offset + 4];\n  unpacked[18] = insertBits(unpacked[18], extractBits(val_4, 0u, 5u), 2u, 5u);\n  unpacked[19] = extractBits(val_4, 5u, 7u);\n  unpacked[20] = extractBits(val_4, 12u, 7u);\n  unpacked[21] = extractBits(val_4, 19u, 7u);\n  unpacked[22] = extractBits(val_4, 26u, 6u);\n  \n  let val_5 = blocks[packed_offset + 5];\n  unpacked[22] = insertBits(unpacked[22], extractBits(val_5, 0u, 1u), 6u, 1u);\n  unpacked[23] = extractBits(val_5, 1u, 7u);\n  unpacked[24] = extractBits(val_5, 8u, 7u);\n  unpacked[25] = extractBits(val_5, 15u, 7u);\n  unpacked[26] = extractBits(val_5, 22u, 7u);\n  unpacked[27] = extractBits(val_5, 29u, 3u);\n  \n  let val_6 = blocks[packed_offset + 6];\n  unpacked[27] = insertBits(unpacked[27], extractBits(val_6, 0u, 4u), 3u, 4u);\n  unpacked[28] = extractBits(val_6, 4u, 7u);\n  unpacked[29] = extractBits(val_6, 11u, 7u);\n  unpacked[30] = extractBits(val_6, 18u, 7u);\n  unpacked[31] = extractBits(val_6, 25u, 7u);\n  \n  let val_7 = blocks[packed_offset + 7];\n  unpacked[32] = extractBits(val_7, 0u, 7u);\n  unpacked[33] = extractBits(val_7, 7u, 7u);\n  unpacked[34] = extractBits(val_7, 14u, 7u);\n  unpacked[35] = extractBits(val_7, 21u, 7u);\n  unpacked[36] = extractBits(val_7, 28u, 4u);\n  \n  let val_8 = blocks[packed_offset + 8];\n  unpacked[36] = insertBits(unpacked[36], extractBits(val_8, 0u, 3u), 4u, 3u);\n  unpacked[37] = extractBits(val_8, 3u, 7u);\n  unpacked[38] = extractBits(val_8, 10u, 7u);\n  unpacked[39] = extractBits(val_8, 17u, 7u);\n  unpacked[40] = extractBits(val_8, 24u, 7u);\n  unpacked[41] = extractBits(val_8, 31u, 1u);\n  \n  let val_9 = blocks[packed_offset + 9];\n  unpacked[41] = insertBits(unpacked[41], extractBits(val_9, 0u, 6u), 1u, 6u);\n  unpacked[42] = extractBits(val_9, 6u, 7u);\n  unpacked[43] = extractBits(val_9, 13u, 7u);\n  unpacked[44] = extractBits(val_9, 20u, 7u);\n  unpacked[45] = extractBits(val_9, 27u, 5u);\n  \n  let val_10 = blocks[packed_offset + 10];\n  unpacked[45] = insertBits(unpacked[45], extractBits(val_10, 0u, 2u), 5u, 2u);\n  unpacked[46] = extractBits(val_10, 2u, 7u);\n  unpacked[47] = extractBits(val_10, 9u, 7u);\n  unpacked[48] = extractBits(val_10, 16u, 7u);\n  unpacked[49] = extractBits(val_10, 23u, 7u);\n  unpacked[50] = extractBits(val_10, 30u, 2u);\n  \n  let val_11 = blocks[packed_offset + 11];\n  unpacked[50] = insertBits(unpacked[50], extractBits(val_11, 0u, 5u), 2u, 5u);\n  unpacked[51] = extractBits(val_11, 5u, 7u);\n  unpacked[52] = extractBits(val_11, 12u, 7u);\n  unpacked[53] = extractBits(val_11, 19u, 7u);\n  unpacked[54] = extractBits(val_11, 26u, 6u);\n  \n  let val_12 = blocks[packed_offset + 12];\n  unpacked[54] = insertBits(unpacked[54], extractBits(val_12, 0u, 1u), 6u, 1u);\n  unpacked[55] = extractBits(val_12, 1u, 7u);\n  unpacked[56] = extractBits(val_12, 8u, 7u);\n  unpacked[57] = extractBits(val_12, 15u, 7u);\n  unpacked[58] = extractBits(val_12, 22u, 7u);\n  unpacked[59] = extractBits(val_12, 29u, 3u);\n  \n  let val_13 = blocks[packed_offset + 13];\n  unpacked[59] = insertBits(unpacked[59], extractBits(val_13, 0u, 4u), 3u, 4u);\n  unpacked[60] = extractBits(val_13, 4u, 7u);\n  unpacked[61] = extractBits(val_13, 11u, 7u);\n  unpacked[62] = extractBits(val_13, 18u, 7u);\n  unpacked[63] = extractBits(val_13, 25u, 7u);\n  \n  let val_14 = blocks[packed_offset + 14];\n  unpacked[64] = extractBits(val_14, 0u, 7u);\n  unpacked[65] = extractBits(val_14, 7u, 7u);\n  unpacked[66] = extractBits(val_14, 14u, 7u);\n  unpacked[67] = extractBits(val_14, 21u, 7u);\n  unpacked[68] = extractBits(val_14, 28u, 4u);\n  \n  let val_15 = blocks[packed_offset + 15];\n  unpacked[68] = insertBits(unpacked[68], extractBits(val_15, 0u, 3u), 4u, 3u);\n  unpacked[69] = extractBits(val_15, 3u, 7u);\n  unpacked[70] = extractBits(val_15, 10u, 7u);\n  unpacked[71] = extractBits(val_15, 17u, 7u);\n  unpacked[72] = extractBits(val_15, 24u, 7u);\n  unpacked[73] = extractBits(val_15, 31u, 1u);\n  \n  let val_16 = blocks[packed_offset + 16];\n  unpacked[73] = insertBits(unpacked[73], extractBits(val_16, 0u, 6u), 1u, 6u);\n  unpacked[74] = extractBits(val_16, 6u, 7u);\n  unpacked[75] = extractBits(val_16, 13u, 7u);\n  unpacked[76] = extractBits(val_16, 20u, 7u);\n  unpacked[77] = extractBits(val_16, 27u, 5u);\n  \n  let val_17 = blocks[packed_offset + 17];\n  unpacked[77] = insertBits(unpacked[77], extractBits(val_17, 0u, 2u), 5u, 2u);\n  unpacked[78] = extractBits(val_17, 2u, 7u);\n  unpacked[79] = extractBits(val_17, 9u, 7u);\n  unpacked[80] = extractBits(val_17, 16u, 7u);\n  unpacked[81] = extractBits(val_17, 23u, 7u);\n  unpacked[82] = extractBits(val_17, 30u, 2u);\n  \n  let val_18 = blocks[packed_offset + 18];\n  unpacked[82] = insertBits(unpacked[82], extractBits(val_18, 0u, 5u), 2u, 5u);\n  unpacked[83] = extractBits(val_18, 5u, 7u);\n  unpacked[84] = extractBits(val_18, 12u, 7u);\n  unpacked[85] = extractBits(val_18, 19u, 7u);\n  unpacked[86] = extractBits(val_18, 26u, 6u);\n  \n  let val_19 = blocks[packed_offset + 19];\n  unpacked[86] = insertBits(unpacked[86], extractBits(val_19, 0u, 1u), 6u, 1u);\n  unpacked[87] = extractBits(val_19, 1u, 7u);\n  unpacked[88] = extractBits(val_19, 8u, 7u);\n  unpacked[89] = extractBits(val_19, 15u, 7u);\n  unpacked[90] = extractBits(val_19, 22u, 7u);\n  unpacked[91] = extractBits(val_19, 29u, 3u);\n  \n  let val_20 = blocks[packed_offset + 20];\n  unpacked[91] = insertBits(unpacked[91], extractBits(val_20, 0u, 4u), 3u, 4u);\n  unpacked[92] = extractBits(val_20, 4u, 7u);\n  unpacked[93] = extractBits(val_20, 11u, 7u);\n  unpacked[94] = extractBits(val_20, 18u, 7u);\n  unpacked[95] = extractBits(val_20, 25u, 7u);\n  \n  let val_21 = blocks[packed_offset + 21];\n  unpacked[96] = extractBits(val_21, 0u, 7u);\n  unpacked[97] = extractBits(val_21, 7u, 7u);\n  unpacked[98] = extractBits(val_21, 14u, 7u);\n  unpacked[99] = extractBits(val_21, 21u, 7u);\n  unpacked[100] = extractBits(val_21, 28u, 4u);\n  \n  let val_22 = blocks[packed_offset + 22];\n  unpacked[100] = insertBits(unpacked[100], extractBits(val_22, 0u, 3u), 4u, 3u);\n  unpacked[101] = extractBits(val_22, 3u, 7u);\n  unpacked[102] = extractBits(val_22, 10u, 7u);\n  unpacked[103] = extractBits(val_22, 17u, 7u);\n  unpacked[104] = extractBits(val_22, 24u, 7u);\n  unpacked[105] = extractBits(val_22, 31u, 1u);\n  \n  let val_23 = blocks[packed_offset + 23];\n  unpacked[105] = insertBits(unpacked[105], extractBits(val_23, 0u, 6u), 1u, 6u);\n  unpacked[106] = extractBits(val_23, 6u, 7u);\n  unpacked[107] = extractBits(val_23, 13u, 7u);\n  unpacked[108] = extractBits(val_23, 20u, 7u);\n  unpacked[109] = extractBits(val_23, 27u, 5u);\n  \n  let val_24 = blocks[packed_offset + 24];\n  unpacked[109] = insertBits(unpacked[109], extractBits(val_24, 0u, 2u), 5u, 2u);\n  unpacked[110] = extractBits(val_24, 2u, 7u);\n  unpacked[111] = extractBits(val_24, 9u, 7u);\n  unpacked[112] = extractBits(val_24, 16u, 7u);\n  unpacked[113] = extractBits(val_24, 23u, 7u);\n  unpacked[114] = extractBits(val_24, 30u, 2u);\n  \n  let val_25 = blocks[packed_offset + 25];\n  unpacked[114] = insertBits(unpacked[114], extractBits(val_25, 0u, 5u), 2u, 5u);\n  unpacked[115] = extractBits(val_25, 5u, 7u);\n  unpacked[116] = extractBits(val_25, 12u, 7u);\n  unpacked[117] = extractBits(val_25, 19u, 7u);\n  unpacked[118] = extractBits(val_25, 26u, 6u);\n  \n  let val_26 = blocks[packed_offset + 26];\n  unpacked[118] = insertBits(unpacked[118], extractBits(val_26, 0u, 1u), 6u, 1u);\n  unpacked[119] = extractBits(val_26, 1u, 7u);\n  unpacked[120] = extractBits(val_26, 8u, 7u);\n  unpacked[121] = extractBits(val_26, 15u, 7u);\n  unpacked[122] = extractBits(val_26, 22u, 7u);\n  unpacked[123] = extractBits(val_26, 29u, 3u);\n  \n  let val_27 = blocks[packed_offset + 27];\n  unpacked[123] = insertBits(unpacked[123], extractBits(val_27, 0u, 4u), 3u, 4u);\n  unpacked[124] = extractBits(val_27, 4u, 7u);\n  unpacked[125] = extractBits(val_27, 11u, 7u);\n  unpacked[126] = extractBits(val_27, 18u, 7u);\n  unpacked[127] = extractBits(val_27, 25u, 7u);    \n}\n";
var fromFP510Function = "\n\nconst exponents: array<f32, 32> = array(\n  2.9103830456733704e-11, \n  5.820766091346741e-11, \n  1.1641532182693481e-10, \n  2.3283064365386963e-10,\n  4.656612873077393e-10, \n  9.313225746154785e-10, \n  1.862645149230957e-09, \n  3.725290298461914e-09,\n  7.450580596923828e-09, \n  1.4901161193847656e-08, \n  2.9802322387695312e-08, \n  5.960464477539063e-08,\n  1.1920928955078125e-07, \n  2.384185791015625e-07, \n  4.76837158203125e-07, \n  9.5367431640625e-07,\n  1.9073486328125e-06, \n  3.814697265625e-06, \n  7.62939453125e-06, \n  1.52587890625e-05, \n  3.0517578125e-05,\n  6.103515625e-05, \n  0.0001220703125, \n  0.000244140625, \n  0.00048828125, \n  0.0009765625, \n  0.001953125, \n  0.00390625,\n  0.0078125, \n  0.015625, \n  0.03125, \n  0.0625);\n\nfn from_fp510(x: u32) -> f32 {\n    let exponent = f32(exponents[extractBits(x, 10u, 5u)]);        \n    let fractional = f32(extractBits(x, 0u, 10u));        \n    let abs = exponent * fractional;\n    return abs * (1.0 - (2.0 * f32(extractBits(x, 15u, 1u))));\n}\n";

var preprocessBlocks3BitShaderSource = "\n\nstruct argsStruct {\n  nbr: u32,\n  nbc: u32,\n  blocks_offset: u32\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> blocks: array<u32>;\n\n".concat(unpackBlock128BitDepth3, "\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.nbr || global_id.y >= args.nbc) {\n      return;\n  }\n  \n  let blocks_start: u32 = args.blocks_offset + ((global_id.x * args.nbc + global_id.y) * 12u);    \n  unpack_block_128_bit_depth_3(blocks_start);    \n      \n  let b01: u32 = blocks_start;\n  let b2: u32 = blocks_start + 8u;\n  \n  for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n    let unpacked_idx = r * ").concat(columnsPerBlock, "u;\n    let b01_idx = b01 + (r / 2u);\n    let b2_idx = b2 + (r / 4u);\n\n    blocks[b01_idx] = insertBits(blocks[b01_idx], extractBits(unpacked[unpacked_idx], 0u, 2u), (r * 16u) % 32u, 16u);\n    blocks[b2_idx] = insertBits(blocks[b2_idx], extractBits(unpacked[unpacked_idx], 2u, 1u), (r * 8u) % 32u, 8u);  \n  }\n    \n  for (var c = 1u; c < ").concat(columnsPerBlock, "u; c++) {\n    for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n      let unpacked_idx = r * ").concat(columnsPerBlock, "u + c;\n      let b01_idx = b01 + (r / 2u);\n      let b2_idx = b2 + (r / 4u);\n                \n      blocks[b01_idx] = insertBits(blocks[b01_idx], extractBits(unpacked[unpacked_idx], 0u, 2u), ((r * 16u) % 32u) + (2u * c), 2u);\n      blocks[b2_idx] = insertBits(blocks[b2_idx], extractBits(unpacked[unpacked_idx], 2u, 1u), ((r * 8u) % 32u) + c, 1u);  \n    }\n  }\n}\n\n").concat(emptyShader);
var preprocessBlocks5BitShaderSource = "\n\nstruct argsStruct {\n  nbr: u32,\n  nbc: u32,\n  blocks_offset: u32\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> blocks: array<u32>;\n\n".concat(unpackBlock128BitDepth5, "\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.nbr || global_id.y >= args.nbc) {\n      return;\n  }\n\n  let blocks_start: u32 = args.blocks_offset + ((global_id.x * args.nbc + global_id.y) * 20u);\n  unpack_block_128_bit_depth_5(blocks_start);    \n  \n  let b03: u32 = blocks_start;\n  let b4: u32 = blocks_start + 16u;\n\n  for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n    let unpacked_idx = r * ").concat(columnsPerBlock, "u;\n    let b03_idx = b03 + r;\n    let b4_idx = b4 + (r / 4u);\n          \n    blocks[b03_idx] = insertBits(blocks[b03_idx], extractBits(unpacked[unpacked_idx], 0u, 4u), 0u, 32u);\n    blocks[b4_idx] = insertBits(blocks[b4_idx], extractBits(unpacked[unpacked_idx], 4u, 1u), (r * 8u) % 32u, 8u);\n  }\n      \n  for (var c = 1u; c < ").concat(columnsPerBlock, "u; c++) {\n    for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n      let unpacked_idx = r * ").concat(columnsPerBlock, "u + c;\n      let b03_idx = b03 + r;\n      let b4_idx = b4 + (r / 4u);\n                                \n      blocks[b03_idx] = insertBits(blocks[b03_idx], extractBits(unpacked[unpacked_idx], 0u, 4u), 4 * c, 4u);\n      blocks[b4_idx] = insertBits(blocks[b4_idx], extractBits(unpacked[unpacked_idx], 4u, 1u), ((r * 8u) % 32u) + c, 1u);\n    }\n  }   \n}\n\n").concat(emptyShader);
var preprocessBlocks6BitShaderSource = "\n\nstruct argsStruct {\n  nbr: u32,\n  nbc: u32,\n  blocks_offset: u32\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> blocks: array<u32>;\n\n".concat(unpackBlock128BitDepth6, "\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.nbr || global_id.y >= args.nbc) {\n      return;\n  }\n  \n  let blocks_start: u32 = args.blocks_offset + ((global_id.x * args.nbc + global_id.y) * 24u);\n  unpack_block_128_bit_depth_6(blocks_start);\n  \n  let b03: u32 = blocks_start;\n  let b45: u32 = blocks_start + 16u;    \n  for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n    let unpacked_idx = r * ").concat(columnsPerBlock, "u;\n    let b03_idx = b03 + r;\n    let b45_idx = b45 + (r / 2u);\n    \n    blocks[b03_idx] = insertBits(blocks[b03_idx], extractBits(unpacked[unpacked_idx], 0u, 4u), 0u, 32u);\n    blocks[b45_idx] = insertBits(blocks[b45_idx], extractBits(unpacked[unpacked_idx], 4u, 2u), ((r * 16u) % 32u), 16u);\n  }\n\n  for (var c = 1u; c < ").concat(columnsPerBlock, "u; c++) {\n    for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n      let unpacked_idx = r * ").concat(columnsPerBlock, "u + c;\n      let b03_idx = b03 + r;\n      let b45_idx = b45 + (r / 2u);\n      \n      blocks[b03_idx] = insertBits(blocks[b03_idx], extractBits(unpacked[unpacked_idx], 0u, 4u), 4 * c, 4u);\n      blocks[b45_idx] = insertBits(blocks[b45_idx], extractBits(unpacked[unpacked_idx], 4u, 2u), ((r * 16u) % 32u) + (2 * c), 2u);\n    }\n  }\n}\n\n").concat(emptyShader);
var preprocessBlocks7BitShaderSource = "\n\nstruct argsStruct {\n  nbr: u32,\n  nbc: u32,\n  blocks_offset: u32\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read_write> blocks: array<u32>;\n\n".concat(unpackBlock128BitDepth7, "\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.nbr || global_id.y >= args.nbc) {\n      return;\n  }\n  \n  let blocks_start: u32 = args.blocks_offset + ((global_id.x * args.nbc + global_id.y) * 28u);\n  unpack_block_128_bit_depth_7(blocks_start);\n  \n  let b03: u32 = blocks_start;\n  let b45: u32 = blocks_start + 16u;\n  let b6: u32 = blocks_start + 24u;  \n  for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n    let unpacked_idx = r * ").concat(columnsPerBlock, "u;\n    let b03_idx = b03 + r;\n    let b45_idx = b45 + (r / 2u);\n    let b6_idx = b6 + (r / 4u);\n    \n    blocks[b03_idx] = insertBits(blocks[b03_idx], extractBits(unpacked[unpacked_idx], 0u, 4u), 0, 32u);\n    blocks[b45_idx] = insertBits(blocks[b45_idx], extractBits(unpacked[unpacked_idx], 4u, 2u), ((r * 16u) % 32u), 16u);\n    blocks[b6_idx] = insertBits(blocks[b6_idx], extractBits(unpacked[unpacked_idx], 6u, 1u), ((r * 8u) % 32u), 8u);\n  }\n  \n  for (var c = 1u; c < ").concat(columnsPerBlock, "u; c++) {\n    for (var r = 0u; r < ").concat(rowsPerBlock, "u; r++) {\n      let unpacked_idx = r * ").concat(columnsPerBlock, "u + c;\n      let b03_idx = b03 + r;\n      let b45_idx = b45 + (r / 2u);\n      let b6_idx = b6 + (r / 4u);\n      \n      blocks[b03_idx] = insertBits(blocks[b03_idx], extractBits(unpacked[unpacked_idx], 0u, 4u), 4 * c, 4u);\n      blocks[b45_idx] = insertBits(blocks[b45_idx], extractBits(unpacked[unpacked_idx], 4u, 2u), ((r * 16u) % 32u) + (2 * c), 2u);\n      blocks[b6_idx] = insertBits(blocks[b6_idx], extractBits(unpacked[unpacked_idx], 6u, 1u), ((r * 8u) % 32u) + c, 1u);\n    }\n  }\n}\n\n").concat(emptyShader);
var preprocessShaderSources = {
  3: preprocessBlocks3BitShaderSource,
  5: preprocessBlocks5BitShaderSource,
  6: preprocessBlocks6BitShaderSource,
  7: preprocessBlocks7BitShaderSource
};
var preprocessShaderNames = {
  3: "pv_picollm_weight_block_mixed_16x8_preprocess_blocks_3bit_shader",
  5: "pv_picollm_weight_block_mixed_16x8_preprocess_blocks_5bit_shader",
  6: "pv_picollm_weight_block_mixed_16x8_preprocess_blocks_6bit_shader",
  7: "pv_picollm_weight_block_mixed_16x8_preprocess_blocks_7bit_shader"
};

var BM = 8;
var BN = 32;
var TM = 2;
var TN = 16;
var TC = rowsPerBlock * BM * BN / (TM * TN);
var constantSnippet = "\nconst BM = ".concat(BM, "u;\nconst BN = ").concat(BN, "u;\n\nconst TM = ").concat(TM, "u;\nconst TN = ").concat(TN, "u;\n\nconst TC = ").concat(TC, "u;\n\nconst ROW_PER_BLOCK = ").concat(rowsPerBlock, "u;\nconst COL_PER_BLOCK = ").concat(columnsPerBlock, "u;\n\nconst VEC_COL_PER_BLOCK = COL_PER_BLOCK / 4u;\n\nconst block_size: u32 = (COL_PER_BLOCK * ROW_PER_BLOCK * bit_depth) / 32u;\n\n");
var forwardMultipleInputArgsSnippet = "\nstruct argsStruct {\n  n: u32,\n  m: u32,\n  total_nbc: u32,\n  k: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<f32>;\n";
var forwardMultipleSharedPrivateMemSnippet = "\nvar<workgroup> shared_x: array<vec4<f32>, BN * VEC_COL_PER_BLOCK>;\nvar<workgroup> shared_ab: array<f32, BM * 2>;\nvar<workgroup> shared_w: array<vec4<f32>, BM * ROW_PER_BLOCK * VEC_COL_PER_BLOCK>;\n\nvar<private> local_x: array<vec4<f32>, TN * VEC_COL_PER_BLOCK>;\nvar<private> local_x_sums: array<f32, TN>;\nvar<private> local_results: array<f32, TM * TN>;\n";
var forwardMultipleLocalVarSnippet = "\n  let tid = local_id.x;\n  let bm_idx = workgroup_id.x;\n  let bn_idx = workgroup_id.y;\n\n  let local_bm_idx = bm_idx * BM;\n  let local_bn_idx = bn_idx * BN;\n  \n  let n_idx = tid % (BN / TN);\n  let k_idx = tid / (BN / TN) / (BM * ROW_PER_BLOCK / TM);\n  let m_idx = tid / (BN / TN) % (BM * ROW_PER_BLOCK / TM);\n";
var forwardMultipleLoadW1Bit = "\n  let b0 = blocks[src + (row / 4u)];\n\n  let b0_offset_base = (row * 8u) % 32u;\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    let b0_offset = b0_offset_base + (c * 4u); \n    shared_w[dst + c] = vec4(\n      f32(extractBits(b0, b0_offset, 1u)), \n      f32(extractBits(b0, b0_offset + 1, 1u)),\n      f32(extractBits(b0, b0_offset + 2, 1u)),\n      f32(extractBits(b0, b0_offset + 3, 1u)));\n  }\n";
var forwardMultipleLoadW2Bit = "\n  let b01 = blocks[src + (row / 2u)];\n \n  let b01_offset_base = (row * 16u) % 32u;\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {  \n    let b01_offset = b01_offset_base + (c * 8u);\n    shared_w[dst + c] = vec4(\n      f32(extractBits(b01, b01_offset, 2u)), \n      f32(extractBits(b01, b01_offset + 2, 2u)),\n      f32(extractBits(b01, b01_offset + 4, 2u)),\n      f32(extractBits(b01, b01_offset + 6, 2u)));\n  }  \n";
var forwardMultipleLoadW3Bit = "\n  let b01 = blocks[src + (row / 2u)];\n  let b2 = blocks[src + 8u + (row / 4u)]; \n\n  let b01_offset_base = (row * 16u) % 32u;\n  let b2_offset_base = (row * 8u) % 32u;\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    let b01_offset = b01_offset_base + (c * 8u);\n    let b2_offset = b2_offset_base + (c * 4u);\n\n    shared_w[dst + c] = vec4(\n      f32(insertBits(extractBits(b01, b01_offset, 2u), extractBits(b2, b2_offset, 1u), 2u, 1u)), \n      f32(insertBits(extractBits(b01, b01_offset + 2, 2u), extractBits(b2, b2_offset + 1, 1u), 2u, 1u)),\n      f32(insertBits(extractBits(b01, b01_offset + 4, 2u), extractBits(b2, b2_offset + 2, 1u), 2u, 1u)),\n      f32(insertBits(extractBits(b01, b01_offset + 6, 2u), extractBits(b2, b2_offset + 3, 1u), 2u, 1u)));    \n  }\n";
var forwardMultipleLoadW4Bit = "\n  let b03 = blocks[src + row];\n    \n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    let b03_offset = (c * 16u); \n    shared_w[dst + c] = vec4(\n      f32(extractBits(b03, b03_offset, 4u)), \n      f32(extractBits(b03, b03_offset + 4, 4u)),\n      f32(extractBits(b03, b03_offset + 8, 4u)),\n      f32(extractBits(b03, b03_offset + 12, 4u)));\n  }\n";
var forwardMultipleLoadW5Bit = "\n  let b03 = blocks[src + row];\n  let b4 = blocks[src + 16u + (row / 4u)];\n  \n  let b4_offset_base = (row * 8u) % 32u;\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    let b03_offset = (c * 16u);\n    let b4_offset = b4_offset_base + (c * 4u);\n    shared_w[dst + c] = vec4(\n      f32(insertBits(extractBits(b03, b03_offset, 4u), extractBits(b4, b4_offset, 1u), 4u, 1u)), \n      f32(insertBits(extractBits(b03, b03_offset + 4, 4u), extractBits(b4, b4_offset + 1, 1u), 4u, 1u)),\n      f32(insertBits(extractBits(b03, b03_offset + 8, 4u), extractBits(b4, b4_offset + 2, 1u), 4u, 1u)),\n      f32(insertBits(extractBits(b03, b03_offset + 12, 4u), extractBits(b4, b4_offset + 3, 1u), 4u, 1u)));\n  }\n";
var forwardMultipleLoadW6Bit = "\n  let b03 = blocks[src + row];\n  let b45 = blocks[src + 16u + (row / 2u)];\n  \n  let b45_offset_base = (row * 16u) % 32u;\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {   \n    let b03_offset = (c * 16u);\n    let b45_offset = b45_offset_base + (c * 8u);\n    shared_w[dst + c] = vec4(\n      f32(insertBits(extractBits(b03, b03_offset, 4u), extractBits(b45, b45_offset, 2u), 4u, 2u)), \n      f32(insertBits(extractBits(b03, b03_offset + 4, 4u), extractBits(b45, b45_offset + 2, 2u), 4u, 2u)),\n      f32(insertBits(extractBits(b03, b03_offset + 8, 4u), extractBits(b45, b45_offset + 4, 2u), 4u, 2u)),\n      f32(insertBits(extractBits(b03, b03_offset + 12, 4u), extractBits(b45, b45_offset + 6, 2u), 4u, 2u)));\n  }\n";
var forwardMultipleLoadW7Bit = "\n  let b03 = blocks[src + row];\n  let b45 = blocks[src + 16u + (row / 2u)];\n  let b6 = blocks[src + 24u + (row / 4u)];\n  \n  let b45_offset_base = (row * 16u) % 32u;\n  let b6_offset_base = (row * 8u) % 32u;\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    let b03_offset = (c * 16u);\n    let b45_offset = b45_offset_base + (c * 8u);\n    let b6_offset = b6_offset_base + (c * 4u);\n    \n    shared_w[dst + c] = vec4(\n      f32(insertBits(insertBits(extractBits(b03, b03_offset, 4u), extractBits(b45, b45_offset, 2u), 4u, 2u), extractBits(b6, b6_offset, 1u), 6u, 1u)), \n      f32(insertBits(insertBits(extractBits(b03, b03_offset + 4, 4u), extractBits(b45, b45_offset + 2, 2u), 4u, 2u), extractBits(b6, b6_offset + 1, 1u), 6u, 1u)),\n      f32(insertBits(insertBits(extractBits(b03, b03_offset + 8, 4u), extractBits(b45, b45_offset + 4, 2u), 4u, 2u), extractBits(b6, b6_offset + 2, 1u), 6u, 1u)),\n      f32(insertBits(insertBits(extractBits(b03, b03_offset + 12, 4u), extractBits(b45, b45_offset + 6, 2u), 4u, 2u), extractBits(b6, b6_offset + 3, 1u), 6u, 1u)));\n  }\n";
var forwardMultipleLoadW8Bit = "\n  let b07_offset = src + (row * 2);\n  \n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    let b07 = blocks[b07_offset + c];\n    shared_w[dst + c] = vec4(\n      f32(extractBits(b07, 0u, 8u)), \n      f32(extractBits(b07, 8u, 8u)),\n      f32(extractBits(b07, 16u, 8u)),\n      f32(extractBits(b07, 24u, 8u)));\n  }\n";
var forwardLoadWBitDepthSnippets = {
  1: forwardMultipleLoadW1Bit,
  2: forwardMultipleLoadW2Bit,
  3: forwardMultipleLoadW3Bit,
  4: forwardMultipleLoadW4Bit,
  5: forwardMultipleLoadW5Bit,
  6: forwardMultipleLoadW6Bit,
  7: forwardMultipleLoadW7Bit,
  8: forwardMultipleLoadW8Bit
};
var forwardMultipleLoadXSnippet = "\n  let total_work_x = VEC_COL_PER_BLOCK * BN;\n  for (var local_idx = 0u; local_idx < divide_pad(total_work_x, TC); local_idx++) {\n    let idx = local_idx * TC + tid;\n    if (idx < total_work_x) {      \n      let n_load_idx = local_bn_idx + idx / VEC_COL_PER_BLOCK;\n      let inner_idx = idx % VEC_COL_PER_BLOCK;\n      \n      if (bk_idx < args.k && n_load_idx < args.n) {  \n        let x_idx = (args.x_offset / 4u) + ((bk_idx * args.n + n_load_idx) * VEC_COL_PER_BLOCK + inner_idx);                                   \n        shared_x[idx] = x[x_idx];\n      } else {\n        shared_x[idx] = vec4(0.0);\n      }\n    }\n  }\n";
var forwardMultipleLoadABSnippet = "\n  let total_work_ab = BM * 2;\n  for (var local_idx = 0u; local_idx < divide_pad(total_work_ab, TC); local_idx++) {\n    let idx = local_idx * TC + tid;\n    if (idx < total_work_ab) {\n      let m_load_idx = local_bm_idx + idx / 2;      \n      let inner_idx = (idx % 2) * 16u;\n        \n      if (m_load_idx < args.m && bk_idx < args.k) {\n        let ab_bits = extractBits(metas[args.metas_offset + (m_load_idx * args.k + bk_idx)], inner_idx, 16u);\n        shared_ab[idx] = from_fp510(ab_bits);          \n      } else {\n        shared_ab[idx] = 0.0;\n      }\n    }\n  }\n";
var forwardMultipleLoadWSnippet = function forwardMultipleLoadWSnippet(bitDepth) {
  return "\n  let total_work_w = BM * ROW_PER_BLOCK;\n  for (var local_idx = 0u; local_idx < divide_pad(total_work_w, TC); local_idx++) {\n    let idx = local_idx * TC + tid;\n    if (idx < total_work_w) {\n      let m_load_idx = local_bm_idx + idx / ROW_PER_BLOCK;\n      let row = idx % ROW_PER_BLOCK;\n      let dst = idx * VEC_COL_PER_BLOCK;\n\n      if (m_load_idx < args.m) {\n        let src = args.blocks_offset + (m_load_idx * args.k + bk_idx) * block_size;\n        ".concat(forwardLoadWBitDepthSnippets[bitDepth], "\n      } else {   \n        for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n          shared_w[dst + c] = vec4(0.0);\n        }\n      }\n    }\n  }\n");
};
var forwardMultipleCopyXSnippet = "\nfor (var tn_idx = 0u; tn_idx < TN; tn_idx++) {  \n  var x_sum_vec = vec4(0.0);  \n  let local_x_idx = tn_idx * VEC_COL_PER_BLOCK;\n  let shared_x_idx = (n_idx * TN + tn_idx) * VEC_COL_PER_BLOCK + (k_idx * VEC_COL_PER_BLOCK);\n  for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {\n    local_x[local_x_idx + c] = shared_x[shared_x_idx + c];\n    x_sum_vec += local_x[local_x_idx + c];\n  }\n  local_x_sums[tn_idx] = x_sum_vec.x + x_sum_vec.y + x_sum_vec.z + x_sum_vec.w;  \n}\n";
var forwardMultipleComputeResultsSnippet = "\n  for (var tm_idx = 0u; tm_idx < TM; tm_idx++) {      \n    let shared_ab_idx = ((m_idx * TM + tm_idx) / ROW_PER_BLOCK + k_idx) * 2;\n    let alpha = shared_ab[shared_ab_idx];\n    let beta = shared_ab[shared_ab_idx + 1];             \n    let shared_w_idx = ((m_idx * TM + tm_idx) + k_idx) * VEC_COL_PER_BLOCK;\n    \n    for (var tn_idx = 0u; tn_idx < TN; tn_idx++) {      \n      let local_x_idx = tn_idx * VEC_COL_PER_BLOCK;\n      \n      var swx_vec = vec4(0.0); \n      for (var c = 0u; c < VEC_COL_PER_BLOCK; c++) {        \n        swx_vec += shared_w[shared_w_idx + c] * local_x[local_x_idx + c];\n      }\n      let swx = swx_vec.x + swx_vec.y + swx_vec.z + swx_vec.w;\n      \n      let kappa = alpha * local_x_sums[tn_idx]; \n      let results_idx = tm_idx * TN + tn_idx;\n      local_results[results_idx] += kappa + (beta * swx);\n    }\n  }\n";
var forwardMultipleWriteResultsSnippet = "\nfor (var tm_idx = 0u; tm_idx < TM; tm_idx++) {\n  let row = local_bm_idx * ROW_PER_BLOCK + (m_idx * TM + tm_idx);  \n  for (var tn_idx = 0u; tn_idx < TN; tn_idx++) {    \n    let col = local_bn_idx + (n_idx * TN + tn_idx);\n    if (row < args.m * ROW_PER_BLOCK && col < args.n) {\n      let y_idx = args.y_offset + ((row / ROW_PER_BLOCK) * args.n + col) * ROW_PER_BLOCK + (row % ROW_PER_BLOCK);\n      let results_idx = tm_idx * TN + tn_idx;\n      \n      y[y_idx] += local_results[results_idx];\n    }\n  }\n}\n";
var forwardMultipleShaderSources = function forwardMultipleShaderSources(bitDepth) {
  return "\n\n".concat(forwardMultipleInputArgsSnippet, "\n\n").concat(constantSnippet, "\n\n").concat(forwardMultipleSharedPrivateMemSnippet, "\n\n").concat(fromFP510Function, "\n\n").concat(dividePadFunction, "\n\nconst bit_depth: u32 = ").concat(bitDepth, "u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n \n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(\n  @builtin(local_invocation_id) local_id: vec3<u32>,\n  @builtin(workgroup_id) workgroup_id: vec3<u32>\n) {\n  ").concat(forwardMultipleLocalVarSnippet, "\n    \n  for (var bk_idx = 0u; bk_idx < args.k; bk_idx++) {      \n    ").concat(forwardMultipleLoadXSnippet, "\n    ").concat(forwardMultipleLoadABSnippet, "    \n    ").concat(forwardMultipleLoadWSnippet(bitDepth), "    \n    workgroupBarrier();\n        \n    ").concat(forwardMultipleCopyXSnippet, "\n    ").concat(forwardMultipleComputeResultsSnippet, "\n    workgroupBarrier();\n  }\n    \n  ").concat(forwardMultipleWriteResultsSnippet, "\n}\n\n").concat(emptyShader, "\n");
};

var forwardShuffleXShaderSource = "\nstruct argsStruct {\n  n: u32,\n  shape1: u32,\n  x_offset: u32,\n  indices_offset: u32,  \n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read> indices: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= args.n || global_id.y >= args.shape1) {\n    return;\n  } \n\n  let b = global_id.x;\n  let i = global_id.y;\n      \n  let c = i / 8u;\n  let j = i % 8u;\n  y[((c * args.n) + b) * 8 + j] = x[args.x_offset + (b * args.shape1) + indices[args.indices_offset + i]];\n}\n\n".concat(emptyShader, "\n");
var forwardSingleReduceYShaderSource = "\nstruct argsStruct {\n  nvr: u32,\n  nbc: u32,  \n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read_write> y: array<vec4<f32>>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {   \n  if (global_id.x > args.nvr) {\n    return;\n  }\n\n  let x_start = global_id.x * args.nbc;\n  var sum: vec4<f32> = vec4(0.0, 0.0, 0.0, 0.0);\n  for (var i = 0u; i < args.nbc; i++) {\n    sum += x[x_start + i];    \n  }\n  y[global_id.x] += sum;\n}\n\n".concat(emptyShader);
var forwardShuffleYShaderSource = "\nstruct argsStruct {\n  n: u32,\n  shape0: u32,  \n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> y: array<f32>;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n    if (global_id.x >= args.n || global_id.y >= args.shape0) {\n      return;\n    } \n    \n    let b = global_id.x;\n    let i = global_id.y;\n        \n    let r = i / 16u;\n    let j = i % 16u;\n    y[(b * args.shape0) + (r * 16) + j] = x[(((r * args.n) + b) * 16) + j];\n}\n\n".concat(emptyShader);
var addBiasShaderSource = "\nstruct argsStruct {\n  dimension: u32\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> bias: array<f32>;\n\n@group(0) @binding(2)\nvar<storage, read_write> y: array<f32>;\n\n".concat(fromFP510Function, "\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {  \n  y[(global_id.x * args.dimension) + global_id.y] += bias[global_id.y];\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth1ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 4u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n\n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n  \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n  \n  let x_start = ((args.x_offset + c) / 4u);\n   \n  var b0_start = row_blocks_start + br_offset + (bc * block_size);\n  var b0_offset = 0u;\n  \n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n  \n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {\n    \n    var b0 = blocks[b0_start];\n    \n    let w0_0 = f32(extractBits(b0, b0_offset + j, 1u));    \n    let w0_1 = f32(extractBits(b0, b0_offset + j + 1, 1u));    \n    let w0_2 = f32(extractBits(b0, b0_offset + j + 2, 1u));\n    let w0_3 = f32(extractBits(b0, b0_offset + j + 3, 1u));\n        \n    b0_offset = 8u;\n    \n    let w1_0 = f32(extractBits(b0, b0_offset + j, 1u));    \n    let w1_1 = f32(extractBits(b0, b0_offset + j + 1, 1u));    \n    let w1_2 = f32(extractBits(b0, b0_offset + j + 2, 1u));\n    let w1_3 = f32(extractBits(b0, b0_offset + j + 3, 1u));\n        \n    b0_offset = 16u;\n    \n    let w2_0 = f32(extractBits(b0, b0_offset + j, 1u));    \n    let w2_1 = f32(extractBits(b0, b0_offset + j + 1, 1u));    \n    let w2_2 = f32(extractBits(b0, b0_offset + j + 2, 1u));\n    let w2_3 = f32(extractBits(b0, b0_offset + j + 3, 1u));\n        \n    b0_offset = 24u;\n    \n    let w3_0 = f32(extractBits(b0, b0_offset + j, 1u));    \n    let w3_1 = f32(extractBits(b0, b0_offset + j + 1, 1u));    \n    let w3_2 = f32(extractBits(b0, b0_offset + j + 2, 1u));\n    let w3_3 = f32(extractBits(b0, b0_offset + j + 3, 1u));\n    \n    b0_offset = 0u;\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;      \n  }\n  \n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth2ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 8u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n\n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n  \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n  \n  let x_start = ((args.x_offset + c) / 4u);\n   \n  var b01_start = row_blocks_start + (br_offset * 2u) + (bc * block_size);\n  var b01_offset = 0u;\n  \n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n  \n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {\n    \n    var b01 = blocks[b01_start];\n    \n    let w0_0 = f32(extractBits(b01, b01_offset + (2u * j), 2u));    \n    let w0_1 = f32(extractBits(b01, b01_offset + (2u * (j + 1)), 2u));    \n    let w0_2 = f32(extractBits(b01, b01_offset + (2u * (j + 2)), 2u));\n    let w0_3 = f32(extractBits(b01, b01_offset + (2u * (j + 3)), 2u));\n        \n    b01_offset = 16u;\n    \n    let w1_0 = f32(extractBits(b01, b01_offset + (2u * j), 2u));    \n    let w1_1 = f32(extractBits(b01, b01_offset + (2u * (j + 1)), 2u));    \n    let w1_2 = f32(extractBits(b01, b01_offset + (2u * (j + 2)), 2u));\n    let w1_3 = f32(extractBits(b01, b01_offset + (2u * (j + 3)), 2u));\n        \n    b01_offset = 0u;    \n    b01 = blocks[b01_start + 1u];\n    \n    let w2_0 = f32(extractBits(b01, b01_offset + (2u * j), 2u));    \n    let w2_1 = f32(extractBits(b01, b01_offset + (2u * (j + 1)), 2u));    \n    let w2_2 = f32(extractBits(b01, b01_offset + (2u * (j + 2)), 2u));\n    let w2_3 = f32(extractBits(b01, b01_offset + (2u * (j + 3)), 2u));\n        \n    b01_offset = 16u;\n    \n    let w3_0 = f32(extractBits(b01, b01_offset + (2u * j), 2u));    \n    let w3_1 = f32(extractBits(b01, b01_offset + (2u * (j + 1)), 2u));    \n    let w3_2 = f32(extractBits(b01, b01_offset + (2u * (j + 2)), 2u));\n    let w3_3 = f32(extractBits(b01, b01_offset + (2u * (j + 3)), 2u));\n    \n    b01_offset = 0u;\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;      \n  }\n  \n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth3ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 12u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id : vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n  \n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n    \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n    \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n\n  let x_start = ((args.x_offset + c) / 4u);\n  \n  var b01_start = row_blocks_start + (br_offset * 2u) + (bc * block_size);\n  var b2_start = row_blocks_start + br_offset + (bc * block_size) + 8u;\n  var b01_offset = 0u;\n  var b2_offset = 0u;\n\n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n  \n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {    \n         \n    var b01 = blocks[b01_start];\n    var b2 = blocks[b2_start];\n    \n    var b01_bits = extractBits(b01, b01_offset + (2u * j), 2u);\n    var b2_bit = extractBits(b2, b2_offset + j, 1u);\n    let w0_0 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 1)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 1), 1u);\n    let w0_1 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 2)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 2), 1u);\n    let w0_2 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 3)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 3), 1u);\n    let w0_3 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n        \n    b01_offset = 16u;\n    b2_offset = 8u;\n        \n    b01_bits = extractBits(b01, b01_offset + (2u * j), 2u);\n    b2_bit = extractBits(b2, b2_offset + j, 1u);    \n    let w1_0 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 1)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 1), 1u);\n    let w1_1 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 2)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 2), 1u);\n    let w1_2 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 3)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 3), 1u);\n    let w1_3 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n            \n    b01_offset = 0u;\n    b2_offset = 16u;  \n    b01 = blocks[b01_start + 1u];\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * j), 2u);\n    b2_bit = extractBits(b2, b2_offset + j, 1u);    \n    let w2_0 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 1)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 1), 1u);\n    let w2_1 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 2)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 2), 1u);\n    let w2_2 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 3)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 3), 1u);\n    let w2_3 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n        \n    b01_offset = 16u;\n    b2_offset = 24u;      \n    \n    b01_bits = extractBits(b01, b01_offset + (2u * j), 2u);\n    b2_bit = extractBits(b2, b2_offset + j, 1u);    \n    let w3_0 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 1)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 1), 1u);\n    let w3_1 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 2)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 2), 1u);\n    let w3_2 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_bits = extractBits(b01, b01_offset + (2u * (j + 3)), 2u);\n    b2_bit = extractBits(b2, b2_offset + (j + 3), 1u);\n    let w3_3 = f32(insertBits(b01_bits, b2_bit, 2u, 1u));\n    \n    b01_offset = 0u;\n    b2_offset = 0u; \n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n      \n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;\n  }\n\n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth4ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 16u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n  \n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n    \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n \n  let x_start = ((args.x_offset + c) / 4u);\n  \n  var b03_start = row_blocks_start + (br_offset * 4u) + (bc * block_size);    \n\n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n\n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {\n  \n    var b03 = blocks[b03_start];        \n    \n    let w0_0 = f32(extractBits(b03, 4u * j, 4u));    \n    let w0_1 = f32(extractBits(b03, 4u * (j + 1), 4u));    \n    let w0_2 = f32(extractBits(b03, 4u * (j + 2), 4u));\n    let w0_3 = f32(extractBits(b03, 4u * (j + 3), 4u));\n    \n    b03 = blocks[b03_start + 1];\n    \n    let w1_0 = f32(extractBits(b03, 4u * j, 4u));    \n    let w1_1 = f32(extractBits(b03, 4u * (j + 1), 4u));    \n    let w1_2 = f32(extractBits(b03, 4u * (j + 2), 4u));\n    let w1_3 = f32(extractBits(b03, 4u * (j + 3), 4u));\n    \n    b03 = blocks[b03_start + 2];\n    \n    let w2_0 = f32(extractBits(b03, 4u * j, 4u));    \n    let w2_1 = f32(extractBits(b03, 4u * (j + 1), 4u));    \n    let w2_2 = f32(extractBits(b03, 4u * (j + 2), 4u));\n    let w2_3 = f32(extractBits(b03, 4u * (j + 3), 4u));\n    \n    b03 = blocks[b03_start + 3];\n    \n    let w3_0 = f32(extractBits(b03, 4u * j, 4u));    \n    let w3_1 = f32(extractBits(b03, 4u * (j + 1), 4u));    \n    let w3_2 = f32(extractBits(b03, 4u * (j + 2), 4u));\n    let w3_3 = f32(extractBits(b03, 4u * (j + 3), 4u));\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;\n  }\n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth5ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 20u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n  \n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n    \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n \n  let x_start = ((args.x_offset + c) / 4u);\n  \n  var b03_start = row_blocks_start + (br_offset * 4u) + (bc * block_size);\n  var b4_start = row_blocks_start + br_offset + (bc * block_size) + 16u;\n  \n  var b4_offset = 0u;\n  \n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n  \n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {\n  \n    var b03 = blocks[b03_start];\n    var b4 = blocks[b4_start];\n    \n    var b03_bits = extractBits(b03, 4u * j, 4u);\n    var b4_bit = extractBits(b4, b4_offset + j, 1u);    \n    let w0_0 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 1), 1u);\n    let w0_1 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 2), 1u);\n    let w0_2 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 3), 1u);\n    let w0_3 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03 = blocks[b03_start + 1];\n    b4_offset = 8u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b4_bit = extractBits(b4, b4_offset + j, 1u);    \n    let w1_0 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 1), 1u);\n    let w1_1 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 2), 1u);\n    let w1_2 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 3), 1u);\n    let w1_3 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03 = blocks[b03_start + 2];\n    b4_offset = 16u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b4_bit = extractBits(b4, b4_offset + j, 1u);    \n    let w2_0 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 1), 1u);\n    let w2_1 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 2), 1u);\n    let w2_2 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 3), 1u);\n    let w2_3 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03 = blocks[b03_start + 3];\n    b4_offset = 24u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b4_bit = extractBits(b4, b4_offset + j, 1u);    \n    let w3_0 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 1), 1u);\n    let w3_1 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 2), 1u);\n    let w3_2 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b4_bit = extractBits(b4, b4_offset + (j + 3), 1u);\n    let w3_3 = f32(insertBits(b03_bits, b4_bit, 4u, 1u));\n    \n    b4_offset = 0u;\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;\n  }\n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth6ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 24u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n  \n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n    \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n \n  let x_start = ((args.x_offset + c) / 4u);\n  \n  var b03_start = row_blocks_start + (br_offset * 4u) + (bc * block_size);\n  var b45_start = row_blocks_start + (br_offset * 2u) + (bc * block_size) + 16u;\n  \n  var b45_offset = 0u;\n  \n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n  \n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {\n  \n    var b03 = blocks[b03_start];\n    var b45 = blocks[b45_start];\n    \n    var b03_bits = extractBits(b03, 4u * j, 4u);\n    var b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    let w0_0 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    let w0_1 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    let w0_2 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    let w0_3 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03 = blocks[b03_start + 1];\n    b45_offset = 16u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    let w1_0 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    let w1_1 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    let w1_2 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    let w1_3 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));  \n    \n    b03 = blocks[b03_start + 2];\n    b45 = blocks[b45_start + 1];\n    b45_offset = 0u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    let w2_0 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    let w2_1 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    let w2_2 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    let w2_3 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03 = blocks[b03_start + 3];\n    b45_offset = 16u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    let w3_0 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    let w3_1 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    let w3_2 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    let w3_3 = f32(insertBits(b03_bits, b45_bits, 4u, 2u));\n    \n    b45_offset = 0u;\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;\n  }\n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth7ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 28u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n  \n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n    \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n \n  let x_start = ((args.x_offset + c) / 4u);\n  \n  var b03_start = row_blocks_start + (br_offset * 4u) + (bc * block_size);\n  var b45_start = row_blocks_start + (br_offset * 2u) + (bc * block_size) + 16u;\n  var b6_start = row_blocks_start + br_offset + (bc * block_size) + 24u;\n  \n  var b45_offset = 0u;\n  var b6_offset = 0u;\n  \n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n  \n  for (var j = 0u; j < ").concat(columnsPerBlock, "; j+=4) {\n  \n    var b03 = blocks[b03_start];\n    var b45 = blocks[b45_start];\n    var b6 = blocks[b6_start];\n    \n    var b03_bits = extractBits(b03, 4u * j, 4u);\n    var b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    var b6_bit = extractBits(b6, b6_offset + j, 1u);\n    let w0_0 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 1, 1u);\n    let w0_1 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 2, 1u);\n    let w0_2 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));    \n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 3, 1u);\n    let w0_3 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03 = blocks[b03_start + 1];\n    b45_offset = 16u;\n    b6_offset = 8u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    b6_bit = extractBits(b6, b6_offset + j, 1u);\n    let w1_0 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 1, 1u);\n    let w1_1 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 2, 1u);\n    let w1_2 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));    \n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 3, 1u);\n    let w1_3 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03 = blocks[b03_start + 2];\n    b45 = blocks[b45_start + 1];\n    b45_offset = 0u;\n    b6_offset = 16u;\n\n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    b6_bit = extractBits(b6, b6_offset + j, 1u);\n    let w2_0 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 1, 1u);\n    let w2_1 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 2, 1u);\n    let w2_2 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));    \n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 3, 1u);\n    let w2_3 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03 = blocks[b03_start + 3];\n    b45_offset = 16u;\n    b6_offset = 24u;\n    \n    b03_bits = extractBits(b03, 4u * j, 4u);\n    b45_bits = extractBits(b45, b45_offset + (j * 2), 2u);\n    b6_bit = extractBits(b6, b6_offset + j, 1u);\n    let w3_0 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 1), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 1)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 1, 1u);\n    let w3_1 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b03_bits = extractBits(b03, 4u * (j + 2), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 2)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 2, 1u);\n    let w3_2 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));    \n    \n    b03_bits = extractBits(b03, 4u * (j + 3), 4u);\n    b45_bits = extractBits(b45, b45_offset + (2u * (j + 3)), 2u);\n    b6_bit = extractBits(b6, b6_offset + j + 3, 1u);\n    let w3_3 = f32(insertBits(insertBits(b03_bits, b45_bits, 4u, 2u), b6_bit, 6u, 1u));\n    \n    b45_offset = 0u;\n    b6_offset = 0u;\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_idx = (j / 4u);\n    let x_vec = x[x_start + x_idx];\n    res[x_idx] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;\n  }\n\n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleBitDepth8ShaderSource = "\n\nstruct argsStruct {\n  n: u32,\n  nbr: u32,\n  total_nbc: u32,\n  bit_depth_nbc: u32,\n  x_offset: u32,\n  metas_offset: u32,\n  blocks_offset: u32,\n  y_offset: u32,\n};\n\n@group(0) @binding(0) \nvar<uniform> args: argsStruct;\n\n@group(0) @binding(1)\nvar<storage, read> x: array<vec4<f32>>;\n\n@group(0) @binding(2)\nvar<storage, read> metas: array<u32>;\n\n@group(0) @binding(3)\nvar<storage, read> blocks: array<u32>;\n\n@group(0) @binding(4)\nvar<storage, read_write> y: array<vec4<f32>>;\n\n".concat(fromFP510Function, "\n\nconst block_size: u32 = 32u;\n\noverride workgroup_size_x: u32 = 1;\noverride workgroup_size_y: u32 = 1;\noverride workgroup_size_z: u32 = 1;\n\n@compute @workgroup_size(workgroup_size_x, workgroup_size_y, workgroup_size_z)\nfn main(@builtin(global_invocation_id) global_id: vec3<u32>) {\n  if (global_id.x >= (args.nbr * 4) || global_id.y >= args.bit_depth_nbc) {\n    return;\n  }\n  \n  let r = global_id.x * 4u;\n  let c = global_id.y * ").concat(columnsPerBlock, ";\n  let br = global_id.x / 4u;  \n  let bc = global_id.y;\n  let br_offset = global_id.x % 4u;\n  \n  let row_metas_start: u32 = args.metas_offset + (br * args.bit_depth_nbc);\n  let row_blocks_start: u32 = args.blocks_offset + (br * args.bit_depth_nbc * block_size);  \n    \n  let alpha = from_fp510(extractBits(metas[row_metas_start + bc], 0, 16u));        \n  let beta = from_fp510(extractBits(metas[row_metas_start + bc], 16u, 16u));\n \n  let x_start = ((args.x_offset + c) / 4u);\n  \n  var b07_start = row_blocks_start + (br_offset * 8u) + (bc * block_size);    \n\n  var res: array<vec4<f32>, 2u>;\n  var x_sum: f32 = 0.0;\n\n  for (var j = 0u; j < 2; j++) {\n      \n    var b07 = blocks[b07_start + j];\n    \n    let w0_0 = f32(extractBits(b07, 0u, 8u));    \n    let w0_1 = f32(extractBits(b07, 8u, 8u));    \n    let w0_2 = f32(extractBits(b07, 16u, 8u));\n    let w0_3 = f32(extractBits(b07, 24u, 8u));\n    \n    b07 = blocks[b07_start + 2 + j];\n    \n    let w1_0 = f32(extractBits(b07, 0u, 8u));    \n    let w1_1 = f32(extractBits(b07, 8u, 8u));    \n    let w1_2 = f32(extractBits(b07, 16u, 8u));\n    let w1_3 = f32(extractBits(b07, 24u, 8u));\n    \n    b07 = blocks[b07_start + 4 + j];\n    \n    let w2_0 = f32(extractBits(b07, 0u, 8u));    \n    let w2_1 = f32(extractBits(b07, 8u, 8u));    \n    let w2_2 = f32(extractBits(b07, 16u, 8u));\n    let w2_3 = f32(extractBits(b07, 24u, 8u));\n    \n    b07 = blocks[b07_start + 6 + j];\n    \n    let w3_0 = f32(extractBits(b07, 0u, 8u));    \n    let w3_1 = f32(extractBits(b07, 8u, 8u));    \n    let w3_2 = f32(extractBits(b07, 16u, 8u));\n    let w3_3 = f32(extractBits(b07, 24u, 8u));\n    \n    let m = mat4x4(\n      w0_0, w1_0, w2_0, w3_0,\n      w0_1, w1_1, w2_1, w3_1, \n      w0_2, w1_2, w2_2, w3_2,\n      w0_3, w1_3, w2_3, w3_3);\n\n    let x_vec = x[x_start + j];\n    res[j] = m * x_vec;\n    \n    x_sum += x_vec.x + x_vec.y + x_vec.z + x_vec.w;\n  }\n  let swx = res[0] + res[1];\n  let kappa = alpha * x_sum;\n    \n  let y_start = (args.y_offset + (r * args.total_nbc)) / 4u;\n  y[y_start + bc] += (swx * beta) + vec4(kappa);\n}\n\n").concat(emptyShader);
var forwardSingleShaderSources = {
  1: forwardSingleBitDepth1ShaderSource,
  2: forwardSingleBitDepth2ShaderSource,
  3: forwardSingleBitDepth3ShaderSource,
  4: forwardSingleBitDepth4ShaderSource,
  5: forwardSingleBitDepth5ShaderSource,
  6: forwardSingleBitDepth6ShaderSource,
  7: forwardSingleBitDepth7ShaderSource,
  8: forwardSingleBitDepth8ShaderSource
};
var forwardSingleShaderNames = {
  1: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_1_shader",
  2: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_2_shader",
  3: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_3_shader",
  4: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_4_shader",
  5: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_5_shader",
  6: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_6_shader",
  7: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_7_shader",
  8: "pv_picollm_weight_block_mixed_16x8_forward_single_bit_depth_8_shader"
};
var forwardShaderSources = {
  1: forwardMultipleShaderSources(1),
  2: forwardMultipleShaderSources(2),
  3: forwardMultipleShaderSources(3),
  4: forwardMultipleShaderSources(4),
  5: forwardMultipleShaderSources(5),
  6: forwardMultipleShaderSources(6),
  7: forwardMultipleShaderSources(7),
  8: forwardMultipleShaderSources(8)
};
var forwardShaderNames = {
  1: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_1_shader",
  2: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_2_shader",
  3: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_3_shader",
  4: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_4_shader",
  5: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_5_shader",
  6: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_6_shader",
  7: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_7_shader",
  8: "pv_picollm_weight_block_mixed_16x8_forward_multiple_bit_depth_8_shader"
};
var forwardShuffleXShaderName = "pv_picollm_weight_block_mixed_16x8_forward_shuffle_x_shader";
var forwardShuffleYShaderName = "pv_picollm_weight_block_mixed_16x8_forward_shuffle_y_shader";
var addBiasShaderName = "pv_picollm_weight_block_mixed_16x8_add_bias_shader";
var forwardSingleReduceYShaderName = "pv_picollm_weight_block_mixed_16x8_forward_single_reduce_y_shader";

var _weightBlockMixed16x;
var loadPreprocessBlocksShader = function loadPreprocessBlocksShader(device, bitDepth) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight preprocess blocks ".concat(bitDepth, " bind group layout"),
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight preprocess blocks ".concat(bitDepth, " pipeline layout"),
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight preprocess blocks ".concat(bitDepth, " shader module"),
    code: preprocessShaderSources[bitDepth]
  });
  var computePipeline = device.createComputePipeline({
    label: "weight preprocess blocks ".concat(bitDepth, " pipeline"),
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: preprocessDim,
        workgroup_size_y: preprocessDim
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var loadForwardShuffleXShader = function loadForwardShuffleXShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight shuffle x bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 3,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight shuffle x pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight shuffle x shader module",
    code: forwardShuffleXShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "weight shuffle x pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_y: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var loadForwardSingleReduceYShader = function loadForwardSingleReduceYShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight single reduce y bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight single reduce y pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight single reduce y shader module",
    code: forwardSingleReduceYShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "weight single reduce y pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var loadForwardShuffleYShader = function loadForwardShuffleYShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight shuffle y bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight shuffle y pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight shuffle y shader module",
    code: forwardShuffleYShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "weight shuffle y pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var loadForwardSingleShader = function loadForwardSingleShader(device, bitDepth) {
  var entries = [{
    binding: 0,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'uniform'
    }
  }, {
    binding: 1,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }, {
    binding: 2,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }, {
    binding: 3,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }, {
    binding: 4,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'storage'
    }
  }];
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight forward single ".concat(bitDepth, " bind group layout"),
    entries: entries
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight forward single ".concat(bitDepth, " pipeline layout"),
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight forward single ".concat(bitDepth, " shader module"),
    code: forwardSingleShaderSources[bitDepth]
  });
  var computePipeline = device.createComputePipeline({
    label: "weight forward single ".concat(bitDepth, " pipeline"),
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: weightBlockSize,
        workgroup_size_y: 1
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var loadForwardShader = function loadForwardShader(device, bitDepth) {
  var entries = [{
    binding: 0,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'uniform'
    }
  }, {
    binding: 1,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }, {
    binding: 2,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }, {
    binding: 3,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'read-only-storage'
    }
  }, {
    binding: 4,
    visibility: GPUShaderStage.COMPUTE,
    buffer: {
      type: 'storage'
    }
  }];
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight forward multi ".concat(bitDepth, " bind group layout"),
    entries: entries
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight forward multi ".concat(bitDepth, " pipeline layout"),
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight forward multi ".concat(bitDepth, " shader module"),
    code: forwardShaderSources[bitDepth]
  });
  var computePipeline = device.createComputePipeline({
    label: "weight forward multi ".concat(bitDepth, " pipeline"),
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint,
      constants: {
        workgroup_size_x: TC
      }
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var loadAddBiasShader = function loadAddBiasShader(device) {
  var bindGroupLayout = device.createBindGroupLayout({
    label: "weight add bias bind group layout",
    entries: [{
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'uniform'
      }
    }, {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'read-only-storage'
      }
    }, {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage'
      }
    }]
  });
  var pipelineLayout = device.createPipelineLayout({
    label: "weight add bias pipeline layout",
    bindGroupLayouts: [bindGroupLayout]
  });
  var shaderModule = device.createShaderModule({
    label: "weight add bias shader module",
    code: addBiasShaderSource
  });
  var computePipeline = device.createComputePipeline({
    label: "weight add bias pipeline",
    layout: pipelineLayout,
    compute: {
      module: shaderModule,
      entryPoint: shaderEntryPoint
    }
  });
  return {
    computePipeline: computePipeline
  };
};
var weightBlockMixed16x8Shaders = (_weightBlockMixed16x = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_weightBlockMixed16x, preprocessShaderNames[3], function (device) {
  return loadPreprocessBlocksShader(device, 3);
}), preprocessShaderNames[5], function (device) {
  return loadPreprocessBlocksShader(device, 5);
}), preprocessShaderNames[6], function (device) {
  return loadPreprocessBlocksShader(device, 6);
}), preprocessShaderNames[7], function (device) {
  return loadPreprocessBlocksShader(device, 7);
}), forwardShuffleXShaderName, loadForwardShuffleXShader), forwardShuffleYShaderName, loadForwardShuffleYShader), forwardSingleReduceYShaderName, loadForwardSingleReduceYShader), forwardSingleShaderNames[1], function (device) {
  return loadForwardSingleShader(device, 1);
}), forwardSingleShaderNames[2], function (device) {
  return loadForwardSingleShader(device, 2);
}), forwardSingleShaderNames[3], function (device) {
  return loadForwardSingleShader(device, 3);
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_weightBlockMixed16x, forwardSingleShaderNames[4], function (device) {
  return loadForwardSingleShader(device, 4);
}), forwardSingleShaderNames[5], function (device) {
  return loadForwardSingleShader(device, 5);
}), forwardSingleShaderNames[6], function (device) {
  return loadForwardSingleShader(device, 6);
}), forwardSingleShaderNames[7], function (device) {
  return loadForwardSingleShader(device, 7);
}), forwardSingleShaderNames[8], function (device) {
  return loadForwardSingleShader(device, 8);
}), forwardShaderNames[1], function (device) {
  return loadForwardShader(device, 1);
}), forwardShaderNames[2], function (device) {
  return loadForwardShader(device, 2);
}), forwardShaderNames[3], function (device) {
  return loadForwardShader(device, 3);
}), forwardShaderNames[4], function (device) {
  return loadForwardShader(device, 4);
}), forwardShaderNames[5], function (device) {
  return loadForwardShader(device, 5);
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_weightBlockMixed16x, forwardShaderNames[6], function (device) {
  return loadForwardShader(device, 6);
}), forwardShaderNames[7], function (device) {
  return loadForwardShader(device, 7);
}), forwardShaderNames[8], function (device) {
  return loadForwardShader(device, 8);
}), addBiasShaderName, loadAddBiasShader));
var getPicollmWeightBlockMixed16x8WebGpuFunctions = function getPicollmWeightBlockMixed16x8WebGpuFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmPreprocessBlocksWebGpu = function pvPicollmPreprocessBlocksWebGpu(objAddress, bitDepth, blocksAddress, blocksOffsetBytes, nbr, nbc, statusAddress) {
    var _gpuBuffers$get;
    objAddress = unsignedAddress(objAddress);
    blocksAddress = unsignedAddress(blocksAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[preprocessShaderNames[bitDepth]];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var blocksBuffer = (_gpuBuffers$get = gpuBuffers.get(blocksAddress)) === null || _gpuBuffers$get === void 0 ? void 0 : _gpuBuffers$get.buffer;
    if (!blocksBuffer) {
      console.error('blocks buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(3 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight preprocess blocks ".concat(bitDepth, " arg buffer"));
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([nbr, nbc, blocksOffsetBytes / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight preprocess blocks ".concat(bitDepth, " bind group"),
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: blocksBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, preprocessShaderNames[bitDepth], Math.ceil(nbr / preprocessDim), Math.ceil(nbc / preprocessDim));
    setStatus(statusAddress, 0);
  };
  var pvPicollmForwardSingleShuffleXWebGpu = function pvPicollmForwardSingleShuffleXWebGpu(objAddress, xAddress, xOffsetBytes, indicesAddress, indicesOffsetBytes, shape1, yAddress, statusAddress) {
    var _gpuBuffers$get2, _gpuBuffers$get3, _gpuBuffers$get4;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    indicesAddress = unsignedAddress(indicesAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[forwardShuffleXShaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get2 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get2 === void 0 ? void 0 : _gpuBuffers$get2.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var indicesBuffer = (_gpuBuffers$get3 = gpuBuffers.get(indicesAddress)) === null || _gpuBuffers$get3 === void 0 ? void 0 : _gpuBuffers$get3.buffer;
    if (!indicesBuffer) {
      console.error('Indices buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get4 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get4 === void 0 ? void 0 : _gpuBuffers$get4.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(4 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight shuffle x arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([1, shape1, xOffsetBytes / 4, indicesOffsetBytes / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight forward single shuffle x bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: indicesBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, forwardShuffleXShaderName + "_single", 1, Math.ceil(shape1 / PV_PICOLLM_WEBGPU_DEFAULT_WORKGROUP_SIZE));
    setStatus(statusAddress, 0);
  };
  var pvPicollmForwardSingleWebGpu = function pvPicollmForwardSingleWebGpu(objAddress, bitDepth, xAddress, xOffsetBytes, metasAddress, metasOffsetBytes, blocksAddress, blocksOffsetBytes, nbr, totalNbc, bitDepthNbc, yAddress, yOffsetBytes, statusAddress) {
    var _gpuBuffers$get5, _gpuBuffers$get6, _gpuBuffers$get7, _gpuBuffers$get8;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    metasAddress = unsignedAddress(metasAddress);
    blocksAddress = unsignedAddress(blocksAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[forwardSingleShaderNames[bitDepth]];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get5 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get5 === void 0 ? void 0 : _gpuBuffers$get5.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var metasBuffer = (_gpuBuffers$get6 = gpuBuffers.get(metasAddress)) === null || _gpuBuffers$get6 === void 0 ? void 0 : _gpuBuffers$get6.buffer;
    if (!metasBuffer) {
      console.error('Metas buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var blocksBuffer = (_gpuBuffers$get7 = gpuBuffers.get(blocksAddress)) === null || _gpuBuffers$get7 === void 0 ? void 0 : _gpuBuffers$get7.buffer;
    if (!blocksBuffer) {
      console.error('Blocks buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get8 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get8 === void 0 ? void 0 : _gpuBuffers$get8.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(8 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight forward single ".concat(bitDepth, " arg buffer"));
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([1, nbr, totalNbc, bitDepthNbc, xOffsetBytes / 4, metasOffsetBytes / 4, blocksOffsetBytes / 4, yOffsetBytes / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var entries = [{
      binding: 0,
      resource: {
        buffer: argsBuffer
      }
    }, {
      binding: 1,
      resource: {
        buffer: xBuffer
      }
    }, {
      binding: 2,
      resource: {
        buffer: metasBuffer
      }
    }, {
      binding: 3,
      resource: {
        buffer: blocksBuffer
      }
    }, {
      binding: 4,
      resource: {
        buffer: yBuffer
      }
    }];
    var bindGroup = obj.device.createBindGroup({
      label: "weight forward single ".concat(bitDepth, " bind group"),
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: entries
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, forwardSingleShaderNames[bitDepth], Math.ceil(nbr * 4 / weightBlockSize), bitDepthNbc);
    setStatus(statusAddress, 0);
  };
  var pvPicollmForwardSingleReduceYWebGpu = function pvPicollmForwardSingleReduceYWebGpu(objAddress, nbr, nbc, xAddress, yAddress, statusAddress) {
    var _gpuBuffers$get9, _gpuBuffers$get10;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[forwardSingleReduceYShaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get9 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get9 === void 0 ? void 0 : _gpuBuffers$get9.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get10 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get10 === void 0 ? void 0 : _gpuBuffers$get10.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(2 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight single reduce y arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([nbr * 4, nbc]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight forward single reduce y bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, forwardSingleReduceYShaderName, Math.ceil(nbr * 4 / weightBlockSize));
    setStatus(statusAddress, 0);
  };
  var pvPicollmForwardMultipleShuffleXWebGpu = function pvPicollmForwardMultipleShuffleXWebGpu(objAddress, xAddress, xOffsetBytes, indicesAddress, indicesOffsetBytes, n, shape1, yAddress, statusAddress) {
    var _gpuBuffers$get11, _gpuBuffers$get12, _gpuBuffers$get13;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    indicesAddress = unsignedAddress(indicesAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[forwardShuffleXShaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get11 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get11 === void 0 ? void 0 : _gpuBuffers$get11.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var indicesBuffer = (_gpuBuffers$get12 = gpuBuffers.get(indicesAddress)) === null || _gpuBuffers$get12 === void 0 ? void 0 : _gpuBuffers$get12.buffer;
    if (!indicesBuffer) {
      console.error('Indices buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get13 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get13 === void 0 ? void 0 : _gpuBuffers$get13.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(4 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight multi shuffle x arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, shape1, xOffsetBytes / 4, indicesOffsetBytes / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight forward multiple shuffle x bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: indicesBuffer
        }
      }, {
        binding: 3,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, forwardShuffleXShaderName + "_multi", n, shape1);
    setStatus(statusAddress, 0);
  };
  var pvPicollmForwardMultipleWebGpu = function pvPicollmForwardMultipleWebGpu(objAddress, bitDepth, xAddress, xOffsetBytes, metasAddress, metasOffsetBytes, blocksAddress, blocksOffsetBytes, nbc, nbr, n, yAddress, yOffsetBytes, statusAddress) {
    var _gpuBuffers$get14, _gpuBuffers$get15, _gpuBuffers$get16, _gpuBuffers$get17;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    metasAddress = unsignedAddress(metasAddress);
    blocksAddress = unsignedAddress(blocksAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[forwardShaderNames[bitDepth]];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get14 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get14 === void 0 ? void 0 : _gpuBuffers$get14.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var metasBuffer = (_gpuBuffers$get15 = gpuBuffers.get(metasAddress)) === null || _gpuBuffers$get15 === void 0 ? void 0 : _gpuBuffers$get15.buffer;
    if (!metasBuffer) {
      console.error('Metas buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var blocksBuffer = (_gpuBuffers$get16 = gpuBuffers.get(blocksAddress)) === null || _gpuBuffers$get16 === void 0 ? void 0 : _gpuBuffers$get16.buffer;
    if (!blocksBuffer) {
      console.error('Blocks buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get17 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get17 === void 0 ? void 0 : _gpuBuffers$get17.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(8 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight forward multi ".concat(bitDepth, " arg buffer"));
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, nbr, 0, nbc, xOffsetBytes / 4, metasOffsetBytes / 4, blocksOffsetBytes / 4, yOffsetBytes / 4]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var entries = [{
      binding: 0,
      resource: {
        buffer: argsBuffer
      }
    }, {
      binding: 1,
      resource: {
        buffer: xBuffer
      }
    }, {
      binding: 2,
      resource: {
        buffer: metasBuffer
      }
    }, {
      binding: 3,
      resource: {
        buffer: blocksBuffer
      }
    }, {
      binding: 4,
      resource: {
        buffer: yBuffer
      }
    }];
    var bindGroup = obj.device.createBindGroup({
      label: "weight forward multi ".concat(bitDepth, " bind group"),
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: entries
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, forwardShaderNames[bitDepth], Math.ceil(nbr / BM), Math.ceil(n / BN));
    setStatus(statusAddress, 0);
  };
  var pvPicollmForwardMultipleShuffleYWebGpu = function pvPicollmForwardMultipleShuffleYWebGpu(objAddress, n, shape0, xAddress, yAddress, statusAddress) {
    var _gpuBuffers$get18, _gpuBuffers$get19;
    objAddress = unsignedAddress(objAddress);
    xAddress = unsignedAddress(xAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[forwardShuffleYShaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var xBuffer = (_gpuBuffers$get18 = gpuBuffers.get(xAddress)) === null || _gpuBuffers$get18 === void 0 ? void 0 : _gpuBuffers$get18.buffer;
    if (!xBuffer) {
      console.error('X buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get19 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get19 === void 0 ? void 0 : _gpuBuffers$get19.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(2 * Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight shuffle y arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([n, shape0]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight forward multiple shuffle y bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: xBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, forwardShuffleYShaderName, n, shape0);
    setStatus(statusAddress, 0);
  };
  var pvPicollmAddBiasWebGpu = function pvPicollmAddBiasWebGpu(objAddress, n, dimension, biasAddress, yAddress, statusAddress) {
    var _gpuBuffers$get20, _gpuBuffers$get21;
    objAddress = unsignedAddress(objAddress);
    biasAddress = unsignedAddress(biasAddress);
    yAddress = unsignedAddress(yAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj || !obj.device) {
      console.error('WebGPU device has not been initialized');
      setStatus(statusAddress, -1);
      return;
    }
    var shader = obj.shaders[addBiasShaderName];
    if (!shader) {
      console.error('Shader has not been loaded');
      setStatus(statusAddress, -1);
      return;
    }
    var biasBuffer = (_gpuBuffers$get20 = gpuBuffers.get(biasAddress)) === null || _gpuBuffers$get20 === void 0 ? void 0 : _gpuBuffers$get20.buffer;
    if (!biasBuffer) {
      console.error('Bias buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var yBuffer = (_gpuBuffers$get21 = gpuBuffers.get(yAddress)) === null || _gpuBuffers$get21 === void 0 ? void 0 : _gpuBuffers$get21.buffer;
    if (!yBuffer) {
      console.error('Y buffer has not been allocated');
      setStatus(statusAddress, -1);
      return;
    }
    var argsBuffer = obj.getBuffer(Uint32Array.BYTES_PER_ELEMENT, GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, false, "weight add bias arg buffer");
    obj.device.queue.writeBuffer(argsBuffer, 0, new Uint32Array([dimension]));
    obj.scheduleUniformBufferForRelease(argsBuffer);
    var bindGroup = obj.device.createBindGroup({
      label: "weight add bias bind group",
      layout: shader.computePipeline.getBindGroupLayout(0),
      entries: [{
        binding: 0,
        resource: {
          buffer: argsBuffer
        }
      }, {
        binding: 1,
        resource: {
          buffer: biasBuffer
        }
      }, {
        binding: 2,
        resource: {
          buffer: yBuffer
        }
      }]
    });
    obj.dispatchComputerShader(bindGroup, shader.computePipeline, addBiasShaderName, n, dimension);
    setStatus(statusAddress, 0);
  };
  return {
    pv_picollm_weight_block_mixed_16x8_preprocess_blocks_webgpu_wasm: pvPicollmPreprocessBlocksWebGpu,
    pv_picollm_weight_block_mixed_16x8_forward_single_shuffle_x_webgpu_wasm: pvPicollmForwardSingleShuffleXWebGpu,
    pv_picollm_weight_block_mixed_16x8_forward_single_webgpu_wasm: pvPicollmForwardSingleWebGpu,
    pv_picollm_weight_block_mixed_16x8_forward_single_reduce_y_webgpu_wasm: pvPicollmForwardSingleReduceYWebGpu,
    pv_picollm_weight_block_mixed_16x8_forward_multiple_shuffle_x_webgpu_wasm: pvPicollmForwardMultipleShuffleXWebGpu,
    pv_picollm_weight_block_mixed_16x8_forward_multiple_webgpu_wasm: pvPicollmForwardMultipleWebGpu,
    pv_picollm_weight_block_mixed_16x8_forward_multiple_shuffle_y_webgpu_wasm: pvPicollmForwardMultipleShuffleYWebGpu,
    pv_picollm_weight_block_mixed_16x8_add_bias_webgpu_wasm: pvPicollmAddBiasWebGpu
  };
};

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var shaders = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, attentionShaders), feedForwardShaders), gateForwardShader), moeTransformerForwardShaders), normForwardShader), normLayerForwardShader), transformerForwardShaders), weightFloatForwardShader), weightBlockMixed16x8Shaders);
function arrayBufferToStringAtIndex(arrayBuffer, indexStart) {
  var indexEnd = indexStart;
  while (arrayBuffer[indexEnd] !== 0) {
    indexEnd++;
  }
  var utf8decoder = new TextDecoder('utf-8');
  return utf8decoder.decode(arrayBuffer.subarray(indexStart, indexEnd));
}
var initXpu = function initXpu(memory, _wasm) {
  var setInt = function setInt(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvXpuDeviceInit = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, statusAddress) {
      var adapter, device, adapterInfo;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            statusAddress = unsignedAddress(statusAddress);
            _context.prev = 2;
            if (!(typeof window !== "undefined" && !window.isSecureContext)) {
              _context.next = 7;
              break;
            }
            console.error('WebGPU is only available in secure contexts (e.g. HTTPS)');
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 7:
            if (navigator.gpu) {
              _context.next = 11;
              break;
            }
            console.error('WebGPU not supported.');
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 11:
            _context.next = 13;
            return navigator.gpu.requestAdapter();
          case 13:
            adapter = _context.sent;
            if (adapter) {
              _context.next = 18;
              break;
            }
            console.error('WebGPU not supported, please enable it in your browser.');
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 18:
            _context.next = 20;
            return adapter.requestDevice({
              requiredFeatures: ["timestamp-query"],
              requiredLimits: {
                maxBufferSize: 1073741824,
                maxStorageBufferBindingSize: 1073741824
              }
            });
          case 20:
            device = _context.sent;
            if (device) {
              _context.next = 25;
              break;
            }
            console.error('Could not find a compatible WebGPU device.');
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 25:
            _context.next = 27;
            return adapter.requestAdapterInfo();
          case 27:
            adapterInfo = _context.sent;
            if (adapterInfo) {
              _context.next = 32;
              break;
            }
            console.error('Could not retrieve WebGPU adapter info.');
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 32:
            gpuDevices.set(objAddress, new PvWebGPUDevice(device, adapterInfo));
            setInt(statusAddress, 0);
            _context.next = 40;
            break;
          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0);
            setInt(statusAddress, -1);
          case 40:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 36]]);
    }));
    return function pvXpuDeviceInit(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvXpuDeviceInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, browserNameAddressAddress, browserVersionAddressAddress, osNameAddressAddress, deviceArchitectureAddressAddress, deviceVendorAddressAddress, maxBufferSizeAddress, maxComputeWorkgroupStorageSizeAddress, maxComputeInvocationsPerWorkgroupAddress, statusAddress) {
      var obj, aligned_alloc, uaParser, memoryBufferUint8, browserName, browserNameAddress, i, browserVersion, browserVersionAddress, _i, osName, osNameAddress, _i2, deviceArchitecture, deviceArchitectureAddress, _i3, deviceVendor, deviceVendorAddress, _i4;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            browserNameAddressAddress = unsignedAddress(browserNameAddressAddress);
            browserVersionAddressAddress = unsignedAddress(browserVersionAddressAddress);
            osNameAddressAddress = unsignedAddress(osNameAddressAddress);
            deviceArchitectureAddressAddress = unsignedAddress(deviceArchitectureAddressAddress);
            deviceVendorAddressAddress = unsignedAddress(deviceVendorAddressAddress);
            maxBufferSizeAddress = unsignedAddress(maxBufferSizeAddress);
            maxComputeWorkgroupStorageSizeAddress = unsignedAddress(maxComputeWorkgroupStorageSizeAddress);
            maxComputeInvocationsPerWorkgroupAddress = unsignedAddress(maxComputeInvocationsPerWorkgroupAddress);
            statusAddress = unsignedAddress(statusAddress);
            _context2.prev = 10;
            obj = gpuDevices.get(objAddress);
            if (obj) {
              _context2.next = 16;
              break;
            }
            console.error('WebGPU device has not been initialized');
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 16:
            aligned_alloc = imports.aligned_alloc;
            uaParser = Bowser.getParser(navigator.userAgent);
            memoryBufferUint8 = new Uint8Array(memory.buffer);
            browserName = uaParser.getBrowserName();
            _context2.next = 22;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (browserName.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 22:
            browserNameAddress = _context2.sent;
            if (!(browserNameAddress === 0)) {
              _context2.next = 26;
              break;
            }
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 26:
            setInt(browserNameAddressAddress, browserNameAddress);
            for (i = 0; i < browserName.length; i++) {
              memoryBufferUint8[browserNameAddress + i] = browserName.charCodeAt(i);
            }
            memoryBufferUint8[browserNameAddress + browserName.length] = 0;
            browserVersion = uaParser.getBrowserVersion();
            _context2.next = 32;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (browserVersion.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 32:
            browserVersionAddress = _context2.sent;
            if (!(browserVersionAddress === 0)) {
              _context2.next = 36;
              break;
            }
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 36:
            setInt(browserVersionAddressAddress, browserVersionAddress);
            for (_i = 0; _i < browserVersion.length; _i++) {
              memoryBufferUint8[browserVersionAddress + _i] = browserVersion.charCodeAt(_i);
            }
            memoryBufferUint8[browserVersionAddress + browserVersion.length] = 0;
            osName = uaParser.getOSName();
            _context2.next = 42;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (osName.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 42:
            osNameAddress = _context2.sent;
            if (!(osNameAddress === 0)) {
              _context2.next = 46;
              break;
            }
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 46:
            setInt(osNameAddressAddress, osNameAddress);
            for (_i2 = 0; _i2 < osName.length; _i2++) {
              memoryBufferUint8[osNameAddress + _i2] = osName.charCodeAt(_i2);
            }
            memoryBufferUint8[osNameAddress + osName.length] = 0;
            deviceArchitecture = obj.adapterInfo.architecture;
            _context2.next = 52;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (deviceArchitecture.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 52:
            deviceArchitectureAddress = _context2.sent;
            if (!(deviceArchitectureAddress === 0)) {
              _context2.next = 56;
              break;
            }
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 56:
            setInt(deviceArchitectureAddressAddress, deviceArchitectureAddress);
            for (_i3 = 0; _i3 < deviceArchitecture.length; _i3++) {
              memoryBufferUint8[deviceArchitectureAddress + _i3] = deviceArchitecture.charCodeAt(_i3);
            }
            memoryBufferUint8[deviceArchitectureAddress + deviceArchitecture.length] = 0;
            deviceVendor = obj.adapterInfo.vendor;
            _context2.next = 62;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (deviceVendor.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 62:
            deviceVendorAddress = _context2.sent;
            if (!(deviceVendorAddress === 0)) {
              _context2.next = 66;
              break;
            }
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 66:
            setInt(deviceVendorAddressAddress, deviceVendorAddress);
            for (_i4 = 0; _i4 < deviceVendor.length; _i4++) {
              memoryBufferUint8[deviceVendorAddress + _i4] = deviceVendor.charCodeAt(_i4);
            }
            memoryBufferUint8[deviceVendorAddress + deviceVendor.length] = 0;
            setInt(maxBufferSizeAddress, obj.device.limits.maxBufferSize);
            setInt(maxComputeWorkgroupStorageSizeAddress, obj.device.limits.maxComputeWorkgroupStorageSize);
            setInt(maxComputeInvocationsPerWorkgroupAddress, obj.device.limits.maxComputeInvocationsPerWorkgroup);
            setInt(statusAddress, 0);
            _context2.next = 79;
            break;
          case 75:
            _context2.prev = 75;
            _context2.t0 = _context2["catch"](10);
            console.error(_context2.t0);
            setInt(statusAddress, -1);
          case 79:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[10, 75]]);
    }));
    return function pvXpuDeviceInfo(_x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12) {
      return _ref2.apply(this, arguments);
    };
  }();
  var pvXpuDeviceCleanup = function pvXpuDeviceCleanup(objAddress) {
    objAddress = unsignedAddress(objAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj) {
      return;
    }
    gpuDevices["delete"](objAddress);
  };
  var pvXpuDeviceLoadShaderFunc = function pvXpuDeviceLoadShaderFunc(objAddress, shaderNameAddress, statusAddress) {
    objAddress = unsignedAddress(objAddress);
    shaderNameAddress = unsignedAddress(shaderNameAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj) {
      console.error('WebGPU device has not been initialized');
      setInt(statusAddress, -1);
      return;
    }
    var memoryBufferUint8 = new Uint8Array(memory.buffer);
    var shaderName = arrayBufferToStringAtIndex(memoryBufferUint8, shaderNameAddress);
    if (!shaders[shaderName]) {
      console.error("WebGPU device could not find shader with name ".concat(shaderName));
      setInt(statusAddress, -1);
      return;
    }
    var shaderLoadFunc = shaders[shaderName];
    obj.shaders[shaderName] = shaderLoadFunc(obj.device);
    setInt(statusAddress, 0);
  };
  var pvXpuDeviceWait = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, statusAddress) {
      var obj;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = gpuDevices.get(objAddress);
            if (obj) {
              _context3.next = 6;
              break;
            }
            setInt(statusAddress, -1);
            return _context3.abrupt("return");
          case 6:
            _context3.next = 8;
            return obj.sync();
          case 8:
            setInt(statusAddress, 0);
          case 9:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function pvXpuDeviceWait(_x13, _x14) {
      return _ref3.apply(this, arguments);
    };
  }();
  var pvXpuDeviceMemAlloc = function pvXpuDeviceMemAlloc(objAddress, memAddress, sizeBytes, isOutput, statusAddress) {
    objAddress = unsignedAddress(objAddress);
    memAddress = unsignedAddress(memAddress);
    statusAddress = unsignedAddress(statusAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj) {
      console.error('WebGPU device has not been initialized');
      setInt(statusAddress, -1);
      return;
    }
    var usage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST;
    if (isOutput) {
      usage |= GPUBufferUsage.COPY_SRC;
    }
    gpuBuffers.set(memAddress, {
      deviceAddress: objAddress,
      buffer: obj.getBuffer(sizeBytes, usage)
    });
    setInt(statusAddress, 0);
  };
  var pvXpuDeviceMemFree = function pvXpuDeviceMemFree(memAddress) {
    memAddress = unsignedAddress(memAddress);
    if (gpuBuffers.has(memAddress)) {
      var gpuBuffer = gpuBuffers.get(memAddress);
      if (!gpuBuffer || !gpuBuffer.buffer || !gpuBuffer.deviceAddress) {
        console.error('GPU buffer has not been allocated');
        return;
      }
      var obj = gpuDevices.get(gpuBuffer.deviceAddress);
      if (!obj) {
        console.error('WebGPU device has not been initialized');
        return;
      }
      obj.releaseBuffer(gpuBuffer.buffer);
      gpuBuffers["delete"](memAddress);
    }
  };
  var pvXpuDeviceMemCopyToXpu = function pvXpuDeviceMemCopyToXpu(memAddress, hostAddress, offset, sizeBytes) {
    memAddress = unsignedAddress(memAddress);
    hostAddress = unsignedAddress(hostAddress);
    if (hostAddress < 0) {
      console.error('Invalid host address', memAddress, hostAddress, offset, sizeBytes);
      return;
    }
    var gpuBuffer = gpuBuffers.get(memAddress);
    if (!gpuBuffer || !gpuBuffer.buffer || !gpuBuffer.deviceAddress) {
      console.error('GPU buffer has not been allocated');
      return;
    }
    var obj = gpuDevices.get(gpuBuffer.deviceAddress);
    if (!obj) {
      console.error('WebGPU device has not been initialized');
      return;
    }
    var memoryBufferUint8 = new Uint8Array(memory.buffer);
    obj.writeBuffer(sizeBytes, offset, memoryBufferUint8.slice(hostAddress, hostAddress + sizeBytes), gpuBuffer.buffer);
  };
  var pvXpuDeviceMemCopyFromXpu = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(memAddress, hostAddress, offset, sizeBytes) {
      var gpuBuffer, obj, stageBuffer, mappedBuffer, memoryBufferUint8;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            memAddress = unsignedAddress(memAddress);
            hostAddress = unsignedAddress(hostAddress);
            if (!(hostAddress < 0)) {
              _context4.next = 5;
              break;
            }
            console.error('Invalid host address', memAddress, hostAddress, offset, sizeBytes);
            return _context4.abrupt("return");
          case 5:
            gpuBuffer = gpuBuffers.get(memAddress);
            if (gpuBuffer !== null && gpuBuffer !== void 0 && gpuBuffer.buffer) {
              _context4.next = 9;
              break;
            }
            console.error('GPU buffer has not been allocated');
            return _context4.abrupt("return");
          case 9:
            obj = gpuDevices.get(gpuBuffer.deviceAddress);
            if (obj) {
              _context4.next = 13;
              break;
            }
            console.error('WebGPU device has not been initialized');
            return _context4.abrupt("return");
          case 13:
            stageBuffer = obj.getBuffer((offset + sizeBytes) * Uint8Array.BYTES_PER_ELEMENT, GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST);
            obj.endComputePass();
            obj.commandEncoder.copyBufferToBuffer(gpuBuffer.buffer, 0, stageBuffer, 0, stageBuffer.size);
            _context4.next = 18;
            return obj.sync();
          case 18:
            _context4.next = 20;
            return stageBuffer.mapAsync(GPUMapMode.READ, 0, sizeBytes + offset);
          case 20:
            mappedBuffer = new Uint8Array(stageBuffer.getMappedRange(0, sizeBytes + offset));
            memoryBufferUint8 = new Uint8Array(memory.buffer);
            memoryBufferUint8.set(mappedBuffer.slice(offset, sizeBytes + offset), hostAddress);
            stageBuffer.unmap();
            obj.releaseBuffer(stageBuffer);
          case 25:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function pvXpuDeviceMemCopyFromXpu(_x15, _x16, _x17, _x18) {
      return _ref4.apply(this, arguments);
    };
  }();
  var pvXpuDeviceMemMemset = function pvXpuDeviceMemMemset(memAddress, fillByte, sizeBytes) {
    memAddress = unsignedAddress(memAddress);
    var gpuBuffer = gpuBuffers.get(memAddress);
    if (!gpuBuffer || !gpuBuffer.buffer || !gpuBuffer.deviceAddress) {
      console.error('GPU buffer has not been allocated');
      return;
    }
    var obj = gpuDevices.get(gpuBuffer.deviceAddress);
    if (!obj) {
      console.error('WebGPU device has not been initialized');
      return;
    }
    if (fillByte === 0) {
      obj.endComputePass();
      obj.commandEncoder.clearBuffer(gpuBuffer.buffer, 0, sizeBytes);
      obj.numCommandsEncoded++;
    } else {
      var stagingBuffer = new Uint8Array(sizeBytes);
      stagingBuffer.fill(fillByte);
      obj.writeBuffer(sizeBytes, 0, stagingBuffer, gpuBuffer.buffer);
    }
  };
  var pvXpuDeviceTimerStart = function pvXpuDeviceTimerStart(objAddress) {
    objAddress = unsignedAddress(objAddress);
    var obj = gpuDevices.get(objAddress);
    if (!obj) {
      console.error('WebGPU device has not been initialized');
      return;
    }
    obj.isTimerEnabled = true;
  };
  var pvXpuDeviceTimerStop = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(objAddress) {
      var obj;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            obj = gpuDevices.get(objAddress);
            if (obj) {
              _context5.next = 5;
              break;
            }
            console.error('WebGPU device has not been initialized');
            return _context5.abrupt("return");
          case 5:
            _context5.next = 7;
            return obj.sync();
          case 7:
            obj.reportShaderTimes();
          case 8:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function pvXpuDeviceTimerStop(_x19) {
      return _ref5.apply(this, arguments);
    };
  }();
  var imports = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
    aligned_alloc: function aligned_alloc(alignment, size) {
      throw new Error("aligned_alloc was not passed in from parent module");
    },
    pv_xpu_webgpu_device_init_wasm: pvXpuDeviceInit,
    pv_xpu_webgpu_device_info_wasm: pvXpuDeviceInfo,
    pv_xpu_webgpu_device_cleanup_wasm: pvXpuDeviceCleanup,
    pv_xpu_webgpu_device_load_shader_func_wasm: pvXpuDeviceLoadShaderFunc,
    pv_xpu_webgpu_device_wait_wasm: pvXpuDeviceWait,
    pv_xpu_webgpu_device_mem_alloc_wasm: pvXpuDeviceMemAlloc,
    pv_xpu_webgpu_device_mem_free_wasm: pvXpuDeviceMemFree,
    pv_xpu_webgpu_device_mem_copy_to_xpu_wasm: pvXpuDeviceMemCopyToXpu,
    pv_xpu_webgpu_device_mem_copy_from_xpu_wasm: pvXpuDeviceMemCopyFromXpu,
    pv_xpu_webgpu_device_mem_memset_wasm: pvXpuDeviceMemMemset,
    pv_xpu_webgpu_timer_start_wasm: pvXpuDeviceTimerStart,
    pv_xpu_webgpu_timer_stop_wasm: pvXpuDeviceTimerStop
  }, getPicollmAttentionWebGpuFunctions(memory)), getPicollmGateWebGpuFunctions(memory)), getPicollmFeedForwardWebGpuFunctions(memory)), getPicollmMoeTransformerWebGpuFunctions(memory)), getPicollmNormLayerWebGpuFunctions(memory)), getPicollmNormWebGpuFunctions(memory)), getPicollmTransformerWebGpuFunctions(memory)), getPicollmWeightFloatWebGpuFunctions(memory)), getPicollmWeightBlockMixed16x8WebGpuFunctions(memory));
  return imports;
};

export { initXpu as default };
