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

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
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

function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
        var binaryView = new Uint8Array(binaryString.length);
        for (var i = 0, n = binaryString.length; i < n; ++i) {
            binaryView[i] = binaryString.charCodeAt(i);
        }
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
        url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
        return new Worker(url, options);
    };
}

var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgZnVuY3Rpb24gX3R5cGVvZiQzKG8pIHsKICAgICJAYmFiZWwvaGVscGVycyAtIHR5cGVvZiI7CgogICAgcmV0dXJuIF90eXBlb2YkMyA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiAic3ltYm9sIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsKICAgICAgcmV0dXJuIHR5cGVvZiBvOwogICAgfSA6IGZ1bmN0aW9uIChvKSB7CiAgICAgIHJldHVybiBvICYmICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/ICJzeW1ib2wiIDogdHlwZW9mIG87CiAgICB9LCBfdHlwZW9mJDMobyk7CiAgfQoKICBmdW5jdGlvbiB0b1ByaW1pdGl2ZSh0LCByKSB7CiAgICBpZiAoIm9iamVjdCIgIT0gX3R5cGVvZiQzKHQpIHx8ICF0KSByZXR1cm4gdDsKICAgIHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOwogICAgaWYgKHZvaWQgMCAhPT0gZSkgewogICAgICB2YXIgaSA9IGUuY2FsbCh0LCByIHx8ICJkZWZhdWx0Iik7CiAgICAgIGlmICgib2JqZWN0IiAhPSBfdHlwZW9mJDMoaSkpIHJldHVybiBpOwogICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLiIpOwogICAgfQogICAgcmV0dXJuICgic3RyaW5nIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7CiAgfQoKICBmdW5jdGlvbiB0b1Byb3BlcnR5S2V5KHQpIHsKICAgIHZhciBpID0gdG9QcmltaXRpdmUodCwgInN0cmluZyIpOwogICAgcmV0dXJuICJzeW1ib2wiID09IF90eXBlb2YkMyhpKSA/IGkgOiBTdHJpbmcoaSk7CiAgfQoKICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7CiAgICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7CiAgICBpZiAoa2V5IGluIG9iaikgewogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsKICAgICAgICB2YWx1ZTogdmFsdWUsCiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICBjb25maWd1cmFibGU6IHRydWUsCiAgICAgICAgd3JpdGFibGU6IHRydWUKICAgICAgfSk7CiAgICB9IGVsc2UgewogICAgICBvYmpba2V5XSA9IHZhbHVlOwogICAgfQogICAgcmV0dXJuIG9iajsKICB9CgogIGZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHsKICAgIHRyeSB7CiAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsKICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsKICAgIH0gY2F0Y2ggKGVycm9yKSB7CiAgICAgIHJlamVjdChlcnJvcik7CiAgICAgIHJldHVybjsKICAgIH0KICAgIGlmIChpbmZvLmRvbmUpIHsKICAgICAgcmVzb2x2ZSh2YWx1ZSk7CiAgICB9IGVsc2UgewogICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7CiAgICB9CiAgfQogIGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7CiAgICByZXR1cm4gZnVuY3Rpb24gKCkgewogICAgICB2YXIgc2VsZiA9IHRoaXMsCiAgICAgICAgYXJncyA9IGFyZ3VtZW50czsKICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7CiAgICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHsKICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgIm5leHQiLCB2YWx1ZSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHsKICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgInRocm93IiwgZXJyKTsKICAgICAgICB9CiAgICAgICAgX25leHQodW5kZWZpbmVkKTsKICAgICAgfSk7CiAgICB9OwogIH0KCiAgZnVuY3Rpb24gZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMkMSAoeCkgewogIAlyZXR1cm4geCAmJiB4Ll9fZXNNb2R1bGUgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdkZWZhdWx0JykgPyB4WydkZWZhdWx0J10gOiB4OwogIH0KCiAgdmFyIHJlZ2VuZXJhdG9yUnVudGltZSQyID0ge2V4cG9ydHM6IHt9fTsKCiAgdmFyIF90eXBlb2YkMiA9IHtleHBvcnRzOiB7fX07CgogIF90eXBlb2YkMi5leHBvcnRzOwoKICAoZnVuY3Rpb24gKG1vZHVsZSkgewogIAlmdW5jdGlvbiBfdHlwZW9mKG8pIHsKICAJICAiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2YiOwoKICAJICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiAic3ltYm9sIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsKICAJICAgIHJldHVybiB0eXBlb2YgbzsKICAJICB9IDogZnVuY3Rpb24gKG8pIHsKICAJICAgIHJldHVybiBvICYmICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/ICJzeW1ib2wiIDogdHlwZW9mIG87CiAgCSAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzWyJkZWZhdWx0Il0gPSBtb2R1bGUuZXhwb3J0cyksIF90eXBlb2Yobyk7CiAgCX0KICAJbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbImRlZmF1bHQiXSA9IG1vZHVsZS5leHBvcnRzOyAKICB9IChfdHlwZW9mJDIpKTsKCiAgdmFyIF90eXBlb2ZFeHBvcnRzJDEgPSBfdHlwZW9mJDIuZXhwb3J0czsKCiAgcmVnZW5lcmF0b3JSdW50aW1lJDIuZXhwb3J0czsKCiAgKGZ1bmN0aW9uIChtb2R1bGUpIHsKICAJdmFyIF90eXBlb2YgPSBfdHlwZW9mRXhwb3J0cyQxWyJkZWZhdWx0Il07CiAgCWZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7CiAgCSAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHsKICAJICAgIHJldHVybiBlOwogIAkgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1siZGVmYXVsdCJdID0gbW9kdWxlLmV4cG9ydHM7CiAgCSAgdmFyIHQsCiAgCSAgICBlID0ge30sCiAgCSAgICByID0gT2JqZWN0LnByb3RvdHlwZSwKICAJICAgIG4gPSByLmhhc093blByb3BlcnR5LAogIAkgICAgbyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAodCwgZSwgcikgewogIAkgICAgICB0W2VdID0gci52YWx1ZTsKICAJICAgIH0sCiAgCSAgICBpID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sCiAgCSAgICBhID0gaS5pdGVyYXRvciB8fCAiQEBpdGVyYXRvciIsCiAgCSAgICBjID0gaS5hc3luY0l0ZXJhdG9yIHx8ICJAQGFzeW5jSXRlcmF0b3IiLAogIAkgICAgdSA9IGkudG9TdHJpbmdUYWcgfHwgIkBAdG9TdHJpbmdUYWciOwogIAkgIGZ1bmN0aW9uIGRlZmluZSh0LCBlLCByKSB7CiAgCSAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIGUsIHsKICAJICAgICAgdmFsdWU6IHIsCiAgCSAgICAgIGVudW1lcmFibGU6ICEwLAogIAkgICAgICBjb25maWd1cmFibGU6ICEwLAogIAkgICAgICB3cml0YWJsZTogITAKICAJICAgIH0pLCB0W2VdOwogIAkgIH0KICAJICB0cnkgewogIAkgICAgZGVmaW5lKHt9LCAiIik7CiAgCSAgfSBjYXRjaCAodCkgewogIAkgICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKHQsIGUsIHIpIHsKICAJICAgICAgcmV0dXJuIHRbZV0gPSByOwogIAkgICAgfTsKICAJICB9CiAgCSAgZnVuY3Rpb24gd3JhcCh0LCBlLCByLCBuKSB7CiAgCSAgICB2YXIgaSA9IGUgJiYgZS5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBlIDogR2VuZXJhdG9yLAogIAkgICAgICBhID0gT2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksCiAgCSAgICAgIGMgPSBuZXcgQ29udGV4dChuIHx8IFtdKTsKICAJICAgIHJldHVybiBvKGEsICJfaW52b2tlIiwgewogIAkgICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZCh0LCByLCBjKQogIAkgICAgfSksIGE7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIHRyeUNhdGNoKHQsIGUsIHIpIHsKICAJICAgIHRyeSB7CiAgCSAgICAgIHJldHVybiB7CiAgCSAgICAgICAgdHlwZTogIm5vcm1hbCIsCiAgCSAgICAgICAgYXJnOiB0LmNhbGwoZSwgcikKICAJICAgICAgfTsKICAJICAgIH0gY2F0Y2ggKHQpIHsKICAJICAgICAgcmV0dXJuIHsKICAJICAgICAgICB0eXBlOiAidGhyb3ciLAogIAkgICAgICAgIGFyZzogdAogIAkgICAgICB9OwogIAkgICAgfQogIAkgIH0KICAJICBlLndyYXAgPSB3cmFwOwogIAkgIHZhciBoID0gInN1c3BlbmRlZFN0YXJ0IiwKICAJICAgIGwgPSAic3VzcGVuZGVkWWllbGQiLAogIAkgICAgZiA9ICJleGVjdXRpbmciLAogIAkgICAgcyA9ICJjb21wbGV0ZWQiLAogIAkgICAgeSA9IHt9OwogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9CiAgCSAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fQogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30KICAJICB2YXIgcCA9IHt9OwogIAkgIGRlZmluZShwLCBhLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gdGhpczsKICAJICB9KTsKICAJICB2YXIgZCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiwKICAJICAgIHYgPSBkICYmIGQoZCh2YWx1ZXMoW10pKSk7CiAgCSAgdiAmJiB2ICE9PSByICYmIG4uY2FsbCh2LCBhKSAmJiAocCA9IHYpOwogIAkgIHZhciBnID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocCk7CiAgCSAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHQpIHsKICAJICAgIFsibmV4dCIsICJ0aHJvdyIsICJyZXR1cm4iXS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7CiAgCSAgICAgIGRlZmluZSh0LCBlLCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UoZSwgdCk7CiAgCSAgICAgIH0pOwogIAkgICAgfSk7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IodCwgZSkgewogIAkgICAgZnVuY3Rpb24gaW52b2tlKHIsIG8sIGksIGEpIHsKICAJICAgICAgdmFyIGMgPSB0cnlDYXRjaCh0W3JdLCB0LCBvKTsKICAJICAgICAgaWYgKCJ0aHJvdyIgIT09IGMudHlwZSkgewogIAkgICAgICAgIHZhciB1ID0gYy5hcmcsCiAgCSAgICAgICAgICBoID0gdS52YWx1ZTsKICAJICAgICAgICByZXR1cm4gaCAmJiAib2JqZWN0IiA9PSBfdHlwZW9mKGgpICYmIG4uY2FsbChoLCAiX19hd2FpdCIpID8gZS5yZXNvbHZlKGguX19hd2FpdCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgaW52b2tlKCJuZXh0IiwgdCwgaSwgYSk7CiAgCSAgICAgICAgfSwgZnVuY3Rpb24gKHQpIHsKICAJICAgICAgICAgIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KSA6IGUucmVzb2x2ZShoKS50aGVuKGZ1bmN0aW9uICh0KSB7CiAgCSAgICAgICAgICB1LnZhbHVlID0gdCwgaSh1KTsKICAJICAgICAgICB9LCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgcmV0dXJuIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KTsKICAJICAgICAgfQogIAkgICAgICBhKGMuYXJnKTsKICAJICAgIH0KICAJICAgIHZhciByOwogIAkgICAgbyh0aGlzLCAiX2ludm9rZSIsIHsKICAJICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHQsIG4pIHsKICAJICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHsKICAJICAgICAgICAgIHJldHVybiBuZXcgZShmdW5jdGlvbiAoZSwgcikgewogIAkgICAgICAgICAgICBpbnZva2UodCwgbiwgZSwgcik7CiAgCSAgICAgICAgICB9KTsKICAJICAgICAgICB9CiAgCSAgICAgICAgcmV0dXJuIHIgPSByID8gci50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpOwogIAkgICAgICB9CiAgCSAgICB9KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChlLCByLCBuKSB7CiAgCSAgICB2YXIgbyA9IGg7CiAgCSAgICByZXR1cm4gZnVuY3Rpb24gKGksIGEpIHsKICAJICAgICAgaWYgKG8gPT09IGYpIHRocm93IG5ldyBFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZyIpOwogIAkgICAgICBpZiAobyA9PT0gcykgewogIAkgICAgICAgIGlmICgidGhyb3ciID09PSBpKSB0aHJvdyBhOwogIAkgICAgICAgIHJldHVybiB7CiAgCSAgICAgICAgICB2YWx1ZTogdCwKICAJICAgICAgICAgIGRvbmU6ICEwCiAgCSAgICAgICAgfTsKICAJICAgICAgfQogIAkgICAgICBmb3IgKG4ubWV0aG9kID0gaSwgbi5hcmcgPSBhOzspIHsKICAJICAgICAgICB2YXIgYyA9IG4uZGVsZWdhdGU7CiAgCSAgICAgICAgaWYgKGMpIHsKICAJICAgICAgICAgIHZhciB1ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShjLCBuKTsKICAJICAgICAgICAgIGlmICh1KSB7CiAgCSAgICAgICAgICAgIGlmICh1ID09PSB5KSBjb250aW51ZTsKICAJICAgICAgICAgICAgcmV0dXJuIHU7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICAgIGlmICgibmV4dCIgPT09IG4ubWV0aG9kKSBuLnNlbnQgPSBuLl9zZW50ID0gbi5hcmc7ZWxzZSBpZiAoInRocm93IiA9PT0gbi5tZXRob2QpIHsKICAJICAgICAgICAgIGlmIChvID09PSBoKSB0aHJvdyBvID0gcywgbi5hcmc7CiAgCSAgICAgICAgICBuLmRpc3BhdGNoRXhjZXB0aW9uKG4uYXJnKTsKICAJICAgICAgICB9IGVsc2UgInJldHVybiIgPT09IG4ubWV0aG9kICYmIG4uYWJydXB0KCJyZXR1cm4iLCBuLmFyZyk7CiAgCSAgICAgICAgbyA9IGY7CiAgCSAgICAgICAgdmFyIHAgPSB0cnlDYXRjaChlLCByLCBuKTsKICAJICAgICAgICBpZiAoIm5vcm1hbCIgPT09IHAudHlwZSkgewogIAkgICAgICAgICAgaWYgKG8gPSBuLmRvbmUgPyBzIDogbCwgcC5hcmcgPT09IHkpIGNvbnRpbnVlOwogIAkgICAgICAgICAgcmV0dXJuIHsKICAJICAgICAgICAgICAgdmFsdWU6IHAuYXJnLAogIAkgICAgICAgICAgICBkb25lOiBuLmRvbmUKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgfQogIAkgICAgICAgICJ0aHJvdyIgPT09IHAudHlwZSAmJiAobyA9IHMsIG4ubWV0aG9kID0gInRocm93Iiwgbi5hcmcgPSBwLmFyZyk7CiAgCSAgICAgIH0KICAJICAgIH07CiAgCSAgfQogIAkgIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgcikgewogIAkgICAgdmFyIG4gPSByLm1ldGhvZCwKICAJICAgICAgbyA9IGUuaXRlcmF0b3Jbbl07CiAgCSAgICBpZiAobyA9PT0gdCkgcmV0dXJuIHIuZGVsZWdhdGUgPSBudWxsLCAidGhyb3ciID09PSBuICYmIGUuaXRlcmF0b3JbInJldHVybiJdICYmIChyLm1ldGhvZCA9ICJyZXR1cm4iLCByLmFyZyA9IHQsIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgciksICJ0aHJvdyIgPT09IHIubWV0aG9kKSB8fCAicmV0dXJuIiAhPT0gbiAmJiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJyIgKyBuICsgIicgbWV0aG9kIikpLCB5OwogIAkgICAgdmFyIGkgPSB0cnlDYXRjaChvLCBlLml0ZXJhdG9yLCByLmFyZyk7CiAgCSAgICBpZiAoInRocm93IiA9PT0gaS50eXBlKSByZXR1cm4gci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IGkuYXJnLCByLmRlbGVnYXRlID0gbnVsbCwgeTsKICAJICAgIHZhciBhID0gaS5hcmc7CiAgCSAgICByZXR1cm4gYSA/IGEuZG9uZSA/IChyW2UucmVzdWx0TmFtZV0gPSBhLnZhbHVlLCByLm5leHQgPSBlLm5leHRMb2MsICJyZXR1cm4iICE9PSByLm1ldGhvZCAmJiAoci5tZXRob2QgPSAibmV4dCIsIHIuYXJnID0gdCksIHIuZGVsZWdhdGUgPSBudWxsLCB5KSA6IGEgOiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0IiksIHIuZGVsZWdhdGUgPSBudWxsLCB5KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gewogIAkgICAgICB0cnlMb2M6IHRbMF0KICAJICAgIH07CiAgCSAgICAxIGluIHQgJiYgKGUuY2F0Y2hMb2MgPSB0WzFdKSwgMiBpbiB0ICYmIChlLmZpbmFsbHlMb2MgPSB0WzJdLCBlLmFmdGVyTG9jID0gdFszXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGUpOwogIAkgIH0KICAJICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gdC5jb21wbGV0aW9uIHx8IHt9OwogIAkgICAgZS50eXBlID0gIm5vcm1hbCIsIGRlbGV0ZSBlLmFyZywgdC5jb21wbGV0aW9uID0gZTsKICAJICB9CiAgCSAgZnVuY3Rpb24gQ29udGV4dCh0KSB7CiAgCSAgICB0aGlzLnRyeUVudHJpZXMgPSBbewogIAkgICAgICB0cnlMb2M6ICJyb290IgogIAkgICAgfV0sIHQuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTsKICAJICB9CiAgCSAgZnVuY3Rpb24gdmFsdWVzKGUpIHsKICAJICAgIGlmIChlIHx8ICIiID09PSBlKSB7CiAgCSAgICAgIHZhciByID0gZVthXTsKICAJICAgICAgaWYgKHIpIHJldHVybiByLmNhbGwoZSk7CiAgCSAgICAgIGlmICgiZnVuY3Rpb24iID09IHR5cGVvZiBlLm5leHQpIHJldHVybiBlOwogIAkgICAgICBpZiAoIWlzTmFOKGUubGVuZ3RoKSkgewogIAkgICAgICAgIHZhciBvID0gLTEsCiAgCSAgICAgICAgICBpID0gZnVuY3Rpb24gbmV4dCgpIHsKICAJICAgICAgICAgICAgZm9yICg7ICsrbyA8IGUubGVuZ3RoOykgaWYgKG4uY2FsbChlLCBvKSkgcmV0dXJuIG5leHQudmFsdWUgPSBlW29dLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMCwgbmV4dDsKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgcmV0dXJuIGkubmV4dCA9IGk7CiAgCSAgICAgIH0KICAJICAgIH0KICAJICAgIHRocm93IG5ldyBUeXBlRXJyb3IoX3R5cGVvZihlKSArICIgaXMgbm90IGl0ZXJhYmxlIik7CiAgCSAgfQogIAkgIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgbyhnLCAiY29uc3RydWN0b3IiLCB7CiAgCSAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsCiAgCSAgICBjb25maWd1cmFibGU6ICEwCiAgCSAgfSksIG8oR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsICJjb25zdHJ1Y3RvciIsIHsKICAJICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbiwKICAJICAgIGNvbmZpZ3VyYWJsZTogITAKICAJICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpLCBlLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAodCkgewogIAkgICAgdmFyIGUgPSAiZnVuY3Rpb24iID09IHR5cGVvZiB0ICYmIHQuY29uc3RydWN0b3I7CiAgCSAgICByZXR1cm4gISFlICYmIChlID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAiR2VuZXJhdG9yRnVuY3Rpb24iID09PSAoZS5kaXNwbGF5TmFtZSB8fCBlLm5hbWUpKTsKICAJICB9LCBlLm1hcmsgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZih0LCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAodC5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKHQsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpKSwgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGcpLCB0OwogIAkgIH0sIGUuYXdyYXAgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIHsKICAJICAgICAgX19hd2FpdDogdAogIAkgICAgfTsKICAJICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGMsIGZ1bmN0aW9uICgpIHsKICAJICAgIHJldHVybiB0aGlzOwogIAkgIH0pLCBlLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBlLmFzeW5jID0gZnVuY3Rpb24gKHQsIHIsIG4sIG8sIGkpIHsKICAJICAgIHZvaWQgMCA9PT0gaSAmJiAoaSA9IFByb21pc2UpOwogIAkgICAgdmFyIGEgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKHQsIHIsIG4sIG8pLCBpKTsKICAJICAgIHJldHVybiBlLmlzR2VuZXJhdG9yRnVuY3Rpb24ocikgPyBhIDogYS5uZXh0KCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICByZXR1cm4gdC5kb25lID8gdC52YWx1ZSA6IGEubmV4dCgpOwogIAkgICAgfSk7CiAgCSAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKGcpLCBkZWZpbmUoZywgdSwgIkdlbmVyYXRvciIpLCBkZWZpbmUoZywgYSwgZnVuY3Rpb24gKCkgewogIAkgICAgcmV0dXJuIHRoaXM7CiAgCSAgfSksIGRlZmluZShnLCAidG9TdHJpbmciLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gIltvYmplY3QgR2VuZXJhdG9yXSI7CiAgCSAgfSksIGUua2V5cyA9IGZ1bmN0aW9uICh0KSB7CiAgCSAgICB2YXIgZSA9IE9iamVjdCh0KSwKICAJICAgICAgciA9IFtdOwogIAkgICAgZm9yICh2YXIgbiBpbiBlKSByLnB1c2gobik7CiAgCSAgICByZXR1cm4gci5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7CiAgCSAgICAgIGZvciAoOyByLmxlbmd0aDspIHsKICAJICAgICAgICB2YXIgdCA9IHIucG9wKCk7CiAgCSAgICAgICAgaWYgKHQgaW4gZSkgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgfQogIAkgICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7CiAgCSAgICB9OwogIAkgIH0sIGUudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHsKICAJICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LAogIAkgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KGUpIHsKICAJICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB0LCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gIm5leHQiLCB0aGlzLmFyZyA9IHQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhZSkgZm9yICh2YXIgciBpbiB0aGlzKSAidCIgPT09IHIuY2hhckF0KDApICYmIG4uY2FsbCh0aGlzLCByKSAmJiAhaXNOYU4oK3Iuc2xpY2UoMSkpICYmICh0aGlzW3JdID0gdCk7CiAgCSAgICB9LAogIAkgICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHsKICAJICAgICAgdGhpcy5kb25lID0gITA7CiAgCSAgICAgIHZhciB0ID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gdGhpcy5ydmFsOwogIAkgICAgfSwKICAJICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihlKSB7CiAgCSAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGU7CiAgCSAgICAgIHZhciByID0gdGhpczsKICAJICAgICAgZnVuY3Rpb24gaGFuZGxlKG4sIG8pIHsKICAJICAgICAgICByZXR1cm4gYS50eXBlID0gInRocm93IiwgYS5hcmcgPSBlLCByLm5leHQgPSBuLCBvICYmIChyLm1ldGhvZCA9ICJuZXh0Iiwgci5hcmcgPSB0KSwgISFvOwogIAkgICAgICB9CiAgCSAgICAgIGZvciAodmFyIG8gPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgbyA+PSAwOyAtLW8pIHsKICAJICAgICAgICB2YXIgaSA9IHRoaXMudHJ5RW50cmllc1tvXSwKICAJICAgICAgICAgIGEgPSBpLmNvbXBsZXRpb247CiAgCSAgICAgICAgaWYgKCJyb290IiA9PT0gaS50cnlMb2MpIHJldHVybiBoYW5kbGUoImVuZCIpOwogIAkgICAgICAgIGlmIChpLnRyeUxvYyA8PSB0aGlzLnByZXYpIHsKICAJICAgICAgICAgIHZhciBjID0gbi5jYWxsKGksICJjYXRjaExvYyIpLAogIAkgICAgICAgICAgICB1ID0gbi5jYWxsKGksICJmaW5hbGx5TG9jIik7CiAgCSAgICAgICAgICBpZiAoYyAmJiB1KSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShpLmZpbmFsbHlMb2MpOwogIAkgICAgICAgICAgfSBlbHNlIGlmIChjKSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgIH0gZWxzZSB7CiAgCSAgICAgICAgICAgIGlmICghdSkgdGhyb3cgbmV3IEVycm9yKCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseSIpOwogIAkgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgaS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGkuZmluYWxseUxvYyk7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICB9CiAgCSAgICB9LAogIAkgICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodCwgZSkgewogIAkgICAgICBmb3IgKHZhciByID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IHIgPj0gMDsgLS1yKSB7CiAgCSAgICAgICAgdmFyIG8gPSB0aGlzLnRyeUVudHJpZXNbcl07CiAgCSAgICAgICAgaWYgKG8udHJ5TG9jIDw9IHRoaXMucHJldiAmJiBuLmNhbGwobywgImZpbmFsbHlMb2MiKSAmJiB0aGlzLnByZXYgPCBvLmZpbmFsbHlMb2MpIHsKICAJICAgICAgICAgIHZhciBpID0gbzsKICAJICAgICAgICAgIGJyZWFrOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICBpICYmICgiYnJlYWsiID09PSB0IHx8ICJjb250aW51ZSIgPT09IHQpICYmIGkudHJ5TG9jIDw9IGUgJiYgZSA8PSBpLmZpbmFsbHlMb2MgJiYgKGkgPSBudWxsKTsKICAJICAgICAgdmFyIGEgPSBpID8gaS5jb21wbGV0aW9uIDoge307CiAgCSAgICAgIHJldHVybiBhLnR5cGUgPSB0LCBhLmFyZyA9IGUsIGkgPyAodGhpcy5tZXRob2QgPSAibmV4dCIsIHRoaXMubmV4dCA9IGkuZmluYWxseUxvYywgeSkgOiB0aGlzLmNvbXBsZXRlKGEpOwogIAkgICAgfSwKICAJICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSh0LCBlKSB7CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gImJyZWFrIiA9PT0gdC50eXBlIHx8ICJjb250aW51ZSIgPT09IHQudHlwZSA/IHRoaXMubmV4dCA9IHQuYXJnIDogInJldHVybiIgPT09IHQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHQuYXJnLCB0aGlzLm1ldGhvZCA9ICJyZXR1cm4iLCB0aGlzLm5leHQgPSAiZW5kIikgOiAibm9ybWFsIiA9PT0gdC50eXBlICYmIGUgJiYgKHRoaXMubmV4dCA9IGUpLCB5OwogIAkgICAgfSwKICAJICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKHQpIHsKICAJICAgICAgZm9yICh2YXIgZSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBlID49IDA7IC0tZSkgewogIAkgICAgICAgIHZhciByID0gdGhpcy50cnlFbnRyaWVzW2VdOwogIAkgICAgICAgIGlmIChyLmZpbmFsbHlMb2MgPT09IHQpIHJldHVybiB0aGlzLmNvbXBsZXRlKHIuY29tcGxldGlvbiwgci5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkociksIHk7CiAgCSAgICAgIH0KICAJICAgIH0sCiAgCSAgICAiY2F0Y2giOiBmdW5jdGlvbiBfY2F0Y2godCkgewogIAkgICAgICBmb3IgKHZhciBlID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGUgPj0gMDsgLS1lKSB7CiAgCSAgICAgICAgdmFyIHIgPSB0aGlzLnRyeUVudHJpZXNbZV07CiAgCSAgICAgICAgaWYgKHIudHJ5TG9jID09PSB0KSB7CiAgCSAgICAgICAgICB2YXIgbiA9IHIuY29tcGxldGlvbjsKICAJICAgICAgICAgIGlmICgidGhyb3ciID09PSBuLnR5cGUpIHsKICAJICAgICAgICAgICAgdmFyIG8gPSBuLmFyZzsKICAJICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShyKTsKICAJICAgICAgICAgIH0KICAJICAgICAgICAgIHJldHVybiBvOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICB0aHJvdyBuZXcgRXJyb3IoImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdCIpOwogIAkgICAgfSwKICAJICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoZSwgciwgbikgewogIAkgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHsKICAJICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGUpLAogIAkgICAgICAgIHJlc3VsdE5hbWU6IHIsCiAgCSAgICAgICAgbmV4dExvYzogbgogIAkgICAgICB9LCAibmV4dCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHQpLCB5OwogIAkgICAgfQogIAkgIH0sIGU7CiAgCX0KICAJbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbImRlZmF1bHQiXSA9IG1vZHVsZS5leHBvcnRzOyAKICB9IChyZWdlbmVyYXRvclJ1bnRpbWUkMikpOwoKICB2YXIgcmVnZW5lcmF0b3JSdW50aW1lRXhwb3J0cyQxID0gcmVnZW5lcmF0b3JSdW50aW1lJDIuZXhwb3J0czsKCiAgLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS4KCiAgdmFyIHJ1bnRpbWUkMSA9IHJlZ2VuZXJhdG9yUnVudGltZUV4cG9ydHMkMSgpOwogIHZhciByZWdlbmVyYXRvciQxID0gcnVudGltZSQxOwoKICAvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PQogIHRyeSB7CiAgICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lJDE7CiAgfSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHsKICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gIm9iamVjdCIpIHsKICAgICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lJDE7CiAgICB9IGVsc2UgewogICAgICBGdW5jdGlvbigiciIsICJyZWdlbmVyYXRvclJ1bnRpbWUgPSByIikocnVudGltZSQxKTsKICAgIH0KICB9CgogIHZhciBfcmVnZW5lcmF0b3JSdW50aW1lJDEgPSAvKkBfX1BVUkVfXyovZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMkMShyZWdlbmVyYXRvciQxKTsKCiAgZnVuY3Rpb24gZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMgKHgpIHsKICAJcmV0dXJuIHggJiYgeC5fX2VzTW9kdWxlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnZGVmYXVsdCcpID8geFsnZGVmYXVsdCddIDogeDsKICB9CgogIHZhciByZWdlbmVyYXRvclJ1bnRpbWUkMSA9IHtleHBvcnRzOiB7fX07CgogIHZhciBfdHlwZW9mJDEgPSB7ZXhwb3J0czoge319OwoKICBfdHlwZW9mJDEuZXhwb3J0czsKCiAgKGZ1bmN0aW9uIChtb2R1bGUpIHsKICAJZnVuY3Rpb24gX3R5cGVvZihvKSB7CiAgCSAgIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mIjsKCiAgCSAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSAiZnVuY3Rpb24iID09IHR5cGVvZiBTeW1ib2wgJiYgInN5bWJvbCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7CiAgCSAgICByZXR1cm4gdHlwZW9mIG87CiAgCSAgfSA6IGZ1bmN0aW9uIChvKSB7CiAgCSAgICByZXR1cm4gbyAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyAic3ltYm9sIiA6IHR5cGVvZiBvOwogIAkgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1siZGVmYXVsdCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG8pOwogIAl9CiAgCW1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzWyJkZWZhdWx0Il0gPSBtb2R1bGUuZXhwb3J0czsgCiAgfSAoX3R5cGVvZiQxKSk7CgogIHZhciBfdHlwZW9mRXhwb3J0cyA9IF90eXBlb2YkMS5leHBvcnRzOwoKICByZWdlbmVyYXRvclJ1bnRpbWUkMS5leHBvcnRzOwoKICAoZnVuY3Rpb24gKG1vZHVsZSkgewogIAl2YXIgX3R5cGVvZiA9IF90eXBlb2ZFeHBvcnRzWyJkZWZhdWx0Il07CiAgCWZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7CiAgCSAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHsKICAJICAgIHJldHVybiBlOwogIAkgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1siZGVmYXVsdCJdID0gbW9kdWxlLmV4cG9ydHM7CiAgCSAgdmFyIHQsCiAgCSAgICBlID0ge30sCiAgCSAgICByID0gT2JqZWN0LnByb3RvdHlwZSwKICAJICAgIG4gPSByLmhhc093blByb3BlcnR5LAogIAkgICAgbyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAodCwgZSwgcikgewogIAkgICAgICB0W2VdID0gci52YWx1ZTsKICAJICAgIH0sCiAgCSAgICBpID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sCiAgCSAgICBhID0gaS5pdGVyYXRvciB8fCAiQEBpdGVyYXRvciIsCiAgCSAgICBjID0gaS5hc3luY0l0ZXJhdG9yIHx8ICJAQGFzeW5jSXRlcmF0b3IiLAogIAkgICAgdSA9IGkudG9TdHJpbmdUYWcgfHwgIkBAdG9TdHJpbmdUYWciOwogIAkgIGZ1bmN0aW9uIGRlZmluZSh0LCBlLCByKSB7CiAgCSAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIGUsIHsKICAJICAgICAgdmFsdWU6IHIsCiAgCSAgICAgIGVudW1lcmFibGU6ICEwLAogIAkgICAgICBjb25maWd1cmFibGU6ICEwLAogIAkgICAgICB3cml0YWJsZTogITAKICAJICAgIH0pLCB0W2VdOwogIAkgIH0KICAJICB0cnkgewogIAkgICAgZGVmaW5lKHt9LCAiIik7CiAgCSAgfSBjYXRjaCAodCkgewogIAkgICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKHQsIGUsIHIpIHsKICAJICAgICAgcmV0dXJuIHRbZV0gPSByOwogIAkgICAgfTsKICAJICB9CiAgCSAgZnVuY3Rpb24gd3JhcCh0LCBlLCByLCBuKSB7CiAgCSAgICB2YXIgaSA9IGUgJiYgZS5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBlIDogR2VuZXJhdG9yLAogIAkgICAgICBhID0gT2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksCiAgCSAgICAgIGMgPSBuZXcgQ29udGV4dChuIHx8IFtdKTsKICAJICAgIHJldHVybiBvKGEsICJfaW52b2tlIiwgewogIAkgICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZCh0LCByLCBjKQogIAkgICAgfSksIGE7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIHRyeUNhdGNoKHQsIGUsIHIpIHsKICAJICAgIHRyeSB7CiAgCSAgICAgIHJldHVybiB7CiAgCSAgICAgICAgdHlwZTogIm5vcm1hbCIsCiAgCSAgICAgICAgYXJnOiB0LmNhbGwoZSwgcikKICAJICAgICAgfTsKICAJICAgIH0gY2F0Y2ggKHQpIHsKICAJICAgICAgcmV0dXJuIHsKICAJICAgICAgICB0eXBlOiAidGhyb3ciLAogIAkgICAgICAgIGFyZzogdAogIAkgICAgICB9OwogIAkgICAgfQogIAkgIH0KICAJICBlLndyYXAgPSB3cmFwOwogIAkgIHZhciBoID0gInN1c3BlbmRlZFN0YXJ0IiwKICAJICAgIGwgPSAic3VzcGVuZGVkWWllbGQiLAogIAkgICAgZiA9ICJleGVjdXRpbmciLAogIAkgICAgcyA9ICJjb21wbGV0ZWQiLAogIAkgICAgeSA9IHt9OwogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9CiAgCSAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fQogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30KICAJICB2YXIgcCA9IHt9OwogIAkgIGRlZmluZShwLCBhLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gdGhpczsKICAJICB9KTsKICAJICB2YXIgZCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiwKICAJICAgIHYgPSBkICYmIGQoZCh2YWx1ZXMoW10pKSk7CiAgCSAgdiAmJiB2ICE9PSByICYmIG4uY2FsbCh2LCBhKSAmJiAocCA9IHYpOwogIAkgIHZhciBnID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocCk7CiAgCSAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHQpIHsKICAJICAgIFsibmV4dCIsICJ0aHJvdyIsICJyZXR1cm4iXS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7CiAgCSAgICAgIGRlZmluZSh0LCBlLCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UoZSwgdCk7CiAgCSAgICAgIH0pOwogIAkgICAgfSk7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IodCwgZSkgewogIAkgICAgZnVuY3Rpb24gaW52b2tlKHIsIG8sIGksIGEpIHsKICAJICAgICAgdmFyIGMgPSB0cnlDYXRjaCh0W3JdLCB0LCBvKTsKICAJICAgICAgaWYgKCJ0aHJvdyIgIT09IGMudHlwZSkgewogIAkgICAgICAgIHZhciB1ID0gYy5hcmcsCiAgCSAgICAgICAgICBoID0gdS52YWx1ZTsKICAJICAgICAgICByZXR1cm4gaCAmJiAib2JqZWN0IiA9PSBfdHlwZW9mKGgpICYmIG4uY2FsbChoLCAiX19hd2FpdCIpID8gZS5yZXNvbHZlKGguX19hd2FpdCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgaW52b2tlKCJuZXh0IiwgdCwgaSwgYSk7CiAgCSAgICAgICAgfSwgZnVuY3Rpb24gKHQpIHsKICAJICAgICAgICAgIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KSA6IGUucmVzb2x2ZShoKS50aGVuKGZ1bmN0aW9uICh0KSB7CiAgCSAgICAgICAgICB1LnZhbHVlID0gdCwgaSh1KTsKICAJICAgICAgICB9LCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgcmV0dXJuIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KTsKICAJICAgICAgfQogIAkgICAgICBhKGMuYXJnKTsKICAJICAgIH0KICAJICAgIHZhciByOwogIAkgICAgbyh0aGlzLCAiX2ludm9rZSIsIHsKICAJICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHQsIG4pIHsKICAJICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHsKICAJICAgICAgICAgIHJldHVybiBuZXcgZShmdW5jdGlvbiAoZSwgcikgewogIAkgICAgICAgICAgICBpbnZva2UodCwgbiwgZSwgcik7CiAgCSAgICAgICAgICB9KTsKICAJICAgICAgICB9CiAgCSAgICAgICAgcmV0dXJuIHIgPSByID8gci50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpOwogIAkgICAgICB9CiAgCSAgICB9KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChlLCByLCBuKSB7CiAgCSAgICB2YXIgbyA9IGg7CiAgCSAgICByZXR1cm4gZnVuY3Rpb24gKGksIGEpIHsKICAJICAgICAgaWYgKG8gPT09IGYpIHRocm93IG5ldyBFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZyIpOwogIAkgICAgICBpZiAobyA9PT0gcykgewogIAkgICAgICAgIGlmICgidGhyb3ciID09PSBpKSB0aHJvdyBhOwogIAkgICAgICAgIHJldHVybiB7CiAgCSAgICAgICAgICB2YWx1ZTogdCwKICAJICAgICAgICAgIGRvbmU6ICEwCiAgCSAgICAgICAgfTsKICAJICAgICAgfQogIAkgICAgICBmb3IgKG4ubWV0aG9kID0gaSwgbi5hcmcgPSBhOzspIHsKICAJICAgICAgICB2YXIgYyA9IG4uZGVsZWdhdGU7CiAgCSAgICAgICAgaWYgKGMpIHsKICAJICAgICAgICAgIHZhciB1ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShjLCBuKTsKICAJICAgICAgICAgIGlmICh1KSB7CiAgCSAgICAgICAgICAgIGlmICh1ID09PSB5KSBjb250aW51ZTsKICAJICAgICAgICAgICAgcmV0dXJuIHU7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICAgIGlmICgibmV4dCIgPT09IG4ubWV0aG9kKSBuLnNlbnQgPSBuLl9zZW50ID0gbi5hcmc7ZWxzZSBpZiAoInRocm93IiA9PT0gbi5tZXRob2QpIHsKICAJICAgICAgICAgIGlmIChvID09PSBoKSB0aHJvdyBvID0gcywgbi5hcmc7CiAgCSAgICAgICAgICBuLmRpc3BhdGNoRXhjZXB0aW9uKG4uYXJnKTsKICAJICAgICAgICB9IGVsc2UgInJldHVybiIgPT09IG4ubWV0aG9kICYmIG4uYWJydXB0KCJyZXR1cm4iLCBuLmFyZyk7CiAgCSAgICAgICAgbyA9IGY7CiAgCSAgICAgICAgdmFyIHAgPSB0cnlDYXRjaChlLCByLCBuKTsKICAJICAgICAgICBpZiAoIm5vcm1hbCIgPT09IHAudHlwZSkgewogIAkgICAgICAgICAgaWYgKG8gPSBuLmRvbmUgPyBzIDogbCwgcC5hcmcgPT09IHkpIGNvbnRpbnVlOwogIAkgICAgICAgICAgcmV0dXJuIHsKICAJICAgICAgICAgICAgdmFsdWU6IHAuYXJnLAogIAkgICAgICAgICAgICBkb25lOiBuLmRvbmUKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgfQogIAkgICAgICAgICJ0aHJvdyIgPT09IHAudHlwZSAmJiAobyA9IHMsIG4ubWV0aG9kID0gInRocm93Iiwgbi5hcmcgPSBwLmFyZyk7CiAgCSAgICAgIH0KICAJICAgIH07CiAgCSAgfQogIAkgIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgcikgewogIAkgICAgdmFyIG4gPSByLm1ldGhvZCwKICAJICAgICAgbyA9IGUuaXRlcmF0b3Jbbl07CiAgCSAgICBpZiAobyA9PT0gdCkgcmV0dXJuIHIuZGVsZWdhdGUgPSBudWxsLCAidGhyb3ciID09PSBuICYmIGUuaXRlcmF0b3JbInJldHVybiJdICYmIChyLm1ldGhvZCA9ICJyZXR1cm4iLCByLmFyZyA9IHQsIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgciksICJ0aHJvdyIgPT09IHIubWV0aG9kKSB8fCAicmV0dXJuIiAhPT0gbiAmJiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJyIgKyBuICsgIicgbWV0aG9kIikpLCB5OwogIAkgICAgdmFyIGkgPSB0cnlDYXRjaChvLCBlLml0ZXJhdG9yLCByLmFyZyk7CiAgCSAgICBpZiAoInRocm93IiA9PT0gaS50eXBlKSByZXR1cm4gci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IGkuYXJnLCByLmRlbGVnYXRlID0gbnVsbCwgeTsKICAJICAgIHZhciBhID0gaS5hcmc7CiAgCSAgICByZXR1cm4gYSA/IGEuZG9uZSA/IChyW2UucmVzdWx0TmFtZV0gPSBhLnZhbHVlLCByLm5leHQgPSBlLm5leHRMb2MsICJyZXR1cm4iICE9PSByLm1ldGhvZCAmJiAoci5tZXRob2QgPSAibmV4dCIsIHIuYXJnID0gdCksIHIuZGVsZWdhdGUgPSBudWxsLCB5KSA6IGEgOiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0IiksIHIuZGVsZWdhdGUgPSBudWxsLCB5KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gewogIAkgICAgICB0cnlMb2M6IHRbMF0KICAJICAgIH07CiAgCSAgICAxIGluIHQgJiYgKGUuY2F0Y2hMb2MgPSB0WzFdKSwgMiBpbiB0ICYmIChlLmZpbmFsbHlMb2MgPSB0WzJdLCBlLmFmdGVyTG9jID0gdFszXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGUpOwogIAkgIH0KICAJICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gdC5jb21wbGV0aW9uIHx8IHt9OwogIAkgICAgZS50eXBlID0gIm5vcm1hbCIsIGRlbGV0ZSBlLmFyZywgdC5jb21wbGV0aW9uID0gZTsKICAJICB9CiAgCSAgZnVuY3Rpb24gQ29udGV4dCh0KSB7CiAgCSAgICB0aGlzLnRyeUVudHJpZXMgPSBbewogIAkgICAgICB0cnlMb2M6ICJyb290IgogIAkgICAgfV0sIHQuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTsKICAJICB9CiAgCSAgZnVuY3Rpb24gdmFsdWVzKGUpIHsKICAJICAgIGlmIChlIHx8ICIiID09PSBlKSB7CiAgCSAgICAgIHZhciByID0gZVthXTsKICAJICAgICAgaWYgKHIpIHJldHVybiByLmNhbGwoZSk7CiAgCSAgICAgIGlmICgiZnVuY3Rpb24iID09IHR5cGVvZiBlLm5leHQpIHJldHVybiBlOwogIAkgICAgICBpZiAoIWlzTmFOKGUubGVuZ3RoKSkgewogIAkgICAgICAgIHZhciBvID0gLTEsCiAgCSAgICAgICAgICBpID0gZnVuY3Rpb24gbmV4dCgpIHsKICAJICAgICAgICAgICAgZm9yICg7ICsrbyA8IGUubGVuZ3RoOykgaWYgKG4uY2FsbChlLCBvKSkgcmV0dXJuIG5leHQudmFsdWUgPSBlW29dLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMCwgbmV4dDsKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgcmV0dXJuIGkubmV4dCA9IGk7CiAgCSAgICAgIH0KICAJICAgIH0KICAJICAgIHRocm93IG5ldyBUeXBlRXJyb3IoX3R5cGVvZihlKSArICIgaXMgbm90IGl0ZXJhYmxlIik7CiAgCSAgfQogIAkgIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgbyhnLCAiY29uc3RydWN0b3IiLCB7CiAgCSAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsCiAgCSAgICBjb25maWd1cmFibGU6ICEwCiAgCSAgfSksIG8oR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsICJjb25zdHJ1Y3RvciIsIHsKICAJICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbiwKICAJICAgIGNvbmZpZ3VyYWJsZTogITAKICAJICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpLCBlLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAodCkgewogIAkgICAgdmFyIGUgPSAiZnVuY3Rpb24iID09IHR5cGVvZiB0ICYmIHQuY29uc3RydWN0b3I7CiAgCSAgICByZXR1cm4gISFlICYmIChlID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAiR2VuZXJhdG9yRnVuY3Rpb24iID09PSAoZS5kaXNwbGF5TmFtZSB8fCBlLm5hbWUpKTsKICAJICB9LCBlLm1hcmsgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZih0LCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAodC5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKHQsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpKSwgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGcpLCB0OwogIAkgIH0sIGUuYXdyYXAgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIHsKICAJICAgICAgX19hd2FpdDogdAogIAkgICAgfTsKICAJICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGMsIGZ1bmN0aW9uICgpIHsKICAJICAgIHJldHVybiB0aGlzOwogIAkgIH0pLCBlLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBlLmFzeW5jID0gZnVuY3Rpb24gKHQsIHIsIG4sIG8sIGkpIHsKICAJICAgIHZvaWQgMCA9PT0gaSAmJiAoaSA9IFByb21pc2UpOwogIAkgICAgdmFyIGEgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKHQsIHIsIG4sIG8pLCBpKTsKICAJICAgIHJldHVybiBlLmlzR2VuZXJhdG9yRnVuY3Rpb24ocikgPyBhIDogYS5uZXh0KCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICByZXR1cm4gdC5kb25lID8gdC52YWx1ZSA6IGEubmV4dCgpOwogIAkgICAgfSk7CiAgCSAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKGcpLCBkZWZpbmUoZywgdSwgIkdlbmVyYXRvciIpLCBkZWZpbmUoZywgYSwgZnVuY3Rpb24gKCkgewogIAkgICAgcmV0dXJuIHRoaXM7CiAgCSAgfSksIGRlZmluZShnLCAidG9TdHJpbmciLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gIltvYmplY3QgR2VuZXJhdG9yXSI7CiAgCSAgfSksIGUua2V5cyA9IGZ1bmN0aW9uICh0KSB7CiAgCSAgICB2YXIgZSA9IE9iamVjdCh0KSwKICAJICAgICAgciA9IFtdOwogIAkgICAgZm9yICh2YXIgbiBpbiBlKSByLnB1c2gobik7CiAgCSAgICByZXR1cm4gci5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7CiAgCSAgICAgIGZvciAoOyByLmxlbmd0aDspIHsKICAJICAgICAgICB2YXIgdCA9IHIucG9wKCk7CiAgCSAgICAgICAgaWYgKHQgaW4gZSkgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgfQogIAkgICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7CiAgCSAgICB9OwogIAkgIH0sIGUudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHsKICAJICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LAogIAkgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KGUpIHsKICAJICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB0LCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gIm5leHQiLCB0aGlzLmFyZyA9IHQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhZSkgZm9yICh2YXIgciBpbiB0aGlzKSAidCIgPT09IHIuY2hhckF0KDApICYmIG4uY2FsbCh0aGlzLCByKSAmJiAhaXNOYU4oK3Iuc2xpY2UoMSkpICYmICh0aGlzW3JdID0gdCk7CiAgCSAgICB9LAogIAkgICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHsKICAJICAgICAgdGhpcy5kb25lID0gITA7CiAgCSAgICAgIHZhciB0ID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gdGhpcy5ydmFsOwogIAkgICAgfSwKICAJICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihlKSB7CiAgCSAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGU7CiAgCSAgICAgIHZhciByID0gdGhpczsKICAJICAgICAgZnVuY3Rpb24gaGFuZGxlKG4sIG8pIHsKICAJICAgICAgICByZXR1cm4gYS50eXBlID0gInRocm93IiwgYS5hcmcgPSBlLCByLm5leHQgPSBuLCBvICYmIChyLm1ldGhvZCA9ICJuZXh0Iiwgci5hcmcgPSB0KSwgISFvOwogIAkgICAgICB9CiAgCSAgICAgIGZvciAodmFyIG8gPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgbyA+PSAwOyAtLW8pIHsKICAJICAgICAgICB2YXIgaSA9IHRoaXMudHJ5RW50cmllc1tvXSwKICAJICAgICAgICAgIGEgPSBpLmNvbXBsZXRpb247CiAgCSAgICAgICAgaWYgKCJyb290IiA9PT0gaS50cnlMb2MpIHJldHVybiBoYW5kbGUoImVuZCIpOwogIAkgICAgICAgIGlmIChpLnRyeUxvYyA8PSB0aGlzLnByZXYpIHsKICAJICAgICAgICAgIHZhciBjID0gbi5jYWxsKGksICJjYXRjaExvYyIpLAogIAkgICAgICAgICAgICB1ID0gbi5jYWxsKGksICJmaW5hbGx5TG9jIik7CiAgCSAgICAgICAgICBpZiAoYyAmJiB1KSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShpLmZpbmFsbHlMb2MpOwogIAkgICAgICAgICAgfSBlbHNlIGlmIChjKSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgIH0gZWxzZSB7CiAgCSAgICAgICAgICAgIGlmICghdSkgdGhyb3cgbmV3IEVycm9yKCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseSIpOwogIAkgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgaS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGkuZmluYWxseUxvYyk7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICB9CiAgCSAgICB9LAogIAkgICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodCwgZSkgewogIAkgICAgICBmb3IgKHZhciByID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IHIgPj0gMDsgLS1yKSB7CiAgCSAgICAgICAgdmFyIG8gPSB0aGlzLnRyeUVudHJpZXNbcl07CiAgCSAgICAgICAgaWYgKG8udHJ5TG9jIDw9IHRoaXMucHJldiAmJiBuLmNhbGwobywgImZpbmFsbHlMb2MiKSAmJiB0aGlzLnByZXYgPCBvLmZpbmFsbHlMb2MpIHsKICAJICAgICAgICAgIHZhciBpID0gbzsKICAJICAgICAgICAgIGJyZWFrOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICBpICYmICgiYnJlYWsiID09PSB0IHx8ICJjb250aW51ZSIgPT09IHQpICYmIGkudHJ5TG9jIDw9IGUgJiYgZSA8PSBpLmZpbmFsbHlMb2MgJiYgKGkgPSBudWxsKTsKICAJICAgICAgdmFyIGEgPSBpID8gaS5jb21wbGV0aW9uIDoge307CiAgCSAgICAgIHJldHVybiBhLnR5cGUgPSB0LCBhLmFyZyA9IGUsIGkgPyAodGhpcy5tZXRob2QgPSAibmV4dCIsIHRoaXMubmV4dCA9IGkuZmluYWxseUxvYywgeSkgOiB0aGlzLmNvbXBsZXRlKGEpOwogIAkgICAgfSwKICAJICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSh0LCBlKSB7CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gImJyZWFrIiA9PT0gdC50eXBlIHx8ICJjb250aW51ZSIgPT09IHQudHlwZSA/IHRoaXMubmV4dCA9IHQuYXJnIDogInJldHVybiIgPT09IHQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHQuYXJnLCB0aGlzLm1ldGhvZCA9ICJyZXR1cm4iLCB0aGlzLm5leHQgPSAiZW5kIikgOiAibm9ybWFsIiA9PT0gdC50eXBlICYmIGUgJiYgKHRoaXMubmV4dCA9IGUpLCB5OwogIAkgICAgfSwKICAJICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKHQpIHsKICAJICAgICAgZm9yICh2YXIgZSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBlID49IDA7IC0tZSkgewogIAkgICAgICAgIHZhciByID0gdGhpcy50cnlFbnRyaWVzW2VdOwogIAkgICAgICAgIGlmIChyLmZpbmFsbHlMb2MgPT09IHQpIHJldHVybiB0aGlzLmNvbXBsZXRlKHIuY29tcGxldGlvbiwgci5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkociksIHk7CiAgCSAgICAgIH0KICAJICAgIH0sCiAgCSAgICAiY2F0Y2giOiBmdW5jdGlvbiBfY2F0Y2godCkgewogIAkgICAgICBmb3IgKHZhciBlID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGUgPj0gMDsgLS1lKSB7CiAgCSAgICAgICAgdmFyIHIgPSB0aGlzLnRyeUVudHJpZXNbZV07CiAgCSAgICAgICAgaWYgKHIudHJ5TG9jID09PSB0KSB7CiAgCSAgICAgICAgICB2YXIgbiA9IHIuY29tcGxldGlvbjsKICAJICAgICAgICAgIGlmICgidGhyb3ciID09PSBuLnR5cGUpIHsKICAJICAgICAgICAgICAgdmFyIG8gPSBuLmFyZzsKICAJICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShyKTsKICAJICAgICAgICAgIH0KICAJICAgICAgICAgIHJldHVybiBvOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICB0aHJvdyBuZXcgRXJyb3IoImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdCIpOwogIAkgICAgfSwKICAJICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoZSwgciwgbikgewogIAkgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHsKICAJICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGUpLAogIAkgICAgICAgIHJlc3VsdE5hbWU6IHIsCiAgCSAgICAgICAgbmV4dExvYzogbgogIAkgICAgICB9LCAibmV4dCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHQpLCB5OwogIAkgICAgfQogIAkgIH0sIGU7CiAgCX0KICAJbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbImRlZmF1bHQiXSA9IG1vZHVsZS5leHBvcnRzOyAKICB9IChyZWdlbmVyYXRvclJ1bnRpbWUkMSkpOwoKICB2YXIgcmVnZW5lcmF0b3JSdW50aW1lRXhwb3J0cyA9IHJlZ2VuZXJhdG9yUnVudGltZSQxLmV4cG9ydHM7CgogIC8vIFRPRE8oQmFiZWwgOCk6IFJlbW92ZSB0aGlzIGZpbGUuCgogIHZhciBydW50aW1lID0gcmVnZW5lcmF0b3JSdW50aW1lRXhwb3J0cygpOwogIHZhciByZWdlbmVyYXRvciA9IHJ1bnRpbWU7CgogIC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vcGFja2FnZXMvcnVudGltZS9ydW50aW1lLmpzI0w3MzY9CiAgdHJ5IHsKICAgIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7CiAgfSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHsKICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gIm9iamVjdCIpIHsKICAgICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lOwogICAgfSBlbHNlIHsKICAgICAgRnVuY3Rpb24oInIiLCAicmVnZW5lcmF0b3JSdW50aW1lID0gciIpKHJ1bnRpbWUpOwogICAgfQogIH0KCiAgdmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSAvKkBfX1BVUkVfXyovZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMocmVnZW5lcmF0b3IpOwoKICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueQ0KICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuDQoNCiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZDQogIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCwNCiAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SDQogIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1INCiAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi8NCg0KICBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7DQogICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgew0KICAgICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH0NCiAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH0NCiAgICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7DQogICAgICB9KTsNCiAgfQoKICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2skMShpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsKICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7CiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpOwogICAgfQogIH0KCiAgZnVuY3Rpb24gX3R5cGVvZihvKSB7CiAgICAiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2YiOwoKICAgIHJldHVybiBfdHlwZW9mID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sICYmICJzeW1ib2wiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAobykgewogICAgICByZXR1cm4gdHlwZW9mIG87CiAgICB9IDogZnVuY3Rpb24gKG8pIHsKICAgICAgcmV0dXJuIG8gJiYgImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sICYmIG8uY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvICE9PSBTeW1ib2wucHJvdG90eXBlID8gInN5bWJvbCIgOiB0eXBlb2YgbzsKICAgIH0sIF90eXBlb2Yobyk7CiAgfQoKICBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHsKICAgIGlmIChfdHlwZW9mKGlucHV0KSAhPT0gIm9iamVjdCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsKICAgIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTsKICAgIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHsKICAgICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCAiZGVmYXVsdCIpOwogICAgICBpZiAoX3R5cGVvZihyZXMpICE9PSAib2JqZWN0IikgcmV0dXJuIHJlczsKICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS4iKTsKICAgIH0KICAgIHJldHVybiAoaGludCA9PT0gInN0cmluZyIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTsKICB9CgogIGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykgewogICAgdmFyIGtleSA9IF90b1ByaW1pdGl2ZShhcmcsICJzdHJpbmciKTsKICAgIHJldHVybiBfdHlwZW9mKGtleSkgPT09ICJzeW1ib2wiID8ga2V5IDogU3RyaW5nKGtleSk7CiAgfQoKICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyQxKHRhcmdldCwgcHJvcHMpIHsKICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsKICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsKICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOwogICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7CiAgICAgIGlmICgidmFsdWUiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOwogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOwogICAgfQogIH0KICBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MkMShDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsKICAgIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyQxKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7CiAgICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzJDEoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsKICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgInByb3RvdHlwZSIsIHsKICAgICAgd3JpdGFibGU6IGZhbHNlCiAgICB9KTsKICAgIHJldHVybiBDb25zdHJ1Y3RvcjsKICB9CgogIGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7CiAgICBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsKICAgICAgby5fX3Byb3RvX18gPSBwOwogICAgICByZXR1cm4gbzsKICAgIH07CiAgICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApOwogIH0KCiAgZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7CiAgICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICJmdW5jdGlvbiIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgewogICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiIpOwogICAgfQogICAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7CiAgICAgIGNvbnN0cnVjdG9yOiB7CiAgICAgICAgdmFsdWU6IHN1YkNsYXNzLAogICAgICAgIHdyaXRhYmxlOiB0cnVlLAogICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZQogICAgICB9CiAgICB9KTsKICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdWJDbGFzcywgInByb3RvdHlwZSIsIHsKICAgICAgd3JpdGFibGU6IGZhbHNlCiAgICB9KTsKICAgIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpOwogIH0KCiAgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7CiAgICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7CiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcigidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkIik7CiAgICB9CiAgICByZXR1cm4gc2VsZjsKICB9CgogIGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsKICAgIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSAib2JqZWN0IiB8fCB0eXBlb2YgY2FsbCA9PT0gImZ1bmN0aW9uIikpIHsKICAgICAgcmV0dXJuIGNhbGw7CiAgICB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgewogICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZCIpOwogICAgfQogICAgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7CiAgfQoKICBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgewogICAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7CiAgICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7CiAgICB9OwogICAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsKICB9CgogIC8qDQogICAgQ29weXJpZ2h0IDIwMjItMjAyMyBQaWNvdm9pY2UgSW5jLg0KCiAgICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIGxpY2Vuc2UuIEEgY29weSBvZiB0aGUgbGljZW5zZSBpcyBsb2NhdGVkIGluIHRoZSAiTElDRU5TRSINCiAgICBmaWxlIGFjY29tcGFueWluZyB0aGlzIHNvdXJjZS4NCgogICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbg0KICAgIGFuICJBUyBJUyIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZQ0KICAgIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuDQogICovCiAgLyoqDQogICAqIEJhc2VQdkZpbGUgQ2xhc3MNCiAgICogVGhpcyBjbGFzcyBtb2NrcyB0aGUgZmlsZSBzeXN0ZW0gdXNpbmcgaW4tbWVtb3J5IHN0b3JhZ2UuDQogICAqLwogIHZhciBQdkZpbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgZnVuY3Rpb24gUHZGaWxlKCkgewogICAgICBfY2xhc3NDYWxsQ2hlY2skMSh0aGlzLCBQdkZpbGUpOwogICAgICB0aGlzLl9wYXRoID0gJyc7CiAgICB9CiAgICAvKioNCiAgICAgKiBHZXR0ZXIgZm9yIGZpbGUncyBtZXRhIGluZm9ybWF0aW9uLg0KICAgICAqLwogICAgX2NyZWF0ZUNsYXNzJDEoUHZGaWxlLCBbewogICAgICBrZXk6ICJtZXRhIiwKICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7CiAgICAgICAgaWYgKHRoaXMuX21ldGEgPT09IHVuZGVmaW5lZCkgewogICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oewogICAgICAgICAgdmVyc2lvbjogMAogICAgICAgIH0sIHRoaXMuX21ldGEpOwogICAgICB9CiAgICAgIC8qKg0KICAgICAgICogR2V0IHRoZSBmaWxlIHBvaW50ZXIgZnJvbSB0aGUgX2ZpbGVQdHJzIG1hcC4NCiAgICAgICAqIEBwYXJhbSBwdHIgVGhlIHBvaW50ZXIgdG8gQmFzZVB2RmlsZSBpbnN0YW5jZSB0byBnZXQgZnJvbSB0aGUgbWFwLg0KICAgICAgICogQHJldHVybnMgQmFzZVB2RmlsZSByZXR1cm5zIHRoZSBjdXJyZW50IGZpbGUgaW5zdGFuY2UgcmVsYXRlZCB0byBwdHIuDQogICAgICAgKi8KICAgIH1dLCBbewogICAgICBrZXk6ICJnZXRQdHIiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UHRyKHB0cikgewogICAgICAgIGlmIChQdkZpbGUuX2ZpbGVQdHJzLmhhcyhwdHIpKSB7CiAgICAgICAgICByZXR1cm4gUHZGaWxlLl9maWxlUHRycy5nZXQocHRyKTsKICAgICAgICB9CiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaWxlIGluc3RhbmNlIG5vdCBmb3VuZC4nKTsKICAgICAgfQogICAgICAvKioNCiAgICAgICAqIFNhdmVzIHRoZSBCYXNlUHZGaWxlIGluc3RhbmNlIHRvIHRoZSBtYXAgd2l0aCBhbiBhc3NvY2lhdGVkIHB0ci4NCiAgICAgICAqIEBwYXJhbSBwdHIgVGhlIGZpbGUgcG9pbnRlciB0byBzYXZlIGFzIHRoZSBrZXkuDQogICAgICAgKiBAcGFyYW0gaW5zdGFuY2UgVGhlIEJhc2VQdkZpbGUgaW5zdGFuY2UgdG8gc2F2ZSBhcyB0aGUgdmFsdWUuDQogICAgICAgKi8KICAgIH0sIHsKICAgICAga2V5OiAic2V0UHRyIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldFB0cihwdHIsIGluc3RhbmNlKSB7CiAgICAgICAgUHZGaWxlLl9maWxlUHRycy5zZXQocHRyLCBpbnN0YW5jZSk7CiAgICAgIH0KICAgICAgLyoqDQogICAgICAgKiBSZW1vdmVzIHRoZSBwdHIgZnJvbSB0aGUgX2ZpbGVQdHJzIG1hcC4NCiAgICAgICAqIEBwYXJhbSBwdHIgVGhlIGZpbGUgcG9pbnRlciB0byByZW1vdmUuDQogICAgICAgKi8KICAgIH0sIHsKICAgICAga2V5OiAicmVtb3ZlUHRyIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVB0cihwdHIpIHsKICAgICAgICBQdkZpbGUuX2ZpbGVQdHJzWyJkZWxldGUiXShwdHIpOwogICAgICB9CiAgICB9XSk7CiAgICByZXR1cm4gUHZGaWxlOwogIH0oKTsKICBQdkZpbGUuX2ZpbGVQdHJzID0gbmV3IE1hcCgpOwoKICBmdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfQogIGZ1bmN0aW9uIF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKSB7IGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gInVuZGVmaW5lZCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09ICJmdW5jdGlvbiIpIHJldHVybiB0cnVlOyB0cnkgeyBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoQm9vbGVhbiwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9CiAgLyoqDQogICAqIFB2RmlsZU1lbSBDbGFzcw0KICAgKiBUaGlzIGNsYXNzIG1vY2tzIHRoZSBmaWxlIHN5c3RlbSB1c2luZyBpbi1tZW1vcnkgc3RvcmFnZS4NCiAgICovCiAgdmFyIFB2RmlsZU1lbSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1B2RmlsZSkgewogICAgX2luaGVyaXRzKFB2RmlsZU1lbSwgX1B2RmlsZSk7CiAgICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKFB2RmlsZU1lbSk7CiAgICBmdW5jdGlvbiBQdkZpbGVNZW0ocGF0aCwgbWV0YSwgZGIsIG1vZGUpIHsKICAgICAgdmFyIF90aGlzOwogICAgICBfY2xhc3NDYWxsQ2hlY2skMSh0aGlzLCBQdkZpbGVNZW0pOwogICAgICBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpOwogICAgICBfdGhpcy5fcG9zID0gMDsKICAgICAgX3RoaXMuX3BhdGggPSBwYXRoOwogICAgICBfdGhpcy5fbWV0YSA9IG1ldGE7CiAgICAgIF90aGlzLl9tb2RlID0gbW9kZTsKICAgICAgcmV0dXJuIF90aGlzOwogICAgfQogICAgX2NyZWF0ZUNsYXNzJDEoUHZGaWxlTWVtLCBbewogICAgICBrZXk6ICJjbG9zZSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBjbG9zZSgpIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAicmVhZCIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWFkKHNpemUsIGNvdW50KSB7CiAgICAgICAgaWYgKCF0aGlzLmV4aXN0cygpKSB7CiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIiciLmNvbmNhdCh0aGlzLl9wYXRoLCAiJyBkb2Vzbid0IGV4aXN0LiIpKTsKICAgICAgICB9CiAgICAgICAgaWYgKHRoaXMuX2lzRU9GKSB7CiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCJFT0YiKTsKICAgICAgICAgIGVyci5uYW1lID0gIkVuZE9mRmlsZSI7CiAgICAgICAgICB0aHJvdyBlcnI7CiAgICAgICAgfQogICAgICAgIHZhciB0b0NvcHkgPSBNYXRoLm1pbihzaXplICogY291bnQsIHRoaXMuX2ZpbGUubGVuZ3RoIC0gdGhpcy5fcG9zKTsKICAgICAgICB2YXIgdG90YWxFbGVtcyA9IHRvQ29weSAtIHRvQ29weSAlIHNpemU7CiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHRvdGFsRWxlbXMpOwogICAgICAgIGJ1ZmZlci5zZXQodGhpcy5fZmlsZS5zbGljZSh0aGlzLl9wb3MsIHRoaXMuX3BvcyArIHRvdGFsRWxlbXMpLCAwKTsKICAgICAgICB0aGlzLl9wb3MgKz0gdG90YWxFbGVtczsKICAgICAgICByZXR1cm4gYnVmZmVyOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogIndyaXRlIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHdyaXRlKGNvbnRlbnQpIHsKICAgICAgICB2YXIgbmV3RmlsZSA9IG5ldyBVaW50OEFycmF5KHRoaXMuX3BvcyArIGNvbnRlbnQubGVuZ3RoKTsKICAgICAgICBpZiAodGhpcy5fZmlsZSAhPT0gdW5kZWZpbmVkKSB7CiAgICAgICAgICBuZXdGaWxlLnNldCh0aGlzLl9maWxlLnNsaWNlKDAsIHRoaXMuX3BvcykpOwogICAgICAgICAgbmV3RmlsZS5zZXQoY29udGVudCwgdGhpcy5fcG9zKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgbmV3RmlsZS5zZXQoY29udGVudCk7CiAgICAgICAgfQogICAgICAgIHRoaXMuX2ZpbGUgPSBuZXdGaWxlOwogICAgICAgIHRoaXMuX3BvcyArPSBjb250ZW50Lmxlbmd0aDsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJzZWVrIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlZWsob2Zmc2V0LCB3aGVuY2UpIHsKICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKCkgJiYgdGhpcy5fbW9kZSA9PT0gInJlYWRvbmx5IikgewogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCInIi5jb25jYXQodGhpcy5fcGF0aCwgIicgZG9lc24ndCBleGlzdC4iKSk7CiAgICAgICAgfQogICAgICAgIGlmICghdGhpcy5leGlzdHMoKSkgewogICAgICAgICAgLy8gVGhpcyBpcyB2YWxpZCBpbiBJU08gQyBidXQgbm90IHN1cHBvcnRlZCBieSB0aGlzIGN1cnJlbnQgaW1wbGVtZW50YXRpb24KICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiJyIuY29uY2F0KHRoaXMuX3BhdGgsICInIGRvZXNuJ3QgZXhpc3QuIikpOwogICAgICAgIH0KICAgICAgICBpZiAob2Zmc2V0IDwgMCkgewogICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigiRU9GIik7CiAgICAgICAgICBlcnIubmFtZSA9ICJFbmRPZkZpbGUiOwogICAgICAgICAgdGhyb3cgZXJyOwogICAgICAgIH0KICAgICAgICB2YXIgbmV3T2Zmc2V0OwogICAgICAgIGlmICh3aGVuY2UgPT09IDApIHsKICAgICAgICAgIG5ld09mZnNldCA9IE1hdGgubWluKG9mZnNldCwgdGhpcy5fZmlsZS5sZW5ndGgpOwogICAgICAgIH0gZWxzZSBpZiAod2hlbmNlID09PSAxKSB7CiAgICAgICAgICBuZXdPZmZzZXQgPSBNYXRoLm1pbih0aGlzLl9wb3MgKyBvZmZzZXQsIHRoaXMuX2ZpbGUubGVuZ3RoKTsKICAgICAgICB9IGVsc2UgaWYgKHdoZW5jZSA9PT0gMikgewogICAgICAgICAgbmV3T2Zmc2V0ID0gTWF0aC5taW4odGhpcy5fZmlsZS5sZW5ndGggKyBvZmZzZXQsIHRoaXMuX2ZpbGUubGVuZ3RoKTsKICAgICAgICB9IGVsc2UgewogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJJbnZhbGlkIG9wZXJhdGlvbjogIi5jb25jYXQod2hlbmNlLCAiLiIpKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5fcG9zID0gbmV3T2Zmc2V0OwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogInRlbGwiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gdGVsbCgpIHsKICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKCkpIHsKICAgICAgICAgIHJldHVybiAtMTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHRoaXMuX3BvczsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJyZW1vdmUiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKCkgewogICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2NhbGxlZSgpIHsKICAgICAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHsKICAgICAgICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHsKICAgICAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgICAgICBpZiAodGhpcy5leGlzdHMoKSkgewogICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjsKICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIkVOT0VOVCIpOwogICAgICAgICAgICAgIGNhc2UgMjoKICAgICAgICAgICAgICAgIFB2RmlsZU1lbS5fbWVtRmlsZXNbImRlbGV0ZSJdKHRoaXMuX3BhdGgpOwogICAgICAgICAgICAgICAgdGhpcy5fcG9zID0gMDsKICAgICAgICAgICAgICBjYXNlIDQ6CiAgICAgICAgICAgICAgY2FzZSAiZW5kIjoKICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0sIF9jYWxsZWUsIHRoaXMpOwogICAgICAgIH0pKTsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJleGlzdHMiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gZXhpc3RzKCkgewogICAgICAgIHJldHVybiB0aGlzLl9maWxlICE9PSB1bmRlZmluZWQ7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiX2lzRU9GIiwKICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7CiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcyA+PSB0aGlzLl9maWxlLmxlbmd0aDsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJfZmlsZSIsCiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkgewogICAgICAgIHJldHVybiBQdkZpbGVNZW0uX21lbUZpbGVzLmdldCh0aGlzLl9wYXRoKTsKICAgICAgfSwKICAgICAgc2V0OiBmdW5jdGlvbiBzZXQoY29udGVudCkgewogICAgICAgIFB2RmlsZU1lbS5fbWVtRmlsZXMuc2V0KHRoaXMuX3BhdGgsIGNvbnRlbnQpOwogICAgICB9CiAgICB9XSwgW3sKICAgICAga2V5OiAib3BlbiIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBvcGVuKHBhdGgsIG1vZGUpIHsKICAgICAgICB2YXIgZmlsZSA9IFB2RmlsZU1lbS5fbWVtRmlsZXMuZ2V0KHBhdGgpOwogICAgICAgIHZhciBkYk1vZGUgPSBtb2RlLmluY2x1ZGVzKCdyJykgPyAicmVhZG9ubHkiIDogInJlYWR3cml0ZSI7CiAgICAgICAgaWYgKGZpbGUgPT09IHVuZGVmaW5lZCAmJiBkYk1vZGUgPT09ICJyZWFkb25seSIpIHsKICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigiJyIuY29uY2F0KHBhdGgsICInIGRvZXNuJ3QgZXhpc3QuIikpOwogICAgICAgICAgZXJyb3IubmFtZSA9ICJGaWxlTm90RXhpc3RzIjsKICAgICAgICAgIHRocm93IGVycm9yOwogICAgICAgIH0KICAgICAgICB2YXIgZmlsZU1lbSA9IG5ldyBQdkZpbGVNZW0ocGF0aCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGRiTW9kZSk7CiAgICAgICAgaWYgKG1vZGUuaW5jbHVkZXMoJ2EnKSkgewogICAgICAgICAgZmlsZU1lbS5zZWVrKDAsIDIpOwogICAgICAgIH0KICAgICAgICByZXR1cm4gZmlsZU1lbTsKICAgICAgfQogICAgfV0pOwogICAgcmV0dXJuIFB2RmlsZU1lbTsKICB9KFB2RmlsZSk7CiAgUHZGaWxlTWVtLl9tZW1GaWxlcyA9IG5ldyBNYXAoKTsKICAvKioNCiAgICogQ2FzdCBhIHNpZ25lZCBhZGRyZXNzIHRvIHVuc2lnbmVkIGFkZHJlc3MuDQogICAqDQogICAqIEBwYXJhbSBhZGRyZXNzIFRoZSBhZGRyZXNzIHRvIGNhc3QgdG8gdW5zaWduZWQgYWRkcmVzcy4NCiAgICovCiAgZnVuY3Rpb24gdW5zaWduZWRBZGRyZXNzKGFkZHJlc3MpIHsKICAgIGlmIChhZGRyZXNzIDwgMCkgewogICAgICByZXR1cm4gYWRkcmVzcyA+Pj4gMDsKICAgIH0KICAgIHJldHVybiBhZGRyZXNzOwogIH0KCiAgdmFyIFB2WHB1QWN0aW9uOwogIChmdW5jdGlvbiAoUHZYcHVBY3Rpb24pIHsKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJJTklUIl0gPSAwXSA9ICJJTklUIjsKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJBTExPQyJdID0gMV0gPSAiQUxMT0MiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIkZSRUUiXSA9IDJdID0gIkZSRUUiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIkNPUFlfVE9fWFBVIl0gPSAzXSA9ICJDT1BZX1RPX1hQVSI7CiAgICBQdlhwdUFjdGlvbltQdlhwdUFjdGlvblsiQ09QWV9GUk9NX1hQVSJdID0gNF0gPSAiQ09QWV9GUk9NX1hQVSI7CiAgICBQdlhwdUFjdGlvbltQdlhwdUFjdGlvblsiTUVNU0VUIl0gPSA1XSA9ICJNRU1TRVQiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIlRJTUVSX1NUQVJUIl0gPSA2XSA9ICJUSU1FUl9TVEFSVCI7CiAgICBQdlhwdUFjdGlvbltQdlhwdUFjdGlvblsiVElNRVJfU1RPUCJdID0gN10gPSAiVElNRVJfU1RPUCI7CiAgICAvLyBvdGhlciB4cHUgYWN0aW9ucwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIk1BVFJJWF9WRUNUT1JfTVVMVElQTFkiXSA9IDhdID0gIk1BVFJJWF9WRUNUT1JfTVVMVElQTFkiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIlNZTkNfVkVDVE9SIl0gPSA5XSA9ICJTWU5DX1ZFQ1RPUiI7CiAgfSkoUHZYcHVBY3Rpb24gfHwgKFB2WHB1QWN0aW9uID0ge30pKTsKCiAgY29uc3Qgd2FzaV9zbmFwc2hvdF9wcmV2aWV3MV9lbXVsYXRvciA9IHsKICAgIGFyZ3NfZ2V0OiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgYXJnc19zaXplc19nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBlbnZpcm9uX2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGVudmlyb25fc2l6ZXNfZ2V0OiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgY2xvY2tfcmVzX2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGNsb2NrX3RpbWVfZ2V0OiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfYWR2aXNlOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfYWxsb2NhdGU6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9jbG9zZTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2RhdGFzeW5jOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfZmRzdGF0X2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2Zkc3RhdF9zZXRfZmxhZ3M6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9mZHN0YXRfc2V0X3JpZ2h0czogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2ZpbGVzdGF0X2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2ZpbGVzdGF0X3NldF9zaXplOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfZmlsZXN0YXRfc2V0X3RpbWVzOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcHJlYWQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9wcmVzdGF0X2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3ByZXN0YXRfZGlyX25hbWU6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9wd3JpdGU6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9yZWFkOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcmVhZGRpcjogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3JlbnVtYmVyOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfc2VlazogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3N5bmM6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF90ZWxsOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfd3JpdGU6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX2NyZWF0ZV9kaXJlY3Rvcnk6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX2ZpbGVzdGF0X2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfZmlsZXN0YXRfc2V0X3RpbWVzOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9saW5rOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9vcGVuOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9yZWFkbGluazogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfcmVtb3ZlX2RpcmVjdG9yeTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfcmVuYW1lOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9zeW1saW5rOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF91bmxpbmtfZmlsZTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBvbGxfb25lb2ZmOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcHJvY19leGl0OiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcHJvY19yYWlzZTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHNjaGVkX3lpZWxkOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcmFuZG9tX2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHNvY2tfcmVjdjogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHNvY2tfc2VuZDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHNvY2tfc2h1dGRvd246IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgfTsKCiAgdmFyIG1hdHJpeFZlY3Rvck11bHRpcGx5ID0gZnVuY3Rpb24gbWF0cml4VmVjdG9yTXVsdGlwbHkoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHMgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMubWVtQWxsb2MsCiAgICAgICAgbWVtb3J5ID0gX2RhdGEkZ2xvYmFscy5tZW1vcnk7CiAgICAgIHZhciBtYXRyaXhBZGRyZXNzID0gZGF0YS5tYXRyaXhBZGRyZXNzLAogICAgICAgIHZlY3RvckFkZHJlc3MgPSBkYXRhLnZlY3RvckFkZHJlc3MsCiAgICAgICAgbSA9IGRhdGEubSwKICAgICAgICBuID0gZGF0YS5uLAogICAgICAgIHJlc3VsdEFkZHJlc3MgPSBkYXRhLnJlc3VsdEFkZHJlc3M7CiAgICAgIHZhciBwdl9tYXRyaXhfdmVjdG9yX211bHRpcGx5ID0gZXhwb3J0cy5wdl9tYXRyaXhfdmVjdG9yX211bHRpcGx5OwogICAgICBpZiAoIW1lbUFsbG9jLmhhcyhtYXRyaXhBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKHZlY3RvckFkZHJlc3MpIHx8ICFtZW1BbGxvYy5oYXMocmVzdWx0QWRkcmVzcykpIHsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgIGNvbW1hbmQ6ICdvaycsCiAgICAgICAgICByZXN1bHQ6IG5ldyBGbG9hdDMyQXJyYXkoMCkKICAgICAgICB9KTsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgdmFyIG1lbW9yeUJ1ZmZlckZsb2F0MzIgPSBuZXcgRmxvYXQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICB2YXIgX21lbUFsbG9jJGdldCA9IG1lbUFsbG9jLmdldChtYXRyaXhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJNYXRyaXhBZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDIgPSBtZW1BbGxvYy5nZXQodmVjdG9yQWRkcmVzcyksCiAgICAgICAgd29ya2VyVmVjdG9yQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldChyZXN1bHRBZGRyZXNzKSwKICAgICAgICB3b3JrZXJSZXN1bHRBZGRyZXNzID0gX21lbUFsbG9jJGdldDMud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfbWF0cml4X3ZlY3Rvcl9tdWx0aXBseSh3b3JrZXJNYXRyaXhBZGRyZXNzLCB3b3JrZXJWZWN0b3JBZGRyZXNzLCBtLCBuLCB3b3JrZXJSZXN1bHRBZGRyZXNzKTsKICAgICAgdmFyIHJlc3VsdCA9IG1lbW9yeUJ1ZmZlckZsb2F0MzIuc2xpY2Uod29ya2VyUmVzdWx0QWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgd29ya2VyUmVzdWx0QWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCArIG0pOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snLAogICAgICAgIHJlc3VsdDogcmVzdWx0CiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBzeW5jVmVjdG9yID0gZnVuY3Rpb24gc3luY1ZlY3RvcihkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczIgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzMi5tZW1BbGxvYywKICAgICAgICBtZW1vcnkgPSBfZGF0YSRnbG9iYWxzMi5tZW1vcnk7CiAgICAgIHZhciB2ZWN0b3JBZGRyZXNzID0gZGF0YS52ZWN0b3JBZGRyZXNzLAogICAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyOwogICAgICBpZiAobWVtQWxsb2MuaGFzKHZlY3RvckFkZHJlc3MpKSB7CiAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlckZsb2F0MzIgPSBuZXcgRmxvYXQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NCA9IG1lbUFsbG9jLmdldCh2ZWN0b3JBZGRyZXNzKSwKICAgICAgICAgIHdvcmtlck1lbUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NC53b3JrZXJNZW1BZGRyZXNzOwogICAgICAgIG1lbW9yeUJ1ZmZlckZsb2F0MzIuc2V0KGJ1ZmZlciwgd29ya2VyTWVtQWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgIH0KICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgcHZNdm1BY3Rpb25NYXAgPSBfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KHt9LCBQdlhwdUFjdGlvbi5NQVRSSVhfVkVDVE9SX01VTFRJUExZLCBtYXRyaXhWZWN0b3JNdWx0aXBseSksIFB2WHB1QWN0aW9uLlNZTkNfVkVDVE9SLCBzeW5jVmVjdG9yKTsKCiAgLyogZXNsaW50IGNhbWVsY2FzZTogMCAqLwogIHZhciBQdlBpY29sbG1BdHRlbnRpb25BY3Rpb247CiAgKGZ1bmN0aW9uIChQdlBpY29sbG1BdHRlbnRpb25BY3Rpb24pIHsKICAgIFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbltQdlBpY29sbG1BdHRlbnRpb25BY3Rpb25bIkFUVEVOVElPTl9QUkVDT01QVVRFX0VOQ09ESU5HIl0gPSAyMDBdID0gIkFUVEVOVElPTl9QUkVDT01QVVRFX0VOQ09ESU5HIjsKICAgIFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbltQdlBpY29sbG1BdHRlbnRpb25BY3Rpb25bIkFUVEVOVElPTl9FTkNPREUiXSA9IDIwMV0gPSAiQVRURU5USU9OX0VOQ09ERSI7CiAgICBQdlBpY29sbG1BdHRlbnRpb25BY3Rpb25bUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uWyJBVFRFTlRJT05fQVRURU5EIl0gPSAyMDJdID0gIkFUVEVOVElPTl9BVFRFTkQiOwogICAgUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uW1B2UGljb2xsbUF0dGVudGlvbkFjdGlvblsiQVRURU5USU9OX1VQREFURV9LRVlTIl0gPSAyMDNdID0gIkFUVEVOVElPTl9VUERBVEVfS0VZUyI7CiAgICBQdlBpY29sbG1BdHRlbnRpb25BY3Rpb25bUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uWyJBVFRFTlRJT05fVVBEQVRFX1ZBTFVFUyJdID0gMjA0XSA9ICJBVFRFTlRJT05fVVBEQVRFX1ZBTFVFUyI7CiAgICBQdlBpY29sbG1BdHRlbnRpb25BY3Rpb25bUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uWyJBVFRFTlRJT05fVFJBTlNQT1NFX1FVRVJZIl0gPSAyMDVdID0gIkFUVEVOVElPTl9UUkFOU1BPU0VfUVVFUlkiOwogIH0pKFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbiB8fCAoUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uID0ge30pKTsKCiAgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgewogICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsKICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uIik7CiAgICB9CiAgfQoKICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7CiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7CiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07CiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsKICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOwogICAgICBpZiAoInZhbHVlIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsKICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOwogICAgfQogIH0KICBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7CiAgICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsKICAgIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsKICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgInByb3RvdHlwZSIsIHsKICAgICAgd3JpdGFibGU6IGZhbHNlCiAgICB9KTsKICAgIHJldHVybiBDb25zdHJ1Y3RvcjsKICB9CgogIGZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyKG8sIGFsbG93QXJyYXlMaWtlKSB7IHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09ICJ1bmRlZmluZWQiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvWyJAQGl0ZXJhdG9yIl07IGlmICghaXQpIHsgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gIm51bWJlciIpIHsgaWYgKGl0KSBvID0gaXQ7IHZhciBpID0gMDsgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307IHJldHVybiB7IHM6IEYsIG46IGZ1bmN0aW9uIG4oKSB7IGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4geyBkb25lOiB0cnVlIH07IHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogb1tpKytdIH07IH0sIGU6IGZ1bmN0aW9uIGUoX2UpIHsgdGhyb3cgX2U7IH0sIGY6IEYgfTsgfSB0aHJvdyBuZXcgVHlwZUVycm9yKCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuIik7IH0gdmFyIG5vcm1hbENvbXBsZXRpb24gPSB0cnVlLCBkaWRFcnIgPSBmYWxzZSwgZXJyOyByZXR1cm4geyBzOiBmdW5jdGlvbiBzKCkgeyBpdCA9IGl0LmNhbGwobyk7IH0sIG46IGZ1bmN0aW9uIG4oKSB7IHZhciBzdGVwID0gaXQubmV4dCgpOyBub3JtYWxDb21wbGV0aW9uID0gc3RlcC5kb25lOyByZXR1cm4gc3RlcDsgfSwgZTogZnVuY3Rpb24gZShfZTIpIHsgZGlkRXJyID0gdHJ1ZTsgZXJyID0gX2UyOyB9LCBmOiBmdW5jdGlvbiBmKCkgeyB0cnkgeyBpZiAoIW5vcm1hbENvbXBsZXRpb24gJiYgaXRbInJldHVybiJdICE9IG51bGwpIGl0WyJyZXR1cm4iXSgpOyB9IGZpbmFsbHkgeyBpZiAoZGlkRXJyKSB0aHJvdyBlcnI7IH0gfSB9OyB9CiAgZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSAic3RyaW5nIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09ICJPYmplY3QiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSAiTWFwIiB8fCBuID09PSAiU2V0IikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSAiQXJndW1lbnRzIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH0KICBmdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldOyByZXR1cm4gYXJyMjsgfQogIHZhciBQdlhwdSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7CiAgICBmdW5jdGlvbiBQdlhwdSgpIHsKICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFB2WHB1KTsKICAgIH0KICAgIF9jcmVhdGVDbGFzcyhQdlhwdSwgbnVsbCwgW3sKICAgICAga2V5OiAiYWRkWHB1IiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZFhwdShvYmpBZGRyZXNzLCBkYXRhKSB7CiAgICAgICAgUHZYcHUueHB1T2JqZWN0cy5zZXQob2JqQWRkcmVzcywgZGF0YSk7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiZ2V0WHB1IiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFhwdShvYmpBZGRyZXNzKSB7CiAgICAgICAgcmV0dXJuIFB2WHB1LnhwdU9iamVjdHMuZ2V0KG9iakFkZHJlc3MpOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogImhhc1hwdSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNYcHUob2JqQWRkcmVzcykgewogICAgICAgIHJldHVybiBQdlhwdS54cHVPYmplY3RzLmhhcyhvYmpBZGRyZXNzKTsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJyZW1vdmVYcHUiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlWHB1KG9iakFkZHJlc3MpIHsKICAgICAgICBpZiAoUHZYcHUueHB1T2JqZWN0cy5oYXMob2JqQWRkcmVzcykpIHsKICAgICAgICAgIHZhciBfUHZYcHUkeHB1T2JqZWN0cyRnZXQgPSBQdlhwdS54cHVPYmplY3RzLmdldChvYmpBZGRyZXNzKSwKICAgICAgICAgICAgZGV2aWNlTWVtID0gX1B2WHB1JHhwdU9iamVjdHMkZ2V0LmRldmljZU1lbTsKICAgICAgICAgIHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihkZXZpY2VNZW0pLAogICAgICAgICAgICBfc3RlcDsKICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgIGZvciAoX2l0ZXJhdG9yLnMoKTsgIShfc3RlcCA9IF9pdGVyYXRvci5uKCkpLmRvbmU7KSB7CiAgICAgICAgICAgICAgdmFyIG1lbUFkZHJlc3MgPSBfc3RlcC52YWx1ZTsKICAgICAgICAgICAgICBQdlhwdS5tZW1vcnlPYmplY3RzWyJkZWxldGUiXShtZW1BZGRyZXNzKTsKICAgICAgICAgICAgfQogICAgICAgICAgfSBjYXRjaCAoZXJyKSB7CiAgICAgICAgICAgIF9pdGVyYXRvci5lKGVycik7CiAgICAgICAgICB9IGZpbmFsbHkgewogICAgICAgICAgICBfaXRlcmF0b3IuZigpOwogICAgICAgICAgfQogICAgICAgICAgUHZYcHUueHB1T2JqZWN0c1siZGVsZXRlIl0ob2JqQWRkcmVzcyk7CiAgICAgICAgfQogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogImFkZE1lbW9yeSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRNZW1vcnkobWVtQWRkcmVzcywgZGF0YSkgewogICAgICAgIFB2WHB1Lm1lbW9yeU9iamVjdHMuc2V0KG1lbUFkZHJlc3MsIGRhdGEpOwogICAgICAgIFB2WHB1LnhwdU9iamVjdHMuZ2V0KGRhdGEub2JqQWRkcmVzcykuZGV2aWNlTWVtLmFkZChtZW1BZGRyZXNzKTsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJnZXRNZW1vcnkiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0TWVtb3J5KG1lbUFkZHJlc3MpIHsKICAgICAgICByZXR1cm4gUHZYcHUubWVtb3J5T2JqZWN0cy5nZXQobWVtQWRkcmVzcyk7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiaGFzTWVtb3J5IiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhc01lbW9yeShtZW1BZGRyZXNzKSB7CiAgICAgICAgcmV0dXJuIFB2WHB1Lm1lbW9yeU9iamVjdHMuaGFzKG1lbUFkZHJlc3MpOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogInJlbW92ZU1lbW9yeSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVNZW1vcnkobWVtQWRkcmVzcykgewogICAgICAgIGlmIChQdlhwdS5oYXNNZW1vcnkobWVtQWRkcmVzcykpIHsKICAgICAgICAgIFB2WHB1LnhwdU9iamVjdHMuZ2V0KFB2WHB1LmdldE1lbW9yeShtZW1BZGRyZXNzKS5vYmpBZGRyZXNzKS5kZXZpY2VNZW1bImRlbGV0ZSJdKG1lbUFkZHJlc3MpOwogICAgICAgIH0KICAgICAgICBQdlhwdS5tZW1vcnlPYmplY3RzWyJkZWxldGUiXShtZW1BZGRyZXNzKTsKICAgICAgfQogICAgfV0pOwogICAgcmV0dXJuIFB2WHB1OwogIH0oKTsKICBfZGVmaW5lUHJvcGVydHkoUHZYcHUsICJ4cHVPYmplY3RzIiwgbmV3IE1hcCgpKTsKICBfZGVmaW5lUHJvcGVydHkoUHZYcHUsICJtZW1vcnlPYmplY3RzIiwgbmV3IE1hcCgpKTsKCiAgdmFyIGF0dGVudGlvblByZWNvbXB1dGVFbmNvZGluZyA9IGZ1bmN0aW9uIGF0dGVudGlvblByZWNvbXB1dGVFbmNvZGluZyhkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFscyA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFscy5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFscy5tZW1BbGxvYzsKICAgICAgdmFyIGVuY29kaW5nQWRkcmVzcyA9IGRhdGEuZW5jb2RpbmdBZGRyZXNzLAogICAgICAgIGRpbWVuc2lvbiA9IGRhdGEuZGltZW5zaW9uLAogICAgICAgIHN0ZXBzID0gZGF0YS5zdGVwcywKICAgICAgICB0aGV0YSA9IGRhdGEudGhldGE7CiAgICAgIHZhciBwdl9waWNvbGxtX2F0dGVudGlvbl9wcmVjb21wdXRlX2VuY29kaW5nID0gZXhwb3J0cy5wdl9waWNvbGxtX2F0dGVudGlvbl9wcmVjb21wdXRlX2VuY29kaW5nOwogICAgICB2YXIgX21lbUFsbG9jJGdldCA9IG1lbUFsbG9jLmdldChlbmNvZGluZ0FkZHJlc3MpLAogICAgICAgIHdvcmtlckVuY29kaW5nQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV9hdHRlbnRpb25fcHJlY29tcHV0ZV9lbmNvZGluZyh3b3JrZXJFbmNvZGluZ0FkZHJlc3MsIGRpbWVuc2lvbiwgc3RlcHMsIHRoZXRhKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgYXR0ZW50aW9uRW5jb2RlID0gZnVuY3Rpb24gYXR0ZW50aW9uRW5jb2RlKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzMiA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczIuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMyLm1lbUFsbG9jOwogICAgICB2YXIgeEFkZHJlc3MgPSBkYXRhLnhBZGRyZXNzLAogICAgICAgIG5ld0VuY29kaW5nQWRkcmVzcyA9IGRhdGEubmV3RW5jb2RpbmdBZGRyZXNzLAogICAgICAgIG4gPSBkYXRhLm4sCiAgICAgICAgbnVtSGVhZHMgPSBkYXRhLm51bUhlYWRzLAogICAgICAgIHJvcGVJbnRlcmxlYXZlZCA9IGRhdGEucm9wZUludGVybGVhdmVkLAogICAgICAgIGhlYWREaW1lbnNpb24gPSBkYXRhLmhlYWREaW1lbnNpb24sCiAgICAgICAgcm9wZURpbWVuc2lvbiA9IGRhdGEucm9wZURpbWVuc2lvbiwKICAgICAgICBwb3NpdGlvbiA9IGRhdGEucG9zaXRpb247CiAgICAgIHZhciBwdl9waWNvbGxtX2F0dGVudGlvbl9lbmNvZGUgPSBleHBvcnRzLnB2X3BpY29sbG1fYXR0ZW50aW9uX2VuY29kZTsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldChuZXdFbmNvZGluZ0FkZHJlc3MpLAogICAgICAgIHdvcmtlck5ld0VuY29kaW5nQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQzLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHB2X3BpY29sbG1fYXR0ZW50aW9uX2VuY29kZSh3b3JrZXJYQWRkcmVzcywgd29ya2VyTmV3RW5jb2RpbmdBZGRyZXNzLCBuLCBudW1IZWFkcywgcm9wZUludGVybGVhdmVkLCBoZWFkRGltZW5zaW9uLCByb3BlRGltZW5zaW9uLCBwb3NpdGlvbik7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIGF0dGVudGlvbkF0dGVuZCA9IGZ1bmN0aW9uIGF0dGVudGlvbkF0dGVuZChkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczMgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMzLmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzMy5tZW1BbGxvYzsKICAgICAgdmFyIG51bUhlYWRzID0gZGF0YS5udW1IZWFkcywKICAgICAgICBudW1LdkhlYWRzID0gZGF0YS5udW1LdkhlYWRzLAogICAgICAgIHdpbmRvd0xlbmd0aCA9IGRhdGEud2luZG93TGVuZ3RoLAogICAgICAgIGhlYWREaW1lbnNpb24gPSBkYXRhLmhlYWREaW1lbnNpb24sCiAgICAgICAga2V5c0FkZHJlc3MgPSBkYXRhLmtleXNBZGRyZXNzLAogICAgICAgIGtleUludGVyY2VwdHNBZGRyZXNzID0gZGF0YS5rZXlJbnRlcmNlcHRzQWRkcmVzcywKICAgICAgICBrZXlTbG9wZXNBZGRyZXNzID0gZGF0YS5rZXlTbG9wZXNBZGRyZXNzLAogICAgICAgIHZhbHVlc0FkZHJlc3MgPSBkYXRhLnZhbHVlc0FkZHJlc3MsCiAgICAgICAgdmFsdWVJbnRlcmNlcHRzQWRkcmVzcyA9IGRhdGEudmFsdWVJbnRlcmNlcHRzQWRkcmVzcywKICAgICAgICB2YWx1ZVNsb3Blc0FkZHJlc3MgPSBkYXRhLnZhbHVlU2xvcGVzQWRkcmVzcywKICAgICAgICBwb3NpdGlvbiA9IGRhdGEucG9zaXRpb24sCiAgICAgICAgcXVlcnlBZGRyZXNzID0gZGF0YS5xdWVyeUFkZHJlc3MsCiAgICAgICAgbiA9IGRhdGEubiwKICAgICAgICBvdXRwdXRBZGRyZXNzID0gZGF0YS5vdXRwdXRBZGRyZXNzOwogICAgICB2YXIgcHZfcGljb2xsbV9hdHRlbnRpb25fYXR0ZW5kID0gZXhwb3J0cy5wdl9waWNvbGxtX2F0dGVudGlvbl9hdHRlbmQ7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NCA9IG1lbUFsbG9jLmdldChrZXlzQWRkcmVzcyksCiAgICAgICAgd29ya2VyS2V5c0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDUgPSBtZW1BbGxvYy5nZXQoa2V5SW50ZXJjZXB0c0FkZHJlc3MpLAogICAgICAgIHdvcmtlcktleUludGVyY2VwdHNBZGRyZXNzID0gX21lbUFsbG9jJGdldDUud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ2ID0gbWVtQWxsb2MuZ2V0KGtleVNsb3Blc0FkZHJlc3MpLAogICAgICAgIHdvcmtlcktleVNsb3Blc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Ni53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDcgPSBtZW1BbGxvYy5nZXQodmFsdWVzQWRkcmVzcyksCiAgICAgICAgd29ya2VyVmFsdWVzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ3Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0OCA9IG1lbUFsbG9jLmdldCh2YWx1ZUludGVyY2VwdHNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJWYWx1ZUludGVyY2VwdHNBZGRyZXNzID0gX21lbUFsbG9jJGdldDgud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ5ID0gbWVtQWxsb2MuZ2V0KHZhbHVlU2xvcGVzQWRkcmVzcyksCiAgICAgICAgd29ya2VyVmFsdWVTbG9wZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDkud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxMCA9IG1lbUFsbG9jLmdldChxdWVyeUFkZHJlc3MpLAogICAgICAgIHdvcmtlclF1ZXJ5QWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDExID0gbWVtQWxsb2MuZ2V0KG91dHB1dEFkZHJlc3MpLAogICAgICAgIHdvcmtlck91dHB1dEFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTEud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV9hdHRlbnRpb25fYXR0ZW5kKG51bUhlYWRzLCBudW1LdkhlYWRzLCB3aW5kb3dMZW5ndGgsIGhlYWREaW1lbnNpb24sIHdvcmtlcktleXNBZGRyZXNzLCB3b3JrZXJLZXlJbnRlcmNlcHRzQWRkcmVzcywgd29ya2VyS2V5U2xvcGVzQWRkcmVzcywgd29ya2VyVmFsdWVzQWRkcmVzcywgd29ya2VyVmFsdWVJbnRlcmNlcHRzQWRkcmVzcywgd29ya2VyVmFsdWVTbG9wZXNBZGRyZXNzLCBwb3NpdGlvbiwgd29ya2VyUXVlcnlBZGRyZXNzLCBuLCB3b3JrZXJPdXRwdXRBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgYXR0ZW50aW9uVXBkYXRlS2V5cyA9IGZ1bmN0aW9uIGF0dGVudGlvblVwZGF0ZUtleXMoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHM0ID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzNC5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFsczQubWVtQWxsb2M7CiAgICAgIHZhciBudW1LdkhlYWRzID0gZGF0YS5udW1LdkhlYWRzLAogICAgICAgIHdpbmRvd0xlbmd0aCA9IGRhdGEud2luZG93TGVuZ3RoLAogICAgICAgIGhlYWREaW1lbnNpb24gPSBkYXRhLmhlYWREaW1lbnNpb24sCiAgICAgICAga2V5c0FkZHJlc3MgPSBkYXRhLmtleXNBZGRyZXNzLAogICAgICAgIGtleUludGVyY2VwdHNBZGRyZXNzID0gZGF0YS5rZXlJbnRlcmNlcHRzQWRkcmVzcywKICAgICAgICBrZXlTbG9wZXNBZGRyZXNzID0gZGF0YS5rZXlTbG9wZXNBZGRyZXNzLAogICAgICAgIHBvc2l0aW9uID0gZGF0YS5wb3NpdGlvbiwKICAgICAgICBuID0gZGF0YS5uLAogICAgICAgIHRmQWRkcmVzcyA9IGRhdGEudGZBZGRyZXNzOwogICAgICB2YXIgcHZfcGljb2xsbV9hdHRlbnRpb25fdXBkYXRlX2tleXMgPSBleHBvcnRzLnB2X3BpY29sbG1fYXR0ZW50aW9uX3VwZGF0ZV9rZXlzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDEyID0gbWVtQWxsb2MuZ2V0KGtleXNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJLZXlzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMi53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDEzID0gbWVtQWxsb2MuZ2V0KGtleUludGVyY2VwdHNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJLZXlJbnRlcmNlcHRzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMy53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDE0ID0gbWVtQWxsb2MuZ2V0KGtleVNsb3Blc0FkZHJlc3MpLAogICAgICAgIHdvcmtlcktleVNsb3Blc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTQud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxNSA9IG1lbUFsbG9jLmdldCh0ZkFkZHJlc3MpLAogICAgICAgIHdvcmtlclRmQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxNS53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX2F0dGVudGlvbl91cGRhdGVfa2V5cyhudW1LdkhlYWRzLCB3aW5kb3dMZW5ndGgsIGhlYWREaW1lbnNpb24sIHdvcmtlcktleXNBZGRyZXNzLCB3b3JrZXJLZXlJbnRlcmNlcHRzQWRkcmVzcywgd29ya2VyS2V5U2xvcGVzQWRkcmVzcywgcG9zaXRpb24sIG4sIHdvcmtlclRmQWRkcmVzcyk7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIGF0dGVudGlvblVwZGF0ZVZhbHVlcyA9IGZ1bmN0aW9uIGF0dGVudGlvblVwZGF0ZVZhbHVlcyhkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczUgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHM1LmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzNS5tZW1BbGxvYzsKICAgICAgdmFyIG51bUt2SGVhZHMgPSBkYXRhLm51bUt2SGVhZHMsCiAgICAgICAgd2luZG93TGVuZ3RoID0gZGF0YS53aW5kb3dMZW5ndGgsCiAgICAgICAgaGVhZERpbWVuc2lvbiA9IGRhdGEuaGVhZERpbWVuc2lvbiwKICAgICAgICB2YWx1ZXNBZGRyZXNzID0gZGF0YS52YWx1ZXNBZGRyZXNzLAogICAgICAgIHZhbHVlSW50ZXJjZXB0c0FkZHJlc3MgPSBkYXRhLnZhbHVlSW50ZXJjZXB0c0FkZHJlc3MsCiAgICAgICAgdmFsdWVTbG9wZXNBZGRyZXNzID0gZGF0YS52YWx1ZVNsb3Blc0FkZHJlc3MsCiAgICAgICAgcG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uLAogICAgICAgIG4gPSBkYXRhLm4sCiAgICAgICAgdGZBZGRyZXNzID0gZGF0YS50ZkFkZHJlc3M7CiAgICAgIHZhciBwdl9waWNvbGxtX2F0dGVudGlvbl91cGRhdGVfdmFsdWVzID0gZXhwb3J0cy5wdl9waWNvbGxtX2F0dGVudGlvbl91cGRhdGVfdmFsdWVzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDE2ID0gbWVtQWxsb2MuZ2V0KHZhbHVlc0FkZHJlc3MpLAogICAgICAgIHdvcmtlclZhbHVlc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTYud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxNyA9IG1lbUFsbG9jLmdldCh2YWx1ZUludGVyY2VwdHNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJWYWx1ZUludGVyY2VwdHNBZGRyZXNzID0gX21lbUFsbG9jJGdldDE3Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0MTggPSBtZW1BbGxvYy5nZXQodmFsdWVTbG9wZXNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJWYWx1ZVNsb3Blc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTgud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxOSA9IG1lbUFsbG9jLmdldCh0ZkFkZHJlc3MpLAogICAgICAgIHdvcmtlclRmQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxOS53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX2F0dGVudGlvbl91cGRhdGVfdmFsdWVzKG51bUt2SGVhZHMsIHdpbmRvd0xlbmd0aCwgaGVhZERpbWVuc2lvbiwgd29ya2VyVmFsdWVzQWRkcmVzcywgd29ya2VyVmFsdWVJbnRlcmNlcHRzQWRkcmVzcywgd29ya2VyVmFsdWVTbG9wZXNBZGRyZXNzLCBwb3NpdGlvbiwgbiwgd29ya2VyVGZBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgYXR0ZW50aW9uVHJhbnNwb3NlUXVlcnkgPSBmdW5jdGlvbiBhdHRlbnRpb25UcmFuc3Bvc2VRdWVyeShkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczYgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHM2LmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzNi5tZW1BbGxvYzsKICAgICAgdmFyIG4gPSBkYXRhLm4sCiAgICAgICAgdGZBZGRyZXNzID0gZGF0YS50ZkFkZHJlc3MsCiAgICAgICAgaGZBZGRyZXNzID0gZGF0YS5oZkFkZHJlc3MsCiAgICAgICAgbnVtSGVhZHMgPSBkYXRhLm51bUhlYWRzLAogICAgICAgIGhlYWREaW1lbnNpb24gPSBkYXRhLmhlYWREaW1lbnNpb247CiAgICAgIHZhciBwdl9waWNvbGxtX2F0dGVudGlvbl90cmFuc3Bvc2VfcXVlcnkgPSBleHBvcnRzLnB2X3BpY29sbG1fYXR0ZW50aW9uX3RyYW5zcG9zZV9xdWVyeTsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQyMCA9IG1lbUFsbG9jLmdldCh0ZkFkZHJlc3MpLAogICAgICAgIHdvcmtlclRmQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyMC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDIxID0gbWVtQWxsb2MuZ2V0KGhmQWRkcmVzcyksCiAgICAgICAgd29ya2VySGZBZGRyZXNzID0gX21lbUFsbG9jJGdldDIxLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHB2X3BpY29sbG1fYXR0ZW50aW9uX3RyYW5zcG9zZV9xdWVyeShuLCB3b3JrZXJUZkFkZHJlc3MsIHdvcmtlckhmQWRkcmVzcywgbnVtSGVhZHMsIGhlYWREaW1lbnNpb24pOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBwdlBpY29sbG1BdHRlbnRpb25BY3Rpb25NYXAgPSBfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uLkFUVEVOVElPTl9QUkVDT01QVVRFX0VOQ09ESU5HLCBhdHRlbnRpb25QcmVjb21wdXRlRW5jb2RpbmcpLCBQdlBpY29sbG1BdHRlbnRpb25BY3Rpb24uQVRURU5USU9OX0VOQ09ERSwgYXR0ZW50aW9uRW5jb2RlKSwgUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uLkFUVEVOVElPTl9BVFRFTkQsIGF0dGVudGlvbkF0dGVuZCksIFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbi5BVFRFTlRJT05fVVBEQVRFX0tFWVMsIGF0dGVudGlvblVwZGF0ZUtleXMpLCBQdlBpY29sbG1BdHRlbnRpb25BY3Rpb24uQVRURU5USU9OX1VQREFURV9WQUxVRVMsIGF0dGVudGlvblVwZGF0ZVZhbHVlcyksIFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbi5BVFRFTlRJT05fVFJBTlNQT1NFX1FVRVJZLCBhdHRlbnRpb25UcmFuc3Bvc2VRdWVyeSk7CgogIC8qIGVzbGludCBjYW1lbGNhc2U6IDAgKi8KICB2YXIgUHZQaWNvbGxtRmVlZEZvcndhcmRBY3Rpb247CiAgKGZ1bmN0aW9uIChQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvbikgewogICAgUHZQaWNvbGxtRmVlZEZvcndhcmRBY3Rpb25bUHZQaWNvbGxtRmVlZEZvcndhcmRBY3Rpb25bIkZFRURfRk9SV0FSRF9TSUxVIl0gPSAzMDBdID0gIkZFRURfRk9SV0FSRF9TSUxVIjsKICAgIFB2UGljb2xsbUZlZWRGb3J3YXJkQWN0aW9uW1B2UGljb2xsbUZlZWRGb3J3YXJkQWN0aW9uWyJGRUVEX0ZPUldBUkRfR0VMVSJdID0gMzAxXSA9ICJGRUVEX0ZPUldBUkRfR0VMVSI7CiAgICBQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvbltQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvblsiRkVFRF9GT1JXQVJEX0FMTU9TVF9HRUxVIl0gPSAzMDJdID0gIkZFRURfRk9SV0FSRF9BTE1PU1RfR0VMVSI7CiAgICBQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvbltQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvblsiRkVFRF9GT1JXQVJEX01VTFRJUExZX0JVRkZFUlMiXSA9IDMwM10gPSAiRkVFRF9GT1JXQVJEX01VTFRJUExZX0JVRkZFUlMiOwogIH0pKFB2UGljb2xsbUZlZWRGb3J3YXJkQWN0aW9uIHx8IChQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvbiA9IHt9KSk7CgogIHZhciBmZWVkRm9yd2FyZFNpbHUgPSBmdW5jdGlvbiBmZWVkRm9yd2FyZFNpbHUoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHMgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMubWVtQWxsb2M7CiAgICAgIHZhciBuID0gZGF0YS5uLAogICAgICAgIHhBZGRyZXNzID0gZGF0YS54QWRkcmVzczsKICAgICAgdmFyIHB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX3NpbHUgPSBleHBvcnRzLnB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX3NpbHU7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0ID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV9mZWVkX2ZvcndhcmRfc2lsdShuLCB3b3JrZXJYQWRkcmVzcyk7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIGZlZWRGb3J3YXJkR2VsdSA9IGZ1bmN0aW9uIGZlZWRGb3J3YXJkR2VsdShkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczIgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMyLmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzMi5tZW1BbGxvYzsKICAgICAgdmFyIG4gPSBkYXRhLm4sCiAgICAgICAgeEFkZHJlc3MgPSBkYXRhLnhBZGRyZXNzOwogICAgICB2YXIgcHZfcGljb2xsbV9mZWVkX2ZvcndhcmRfZ2VsdSA9IGV4cG9ydHMucHZfcGljb2xsbV9mZWVkX2ZvcndhcmRfZ2VsdTsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX2dlbHUobiwgd29ya2VyWEFkZHJlc3MpOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBmZWVkRm9yd2FyZEFsbW9zdEdlbHUgPSBmdW5jdGlvbiBmZWVkRm9yd2FyZEFsbW9zdEdlbHUoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHMzID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzMy5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFsczMubWVtQWxsb2M7CiAgICAgIHZhciBuID0gZGF0YS5uLAogICAgICAgIHhBZGRyZXNzID0gZGF0YS54QWRkcmVzczsKICAgICAgdmFyIHB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX2FsbW9zdF9nZWx1ID0gZXhwb3J0cy5wdl9waWNvbGxtX2ZlZWRfZm9yd2FyZF9hbG1vc3RfZ2VsdTsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQzID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQzLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX2FsbW9zdF9nZWx1KG4sIHdvcmtlclhBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgZmVlZEZvcndhcmRNdWx0aXBseUJ1ZmZlcnMgPSBmdW5jdGlvbiBmZWVkRm9yd2FyZE11bHRpcGx5QnVmZmVycyhkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczQgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHM0LmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzNC5tZW1BbGxvYzsKICAgICAgdmFyIG4gPSBkYXRhLm4sCiAgICAgICAgeEFkZHJlc3MgPSBkYXRhLnhBZGRyZXNzLAogICAgICAgIHlBZGRyZXNzID0gZGF0YS55QWRkcmVzczsKICAgICAgdmFyIHB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX211bHRpcGx5X2J1ZmZlcnMgPSBleHBvcnRzLnB2X3BpY29sbG1fZmVlZF9mb3J3YXJkX211bHRpcGx5X2J1ZmZlcnM7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NCA9IG1lbUFsbG9jLmdldCh4QWRkcmVzcyksCiAgICAgICAgd29ya2VyWEFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDUgPSBtZW1BbGxvYy5nZXQoeUFkZHJlc3MpLAogICAgICAgIHdvcmtlcllBZGRyZXNzID0gX21lbUFsbG9jJGdldDUud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV9mZWVkX2ZvcndhcmRfbXVsdGlwbHlfYnVmZmVycyhuLCB3b3JrZXJYQWRkcmVzcywgd29ya2VyWUFkZHJlc3MpOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBwdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtRmVlZEZvcndhcmRBY3Rpb24uRkVFRF9GT1JXQVJEX1NJTFUsIGZlZWRGb3J3YXJkU2lsdSksIFB2UGljb2xsbUZlZWRGb3J3YXJkQWN0aW9uLkZFRURfRk9SV0FSRF9HRUxVLCBmZWVkRm9yd2FyZEdlbHUpLCBQdlBpY29sbG1GZWVkRm9yd2FyZEFjdGlvbi5GRUVEX0ZPUldBUkRfQUxNT1NUX0dFTFUsIGZlZWRGb3J3YXJkQWxtb3N0R2VsdSksIFB2UGljb2xsbUZlZWRGb3J3YXJkQWN0aW9uLkZFRURfRk9SV0FSRF9NVUxUSVBMWV9CVUZGRVJTLCBmZWVkRm9yd2FyZE11bHRpcGx5QnVmZmVycyk7CgogIC8qIGVzbGludCBjYW1lbGNhc2U6IDAgKi8KICB2YXIgUHZQaWNvbGxtR2F0ZUFjdGlvbjsKICAoZnVuY3Rpb24gKFB2UGljb2xsbUdhdGVBY3Rpb24pIHsKICAgIFB2UGljb2xsbUdhdGVBY3Rpb25bUHZQaWNvbGxtR2F0ZUFjdGlvblsiR0FURV9GT1JXQVJEIl0gPSA0MDBdID0gIkdBVEVfRk9SV0FSRCI7CiAgfSkoUHZQaWNvbGxtR2F0ZUFjdGlvbiB8fCAoUHZQaWNvbGxtR2F0ZUFjdGlvbiA9IHt9KSk7CgogIHZhciBnYXRlRm9yd2FyZCA9IGZ1bmN0aW9uIGdhdGVGb3J3YXJkKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzLmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzLm1lbUFsbG9jOwogICAgICB2YXIgbiA9IGRhdGEubiwKICAgICAgICBrID0gZGF0YS5rLAogICAgICAgIG51bUV4cGVydHMgPSBkYXRhLm51bUV4cGVydHMsCiAgICAgICAgaW5kaWNlc0FkZHJlc3MgPSBkYXRhLmluZGljZXNBZGRyZXNzLAogICAgICAgIHdlaWdodHNBZGRyZXNzID0gZGF0YS53ZWlnaHRzQWRkcmVzcywKICAgICAgICB5QWRkcmVzcyA9IGRhdGEueUFkZHJlc3M7CiAgICAgIHZhciBwdl9waWNvbGxtX2dhdGVfZm9yd2FyZCA9IGV4cG9ydHMucHZfcGljb2xsbV9nYXRlX2ZvcndhcmQ7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0ID0gbWVtQWxsb2MuZ2V0KGluZGljZXNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJJbmRpY2VzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KHdlaWdodHNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJXZWlnaHRzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldCh5QWRkcmVzcyksCiAgICAgICAgd29ya2VyWUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0My53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX2dhdGVfZm9yd2FyZChuLCBrLCBudW1FeHBlcnRzLCB3b3JrZXJJbmRpY2VzQWRkcmVzcywgd29ya2VyV2VpZ2h0c0FkZHJlc3MsIHdvcmtlcllBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgcHZQaWNvbGxtR2F0ZUFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtR2F0ZUFjdGlvbi5HQVRFX0ZPUldBUkQsIGdhdGVGb3J3YXJkKTsKCiAgLyogZXNsaW50IGNhbWVsY2FzZTogMCAqLwogIHZhciBQdlBpY29sbG1Nb2VUcmFuc2Zvcm1lckFjdGlvbjsKICAoZnVuY3Rpb24gKFB2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uKSB7CiAgICBQdlBpY29sbG1Nb2VUcmFuc2Zvcm1lckFjdGlvbltQdlBpY29sbG1Nb2VUcmFuc2Zvcm1lckFjdGlvblsiQUREX1RPX0JVRkZFUiJdID0gNTAwXSA9ICJBRERfVE9fQlVGRkVSIjsKICAgIFB2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uW1B2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uWyJNVUxUSVBMWV9XRUlHSFRfQU5EX0FERF9UT19CVUZGRVIiXSA9IDUwMV0gPSAiTVVMVElQTFlfV0VJR0hUX0FORF9BRERfVE9fQlVGRkVSIjsKICAgIFB2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uW1B2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uWyJBRERfQlVGRkVSUyJdID0gNTAyXSA9ICJBRERfQlVGRkVSUyI7CiAgfSkoUHZQaWNvbGxtTW9lVHJhbnNmb3JtZXJBY3Rpb24gfHwgKFB2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uID0ge30pKTsKCiAgdmFyIG1vZVRyYW5zZm9ybWVyQWRkVG9CdWZmZXIgPSBmdW5jdGlvbiBtb2VUcmFuc2Zvcm1lckFkZFRvQnVmZmVyKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzLmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzLm1lbUFsbG9jOwogICAgICB2YXIgbiA9IGRhdGEubiwKICAgICAgICB4QWRkcmVzcyA9IGRhdGEueEFkZHJlc3MsCiAgICAgICAgYnVmZmVyQWRkcmVzcyA9IGRhdGEuYnVmZmVyQWRkcmVzczsKICAgICAgdmFyIHB2X3BpY29sbG1fbW9lX3RyYW5zZm9ybWVyX2FkZF90b19idWZmZXIgPSBleHBvcnRzLnB2X3BpY29sbG1fbW9lX3RyYW5zZm9ybWVyX2FkZF90b19idWZmZXI7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0ID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KGJ1ZmZlckFkZHJlc3MpLAogICAgICAgIHdvcmtlckJ1ZmZlckFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Mi53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX21vZV90cmFuc2Zvcm1lcl9hZGRfdG9fYnVmZmVyKG4sIHdvcmtlclhBZGRyZXNzLCB3b3JrZXJCdWZmZXJBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgbW9lVHJhbnNmb3JtZXJNdWx0aXBseVdlaWdodEFuZEFkZFRvQnVmZmVyID0gZnVuY3Rpb24gbW9lVHJhbnNmb3JtZXJNdWx0aXBseVdlaWdodEFuZEFkZFRvQnVmZmVyKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzMiA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczIuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMyLm1lbUFsbG9jOwogICAgICB2YXIgbiA9IGRhdGEubiwKICAgICAgICB3ZWlnaHRzSW5kZXggPSBkYXRhLndlaWdodHNJbmRleCwKICAgICAgICB5SW5kZXggPSBkYXRhLnlJbmRleCwKICAgICAgICB3ZWlnaHRzQWRkcmVzcyA9IGRhdGEud2VpZ2h0c0FkZHJlc3MsCiAgICAgICAgeEFkZHJlc3MgPSBkYXRhLnhBZGRyZXNzLAogICAgICAgIHlBZGRyZXNzID0gZGF0YS55QWRkcmVzczsKICAgICAgdmFyIHB2X3BpY29sbG1fbW9lX3RyYW5zZm9ybWVyX211bHRpcGx5X3dlaWdodF9hbmRfYWRkX3RvX2J1ZmZlciA9IGV4cG9ydHMucHZfcGljb2xsbV9tb2VfdHJhbnNmb3JtZXJfbXVsdGlwbHlfd2VpZ2h0X2FuZF9hZGRfdG9fYnVmZmVyOwogICAgICB2YXIgX21lbUFsbG9jJGdldDMgPSBtZW1BbGxvYy5nZXQod2VpZ2h0c0FkZHJlc3MpLAogICAgICAgIHdvcmtlcldlaWdodHNBZGRyZXNzID0gX21lbUFsbG9jJGdldDMud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ0ID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ0Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NSA9IG1lbUFsbG9jLmdldCh5QWRkcmVzcyksCiAgICAgICAgd29ya2VyWUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NS53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX21vZV90cmFuc2Zvcm1lcl9tdWx0aXBseV93ZWlnaHRfYW5kX2FkZF90b19idWZmZXIobiwgd2VpZ2h0c0luZGV4LCB5SW5kZXgsIHdvcmtlcldlaWdodHNBZGRyZXNzLCB3b3JrZXJYQWRkcmVzcywgd29ya2VyWUFkZHJlc3MpOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBtb2VUcmFuc2Zvcm1lckFkZEJ1ZmZlcnMgPSBmdW5jdGlvbiBtb2VUcmFuc2Zvcm1lckFkZEJ1ZmZlcnMoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHMzID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzMy5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFsczMubWVtQWxsb2M7CiAgICAgIHZhciBuID0gZGF0YS5uLAogICAgICAgIGJ1ZmZlcjFBZGRyZXNzID0gZGF0YS5idWZmZXIxQWRkcmVzcywKICAgICAgICBidWZmZXIyQWRkcmVzcyA9IGRhdGEuYnVmZmVyMkFkZHJlc3MsCiAgICAgICAgeUFkZHJlc3MgPSBkYXRhLnlBZGRyZXNzOwogICAgICB2YXIgcHZfcGljb2xsbV9tb2VfdHJhbnNmb3JtZXJfYWRkX2J1ZmZlcnMgPSBleHBvcnRzLnB2X3BpY29sbG1fbW9lX3RyYW5zZm9ybWVyX2FkZF9idWZmZXJzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDYgPSBtZW1BbGxvYy5nZXQoYnVmZmVyMUFkZHJlc3MpLAogICAgICAgIHdvcmtlckJ1ZmZlcjFBZGRyZXNzID0gX21lbUFsbG9jJGdldDYud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ3ID0gbWVtQWxsb2MuZ2V0KGJ1ZmZlcjJBZGRyZXNzKSwKICAgICAgICB3b3JrZXJCdWZmZXIyQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ3Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0OCA9IG1lbUFsbG9jLmdldCh5QWRkcmVzcyksCiAgICAgICAgd29ya2VyWUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0OC53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX21vZV90cmFuc2Zvcm1lcl9hZGRfYnVmZmVycyhuLCB3b3JrZXJCdWZmZXIxQWRkcmVzcywgd29ya2VyQnVmZmVyMkFkZHJlc3MsIHdvcmtlcllBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgcHZQaWNvbGxtTW9lVHJhbnNmb3JtZXJBY3Rpb25NYXAgPSBfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtTW9lVHJhbnNmb3JtZXJBY3Rpb24uQUREX1RPX0JVRkZFUiwgbW9lVHJhbnNmb3JtZXJBZGRUb0J1ZmZlciksIFB2UGljb2xsbU1vZVRyYW5zZm9ybWVyQWN0aW9uLk1VTFRJUExZX1dFSUdIVF9BTkRfQUREX1RPX0JVRkZFUiwgbW9lVHJhbnNmb3JtZXJNdWx0aXBseVdlaWdodEFuZEFkZFRvQnVmZmVyKSwgUHZQaWNvbGxtTW9lVHJhbnNmb3JtZXJBY3Rpb24uQUREX0JVRkZFUlMsIG1vZVRyYW5zZm9ybWVyQWRkQnVmZmVycyk7CgogIC8qIGVzbGludCBjYW1lbGNhc2U6IDAgKi8KICB2YXIgUHZQaWNvbGxtVHJhbnNmb3JtZXJBY3Rpb247CiAgKGZ1bmN0aW9uIChQdlBpY29sbG1UcmFuc2Zvcm1lckFjdGlvbikgewogICAgUHZQaWNvbGxtVHJhbnNmb3JtZXJBY3Rpb25bUHZQaWNvbGxtVHJhbnNmb3JtZXJBY3Rpb25bIkFERF9UT19CVUZGRVIiXSA9IDcwMF0gPSAiQUREX1RPX0JVRkZFUiI7CiAgICBQdlBpY29sbG1UcmFuc2Zvcm1lckFjdGlvbltQdlBpY29sbG1UcmFuc2Zvcm1lckFjdGlvblsiQUREX0JVRkZFUlMiXSA9IDcwMV0gPSAiQUREX0JVRkZFUlMiOwogIH0pKFB2UGljb2xsbVRyYW5zZm9ybWVyQWN0aW9uIHx8IChQdlBpY29sbG1UcmFuc2Zvcm1lckFjdGlvbiA9IHt9KSk7CgogIHZhciB0cmFuc2Zvcm1lckFkZFRvQnVmZmVyID0gZnVuY3Rpb24gdHJhbnNmb3JtZXJBZGRUb0J1ZmZlcihkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFscyA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFscy5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFscy5tZW1BbGxvYzsKICAgICAgdmFyIG4gPSBkYXRhLm4sCiAgICAgICAgeEFkZHJlc3MgPSBkYXRhLnhBZGRyZXNzLAogICAgICAgIGJ1ZmZlckFkZHJlc3MgPSBkYXRhLmJ1ZmZlckFkZHJlc3M7CiAgICAgIHZhciBwdl9waWNvbGxtX3RyYW5zZm9ybWVyX2FkZF90b19idWZmZXIgPSBleHBvcnRzLnB2X3BpY29sbG1fdHJhbnNmb3JtZXJfYWRkX3RvX2J1ZmZlcjsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQgPSBtZW1BbGxvYy5nZXQoeEFkZHJlc3MpLAogICAgICAgIHdvcmtlclhBZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDIgPSBtZW1BbGxvYy5nZXQoYnVmZmVyQWRkcmVzcyksCiAgICAgICAgd29ya2VyQnVmZmVyQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHB2X3BpY29sbG1fdHJhbnNmb3JtZXJfYWRkX3RvX2J1ZmZlcihuLCB3b3JrZXJYQWRkcmVzcywgd29ya2VyQnVmZmVyQWRkcmVzcyk7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIHRyYW5zZm9ybWVyQWRkQnVmZmVycyA9IGZ1bmN0aW9uIHRyYW5zZm9ybWVyQWRkQnVmZmVycyhkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFsczIgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMyLmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzMi5tZW1BbGxvYzsKICAgICAgdmFyIG4gPSBkYXRhLm4sCiAgICAgICAgYnVmZmVyMUFkZHJlc3MgPSBkYXRhLmJ1ZmZlcjFBZGRyZXNzLAogICAgICAgIGJ1ZmZlcjJBZGRyZXNzID0gZGF0YS5idWZmZXIyQWRkcmVzcywKICAgICAgICB5QWRkcmVzcyA9IGRhdGEueUFkZHJlc3M7CiAgICAgIHZhciBwdl9waWNvbGxtX3RyYW5zZm9ybWVyX2FkZF9idWZmZXJzID0gZXhwb3J0cy5wdl9waWNvbGxtX3RyYW5zZm9ybWVyX2FkZF9idWZmZXJzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDMgPSBtZW1BbGxvYy5nZXQoYnVmZmVyMUFkZHJlc3MpLAogICAgICAgIHdvcmtlckJ1ZmZlcjFBZGRyZXNzID0gX21lbUFsbG9jJGdldDMud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ0ID0gbWVtQWxsb2MuZ2V0KGJ1ZmZlcjJBZGRyZXNzKSwKICAgICAgICB3b3JrZXJCdWZmZXIyQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ0Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NSA9IG1lbUFsbG9jLmdldCh5QWRkcmVzcyksCiAgICAgICAgd29ya2VyWUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NS53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX3RyYW5zZm9ybWVyX2FkZF9idWZmZXJzKG4sIHdvcmtlckJ1ZmZlcjFBZGRyZXNzLCB3b3JrZXJCdWZmZXIyQWRkcmVzcywgd29ya2VyWUFkZHJlc3MpOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBwdlBpY29sbG1UcmFuc2Zvcm1lckFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoe30sIFB2UGljb2xsbVRyYW5zZm9ybWVyQWN0aW9uLkFERF9UT19CVUZGRVIsIHRyYW5zZm9ybWVyQWRkVG9CdWZmZXIpLCBQdlBpY29sbG1UcmFuc2Zvcm1lckFjdGlvbi5BRERfQlVGRkVSUywgdHJhbnNmb3JtZXJBZGRCdWZmZXJzKTsKCiAgLyogZXNsaW50IGNhbWVsY2FzZTogMCAqLwogIHZhciBQdlBpY29sbG1Ob3JtQWN0aW9uOwogIChmdW5jdGlvbiAoUHZQaWNvbGxtTm9ybUFjdGlvbikgewogICAgUHZQaWNvbGxtTm9ybUFjdGlvbltQdlBpY29sbG1Ob3JtQWN0aW9uWyJOT1JNX0ZPUldBUkQiXSA9IDYwMF0gPSAiTk9STV9GT1JXQVJEIjsKICB9KShQdlBpY29sbG1Ob3JtQWN0aW9uIHx8IChQdlBpY29sbG1Ob3JtQWN0aW9uID0ge30pKTsKCiAgdmFyIG5vcm1Gb3J3YXJkID0gZnVuY3Rpb24gbm9ybUZvcndhcmQoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHMgPSBkYXRhLmdsb2JhbHMsCiAgICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMubWVtQWxsb2M7CiAgICAgIHZhciBkaW1lbnNpb24gPSBkYXRhLmRpbWVuc2lvbiwKICAgICAgICBlcHMgPSBkYXRhLmVwcywKICAgICAgICB3ZWlnaHRBZGRyZXNzID0gZGF0YS53ZWlnaHRBZGRyZXNzLAogICAgICAgIG4gPSBkYXRhLm4sCiAgICAgICAgeE9mZnNldCA9IGRhdGEueE9mZnNldCwKICAgICAgICB4QWRkcmVzcyA9IGRhdGEueEFkZHJlc3MsCiAgICAgICAgeU9mZnNldCA9IGRhdGEueU9mZnNldCwKICAgICAgICB5QWRkcmVzcyA9IGRhdGEueUFkZHJlc3M7CiAgICAgIHZhciBwdl9waWNvbGxtX25vcm1fZm9yd2FyZCA9IGV4cG9ydHMucHZfcGljb2xsbV9ub3JtX2ZvcndhcmQ7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0ID0gbWVtQWxsb2MuZ2V0KHdlaWdodEFkZHJlc3MpLAogICAgICAgIHdvcmtlcldlaWdodEFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0MiA9IG1lbUFsbG9jLmdldCh4QWRkcmVzcyksCiAgICAgICAgd29ya2VyWEFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Mi53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDMgPSBtZW1BbGxvYy5nZXQoeUFkZHJlc3MpLAogICAgICAgIHdvcmtlcllBZGRyZXNzID0gX21lbUFsbG9jJGdldDMud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV9ub3JtX2ZvcndhcmQoZGltZW5zaW9uLCBlcHMsIHdvcmtlcldlaWdodEFkZHJlc3MsIG4sIHdvcmtlclhBZGRyZXNzICsgeE9mZnNldCwgd29ya2VyWUFkZHJlc3MgKyB5T2Zmc2V0KTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgcHZQaWNvbGxtTm9ybUFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtTm9ybUFjdGlvbi5OT1JNX0ZPUldBUkQsIG5vcm1Gb3J3YXJkKTsKCiAgLyogZXNsaW50IGNhbWVsY2FzZTogMCAqLwogIHZhciBQdlBpY29sbG1Ob3JtTGF5ZXJBY3Rpb247CiAgKGZ1bmN0aW9uIChQdlBpY29sbG1Ob3JtTGF5ZXJBY3Rpb24pIHsKICAgIFB2UGljb2xsbU5vcm1MYXllckFjdGlvbltQdlBpY29sbG1Ob3JtTGF5ZXJBY3Rpb25bIk5PUk1fTEFZRVJfRk9SV0FSRCJdID0gODAwXSA9ICJOT1JNX0xBWUVSX0ZPUldBUkQiOwogIH0pKFB2UGljb2xsbU5vcm1MYXllckFjdGlvbiB8fCAoUHZQaWNvbGxtTm9ybUxheWVyQWN0aW9uID0ge30pKTsKCiAgdmFyIG5vcm1MYXllckZvcndhcmQgPSBmdW5jdGlvbiBub3JtTGF5ZXJGb3J3YXJkKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzLmV4cG9ydHMsCiAgICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzLm1lbUFsbG9jOwogICAgICB2YXIgZGltZW5zaW9uID0gZGF0YS5kaW1lbnNpb24sCiAgICAgICAgZXBzID0gZGF0YS5lcHMsCiAgICAgICAgd2VpZ2h0QWRkcmVzcyA9IGRhdGEud2VpZ2h0QWRkcmVzcywKICAgICAgICBiaWFzQWRkcmVzcyA9IGRhdGEuYmlhc0FkZHJlc3MsCiAgICAgICAgbiA9IGRhdGEubiwKICAgICAgICB4T2Zmc2V0ID0gZGF0YS54T2Zmc2V0LAogICAgICAgIHhBZGRyZXNzID0gZGF0YS54QWRkcmVzcywKICAgICAgICB5T2Zmc2V0ID0gZGF0YS55T2Zmc2V0LAogICAgICAgIHlBZGRyZXNzID0gZGF0YS55QWRkcmVzczsKICAgICAgdmFyIHB2X3BpY29sbG1fbm9ybV9sYXllcl9mb3J3YXJkID0gZXhwb3J0cy5wdl9waWNvbGxtX25vcm1fbGF5ZXJfZm9yd2FyZDsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQgPSBtZW1BbGxvYy5nZXQod2VpZ2h0QWRkcmVzcyksCiAgICAgICAgd29ya2VyV2VpZ2h0QWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KGJpYXNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJCaWFzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldCh4QWRkcmVzcyksCiAgICAgICAgd29ya2VyWEFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0My53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDQgPSBtZW1BbGxvYy5nZXQoeUFkZHJlc3MpLAogICAgICAgIHdvcmtlcllBZGRyZXNzID0gX21lbUFsbG9jJGdldDQud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV9ub3JtX2xheWVyX2ZvcndhcmQoZGltZW5zaW9uLCBlcHMsIHdvcmtlcldlaWdodEFkZHJlc3MsIHdvcmtlckJpYXNBZGRyZXNzLCBuLCB3b3JrZXJYQWRkcmVzcyArIHhPZmZzZXQsIHdvcmtlcllBZGRyZXNzICsgeU9mZnNldCk7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIHB2UGljb2xsbU5vcm1MYXllckFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtTm9ybUxheWVyQWN0aW9uLk5PUk1fTEFZRVJfRk9SV0FSRCwgbm9ybUxheWVyRm9yd2FyZCk7CgogIC8qIGVzbGludCBjYW1lbGNhc2U6IDAgKi8KICB2YXIgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uOwogIChmdW5jdGlvbiAoUHZQaWNvbGxtV2VpZ2h0QWN0aW9uKSB7CiAgICBQdlBpY29sbG1XZWlnaHRBY3Rpb25bUHZQaWNvbGxtV2VpZ2h0QWN0aW9uWyJXRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9QUkVQUk9DRVNTX0JMT0NLUyJdID0gMTAwXSA9ICJXRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9QUkVQUk9DRVNTX0JMT0NLUyI7CiAgICBQdlBpY29sbG1XZWlnaHRBY3Rpb25bUHZQaWNvbGxtV2VpZ2h0QWN0aW9uWyJXRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9GT1JXQVJEX1NJTkdMRSJdID0gMTAxXSA9ICJXRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9GT1JXQVJEX1NJTkdMRSI7CiAgICBQdlBpY29sbG1XZWlnaHRBY3Rpb25bUHZQaWNvbGxtV2VpZ2h0QWN0aW9uWyJXRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9GT1JXQVJEX01VTFRJUExFIl0gPSAxMDJdID0gIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X0ZPUldBUkRfTVVMVElQTEUiOwogICAgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uW1B2UGljb2xsbVdlaWdodEFjdGlvblsiV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfQUREX0JJQVMiXSA9IDEwM10gPSAiV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfQUREX0JJQVMiOwogICAgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uW1B2UGljb2xsbVdlaWdodEFjdGlvblsiV0VJR0hUX0ZMT0FUX0ZPUldBUkQiXSA9IDEwNF0gPSAiV0VJR0hUX0ZMT0FUX0ZPUldBUkQiOwogIH0pKFB2UGljb2xsbVdlaWdodEFjdGlvbiB8fCAoUHZQaWNvbGxtV2VpZ2h0QWN0aW9uID0ge30pKTsKCiAgdmFyIHdlaWdodEJsb2NrTWl4ZWQxNng4UHJlcHJvY2Vzc0Jsb2NrcyA9IGZ1bmN0aW9uIHdlaWdodEJsb2NrTWl4ZWQxNng4UHJlcHJvY2Vzc0Jsb2NrcyhkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgX2RhdGEkZ2xvYmFscyA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFscy5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFscy5tZW1BbGxvYywKICAgICAgICBtZW1vcnkgPSBfZGF0YSRnbG9iYWxzLm1lbW9yeTsKICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZSwKICAgICAgICBiaXREZXB0aHMgPSBkYXRhLmJpdERlcHRocywKICAgICAgICBiaXREZXB0aFN0YXJ0cyA9IGRhdGEuYml0RGVwdGhTdGFydHMsCiAgICAgICAgYmxvY2tzQWRkcmVzcyA9IGRhdGEuYmxvY2tzQWRkcmVzczsKICAgICAgdmFyIGFsaWduZWRfYWxsb2MgPSBleHBvcnRzLmFsaWduZWRfYWxsb2MsCiAgICAgICAgZnJlZSA9IGV4cG9ydHMuZnJlZSwKICAgICAgICBwdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X3ByZXByb2Nlc3NfYmxvY2tzID0gZXhwb3J0cy5wdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X3ByZXByb2Nlc3NfYmxvY2tzOwogICAgICBpZiAoIW1lbUFsbG9jLmhhcyhibG9ja3NBZGRyZXNzKSkgewogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgY29tbWFuZDogJ29rJwogICAgICAgIH0pOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICB2YXIgX21lbUFsbG9jJGdldCA9IG1lbUFsbG9jLmdldChibG9ja3NBZGRyZXNzKSwKICAgICAgICB3b3JrZXJCbG9ja3NBZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgc2hhcGVBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogc2hhcGUubGVuZ3RoKTsKICAgICAgdmFyIGJpdERlcHRoc0FkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBiaXREZXB0aHMubGVuZ3RoKTsKICAgICAgdmFyIGJpdERlcHRoc1N0YXJ0QWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIGJpdERlcHRoU3RhcnRzLmxlbmd0aCk7CiAgICAgIHZhciBtZW1vcnlCdWZmZXJJbnQzMiA9IG5ldyBJbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoc2hhcGUsIHNoYXBlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoYml0RGVwdGhzLCBiaXREZXB0aHNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgIG1lbW9yeUJ1ZmZlckludDMyLnNldChiaXREZXB0aFN0YXJ0cywgYml0RGVwdGhzU3RhcnRBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfcHJlcHJvY2Vzc19ibG9ja3Moc2hhcGVBZGRyZXNzLCBiaXREZXB0aHMubGVuZ3RoLCBiaXREZXB0aHNBZGRyZXNzLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIHdvcmtlckJsb2Nrc0FkZHJlc3MpOwogICAgICBmcmVlKHNoYXBlQWRkcmVzcyk7CiAgICAgIGZyZWUoYml0RGVwdGhzQWRkcmVzcyk7CiAgICAgIGZyZWUoYml0RGVwdGhzU3RhcnRBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgd2VpZ2h0QmxvY2tNaXhlZDE2eDhGb3J3YXJkU2luZ2xlID0gZnVuY3Rpb24gd2VpZ2h0QmxvY2tNaXhlZDE2eDhGb3J3YXJkU2luZ2xlKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzMiA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczIuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMyLm1lbUFsbG9jLAogICAgICAgIG1lbW9yeSA9IF9kYXRhJGdsb2JhbHMyLm1lbW9yeTsKICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZSwKICAgICAgICBpbmRpY2VzQWRkcmVzcyA9IGRhdGEuaW5kaWNlc0FkZHJlc3MsCiAgICAgICAgYml0RGVwdGhTdGFydHMgPSBkYXRhLmJpdERlcHRoU3RhcnRzLAogICAgICAgIGJpdERlcHRocyA9IGRhdGEuYml0RGVwdGhzLAogICAgICAgIG1ldGFzQWRkcmVzcyA9IGRhdGEubWV0YXNBZGRyZXNzLAogICAgICAgIGJsb2Nrc0FkZHJlc3MgPSBkYXRhLmJsb2Nrc0FkZHJlc3MsCiAgICAgICAgeE9mZnNldCA9IGRhdGEueE9mZnNldCwKICAgICAgICB4QWRkcmVzcyA9IGRhdGEueEFkZHJlc3MsCiAgICAgICAgeUFkZHJlc3MgPSBkYXRhLnlBZGRyZXNzOwogICAgICB2YXIgYWxpZ25lZF9hbGxvYyA9IGV4cG9ydHMuYWxpZ25lZF9hbGxvYywKICAgICAgICBmcmVlID0gZXhwb3J0cy5mcmVlLAogICAgICAgIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfZm9yd2FyZF9zaW5nbGUgPSBleHBvcnRzLnB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfZm9yd2FyZF9zaW5nbGU7CiAgICAgIGlmICghbWVtQWxsb2MuaGFzKG1ldGFzQWRkcmVzcykgfHwgIW1lbUFsbG9jLmhhcyhibG9ja3NBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKHhBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKHlBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKGluZGljZXNBZGRyZXNzKSkgewogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgY29tbWFuZDogJ29rJwogICAgICAgIH0pOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICB2YXIgX21lbUFsbG9jJGdldDIgPSBtZW1BbGxvYy5nZXQoaW5kaWNlc0FkZHJlc3MpLAogICAgICAgIHdvcmtlckluZGljZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDIud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQzID0gbWVtQWxsb2MuZ2V0KG1ldGFzQWRkcmVzcyksCiAgICAgICAgd29ya2VyTWV0YXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDMud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ0ID0gbWVtQWxsb2MuZ2V0KGJsb2Nrc0FkZHJlc3MpLAogICAgICAgIHdvcmtlckJsb2Nrc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDUgPSBtZW1BbGxvYy5nZXQoeEFkZHJlc3MpLAogICAgICAgIHdvcmtlclhBZGRyZXNzID0gX21lbUFsbG9jJGdldDUud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ2ID0gbWVtQWxsb2MuZ2V0KHlBZGRyZXNzKSwKICAgICAgICB3b3JrZXJZQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ2Lndvcmtlck1lbUFkZHJlc3M7CiAgICAgIHZhciBzaGFwZUFkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBzaGFwZS5sZW5ndGgpOwogICAgICB2YXIgYml0RGVwdGhzU3RhcnRBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogYml0RGVwdGhTdGFydHMubGVuZ3RoKTsKICAgICAgdmFyIGJpdERlcHRoc0FkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBiaXREZXB0aHMubGVuZ3RoKTsKICAgICAgdmFyIG1lbW9yeUJ1ZmZlckludDMyID0gbmV3IEludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgIG1lbW9yeUJ1ZmZlckludDMyLnNldChzaGFwZSwgc2hhcGVBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgIG1lbW9yeUJ1ZmZlckludDMyLnNldChiaXREZXB0aFN0YXJ0cywgYml0RGVwdGhzU3RhcnRBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgIG1lbW9yeUJ1ZmZlckludDMyLnNldChiaXREZXB0aHMsIGJpdERlcHRoc0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9mb3J3YXJkX3NpbmdsZShzaGFwZUFkZHJlc3MsIHdvcmtlckluZGljZXNBZGRyZXNzLCBiaXREZXB0aHMubGVuZ3RoLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIGJpdERlcHRoc0FkZHJlc3MsIHdvcmtlck1ldGFzQWRkcmVzcywgd29ya2VyQmxvY2tzQWRkcmVzcywgd29ya2VyWEFkZHJlc3MgKyB4T2Zmc2V0LCB3b3JrZXJZQWRkcmVzcyk7CiAgICAgIGZyZWUoc2hhcGVBZGRyZXNzKTsKICAgICAgZnJlZShiaXREZXB0aHNTdGFydEFkZHJlc3MpOwogICAgICBmcmVlKGJpdERlcHRoc0FkZHJlc3MpOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciB3ZWlnaHRCbG9ja01peGVkMTZ4OEZvcndhcmRNdWx0aXBsZSA9IGZ1bmN0aW9uIHdlaWdodEJsb2NrTWl4ZWQxNng4Rm9yd2FyZE11bHRpcGxlKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzMyA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczMuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMzLm1lbUFsbG9jLAogICAgICAgIG1lbW9yeSA9IF9kYXRhJGdsb2JhbHMzLm1lbW9yeTsKICAgICAgdmFyIHNoYXBlID0gZGF0YS5zaGFwZSwKICAgICAgICBpbmRpY2VzQWRkcmVzcyA9IGRhdGEuaW5kaWNlc0FkZHJlc3MsCiAgICAgICAgYml0RGVwdGhTdGFydHMgPSBkYXRhLmJpdERlcHRoU3RhcnRzLAogICAgICAgIGJpdERlcHRocyA9IGRhdGEuYml0RGVwdGhzLAogICAgICAgIG1ldGFzQWRkcmVzcyA9IGRhdGEubWV0YXNBZGRyZXNzLAogICAgICAgIGJsb2Nrc0FkZHJlc3MgPSBkYXRhLmJsb2Nrc0FkZHJlc3MsCiAgICAgICAgbiA9IGRhdGEubiwKICAgICAgICB4T2Zmc2V0ID0gZGF0YS54T2Zmc2V0LAogICAgICAgIHhBZGRyZXNzID0gZGF0YS54QWRkcmVzcywKICAgICAgICB5QWRkcmVzcyA9IGRhdGEueUFkZHJlc3M7CiAgICAgIHZhciBhbGlnbmVkX2FsbG9jID0gZXhwb3J0cy5hbGlnbmVkX2FsbG9jLAogICAgICAgIGZyZWUgPSBleHBvcnRzLmZyZWUsCiAgICAgICAgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9mb3J3YXJkX211bHRpcGxlID0gZXhwb3J0cy5wdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X2ZvcndhcmRfbXVsdGlwbGU7CiAgICAgIGlmICghbWVtQWxsb2MuaGFzKG1ldGFzQWRkcmVzcykgfHwgIW1lbUFsbG9jLmhhcyhibG9ja3NBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKHhBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKHlBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKGluZGljZXNBZGRyZXNzKSkgewogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgY29tbWFuZDogJ29rJwogICAgICAgIH0pOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICB2YXIgX21lbUFsbG9jJGdldDcgPSBtZW1BbGxvYy5nZXQoaW5kaWNlc0FkZHJlc3MpLAogICAgICAgIHdvcmtlckluZGljZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDcud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ4ID0gbWVtQWxsb2MuZ2V0KG1ldGFzQWRkcmVzcyksCiAgICAgICAgd29ya2VyTWV0YXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDgud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQ5ID0gbWVtQWxsb2MuZ2V0KGJsb2Nrc0FkZHJlc3MpLAogICAgICAgIHdvcmtlckJsb2Nrc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0OS53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDEwID0gbWVtQWxsb2MuZ2V0KHhBZGRyZXNzKSwKICAgICAgICB3b3JrZXJYQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMC53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDExID0gbWVtQWxsb2MuZ2V0KHlBZGRyZXNzKSwKICAgICAgICB3b3JrZXJZQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMS53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgc2hhcGVBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogc2hhcGUubGVuZ3RoKTsKICAgICAgdmFyIGJpdERlcHRoc1N0YXJ0QWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIGJpdERlcHRoU3RhcnRzLmxlbmd0aCk7CiAgICAgIHZhciBiaXREZXB0aHNBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogYml0RGVwdGhzLmxlbmd0aCk7CiAgICAgIHZhciBtZW1vcnlCdWZmZXJJbnQzMiA9IG5ldyBJbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoc2hhcGUsIHNoYXBlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoYml0RGVwdGhTdGFydHMsIGJpdERlcHRoc1N0YXJ0QWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoYml0RGVwdGhzLCBiaXREZXB0aHNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfZm9yd2FyZF9tdWx0aXBsZShzaGFwZUFkZHJlc3MsIHdvcmtlckluZGljZXNBZGRyZXNzLCBiaXREZXB0aHMubGVuZ3RoLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIGJpdERlcHRoc0FkZHJlc3MsIHdvcmtlck1ldGFzQWRkcmVzcywgd29ya2VyQmxvY2tzQWRkcmVzcywgbiwgd29ya2VyWEFkZHJlc3MgKyB4T2Zmc2V0LCB3b3JrZXJZQWRkcmVzcyk7CiAgICAgIGZyZWUoc2hhcGVBZGRyZXNzKTsKICAgICAgZnJlZShiaXREZXB0aHNTdGFydEFkZHJlc3MpOwogICAgICBmcmVlKGJpdERlcHRoc0FkZHJlc3MpOwogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciB3ZWlnaHRCbG9ja01peGVkMTZ4OEFkZEJpYXMgPSBmdW5jdGlvbiB3ZWlnaHRCbG9ja01peGVkMTZ4OEFkZEJpYXMoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHM0ID0gZGF0YS5nbG9iYWxzLAogICAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzNC5leHBvcnRzLAogICAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFsczQubWVtQWxsb2M7CiAgICAgIHZhciBuID0gZGF0YS5uLAogICAgICAgIGRpbWVuc2lvbiA9IGRhdGEuZGltZW5zaW9uLAogICAgICAgIHlBZGRyZXNzID0gZGF0YS55QWRkcmVzcywKICAgICAgICBiaWFzQWRkcmVzcyA9IGRhdGEuYmlhc0FkZHJlc3M7CiAgICAgIHZhciBmcmVlID0gZXhwb3J0cy5mcmVlLAogICAgICAgIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfYWRkX2JpYXMgPSBleHBvcnRzLnB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfYWRkX2JpYXM7CiAgICAgIGlmICghbWVtQWxsb2MuaGFzKHlBZGRyZXNzKSB8fCAhbWVtQWxsb2MuaGFzKGJpYXNBZGRyZXNzKSkgewogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgY29tbWFuZDogJ29rJwogICAgICAgIH0pOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgICB2YXIgX21lbUFsbG9jJGdldDEyID0gbWVtQWxsb2MuZ2V0KHlBZGRyZXNzKSwKICAgICAgICB3b3JrZXJZQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMi53b3JrZXJNZW1BZGRyZXNzOwogICAgICB2YXIgX21lbUFsbG9jJGdldDEzID0gbWVtQWxsb2MuZ2V0KGJpYXNBZGRyZXNzKSwKICAgICAgICB3b3JrZXJCaWFzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQxMy53b3JrZXJNZW1BZGRyZXNzOwogICAgICBwdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X2FkZF9iaWFzKG4sIGRpbWVuc2lvbiwgd29ya2VyWUFkZHJlc3MsIHdvcmtlckJpYXNBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgd2VpZ2h0RmxvYXRGb3J3YXJkID0gZnVuY3Rpb24gd2VpZ2h0RmxvYXRGb3J3YXJkKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzNSA9IGRhdGEuZ2xvYmFscywKICAgICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczUuZXhwb3J0cywKICAgICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHM1Lm1lbUFsbG9jOwogICAgICB2YXIgbiA9IGRhdGEubiwKICAgICAgICBuYyA9IGRhdGEubmMsCiAgICAgICAgbnIgPSBkYXRhLm5yLAogICAgICAgIHdBZGRyZXNzID0gZGF0YS53QWRkcmVzcywKICAgICAgICB4T2Zmc2V0ID0gZGF0YS54T2Zmc2V0LAogICAgICAgIHhBZGRyZXNzID0gZGF0YS54QWRkcmVzcywKICAgICAgICB5QWRkcmVzcyA9IGRhdGEueUFkZHJlc3M7CiAgICAgIHZhciBwdl9waWNvbGxtX3dlaWdodF9mbG9hdF9mb3J3YXJkID0gZXhwb3J0cy5wdl9waWNvbGxtX3dlaWdodF9mbG9hdF9mb3J3YXJkOwogICAgICBpZiAoIW1lbUFsbG9jLmhhcyh3QWRkcmVzcykgfHwgIW1lbUFsbG9jLmhhcyh4QWRkcmVzcykgfHwgIW1lbUFsbG9jLmhhcyh5QWRkcmVzcykpIHsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgICB9KTsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxNCA9IG1lbUFsbG9jLmdldCh3QWRkcmVzcyksCiAgICAgICAgd29ya2VyV0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTQud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxNSA9IG1lbUFsbG9jLmdldCh4QWRkcmVzcyksCiAgICAgICAgd29ya2VyWEFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTUud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIF9tZW1BbGxvYyRnZXQxNiA9IG1lbUFsbG9jLmdldCh5QWRkcmVzcyksCiAgICAgICAgd29ya2VyWUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0MTYud29ya2VyTWVtQWRkcmVzczsKICAgICAgcHZfcGljb2xsbV93ZWlnaHRfZmxvYXRfZm9yd2FyZChuLCBuYywgbnIsIHdvcmtlcldBZGRyZXNzLCB3b3JrZXJYQWRkcmVzcyArIHhPZmZzZXQsIHdvcmtlcllBZGRyZXNzKTsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgcHZQaWNvbGxtV2VpZ2h0QWN0aW9uTWFwID0gX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uLldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X1BSRVBST0NFU1NfQkxPQ0tTLCB3ZWlnaHRCbG9ja01peGVkMTZ4OFByZXByb2Nlc3NCbG9ja3MpLCBQdlBpY29sbG1XZWlnaHRBY3Rpb24uV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfRk9SV0FSRF9TSU5HTEUsIHdlaWdodEJsb2NrTWl4ZWQxNng4Rm9yd2FyZFNpbmdsZSksIFB2UGljb2xsbVdlaWdodEFjdGlvbi5XRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9GT1JXQVJEX01VTFRJUExFLCB3ZWlnaHRCbG9ja01peGVkMTZ4OEZvcndhcmRNdWx0aXBsZSksIFB2UGljb2xsbVdlaWdodEFjdGlvbi5XRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9BRERfQklBUywgd2VpZ2h0QmxvY2tNaXhlZDE2eDhBZGRCaWFzKSwgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uLldFSUdIVF9GTE9BVF9GT1JXQVJELCB3ZWlnaHRGbG9hdEZvcndhcmQpOwoKICBmdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH0KICBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9CiAgdmFyIGV4cG9ydHMkMTsKICB2YXIgbWVtb3J5OwogIHZhciBtZW1BbGxvYyA9IG5ldyBNYXAoKTsKICBmdW5jdGlvbiBhcnJheUJ1ZmZlclRvU3RyaW5nQXRJbmRleChhcnJheUJ1ZmZlciwgaW5kZXhTdGFydCkgewogICAgdmFyIGluZGV4RW5kID0gaW5kZXhTdGFydDsKICAgIHdoaWxlIChhcnJheUJ1ZmZlcltpbmRleEVuZF0gIT09IDApIHsKICAgICAgaW5kZXhFbmQrKzsKICAgIH0KICAgIHZhciB1dGY4ZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTsKICAgIHJldHVybiB1dGY4ZGVjb2Rlci5kZWNvZGUoYXJyYXlCdWZmZXIuc3ViYXJyYXkoaW5kZXhTdGFydCwgaW5kZXhFbmQpKTsKICB9CiAgdmFyIGdldFdhc20gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL19yZWdlbmVyYXRvclJ1bnRpbWUkMS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUod2FzbSkgewogICAgICB2YXIgcHZDb25zb2xlTG9nV2FzbSwgcHZBc3NlcnRXYXNtLCBwdlRpbWVXYXNtLCBwdkZpbGVPcGVuV2FzbSwgcHZGaWxlQ2xvc2VXYXNtLCBwdkZpbGVSZWFkV2FzbSwgcHZGaWxlV3JpdGVXYXNtLCBwdkZpbGVTZWVrV2FzbSwgcHZGaWxlVGVsbFdhc20sIHB2RmlsZVJlbW92ZVdhc20sIGluc3RhbmNlLCBhbGlnbmVkX2FsbG9jLCBhbGlnbmVkQWxsb2M7CiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lJDEud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkgewogICAgICAgIHdoaWxlICgxKSBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7CiAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgIHB2Q29uc29sZUxvZ1dhc20gPSBmdW5jdGlvbiBwdkNvbnNvbGVMb2dXYXNtKGluZGV4KSB7CiAgICAgICAgICAgICAgaW5kZXggPSB1bnNpZ25lZEFkZHJlc3MoaW5kZXgpOwogICAgICAgICAgICAgIHZhciBtZW1vcnlCdWZmZXJVaW50OCA9IG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlCiAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIGluZGV4KSk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHB2QXNzZXJ0V2FzbSA9IGZ1bmN0aW9uIHB2QXNzZXJ0V2FzbShleHByLCBsaW5lLCBmaWxlTmFtZUFkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlTmFtZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZU5hbWVBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICBpZiAoZXhwciA9PT0gMCkgewogICAgICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIGZpbGVOYW1lQWRkcmVzcyk7CiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoImFzc2VydGlvbiBmYWlsZWQgYXQgbGluZSAiLmNvbmNhdChsaW5lLCAiIGluIFwiIikuY29uY2F0KGZpbGVOYW1lLCAiXCIiKSk7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdlRpbWVXYXNtID0gZnVuY3Rpb24gcHZUaW1lV2FzbSgpIHsKICAgICAgICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwOwogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVPcGVuV2FzbSA9IGZ1bmN0aW9uIHB2RmlsZU9wZW5XYXNtKGZpbGVBZGRyZXNzLCBwYXRoQWRkcmVzcywgbW9kZUFkZHJlc3MsIHN0YXR1c0FkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgcGF0aEFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MocGF0aEFkZHJlc3MpOwogICAgICAgICAgICAgIG1vZGVBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKG1vZGVBZGRyZXNzKTsKICAgICAgICAgICAgICBzdGF0dXNBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKHN0YXR1c0FkZHJlc3MpOwogICAgICAgICAgICAgIHZhciBtZW1vcnlCdWZmZXJVaW50OCA9IG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIHZhciBtZW1vcnlCdWZmZXJJbnQzMiA9IG5ldyBJbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIHZhciBwYXRoID0gYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIHBhdGhBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbW9kZSA9IGFycmF5QnVmZmVyVG9TdHJpbmdBdEluZGV4KG1lbW9yeUJ1ZmZlclVpbnQ4LCBtb2RlQWRkcmVzcyk7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLm9wZW4ocGF0aCwgbW9kZSk7CiAgICAgICAgICAgICAgICBQdkZpbGVNZW0uc2V0UHRyKGZpbGVBZGRyZXNzLCBmaWxlKTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW3N0YXR1c0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IDA7CiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbc3RhdHVzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gLTE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVDbG9zZVdhc20gPSBmdW5jdGlvbiBwdkZpbGVDbG9zZVdhc20oZmlsZUFkZHJlc3MsIHN0YXR1c0FkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgc3RhdHVzQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhzdGF0dXNBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uZ2V0UHRyKGZpbGVBZGRyZXNzKTsKICAgICAgICAgICAgICAgIGZpbGUuY2xvc2UoKTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW3N0YXR1c0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IDA7CiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbc3RhdHVzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gLTE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVSZWFkV2FzbSA9IGZ1bmN0aW9uIHB2RmlsZVJlYWRXYXNtKGZpbGVBZGRyZXNzLCBjb250ZW50QWRkcmVzcywgc2l6ZSwgY291bnQsIG51bVJlYWRBZGRyZXNzKSB7CiAgICAgICAgICAgICAgZmlsZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZUFkZHJlc3MpOwogICAgICAgICAgICAgIGNvbnRlbnRBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKGNvbnRlbnRBZGRyZXNzKTsKICAgICAgICAgICAgICBudW1SZWFkQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhudW1SZWFkQWRkcmVzcyk7CiAgICAgICAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlclVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlckludDMyID0gbmV3IEludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLmdldFB0cihmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGZpbGUucmVhZChzaXplLCBjb3VudCk7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJVaW50OC5zZXQoY29udGVudCwgY29udGVudEFkZHJlc3MpOwogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbbnVtUmVhZEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IGNvbnRlbnQubGVuZ3RoIC8gc2l6ZTsKICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMltudW1SZWFkQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gLTE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVXcml0ZVdhc20gPSBmdW5jdGlvbiBwdkZpbGVXcml0ZVdhc20oZmlsZUFkZHJlc3MsIGNvbnRlbnRBZGRyZXNzLCBzaXplLCBjb3VudCwgbnVtV3JpdGVBZGRyZXNzKSB7CiAgICAgICAgICAgICAgZmlsZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZUFkZHJlc3MpOwogICAgICAgICAgICAgIGNvbnRlbnRBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKGNvbnRlbnRBZGRyZXNzKTsKICAgICAgICAgICAgICBudW1Xcml0ZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MobnVtV3JpdGVBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uZ2V0UHRyKGZpbGVBZGRyZXNzKTsKICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSAqIGNvdW50KTsKICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0KG1lbW9yeUJ1ZmZlclVpbnQ4LnNsaWNlKGNvbnRlbnRBZGRyZXNzLCBjb250ZW50QWRkcmVzcyArIHNpemUgKiBjb3VudCksIDApOwogICAgICAgICAgICAgICAgZmlsZS53cml0ZShjb250ZW50KTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW251bVdyaXRlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gY29udGVudC5sZW5ndGggLyBzaXplOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW251bVdyaXRlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gMTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHB2RmlsZVNlZWtXYXNtID0gZnVuY3Rpb24gcHZGaWxlU2Vla1dhc20oZmlsZUFkZHJlc3MsIG9mZnNldCwgd2hlbmNlLCBzdGF0dXNBZGRyZXNzKSB7CiAgICAgICAgICAgICAgZmlsZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZUFkZHJlc3MpOwogICAgICAgICAgICAgIHN0YXR1c0FkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3Moc3RhdHVzQWRkcmVzcyk7CiAgICAgICAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlckludDMyID0gbmV3IEludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLmdldFB0cihmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgICBmaWxlLnNlZWsob2Zmc2V0LCB3aGVuY2UpOwogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbc3RhdHVzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gMDsKICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMltzdGF0dXNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVF0gPSAtMTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHB2RmlsZVRlbGxXYXNtID0gZnVuY3Rpb24gcHZGaWxlVGVsbFdhc20oZmlsZUFkZHJlc3MsIG9mZnNldEFkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgb2Zmc2V0QWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhvZmZzZXRBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uZ2V0UHRyKGZpbGVBZGRyZXNzKTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW29mZnNldEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IGZpbGUudGVsbCgpOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW29mZnNldEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IC0xOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgICAgcHZGaWxlUmVtb3ZlV2FzbSA9IGZ1bmN0aW9uIHB2RmlsZVJlbW92ZVdhc20ocGF0aEFkZHJlc3MsIHN0YXR1c0FkZHJlc3MpIHsKICAgICAgICAgICAgICBwYXRoQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhwYXRoQWRkcmVzcyk7CiAgICAgICAgICAgICAgc3RhdHVzQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhzdGF0dXNBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB2YXIgcGF0aCA9IGFycmF5QnVmZmVyVG9TdHJpbmdBdEluZGV4KG1lbW9yeUJ1ZmZlclVpbnQ4LCBwYXRoQWRkcmVzcyk7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLm9wZW4ocGF0aCwgInciKTsKICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlKCk7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMltzdGF0dXNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVF0gPSAwOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW3N0YXR1c0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IC0xOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEyOwogICAgICAgICAgICByZXR1cm4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUod2FzbSwgewogICAgICAgICAgICAgIHdhc2lfc25hcHNob3RfcHJldmlldzE6IHdhc2lfc25hcHNob3RfcHJldmlldzFfZW11bGF0b3IsCiAgICAgICAgICAgICAgZW52OiB7CiAgICAgICAgICAgICAgICBtZW1vcnk6IG1lbW9yeSwKICAgICAgICAgICAgICAgIHB2X2NvbnNvbGVfbG9nX3dhc206IHB2Q29uc29sZUxvZ1dhc20sCiAgICAgICAgICAgICAgICBwdl9hc3NlcnRfd2FzbTogcHZBc3NlcnRXYXNtLAogICAgICAgICAgICAgICAgcHZfdGltZV93YXNtOiBwdlRpbWVXYXNtLAogICAgICAgICAgICAgICAgcHZfZmlsZV9vcGVuX3dhc206IHB2RmlsZU9wZW5XYXNtLAogICAgICAgICAgICAgICAgcHZfZmlsZV9jbG9zZV93YXNtOiBwdkZpbGVDbG9zZVdhc20sCiAgICAgICAgICAgICAgICBwdl9maWxlX3JlYWRfd2FzbTogcHZGaWxlUmVhZFdhc20sCiAgICAgICAgICAgICAgICBwdl9maWxlX3dyaXRlX3dhc206IHB2RmlsZVdyaXRlV2FzbSwKICAgICAgICAgICAgICAgIHB2X2ZpbGVfc2Vla193YXNtOiBwdkZpbGVTZWVrV2FzbSwKICAgICAgICAgICAgICAgIHB2X2ZpbGVfdGVsbF93YXNtOiBwdkZpbGVUZWxsV2FzbSwKICAgICAgICAgICAgICAgIHB2X2ZpbGVfcmVtb3ZlX3dhc206IHB2RmlsZVJlbW92ZVdhc20KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0pOwogICAgICAgICAgY2FzZSAxMjoKICAgICAgICAgICAgaW5zdGFuY2UgPSBfY29udGV4dC5zZW50Lmluc3RhbmNlOwogICAgICAgICAgICBhbGlnbmVkX2FsbG9jID0gaW5zdGFuY2UuZXhwb3J0cy5hbGlnbmVkX2FsbG9jOwogICAgICAgICAgICBhbGlnbmVkQWxsb2MgPSBmdW5jdGlvbiBhbGlnbmVkQWxsb2MoYWxpZ25tZW50LCBzaXplKSB7CiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lCiAgICAgICAgICAgICAgdmFyIHBvaW50ZXIgPSBhbGlnbmVkX2FsbG9jKGFsaWdubWVudCwgc2l6ZSk7CiAgICAgICAgICAgICAgaWYgKHBvaW50ZXIgPCAwKSB7CiAgICAgICAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciA+Pj4gMDsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcmV0dXJuIHBvaW50ZXI7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoInJldHVybiIsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgaW5zdGFuY2UuZXhwb3J0cyksIHt9LCB7CiAgICAgICAgICAgICAgYWxpZ25lZF9hbGxvYzogYWxpZ25lZEFsbG9jCiAgICAgICAgICAgIH0pKTsKICAgICAgICAgIGNhc2UgMTY6CiAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpOwogICAgICAgIH0KICAgICAgfSwgX2NhbGxlZSk7CiAgICB9KSk7CiAgICByZXR1cm4gZnVuY3Rpb24gZ2V0V2FzbShfeCkgewogICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOwogICAgfTsKICB9KCk7CiAgdmFyIGluaXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgdmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lJDEubWFyayhmdW5jdGlvbiBfY2FsbGVlMihkYXRhKSB7CiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lJDEud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7CiAgICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkgewogICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICBfY29udGV4dDIucHJldiA9IDA7CiAgICAgICAgICAgIG1lbW9yeSA9IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoewogICAgICAgICAgICAgIGluaXRpYWw6IDQwOTYsCiAgICAgICAgICAgICAgbWF4aW11bTogNjU1MzYKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gNDsKICAgICAgICAgICAgcmV0dXJuIGdldFdhc20oZGF0YS53YXNtKTsKICAgICAgICAgIGNhc2UgNDoKICAgICAgICAgICAgZXhwb3J0cyQxID0gX2NvbnRleHQyLnNlbnQ7CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMTE7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgY2FzZSA4OgogICAgICAgICAgICBfY29udGV4dDIucHJldiA9IDg7CiAgICAgICAgICAgIF9jb250ZXh0Mi50MCA9IF9jb250ZXh0MlsiY2F0Y2giXSgwKTsKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICAgICAgICBtZXNzYWdlOiBfY29udGV4dDIudDAubWVzc2FnZQogICAgICAgICAgICB9KTsKICAgICAgICAgIGNhc2UgMTE6CiAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTsKICAgICAgICB9CiAgICAgIH0sIF9jYWxsZWUyLCBudWxsLCBbWzAsIDhdXSk7CiAgICB9KSk7CiAgICByZXR1cm4gZnVuY3Rpb24gaW5pdChfeDIpIHsKICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7CiAgICB9OwogIH0oKTsKICB2YXIgYWxsb2NNZW0gPSBmdW5jdGlvbiBhbGxvY01lbShkYXRhKSB7CiAgICB0cnkgewogICAgICB2YXIgc2l6ZSA9IGRhdGEuc2l6ZSwKICAgICAgICBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzOwogICAgICB2YXIgX2V4cG9ydHMgPSBleHBvcnRzJDEsCiAgICAgICAgX2FsaWduZWRfYWxsb2MgPSBfZXhwb3J0cy5hbGlnbmVkX2FsbG9jOwogICAgICBpZiAoc2l6ZSA+IDApIHsKICAgICAgICB2YXIgd29ya2VyTWVtQWRkcmVzcyA9IF9hbGlnbmVkX2FsbG9jKFVpbnQ4QXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIHNpemUgKiBVaW50OEFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICBtZW1BbGxvYy5zZXQobWVtQWRkcmVzcywgewogICAgICAgICAgYWxsb2NTaXplOiBzaXplLAogICAgICAgICAgd29ya2VyTWVtQWRkcmVzczogd29ya2VyTWVtQWRkcmVzcwogICAgICAgIH0pOwogICAgICB9CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIGZyZWVNZW0gPSBmdW5jdGlvbiBmcmVlTWVtKGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzOwogICAgICB2YXIgX2V4cG9ydHMyID0gZXhwb3J0cyQxLAogICAgICAgIGZyZWUgPSBfZXhwb3J0czIuZnJlZTsKICAgICAgaWYgKG1lbUFsbG9jLmhhcyhtZW1BZGRyZXNzKSkgewogICAgICAgIHZhciBfbWVtQWxsb2MkZ2V0ID0gbWVtQWxsb2MuZ2V0KG1lbUFkZHJlc3MpLAogICAgICAgICAgd29ya2VyTWVtQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQud29ya2VyTWVtQWRkcmVzczsKICAgICAgICBmcmVlKHdvcmtlck1lbUFkZHJlc3MpOwogICAgICAgIG1lbUFsbG9jWyJkZWxldGUiXShtZW1BZGRyZXNzKTsKICAgICAgfQogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBjb3B5VG9YcHUgPSBmdW5jdGlvbiBjb3B5VG9YcHUoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIG1lbUFkZHJlc3MgPSBkYXRhLm1lbUFkZHJlc3MsCiAgICAgICAgb2Zmc2V0ID0gZGF0YS5vZmZzZXQsCiAgICAgICAgYnVmZmVyID0gZGF0YS5idWZmZXI7CiAgICAgIGlmIChtZW1BbGxvYy5oYXMobWVtQWRkcmVzcykpIHsKICAgICAgICB2YXIgX21lbUFsbG9jJGdldDIgPSBtZW1BbGxvYy5nZXQobWVtQWRkcmVzcyksCiAgICAgICAgICB3b3JrZXJNZW1BZGRyZXNzID0gX21lbUFsbG9jJGdldDIud29ya2VyTWVtQWRkcmVzczsKICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICBtZW1vcnlCdWZmZXJVaW50OC5zZXQoYnVmZmVyLCB3b3JrZXJNZW1BZGRyZXNzICsgb2Zmc2V0KTsKICAgICAgfQogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBjb3B5RnJvbVhwdSA9IGZ1bmN0aW9uIGNvcHlGcm9tWHB1KGRhdGEpIHsKICAgIHRyeSB7CiAgICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzLAogICAgICAgIG9mZnNldCA9IGRhdGEub2Zmc2V0LAogICAgICAgIHNpemUgPSBkYXRhLnNpemU7CiAgICAgIGlmIChtZW1BbGxvYy5oYXMobWVtQWRkcmVzcykpIHsKICAgICAgICB2YXIgX21lbUFsbG9jJGdldDMgPSBtZW1BbGxvYy5nZXQobWVtQWRkcmVzcyksCiAgICAgICAgICB3b3JrZXJNZW1BZGRyZXNzID0gX21lbUFsbG9jJGdldDMud29ya2VyTWVtQWRkcmVzczsKICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgIGNvbW1hbmQ6ICdvaycsCiAgICAgICAgICByZXN1bHQ6IG1lbW9yeUJ1ZmZlclVpbnQ4LnNsaWNlKHdvcmtlck1lbUFkZHJlc3MgKyBvZmZzZXQsIHdvcmtlck1lbUFkZHJlc3MgKyBvZmZzZXQgKyBzaXplKQogICAgICAgIH0pOwogICAgICB9IGVsc2UgewogICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgY29tbWFuZDogJ29rJywKICAgICAgICAgIHJlc3VsdDogbmV3IFVpbnQ4QXJyYXkoMCkKICAgICAgICB9KTsKICAgICAgfQogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciBtZW1zZXQgPSBmdW5jdGlvbiBtZW1zZXQoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIG1lbUFkZHJlc3MgPSBkYXRhLm1lbUFkZHJlc3MsCiAgICAgICAgZmlsbEJ5dGUgPSBkYXRhLmZpbGxCeXRlLAogICAgICAgIHNpemUgPSBkYXRhLnNpemU7CiAgICAgIGlmIChtZW1BbGxvYy5oYXMobWVtQWRkcmVzcykpIHsKICAgICAgICB2YXIgX21lbUFsbG9jJGdldDQgPSBtZW1BbGxvYy5nZXQobWVtQWRkcmVzcyksCiAgICAgICAgICB3b3JrZXJNZW1BZGRyZXNzID0gX21lbUFsbG9jJGdldDQud29ya2VyTWVtQWRkcmVzczsKICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICBtZW1vcnlCdWZmZXJVaW50OC5maWxsKGZpbGxCeXRlLCB3b3JrZXJNZW1BZGRyZXNzLCB3b3JrZXJNZW1BZGRyZXNzICsgc2l6ZSk7CiAgICAgIH0KICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ29rJwogICAgICB9KTsKICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgY29tbWFuZDogJ2Vycm9yJywKICAgICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UKICAgICAgfSk7CiAgICB9CiAgfTsKICB2YXIgdGltZXJTdGFydCA9IGZ1bmN0aW9uIHRpbWVyU3RhcnQoZGF0YSkgewogICAgdHJ5IHsKICAgICAgdmFyIHdvcmtlckluZGV4ID0gZGF0YS53b3JrZXJJbmRleDsKICAgICAgdmFyIF9leHBvcnRzMyA9IGV4cG9ydHMkMSwKICAgICAgICBwdl9waWNvbGxtX3RpbWVyX3N0YXJ0X3dhc20gPSBfZXhwb3J0czMucHZfcGljb2xsbV90aW1lcl9zdGFydF93YXNtOwogICAgICBpZiAocHZfcGljb2xsbV90aW1lcl9zdGFydF93YXNtKSB7CiAgICAgICAgcHZfcGljb2xsbV90aW1lcl9zdGFydF93YXNtKHdvcmtlckluZGV4KTsKICAgICAgfQogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnb2snCiAgICAgIH0pOwogICAgfSBjYXRjaCAoZSkgewogICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZQogICAgICB9KTsKICAgIH0KICB9OwogIHZhciB0aW1lclN0b3AgPSBmdW5jdGlvbiB0aW1lclN0b3AoKSB7CiAgICB0cnkgewogICAgICB2YXIgX2V4cG9ydHM0ID0gZXhwb3J0cyQxLAogICAgICAgIHB2X3BpY29sbG1fdGltZXJfc3RvcF93YXNtID0gX2V4cG9ydHM0LnB2X3BpY29sbG1fdGltZXJfc3RvcF93YXNtOwogICAgICBpZiAocHZfcGljb2xsbV90aW1lcl9zdG9wX3dhc20pIHsKICAgICAgICBwdl9waWNvbGxtX3RpbWVyX3N0b3Bfd2FzbSgpOwogICAgICB9CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdvaycKICAgICAgfSk7CiAgICB9IGNhdGNoIChlKSB7CiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgIGNvbW1hbmQ6ICdlcnJvcicsCiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIHhwdUFjdGlvbk1hcCA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoe30sIFB2WHB1QWN0aW9uLklOSVQsIGluaXQpLCBQdlhwdUFjdGlvbi5BTExPQywgYWxsb2NNZW0pLCBQdlhwdUFjdGlvbi5GUkVFLCBmcmVlTWVtKSwgUHZYcHVBY3Rpb24uQ09QWV9UT19YUFUsIGNvcHlUb1hwdSksIFB2WHB1QWN0aW9uLkNPUFlfRlJPTV9YUFUsIGNvcHlGcm9tWHB1KSwgUHZYcHVBY3Rpb24uTUVNU0VULCBtZW1zZXQpLCBQdlhwdUFjdGlvbi5USU1FUl9TVEFSVCwgdGltZXJTdGFydCksIFB2WHB1QWN0aW9uLlRJTUVSX1NUT1AsIHRpbWVyU3RvcCksIHB2TXZtQWN0aW9uTWFwKSwgcHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uTWFwKSwgcHZQaWNvbGxtRmVlZEZvcndhcmRBY3Rpb25NYXApLCBwdlBpY29sbG1HYXRlQWN0aW9uTWFwKSwgcHZQaWNvbGxtTW9lVHJhbnNmb3JtZXJBY3Rpb25NYXApLCBwdlBpY29sbG1Ob3JtQWN0aW9uTWFwKSwgcHZQaWNvbGxtTm9ybUxheWVyQWN0aW9uTWFwKSwgcHZQaWNvbGxtVHJhbnNmb3JtZXJBY3Rpb25NYXApLCBwdlBpY29sbG1XZWlnaHRBY3Rpb25NYXApOwogIHNlbGYub25tZXNzYWdlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHsKICAgIHZhciBfcmVmMyA9IF9hc3luY1RvR2VuZXJhdG9yKCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yUnVudGltZSQxLm1hcmsoZnVuY3Rpb24gX2NhbGxlZTMoZXZlbnQpIHsKICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUkMS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUzJChfY29udGV4dDMpIHsKICAgICAgICB3aGlsZSAoMSkgc3dpdGNoIChfY29udGV4dDMucHJldiA9IF9jb250ZXh0My5uZXh0KSB7CiAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgIGlmICghKGV2ZW50LmRhdGEuYWN0aW9uIGluIHhwdUFjdGlvbk1hcCkpIHsKICAgICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDY7CiAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZXZlbnQuZGF0YS5nbG9iYWxzID0gewogICAgICAgICAgICAgIGV4cG9ydHM6IGV4cG9ydHMkMSwKICAgICAgICAgICAgICBtZW1vcnk6IG1lbW9yeSwKICAgICAgICAgICAgICBtZW1BbGxvYzogbWVtQWxsb2MKICAgICAgICAgICAgfTsKICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSA0OwogICAgICAgICAgICByZXR1cm4geHB1QWN0aW9uTWFwW2V2ZW50LmRhdGEuYWN0aW9uXShldmVudC5kYXRhKTsKICAgICAgICAgIGNhc2UgNDoKICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSA3OwogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgNjoKICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgY29tbWFuZDogJ2ZhaWxlZCcsCiAgICAgICAgICAgICAgbWVzc2FnZTogIlVucmVjb2duaXplZCBjb21tYW5kOiAiLmNvbmNhdChldmVudC5kYXRhLmFjdGlvbikKICAgICAgICAgICAgfSk7CiAgICAgICAgICBjYXNlIDc6CiAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTsKICAgICAgICB9CiAgICAgIH0sIF9jYWxsZWUzKTsKICAgIH0pKTsKICAgIHJldHVybiBmdW5jdGlvbiAoX3gzKSB7CiAgICAgIHJldHVybiBfcmVmMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOwogICAgfTsKICB9KCk7Cgp9KSgpOwoK', null, false);
/* eslint-enable */

var PvXpuAction;
(function (PvXpuAction) {
  PvXpuAction[PvXpuAction["INIT"] = 0] = "INIT";
  PvXpuAction[PvXpuAction["ALLOC"] = 1] = "ALLOC";
  PvXpuAction[PvXpuAction["FREE"] = 2] = "FREE";
  PvXpuAction[PvXpuAction["COPY_TO_XPU"] = 3] = "COPY_TO_XPU";
  PvXpuAction[PvXpuAction["COPY_FROM_XPU"] = 4] = "COPY_FROM_XPU";
  PvXpuAction[PvXpuAction["MEMSET"] = 5] = "MEMSET";
  PvXpuAction[PvXpuAction["TIMER_START"] = 6] = "TIMER_START";
  PvXpuAction[PvXpuAction["TIMER_STOP"] = 7] = "TIMER_STOP";
  // other xpu actions
  PvXpuAction[PvXpuAction["MATRIX_VECTOR_MULTIPLY"] = 8] = "MATRIX_VECTOR_MULTIPLY";
  PvXpuAction[PvXpuAction["SYNC_VECTOR"] = 9] = "SYNC_VECTOR";
})(PvXpuAction || (PvXpuAction = {}));

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

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var PvXpu = /*#__PURE__*/function () {
  function PvXpu() {
    _classCallCheck(this, PvXpu);
  }
  _createClass(PvXpu, null, [{
    key: "addXpu",
    value: function addXpu(objAddress, data) {
      PvXpu.xpuObjects.set(objAddress, data);
    }
  }, {
    key: "getXpu",
    value: function getXpu(objAddress) {
      return PvXpu.xpuObjects.get(objAddress);
    }
  }, {
    key: "hasXpu",
    value: function hasXpu(objAddress) {
      return PvXpu.xpuObjects.has(objAddress);
    }
  }, {
    key: "removeXpu",
    value: function removeXpu(objAddress) {
      if (PvXpu.xpuObjects.has(objAddress)) {
        var _PvXpu$xpuObjects$get = PvXpu.xpuObjects.get(objAddress),
          deviceMem = _PvXpu$xpuObjects$get.deviceMem;
        var _iterator = _createForOfIteratorHelper$1(deviceMem),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var memAddress = _step.value;
            PvXpu.memoryObjects["delete"](memAddress);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        PvXpu.xpuObjects["delete"](objAddress);
      }
    }
  }, {
    key: "addMemory",
    value: function addMemory(memAddress, data) {
      PvXpu.memoryObjects.set(memAddress, data);
      PvXpu.xpuObjects.get(data.objAddress).deviceMem.add(memAddress);
    }
  }, {
    key: "getMemory",
    value: function getMemory(memAddress) {
      return PvXpu.memoryObjects.get(memAddress);
    }
  }, {
    key: "hasMemory",
    value: function hasMemory(memAddress) {
      return PvXpu.memoryObjects.has(memAddress);
    }
  }, {
    key: "removeMemory",
    value: function removeMemory(memAddress) {
      if (PvXpu.hasMemory(memAddress)) {
        PvXpu.xpuObjects.get(PvXpu.getMemory(memAddress).objAddress).deviceMem["delete"](memAddress);
      }
      PvXpu.memoryObjects["delete"](memAddress);
    }
  }]);
  return PvXpu;
}();
_defineProperty(PvXpu, "xpuObjects", new Map());
_defineProperty(PvXpu, "memoryObjects", new Map());
var waitForWorker = function waitForWorker(worker, command, options) {
  worker.postMessage(command, options);
  return new Promise(function (resolve, reject) {
    worker.onmessage = function (e) {
      switch (e.data.command) {
        case "ok":
          resolve(e.data.result);
          break;
        case "failed":
        case "error":
          reject(e.data.message);
          break;
        default:
          reject("Unrecognized command: ".concat(e.data.command));
      }
    };
  });
};

var getMvmWasmFunctions = function getMvmWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvXpuMatrixVectorMultiply = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, matrixAddress, vectorAddress, m, n, resultAddress, statusAddress) {
      var obj, matrixMem, numWorkers, chunkSize, remaining, workerResults, i, resultBuffer, results, _i, _i2;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 4;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 4:
            matrixMem = PvXpu.getMemory(matrixAddress);
            if (matrixMem) {
              _context.next = 8;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 8:
            numWorkers = obj.numWorkers;
            chunkSize = matrixMem.chunkSize / (n / 2);
            remaining = m;
            workerResults = [];
            i = 0;
          case 13:
            if (!(i < numWorkers)) {
              _context.next = 21;
              break;
            }
            workerResults.push(waitForWorker(obj.workers[i], {
              action: PvXpuAction.MATRIX_VECTOR_MULTIPLY,
              matrixAddress: matrixAddress,
              vectorAddress: vectorAddress,
              m: Math.min(remaining, chunkSize),
              n: n,
              resultAddress: resultAddress
            }));
            remaining -= chunkSize;
            if (!(remaining <= 0)) {
              _context.next = 18;
              break;
            }
            return _context.abrupt("break", 21);
          case 18:
            i++;
            _context.next = 13;
            break;
          case 21:
            resultBuffer = new Float32Array(n);
            _context.next = 24;
            return Promise.all(workerResults);
          case 24:
            results = _context.sent;
            for (_i = 0; _i < results.length; _i++) {
              if (results[_i].length > 0) {
                resultBuffer.set(results[_i], _i * chunkSize);
              }
            }
            workerResults = [];
            for (_i2 = 0; _i2 < numWorkers; _i2++) {
              workerResults.push(waitForWorker(obj.workers[_i2], {
                action: PvXpuAction.SYNC_VECTOR,
                vectorAddress: resultAddress,
                buffer: resultBuffer
              }));
            }
            _context.next = 30;
            return Promise.all(workerResults);
          case 30:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvXpuMatrixVectorMultiply(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    pv_matrix_vector_multiply_web_worker_wasm: pvXpuMatrixVectorMultiply
  };
};

/* eslint camelcase: 0 */
var PvPicollmAttentionAction;
(function (PvPicollmAttentionAction) {
  PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_PRECOMPUTE_ENCODING"] = 200] = "ATTENTION_PRECOMPUTE_ENCODING";
  PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_ENCODE"] = 201] = "ATTENTION_ENCODE";
  PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_ATTEND"] = 202] = "ATTENTION_ATTEND";
  PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_UPDATE_KEYS"] = 203] = "ATTENTION_UPDATE_KEYS";
  PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_UPDATE_VALUES"] = 204] = "ATTENTION_UPDATE_VALUES";
  PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_TRANSPOSE_QUERY"] = 205] = "ATTENTION_TRANSPOSE_QUERY";
})(PvPicollmAttentionAction || (PvPicollmAttentionAction = {}));

var getPicollmAttentionWasmFunctions = function getPicollmAttentionWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmAttentionPrecomputeEncoding = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, encodingAddress, dimension, steps, theta, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            encodingAddress = unsignedAddress(encodingAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 7;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 7:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmAttentionAction.ATTENTION_PRECOMPUTE_ENCODING,
                encodingAddress: encodingAddress,
                dimension: dimension,
                steps: steps,
                theta: theta
              }));
            }
            _context.next = 11;
            return Promise.all(workerResults);
          case 11:
            setStatus(statusAddress, 0);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmAttentionPrecomputeEncoding(_x, _x2, _x3, _x4, _x5, _x6) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvPicollmAttentionEncode = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, xAddress, newEncodingAddress, n, numHeads, ropeInterleaved, headDimension, ropeDimension, position, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            newEncodingAddress = unsignedAddress(newEncodingAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context2.next = 8;
              break;
            }
            setStatus(statusAddress, -1);
            return _context2.abrupt("return");
          case 8:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmAttentionAction.ATTENTION_ENCODE,
                xAddress: xAddress,
                newEncodingAddress: newEncodingAddress,
                n: n,
                numHeads: numHeads,
                ropeInterleaved: ropeInterleaved,
                headDimension: headDimension,
                ropeDimension: ropeDimension,
                position: position
              }));
            }
            _context2.next = 12;
            return Promise.all(workerResults);
          case 12:
            setStatus(statusAddress, 0);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function pvPicollmAttentionEncode(_x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16) {
      return _ref2.apply(this, arguments);
    };
  }();
  var pvPicollmAttentionAttend = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, numHeads, numKvHeads, windowLength, headDimension, keysAddress, keyInterceptsAddress, keySlopesAddress, valuesAddress, valueInterceptsAddress, valueSlopesAddress, position, queryAddress, n, outputAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            keysAddress = unsignedAddress(keysAddress);
            keyInterceptsAddress = unsignedAddress(keyInterceptsAddress);
            keySlopesAddress = unsignedAddress(keySlopesAddress);
            valuesAddress = unsignedAddress(valuesAddress);
            valueInterceptsAddress = unsignedAddress(valueInterceptsAddress);
            valueSlopesAddress = unsignedAddress(valueSlopesAddress);
            queryAddress = unsignedAddress(queryAddress);
            outputAddress = unsignedAddress(outputAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context3.next = 14;
              break;
            }
            setStatus(statusAddress, -1);
            return _context3.abrupt("return");
          case 14:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmAttentionAction.ATTENTION_ATTEND,
                numHeads: numHeads,
                numKvHeads: numKvHeads,
                windowLength: windowLength,
                headDimension: headDimension,
                keysAddress: keysAddress,
                keyInterceptsAddress: keyInterceptsAddress,
                keySlopesAddress: keySlopesAddress,
                valuesAddress: valuesAddress,
                valueInterceptsAddress: valueInterceptsAddress,
                valueSlopesAddress: valueSlopesAddress,
                position: position,
                queryAddress: queryAddress,
                n: n,
                outputAddress: outputAddress
              }));
            }
            _context3.next = 18;
            return Promise.all(workerResults);
          case 18:
            setStatus(statusAddress, 0);
          case 19:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function pvPicollmAttentionAttend(_x17, _x18, _x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26, _x27, _x28, _x29, _x30, _x31, _x32) {
      return _ref3.apply(this, arguments);
    };
  }();
  var pvPicollmAttentionUpdateKeys = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(objAddress, numKvHeads, windowLength, headDimension, keysAddress, keyInterceptsAddress, keySlopesAddress, position, n, tfAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            keysAddress = unsignedAddress(keysAddress);
            keyInterceptsAddress = unsignedAddress(keyInterceptsAddress);
            keySlopesAddress = unsignedAddress(keySlopesAddress);
            tfAddress = unsignedAddress(tfAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context4.next = 10;
              break;
            }
            setStatus(statusAddress, -1);
            return _context4.abrupt("return");
          case 10:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmAttentionAction.ATTENTION_UPDATE_KEYS,
                numKvHeads: numKvHeads,
                windowLength: windowLength,
                headDimension: headDimension,
                keysAddress: keysAddress,
                keyInterceptsAddress: keyInterceptsAddress,
                keySlopesAddress: keySlopesAddress,
                position: position,
                n: n,
                tfAddress: tfAddress
              }));
            }
            _context4.next = 14;
            return Promise.all(workerResults);
          case 14:
            setStatus(statusAddress, 0);
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function pvPicollmAttentionUpdateKeys(_x33, _x34, _x35, _x36, _x37, _x38, _x39, _x40, _x41, _x42, _x43) {
      return _ref4.apply(this, arguments);
    };
  }();
  var pvPicollmAttentionUpdateValues = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(objAddress, numKvHeads, windowLength, headDimension, valuesAddress, valueInterceptsAddress, valueSlopesAddress, position, n, tfAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            valuesAddress = unsignedAddress(valuesAddress);
            valueInterceptsAddress = unsignedAddress(valueInterceptsAddress);
            valueSlopesAddress = unsignedAddress(valueSlopesAddress);
            tfAddress = unsignedAddress(tfAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context5.next = 10;
              break;
            }
            setStatus(statusAddress, -1);
            return _context5.abrupt("return");
          case 10:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmAttentionAction.ATTENTION_UPDATE_VALUES,
                numKvHeads: numKvHeads,
                windowLength: windowLength,
                headDimension: headDimension,
                valuesAddress: valuesAddress,
                valueInterceptsAddress: valueInterceptsAddress,
                valueSlopesAddress: valueSlopesAddress,
                position: position,
                n: n,
                tfAddress: tfAddress
              }));
            }
            _context5.next = 14;
            return Promise.all(workerResults);
          case 14:
            setStatus(statusAddress, 0);
          case 15:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function pvPicollmAttentionUpdateValues(_x44, _x45, _x46, _x47, _x48, _x49, _x50, _x51, _x52, _x53, _x54) {
      return _ref5.apply(this, arguments);
    };
  }();
  var pvPicollmAttentionTransposeQuery = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(objAddress, n, tfAddress, hfAddress, numHeads, headDimension, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            tfAddress = unsignedAddress(tfAddress);
            hfAddress = unsignedAddress(hfAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context6.next = 7;
              break;
            }
            return _context6.abrupt("return");
          case 7:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmAttentionAction.ATTENTION_TRANSPOSE_QUERY,
                n: n,
                tfAddress: tfAddress,
                hfAddress: hfAddress,
                numHeads: numHeads,
                headDimension: headDimension
              }));
            }
            _context6.next = 11;
            return Promise.all(workerResults);
          case 11:
            setStatus(statusAddress, 0);
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function pvPicollmAttentionTransposeQuery(_x55, _x56, _x57, _x58, _x59, _x60, _x61) {
      return _ref6.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_attention_precompute_encoding_web_worker_wasm: pvPicollmAttentionPrecomputeEncoding,
    pv_picollm_attention_encode_web_worker_wasm: pvPicollmAttentionEncode,
    pv_picollm_attention_attend_web_worker_wasm: pvPicollmAttentionAttend,
    pv_picollm_attention_update_keys_web_worker_wasm: pvPicollmAttentionUpdateKeys,
    pv_picollm_attention_update_values_web_worker_wasm: pvPicollmAttentionUpdateValues,
    pv_picollm_attention_transpose_query_web_worker_wasm: pvPicollmAttentionTransposeQuery
  };
};

var attentionPrecomputeEncoding = function attentionPrecomputeEncoding(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var encodingAddress = data.encodingAddress,
      dimension = data.dimension,
      steps = data.steps,
      theta = data.theta;
    var pv_picollm_attention_precompute_encoding = exports.pv_picollm_attention_precompute_encoding;
    var _memAlloc$get = memAlloc.get(encodingAddress),
      workerEncodingAddress = _memAlloc$get.workerMemAddress;
    pv_picollm_attention_precompute_encoding(workerEncodingAddress, dimension, steps, theta);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var attentionEncode = function attentionEncode(data) {
  try {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc;
    var xAddress = data.xAddress,
      newEncodingAddress = data.newEncodingAddress,
      n = data.n,
      numHeads = data.numHeads,
      ropeInterleaved = data.ropeInterleaved,
      headDimension = data.headDimension,
      ropeDimension = data.ropeDimension,
      position = data.position;
    var pv_picollm_attention_encode = exports.pv_picollm_attention_encode;
    var _memAlloc$get2 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get2.workerMemAddress;
    var _memAlloc$get3 = memAlloc.get(newEncodingAddress),
      workerNewEncodingAddress = _memAlloc$get3.workerMemAddress;
    pv_picollm_attention_encode(workerXAddress, workerNewEncodingAddress, n, numHeads, ropeInterleaved, headDimension, ropeDimension, position);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var attentionAttend = function attentionAttend(data) {
  try {
    var _data$globals3 = data.globals,
      exports = _data$globals3.exports,
      memAlloc = _data$globals3.memAlloc;
    var numHeads = data.numHeads,
      numKvHeads = data.numKvHeads,
      windowLength = data.windowLength,
      headDimension = data.headDimension,
      keysAddress = data.keysAddress,
      keyInterceptsAddress = data.keyInterceptsAddress,
      keySlopesAddress = data.keySlopesAddress,
      valuesAddress = data.valuesAddress,
      valueInterceptsAddress = data.valueInterceptsAddress,
      valueSlopesAddress = data.valueSlopesAddress,
      position = data.position,
      queryAddress = data.queryAddress,
      n = data.n,
      outputAddress = data.outputAddress;
    var pv_picollm_attention_attend = exports.pv_picollm_attention_attend;
    var _memAlloc$get4 = memAlloc.get(keysAddress),
      workerKeysAddress = _memAlloc$get4.workerMemAddress;
    var _memAlloc$get5 = memAlloc.get(keyInterceptsAddress),
      workerKeyInterceptsAddress = _memAlloc$get5.workerMemAddress;
    var _memAlloc$get6 = memAlloc.get(keySlopesAddress),
      workerKeySlopesAddress = _memAlloc$get6.workerMemAddress;
    var _memAlloc$get7 = memAlloc.get(valuesAddress),
      workerValuesAddress = _memAlloc$get7.workerMemAddress;
    var _memAlloc$get8 = memAlloc.get(valueInterceptsAddress),
      workerValueInterceptsAddress = _memAlloc$get8.workerMemAddress;
    var _memAlloc$get9 = memAlloc.get(valueSlopesAddress),
      workerValueSlopesAddress = _memAlloc$get9.workerMemAddress;
    var _memAlloc$get10 = memAlloc.get(queryAddress),
      workerQueryAddress = _memAlloc$get10.workerMemAddress;
    var _memAlloc$get11 = memAlloc.get(outputAddress),
      workerOutputAddress = _memAlloc$get11.workerMemAddress;
    pv_picollm_attention_attend(numHeads, numKvHeads, windowLength, headDimension, workerKeysAddress, workerKeyInterceptsAddress, workerKeySlopesAddress, workerValuesAddress, workerValueInterceptsAddress, workerValueSlopesAddress, position, workerQueryAddress, n, workerOutputAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var attentionUpdateKeys = function attentionUpdateKeys(data) {
  try {
    var _data$globals4 = data.globals,
      exports = _data$globals4.exports,
      memAlloc = _data$globals4.memAlloc;
    var numKvHeads = data.numKvHeads,
      windowLength = data.windowLength,
      headDimension = data.headDimension,
      keysAddress = data.keysAddress,
      keyInterceptsAddress = data.keyInterceptsAddress,
      keySlopesAddress = data.keySlopesAddress,
      position = data.position,
      n = data.n,
      tfAddress = data.tfAddress;
    var pv_picollm_attention_update_keys = exports.pv_picollm_attention_update_keys;
    var _memAlloc$get12 = memAlloc.get(keysAddress),
      workerKeysAddress = _memAlloc$get12.workerMemAddress;
    var _memAlloc$get13 = memAlloc.get(keyInterceptsAddress),
      workerKeyInterceptsAddress = _memAlloc$get13.workerMemAddress;
    var _memAlloc$get14 = memAlloc.get(keySlopesAddress),
      workerKeySlopesAddress = _memAlloc$get14.workerMemAddress;
    var _memAlloc$get15 = memAlloc.get(tfAddress),
      workerTfAddress = _memAlloc$get15.workerMemAddress;
    pv_picollm_attention_update_keys(numKvHeads, windowLength, headDimension, workerKeysAddress, workerKeyInterceptsAddress, workerKeySlopesAddress, position, n, workerTfAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var attentionUpdateValues = function attentionUpdateValues(data) {
  try {
    var _data$globals5 = data.globals,
      exports = _data$globals5.exports,
      memAlloc = _data$globals5.memAlloc;
    var numKvHeads = data.numKvHeads,
      windowLength = data.windowLength,
      headDimension = data.headDimension,
      valuesAddress = data.valuesAddress,
      valueInterceptsAddress = data.valueInterceptsAddress,
      valueSlopesAddress = data.valueSlopesAddress,
      position = data.position,
      n = data.n,
      tfAddress = data.tfAddress;
    var pv_picollm_attention_update_values = exports.pv_picollm_attention_update_values;
    var _memAlloc$get16 = memAlloc.get(valuesAddress),
      workerValuesAddress = _memAlloc$get16.workerMemAddress;
    var _memAlloc$get17 = memAlloc.get(valueInterceptsAddress),
      workerValueInterceptsAddress = _memAlloc$get17.workerMemAddress;
    var _memAlloc$get18 = memAlloc.get(valueSlopesAddress),
      workerValueSlopesAddress = _memAlloc$get18.workerMemAddress;
    var _memAlloc$get19 = memAlloc.get(tfAddress),
      workerTfAddress = _memAlloc$get19.workerMemAddress;
    pv_picollm_attention_update_values(numKvHeads, windowLength, headDimension, workerValuesAddress, workerValueInterceptsAddress, workerValueSlopesAddress, position, n, workerTfAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var attentionTransposeQuery = function attentionTransposeQuery(data) {
  try {
    var _data$globals6 = data.globals,
      exports = _data$globals6.exports,
      memAlloc = _data$globals6.memAlloc;
    var n = data.n,
      tfAddress = data.tfAddress,
      hfAddress = data.hfAddress,
      numHeads = data.numHeads,
      headDimension = data.headDimension;
    var pv_picollm_attention_transpose_query = exports.pv_picollm_attention_transpose_query;
    var _memAlloc$get20 = memAlloc.get(tfAddress),
      workerTfAddress = _memAlloc$get20.workerMemAddress;
    var _memAlloc$get21 = memAlloc.get(hfAddress),
      workerHfAddress = _memAlloc$get21.workerMemAddress;
    pv_picollm_attention_transpose_query(n, workerTfAddress, workerHfAddress, numHeads, headDimension);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PvPicollmAttentionAction.ATTENTION_PRECOMPUTE_ENCODING, attentionPrecomputeEncoding), PvPicollmAttentionAction.ATTENTION_ENCODE, attentionEncode), PvPicollmAttentionAction.ATTENTION_ATTEND, attentionAttend), PvPicollmAttentionAction.ATTENTION_UPDATE_KEYS, attentionUpdateKeys), PvPicollmAttentionAction.ATTENTION_UPDATE_VALUES, attentionUpdateValues), PvPicollmAttentionAction.ATTENTION_TRANSPOSE_QUERY, attentionTransposeQuery);

/* eslint camelcase: 0 */
var PvPicollmFeedForwardAction;
(function (PvPicollmFeedForwardAction) {
  PvPicollmFeedForwardAction[PvPicollmFeedForwardAction["FEED_FORWARD_SILU"] = 300] = "FEED_FORWARD_SILU";
  PvPicollmFeedForwardAction[PvPicollmFeedForwardAction["FEED_FORWARD_GELU"] = 301] = "FEED_FORWARD_GELU";
  PvPicollmFeedForwardAction[PvPicollmFeedForwardAction["FEED_FORWARD_ALMOST_GELU"] = 302] = "FEED_FORWARD_ALMOST_GELU";
  PvPicollmFeedForwardAction[PvPicollmFeedForwardAction["FEED_FORWARD_MULTIPLY_BUFFERS"] = 303] = "FEED_FORWARD_MULTIPLY_BUFFERS";
})(PvPicollmFeedForwardAction || (PvPicollmFeedForwardAction = {}));

var getPicollmFeedForwardWasmFunctions = function getPicollmFeedForwardWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmFeedForwardSilu = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, xAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 7;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 7:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmFeedForwardAction.FEED_FORWARD_SILU,
                n: n,
                xAddress: xAddress
              }));
            }
            _context.next = 11;
            return Promise.all(workerResults);
          case 11:
            setStatus(statusAddress, 0);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmFeedForwardSilu(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvPicollmFeedForwardGelu = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, n, xAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context2.next = 7;
              break;
            }
            setStatus(statusAddress, -1);
            return _context2.abrupt("return");
          case 7:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmFeedForwardAction.FEED_FORWARD_GELU,
                n: n,
                xAddress: xAddress
              }));
            }
            _context2.next = 11;
            return Promise.all(workerResults);
          case 11:
            setStatus(statusAddress, 0);
          case 12:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function pvPicollmFeedForwardGelu(_x5, _x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    };
  }();
  var pvPicollmFeedForwardAlmostGelu = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, n, xAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context3.next = 6;
              break;
            }
            return _context3.abrupt("return");
          case 6:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmFeedForwardAction.FEED_FORWARD_ALMOST_GELU,
                n: n,
                xAddress: xAddress
              }));
            }
            _context3.next = 10;
            return Promise.all(workerResults);
          case 10:
            setStatus(statusAddress, 0);
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function pvPicollmFeedForwardAlmostGelu(_x9, _x10, _x11, _x12) {
      return _ref3.apply(this, arguments);
    };
  }();
  var pvPicollmFeedForwardMultiplyBuffers = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(objAddress, n, xAddress, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context4.next = 8;
              break;
            }
            setStatus(statusAddress, -1);
            return _context4.abrupt("return");
          case 8:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmFeedForwardAction.FEED_FORWARD_MULTIPLY_BUFFERS,
                n: n,
                xAddress: xAddress,
                yAddress: yAddress
              }));
            }
            _context4.next = 12;
            return Promise.all(workerResults);
          case 12:
            setStatus(statusAddress, 0);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function pvPicollmFeedForwardMultiplyBuffers(_x13, _x14, _x15, _x16, _x17) {
      return _ref4.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_feed_forward_silu_web_worker_wasm: pvPicollmFeedForwardSilu,
    pv_picollm_feed_forward_gelu_web_worker_wasm: pvPicollmFeedForwardGelu,
    pv_picollm_feed_forward_almost_gelu_web_worker_wasm: pvPicollmFeedForwardAlmostGelu,
    pv_picollm_feed_forward_multiply_buffers_web_worker_wasm: pvPicollmFeedForwardMultiplyBuffers
  };
};

var feedForwardSilu = function feedForwardSilu(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var n = data.n,
      xAddress = data.xAddress;
    var pv_picollm_feed_forward_silu = exports.pv_picollm_feed_forward_silu;
    var _memAlloc$get = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get.workerMemAddress;
    pv_picollm_feed_forward_silu(n, workerXAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var feedForwardGelu = function feedForwardGelu(data) {
  try {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc;
    var n = data.n,
      xAddress = data.xAddress;
    var pv_picollm_feed_forward_gelu = exports.pv_picollm_feed_forward_gelu;
    var _memAlloc$get2 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get2.workerMemAddress;
    pv_picollm_feed_forward_gelu(n, workerXAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var feedForwardAlmostGelu = function feedForwardAlmostGelu(data) {
  try {
    var _data$globals3 = data.globals,
      exports = _data$globals3.exports,
      memAlloc = _data$globals3.memAlloc;
    var n = data.n,
      xAddress = data.xAddress;
    var pv_picollm_feed_forward_almost_gelu = exports.pv_picollm_feed_forward_almost_gelu;
    var _memAlloc$get3 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get3.workerMemAddress;
    pv_picollm_feed_forward_almost_gelu(n, workerXAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var feedForwardMultiplyBuffers = function feedForwardMultiplyBuffers(data) {
  try {
    var _data$globals4 = data.globals,
      exports = _data$globals4.exports,
      memAlloc = _data$globals4.memAlloc;
    var n = data.n,
      xAddress = data.xAddress,
      yAddress = data.yAddress;
    var pv_picollm_feed_forward_multiply_buffers = exports.pv_picollm_feed_forward_multiply_buffers;
    var _memAlloc$get4 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get4.workerMemAddress;
    var _memAlloc$get5 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get5.workerMemAddress;
    pv_picollm_feed_forward_multiply_buffers(n, workerXAddress, workerYAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PvPicollmFeedForwardAction.FEED_FORWARD_SILU, feedForwardSilu), PvPicollmFeedForwardAction.FEED_FORWARD_GELU, feedForwardGelu), PvPicollmFeedForwardAction.FEED_FORWARD_ALMOST_GELU, feedForwardAlmostGelu), PvPicollmFeedForwardAction.FEED_FORWARD_MULTIPLY_BUFFERS, feedForwardMultiplyBuffers);

/* eslint camelcase: 0 */
var PvPicollmGateAction;
(function (PvPicollmGateAction) {
  PvPicollmGateAction[PvPicollmGateAction["GATE_FORWARD"] = 400] = "GATE_FORWARD";
})(PvPicollmGateAction || (PvPicollmGateAction = {}));

var getPicollmGateWasmFunctions = function getPicollmGateWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmGateForward = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, k, numExperts, indicesAddress, weightsAddress, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            indicesAddress = unsignedAddress(indicesAddress);
            weightsAddress = unsignedAddress(weightsAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 9;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 9:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmGateAction.GATE_FORWARD,
                n: n,
                k: k,
                numExperts: numExperts,
                indicesAddress: indicesAddress,
                weightsAddress: weightsAddress,
                yAddress: yAddress
              }));
            }
            _context.next = 13;
            return Promise.all(workerResults);
          case 13:
            setStatus(statusAddress, 0);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmGateForward(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_gate_forward_web_worker_wasm: pvPicollmGateForward
  };
};

var gateForward = function gateForward(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var n = data.n,
      k = data.k,
      numExperts = data.numExperts,
      indicesAddress = data.indicesAddress,
      weightsAddress = data.weightsAddress,
      yAddress = data.yAddress;
    var pv_picollm_gate_forward = exports.pv_picollm_gate_forward;
    var _memAlloc$get = memAlloc.get(indicesAddress),
      workerIndicesAddress = _memAlloc$get.workerMemAddress;
    var _memAlloc$get2 = memAlloc.get(weightsAddress),
      workerWeightsAddress = _memAlloc$get2.workerMemAddress;
    var _memAlloc$get3 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get3.workerMemAddress;
    pv_picollm_gate_forward(n, k, numExperts, workerIndicesAddress, workerWeightsAddress, workerYAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty({}, PvPicollmGateAction.GATE_FORWARD, gateForward);

/* eslint camelcase: 0 */
var PvPicollmMoeTransformerAction;
(function (PvPicollmMoeTransformerAction) {
  PvPicollmMoeTransformerAction[PvPicollmMoeTransformerAction["ADD_TO_BUFFER"] = 500] = "ADD_TO_BUFFER";
  PvPicollmMoeTransformerAction[PvPicollmMoeTransformerAction["MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER"] = 501] = "MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER";
  PvPicollmMoeTransformerAction[PvPicollmMoeTransformerAction["ADD_BUFFERS"] = 502] = "ADD_BUFFERS";
})(PvPicollmMoeTransformerAction || (PvPicollmMoeTransformerAction = {}));

var getPicollmMoeTransformerWasmFunctions = function getPicollmMoeTransformerWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmMoeTransformerAddToBuffer = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, xAddress, bufferAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            bufferAddress = unsignedAddress(bufferAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 8;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 8:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmMoeTransformerAction.ADD_TO_BUFFER,
                n: n,
                xAddress: xAddress,
                bufferAddress: bufferAddress
              }));
            }
            _context.next = 12;
            return Promise.all(workerResults);
          case 12:
            setStatus(statusAddress, 0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmMoeTransformerAddToBuffer(_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvPicollmMoeTransformerMultipleWeightAndAddToBuffer = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, n, weightsIndex, yIndex, weightsAddress, xAddress, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            weightsAddress = unsignedAddress(weightsAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context2.next = 9;
              break;
            }
            setStatus(statusAddress, -1);
            return _context2.abrupt("return");
          case 9:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmMoeTransformerAction.MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER,
                n: n,
                weightsIndex: weightsIndex,
                yIndex: yIndex,
                weightsAddress: weightsAddress,
                xAddress: xAddress,
                yAddress: yAddress
              }));
            }
            _context2.next = 13;
            return Promise.all(workerResults);
          case 13:
            setStatus(statusAddress, 0);
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function pvPicollmMoeTransformerMultipleWeightAndAddToBuffer(_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13) {
      return _ref2.apply(this, arguments);
    };
  }();
  var pvPicollmMoeTransformerAddBuffers = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, n, buffer1Address, buffer2Address, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            buffer1Address = unsignedAddress(buffer1Address);
            buffer2Address = unsignedAddress(buffer2Address);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context3.next = 9;
              break;
            }
            setStatus(statusAddress, -1);
            return _context3.abrupt("return");
          case 9:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmMoeTransformerAction.ADD_BUFFERS,
                n: n,
                buffer1Address: buffer1Address,
                buffer2Address: buffer2Address,
                yAddress: yAddress
              }));
            }
            _context3.next = 13;
            return Promise.all(workerResults);
          case 13:
            setStatus(statusAddress, 0);
          case 14:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function pvPicollmMoeTransformerAddBuffers(_x14, _x15, _x16, _x17, _x18, _x19) {
      return _ref3.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_moe_transformer_add_to_buffer_web_worker_wasm: pvPicollmMoeTransformerAddToBuffer,
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_web_worker_wasm: pvPicollmMoeTransformerMultipleWeightAndAddToBuffer,
    pv_picollm_moe_transformer_add_buffers_web_worker_wasm: pvPicollmMoeTransformerAddBuffers
  };
};

var moeTransformerAddToBuffer = function moeTransformerAddToBuffer(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var n = data.n,
      xAddress = data.xAddress,
      bufferAddress = data.bufferAddress;
    var pv_picollm_moe_transformer_add_to_buffer = exports.pv_picollm_moe_transformer_add_to_buffer;
    var _memAlloc$get = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get.workerMemAddress;
    var _memAlloc$get2 = memAlloc.get(bufferAddress),
      workerBufferAddress = _memAlloc$get2.workerMemAddress;
    pv_picollm_moe_transformer_add_to_buffer(n, workerXAddress, workerBufferAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var moeTransformerMultiplyWeightAndAddToBuffer = function moeTransformerMultiplyWeightAndAddToBuffer(data) {
  try {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc;
    var n = data.n,
      weightsIndex = data.weightsIndex,
      yIndex = data.yIndex,
      weightsAddress = data.weightsAddress,
      xAddress = data.xAddress,
      yAddress = data.yAddress;
    var pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer = exports.pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer;
    var _memAlloc$get3 = memAlloc.get(weightsAddress),
      workerWeightsAddress = _memAlloc$get3.workerMemAddress;
    var _memAlloc$get4 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get4.workerMemAddress;
    var _memAlloc$get5 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get5.workerMemAddress;
    pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer(n, weightsIndex, yIndex, workerWeightsAddress, workerXAddress, workerYAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var moeTransformerAddBuffers = function moeTransformerAddBuffers(data) {
  try {
    var _data$globals3 = data.globals,
      exports = _data$globals3.exports,
      memAlloc = _data$globals3.memAlloc;
    var n = data.n,
      buffer1Address = data.buffer1Address,
      buffer2Address = data.buffer2Address,
      yAddress = data.yAddress;
    var pv_picollm_moe_transformer_add_buffers = exports.pv_picollm_moe_transformer_add_buffers;
    var _memAlloc$get6 = memAlloc.get(buffer1Address),
      workerBuffer1Address = _memAlloc$get6.workerMemAddress;
    var _memAlloc$get7 = memAlloc.get(buffer2Address),
      workerBuffer2Address = _memAlloc$get7.workerMemAddress;
    var _memAlloc$get8 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get8.workerMemAddress;
    pv_picollm_moe_transformer_add_buffers(n, workerBuffer1Address, workerBuffer2Address, workerYAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty(_defineProperty(_defineProperty({}, PvPicollmMoeTransformerAction.ADD_TO_BUFFER, moeTransformerAddToBuffer), PvPicollmMoeTransformerAction.MULTIPLY_WEIGHT_AND_ADD_TO_BUFFER, moeTransformerMultiplyWeightAndAddToBuffer), PvPicollmMoeTransformerAction.ADD_BUFFERS, moeTransformerAddBuffers);

/* eslint camelcase: 0 */
var PvPicollmNormAction;
(function (PvPicollmNormAction) {
  PvPicollmNormAction[PvPicollmNormAction["NORM_FORWARD"] = 600] = "NORM_FORWARD";
})(PvPicollmNormAction || (PvPicollmNormAction = {}));

var getPicollmNormWasmFunctions = function getPicollmNormWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmNormForward = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, dimension, eps, weightAddress, n, xOffset, xAddress, yOffset, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            weightAddress = unsignedAddress(weightAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 9;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 9:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmNormAction.NORM_FORWARD,
                dimension: dimension,
                eps: eps,
                weightAddress: weightAddress,
                n: n,
                xOffset: xOffset,
                xAddress: xAddress,
                yOffset: yOffset,
                yAddress: yAddress
              }));
            }
            _context.next = 13;
            return Promise.all(workerResults);
          case 13:
            setStatus(statusAddress, 0);
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmNormForward(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_norm_forward_web_worker_wasm: pvPicollmNormForward
  };
};

var normForward = function normForward(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var dimension = data.dimension,
      eps = data.eps,
      weightAddress = data.weightAddress,
      n = data.n,
      xOffset = data.xOffset,
      xAddress = data.xAddress,
      yOffset = data.yOffset,
      yAddress = data.yAddress;
    var pv_picollm_norm_forward = exports.pv_picollm_norm_forward;
    var _memAlloc$get = memAlloc.get(weightAddress),
      workerWeightAddress = _memAlloc$get.workerMemAddress;
    var _memAlloc$get2 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get2.workerMemAddress;
    var _memAlloc$get3 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get3.workerMemAddress;
    pv_picollm_norm_forward(dimension, eps, workerWeightAddress, n, workerXAddress + xOffset, workerYAddress + yOffset);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty({}, PvPicollmNormAction.NORM_FORWARD, normForward);

/* eslint camelcase: 0 */
var PvPicollmNormLayerAction;
(function (PvPicollmNormLayerAction) {
  PvPicollmNormLayerAction[PvPicollmNormLayerAction["NORM_LAYER_FORWARD"] = 800] = "NORM_LAYER_FORWARD";
})(PvPicollmNormLayerAction || (PvPicollmNormLayerAction = {}));

var getPicollmNormLayerWasmFunctions = function getPicollmNormLayerWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmNormLayerForward = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, dimension, eps, weightAddress, biasAddress, n, xOffset, xAddress, yOffset, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            weightAddress = unsignedAddress(weightAddress);
            biasAddress = unsignedAddress(biasAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 10;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 10:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmNormLayerAction.NORM_LAYER_FORWARD,
                dimension: dimension,
                eps: eps,
                weightAddress: weightAddress,
                biasAddress: biasAddress,
                n: n,
                xOffset: xOffset,
                xAddress: xAddress,
                yOffset: yOffset,
                yAddress: yAddress
              }));
            }
            _context.next = 14;
            return Promise.all(workerResults);
          case 14:
            setStatus(statusAddress, 0);
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmNormLayerForward(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_norm_layer_forward_web_worker_wasm: pvPicollmNormLayerForward
  };
};

var normLayerForward = function normLayerForward(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var dimension = data.dimension,
      eps = data.eps,
      weightAddress = data.weightAddress,
      biasAddress = data.biasAddress,
      n = data.n,
      xOffset = data.xOffset,
      xAddress = data.xAddress,
      yOffset = data.yOffset,
      yAddress = data.yAddress;
    var pv_picollm_norm_layer_forward = exports.pv_picollm_norm_layer_forward;
    var _memAlloc$get = memAlloc.get(weightAddress),
      workerWeightAddress = _memAlloc$get.workerMemAddress;
    var _memAlloc$get2 = memAlloc.get(biasAddress),
      workerBiasAddress = _memAlloc$get2.workerMemAddress;
    var _memAlloc$get3 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get3.workerMemAddress;
    var _memAlloc$get4 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get4.workerMemAddress;
    pv_picollm_norm_layer_forward(dimension, eps, workerWeightAddress, workerBiasAddress, n, workerXAddress + xOffset, workerYAddress + yOffset);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty({}, PvPicollmNormLayerAction.NORM_LAYER_FORWARD, normLayerForward);

/* eslint camelcase: 0 */
var PvPicollmTransformerAction;
(function (PvPicollmTransformerAction) {
  PvPicollmTransformerAction[PvPicollmTransformerAction["ADD_TO_BUFFER"] = 700] = "ADD_TO_BUFFER";
  PvPicollmTransformerAction[PvPicollmTransformerAction["ADD_BUFFERS"] = 701] = "ADD_BUFFERS";
})(PvPicollmTransformerAction || (PvPicollmTransformerAction = {}));

var getPicollmTransformerWasmFunctions = function getPicollmTransformerWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmTransformerAddToBuffer = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, xAddress, bufferAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            xAddress = unsignedAddress(xAddress);
            bufferAddress = unsignedAddress(bufferAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 8;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 8:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmTransformerAction.ADD_TO_BUFFER,
                n: n,
                xAddress: xAddress,
                bufferAddress: bufferAddress
              }));
            }
            _context.next = 12;
            return Promise.all(workerResults);
          case 12:
            setStatus(statusAddress, 0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmTransformerAddToBuffer(_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvPicollmTransformerAddBuffers = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, n, buffer1Address, buffer2Address, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            buffer1Address = unsignedAddress(buffer1Address);
            buffer2Address = unsignedAddress(buffer2Address);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context2.next = 9;
              break;
            }
            setStatus(statusAddress, -1);
            return _context2.abrupt("return");
          case 9:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmTransformerAction.ADD_BUFFERS,
                n: n,
                buffer1Address: buffer1Address,
                buffer2Address: buffer2Address,
                yAddress: yAddress
              }));
            }
            _context2.next = 13;
            return Promise.all(workerResults);
          case 13:
            setStatus(statusAddress, 0);
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function pvPicollmTransformerAddBuffers(_x6, _x7, _x8, _x9, _x10, _x11) {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_transformer_add_to_buffer_web_worker_wasm: pvPicollmTransformerAddToBuffer,
    pv_picollm_transformer_add_buffers_web_worker_wasm: pvPicollmTransformerAddBuffers
  };
};

var transformerAddToBuffer = function transformerAddToBuffer(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var n = data.n,
      xAddress = data.xAddress,
      bufferAddress = data.bufferAddress;
    var pv_picollm_transformer_add_to_buffer = exports.pv_picollm_transformer_add_to_buffer;
    var _memAlloc$get = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get.workerMemAddress;
    var _memAlloc$get2 = memAlloc.get(bufferAddress),
      workerBufferAddress = _memAlloc$get2.workerMemAddress;
    pv_picollm_transformer_add_to_buffer(n, workerXAddress, workerBufferAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var transformerAddBuffers = function transformerAddBuffers(data) {
  try {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc;
    var n = data.n,
      buffer1Address = data.buffer1Address,
      buffer2Address = data.buffer2Address,
      yAddress = data.yAddress;
    var pv_picollm_transformer_add_buffers = exports.pv_picollm_transformer_add_buffers;
    var _memAlloc$get3 = memAlloc.get(buffer1Address),
      workerBuffer1Address = _memAlloc$get3.workerMemAddress;
    var _memAlloc$get4 = memAlloc.get(buffer2Address),
      workerBuffer2Address = _memAlloc$get4.workerMemAddress;
    var _memAlloc$get5 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get5.workerMemAddress;
    pv_picollm_transformer_add_buffers(n, workerBuffer1Address, workerBuffer2Address, workerYAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty(_defineProperty({}, PvPicollmTransformerAction.ADD_TO_BUFFER, transformerAddToBuffer), PvPicollmTransformerAction.ADD_BUFFERS, transformerAddBuffers);

/* eslint camelcase: 0 */
var PvPicollmWeightAction;
(function (PvPicollmWeightAction) {
  PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS"] = 100] = "WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS";
  PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE"] = 101] = "WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE";
  PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE"] = 102] = "WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE";
  PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_ADD_BIAS"] = 103] = "WEIGHT_BLOCK_MIXED_16X8_ADD_BIAS";
  PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_FLOAT_FORWARD"] = 104] = "WEIGHT_FLOAT_FORWARD";
})(PvPicollmWeightAction || (PvPicollmWeightAction = {}));

var getPicollmWeightWasmFunctions = function getPicollmWeightWasmFunctions(memory) {
  var setStatus = function setStatus(statusAddress, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvPicollmWeightBlockMixed16x8PreprocessBlocks = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, shapeAddress, numBitDepths, bitDepthsAddress, bitDepthsStartAddress, numBlockBytes, blocksAddress, statusAddress) {
      var obj, memoryBufferInt32, shape, bitDepths, bitDepthStarts, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            shapeAddress = unsignedAddress(shapeAddress);
            bitDepthsAddress = unsignedAddress(bitDepthsAddress);
            bitDepthsStartAddress = unsignedAddress(bitDepthsStartAddress);
            blocksAddress = unsignedAddress(blocksAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context.next = 10;
              break;
            }
            setStatus(statusAddress, -1);
            return _context.abrupt("return");
          case 10:
            memoryBufferInt32 = new Int32Array(memory.buffer);
            shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
            bitDepths = memoryBufferInt32.slice(bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
            bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS,
                shape: shape,
                bitDepths: bitDepths,
                bitDepthStarts: bitDepthStarts,
                numBlockBytes: numBlockBytes,
                blocksAddress: blocksAddress
              }));
            }
            _context.next = 18;
            return Promise.all(workerResults);
          case 18:
            setStatus(statusAddress, 0);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvPicollmWeightBlockMixed16x8PreprocessBlocks(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvPicollmWeightBlockMixed16x8ForwardSingle = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, shapeAddress, indicesAddress, numBitDepths, bitDepthsStartAddress, bitDepthsAddress, numMetas, metasAddress, numBlockBytes, blocksAddress, xOffset, xAddress, yAddress, statusAddress) {
      var obj, memoryBufferInt32, shape, bitDepthStarts, bitDepths, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            shapeAddress = unsignedAddress(shapeAddress);
            indicesAddress = unsignedAddress(indicesAddress);
            bitDepthsStartAddress = unsignedAddress(bitDepthsStartAddress);
            bitDepthsAddress = unsignedAddress(bitDepthsAddress);
            metasAddress = unsignedAddress(metasAddress);
            blocksAddress = unsignedAddress(blocksAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context2.next = 14;
              break;
            }
            setStatus(statusAddress, -1);
            return _context2.abrupt("return");
          case 14:
            memoryBufferInt32 = new Int32Array(memory.buffer);
            shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
            bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
            bitDepths = memoryBufferInt32.slice(bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE,
                shape: shape,
                indicesAddress: indicesAddress,
                bitDepthStarts: bitDepthStarts,
                bitDepths: bitDepths,
                numMetas: numMetas,
                metasAddress: metasAddress,
                numBlockBytes: numBlockBytes,
                blocksAddress: blocksAddress,
                xOffset: xOffset,
                xAddress: xAddress,
                yAddress: yAddress
              }));
            }
            _context2.next = 22;
            return Promise.all(workerResults);
          case 22:
            setStatus(statusAddress, 0);
          case 23:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function pvPicollmWeightBlockMixed16x8ForwardSingle(_x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22) {
      return _ref2.apply(this, arguments);
    };
  }();
  var pvPicollmWeightBlockMixed16x8ForwardMultiple = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, shapeAddress, indicesAddress, numBitDepths, bitDepthsStartAddress, bitDepthsAddress, numMetas, metasAddress, numBlockBytes, blocksAddress, n, xOffset, xAddress, yAddress, statusAddress) {
      var obj, memoryBufferInt32, shape, bitDepthStarts, bitDepths, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            shapeAddress = unsignedAddress(shapeAddress);
            indicesAddress = unsignedAddress(indicesAddress);
            bitDepthsStartAddress = unsignedAddress(bitDepthsStartAddress);
            bitDepthsAddress = unsignedAddress(bitDepthsAddress);
            metasAddress = unsignedAddress(metasAddress);
            blocksAddress = unsignedAddress(blocksAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context3.next = 14;
              break;
            }
            setStatus(statusAddress, -1);
            return _context3.abrupt("return");
          case 14:
            memoryBufferInt32 = new Int32Array(memory.buffer);
            shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
            bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
            bitDepths = memoryBufferInt32.slice(bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE,
                shape: shape,
                indicesAddress: indicesAddress,
                bitDepthStarts: bitDepthStarts,
                bitDepths: bitDepths,
                numMetas: numMetas,
                metasAddress: metasAddress,
                numBlockBytes: numBlockBytes,
                blocksAddress: blocksAddress,
                n: n,
                xOffset: xOffset,
                xAddress: xAddress,
                yAddress: yAddress
              }));
            }
            _context3.next = 22;
            return Promise.all(workerResults);
          case 22:
            setStatus(statusAddress, 0);
          case 23:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function pvPicollmWeightBlockMixed16x8ForwardMultiple(_x23, _x24, _x25, _x26, _x27, _x28, _x29, _x30, _x31, _x32, _x33, _x34, _x35, _x36, _x37) {
      return _ref3.apply(this, arguments);
    };
  }();
  var pvPicollmWeightBlockMixed16x8AddBias = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(objAddress, n, dimension, yAddress, biasAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            yAddress = unsignedAddress(yAddress);
            biasAddress = unsignedAddress(biasAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context4.next = 8;
              break;
            }
            setStatus(statusAddress, -1);
            return _context4.abrupt("return");
          case 8:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_ADD_BIAS,
                n: n,
                dimension: dimension,
                yAddress: yAddress,
                biasAddress: biasAddress
              }));
            }
            _context4.next = 12;
            return Promise.all(workerResults);
          case 12:
            setStatus(statusAddress, 0);
          case 13:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function pvPicollmWeightBlockMixed16x8AddBias(_x38, _x39, _x40, _x41, _x42, _x43) {
      return _ref4.apply(this, arguments);
    };
  }();
  var pvPicollmWeightFloatForward = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(objAddress, n, nc, nr, wAddress, xOffset, xAddress, yAddress, statusAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            wAddress = unsignedAddress(wAddress);
            xAddress = unsignedAddress(xAddress);
            yAddress = unsignedAddress(yAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context5.next = 9;
              break;
            }
            setStatus(statusAddress, -1);
            return _context5.abrupt("return");
          case 9:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvPicollmWeightAction.WEIGHT_FLOAT_FORWARD,
                n: n,
                nc: nc,
                nr: nr,
                wAddress: wAddress,
                xOffset: xOffset,
                xAddress: xAddress,
                yAddress: yAddress
              }));
            }
            _context5.next = 13;
            return Promise.all(workerResults);
          case 13:
            setStatus(statusAddress, 0);
          case 14:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function pvPicollmWeightFloatForward(_x44, _x45, _x46, _x47, _x48, _x49, _x50, _x51, _x52) {
      return _ref5.apply(this, arguments);
    };
  }();
  return {
    pv_picollm_weight_block_mixed_16x8_preprocess_blocks_web_worker_wasm: pvPicollmWeightBlockMixed16x8PreprocessBlocks,
    pv_picollm_weight_block_mixed_16x8_forward_single_web_worker_wasm: pvPicollmWeightBlockMixed16x8ForwardSingle,
    pv_picollm_weight_block_mixed_16x8_forward_multiple_web_worker_wasm: pvPicollmWeightBlockMixed16x8ForwardMultiple,
    pv_picollm_weight_block_mixed_16x8_add_bias_web_worker_wasm: pvPicollmWeightBlockMixed16x8AddBias,
    pv_picollm_weight_float_forward_web_worker_wasm: pvPicollmWeightFloatForward
  };
};

var weightBlockMixed16x8PreprocessBlocks = function weightBlockMixed16x8PreprocessBlocks(data) {
  try {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc,
      memory = _data$globals.memory;
    var shape = data.shape,
      bitDepths = data.bitDepths,
      bitDepthStarts = data.bitDepthStarts,
      blocksAddress = data.blocksAddress;
    var aligned_alloc = exports.aligned_alloc,
      free = exports.free,
      pv_picollm_weight_block_mixed_16x8_preprocess_blocks = exports.pv_picollm_weight_block_mixed_16x8_preprocess_blocks;
    if (!memAlloc.has(blocksAddress)) {
      self.postMessage({
        command: 'ok'
      });
      return;
    }
    var _memAlloc$get = memAlloc.get(blocksAddress),
      workerBlocksAddress = _memAlloc$get.workerMemAddress;
    var shapeAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * shape.length);
    var bitDepthsAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepths.length);
    var bitDepthsStartAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepthStarts.length);
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32.set(shape, shapeAddress / Int32Array.BYTES_PER_ELEMENT);
    memoryBufferInt32.set(bitDepths, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT);
    memoryBufferInt32.set(bitDepthStarts, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT);
    pv_picollm_weight_block_mixed_16x8_preprocess_blocks(shapeAddress, bitDepths.length, bitDepthsAddress, bitDepthsStartAddress, workerBlocksAddress);
    free(shapeAddress);
    free(bitDepthsAddress);
    free(bitDepthsStartAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var weightBlockMixed16x8ForwardSingle = function weightBlockMixed16x8ForwardSingle(data) {
  try {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc,
      memory = _data$globals2.memory;
    var shape = data.shape,
      indicesAddress = data.indicesAddress,
      bitDepthStarts = data.bitDepthStarts,
      bitDepths = data.bitDepths,
      metasAddress = data.metasAddress,
      blocksAddress = data.blocksAddress,
      xOffset = data.xOffset,
      xAddress = data.xAddress,
      yAddress = data.yAddress;
    var aligned_alloc = exports.aligned_alloc,
      free = exports.free,
      pv_picollm_weight_block_mixed_16x8_forward_single = exports.pv_picollm_weight_block_mixed_16x8_forward_single;
    if (!memAlloc.has(metasAddress) || !memAlloc.has(blocksAddress) || !memAlloc.has(xAddress) || !memAlloc.has(yAddress) || !memAlloc.has(indicesAddress)) {
      self.postMessage({
        command: 'ok'
      });
      return;
    }
    var _memAlloc$get2 = memAlloc.get(indicesAddress),
      workerIndicesAddress = _memAlloc$get2.workerMemAddress;
    var _memAlloc$get3 = memAlloc.get(metasAddress),
      workerMetasAddress = _memAlloc$get3.workerMemAddress;
    var _memAlloc$get4 = memAlloc.get(blocksAddress),
      workerBlocksAddress = _memAlloc$get4.workerMemAddress;
    var _memAlloc$get5 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get5.workerMemAddress;
    var _memAlloc$get6 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get6.workerMemAddress;
    var shapeAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * shape.length);
    var bitDepthsStartAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepthStarts.length);
    var bitDepthsAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepths.length);
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32.set(shape, shapeAddress / Int32Array.BYTES_PER_ELEMENT);
    memoryBufferInt32.set(bitDepthStarts, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT);
    memoryBufferInt32.set(bitDepths, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT);
    pv_picollm_weight_block_mixed_16x8_forward_single(shapeAddress, workerIndicesAddress, bitDepths.length, bitDepthsStartAddress, bitDepthsAddress, workerMetasAddress, workerBlocksAddress, workerXAddress + xOffset, workerYAddress);
    free(shapeAddress);
    free(bitDepthsStartAddress);
    free(bitDepthsAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var weightBlockMixed16x8ForwardMultiple = function weightBlockMixed16x8ForwardMultiple(data) {
  try {
    var _data$globals3 = data.globals,
      exports = _data$globals3.exports,
      memAlloc = _data$globals3.memAlloc,
      memory = _data$globals3.memory;
    var shape = data.shape,
      indicesAddress = data.indicesAddress,
      bitDepthStarts = data.bitDepthStarts,
      bitDepths = data.bitDepths,
      metasAddress = data.metasAddress,
      blocksAddress = data.blocksAddress,
      n = data.n,
      xOffset = data.xOffset,
      xAddress = data.xAddress,
      yAddress = data.yAddress;
    var aligned_alloc = exports.aligned_alloc,
      free = exports.free,
      pv_picollm_weight_block_mixed_16x8_forward_multiple = exports.pv_picollm_weight_block_mixed_16x8_forward_multiple;
    if (!memAlloc.has(metasAddress) || !memAlloc.has(blocksAddress) || !memAlloc.has(xAddress) || !memAlloc.has(yAddress) || !memAlloc.has(indicesAddress)) {
      self.postMessage({
        command: 'ok'
      });
      return;
    }
    var _memAlloc$get7 = memAlloc.get(indicesAddress),
      workerIndicesAddress = _memAlloc$get7.workerMemAddress;
    var _memAlloc$get8 = memAlloc.get(metasAddress),
      workerMetasAddress = _memAlloc$get8.workerMemAddress;
    var _memAlloc$get9 = memAlloc.get(blocksAddress),
      workerBlocksAddress = _memAlloc$get9.workerMemAddress;
    var _memAlloc$get10 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get10.workerMemAddress;
    var _memAlloc$get11 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get11.workerMemAddress;
    var shapeAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * shape.length);
    var bitDepthsStartAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepthStarts.length);
    var bitDepthsAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepths.length);
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32.set(shape, shapeAddress / Int32Array.BYTES_PER_ELEMENT);
    memoryBufferInt32.set(bitDepthStarts, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT);
    memoryBufferInt32.set(bitDepths, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT);
    pv_picollm_weight_block_mixed_16x8_forward_multiple(shapeAddress, workerIndicesAddress, bitDepths.length, bitDepthsStartAddress, bitDepthsAddress, workerMetasAddress, workerBlocksAddress, n, workerXAddress + xOffset, workerYAddress);
    free(shapeAddress);
    free(bitDepthsStartAddress);
    free(bitDepthsAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var weightBlockMixed16x8AddBias = function weightBlockMixed16x8AddBias(data) {
  try {
    var _data$globals4 = data.globals,
      exports = _data$globals4.exports,
      memAlloc = _data$globals4.memAlloc;
    var n = data.n,
      dimension = data.dimension,
      yAddress = data.yAddress,
      biasAddress = data.biasAddress;
    var free = exports.free,
      pv_picollm_weight_block_mixed_16x8_add_bias = exports.pv_picollm_weight_block_mixed_16x8_add_bias;
    if (!memAlloc.has(yAddress) || !memAlloc.has(biasAddress)) {
      self.postMessage({
        command: 'ok'
      });
      return;
    }
    var _memAlloc$get12 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get12.workerMemAddress;
    var _memAlloc$get13 = memAlloc.get(biasAddress),
      workerBiasAddress = _memAlloc$get13.workerMemAddress;
    pv_picollm_weight_block_mixed_16x8_add_bias(n, dimension, workerYAddress, workerBiasAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
var weightFloatForward = function weightFloatForward(data) {
  try {
    var _data$globals5 = data.globals,
      exports = _data$globals5.exports,
      memAlloc = _data$globals5.memAlloc;
    var n = data.n,
      nc = data.nc,
      nr = data.nr,
      wAddress = data.wAddress,
      xOffset = data.xOffset,
      xAddress = data.xAddress,
      yAddress = data.yAddress;
    var pv_picollm_weight_float_forward = exports.pv_picollm_weight_float_forward;
    if (!memAlloc.has(wAddress) || !memAlloc.has(xAddress) || !memAlloc.has(yAddress)) {
      self.postMessage({
        command: 'ok'
      });
      return;
    }
    var _memAlloc$get14 = memAlloc.get(wAddress),
      workerWAddress = _memAlloc$get14.workerMemAddress;
    var _memAlloc$get15 = memAlloc.get(xAddress),
      workerXAddress = _memAlloc$get15.workerMemAddress;
    var _memAlloc$get16 = memAlloc.get(yAddress),
      workerYAddress = _memAlloc$get16.workerMemAddress;
    pv_picollm_weight_float_forward(n, nc, nr, workerWAddress, workerXAddress + xOffset, workerYAddress);
    self.postMessage({
      command: 'ok'
    });
  } catch (e) {
    self.postMessage({
      command: 'error',
      message: e.message
    });
  }
};
_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS, weightBlockMixed16x8PreprocessBlocks), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE, weightBlockMixed16x8ForwardSingle), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE, weightBlockMixed16x8ForwardMultiple), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_ADD_BIAS, weightBlockMixed16x8AddBias), PvPicollmWeightAction.WEIGHT_FLOAT_FORWARD, weightFloatForward);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var initXpu = function initXpu(memory, xpuHelperWasm) {
  var setInt = function setInt(address, value) {
    var memoryBufferInt32 = new Int32Array(memory.buffer);
    memoryBufferInt32[address / Int32Array.BYTES_PER_ELEMENT] = value;
  };
  var pvXpuDeviceInfo = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(browserNameAddressAddress, browserVersionAddressAddress, osNameAddressAddress, numCoresAddress, statusAddress) {
      var aligned_alloc, uaParser, memoryBufferUint8, browserName, browserNameAddress, i, browserVersion, browserVersionAddress, _i, osName, osNameAddress, _i2, numCores;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            browserNameAddressAddress = unsignedAddress(browserNameAddressAddress);
            browserVersionAddressAddress = unsignedAddress(browserVersionAddressAddress);
            osNameAddressAddress = unsignedAddress(osNameAddressAddress);
            numCoresAddress = unsignedAddress(numCoresAddress);
            statusAddress = unsignedAddress(statusAddress);
            aligned_alloc = imports.aligned_alloc;
            uaParser = Bowser.getParser(navigator.userAgent);
            memoryBufferUint8 = new Uint8Array(memory.buffer);
            browserName = uaParser.getBrowserName();
            _context.next = 11;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (browserName.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 11:
            browserNameAddress = _context.sent;
            if (!(browserNameAddress === 0)) {
              _context.next = 15;
              break;
            }
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 15:
            setInt(browserNameAddressAddress, browserNameAddress);
            for (i = 0; i < browserName.length; i++) {
              memoryBufferUint8[browserNameAddress + i] = browserName.charCodeAt(i);
            }
            memoryBufferUint8[browserNameAddress + browserName.length] = 0;
            browserVersion = uaParser.getBrowserVersion();
            _context.next = 21;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (browserVersion.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 21:
            browserVersionAddress = _context.sent;
            if (!(browserVersionAddress === 0)) {
              _context.next = 25;
              break;
            }
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 25:
            setInt(browserVersionAddressAddress, browserVersionAddress);
            for (_i = 0; _i < browserVersion.length; _i++) {
              memoryBufferUint8[browserVersionAddress + _i] = browserVersion.charCodeAt(_i);
            }
            memoryBufferUint8[browserVersionAddress + browserVersion.length] = 0;
            osName = uaParser.getOSName();
            _context.next = 31;
            return aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, (osName.length + 1) * Uint8Array.BYTES_PER_ELEMENT);
          case 31:
            osNameAddress = _context.sent;
            if (!(osNameAddress === 0)) {
              _context.next = 35;
              break;
            }
            setInt(statusAddress, -1);
            return _context.abrupt("return");
          case 35:
            setInt(osNameAddressAddress, osNameAddress);
            for (_i2 = 0; _i2 < osName.length; _i2++) {
              memoryBufferUint8[osNameAddress + _i2] = osName.charCodeAt(_i2);
            }
            memoryBufferUint8[osNameAddress + osName.length] = 0;
            numCores = window.navigator.hardwareConcurrency;
            setInt(numCoresAddress, numCores ? numCores : 1);
            setInt(statusAddress, 0);
          case 41:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function pvXpuDeviceInfo(_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }();
  var pvXpuDeviceInit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, numWorkers, statusAddress) {
      var osWorkers, workerSize, workers, i, worker;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            statusAddress = unsignedAddress(statusAddress);
            if (xpuHelperWasm) {
              _context2.next = 5;
              break;
            }
            setInt(statusAddress, -1);
            return _context2.abrupt("return");
          case 5:
            osWorkers = window.navigator.hardwareConcurrency;
            workerSize = osWorkers && osWorkers < numWorkers ? osWorkers : numWorkers;
            workers = [];
            i = 0;
          case 9:
            if (!(i < workerSize)) {
              _context2.next = 17;
              break;
            }
            worker = new WorkerFactory();
            workers.push(worker);
            _context2.next = 14;
            return waitForWorker(worker, {
              action: PvXpuAction.INIT,
              wasm: xpuHelperWasm
            });
          case 14:
            i++;
            _context2.next = 9;
            break;
          case 17:
            PvXpu.addXpu(objAddress, {
              deviceMem: new Set(),
              numWorkers: workerSize,
              workers: workers
            });
            setInt(statusAddress, 0);
          case 19:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function pvXpuDeviceInit(_x6, _x7, _x8) {
      return _ref2.apply(this, arguments);
    };
  }();
  var pvXpuDeviceCleanup = function pvXpuDeviceCleanup(objAddress) {
    objAddress = unsignedAddress(objAddress);
    var obj = PvXpu.getXpu(objAddress);
    if (!obj) {
      return;
    }
    var _iterator = _createForOfIteratorHelper(obj.workers),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var worker = _step.value;
        worker.terminate();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    PvXpu.removeXpu(objAddress);
  };
  var pvXpuDeviceMemAlloc = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, memAddress, sizeBytes, batchSize, isShared, statusAddress) {
      var obj, batch, shared, chunkSize, remaining, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            memAddress = unsignedAddress(memAddress);
            statusAddress = unsignedAddress(statusAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context3.next = 7;
              break;
            }
            setInt(statusAddress, -1);
            return _context3.abrupt("return");
          case 7:
            batch = batchSize === 0 ? obj.numWorkers : batchSize;
            shared = isShared === 1;
            if (!(!shared && sizeBytes % batch !== 0)) {
              _context3.next = 13;
              break;
            }
            setInt(statusAddress, -1);
            console.error("Failed to allocate memory: alloc size ".concat(sizeBytes, " must be divisible by batch ").concat(batch, "."));
            return _context3.abrupt("return");
          case 13:
            chunkSize = Math.ceil(sizeBytes / batch / obj.numWorkers) * batch;
            remaining = sizeBytes;
            workerResults = [];
            i = 0;
          case 17:
            if (!(i < obj.numWorkers)) {
              _context3.next = 29;
              break;
            }
            if (!shared) {
              _context3.next = 22;
              break;
            }
            workerResults.push(waitForWorker(obj.workers[i], {
              action: PvXpuAction.ALLOC,
              size: sizeBytes,
              memAddress: memAddress
            }));
            _context3.next = 26;
            break;
          case 22:
            workerResults.push(waitForWorker(obj.workers[i], {
              action: PvXpuAction.ALLOC,
              size: Math.min(remaining, chunkSize),
              memAddress: memAddress
            }));
            remaining -= chunkSize;
            if (!(remaining <= 0)) {
              _context3.next = 26;
              break;
            }
            return _context3.abrupt("break", 29);
          case 26:
            i++;
            _context3.next = 17;
            break;
          case 29:
            _context3.next = 31;
            return Promise.all(workerResults);
          case 31:
            PvXpu.addMemory(memAddress, {
              objAddress: objAddress,
              isShared: shared,
              allocSize: sizeBytes,
              chunkSize: chunkSize
            });
            setInt(statusAddress, 0);
          case 33:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function pvXpuDeviceMemAlloc(_x9, _x10, _x11, _x12, _x13, _x14) {
      return _ref3.apply(this, arguments);
    };
  }();
  var pvXpuDeviceMemFree = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(memAddress) {
      var _PvXpu$getMemory, objAddress, obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            memAddress = unsignedAddress(memAddress);
            if (!PvXpu.hasMemory(memAddress)) {
              _context4.next = 9;
              break;
            }
            _PvXpu$getMemory = PvXpu.getMemory(memAddress), objAddress = _PvXpu$getMemory.objAddress;
            obj = PvXpu.getXpu(objAddress);
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvXpuAction.FREE,
                memAddress: memAddress
              }));
            }
            _context4.next = 8;
            return Promise.all(workerResults);
          case 8:
            PvXpu.removeMemory(memAddress);
          case 9:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function pvXpuDeviceMemFree(_x15) {
      return _ref4.apply(this, arguments);
    };
  }();
  var pvXpuDeviceMemCopyToXpu = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(memAddress, hostAddress, offset, sizeBytes) {
      var mem, objAddress, isShared, chunkSize, obj, buffer, workerResults, remaining, i, chunkStart, chunkEnd, inChunkOffset, inChunkSize, inChunkBufferStart;
      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            memAddress = unsignedAddress(memAddress);
            hostAddress = unsignedAddress(hostAddress);
            mem = PvXpu.getMemory(memAddress);
            if (mem) {
              _context5.next = 5;
              break;
            }
            return _context5.abrupt("return");
          case 5:
            objAddress = mem.objAddress, isShared = mem.isShared, chunkSize = mem.chunkSize;
            obj = PvXpu.getXpu(objAddress);
            buffer = new Uint8Array(memory.buffer).slice(hostAddress, hostAddress + sizeBytes);
            workerResults = [];
            remaining = sizeBytes;
            i = 0;
          case 11:
            if (!(i < obj.numWorkers)) {
              _context5.next = 24;
              break;
            }
            if (!isShared) {
              _context5.next = 16;
              break;
            }
            workerResults.push(waitForWorker(obj.workers[i], {
              action: PvXpuAction.COPY_TO_XPU,
              memAddress: memAddress,
              offset: offset,
              buffer: buffer
            }));
            _context5.next = 21;
            break;
          case 16:
            chunkStart = i * chunkSize;
            chunkEnd = (i + 1) * chunkSize;
            if (offset < chunkEnd) {
              inChunkOffset = offset > chunkStart ? offset - chunkStart : 0;
              inChunkSize = chunkSize - inChunkOffset;
              inChunkBufferStart = sizeBytes - remaining;
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvXpuAction.COPY_TO_XPU,
                memAddress: memAddress,
                offset: inChunkOffset,
                buffer: buffer.slice(inChunkBufferStart, inChunkBufferStart + inChunkSize)
              }));
              remaining -= inChunkSize;
            }
            if (!(remaining <= 0)) {
              _context5.next = 21;
              break;
            }
            return _context5.abrupt("break", 24);
          case 21:
            i++;
            _context5.next = 11;
            break;
          case 24:
            _context5.next = 26;
            return Promise.all(workerResults);
          case 26:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function pvXpuDeviceMemCopyToXpu(_x16, _x17, _x18, _x19) {
      return _ref5.apply(this, arguments);
    };
  }();
  var pvXpuDeviceMemCopyFromXpu = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(memAddress, hostAddress, offset, sizeBytes) {
      var mem, objAddress, allocSize, isShared, chunkSize, obj, memoryBufferUint8, workerResults, remaining, i, chunkStart, chunkEnd, inChunkOffset, inChunkSize, results, copied, _i3, result;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            memAddress = unsignedAddress(memAddress);
            hostAddress = unsignedAddress(hostAddress);
            mem = PvXpu.getMemory(memAddress);
            if (mem) {
              _context6.next = 5;
              break;
            }
            return _context6.abrupt("return");
          case 5:
            objAddress = mem.objAddress, allocSize = mem.allocSize, isShared = mem.isShared, chunkSize = mem.chunkSize;
            obj = PvXpu.getXpu(objAddress);
            memoryBufferUint8 = new Uint8Array(memory.buffer);
            workerResults = [];
            if (!isShared) {
              _context6.next = 13;
              break;
            }
            workerResults.push(waitForWorker(obj.workers[0], {
              action: PvXpuAction.COPY_FROM_XPU,
              memAddress: memAddress,
              offset: offset,
              size: allocSize
            }));
            _context6.next = 24;
            break;
          case 13:
            remaining = allocSize;
            i = 0;
          case 15:
            if (!(i < obj.numWorkers)) {
              _context6.next = 24;
              break;
            }
            chunkStart = i * chunkSize;
            chunkEnd = (i + 1) * chunkSize;
            if (offset < chunkEnd) {
              inChunkOffset = offset > chunkStart ? offset - chunkStart : 0;
              inChunkSize = Math.min(remaining, chunkSize - inChunkOffset);
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvXpuAction.COPY_FROM_XPU,
                memAddress: memAddress,
                offset: inChunkOffset,
                size: inChunkSize
              }));
              remaining -= inChunkSize;
            }
            if (!(remaining === 0)) {
              _context6.next = 21;
              break;
            }
            return _context6.abrupt("break", 24);
          case 21:
            i++;
            _context6.next = 15;
            break;
          case 24:
            _context6.next = 26;
            return Promise.all(workerResults);
          case 26:
            results = _context6.sent;
            copied = 0;
            _i3 = 0;
          case 29:
            if (!(_i3 < results.length)) {
              _context6.next = 41;
              break;
            }
            result = results[_i3];
            if (!(copied + result.length > sizeBytes)) {
              _context6.next = 36;
              break;
            }
            memoryBufferUint8.set(result.slice(0, sizeBytes - copied), hostAddress + copied);
            return _context6.abrupt("break", 41);
          case 36:
            memoryBufferUint8.set(result, hostAddress + copied);
            copied += result.length;
          case 38:
            _i3++;
            _context6.next = 29;
            break;
          case 41:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function pvXpuDeviceMemCopyFromXpu(_x20, _x21, _x22, _x23) {
      return _ref6.apply(this, arguments);
    };
  }();
  var pvXpuDeviceMemMemset = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(memAddress, fillByte, sizeBytes) {
      var mem, objAddress, allocSize, isShared, chunkSize, obj, workerResults, remaining, i;
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            memAddress = unsignedAddress(memAddress);
            mem = PvXpu.getMemory(memAddress);
            if (mem) {
              _context7.next = 4;
              break;
            }
            return _context7.abrupt("return");
          case 4:
            objAddress = mem.objAddress, allocSize = mem.allocSize, isShared = mem.isShared, chunkSize = mem.chunkSize;
            obj = PvXpu.getXpu(objAddress);
            workerResults = [];
            remaining = sizeBytes;
            i = 0;
          case 9:
            if (!(i < obj.numWorkers)) {
              _context7.next = 21;
              break;
            }
            if (!isShared) {
              _context7.next = 14;
              break;
            }
            workerResults.push(waitForWorker(obj.workers[i], {
              action: PvXpuAction.MEMSET,
              memAddress: memAddress,
              fillByte: fillByte,
              size: allocSize
            }));
            _context7.next = 18;
            break;
          case 14:
            workerResults.push(waitForWorker(obj.workers[i], {
              action: PvXpuAction.MEMSET,
              memAddress: memAddress,
              fillByte: fillByte,
              size: Math.min(remaining, chunkSize)
            }));
            remaining -= chunkSize;
            if (!(remaining <= 0)) {
              _context7.next = 18;
              break;
            }
            return _context7.abrupt("break", 21);
          case 18:
            i++;
            _context7.next = 9;
            break;
          case 21:
            _context7.next = 23;
            return Promise.all(workerResults);
          case 23:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function pvXpuDeviceMemMemset(_x24, _x25, _x26) {
      return _ref7.apply(this, arguments);
    };
  }();
  var pvXpuGetMaxWorkersWasm = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(maxWorkersAddress) {
      var maxWorkers;
      return _regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            maxWorkersAddress = unsignedAddress(maxWorkersAddress);
            maxWorkers = window.navigator.hardwareConcurrency;
            setInt(maxWorkersAddress, maxWorkers ? maxWorkers : 1);
          case 3:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }));
    return function pvXpuGetMaxWorkersWasm(_x27) {
      return _ref8.apply(this, arguments);
    };
  }();
  var pvXpuTimerStart = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee9(objAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context9.next = 4;
              break;
            }
            return _context9.abrupt("return");
          case 4:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvXpuAction.TIMER_START,
                workerIndex: i
              }));
            }
            _context9.next = 8;
            return Promise.all(workerResults);
          case 8:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function pvXpuTimerStart(_x28) {
      return _ref9.apply(this, arguments);
    };
  }();
  var pvXpuTimerStop = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee10(objAddress) {
      var obj, workerResults, i;
      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            objAddress = unsignedAddress(objAddress);
            obj = PvXpu.getXpu(objAddress);
            if (obj) {
              _context10.next = 4;
              break;
            }
            return _context10.abrupt("return");
          case 4:
            workerResults = [];
            for (i = 0; i < obj.numWorkers; i++) {
              workerResults.push(waitForWorker(obj.workers[i], {
                action: PvXpuAction.TIMER_STOP
              }));
            }
            _context10.next = 8;
            return Promise.all(workerResults);
          case 8:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }));
    return function pvXpuTimerStop(_x29) {
      return _ref10.apply(this, arguments);
    };
  }();
  var imports = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
    aligned_alloc: function aligned_alloc(alignment, size) {
      throw new Error("aligned_alloc was not passed in from parent module");
    },
    pv_xpu_web_worker_device_info_wasm: pvXpuDeviceInfo,
    pv_xpu_web_worker_device_init_wasm: pvXpuDeviceInit,
    pv_xpu_web_worker_device_cleanup_wasm: pvXpuDeviceCleanup,
    pv_xpu_web_worker_device_mem_alloc_wasm: pvXpuDeviceMemAlloc,
    pv_xpu_web_worker_device_mem_free_wasm: pvXpuDeviceMemFree,
    pv_xpu_web_worker_device_mem_copy_to_xpu_wasm: pvXpuDeviceMemCopyToXpu,
    pv_xpu_web_worker_device_mem_copy_from_xpu_wasm: pvXpuDeviceMemCopyFromXpu,
    pv_xpu_web_worker_device_mem_memset_wasm: pvXpuDeviceMemMemset,
    pv_xpu_web_worker_get_max_workers_wasm: pvXpuGetMaxWorkersWasm,
    pv_xpu_web_worker_timer_start_wasm: pvXpuTimerStart,
    pv_xpu_web_worker_timer_stop_wasm: pvXpuTimerStop
  }, getMvmWasmFunctions(memory)), getPicollmAttentionWasmFunctions(memory)), getPicollmFeedForwardWasmFunctions(memory)), getPicollmGateWasmFunctions(memory)), getPicollmMoeTransformerWasmFunctions(memory)), getPicollmNormWasmFunctions(memory)), getPicollmNormLayerWasmFunctions(memory)), getPicollmTransformerWasmFunctions(memory)), getPicollmWeightWasmFunctions(memory));
  return imports;
};

export { initXpu as default };
