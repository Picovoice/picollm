var XpuWebWorker = (function () {
  'use strict';

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

  function _arrayLikeToArray$4(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _unsupportedIterableToArray$4(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$4(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen);
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest();
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
  /**
   * Convert a null terminated phrase stored inside an array buffer to a string
   *
   * @param arrayBuffer input array buffer
   * @param indexStart the index at which the phrase is stored
   * @return retrieved string
   */
  function arrayBufferToStringAtIndex(arrayBuffer, indexStart) {
    var indexEnd = indexStart;
    while (arrayBuffer[indexEnd] !== 0) {
      indexEnd++;
    }
    var utf8decoder = new TextDecoder('utf-8');
    return utf8decoder.decode(arrayBuffer.subarray(indexStart, indexEnd));
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

  var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgZnVuY3Rpb24gX3R5cGVvZiQzKG8pIHsKICAgICJAYmFiZWwvaGVscGVycyAtIHR5cGVvZiI7CgogICAgcmV0dXJuIF90eXBlb2YkMyA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiAic3ltYm9sIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsKICAgICAgcmV0dXJuIHR5cGVvZiBvOwogICAgfSA6IGZ1bmN0aW9uIChvKSB7CiAgICAgIHJldHVybiBvICYmICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/ICJzeW1ib2wiIDogdHlwZW9mIG87CiAgICB9LCBfdHlwZW9mJDMobyk7CiAgfQoKICBmdW5jdGlvbiB0b1ByaW1pdGl2ZSh0LCByKSB7CiAgICBpZiAoIm9iamVjdCIgIT0gX3R5cGVvZiQzKHQpIHx8ICF0KSByZXR1cm4gdDsKICAgIHZhciBlID0gdFtTeW1ib2wudG9QcmltaXRpdmVdOwogICAgaWYgKHZvaWQgMCAhPT0gZSkgewogICAgICB2YXIgaSA9IGUuY2FsbCh0LCByIHx8ICJkZWZhdWx0Iik7CiAgICAgIGlmICgib2JqZWN0IiAhPSBfdHlwZW9mJDMoaSkpIHJldHVybiBpOwogICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLiIpOwogICAgfQogICAgcmV0dXJuICgic3RyaW5nIiA9PT0gciA/IFN0cmluZyA6IE51bWJlcikodCk7CiAgfQoKICBmdW5jdGlvbiB0b1Byb3BlcnR5S2V5KHQpIHsKICAgIHZhciBpID0gdG9QcmltaXRpdmUodCwgInN0cmluZyIpOwogICAgcmV0dXJuICJzeW1ib2wiID09IF90eXBlb2YkMyhpKSA/IGkgOiBTdHJpbmcoaSk7CiAgfQoKICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7CiAgICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7CiAgICBpZiAoa2V5IGluIG9iaikgewogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsKICAgICAgICB2YWx1ZTogdmFsdWUsCiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICBjb25maWd1cmFibGU6IHRydWUsCiAgICAgICAgd3JpdGFibGU6IHRydWUKICAgICAgfSk7CiAgICB9IGVsc2UgewogICAgICBvYmpba2V5XSA9IHZhbHVlOwogICAgfQogICAgcmV0dXJuIG9iajsKICB9CgogIGZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHsKICAgIHRyeSB7CiAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTsKICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTsKICAgIH0gY2F0Y2ggKGVycm9yKSB7CiAgICAgIHJlamVjdChlcnJvcik7CiAgICAgIHJldHVybjsKICAgIH0KICAgIGlmIChpbmZvLmRvbmUpIHsKICAgICAgcmVzb2x2ZSh2YWx1ZSk7CiAgICB9IGVsc2UgewogICAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7CiAgICB9CiAgfQogIGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7CiAgICByZXR1cm4gZnVuY3Rpb24gKCkgewogICAgICB2YXIgc2VsZiA9IHRoaXMsCiAgICAgICAgYXJncyA9IGFyZ3VtZW50czsKICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsKICAgICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7CiAgICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHsKICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgIm5leHQiLCB2YWx1ZSk7CiAgICAgICAgfQogICAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHsKICAgICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgInRocm93IiwgZXJyKTsKICAgICAgICB9CiAgICAgICAgX25leHQodW5kZWZpbmVkKTsKICAgICAgfSk7CiAgICB9OwogIH0KCiAgZnVuY3Rpb24gZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMkMSAoeCkgewogIAlyZXR1cm4geCAmJiB4Ll9fZXNNb2R1bGUgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHgsICdkZWZhdWx0JykgPyB4WydkZWZhdWx0J10gOiB4OwogIH0KCiAgdmFyIHJlZ2VuZXJhdG9yUnVudGltZSQyID0ge2V4cG9ydHM6IHt9fTsKCiAgdmFyIF90eXBlb2YkMiA9IHtleHBvcnRzOiB7fX07CgogIF90eXBlb2YkMi5leHBvcnRzOwoKICAoZnVuY3Rpb24gKG1vZHVsZSkgewogIAlmdW5jdGlvbiBfdHlwZW9mKG8pIHsKICAJICAiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2YiOwoKICAJICByZXR1cm4gKG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiAic3ltYm9sIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsKICAJICAgIHJldHVybiB0eXBlb2YgbzsKICAJICB9IDogZnVuY3Rpb24gKG8pIHsKICAJICAgIHJldHVybiBvICYmICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/ICJzeW1ib2wiIDogdHlwZW9mIG87CiAgCSAgfSwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzWyJkZWZhdWx0Il0gPSBtb2R1bGUuZXhwb3J0cyksIF90eXBlb2Yobyk7CiAgCX0KICAJbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbImRlZmF1bHQiXSA9IG1vZHVsZS5leHBvcnRzOyAKICB9IChfdHlwZW9mJDIpKTsKCiAgdmFyIF90eXBlb2ZFeHBvcnRzJDEgPSBfdHlwZW9mJDIuZXhwb3J0czsKCiAgcmVnZW5lcmF0b3JSdW50aW1lJDIuZXhwb3J0czsKCiAgKGZ1bmN0aW9uIChtb2R1bGUpIHsKICAJdmFyIF90eXBlb2YgPSBfdHlwZW9mRXhwb3J0cyQxWyJkZWZhdWx0Il07CiAgCWZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7CiAgCSAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHsKICAJICAgIHJldHVybiBlOwogIAkgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1siZGVmYXVsdCJdID0gbW9kdWxlLmV4cG9ydHM7CiAgCSAgdmFyIHQsCiAgCSAgICBlID0ge30sCiAgCSAgICByID0gT2JqZWN0LnByb3RvdHlwZSwKICAJICAgIG4gPSByLmhhc093blByb3BlcnR5LAogIAkgICAgbyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAodCwgZSwgcikgewogIAkgICAgICB0W2VdID0gci52YWx1ZTsKICAJICAgIH0sCiAgCSAgICBpID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sCiAgCSAgICBhID0gaS5pdGVyYXRvciB8fCAiQEBpdGVyYXRvciIsCiAgCSAgICBjID0gaS5hc3luY0l0ZXJhdG9yIHx8ICJAQGFzeW5jSXRlcmF0b3IiLAogIAkgICAgdSA9IGkudG9TdHJpbmdUYWcgfHwgIkBAdG9TdHJpbmdUYWciOwogIAkgIGZ1bmN0aW9uIGRlZmluZSh0LCBlLCByKSB7CiAgCSAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIGUsIHsKICAJICAgICAgdmFsdWU6IHIsCiAgCSAgICAgIGVudW1lcmFibGU6ICEwLAogIAkgICAgICBjb25maWd1cmFibGU6ICEwLAogIAkgICAgICB3cml0YWJsZTogITAKICAJICAgIH0pLCB0W2VdOwogIAkgIH0KICAJICB0cnkgewogIAkgICAgZGVmaW5lKHt9LCAiIik7CiAgCSAgfSBjYXRjaCAodCkgewogIAkgICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKHQsIGUsIHIpIHsKICAJICAgICAgcmV0dXJuIHRbZV0gPSByOwogIAkgICAgfTsKICAJICB9CiAgCSAgZnVuY3Rpb24gd3JhcCh0LCBlLCByLCBuKSB7CiAgCSAgICB2YXIgaSA9IGUgJiYgZS5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBlIDogR2VuZXJhdG9yLAogIAkgICAgICBhID0gT2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksCiAgCSAgICAgIGMgPSBuZXcgQ29udGV4dChuIHx8IFtdKTsKICAJICAgIHJldHVybiBvKGEsICJfaW52b2tlIiwgewogIAkgICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZCh0LCByLCBjKQogIAkgICAgfSksIGE7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIHRyeUNhdGNoKHQsIGUsIHIpIHsKICAJICAgIHRyeSB7CiAgCSAgICAgIHJldHVybiB7CiAgCSAgICAgICAgdHlwZTogIm5vcm1hbCIsCiAgCSAgICAgICAgYXJnOiB0LmNhbGwoZSwgcikKICAJICAgICAgfTsKICAJICAgIH0gY2F0Y2ggKHQpIHsKICAJICAgICAgcmV0dXJuIHsKICAJICAgICAgICB0eXBlOiAidGhyb3ciLAogIAkgICAgICAgIGFyZzogdAogIAkgICAgICB9OwogIAkgICAgfQogIAkgIH0KICAJICBlLndyYXAgPSB3cmFwOwogIAkgIHZhciBoID0gInN1c3BlbmRlZFN0YXJ0IiwKICAJICAgIGwgPSAic3VzcGVuZGVkWWllbGQiLAogIAkgICAgZiA9ICJleGVjdXRpbmciLAogIAkgICAgcyA9ICJjb21wbGV0ZWQiLAogIAkgICAgeSA9IHt9OwogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9CiAgCSAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fQogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30KICAJICB2YXIgcCA9IHt9OwogIAkgIGRlZmluZShwLCBhLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gdGhpczsKICAJICB9KTsKICAJICB2YXIgZCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiwKICAJICAgIHYgPSBkICYmIGQoZCh2YWx1ZXMoW10pKSk7CiAgCSAgdiAmJiB2ICE9PSByICYmIG4uY2FsbCh2LCBhKSAmJiAocCA9IHYpOwogIAkgIHZhciBnID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocCk7CiAgCSAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHQpIHsKICAJICAgIFsibmV4dCIsICJ0aHJvdyIsICJyZXR1cm4iXS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7CiAgCSAgICAgIGRlZmluZSh0LCBlLCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UoZSwgdCk7CiAgCSAgICAgIH0pOwogIAkgICAgfSk7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IodCwgZSkgewogIAkgICAgZnVuY3Rpb24gaW52b2tlKHIsIG8sIGksIGEpIHsKICAJICAgICAgdmFyIGMgPSB0cnlDYXRjaCh0W3JdLCB0LCBvKTsKICAJICAgICAgaWYgKCJ0aHJvdyIgIT09IGMudHlwZSkgewogIAkgICAgICAgIHZhciB1ID0gYy5hcmcsCiAgCSAgICAgICAgICBoID0gdS52YWx1ZTsKICAJICAgICAgICByZXR1cm4gaCAmJiAib2JqZWN0IiA9PSBfdHlwZW9mKGgpICYmIG4uY2FsbChoLCAiX19hd2FpdCIpID8gZS5yZXNvbHZlKGguX19hd2FpdCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgaW52b2tlKCJuZXh0IiwgdCwgaSwgYSk7CiAgCSAgICAgICAgfSwgZnVuY3Rpb24gKHQpIHsKICAJICAgICAgICAgIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KSA6IGUucmVzb2x2ZShoKS50aGVuKGZ1bmN0aW9uICh0KSB7CiAgCSAgICAgICAgICB1LnZhbHVlID0gdCwgaSh1KTsKICAJICAgICAgICB9LCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgcmV0dXJuIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KTsKICAJICAgICAgfQogIAkgICAgICBhKGMuYXJnKTsKICAJICAgIH0KICAJICAgIHZhciByOwogIAkgICAgbyh0aGlzLCAiX2ludm9rZSIsIHsKICAJICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHQsIG4pIHsKICAJICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHsKICAJICAgICAgICAgIHJldHVybiBuZXcgZShmdW5jdGlvbiAoZSwgcikgewogIAkgICAgICAgICAgICBpbnZva2UodCwgbiwgZSwgcik7CiAgCSAgICAgICAgICB9KTsKICAJICAgICAgICB9CiAgCSAgICAgICAgcmV0dXJuIHIgPSByID8gci50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpOwogIAkgICAgICB9CiAgCSAgICB9KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChlLCByLCBuKSB7CiAgCSAgICB2YXIgbyA9IGg7CiAgCSAgICByZXR1cm4gZnVuY3Rpb24gKGksIGEpIHsKICAJICAgICAgaWYgKG8gPT09IGYpIHRocm93IG5ldyBFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZyIpOwogIAkgICAgICBpZiAobyA9PT0gcykgewogIAkgICAgICAgIGlmICgidGhyb3ciID09PSBpKSB0aHJvdyBhOwogIAkgICAgICAgIHJldHVybiB7CiAgCSAgICAgICAgICB2YWx1ZTogdCwKICAJICAgICAgICAgIGRvbmU6ICEwCiAgCSAgICAgICAgfTsKICAJICAgICAgfQogIAkgICAgICBmb3IgKG4ubWV0aG9kID0gaSwgbi5hcmcgPSBhOzspIHsKICAJICAgICAgICB2YXIgYyA9IG4uZGVsZWdhdGU7CiAgCSAgICAgICAgaWYgKGMpIHsKICAJICAgICAgICAgIHZhciB1ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShjLCBuKTsKICAJICAgICAgICAgIGlmICh1KSB7CiAgCSAgICAgICAgICAgIGlmICh1ID09PSB5KSBjb250aW51ZTsKICAJICAgICAgICAgICAgcmV0dXJuIHU7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICAgIGlmICgibmV4dCIgPT09IG4ubWV0aG9kKSBuLnNlbnQgPSBuLl9zZW50ID0gbi5hcmc7ZWxzZSBpZiAoInRocm93IiA9PT0gbi5tZXRob2QpIHsKICAJICAgICAgICAgIGlmIChvID09PSBoKSB0aHJvdyBvID0gcywgbi5hcmc7CiAgCSAgICAgICAgICBuLmRpc3BhdGNoRXhjZXB0aW9uKG4uYXJnKTsKICAJICAgICAgICB9IGVsc2UgInJldHVybiIgPT09IG4ubWV0aG9kICYmIG4uYWJydXB0KCJyZXR1cm4iLCBuLmFyZyk7CiAgCSAgICAgICAgbyA9IGY7CiAgCSAgICAgICAgdmFyIHAgPSB0cnlDYXRjaChlLCByLCBuKTsKICAJICAgICAgICBpZiAoIm5vcm1hbCIgPT09IHAudHlwZSkgewogIAkgICAgICAgICAgaWYgKG8gPSBuLmRvbmUgPyBzIDogbCwgcC5hcmcgPT09IHkpIGNvbnRpbnVlOwogIAkgICAgICAgICAgcmV0dXJuIHsKICAJICAgICAgICAgICAgdmFsdWU6IHAuYXJnLAogIAkgICAgICAgICAgICBkb25lOiBuLmRvbmUKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgfQogIAkgICAgICAgICJ0aHJvdyIgPT09IHAudHlwZSAmJiAobyA9IHMsIG4ubWV0aG9kID0gInRocm93Iiwgbi5hcmcgPSBwLmFyZyk7CiAgCSAgICAgIH0KICAJICAgIH07CiAgCSAgfQogIAkgIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgcikgewogIAkgICAgdmFyIG4gPSByLm1ldGhvZCwKICAJICAgICAgbyA9IGUuaXRlcmF0b3Jbbl07CiAgCSAgICBpZiAobyA9PT0gdCkgcmV0dXJuIHIuZGVsZWdhdGUgPSBudWxsLCAidGhyb3ciID09PSBuICYmIGUuaXRlcmF0b3JbInJldHVybiJdICYmIChyLm1ldGhvZCA9ICJyZXR1cm4iLCByLmFyZyA9IHQsIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgciksICJ0aHJvdyIgPT09IHIubWV0aG9kKSB8fCAicmV0dXJuIiAhPT0gbiAmJiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJyIgKyBuICsgIicgbWV0aG9kIikpLCB5OwogIAkgICAgdmFyIGkgPSB0cnlDYXRjaChvLCBlLml0ZXJhdG9yLCByLmFyZyk7CiAgCSAgICBpZiAoInRocm93IiA9PT0gaS50eXBlKSByZXR1cm4gci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IGkuYXJnLCByLmRlbGVnYXRlID0gbnVsbCwgeTsKICAJICAgIHZhciBhID0gaS5hcmc7CiAgCSAgICByZXR1cm4gYSA/IGEuZG9uZSA/IChyW2UucmVzdWx0TmFtZV0gPSBhLnZhbHVlLCByLm5leHQgPSBlLm5leHRMb2MsICJyZXR1cm4iICE9PSByLm1ldGhvZCAmJiAoci5tZXRob2QgPSAibmV4dCIsIHIuYXJnID0gdCksIHIuZGVsZWdhdGUgPSBudWxsLCB5KSA6IGEgOiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0IiksIHIuZGVsZWdhdGUgPSBudWxsLCB5KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gewogIAkgICAgICB0cnlMb2M6IHRbMF0KICAJICAgIH07CiAgCSAgICAxIGluIHQgJiYgKGUuY2F0Y2hMb2MgPSB0WzFdKSwgMiBpbiB0ICYmIChlLmZpbmFsbHlMb2MgPSB0WzJdLCBlLmFmdGVyTG9jID0gdFszXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGUpOwogIAkgIH0KICAJICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gdC5jb21wbGV0aW9uIHx8IHt9OwogIAkgICAgZS50eXBlID0gIm5vcm1hbCIsIGRlbGV0ZSBlLmFyZywgdC5jb21wbGV0aW9uID0gZTsKICAJICB9CiAgCSAgZnVuY3Rpb24gQ29udGV4dCh0KSB7CiAgCSAgICB0aGlzLnRyeUVudHJpZXMgPSBbewogIAkgICAgICB0cnlMb2M6ICJyb290IgogIAkgICAgfV0sIHQuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTsKICAJICB9CiAgCSAgZnVuY3Rpb24gdmFsdWVzKGUpIHsKICAJICAgIGlmIChlIHx8ICIiID09PSBlKSB7CiAgCSAgICAgIHZhciByID0gZVthXTsKICAJICAgICAgaWYgKHIpIHJldHVybiByLmNhbGwoZSk7CiAgCSAgICAgIGlmICgiZnVuY3Rpb24iID09IHR5cGVvZiBlLm5leHQpIHJldHVybiBlOwogIAkgICAgICBpZiAoIWlzTmFOKGUubGVuZ3RoKSkgewogIAkgICAgICAgIHZhciBvID0gLTEsCiAgCSAgICAgICAgICBpID0gZnVuY3Rpb24gbmV4dCgpIHsKICAJICAgICAgICAgICAgZm9yICg7ICsrbyA8IGUubGVuZ3RoOykgaWYgKG4uY2FsbChlLCBvKSkgcmV0dXJuIG5leHQudmFsdWUgPSBlW29dLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMCwgbmV4dDsKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgcmV0dXJuIGkubmV4dCA9IGk7CiAgCSAgICAgIH0KICAJICAgIH0KICAJICAgIHRocm93IG5ldyBUeXBlRXJyb3IoX3R5cGVvZihlKSArICIgaXMgbm90IGl0ZXJhYmxlIik7CiAgCSAgfQogIAkgIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgbyhnLCAiY29uc3RydWN0b3IiLCB7CiAgCSAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsCiAgCSAgICBjb25maWd1cmFibGU6ICEwCiAgCSAgfSksIG8oR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsICJjb25zdHJ1Y3RvciIsIHsKICAJICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbiwKICAJICAgIGNvbmZpZ3VyYWJsZTogITAKICAJICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpLCBlLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAodCkgewogIAkgICAgdmFyIGUgPSAiZnVuY3Rpb24iID09IHR5cGVvZiB0ICYmIHQuY29uc3RydWN0b3I7CiAgCSAgICByZXR1cm4gISFlICYmIChlID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAiR2VuZXJhdG9yRnVuY3Rpb24iID09PSAoZS5kaXNwbGF5TmFtZSB8fCBlLm5hbWUpKTsKICAJICB9LCBlLm1hcmsgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZih0LCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAodC5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKHQsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpKSwgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGcpLCB0OwogIAkgIH0sIGUuYXdyYXAgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIHsKICAJICAgICAgX19hd2FpdDogdAogIAkgICAgfTsKICAJICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGMsIGZ1bmN0aW9uICgpIHsKICAJICAgIHJldHVybiB0aGlzOwogIAkgIH0pLCBlLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBlLmFzeW5jID0gZnVuY3Rpb24gKHQsIHIsIG4sIG8sIGkpIHsKICAJICAgIHZvaWQgMCA9PT0gaSAmJiAoaSA9IFByb21pc2UpOwogIAkgICAgdmFyIGEgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKHQsIHIsIG4sIG8pLCBpKTsKICAJICAgIHJldHVybiBlLmlzR2VuZXJhdG9yRnVuY3Rpb24ocikgPyBhIDogYS5uZXh0KCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICByZXR1cm4gdC5kb25lID8gdC52YWx1ZSA6IGEubmV4dCgpOwogIAkgICAgfSk7CiAgCSAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKGcpLCBkZWZpbmUoZywgdSwgIkdlbmVyYXRvciIpLCBkZWZpbmUoZywgYSwgZnVuY3Rpb24gKCkgewogIAkgICAgcmV0dXJuIHRoaXM7CiAgCSAgfSksIGRlZmluZShnLCAidG9TdHJpbmciLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gIltvYmplY3QgR2VuZXJhdG9yXSI7CiAgCSAgfSksIGUua2V5cyA9IGZ1bmN0aW9uICh0KSB7CiAgCSAgICB2YXIgZSA9IE9iamVjdCh0KSwKICAJICAgICAgciA9IFtdOwogIAkgICAgZm9yICh2YXIgbiBpbiBlKSByLnB1c2gobik7CiAgCSAgICByZXR1cm4gci5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7CiAgCSAgICAgIGZvciAoOyByLmxlbmd0aDspIHsKICAJICAgICAgICB2YXIgdCA9IHIucG9wKCk7CiAgCSAgICAgICAgaWYgKHQgaW4gZSkgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgfQogIAkgICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7CiAgCSAgICB9OwogIAkgIH0sIGUudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHsKICAJICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LAogIAkgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KGUpIHsKICAJICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB0LCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gIm5leHQiLCB0aGlzLmFyZyA9IHQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhZSkgZm9yICh2YXIgciBpbiB0aGlzKSAidCIgPT09IHIuY2hhckF0KDApICYmIG4uY2FsbCh0aGlzLCByKSAmJiAhaXNOYU4oK3Iuc2xpY2UoMSkpICYmICh0aGlzW3JdID0gdCk7CiAgCSAgICB9LAogIAkgICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHsKICAJICAgICAgdGhpcy5kb25lID0gITA7CiAgCSAgICAgIHZhciB0ID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gdGhpcy5ydmFsOwogIAkgICAgfSwKICAJICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihlKSB7CiAgCSAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGU7CiAgCSAgICAgIHZhciByID0gdGhpczsKICAJICAgICAgZnVuY3Rpb24gaGFuZGxlKG4sIG8pIHsKICAJICAgICAgICByZXR1cm4gYS50eXBlID0gInRocm93IiwgYS5hcmcgPSBlLCByLm5leHQgPSBuLCBvICYmIChyLm1ldGhvZCA9ICJuZXh0Iiwgci5hcmcgPSB0KSwgISFvOwogIAkgICAgICB9CiAgCSAgICAgIGZvciAodmFyIG8gPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgbyA+PSAwOyAtLW8pIHsKICAJICAgICAgICB2YXIgaSA9IHRoaXMudHJ5RW50cmllc1tvXSwKICAJICAgICAgICAgIGEgPSBpLmNvbXBsZXRpb247CiAgCSAgICAgICAgaWYgKCJyb290IiA9PT0gaS50cnlMb2MpIHJldHVybiBoYW5kbGUoImVuZCIpOwogIAkgICAgICAgIGlmIChpLnRyeUxvYyA8PSB0aGlzLnByZXYpIHsKICAJICAgICAgICAgIHZhciBjID0gbi5jYWxsKGksICJjYXRjaExvYyIpLAogIAkgICAgICAgICAgICB1ID0gbi5jYWxsKGksICJmaW5hbGx5TG9jIik7CiAgCSAgICAgICAgICBpZiAoYyAmJiB1KSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShpLmZpbmFsbHlMb2MpOwogIAkgICAgICAgICAgfSBlbHNlIGlmIChjKSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgIH0gZWxzZSB7CiAgCSAgICAgICAgICAgIGlmICghdSkgdGhyb3cgbmV3IEVycm9yKCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseSIpOwogIAkgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgaS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGkuZmluYWxseUxvYyk7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICB9CiAgCSAgICB9LAogIAkgICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodCwgZSkgewogIAkgICAgICBmb3IgKHZhciByID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IHIgPj0gMDsgLS1yKSB7CiAgCSAgICAgICAgdmFyIG8gPSB0aGlzLnRyeUVudHJpZXNbcl07CiAgCSAgICAgICAgaWYgKG8udHJ5TG9jIDw9IHRoaXMucHJldiAmJiBuLmNhbGwobywgImZpbmFsbHlMb2MiKSAmJiB0aGlzLnByZXYgPCBvLmZpbmFsbHlMb2MpIHsKICAJICAgICAgICAgIHZhciBpID0gbzsKICAJICAgICAgICAgIGJyZWFrOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICBpICYmICgiYnJlYWsiID09PSB0IHx8ICJjb250aW51ZSIgPT09IHQpICYmIGkudHJ5TG9jIDw9IGUgJiYgZSA8PSBpLmZpbmFsbHlMb2MgJiYgKGkgPSBudWxsKTsKICAJICAgICAgdmFyIGEgPSBpID8gaS5jb21wbGV0aW9uIDoge307CiAgCSAgICAgIHJldHVybiBhLnR5cGUgPSB0LCBhLmFyZyA9IGUsIGkgPyAodGhpcy5tZXRob2QgPSAibmV4dCIsIHRoaXMubmV4dCA9IGkuZmluYWxseUxvYywgeSkgOiB0aGlzLmNvbXBsZXRlKGEpOwogIAkgICAgfSwKICAJICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSh0LCBlKSB7CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gImJyZWFrIiA9PT0gdC50eXBlIHx8ICJjb250aW51ZSIgPT09IHQudHlwZSA/IHRoaXMubmV4dCA9IHQuYXJnIDogInJldHVybiIgPT09IHQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHQuYXJnLCB0aGlzLm1ldGhvZCA9ICJyZXR1cm4iLCB0aGlzLm5leHQgPSAiZW5kIikgOiAibm9ybWFsIiA9PT0gdC50eXBlICYmIGUgJiYgKHRoaXMubmV4dCA9IGUpLCB5OwogIAkgICAgfSwKICAJICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKHQpIHsKICAJICAgICAgZm9yICh2YXIgZSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBlID49IDA7IC0tZSkgewogIAkgICAgICAgIHZhciByID0gdGhpcy50cnlFbnRyaWVzW2VdOwogIAkgICAgICAgIGlmIChyLmZpbmFsbHlMb2MgPT09IHQpIHJldHVybiB0aGlzLmNvbXBsZXRlKHIuY29tcGxldGlvbiwgci5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkociksIHk7CiAgCSAgICAgIH0KICAJICAgIH0sCiAgCSAgICAiY2F0Y2giOiBmdW5jdGlvbiBfY2F0Y2godCkgewogIAkgICAgICBmb3IgKHZhciBlID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGUgPj0gMDsgLS1lKSB7CiAgCSAgICAgICAgdmFyIHIgPSB0aGlzLnRyeUVudHJpZXNbZV07CiAgCSAgICAgICAgaWYgKHIudHJ5TG9jID09PSB0KSB7CiAgCSAgICAgICAgICB2YXIgbiA9IHIuY29tcGxldGlvbjsKICAJICAgICAgICAgIGlmICgidGhyb3ciID09PSBuLnR5cGUpIHsKICAJICAgICAgICAgICAgdmFyIG8gPSBuLmFyZzsKICAJICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShyKTsKICAJICAgICAgICAgIH0KICAJICAgICAgICAgIHJldHVybiBvOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICB0aHJvdyBuZXcgRXJyb3IoImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdCIpOwogIAkgICAgfSwKICAJICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoZSwgciwgbikgewogIAkgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHsKICAJICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGUpLAogIAkgICAgICAgIHJlc3VsdE5hbWU6IHIsCiAgCSAgICAgICAgbmV4dExvYzogbgogIAkgICAgICB9LCAibmV4dCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHQpLCB5OwogIAkgICAgfQogIAkgIH0sIGU7CiAgCX0KICAJbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbImRlZmF1bHQiXSA9IG1vZHVsZS5leHBvcnRzOyAKICB9IChyZWdlbmVyYXRvclJ1bnRpbWUkMikpOwoKICB2YXIgcmVnZW5lcmF0b3JSdW50aW1lRXhwb3J0cyQxID0gcmVnZW5lcmF0b3JSdW50aW1lJDIuZXhwb3J0czsKCiAgLy8gVE9ETyhCYWJlbCA4KTogUmVtb3ZlIHRoaXMgZmlsZS4KCiAgdmFyIHJ1bnRpbWUkMSA9IHJlZ2VuZXJhdG9yUnVudGltZUV4cG9ydHMkMSgpOwogIHZhciByZWdlbmVyYXRvciQxID0gcnVudGltZSQxOwoKICAvLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvYmxvYi9tYWluL3BhY2thZ2VzL3J1bnRpbWUvcnVudGltZS5qcyNMNzM2PQogIHRyeSB7CiAgICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lJDE7CiAgfSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHsKICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gIm9iamVjdCIpIHsKICAgICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lJDE7CiAgICB9IGVsc2UgewogICAgICBGdW5jdGlvbigiciIsICJyZWdlbmVyYXRvclJ1bnRpbWUgPSByIikocnVudGltZSQxKTsKICAgIH0KICB9CgogIHZhciBfcmVnZW5lcmF0b3JSdW50aW1lJDEgPSAvKkBfX1BVUkVfXyovZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMkMShyZWdlbmVyYXRvciQxKTsKCiAgZnVuY3Rpb24gZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMgKHgpIHsKICAJcmV0dXJuIHggJiYgeC5fX2VzTW9kdWxlICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh4LCAnZGVmYXVsdCcpID8geFsnZGVmYXVsdCddIDogeDsKICB9CgogIHZhciByZWdlbmVyYXRvclJ1bnRpbWUkMSA9IHtleHBvcnRzOiB7fX07CgogIHZhciBfdHlwZW9mJDEgPSB7ZXhwb3J0czoge319OwoKICBfdHlwZW9mJDEuZXhwb3J0czsKCiAgKGZ1bmN0aW9uIChtb2R1bGUpIHsKICAJZnVuY3Rpb24gX3R5cGVvZihvKSB7CiAgCSAgIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mIjsKCiAgCSAgcmV0dXJuIChtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSAiZnVuY3Rpb24iID09IHR5cGVvZiBTeW1ib2wgJiYgInN5bWJvbCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvKSB7CiAgCSAgICByZXR1cm4gdHlwZW9mIG87CiAgCSAgfSA6IGZ1bmN0aW9uIChvKSB7CiAgCSAgICByZXR1cm4gbyAmJiAiZnVuY3Rpb24iID09IHR5cGVvZiBTeW1ib2wgJiYgby5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG8gIT09IFN5bWJvbC5wcm90b3R5cGUgPyAic3ltYm9sIiA6IHR5cGVvZiBvOwogIAkgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1siZGVmYXVsdCJdID0gbW9kdWxlLmV4cG9ydHMpLCBfdHlwZW9mKG8pOwogIAl9CiAgCW1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiwgbW9kdWxlLmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWUsIG1vZHVsZS5leHBvcnRzWyJkZWZhdWx0Il0gPSBtb2R1bGUuZXhwb3J0czsgCiAgfSAoX3R5cGVvZiQxKSk7CgogIHZhciBfdHlwZW9mRXhwb3J0cyA9IF90eXBlb2YkMS5leHBvcnRzOwoKICByZWdlbmVyYXRvclJ1bnRpbWUkMS5leHBvcnRzOwoKICAoZnVuY3Rpb24gKG1vZHVsZSkgewogIAl2YXIgX3R5cGVvZiA9IF90eXBlb2ZFeHBvcnRzWyJkZWZhdWx0Il07CiAgCWZ1bmN0aW9uIF9yZWdlbmVyYXRvclJ1bnRpbWUoKSB7CiAgCSAgbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lID0gZnVuY3Rpb24gX3JlZ2VuZXJhdG9yUnVudGltZSgpIHsKICAJICAgIHJldHVybiBlOwogIAkgIH0sIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlLCBtb2R1bGUuZXhwb3J0c1siZGVmYXVsdCJdID0gbW9kdWxlLmV4cG9ydHM7CiAgCSAgdmFyIHQsCiAgCSAgICBlID0ge30sCiAgCSAgICByID0gT2JqZWN0LnByb3RvdHlwZSwKICAJICAgIG4gPSByLmhhc093blByb3BlcnR5LAogIAkgICAgbyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSB8fCBmdW5jdGlvbiAodCwgZSwgcikgewogIAkgICAgICB0W2VdID0gci52YWx1ZTsKICAJICAgIH0sCiAgCSAgICBpID0gImZ1bmN0aW9uIiA9PSB0eXBlb2YgU3ltYm9sID8gU3ltYm9sIDoge30sCiAgCSAgICBhID0gaS5pdGVyYXRvciB8fCAiQEBpdGVyYXRvciIsCiAgCSAgICBjID0gaS5hc3luY0l0ZXJhdG9yIHx8ICJAQGFzeW5jSXRlcmF0b3IiLAogIAkgICAgdSA9IGkudG9TdHJpbmdUYWcgfHwgIkBAdG9TdHJpbmdUYWciOwogIAkgIGZ1bmN0aW9uIGRlZmluZSh0LCBlLCByKSB7CiAgCSAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsIGUsIHsKICAJICAgICAgdmFsdWU6IHIsCiAgCSAgICAgIGVudW1lcmFibGU6ICEwLAogIAkgICAgICBjb25maWd1cmFibGU6ICEwLAogIAkgICAgICB3cml0YWJsZTogITAKICAJICAgIH0pLCB0W2VdOwogIAkgIH0KICAJICB0cnkgewogIAkgICAgZGVmaW5lKHt9LCAiIik7CiAgCSAgfSBjYXRjaCAodCkgewogIAkgICAgZGVmaW5lID0gZnVuY3Rpb24gZGVmaW5lKHQsIGUsIHIpIHsKICAJICAgICAgcmV0dXJuIHRbZV0gPSByOwogIAkgICAgfTsKICAJICB9CiAgCSAgZnVuY3Rpb24gd3JhcCh0LCBlLCByLCBuKSB7CiAgCSAgICB2YXIgaSA9IGUgJiYgZS5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBlIDogR2VuZXJhdG9yLAogIAkgICAgICBhID0gT2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksCiAgCSAgICAgIGMgPSBuZXcgQ29udGV4dChuIHx8IFtdKTsKICAJICAgIHJldHVybiBvKGEsICJfaW52b2tlIiwgewogIAkgICAgICB2YWx1ZTogbWFrZUludm9rZU1ldGhvZCh0LCByLCBjKQogIAkgICAgfSksIGE7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIHRyeUNhdGNoKHQsIGUsIHIpIHsKICAJICAgIHRyeSB7CiAgCSAgICAgIHJldHVybiB7CiAgCSAgICAgICAgdHlwZTogIm5vcm1hbCIsCiAgCSAgICAgICAgYXJnOiB0LmNhbGwoZSwgcikKICAJICAgICAgfTsKICAJICAgIH0gY2F0Y2ggKHQpIHsKICAJICAgICAgcmV0dXJuIHsKICAJICAgICAgICB0eXBlOiAidGhyb3ciLAogIAkgICAgICAgIGFyZzogdAogIAkgICAgICB9OwogIAkgICAgfQogIAkgIH0KICAJICBlLndyYXAgPSB3cmFwOwogIAkgIHZhciBoID0gInN1c3BlbmRlZFN0YXJ0IiwKICAJICAgIGwgPSAic3VzcGVuZGVkWWllbGQiLAogIAkgICAgZiA9ICJleGVjdXRpbmciLAogIAkgICAgcyA9ICJjb21wbGV0ZWQiLAogIAkgICAgeSA9IHt9OwogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9CiAgCSAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fQogIAkgIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge30KICAJICB2YXIgcCA9IHt9OwogIAkgIGRlZmluZShwLCBhLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gdGhpczsKICAJICB9KTsKICAJICB2YXIgZCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiwKICAJICAgIHYgPSBkICYmIGQoZCh2YWx1ZXMoW10pKSk7CiAgCSAgdiAmJiB2ICE9PSByICYmIG4uY2FsbCh2LCBhKSAmJiAocCA9IHYpOwogIAkgIHZhciBnID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocCk7CiAgCSAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHQpIHsKICAJICAgIFsibmV4dCIsICJ0aHJvdyIsICJyZXR1cm4iXS5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7CiAgCSAgICAgIGRlZmluZSh0LCBlLCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UoZSwgdCk7CiAgCSAgICAgIH0pOwogIAkgICAgfSk7CiAgCSAgfQogIAkgIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IodCwgZSkgewogIAkgICAgZnVuY3Rpb24gaW52b2tlKHIsIG8sIGksIGEpIHsKICAJICAgICAgdmFyIGMgPSB0cnlDYXRjaCh0W3JdLCB0LCBvKTsKICAJICAgICAgaWYgKCJ0aHJvdyIgIT09IGMudHlwZSkgewogIAkgICAgICAgIHZhciB1ID0gYy5hcmcsCiAgCSAgICAgICAgICBoID0gdS52YWx1ZTsKICAJICAgICAgICByZXR1cm4gaCAmJiAib2JqZWN0IiA9PSBfdHlwZW9mKGgpICYmIG4uY2FsbChoLCAiX19hd2FpdCIpID8gZS5yZXNvbHZlKGguX19hd2FpdCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgaW52b2tlKCJuZXh0IiwgdCwgaSwgYSk7CiAgCSAgICAgICAgfSwgZnVuY3Rpb24gKHQpIHsKICAJICAgICAgICAgIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KSA6IGUucmVzb2x2ZShoKS50aGVuKGZ1bmN0aW9uICh0KSB7CiAgCSAgICAgICAgICB1LnZhbHVlID0gdCwgaSh1KTsKICAJICAgICAgICB9LCBmdW5jdGlvbiAodCkgewogIAkgICAgICAgICAgcmV0dXJuIGludm9rZSgidGhyb3ciLCB0LCBpLCBhKTsKICAJICAgICAgICB9KTsKICAJICAgICAgfQogIAkgICAgICBhKGMuYXJnKTsKICAJICAgIH0KICAJICAgIHZhciByOwogIAkgICAgbyh0aGlzLCAiX2ludm9rZSIsIHsKICAJICAgICAgdmFsdWU6IGZ1bmN0aW9uIHZhbHVlKHQsIG4pIHsKICAJICAgICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHsKICAJICAgICAgICAgIHJldHVybiBuZXcgZShmdW5jdGlvbiAoZSwgcikgewogIAkgICAgICAgICAgICBpbnZva2UodCwgbiwgZSwgcik7CiAgCSAgICAgICAgICB9KTsKICAJICAgICAgICB9CiAgCSAgICAgICAgcmV0dXJuIHIgPSByID8gci50aGVuKGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLCBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZykgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpOwogIAkgICAgICB9CiAgCSAgICB9KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChlLCByLCBuKSB7CiAgCSAgICB2YXIgbyA9IGg7CiAgCSAgICByZXR1cm4gZnVuY3Rpb24gKGksIGEpIHsKICAJICAgICAgaWYgKG8gPT09IGYpIHRocm93IG5ldyBFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZyIpOwogIAkgICAgICBpZiAobyA9PT0gcykgewogIAkgICAgICAgIGlmICgidGhyb3ciID09PSBpKSB0aHJvdyBhOwogIAkgICAgICAgIHJldHVybiB7CiAgCSAgICAgICAgICB2YWx1ZTogdCwKICAJICAgICAgICAgIGRvbmU6ICEwCiAgCSAgICAgICAgfTsKICAJICAgICAgfQogIAkgICAgICBmb3IgKG4ubWV0aG9kID0gaSwgbi5hcmcgPSBhOzspIHsKICAJICAgICAgICB2YXIgYyA9IG4uZGVsZWdhdGU7CiAgCSAgICAgICAgaWYgKGMpIHsKICAJICAgICAgICAgIHZhciB1ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShjLCBuKTsKICAJICAgICAgICAgIGlmICh1KSB7CiAgCSAgICAgICAgICAgIGlmICh1ID09PSB5KSBjb250aW51ZTsKICAJICAgICAgICAgICAgcmV0dXJuIHU7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICAgIGlmICgibmV4dCIgPT09IG4ubWV0aG9kKSBuLnNlbnQgPSBuLl9zZW50ID0gbi5hcmc7ZWxzZSBpZiAoInRocm93IiA9PT0gbi5tZXRob2QpIHsKICAJICAgICAgICAgIGlmIChvID09PSBoKSB0aHJvdyBvID0gcywgbi5hcmc7CiAgCSAgICAgICAgICBuLmRpc3BhdGNoRXhjZXB0aW9uKG4uYXJnKTsKICAJICAgICAgICB9IGVsc2UgInJldHVybiIgPT09IG4ubWV0aG9kICYmIG4uYWJydXB0KCJyZXR1cm4iLCBuLmFyZyk7CiAgCSAgICAgICAgbyA9IGY7CiAgCSAgICAgICAgdmFyIHAgPSB0cnlDYXRjaChlLCByLCBuKTsKICAJICAgICAgICBpZiAoIm5vcm1hbCIgPT09IHAudHlwZSkgewogIAkgICAgICAgICAgaWYgKG8gPSBuLmRvbmUgPyBzIDogbCwgcC5hcmcgPT09IHkpIGNvbnRpbnVlOwogIAkgICAgICAgICAgcmV0dXJuIHsKICAJICAgICAgICAgICAgdmFsdWU6IHAuYXJnLAogIAkgICAgICAgICAgICBkb25lOiBuLmRvbmUKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgfQogIAkgICAgICAgICJ0aHJvdyIgPT09IHAudHlwZSAmJiAobyA9IHMsIG4ubWV0aG9kID0gInRocm93Iiwgbi5hcmcgPSBwLmFyZyk7CiAgCSAgICAgIH0KICAJICAgIH07CiAgCSAgfQogIAkgIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgcikgewogIAkgICAgdmFyIG4gPSByLm1ldGhvZCwKICAJICAgICAgbyA9IGUuaXRlcmF0b3Jbbl07CiAgCSAgICBpZiAobyA9PT0gdCkgcmV0dXJuIHIuZGVsZWdhdGUgPSBudWxsLCAidGhyb3ciID09PSBuICYmIGUuaXRlcmF0b3JbInJldHVybiJdICYmIChyLm1ldGhvZCA9ICJyZXR1cm4iLCByLmFyZyA9IHQsIG1heWJlSW52b2tlRGVsZWdhdGUoZSwgciksICJ0aHJvdyIgPT09IHIubWV0aG9kKSB8fCAicmV0dXJuIiAhPT0gbiAmJiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJyIgKyBuICsgIicgbWV0aG9kIikpLCB5OwogIAkgICAgdmFyIGkgPSB0cnlDYXRjaChvLCBlLml0ZXJhdG9yLCByLmFyZyk7CiAgCSAgICBpZiAoInRocm93IiA9PT0gaS50eXBlKSByZXR1cm4gci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IGkuYXJnLCByLmRlbGVnYXRlID0gbnVsbCwgeTsKICAJICAgIHZhciBhID0gaS5hcmc7CiAgCSAgICByZXR1cm4gYSA/IGEuZG9uZSA/IChyW2UucmVzdWx0TmFtZV0gPSBhLnZhbHVlLCByLm5leHQgPSBlLm5leHRMb2MsICJyZXR1cm4iICE9PSByLm1ldGhvZCAmJiAoci5tZXRob2QgPSAibmV4dCIsIHIuYXJnID0gdCksIHIuZGVsZWdhdGUgPSBudWxsLCB5KSA6IGEgOiAoci5tZXRob2QgPSAidGhyb3ciLCByLmFyZyA9IG5ldyBUeXBlRXJyb3IoIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0IiksIHIuZGVsZWdhdGUgPSBudWxsLCB5KTsKICAJICB9CiAgCSAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gewogIAkgICAgICB0cnlMb2M6IHRbMF0KICAJICAgIH07CiAgCSAgICAxIGluIHQgJiYgKGUuY2F0Y2hMb2MgPSB0WzFdKSwgMiBpbiB0ICYmIChlLmZpbmFsbHlMb2MgPSB0WzJdLCBlLmFmdGVyTG9jID0gdFszXSksIHRoaXMudHJ5RW50cmllcy5wdXNoKGUpOwogIAkgIH0KICAJICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KHQpIHsKICAJICAgIHZhciBlID0gdC5jb21wbGV0aW9uIHx8IHt9OwogIAkgICAgZS50eXBlID0gIm5vcm1hbCIsIGRlbGV0ZSBlLmFyZywgdC5jb21wbGV0aW9uID0gZTsKICAJICB9CiAgCSAgZnVuY3Rpb24gQ29udGV4dCh0KSB7CiAgCSAgICB0aGlzLnRyeUVudHJpZXMgPSBbewogIAkgICAgICB0cnlMb2M6ICJyb290IgogIAkgICAgfV0sIHQuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpLCB0aGlzLnJlc2V0KCEwKTsKICAJICB9CiAgCSAgZnVuY3Rpb24gdmFsdWVzKGUpIHsKICAJICAgIGlmIChlIHx8ICIiID09PSBlKSB7CiAgCSAgICAgIHZhciByID0gZVthXTsKICAJICAgICAgaWYgKHIpIHJldHVybiByLmNhbGwoZSk7CiAgCSAgICAgIGlmICgiZnVuY3Rpb24iID09IHR5cGVvZiBlLm5leHQpIHJldHVybiBlOwogIAkgICAgICBpZiAoIWlzTmFOKGUubGVuZ3RoKSkgewogIAkgICAgICAgIHZhciBvID0gLTEsCiAgCSAgICAgICAgICBpID0gZnVuY3Rpb24gbmV4dCgpIHsKICAJICAgICAgICAgICAgZm9yICg7ICsrbyA8IGUubGVuZ3RoOykgaWYgKG4uY2FsbChlLCBvKSkgcmV0dXJuIG5leHQudmFsdWUgPSBlW29dLCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgICAgICAgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMCwgbmV4dDsKICAJICAgICAgICAgIH07CiAgCSAgICAgICAgcmV0dXJuIGkubmV4dCA9IGk7CiAgCSAgICAgIH0KICAJICAgIH0KICAJICAgIHRocm93IG5ldyBUeXBlRXJyb3IoX3R5cGVvZihlKSArICIgaXMgbm90IGl0ZXJhYmxlIik7CiAgCSAgfQogIAkgIHJldHVybiBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgbyhnLCAiY29uc3RydWN0b3IiLCB7CiAgCSAgICB2YWx1ZTogR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsCiAgCSAgICBjb25maWd1cmFibGU6ICEwCiAgCSAgfSksIG8oR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsICJjb25zdHJ1Y3RvciIsIHsKICAJICAgIHZhbHVlOiBHZW5lcmF0b3JGdW5jdGlvbiwKICAJICAgIGNvbmZpZ3VyYWJsZTogITAKICAJICB9KSwgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBkZWZpbmUoR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpLCBlLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAodCkgewogIAkgICAgdmFyIGUgPSAiZnVuY3Rpb24iID09IHR5cGVvZiB0ICYmIHQuY29uc3RydWN0b3I7CiAgCSAgICByZXR1cm4gISFlICYmIChlID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fCAiR2VuZXJhdG9yRnVuY3Rpb24iID09PSAoZS5kaXNwbGF5TmFtZSB8fCBlLm5hbWUpKTsKICAJICB9LCBlLm1hcmsgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZih0LCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSkgOiAodC5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSwgZGVmaW5lKHQsIHUsICJHZW5lcmF0b3JGdW5jdGlvbiIpKSwgdC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKGcpLCB0OwogIAkgIH0sIGUuYXdyYXAgPSBmdW5jdGlvbiAodCkgewogIAkgICAgcmV0dXJuIHsKICAJICAgICAgX19hd2FpdDogdAogIAkgICAgfTsKICAJICB9LCBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpLCBkZWZpbmUoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUsIGMsIGZ1bmN0aW9uICgpIHsKICAJICAgIHJldHVybiB0aGlzOwogIAkgIH0pLCBlLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLCBlLmFzeW5jID0gZnVuY3Rpb24gKHQsIHIsIG4sIG8sIGkpIHsKICAJICAgIHZvaWQgMCA9PT0gaSAmJiAoaSA9IFByb21pc2UpOwogIAkgICAgdmFyIGEgPSBuZXcgQXN5bmNJdGVyYXRvcih3cmFwKHQsIHIsIG4sIG8pLCBpKTsKICAJICAgIHJldHVybiBlLmlzR2VuZXJhdG9yRnVuY3Rpb24ocikgPyBhIDogYS5uZXh0KCkudGhlbihmdW5jdGlvbiAodCkgewogIAkgICAgICByZXR1cm4gdC5kb25lID8gdC52YWx1ZSA6IGEubmV4dCgpOwogIAkgICAgfSk7CiAgCSAgfSwgZGVmaW5lSXRlcmF0b3JNZXRob2RzKGcpLCBkZWZpbmUoZywgdSwgIkdlbmVyYXRvciIpLCBkZWZpbmUoZywgYSwgZnVuY3Rpb24gKCkgewogIAkgICAgcmV0dXJuIHRoaXM7CiAgCSAgfSksIGRlZmluZShnLCAidG9TdHJpbmciLCBmdW5jdGlvbiAoKSB7CiAgCSAgICByZXR1cm4gIltvYmplY3QgR2VuZXJhdG9yXSI7CiAgCSAgfSksIGUua2V5cyA9IGZ1bmN0aW9uICh0KSB7CiAgCSAgICB2YXIgZSA9IE9iamVjdCh0KSwKICAJICAgICAgciA9IFtdOwogIAkgICAgZm9yICh2YXIgbiBpbiBlKSByLnB1c2gobik7CiAgCSAgICByZXR1cm4gci5yZXZlcnNlKCksIGZ1bmN0aW9uIG5leHQoKSB7CiAgCSAgICAgIGZvciAoOyByLmxlbmd0aDspIHsKICAJICAgICAgICB2YXIgdCA9IHIucG9wKCk7CiAgCSAgICAgICAgaWYgKHQgaW4gZSkgcmV0dXJuIG5leHQudmFsdWUgPSB0LCBuZXh0LmRvbmUgPSAhMSwgbmV4dDsKICAJICAgICAgfQogIAkgICAgICByZXR1cm4gbmV4dC5kb25lID0gITAsIG5leHQ7CiAgCSAgICB9OwogIAkgIH0sIGUudmFsdWVzID0gdmFsdWVzLCBDb250ZXh0LnByb3RvdHlwZSA9IHsKICAJICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LAogIAkgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KGUpIHsKICAJICAgICAgaWYgKHRoaXMucHJldiA9IDAsIHRoaXMubmV4dCA9IDAsIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB0LCB0aGlzLmRvbmUgPSAhMSwgdGhpcy5kZWxlZ2F0ZSA9IG51bGwsIHRoaXMubWV0aG9kID0gIm5leHQiLCB0aGlzLmFyZyA9IHQsIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpLCAhZSkgZm9yICh2YXIgciBpbiB0aGlzKSAidCIgPT09IHIuY2hhckF0KDApICYmIG4uY2FsbCh0aGlzLCByKSAmJiAhaXNOYU4oK3Iuc2xpY2UoMSkpICYmICh0aGlzW3JdID0gdCk7CiAgCSAgICB9LAogIAkgICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHsKICAJICAgICAgdGhpcy5kb25lID0gITA7CiAgCSAgICAgIHZhciB0ID0gdGhpcy50cnlFbnRyaWVzWzBdLmNvbXBsZXRpb247CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gdGhpcy5ydmFsOwogIAkgICAgfSwKICAJICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbiBkaXNwYXRjaEV4Y2VwdGlvbihlKSB7CiAgCSAgICAgIGlmICh0aGlzLmRvbmUpIHRocm93IGU7CiAgCSAgICAgIHZhciByID0gdGhpczsKICAJICAgICAgZnVuY3Rpb24gaGFuZGxlKG4sIG8pIHsKICAJICAgICAgICByZXR1cm4gYS50eXBlID0gInRocm93IiwgYS5hcmcgPSBlLCByLm5leHQgPSBuLCBvICYmIChyLm1ldGhvZCA9ICJuZXh0Iiwgci5hcmcgPSB0KSwgISFvOwogIAkgICAgICB9CiAgCSAgICAgIGZvciAodmFyIG8gPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgbyA+PSAwOyAtLW8pIHsKICAJICAgICAgICB2YXIgaSA9IHRoaXMudHJ5RW50cmllc1tvXSwKICAJICAgICAgICAgIGEgPSBpLmNvbXBsZXRpb247CiAgCSAgICAgICAgaWYgKCJyb290IiA9PT0gaS50cnlMb2MpIHJldHVybiBoYW5kbGUoImVuZCIpOwogIAkgICAgICAgIGlmIChpLnRyeUxvYyA8PSB0aGlzLnByZXYpIHsKICAJICAgICAgICAgIHZhciBjID0gbi5jYWxsKGksICJjYXRjaExvYyIpLAogIAkgICAgICAgICAgICB1ID0gbi5jYWxsKGksICJmaW5hbGx5TG9jIik7CiAgCSAgICAgICAgICBpZiAoYyAmJiB1KSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGkuZmluYWxseUxvYykgcmV0dXJuIGhhbmRsZShpLmZpbmFsbHlMb2MpOwogIAkgICAgICAgICAgfSBlbHNlIGlmIChjKSB7CiAgCSAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBpLmNhdGNoTG9jKSByZXR1cm4gaGFuZGxlKGkuY2F0Y2hMb2MsICEwKTsKICAJICAgICAgICAgIH0gZWxzZSB7CiAgCSAgICAgICAgICAgIGlmICghdSkgdGhyb3cgbmV3IEVycm9yKCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseSIpOwogIAkgICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgaS5maW5hbGx5TG9jKSByZXR1cm4gaGFuZGxlKGkuZmluYWxseUxvYyk7CiAgCSAgICAgICAgICB9CiAgCSAgICAgICAgfQogIAkgICAgICB9CiAgCSAgICB9LAogIAkgICAgYWJydXB0OiBmdW5jdGlvbiBhYnJ1cHQodCwgZSkgewogIAkgICAgICBmb3IgKHZhciByID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IHIgPj0gMDsgLS1yKSB7CiAgCSAgICAgICAgdmFyIG8gPSB0aGlzLnRyeUVudHJpZXNbcl07CiAgCSAgICAgICAgaWYgKG8udHJ5TG9jIDw9IHRoaXMucHJldiAmJiBuLmNhbGwobywgImZpbmFsbHlMb2MiKSAmJiB0aGlzLnByZXYgPCBvLmZpbmFsbHlMb2MpIHsKICAJICAgICAgICAgIHZhciBpID0gbzsKICAJICAgICAgICAgIGJyZWFrOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICBpICYmICgiYnJlYWsiID09PSB0IHx8ICJjb250aW51ZSIgPT09IHQpICYmIGkudHJ5TG9jIDw9IGUgJiYgZSA8PSBpLmZpbmFsbHlMb2MgJiYgKGkgPSBudWxsKTsKICAJICAgICAgdmFyIGEgPSBpID8gaS5jb21wbGV0aW9uIDoge307CiAgCSAgICAgIHJldHVybiBhLnR5cGUgPSB0LCBhLmFyZyA9IGUsIGkgPyAodGhpcy5tZXRob2QgPSAibmV4dCIsIHRoaXMubmV4dCA9IGkuZmluYWxseUxvYywgeSkgOiB0aGlzLmNvbXBsZXRlKGEpOwogIAkgICAgfSwKICAJICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSh0LCBlKSB7CiAgCSAgICAgIGlmICgidGhyb3ciID09PSB0LnR5cGUpIHRocm93IHQuYXJnOwogIAkgICAgICByZXR1cm4gImJyZWFrIiA9PT0gdC50eXBlIHx8ICJjb250aW51ZSIgPT09IHQudHlwZSA/IHRoaXMubmV4dCA9IHQuYXJnIDogInJldHVybiIgPT09IHQudHlwZSA/ICh0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHQuYXJnLCB0aGlzLm1ldGhvZCA9ICJyZXR1cm4iLCB0aGlzLm5leHQgPSAiZW5kIikgOiAibm9ybWFsIiA9PT0gdC50eXBlICYmIGUgJiYgKHRoaXMubmV4dCA9IGUpLCB5OwogIAkgICAgfSwKICAJICAgIGZpbmlzaDogZnVuY3Rpb24gZmluaXNoKHQpIHsKICAJICAgICAgZm9yICh2YXIgZSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBlID49IDA7IC0tZSkgewogIAkgICAgICAgIHZhciByID0gdGhpcy50cnlFbnRyaWVzW2VdOwogIAkgICAgICAgIGlmIChyLmZpbmFsbHlMb2MgPT09IHQpIHJldHVybiB0aGlzLmNvbXBsZXRlKHIuY29tcGxldGlvbiwgci5hZnRlckxvYyksIHJlc2V0VHJ5RW50cnkociksIHk7CiAgCSAgICAgIH0KICAJICAgIH0sCiAgCSAgICAiY2F0Y2giOiBmdW5jdGlvbiBfY2F0Y2godCkgewogIAkgICAgICBmb3IgKHZhciBlID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGUgPj0gMDsgLS1lKSB7CiAgCSAgICAgICAgdmFyIHIgPSB0aGlzLnRyeUVudHJpZXNbZV07CiAgCSAgICAgICAgaWYgKHIudHJ5TG9jID09PSB0KSB7CiAgCSAgICAgICAgICB2YXIgbiA9IHIuY29tcGxldGlvbjsKICAJICAgICAgICAgIGlmICgidGhyb3ciID09PSBuLnR5cGUpIHsKICAJICAgICAgICAgICAgdmFyIG8gPSBuLmFyZzsKICAJICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShyKTsKICAJICAgICAgICAgIH0KICAJICAgICAgICAgIHJldHVybiBvOwogIAkgICAgICAgIH0KICAJICAgICAgfQogIAkgICAgICB0aHJvdyBuZXcgRXJyb3IoImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdCIpOwogIAkgICAgfSwKICAJICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uIGRlbGVnYXRlWWllbGQoZSwgciwgbikgewogIAkgICAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZSA9IHsKICAJICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGUpLAogIAkgICAgICAgIHJlc3VsdE5hbWU6IHIsCiAgCSAgICAgICAgbmV4dExvYzogbgogIAkgICAgICB9LCAibmV4dCIgPT09IHRoaXMubWV0aG9kICYmICh0aGlzLmFyZyA9IHQpLCB5OwogIAkgICAgfQogIAkgIH0sIGU7CiAgCX0KICAJbW9kdWxlLmV4cG9ydHMgPSBfcmVnZW5lcmF0b3JSdW50aW1lLCBtb2R1bGUuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZSwgbW9kdWxlLmV4cG9ydHNbImRlZmF1bHQiXSA9IG1vZHVsZS5leHBvcnRzOyAKICB9IChyZWdlbmVyYXRvclJ1bnRpbWUkMSkpOwoKICB2YXIgcmVnZW5lcmF0b3JSdW50aW1lRXhwb3J0cyA9IHJlZ2VuZXJhdG9yUnVudGltZSQxLmV4cG9ydHM7CgogIC8vIFRPRE8oQmFiZWwgOCk6IFJlbW92ZSB0aGlzIGZpbGUuCgogIHZhciBydW50aW1lID0gcmVnZW5lcmF0b3JSdW50aW1lRXhwb3J0cygpOwogIHZhciByZWdlbmVyYXRvciA9IHJ1bnRpbWU7CgogIC8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9ibG9iL21haW4vcGFja2FnZXMvcnVudGltZS9ydW50aW1lLmpzI0w3MzY9CiAgdHJ5IHsKICAgIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7CiAgfSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHsKICAgIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gIm9iamVjdCIpIHsKICAgICAgZ2xvYmFsVGhpcy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lOwogICAgfSBlbHNlIHsKICAgICAgRnVuY3Rpb24oInIiLCAicmVnZW5lcmF0b3JSdW50aW1lID0gciIpKHJ1bnRpbWUpOwogICAgfQogIH0KCiAgdmFyIF9yZWdlbmVyYXRvclJ1bnRpbWUgPSAvKkBfX1BVUkVfXyovZ2V0RGVmYXVsdEV4cG9ydEZyb21DanMocmVnZW5lcmF0b3IpOwoKICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqDQogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogIFBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueQ0KICBwdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuDQoNCiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZDQogIEFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCwNCiAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SDQogIE9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1INCiAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi8NCg0KICBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7DQogICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgew0KICAgICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH0NCiAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH0NCiAgICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7DQogICAgICB9KTsNCiAgfQoKICBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgewogICAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7CiAgICAgIG8uX19wcm90b19fID0gcDsKICAgICAgcmV0dXJuIG87CiAgICB9OwogICAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsKICB9CgogIGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgewogICAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAiZnVuY3Rpb24iICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsKICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24iKTsKICAgIH0KICAgIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgewogICAgICBjb25zdHJ1Y3RvcjogewogICAgICAgIHZhbHVlOiBzdWJDbGFzcywKICAgICAgICB3cml0YWJsZTogdHJ1ZSwKICAgICAgICBjb25maWd1cmFibGU6IHRydWUKICAgICAgfQogICAgfSk7CiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3ViQ2xhc3MsICJwcm90b3R5cGUiLCB7CiAgICAgIHdyaXRhYmxlOiBmYWxzZQogICAgfSk7CiAgICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsKICB9CgogIGZ1bmN0aW9uIF90eXBlb2YobykgewogICAgIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mIjsKCiAgICByZXR1cm4gX3R5cGVvZiA9ICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiAic3ltYm9sIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG8pIHsKICAgICAgcmV0dXJuIHR5cGVvZiBvOwogICAgfSA6IGZ1bmN0aW9uIChvKSB7CiAgICAgIHJldHVybiBvICYmICJmdW5jdGlvbiIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgbyAhPT0gU3ltYm9sLnByb3RvdHlwZSA/ICJzeW1ib2wiIDogdHlwZW9mIG87CiAgICB9LCBfdHlwZW9mKG8pOwogIH0KCiAgZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7CiAgICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7CiAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcigidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkIik7CiAgICB9CiAgICByZXR1cm4gc2VsZjsKICB9CgogIGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsKICAgIGlmIChjYWxsICYmIChfdHlwZW9mKGNhbGwpID09PSAib2JqZWN0IiB8fCB0eXBlb2YgY2FsbCA9PT0gImZ1bmN0aW9uIikpIHsKICAgICAgcmV0dXJuIGNhbGw7CiAgICB9IGVsc2UgaWYgKGNhbGwgIT09IHZvaWQgMCkgewogICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCJEZXJpdmVkIGNvbnN0cnVjdG9ycyBtYXkgb25seSByZXR1cm4gb2JqZWN0IG9yIHVuZGVmaW5lZCIpOwogICAgfQogICAgcmV0dXJuIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7CiAgfQoKICBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2YobykgewogICAgX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7CiAgICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7CiAgICB9OwogICAgcmV0dXJuIF9nZXRQcm90b3R5cGVPZihvKTsKICB9CgogIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayQxKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgewogICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsKICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uIik7CiAgICB9CiAgfQoKICBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHsKICAgIGlmIChfdHlwZW9mKGlucHV0KSAhPT0gIm9iamVjdCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDsKICAgIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTsKICAgIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHsKICAgICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCAiZGVmYXVsdCIpOwogICAgICBpZiAoX3R5cGVvZihyZXMpICE9PSAib2JqZWN0IikgcmV0dXJuIHJlczsKICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS4iKTsKICAgIH0KICAgIHJldHVybiAoaGludCA9PT0gInN0cmluZyIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTsKICB9CgogIGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykgewogICAgdmFyIGtleSA9IF90b1ByaW1pdGl2ZShhcmcsICJzdHJpbmciKTsKICAgIHJldHVybiBfdHlwZW9mKGtleSkgPT09ICJzeW1ib2wiID8ga2V5IDogU3RyaW5nKGtleSk7CiAgfQoKICBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyQxKHRhcmdldCwgcHJvcHMpIHsKICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsKICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsKICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOwogICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7CiAgICAgIGlmICgidmFsdWUiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOwogICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpOwogICAgfQogIH0KICBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MkMShDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsKICAgIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyQxKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7CiAgICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzJDEoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsKICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgInByb3RvdHlwZSIsIHsKICAgICAgd3JpdGFibGU6IGZhbHNlCiAgICB9KTsKICAgIHJldHVybiBDb25zdHJ1Y3RvcjsKICB9CgogIC8qDQogICAgQ29weXJpZ2h0IDIwMjItMjAyMyBQaWNvdm9pY2UgSW5jLg0KCiAgICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIGxpY2Vuc2UuIEEgY29weSBvZiB0aGUgbGljZW5zZSBpcyBsb2NhdGVkIGluIHRoZSAiTElDRU5TRSINCiAgICBmaWxlIGFjY29tcGFueWluZyB0aGlzIHNvdXJjZS4NCgogICAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbg0KICAgIGFuICJBUyBJUyIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZQ0KICAgIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuDQogICovCiAgLyoqDQogICAqIEJhc2VQdkZpbGUgQ2xhc3MNCiAgICogVGhpcyBjbGFzcyBtb2NrcyB0aGUgZmlsZSBzeXN0ZW0gdXNpbmcgaW4tbWVtb3J5IHN0b3JhZ2UuDQogICAqLwogIHZhciBQdkZpbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgZnVuY3Rpb24gUHZGaWxlKCkgewogICAgICBfY2xhc3NDYWxsQ2hlY2skMSh0aGlzLCBQdkZpbGUpOwogICAgICB0aGlzLl9wYXRoID0gJyc7CiAgICB9CiAgICAvKioNCiAgICAgKiBHZXR0ZXIgZm9yIGZpbGUncyBtZXRhIGluZm9ybWF0aW9uLg0KICAgICAqLwogICAgX2NyZWF0ZUNsYXNzJDEoUHZGaWxlLCBbewogICAgICBrZXk6ICJtZXRhIiwKICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7CiAgICAgICAgaWYgKHRoaXMuX21ldGEgPT09IHVuZGVmaW5lZCkgewogICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oewogICAgICAgICAgdmVyc2lvbjogMAogICAgICAgIH0sIHRoaXMuX21ldGEpOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogInBhZ2VTaXplIiwKICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7CiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsKICAgICAgfQogICAgICAvKioNCiAgICAgICAqIEdldCB0aGUgZmlsZSBwb2ludGVyIGZyb20gdGhlIF9maWxlUHRycyBtYXAuDQogICAgICAgKiBAcGFyYW0gcHRyIFRoZSBwb2ludGVyIHRvIEJhc2VQdkZpbGUgaW5zdGFuY2UgdG8gZ2V0IGZyb20gdGhlIG1hcC4NCiAgICAgICAqIEByZXR1cm5zIEJhc2VQdkZpbGUgcmV0dXJucyB0aGUgY3VycmVudCBmaWxlIGluc3RhbmNlIHJlbGF0ZWQgdG8gcHRyLg0KICAgICAgICovCiAgICB9XSwgW3sKICAgICAga2V5OiAiZ2V0UHRyIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFB0cihwdHIpIHsKICAgICAgICBpZiAoUHZGaWxlLl9maWxlUHRycy5oYXMocHRyKSkgewogICAgICAgICAgcmV0dXJuIFB2RmlsZS5fZmlsZVB0cnMuZ2V0KHB0cik7CiAgICAgICAgfQogICAgICAgIHRocm93IG5ldyBFcnJvcignRmlsZSBpbnN0YW5jZSBub3QgZm91bmQuJyk7CiAgICAgIH0KICAgICAgLyoqDQogICAgICAgKiBTYXZlcyB0aGUgQmFzZVB2RmlsZSBpbnN0YW5jZSB0byB0aGUgbWFwIHdpdGggYW4gYXNzb2NpYXRlZCBwdHIuDQogICAgICAgKiBAcGFyYW0gcHRyIFRoZSBmaWxlIHBvaW50ZXIgdG8gc2F2ZSBhcyB0aGUga2V5Lg0KICAgICAgICogQHBhcmFtIGluc3RhbmNlIFRoZSBCYXNlUHZGaWxlIGluc3RhbmNlIHRvIHNhdmUgYXMgdGhlIHZhbHVlLg0KICAgICAgICovCiAgICB9LCB7CiAgICAgIGtleTogInNldFB0ciIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRQdHIocHRyLCBpbnN0YW5jZSkgewogICAgICAgIFB2RmlsZS5fZmlsZVB0cnMuc2V0KHB0ciwgaW5zdGFuY2UpOwogICAgICB9CiAgICAgIC8qKg0KICAgICAgICogUmVtb3ZlcyB0aGUgcHRyIGZyb20gdGhlIF9maWxlUHRycyBtYXAuDQogICAgICAgKiBAcGFyYW0gcHRyIFRoZSBmaWxlIHBvaW50ZXIgdG8gcmVtb3ZlLg0KICAgICAgICovCiAgICB9LCB7CiAgICAgIGtleTogInJlbW92ZVB0ciIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVQdHIocHRyKSB7CiAgICAgICAgUHZGaWxlLl9maWxlUHRyc1siZGVsZXRlIl0ocHRyKTsKICAgICAgfQogICAgfV0pOwogICAgcmV0dXJuIFB2RmlsZTsKICB9KCk7CiAgUHZGaWxlLl9maWxlUHRycyA9IG5ldyBNYXAoKTsKCiAgZnVuY3Rpb24gX2NyZWF0ZVN1cGVyKERlcml2ZWQpIHsgdmFyIGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QgPSBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCk7IHJldHVybiBmdW5jdGlvbiBfY3JlYXRlU3VwZXJJbnRlcm5hbCgpIHsgdmFyIFN1cGVyID0gX2dldFByb3RvdHlwZU9mKERlcml2ZWQpLCByZXN1bHQ7IGlmIChoYXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KSB7IHZhciBOZXdUYXJnZXQgPSBfZ2V0UHJvdG90eXBlT2YodGhpcykuY29uc3RydWN0b3I7IHJlc3VsdCA9IFJlZmxlY3QuY29uc3RydWN0KFN1cGVyLCBhcmd1bWVudHMsIE5ld1RhcmdldCk7IH0gZWxzZSB7IHJlc3VsdCA9IFN1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH0gcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIHJlc3VsdCk7IH07IH0KICBmdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09ICJ1bmRlZmluZWQiIHx8ICFSZWZsZWN0LmNvbnN0cnVjdCkgcmV0dXJuIGZhbHNlOyBpZiAoUmVmbGVjdC5jb25zdHJ1Y3Quc2hhbSkgcmV0dXJuIGZhbHNlOyBpZiAodHlwZW9mIFByb3h5ID09PSAiZnVuY3Rpb24iKSByZXR1cm4gdHJ1ZTsgdHJ5IHsgQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZi5jYWxsKFJlZmxlY3QuY29uc3RydWN0KEJvb2xlYW4sIFtdLCBmdW5jdGlvbiAoKSB7fSkpOyByZXR1cm4gdHJ1ZTsgfSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH0gfQogIC8qKg0KICAgKiBQdkZpbGVNZW0gQ2xhc3MNCiAgICogVGhpcyBjbGFzcyBtb2NrcyB0aGUgZmlsZSBzeXN0ZW0gdXNpbmcgaW4tbWVtb3J5IHN0b3JhZ2UuDQogICAqLwogIHZhciBQdkZpbGVNZW0gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9QdkZpbGUpIHsKICAgIF9pbmhlcml0cyhQdkZpbGVNZW0sIF9QdkZpbGUpOwogICAgdmFyIF9zdXBlciA9IF9jcmVhdGVTdXBlcihQdkZpbGVNZW0pOwogICAgZnVuY3Rpb24gUHZGaWxlTWVtKHBhdGgsIG1ldGEsIGRiLCBtb2RlKSB7CiAgICAgIHZhciBfdGhpczsKICAgICAgX2NsYXNzQ2FsbENoZWNrJDEodGhpcywgUHZGaWxlTWVtKTsKICAgICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTsKICAgICAgX3RoaXMuX3BvcyA9IDA7CiAgICAgIF90aGlzLl9wYXRoID0gcGF0aDsKICAgICAgX3RoaXMuX21ldGEgPSBtZXRhOwogICAgICBfdGhpcy5fbW9kZSA9IG1vZGU7CiAgICAgIHJldHVybiBfdGhpczsKICAgIH0KICAgIF9jcmVhdGVDbGFzcyQxKFB2RmlsZU1lbSwgW3sKICAgICAga2V5OiAiY2xvc2UiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gY2xvc2UoKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogInJlYWQiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZChzaXplLCBjb3VudCkgewogICAgICAgIGlmICghdGhpcy5leGlzdHMoKSkgewogICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCInIi5jb25jYXQodGhpcy5fcGF0aCwgIicgZG9lc24ndCBleGlzdC4iKSk7CiAgICAgICAgfQogICAgICAgIGlmICh0aGlzLl9pc0VPRikgewogICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigiRU9GIik7CiAgICAgICAgICBlcnIubmFtZSA9ICJFbmRPZkZpbGUiOwogICAgICAgICAgdGhyb3cgZXJyOwogICAgICAgIH0KICAgICAgICB2YXIgdG9Db3B5ID0gTWF0aC5taW4oc2l6ZSAqIGNvdW50LCB0aGlzLl9maWxlLmxlbmd0aCAtIHRoaXMuX3Bvcyk7CiAgICAgICAgdmFyIHRvdGFsRWxlbXMgPSB0b0NvcHkgLSB0b0NvcHkgJSBzaXplOwogICAgICAgIHZhciBidWZmZXIgPSBuZXcgVWludDhBcnJheSh0b3RhbEVsZW1zKTsKICAgICAgICBidWZmZXIuc2V0KHRoaXMuX2ZpbGUuc2xpY2UodGhpcy5fcG9zLCB0aGlzLl9wb3MgKyB0b3RhbEVsZW1zKSwgMCk7CiAgICAgICAgdGhpcy5fcG9zICs9IHRvdGFsRWxlbXM7CiAgICAgICAgcmV0dXJuIGJ1ZmZlcjsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJ3cml0ZSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiB3cml0ZShjb250ZW50KSB7CiAgICAgICAgdmFyIG5ld0ZpbGUgPSBuZXcgVWludDhBcnJheSh0aGlzLl9wb3MgKyBjb250ZW50Lmxlbmd0aCk7CiAgICAgICAgaWYgKHRoaXMuX2ZpbGUgIT09IHVuZGVmaW5lZCkgewogICAgICAgICAgbmV3RmlsZS5zZXQodGhpcy5fZmlsZS5zbGljZSgwLCB0aGlzLl9wb3MpKTsKICAgICAgICAgIG5ld0ZpbGUuc2V0KGNvbnRlbnQsIHRoaXMuX3Bvcyk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgIG5ld0ZpbGUuc2V0KGNvbnRlbnQpOwogICAgICAgIH0KICAgICAgICB0aGlzLl9maWxlID0gbmV3RmlsZTsKICAgICAgICB0aGlzLl9wb3MgKz0gY29udGVudC5sZW5ndGg7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAic2VlayIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWVrKG9mZnNldCwgd2hlbmNlKSB7CiAgICAgICAgaWYgKCF0aGlzLmV4aXN0cygpICYmIHRoaXMuX21vZGUgPT09ICJyZWFkb25seSIpIHsKICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiJyIuY29uY2F0KHRoaXMuX3BhdGgsICInIGRvZXNuJ3QgZXhpc3QuIikpOwogICAgICAgIH0KICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKCkpIHsKICAgICAgICAgIC8vIFRoaXMgaXMgdmFsaWQgaW4gSVNPIEMgYnV0IG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBjdXJyZW50IGltcGxlbWVudGF0aW9uCiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoIiciLmNvbmNhdCh0aGlzLl9wYXRoLCAiJyBkb2Vzbid0IGV4aXN0LiIpKTsKICAgICAgICB9CiAgICAgICAgaWYgKG9mZnNldCA8IDApIHsKICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoIkVPRiIpOwogICAgICAgICAgZXJyLm5hbWUgPSAiRW5kT2ZGaWxlIjsKICAgICAgICAgIHRocm93IGVycjsKICAgICAgICB9CiAgICAgICAgdmFyIG5ld09mZnNldDsKICAgICAgICBpZiAod2hlbmNlID09PSAwKSB7CiAgICAgICAgICBuZXdPZmZzZXQgPSBNYXRoLm1pbihvZmZzZXQsIHRoaXMuX2ZpbGUubGVuZ3RoKTsKICAgICAgICB9IGVsc2UgaWYgKHdoZW5jZSA9PT0gMSkgewogICAgICAgICAgbmV3T2Zmc2V0ID0gTWF0aC5taW4odGhpcy5fcG9zICsgb2Zmc2V0LCB0aGlzLl9maWxlLmxlbmd0aCk7CiAgICAgICAgfSBlbHNlIGlmICh3aGVuY2UgPT09IDIpIHsKICAgICAgICAgIG5ld09mZnNldCA9IE1hdGgubWluKHRoaXMuX2ZpbGUubGVuZ3RoICsgb2Zmc2V0LCB0aGlzLl9maWxlLmxlbmd0aCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgIHRocm93IG5ldyBFcnJvcigiSW52YWxpZCBvcGVyYXRpb246ICIuY29uY2F0KHdoZW5jZSwgIi4iKSk7CiAgICAgICAgfQogICAgICAgIHRoaXMuX3BvcyA9IG5ld09mZnNldDsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJ0ZWxsIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRlbGwoKSB7CiAgICAgICAgaWYgKCF0aGlzLmV4aXN0cygpKSB7CiAgICAgICAgICByZXR1cm4gLTE7CiAgICAgICAgfQogICAgICAgIHJldHVybiB0aGlzLl9wb3M7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAicmVtb3ZlIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZSgpIHsKICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCAvKiNfX1BVUkVfXyovX3JlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUoKSB7CiAgICAgICAgICByZXR1cm4gX3JlZ2VuZXJhdG9yUnVudGltZS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7CiAgICAgICAgICAgIHdoaWxlICgxKSBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7CiAgICAgICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhpc3RzKCkpIHsKICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDI7CiAgICAgICAgICAgICAgICAgIGJyZWFrOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCJFTk9FTlQiKTsKICAgICAgICAgICAgICBjYXNlIDI6CiAgICAgICAgICAgICAgICBQdkZpbGVNZW0uX21lbUZpbGVzWyJkZWxldGUiXSh0aGlzLl9wYXRoKTsKICAgICAgICAgICAgICAgIHRoaXMuX3BvcyA9IDA7CiAgICAgICAgICAgICAgY2FzZSA0OgogICAgICAgICAgICAgIGNhc2UgImVuZCI6CiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpOwogICAgICAgICAgICB9CiAgICAgICAgICB9LCBfY2FsbGVlLCB0aGlzKTsKICAgICAgICB9KSk7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiZXhpc3RzIiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIGV4aXN0cygpIHsKICAgICAgICByZXR1cm4gdGhpcy5fZmlsZSAhPT0gdW5kZWZpbmVkOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogIl9pc0VPRiIsCiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkgewogICAgICAgIHJldHVybiB0aGlzLl9wb3MgPj0gdGhpcy5fZmlsZS5sZW5ndGg7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiX2ZpbGUiLAogICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHsKICAgICAgICByZXR1cm4gUHZGaWxlTWVtLl9tZW1GaWxlcy5nZXQodGhpcy5fcGF0aCk7CiAgICAgIH0sCiAgICAgIHNldDogZnVuY3Rpb24gc2V0KGNvbnRlbnQpIHsKICAgICAgICBQdkZpbGVNZW0uX21lbUZpbGVzLnNldCh0aGlzLl9wYXRoLCBjb250ZW50KTsKICAgICAgfQogICAgfV0sIFt7CiAgICAgIGtleTogIm9wZW4iLAogICAgICB2YWx1ZTogZnVuY3Rpb24gb3BlbihwYXRoLCBtb2RlKSB7CiAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uX21lbUZpbGVzLmdldChwYXRoKTsKICAgICAgICB2YXIgZGJNb2RlID0gbW9kZS5pbmNsdWRlcygncicpID8gInJlYWRvbmx5IiA6ICJyZWFkd3JpdGUiOwogICAgICAgIGlmIChmaWxlID09PSB1bmRlZmluZWQgJiYgZGJNb2RlID09PSAicmVhZG9ubHkiKSB7CiAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoIiciLmNvbmNhdChwYXRoLCAiJyBkb2Vzbid0IGV4aXN0LiIpKTsKICAgICAgICAgIGVycm9yLm5hbWUgPSAiRmlsZU5vdEV4aXN0cyI7CiAgICAgICAgICB0aHJvdyBlcnJvcjsKICAgICAgICB9CiAgICAgICAgdmFyIGZpbGVNZW0gPSBuZXcgUHZGaWxlTWVtKHBhdGgsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBkYk1vZGUpOwogICAgICAgIGlmIChtb2RlLmluY2x1ZGVzKCdhJykpIHsKICAgICAgICAgIGZpbGVNZW0uc2VlaygwLCAyKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGZpbGVNZW07CiAgICAgIH0KICAgIH1dKTsKICAgIHJldHVybiBQdkZpbGVNZW07CiAgfShQdkZpbGUpOwogIFB2RmlsZU1lbS5fbWVtRmlsZXMgPSBuZXcgTWFwKCk7CiAgLyoqDQogICAqIENhc3QgYSBzaWduZWQgYWRkcmVzcyB0byB1bnNpZ25lZCBhZGRyZXNzLg0KICAgKg0KICAgKiBAcGFyYW0gYWRkcmVzcyBUaGUgYWRkcmVzcyB0byBjYXN0IHRvIHVuc2lnbmVkIGFkZHJlc3MuDQogICAqLwogIGZ1bmN0aW9uIHVuc2lnbmVkQWRkcmVzcyhhZGRyZXNzKSB7CiAgICBpZiAoYWRkcmVzcyA8IDApIHsKICAgICAgcmV0dXJuIGFkZHJlc3MgPj4+IDA7CiAgICB9CiAgICByZXR1cm4gYWRkcmVzczsKICB9CgogIHZhciBQdlhwdUFjdGlvbjsKICAoZnVuY3Rpb24gKFB2WHB1QWN0aW9uKSB7CiAgICBQdlhwdUFjdGlvbltQdlhwdUFjdGlvblsiSU5JVCJdID0gMF0gPSAiSU5JVCI7CiAgICBQdlhwdUFjdGlvbltQdlhwdUFjdGlvblsiQUxMT0MiXSA9IDFdID0gIkFMTE9DIjsKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJGUkVFIl0gPSAyXSA9ICJGUkVFIjsKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJDT1BZX1RPX1hQVSJdID0gM10gPSAiQ09QWV9UT19YUFUiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIkNPUFlfRlJPTV9YUFUiXSA9IDRdID0gIkNPUFlfRlJPTV9YUFUiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIk1FTVNFVCJdID0gNV0gPSAiTUVNU0VUIjsKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJUSU1FUl9TVEFSVCJdID0gNl0gPSAiVElNRVJfU1RBUlQiOwogICAgUHZYcHVBY3Rpb25bUHZYcHVBY3Rpb25bIlRJTUVSX1NUT1AiXSA9IDddID0gIlRJTUVSX1NUT1AiOwogICAgLy8gb3RoZXIgeHB1IGFjdGlvbnMKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJNQVRSSVhfVkVDVE9SX01VTFRJUExZIl0gPSA4XSA9ICJNQVRSSVhfVkVDVE9SX01VTFRJUExZIjsKICAgIFB2WHB1QWN0aW9uW1B2WHB1QWN0aW9uWyJTWU5DX1ZFQ1RPUiJdID0gOV0gPSAiU1lOQ19WRUNUT1IiOwogIH0pKFB2WHB1QWN0aW9uIHx8IChQdlhwdUFjdGlvbiA9IHt9KSk7CgogIGNvbnN0IHdhc2lfc25hcHNob3RfcHJldmlldzFfZW11bGF0b3IgPSB7CiAgICBhcmdzX2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGFyZ3Nfc2l6ZXNfZ2V0OiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZW52aXJvbl9nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBlbnZpcm9uX3NpemVzX2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGNsb2NrX3Jlc19nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBjbG9ja190aW1lX2dldDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2FkdmlzZTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2FsbG9jYXRlOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfY2xvc2U6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9kYXRhc3luYzogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2Zkc3RhdF9nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9mZHN0YXRfc2V0X2ZsYWdzOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfZmRzdGF0X3NldF9yaWdodHM6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9maWxlc3RhdF9nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9maWxlc3RhdF9zZXRfc2l6ZTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX2ZpbGVzdGF0X3NldF90aW1lczogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3ByZWFkOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcHJlc3RhdF9nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9wcmVzdGF0X2Rpcl9uYW1lOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcHdyaXRlOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfcmVhZDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3JlYWRkaXI6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9yZW51bWJlcjogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3NlZWs6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBmZF9zeW5jOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgZmRfdGVsbDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIGZkX3dyaXRlOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9jcmVhdGVfZGlyZWN0b3J5OiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogICAgcGF0aF9maWxlc3RhdF9nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX2ZpbGVzdGF0X3NldF90aW1lczogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfbGluazogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfb3BlbjogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfcmVhZGxpbms6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX3JlbW92ZV9kaXJlY3Rvcnk6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwYXRoX3JlbmFtZTogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfc3ltbGluazogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHBhdGhfdW5saW5rX2ZpbGU6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBwb2xsX29uZW9mZjogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHByb2NfZXhpdDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHByb2NfcmFpc2U6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzY2hlZF95aWVsZDogKGlucHV0KSA9PiB7CiAgICAgIHJldHVybiAwOwogICAgfSwKICAgIHJhbmRvbV9nZXQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzb2NrX3JlY3Y6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzb2NrX3NlbmQ6IChpbnB1dCkgPT4gewogICAgICByZXR1cm4gMDsKICAgIH0sCiAgICBzb2NrX3NodXRkb3duOiAoaW5wdXQpID0+IHsKICAgICAgcmV0dXJuIDA7CiAgICB9LAogIH07CgogIHZhciBtYXRyaXhWZWN0b3JNdWx0aXBseSA9IGZ1bmN0aW9uIG1hdHJpeFZlY3Rvck11bHRpcGx5KGRhdGEpIHsKICAgIHZhciBfZGF0YSRnbG9iYWxzID0gZGF0YS5nbG9iYWxzLAogICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFscy5leHBvcnRzLAogICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMubWVtQWxsb2MsCiAgICAgIG1lbW9yeSA9IF9kYXRhJGdsb2JhbHMubWVtb3J5OwogICAgdmFyIG1hdHJpeEFkZHJlc3MgPSBkYXRhLm1hdHJpeEFkZHJlc3MsCiAgICAgIHZlY3RvckFkZHJlc3MgPSBkYXRhLnZlY3RvckFkZHJlc3MsCiAgICAgIG0gPSBkYXRhLm0sCiAgICAgIG4gPSBkYXRhLm4sCiAgICAgIHJlc3VsdEFkZHJlc3MgPSBkYXRhLnJlc3VsdEFkZHJlc3M7CiAgICB2YXIgcHZfbWF0cml4X3ZlY3Rvcl9tdWx0aXBseSA9IGV4cG9ydHMucHZfbWF0cml4X3ZlY3Rvcl9tdWx0aXBseTsKICAgIGlmICghbWVtQWxsb2MuaGFzKG1hdHJpeEFkZHJlc3MpIHx8ICFtZW1BbGxvYy5oYXModmVjdG9yQWRkcmVzcykgfHwgIW1lbUFsbG9jLmhhcyhyZXN1bHRBZGRyZXNzKSkgewogICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSgwKTsKICAgIH0KICAgIHZhciBtZW1vcnlCdWZmZXJGbG9hdDMyID0gbmV3IEZsb2F0MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgIHZhciBfbWVtQWxsb2MkZ2V0ID0gbWVtQWxsb2MuZ2V0KG1hdHJpeEFkZHJlc3MpLAogICAgICB3b3JrZXJNYXRyaXhBZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KHZlY3RvckFkZHJlc3MpLAogICAgICB3b3JrZXJWZWN0b3JBZGRyZXNzID0gX21lbUFsbG9jJGdldDIud29ya2VyTWVtQWRkcmVzczsKICAgIHZhciBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldChyZXN1bHRBZGRyZXNzKSwKICAgICAgd29ya2VyUmVzdWx0QWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQzLndvcmtlck1lbUFkZHJlc3M7CiAgICBwdl9tYXRyaXhfdmVjdG9yX211bHRpcGx5KHdvcmtlck1hdHJpeEFkZHJlc3MsIHdvcmtlclZlY3RvckFkZHJlc3MsIG0sIG4sIHdvcmtlclJlc3VsdEFkZHJlc3MpOwogICAgcmV0dXJuIG1lbW9yeUJ1ZmZlckZsb2F0MzIuc2xpY2Uod29ya2VyUmVzdWx0QWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgd29ya2VyUmVzdWx0QWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCArIG0pOwogIH07CiAgdmFyIHN5bmNWZWN0b3IgPSBmdW5jdGlvbiBzeW5jVmVjdG9yKGRhdGEpIHsKICAgIHZhciBfZGF0YSRnbG9iYWxzMiA9IGRhdGEuZ2xvYmFscywKICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzMi5tZW1BbGxvYywKICAgICAgbWVtb3J5ID0gX2RhdGEkZ2xvYmFsczIubWVtb3J5OwogICAgdmFyIHZlY3RvckFkZHJlc3MgPSBkYXRhLnZlY3RvckFkZHJlc3MsCiAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyOwogICAgaWYgKG1lbUFsbG9jLmhhcyh2ZWN0b3JBZGRyZXNzKSkgewogICAgICB2YXIgbWVtb3J5QnVmZmVyRmxvYXQzMiA9IG5ldyBGbG9hdDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NCA9IG1lbUFsbG9jLmdldCh2ZWN0b3JBZGRyZXNzKSwKICAgICAgICB3b3JrZXJNZW1BZGRyZXNzID0gX21lbUFsbG9jJGdldDQud29ya2VyTWVtQWRkcmVzczsKICAgICAgbWVtb3J5QnVmZmVyRmxvYXQzMi5zZXQoYnVmZmVyLCB3b3JrZXJNZW1BZGRyZXNzIC8gRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgIH0KICB9OwogIHZhciBwdk12bUFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoe30sIFB2WHB1QWN0aW9uLk1BVFJJWF9WRUNUT1JfTVVMVElQTFksIG1hdHJpeFZlY3Rvck11bHRpcGx5KSwgUHZYcHVBY3Rpb24uU1lOQ19WRUNUT1IsIHN5bmNWZWN0b3IpOwoKICAvKiBlc2xpbnQgY2FtZWxjYXNlOiAwICovCiAgdmFyIFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbjsKICAoZnVuY3Rpb24gKFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbikgewogICAgUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uW1B2UGljb2xsbUF0dGVudGlvbkFjdGlvblsiQVRURU5USU9OX1BSRUNPTVBVVEVfRU5DT0RJTkciXSA9IDIwMF0gPSAiQVRURU5USU9OX1BSRUNPTVBVVEVfRU5DT0RJTkciOwogICAgUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uW1B2UGljb2xsbUF0dGVudGlvbkFjdGlvblsiQVRURU5USU9OX0FUVEVORF9DT01CSU5FRCJdID0gMjAxXSA9ICJBVFRFTlRJT05fQVRURU5EX0NPTUJJTkVEIjsKICB9KShQdlBpY29sbG1BdHRlbnRpb25BY3Rpb24gfHwgKFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbiA9IHt9KSk7CgogIGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsKICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7CiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbiIpOwogICAgfQogIH0KCiAgZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgewogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgewogICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOwogICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7CiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsKICAgICAgaWYgKCJ2YWx1ZSIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7CiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTsKICAgIH0KICB9CiAgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgewogICAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7CiAgICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7CiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsICJwcm90b3R5cGUiLCB7CiAgICAgIHdyaXRhYmxlOiBmYWxzZQogICAgfSk7CiAgICByZXR1cm4gQ29uc3RydWN0b3I7CiAgfQoKICBmdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlcihvLCBhbGxvd0FycmF5TGlrZSkgeyB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSAidW5kZWZpbmVkIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1siQEBpdGVyYXRvciJdOyBpZiAoIWl0KSB7IGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09ICJudW1iZXIiKSB7IGlmIChpdCkgbyA9IGl0OyB2YXIgaSA9IDA7IHZhciBGID0gZnVuY3Rpb24gRigpIHt9OyByZXR1cm4geyBzOiBGLCBuOiBmdW5jdGlvbiBuKCkgeyBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9OyByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG9baSsrXSB9OyB9LCBlOiBmdW5jdGlvbiBlKF9lKSB7IHRocm93IF9lOyB9LCBmOiBGIH07IH0gdGhyb3cgbmV3IFR5cGVFcnJvcigiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLiIpOyB9IHZhciBub3JtYWxDb21wbGV0aW9uID0gdHJ1ZSwgZGlkRXJyID0gZmFsc2UsIGVycjsgcmV0dXJuIHsgczogZnVuY3Rpb24gcygpIHsgaXQgPSBpdC5jYWxsKG8pOyB9LCBuOiBmdW5jdGlvbiBuKCkgeyB2YXIgc3RlcCA9IGl0Lm5leHQoKTsgbm9ybWFsQ29tcGxldGlvbiA9IHN0ZXAuZG9uZTsgcmV0dXJuIHN0ZXA7IH0sIGU6IGZ1bmN0aW9uIGUoX2UyKSB7IGRpZEVyciA9IHRydWU7IGVyciA9IF9lMjsgfSwgZjogZnVuY3Rpb24gZigpIHsgdHJ5IHsgaWYgKCFub3JtYWxDb21wbGV0aW9uICYmIGl0WyJyZXR1cm4iXSAhPSBudWxsKSBpdFsicmV0dXJuIl0oKTsgfSBmaW5hbGx5IHsgaWYgKGRpZEVycikgdGhyb3cgZXJyOyB9IH0gfTsgfQogIGZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gInN0cmluZyIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSAiT2JqZWN0IiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gIk1hcCIgfHwgbiA9PT0gIlNldCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gIkFyZ3VtZW50cyIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9CiAgZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTsgcmV0dXJuIGFycjI7IH0KICB2YXIgUHZYcHUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgZnVuY3Rpb24gUHZYcHUoKSB7CiAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQdlhwdSk7CiAgICB9CiAgICBfY3JlYXRlQ2xhc3MoUHZYcHUsIG51bGwsIFt7CiAgICAgIGtleTogImFkZFhwdSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRYcHUob2JqQWRkcmVzcywgZGF0YSkgewogICAgICAgIFB2WHB1LnhwdU9iamVjdHMuc2V0KG9iakFkZHJlc3MsIGRhdGEpOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogImdldFhwdSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRYcHUob2JqQWRkcmVzcykgewogICAgICAgIHJldHVybiBQdlhwdS54cHVPYmplY3RzLmdldChvYmpBZGRyZXNzKTsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJoYXNYcHUiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gaGFzWHB1KG9iakFkZHJlc3MpIHsKICAgICAgICByZXR1cm4gUHZYcHUueHB1T2JqZWN0cy5oYXMob2JqQWRkcmVzcyk7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAicmVtb3ZlWHB1IiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVhwdShvYmpBZGRyZXNzKSB7CiAgICAgICAgaWYgKFB2WHB1LnhwdU9iamVjdHMuaGFzKG9iakFkZHJlc3MpKSB7CiAgICAgICAgICB2YXIgX1B2WHB1JHhwdU9iamVjdHMkZ2V0ID0gUHZYcHUueHB1T2JqZWN0cy5nZXQob2JqQWRkcmVzcyksCiAgICAgICAgICAgIGRldmljZU1lbSA9IF9QdlhwdSR4cHVPYmplY3RzJGdldC5kZXZpY2VNZW07CiAgICAgICAgICB2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIoZGV2aWNlTWVtKSwKICAgICAgICAgICAgX3N0ZXA7CiAgICAgICAgICB0cnkgewogICAgICAgICAgICBmb3IgKF9pdGVyYXRvci5zKCk7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubigpKS5kb25lOykgewogICAgICAgICAgICAgIHZhciBtZW1BZGRyZXNzID0gX3N0ZXAudmFsdWU7CiAgICAgICAgICAgICAgUHZYcHUubWVtb3J5T2JqZWN0c1siZGVsZXRlIl0obWVtQWRkcmVzcyk7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0gY2F0Y2ggKGVycikgewogICAgICAgICAgICBfaXRlcmF0b3IuZShlcnIpOwogICAgICAgICAgfSBmaW5hbGx5IHsKICAgICAgICAgICAgX2l0ZXJhdG9yLmYoKTsKICAgICAgICAgIH0KICAgICAgICAgIFB2WHB1LnhwdU9iamVjdHNbImRlbGV0ZSJdKG9iakFkZHJlc3MpOwogICAgICAgIH0KICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJhZGRNZW1vcnkiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkTWVtb3J5KG1lbUFkZHJlc3MsIGRhdGEpIHsKICAgICAgICBQdlhwdS5tZW1vcnlPYmplY3RzLnNldChtZW1BZGRyZXNzLCBkYXRhKTsKICAgICAgICBQdlhwdS54cHVPYmplY3RzLmdldChkYXRhLm9iakFkZHJlc3MpLmRldmljZU1lbS5hZGQobWVtQWRkcmVzcyk7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiZ2V0TWVtb3J5IiwKICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldE1lbW9yeShtZW1BZGRyZXNzKSB7CiAgICAgICAgcmV0dXJuIFB2WHB1Lm1lbW9yeU9iamVjdHMuZ2V0KG1lbUFkZHJlc3MpOwogICAgICB9CiAgICB9LCB7CiAgICAgIGtleTogImhhc01lbW9yeSIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXNNZW1vcnkobWVtQWRkcmVzcykgewogICAgICAgIHJldHVybiBQdlhwdS5tZW1vcnlPYmplY3RzLmhhcyhtZW1BZGRyZXNzKTsKICAgICAgfQogICAgfSwgewogICAgICBrZXk6ICJyZW1vdmVNZW1vcnkiLAogICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlTWVtb3J5KG1lbUFkZHJlc3MpIHsKICAgICAgICBpZiAoUHZYcHUuaGFzTWVtb3J5KG1lbUFkZHJlc3MpKSB7CiAgICAgICAgICBQdlhwdS54cHVPYmplY3RzLmdldChQdlhwdS5nZXRNZW1vcnkobWVtQWRkcmVzcykub2JqQWRkcmVzcykuZGV2aWNlTWVtWyJkZWxldGUiXShtZW1BZGRyZXNzKTsKICAgICAgICB9CiAgICAgICAgUHZYcHUubWVtb3J5T2JqZWN0c1siZGVsZXRlIl0obWVtQWRkcmVzcyk7CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAiZ2V0VW5pcXVlUG9pbnRlciIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRVbmlxdWVQb2ludGVyKCkgewogICAgICAgIHdoaWxlICh0cnVlKSB7CiAgICAgICAgICB2YXIgcHRyID0gTWF0aC5jZWlsKChwZXJmb3JtYW5jZS5ub3coKSArIE1hdGgucmFuZG9tKCkpICogMTBlMik7CiAgICAgICAgICBpZiAoIXRoaXMudW5pcXVlUG9pbnRlcnMuaGFzKHB0cikpIHsKICAgICAgICAgICAgdGhpcy51bmlxdWVQb2ludGVycy5hZGQocHRyKTsKICAgICAgICAgICAgcmV0dXJuIHB0cjsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0KICAgIH0sIHsKICAgICAga2V5OiAicmVtb3ZlVW5pcXVlUG9pbnRlciIsCiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmVVbmlxdWVQb2ludGVyKHB0cikgewogICAgICAgIGlmICh0aGlzLnVuaXF1ZVBvaW50ZXJzLmhhcyhwdHIpKSB7CiAgICAgICAgICB0aGlzLnVuaXF1ZVBvaW50ZXJzWyJkZWxldGUiXShwdHIpOwogICAgICAgIH0KICAgICAgfQogICAgfV0pOwogICAgcmV0dXJuIFB2WHB1OwogIH0oKTsKICBfZGVmaW5lUHJvcGVydHkoUHZYcHUsICJ4cHVPYmplY3RzIiwgbmV3IE1hcCgpKTsKICBfZGVmaW5lUHJvcGVydHkoUHZYcHUsICJtZW1vcnlPYmplY3RzIiwgbmV3IE1hcCgpKTsKICBfZGVmaW5lUHJvcGVydHkoUHZYcHUsICJ1bmlxdWVQb2ludGVycyIsIG5ldyBTZXQoKSk7CgogIHZhciBhdHRlbnRpb25QcmVjb21wdXRlRW5jb2RpbmcgPSBmdW5jdGlvbiBhdHRlbnRpb25QcmVjb21wdXRlRW5jb2RpbmcoZGF0YSkgewogICAgdmFyIF9kYXRhJGdsb2JhbHMgPSBkYXRhLmdsb2JhbHMsCiAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzLmV4cG9ydHMsCiAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFscy5tZW1BbGxvYzsKICAgIHZhciBlbmNvZGluZ0FkZHJlc3MgPSBkYXRhLmVuY29kaW5nQWRkcmVzcywKICAgICAgZGltZW5zaW9uID0gZGF0YS5kaW1lbnNpb24sCiAgICAgIHN0ZXBzID0gZGF0YS5zdGVwcywKICAgICAgdGhldGEgPSBkYXRhLnRoZXRhOwogICAgdmFyIHB2X3BpY29sbG1fYXR0ZW50aW9uX3ByZWNvbXB1dGVfZW5jb2Rpbmdfd2FzbSA9IGV4cG9ydHMucHZfcGljb2xsbV9hdHRlbnRpb25fcHJlY29tcHV0ZV9lbmNvZGluZ193YXNtOwogICAgdmFyIF9tZW1BbGxvYyRnZXQgPSBtZW1BbGxvYy5nZXQoZW5jb2RpbmdBZGRyZXNzKSwKICAgICAgd29ya2VyRW5jb2RpbmdBZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgcHZfcGljb2xsbV9hdHRlbnRpb25fcHJlY29tcHV0ZV9lbmNvZGluZ193YXNtKHdvcmtlckVuY29kaW5nQWRkcmVzcywgZGltZW5zaW9uLCBzdGVwcywgdGhldGEpOwogIH07CiAgdmFyIGF0dGVudGlvbkF0dGVuZENvbWJpbmVkID0gZnVuY3Rpb24gYXR0ZW50aW9uQXR0ZW5kQ29tYmluZWQoZGF0YSkgewogICAgdmFyIF9kYXRhJGdsb2JhbHMyID0gZGF0YS5nbG9iYWxzLAogICAgICBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczIuZXhwb3J0cywKICAgICAgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzMi5tZW1BbGxvYywKICAgICAgbWVtb3J5ID0gX2RhdGEkZ2xvYmFsczIubWVtb3J5OwogICAgdmFyIG51bUhlYWRzID0gZGF0YS5udW1IZWFkcywKICAgICAgbnVtS3ZIZWFkcyA9IGRhdGEubnVtS3ZIZWFkcywKICAgICAgd2luZG93TGVuZ3RoID0gZGF0YS53aW5kb3dMZW5ndGgsCiAgICAgIGhlYWREaW1lbnNpb24gPSBkYXRhLmhlYWREaW1lbnNpb24sCiAgICAgIHJvcGVEaW1lbnNpb24gPSBkYXRhLnJvcGVEaW1lbnNpb24sCiAgICAgIHJvcGVJbnRlcmxlYXZlZCA9IGRhdGEucm9wZUludGVybGVhdmVkLAogICAgICBuZXdFbmNvZGluZ0FkZHJlc3MgPSBkYXRhLm5ld0VuY29kaW5nQWRkcmVzcywKICAgICAgcUJ1ZmZlciA9IGRhdGEucUJ1ZmZlciwKICAgICAga0J1ZmZlciA9IGRhdGEua0J1ZmZlciwKICAgICAgdkJ1ZmZlciA9IGRhdGEudkJ1ZmZlciwKICAgICAga2V5c0FkZHJlc3MgPSBkYXRhLmtleXNBZGRyZXNzLAogICAgICBrZXlJbnRlcmNlcHRzQWRkcmVzcyA9IGRhdGEua2V5SW50ZXJjZXB0c0FkZHJlc3MsCiAgICAgIGtleVNsb3Blc0FkZHJlc3MgPSBkYXRhLmtleVNsb3Blc0FkZHJlc3MsCiAgICAgIHZhbHVlc0FkZHJlc3MgPSBkYXRhLnZhbHVlc0FkZHJlc3MsCiAgICAgIHZhbHVlSW50ZXJjZXB0c0FkZHJlc3MgPSBkYXRhLnZhbHVlSW50ZXJjZXB0c0FkZHJlc3MsCiAgICAgIHZhbHVlU2xvcGVzQWRkcmVzcyA9IGRhdGEudmFsdWVTbG9wZXNBZGRyZXNzLAogICAgICBwb3NpdGlvbiA9IGRhdGEucG9zaXRpb24sCiAgICAgIHF1ZXJ5QWRkcmVzcyA9IGRhdGEucXVlcnlBZGRyZXNzLAogICAgICBuID0gZGF0YS5uOwogICAgdmFyIGFsaWduZWRfYWxsb2MgPSBleHBvcnRzLmFsaWduZWRfYWxsb2MsCiAgICAgIGZyZWUgPSBleHBvcnRzLmZyZWUsCiAgICAgIHB2X3BpY29sbG1fYXR0ZW50aW9uX2VuY29kZV93YXNtID0gZXhwb3J0cy5wdl9waWNvbGxtX2F0dGVudGlvbl9lbmNvZGVfd2FzbSwKICAgICAgcHZfcGljb2xsbV9hdHRlbnRpb25fdXBkYXRlX2tleXNfd2FzbSA9IGV4cG9ydHMucHZfcGljb2xsbV9hdHRlbnRpb25fdXBkYXRlX2tleXNfd2FzbSwKICAgICAgcHZfcGljb2xsbV9hdHRlbnRpb25fdXBkYXRlX3ZhbHVlc193YXNtID0gZXhwb3J0cy5wdl9waWNvbGxtX2F0dGVudGlvbl91cGRhdGVfdmFsdWVzX3dhc20sCiAgICAgIHB2X3BpY29sbG1fYXR0ZW50aW9uX3RyYW5zcG9zZV9xdWVyeV93YXNtID0gZXhwb3J0cy5wdl9waWNvbGxtX2F0dGVudGlvbl90cmFuc3Bvc2VfcXVlcnlfd2FzbSwKICAgICAgcHZfcGljb2xsbV9hdHRlbnRpb25fYXR0ZW5kX3dhc20gPSBleHBvcnRzLnB2X3BpY29sbG1fYXR0ZW50aW9uX2F0dGVuZF93YXNtOwogICAgdmFyIF9tZW1BbGxvYyRnZXQyID0gbWVtQWxsb2MuZ2V0KG5ld0VuY29kaW5nQWRkcmVzcyksCiAgICAgIHdvcmtlckVuY29kaW5nQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQyLndvcmtlck1lbUFkZHJlc3M7CiAgICB2YXIgX21lbUFsbG9jJGdldDMgPSBtZW1BbGxvYy5nZXQoa2V5c0FkZHJlc3MpLAogICAgICB3b3JrZXJLZXlzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQzLndvcmtlck1lbUFkZHJlc3M7CiAgICB2YXIgX21lbUFsbG9jJGdldDQgPSBtZW1BbGxvYy5nZXQoa2V5SW50ZXJjZXB0c0FkZHJlc3MpLAogICAgICB3b3JrZXJLZXlJbnRlcmNlcHRzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ0Lndvcmtlck1lbUFkZHJlc3M7CiAgICB2YXIgX21lbUFsbG9jJGdldDUgPSBtZW1BbGxvYy5nZXQoa2V5U2xvcGVzQWRkcmVzcyksCiAgICAgIHdvcmtlcktleVNsb3Blc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0NS53b3JrZXJNZW1BZGRyZXNzOwogICAgdmFyIF9tZW1BbGxvYyRnZXQ2ID0gbWVtQWxsb2MuZ2V0KHZhbHVlc0FkZHJlc3MpLAogICAgICB3b3JrZXJWYWx1ZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDYud29ya2VyTWVtQWRkcmVzczsKICAgIHZhciBfbWVtQWxsb2MkZ2V0NyA9IG1lbUFsbG9jLmdldCh2YWx1ZUludGVyY2VwdHNBZGRyZXNzKSwKICAgICAgd29ya2VyVmFsdWVJbnRlcmNlcHRzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ3Lndvcmtlck1lbUFkZHJlc3M7CiAgICB2YXIgX21lbUFsbG9jJGdldDggPSBtZW1BbGxvYy5nZXQodmFsdWVTbG9wZXNBZGRyZXNzKSwKICAgICAgd29ya2VyVmFsdWVTbG9wZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDgud29ya2VyTWVtQWRkcmVzczsKICAgIHZhciBfbWVtQWxsb2MkZ2V0OSA9IG1lbUFsbG9jLmdldChxdWVyeUFkZHJlc3MpLAogICAgICB3b3JrZXJRdWVyeUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0OS53b3JrZXJNZW1BZGRyZXNzOwogICAgdmFyIHdvcmtlclFBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIHFCdWZmZXIubGVuZ3RoICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgIHZhciB3b3JrZXJLQWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBrQnVmZmVyLmxlbmd0aCAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICB2YXIgd29ya2VyVkFkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgdkJ1ZmZlci5sZW5ndGggKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgdmFyIGxlbmd0aCA9IG51bUhlYWRzICogaGVhZERpbWVuc2lvbiAqIG47CiAgICB2YXIgd29ya2VyT3V0cHV0QWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBsZW5ndGggKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgdmFyIG1lbW9yeUJ1ZmZlckZsb2F0MzIgPSBuZXcgRmxvYXQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgbWVtb3J5QnVmZmVyRmxvYXQzMi5zZXQocUJ1ZmZlciwgd29ya2VyUUFkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgbWVtb3J5QnVmZmVyRmxvYXQzMi5zZXQoa0J1ZmZlciwgd29ya2VyS0FkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgbWVtb3J5QnVmZmVyRmxvYXQzMi5zZXQodkJ1ZmZlciwgd29ya2VyVkFkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgbWVtb3J5QnVmZmVyRmxvYXQzMi5maWxsKDAsIHdvcmtlck91dHB1dEFkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIHdvcmtlck91dHB1dEFkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKyBsZW5ndGgpOwogICAgcHZfcGljb2xsbV9hdHRlbnRpb25fZW5jb2RlX3dhc20od29ya2VyUUFkZHJlc3MsIHdvcmtlckVuY29kaW5nQWRkcmVzcywgbiwgbnVtSGVhZHMsIHJvcGVJbnRlcmxlYXZlZCwgaGVhZERpbWVuc2lvbiwgcm9wZURpbWVuc2lvbiwgcG9zaXRpb24pOwogICAgcHZfcGljb2xsbV9hdHRlbnRpb25fdHJhbnNwb3NlX3F1ZXJ5X3dhc20obiwgd29ya2VyUUFkZHJlc3MsIHdvcmtlclF1ZXJ5QWRkcmVzcywgbnVtSGVhZHMsIGhlYWREaW1lbnNpb24pOwogICAgcHZfcGljb2xsbV9hdHRlbnRpb25fZW5jb2RlX3dhc20od29ya2VyS0FkZHJlc3MsIHdvcmtlckVuY29kaW5nQWRkcmVzcywgbiwgbnVtS3ZIZWFkcywgcm9wZUludGVybGVhdmVkLCBoZWFkRGltZW5zaW9uLCByb3BlRGltZW5zaW9uLCBwb3NpdGlvbik7CiAgICBwdl9waWNvbGxtX2F0dGVudGlvbl91cGRhdGVfa2V5c193YXNtKG51bUt2SGVhZHMsIHdpbmRvd0xlbmd0aCwgaGVhZERpbWVuc2lvbiwgd29ya2VyS2V5c0FkZHJlc3MsIHdvcmtlcktleUludGVyY2VwdHNBZGRyZXNzLCB3b3JrZXJLZXlTbG9wZXNBZGRyZXNzLCBwb3NpdGlvbiwgbiwgd29ya2VyS0FkZHJlc3MpOwogICAgcHZfcGljb2xsbV9hdHRlbnRpb25fdXBkYXRlX3ZhbHVlc193YXNtKG51bUt2SGVhZHMsIHdpbmRvd0xlbmd0aCwgaGVhZERpbWVuc2lvbiwgd29ya2VyVmFsdWVzQWRkcmVzcywgd29ya2VyVmFsdWVJbnRlcmNlcHRzQWRkcmVzcywgd29ya2VyVmFsdWVTbG9wZXNBZGRyZXNzLCBwb3NpdGlvbiwgbiwgd29ya2VyVkFkZHJlc3MpOwogICAgcHZfcGljb2xsbV9hdHRlbnRpb25fYXR0ZW5kX3dhc20obnVtSGVhZHMsIG51bUt2SGVhZHMsIHdpbmRvd0xlbmd0aCwgaGVhZERpbWVuc2lvbiwgd29ya2VyS2V5c0FkZHJlc3MsIHdvcmtlcktleUludGVyY2VwdHNBZGRyZXNzLCB3b3JrZXJLZXlTbG9wZXNBZGRyZXNzLCB3b3JrZXJWYWx1ZXNBZGRyZXNzLCB3b3JrZXJWYWx1ZUludGVyY2VwdHNBZGRyZXNzLCB3b3JrZXJWYWx1ZVNsb3Blc0FkZHJlc3MsIHBvc2l0aW9uLCB3b3JrZXJRdWVyeUFkZHJlc3MsIG4sIHdvcmtlck91dHB1dEFkZHJlc3MpOwogICAgbWVtb3J5QnVmZmVyRmxvYXQzMiA9IG5ldyBGbG9hdDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICB2YXIgcmVzID0gbWVtb3J5QnVmZmVyRmxvYXQzMi5zbGljZSh3b3JrZXJPdXRwdXRBZGRyZXNzIC8gRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCB3b3JrZXJPdXRwdXRBZGRyZXNzIC8gRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICsgbGVuZ3RoKTsKICAgIGZyZWUod29ya2VyUUFkZHJlc3MpOwogICAgZnJlZSh3b3JrZXJLQWRkcmVzcyk7CiAgICBmcmVlKHdvcmtlclZBZGRyZXNzKTsKICAgIGZyZWUod29ya2VyT3V0cHV0QWRkcmVzcyk7CiAgICByZXR1cm4gcmVzOwogIH07CiAgdmFyIHB2UGljb2xsbUF0dGVudGlvbkFjdGlvbk1hcCA9IF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoe30sIFB2UGljb2xsbUF0dGVudGlvbkFjdGlvbi5BVFRFTlRJT05fUFJFQ09NUFVURV9FTkNPRElORywgYXR0ZW50aW9uUHJlY29tcHV0ZUVuY29kaW5nKSwgUHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uLkFUVEVOVElPTl9BVFRFTkRfQ09NQklORUQsIGF0dGVudGlvbkF0dGVuZENvbWJpbmVkKTsKCiAgLyogZXNsaW50IGNhbWVsY2FzZTogMCAqLwogIHZhciBQdlBpY29sbG1XZWlnaHRBY3Rpb247CiAgKGZ1bmN0aW9uIChQdlBpY29sbG1XZWlnaHRBY3Rpb24pIHsKICAgIFB2UGljb2xsbVdlaWdodEFjdGlvbltQdlBpY29sbG1XZWlnaHRBY3Rpb25bIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X1BSRVBST0NFU1NfQkxPQ0tTIl0gPSAxMDBdID0gIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X1BSRVBST0NFU1NfQkxPQ0tTIjsKICAgIFB2UGljb2xsbVdlaWdodEFjdGlvbltQdlBpY29sbG1XZWlnaHRBY3Rpb25bIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X1BSRVBST0NFU1NfTUVUQVMiXSA9IDEwMV0gPSAiV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfUFJFUFJPQ0VTU19NRVRBUyI7CiAgICBQdlBpY29sbG1XZWlnaHRBY3Rpb25bUHZQaWNvbGxtV2VpZ2h0QWN0aW9uWyJXRUlHSFRfQkxPQ0tfTUlYRURfMTZYOF9QUkVQUk9DRVNTX0JJQVMiXSA9IDEwMl0gPSAiV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfUFJFUFJPQ0VTU19CSUFTIjsKICAgIFB2UGljb2xsbVdlaWdodEFjdGlvbltQdlBpY29sbG1XZWlnaHRBY3Rpb25bIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X0ZPUldBUkRfU0lOR0xFIl0gPSAxMDNdID0gIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X0ZPUldBUkRfU0lOR0xFIjsKICAgIFB2UGljb2xsbVdlaWdodEFjdGlvbltQdlBpY29sbG1XZWlnaHRBY3Rpb25bIldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X0ZPUldBUkRfTVVMVElQTEUiXSA9IDEwNF0gPSAiV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfRk9SV0FSRF9NVUxUSVBMRSI7CiAgfSkoUHZQaWNvbGxtV2VpZ2h0QWN0aW9uIHx8IChQdlBpY29sbG1XZWlnaHRBY3Rpb24gPSB7fSkpOwoKICB2YXIgd2VpZ2h0QmxvY2tNaXhlZDE2eDhQcmVwcm9jZXNzQmxvY2tzID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHsKICAgIHZhciBfcmVmID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lJDEubWFyayhmdW5jdGlvbiBfY2FsbGVlKGRhdGEpIHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHMsIGV4cG9ydHMsIG1lbUFsbG9jLCBtZW1vcnksIHNoYXBlLCBiaXREZXB0aHMsIGJpdERlcHRoU3RhcnRzLCBudW1CbG9ja0J5dGVzLCBibG9ja3NBZGRyZXNzLCBibG9jaywgYWxpZ25lZF9hbGxvYywgZnJlZSwgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9wcmVwcm9jZXNzX2Jsb2Nrcywgd29ya2VyQmxvY2tzQWRkcmVzcywgc2hhcGVBZGRyZXNzLCBiaXREZXB0aHNBZGRyZXNzLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIG1lbW9yeUJ1ZmZlclVpbnQ4LCBtZW1vcnlCdWZmZXJJbnQzMjsKICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUkMS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUkKF9jb250ZXh0KSB7CiAgICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHsKICAgICAgICAgIGNhc2UgMDoKICAgICAgICAgICAgX2RhdGEkZ2xvYmFscyA9IGRhdGEuZ2xvYmFscywgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMuZXhwb3J0cywgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzLm1lbUFsbG9jLCBtZW1vcnkgPSBfZGF0YSRnbG9iYWxzLm1lbW9yeTsKICAgICAgICAgICAgc2hhcGUgPSBkYXRhLnNoYXBlLCBiaXREZXB0aHMgPSBkYXRhLmJpdERlcHRocywgYml0RGVwdGhTdGFydHMgPSBkYXRhLmJpdERlcHRoU3RhcnRzLCBudW1CbG9ja0J5dGVzID0gZGF0YS5udW1CbG9ja0J5dGVzLCBibG9ja3NBZGRyZXNzID0gZGF0YS5ibG9ja3NBZGRyZXNzLCBibG9jayA9IGRhdGEuYmxvY2s7CiAgICAgICAgICAgIGFsaWduZWRfYWxsb2MgPSBleHBvcnRzLmFsaWduZWRfYWxsb2MsIGZyZWUgPSBleHBvcnRzLmZyZWUsIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfcHJlcHJvY2Vzc19ibG9ja3MgPSBleHBvcnRzLnB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfcHJlcHJvY2Vzc19ibG9ja3M7CiAgICAgICAgICAgIHdvcmtlckJsb2Nrc0FkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKFVpbnQ4QXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIG51bUJsb2NrQnl0ZXMgKiBVaW50OEFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICAgICAgaWYgKHdvcmtlckJsb2Nrc0FkZHJlc3MpIHsKICAgICAgICAgICAgICBtZW1BbGxvYy5zZXQoYmxvY2tzQWRkcmVzcywgewogICAgICAgICAgICAgICAgYWxsb2NTaXplOiBudW1CbG9ja0J5dGVzLAogICAgICAgICAgICAgICAgd29ya2VyTWVtQWRkcmVzczogd29ya2VyQmxvY2tzQWRkcmVzcwogICAgICAgICAgICAgIH0pOwogICAgICAgICAgICAgIHNoYXBlQWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIHNoYXBlLmxlbmd0aCk7CiAgICAgICAgICAgICAgYml0RGVwdGhzQWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIGJpdERlcHRocy5sZW5ndGgpOwogICAgICAgICAgICAgIGJpdERlcHRoc1N0YXJ0QWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIGJpdERlcHRoU3RhcnRzLmxlbmd0aCk7CiAgICAgICAgICAgICAgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMiA9IG5ldyBJbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlclVpbnQ4LnNldChibG9jaywgd29ya2VyQmxvY2tzQWRkcmVzcyk7CiAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzIuc2V0KHNoYXBlLCBzaGFwZUFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoYml0RGVwdGhzLCBiaXREZXB0aHNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzIuc2V0KGJpdERlcHRoU3RhcnRzLCBiaXREZXB0aHNTdGFydEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICAgICAgICBwdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X3ByZXByb2Nlc3NfYmxvY2tzKHNoYXBlQWRkcmVzcywgYml0RGVwdGhzLmxlbmd0aCwgYml0RGVwdGhzQWRkcmVzcywgYml0RGVwdGhzU3RhcnRBZGRyZXNzLCB3b3JrZXJCbG9ja3NBZGRyZXNzKTsKICAgICAgICAgICAgICBmcmVlKHNoYXBlQWRkcmVzcyk7CiAgICAgICAgICAgICAgZnJlZShiaXREZXB0aHNBZGRyZXNzKTsKICAgICAgICAgICAgICBmcmVlKGJpdERlcHRoc1N0YXJ0QWRkcmVzcyk7CiAgICAgICAgICAgIH0KICAgICAgICAgIGNhc2UgNToKICAgICAgICAgIGNhc2UgImVuZCI6CiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7CiAgICAgICAgfQogICAgICB9LCBfY2FsbGVlKTsKICAgIH0pKTsKICAgIHJldHVybiBmdW5jdGlvbiB3ZWlnaHRCbG9ja01peGVkMTZ4OFByZXByb2Nlc3NCbG9ja3MoX3gpIHsKICAgICAgcmV0dXJuIF9yZWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTsKICAgIH07CiAgfSgpOwogIHZhciB3ZWlnaHRCbG9ja01peGVkMTZ4OFByZXByb2Nlc3NNZXRhcyA9IGZ1bmN0aW9uIHdlaWdodEJsb2NrTWl4ZWQxNng4UHJlcHJvY2Vzc01ldGFzKGRhdGEpIHsKICAgIHZhciBfZGF0YSRnbG9iYWxzMiA9IGRhdGEuZ2xvYmFscywKICAgICAgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHMyLmV4cG9ydHMsCiAgICAgIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFsczIubWVtQWxsb2MsCiAgICAgIG1lbW9yeSA9IF9kYXRhJGdsb2JhbHMyLm1lbW9yeTsKICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzLAogICAgICBtZXRhcyA9IGRhdGEubWV0YXM7CiAgICB2YXIgYWxpZ25lZF9hbGxvYyA9IGV4cG9ydHMuYWxpZ25lZF9hbGxvYzsKICAgIHZhciB3b3JrZXJNZXRhc0FkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKFVpbnQxNkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBtZXRhcy5sZW5ndGggKiBVaW50MTZBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICBpZiAod29ya2VyTWV0YXNBZGRyZXNzKSB7CiAgICAgIG1lbUFsbG9jLnNldChtZW1BZGRyZXNzLCB7CiAgICAgICAgYWxsb2NTaXplOiBtZXRhcy5sZW5ndGggKiBVaW50MTZBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwKICAgICAgICB3b3JrZXJNZW1BZGRyZXNzOiB3b3JrZXJNZXRhc0FkZHJlc3MKICAgICAgfSk7CiAgICAgIHZhciBtZW1vcnlCdWZmZXJVaW50MTYgPSBuZXcgVWludDE2QXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgIG1lbW9yeUJ1ZmZlclVpbnQxNi5zZXQobWV0YXMsIHdvcmtlck1ldGFzQWRkcmVzcyAvIFVpbnQxNkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgIH0KICB9OwogIHZhciB3ZWlnaHRCbG9ja01peGVkMTZ4OFByZXByb2Nlc3NCaWFzID0gZnVuY3Rpb24gd2VpZ2h0QmxvY2tNaXhlZDE2eDhQcmVwcm9jZXNzQmlhcyhkYXRhKSB7CiAgICB2YXIgX2RhdGEkZ2xvYmFsczMgPSBkYXRhLmdsb2JhbHMsCiAgICAgIGV4cG9ydHMgPSBfZGF0YSRnbG9iYWxzMy5leHBvcnRzLAogICAgICBtZW1BbGxvYyA9IF9kYXRhJGdsb2JhbHMzLm1lbUFsbG9jLAogICAgICBtZW1vcnkgPSBfZGF0YSRnbG9iYWxzMy5tZW1vcnk7CiAgICB2YXIgbWVtQWRkcmVzcyA9IGRhdGEubWVtQWRkcmVzcywKICAgICAgYmlhcyA9IGRhdGEuYmlhczsKICAgIHZhciBhbGlnbmVkX2FsbG9jID0gZXhwb3J0cy5hbGlnbmVkX2FsbG9jOwogICAgdmFyIHdvcmtlckJpYXNBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIGJpYXMubGVuZ3RoICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgIGlmICh3b3JrZXJCaWFzQWRkcmVzcykgewogICAgICBtZW1BbGxvYy5zZXQobWVtQWRkcmVzcywgewogICAgICAgIGFsbG9jU2l6ZTogYmlhcy5sZW5ndGggKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsCiAgICAgICAgd29ya2VyTWVtQWRkcmVzczogd29ya2VyQmlhc0FkZHJlc3MKICAgICAgfSk7CiAgICAgIHZhciBtZW1vcnlCdWZmZXJGbG9hdDMyID0gbmV3IEZsb2F0MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgbWVtb3J5QnVmZmVyRmxvYXQzMi5zZXQoYmlhcywgd29ya2VyQmlhc0FkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgfQogIH07CiAgdmFyIHdlaWdodEJsb2NrTWl4ZWQxNng4Rm9yd2FyZFNpbmdsZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7CiAgICB2YXIgX3JlZjIgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL19yZWdlbmVyYXRvclJ1bnRpbWUkMS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUyKGRhdGEpIHsKICAgICAgdmFyIF9kYXRhJGdsb2JhbHM0LCBleHBvcnRzLCBtZW1BbGxvYywgbWVtb3J5LCBzaGFwZSwgaW5kaWNlc0FkZHJlc3MsIGJpdERlcHRoU3RhcnRzLCBiaXREZXB0aHMsIG1ldGFzQWRkcmVzcywgYmxvY2tzQWRkcmVzcywgeE9mZnNldCwgeEJ1ZmZlciwgYmlhc0FkZHJlc3MsIGFsaWduZWRfYWxsb2MsIGZyZWUsIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfZm9yd2FyZF9zaW5nbGUsIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfYWRkX2JpYXMsIF9tZW1BbGxvYyRnZXQsIHdvcmtlckluZGljZXNBZGRyZXNzLCBfbWVtQWxsb2MkZ2V0Miwgd29ya2VyTWV0YXNBZGRyZXNzLCBfbWVtQWxsb2MkZ2V0Mywgd29ya2VyQmxvY2tzQWRkcmVzcywgc2hhcGVBZGRyZXNzLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIGJpdERlcHRoc0FkZHJlc3MsIHdvcmtlclhBZGRyZXNzLCB3b3JrZXJZQWRkcmVzcywgbWVtb3J5QnVmZmVyRmxvYXQzMiwgbWVtb3J5QnVmZmVySW50MzIsIF9tZW1BbGxvYyRnZXQ0LCB3b3JrZXJCaWFzQWRkcmVzcywgYWxsb2NTaXplLCBkaW1lbnNpb24sIHJlczsKICAgICAgcmV0dXJuIF9yZWdlbmVyYXRvclJ1bnRpbWUkMS53cmFwKGZ1bmN0aW9uIF9jYWxsZWUyJChfY29udGV4dDIpIHsKICAgICAgICB3aGlsZSAoMSkgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7CiAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgIF9kYXRhJGdsb2JhbHM0ID0gZGF0YS5nbG9iYWxzLCBleHBvcnRzID0gX2RhdGEkZ2xvYmFsczQuZXhwb3J0cywgbWVtQWxsb2MgPSBfZGF0YSRnbG9iYWxzNC5tZW1BbGxvYywgbWVtb3J5ID0gX2RhdGEkZ2xvYmFsczQubWVtb3J5OwogICAgICAgICAgICBzaGFwZSA9IGRhdGEuc2hhcGUsIGluZGljZXNBZGRyZXNzID0gZGF0YS5pbmRpY2VzQWRkcmVzcywgYml0RGVwdGhTdGFydHMgPSBkYXRhLmJpdERlcHRoU3RhcnRzLCBiaXREZXB0aHMgPSBkYXRhLmJpdERlcHRocywgbWV0YXNBZGRyZXNzID0gZGF0YS5tZXRhc0FkZHJlc3MsIGJsb2Nrc0FkZHJlc3MgPSBkYXRhLmJsb2Nrc0FkZHJlc3MsIHhPZmZzZXQgPSBkYXRhLnhPZmZzZXQsIHhCdWZmZXIgPSBkYXRhLnhCdWZmZXIsIGJpYXNBZGRyZXNzID0gZGF0YS5iaWFzQWRkcmVzczsKICAgICAgICAgICAgYWxpZ25lZF9hbGxvYyA9IGV4cG9ydHMuYWxpZ25lZF9hbGxvYywgZnJlZSA9IGV4cG9ydHMuZnJlZSwgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9mb3J3YXJkX3NpbmdsZSA9IGV4cG9ydHMucHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9mb3J3YXJkX3NpbmdsZSwgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9hZGRfYmlhcyA9IGV4cG9ydHMucHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9hZGRfYmlhczsKICAgICAgICAgICAgX21lbUFsbG9jJGdldCA9IG1lbUFsbG9jLmdldChpbmRpY2VzQWRkcmVzcyksIHdvcmtlckluZGljZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgICAgICAgICBfbWVtQWxsb2MkZ2V0MiA9IG1lbUFsbG9jLmdldChtZXRhc0FkZHJlc3MpLCB3b3JrZXJNZXRhc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Mi53b3JrZXJNZW1BZGRyZXNzOwogICAgICAgICAgICBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldChibG9ja3NBZGRyZXNzKSwgd29ya2VyQmxvY2tzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQzLndvcmtlck1lbUFkZHJlc3M7CiAgICAgICAgICAgIHNoYXBlQWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIHNoYXBlLmxlbmd0aCk7CiAgICAgICAgICAgIGJpdERlcHRoc1N0YXJ0QWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIGJpdERlcHRoU3RhcnRzLmxlbmd0aCk7CiAgICAgICAgICAgIGJpdERlcHRoc0FkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBiaXREZXB0aHMubGVuZ3RoKTsKICAgICAgICAgICAgd29ya2VyWEFkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKDI1NiwgRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogeEJ1ZmZlci5sZW5ndGgpOwogICAgICAgICAgICB3b3JrZXJZQWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoMjU2LCBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBzaGFwZVswXSk7CiAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckZsb2F0MzIgPSBuZXcgRmxvYXQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMiA9IG5ldyBJbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoc2hhcGUsIHNoYXBlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoYml0RGVwdGhTdGFydHMsIGJpdERlcHRoc1N0YXJ0QWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMi5zZXQoYml0RGVwdGhzLCBiaXREZXB0aHNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckZsb2F0MzIuc2V0KHhCdWZmZXIsIHdvcmtlclhBZGRyZXNzIC8gRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICAgICAgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9mb3J3YXJkX3NpbmdsZShzaGFwZUFkZHJlc3MsIHdvcmtlckluZGljZXNBZGRyZXNzLCBiaXREZXB0aHMubGVuZ3RoLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIGJpdERlcHRoc0FkZHJlc3MsIHdvcmtlck1ldGFzQWRkcmVzcywgd29ya2VyQmxvY2tzQWRkcmVzcywgd29ya2VyWEFkZHJlc3MgKyB4T2Zmc2V0LCB3b3JrZXJZQWRkcmVzcyk7CiAgICAgICAgICAgIGlmIChtZW1BbGxvYy5oYXMoYmlhc0FkZHJlc3MpKSB7CiAgICAgICAgICAgICAgX21lbUFsbG9jJGdldDQgPSBtZW1BbGxvYy5nZXQoYmlhc0FkZHJlc3MpLCB3b3JrZXJCaWFzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ0Lndvcmtlck1lbUFkZHJlc3MsIGFsbG9jU2l6ZSA9IF9tZW1BbGxvYyRnZXQ0LmFsbG9jU2l6ZTsKICAgICAgICAgICAgICBkaW1lbnNpb24gPSBhbGxvY1NpemUgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQ7CiAgICAgICAgICAgICAgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9hZGRfYmlhcygxLCBkaW1lbnNpb24sIHdvcmtlcllBZGRyZXNzLCB3b3JrZXJCaWFzQWRkcmVzcyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmVzID0gbmV3IEZsb2F0MzJBcnJheShtZW1vcnkuYnVmZmVyKS5zbGljZSh3b3JrZXJZQWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgd29ya2VyWUFkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKyBzaGFwZVswXSk7CiAgICAgICAgICAgIGZyZWUoc2hhcGVBZGRyZXNzKTsKICAgICAgICAgICAgZnJlZShiaXREZXB0aHNTdGFydEFkZHJlc3MpOwogICAgICAgICAgICBmcmVlKGJpdERlcHRoc0FkZHJlc3MpOwogICAgICAgICAgICBmcmVlKHdvcmtlclhBZGRyZXNzKTsKICAgICAgICAgICAgZnJlZSh3b3JrZXJZQWRkcmVzcyk7CiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuYWJydXB0KCJyZXR1cm4iLCByZXMpOwogICAgICAgICAgY2FzZSAyNjoKICAgICAgICAgIGNhc2UgImVuZCI6CiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpOwogICAgICAgIH0KICAgICAgfSwgX2NhbGxlZTIpOwogICAgfSkpOwogICAgcmV0dXJuIGZ1bmN0aW9uIHdlaWdodEJsb2NrTWl4ZWQxNng4Rm9yd2FyZFNpbmdsZShfeDIpIHsKICAgICAgcmV0dXJuIF9yZWYyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7CiAgICB9OwogIH0oKTsKICB2YXIgd2VpZ2h0QmxvY2tNaXhlZDE2eDhGb3J3YXJkTXVsdGlwbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgdmFyIF9yZWYzID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lJDEubWFyayhmdW5jdGlvbiBfY2FsbGVlMyhkYXRhKSB7CiAgICAgIHZhciBfZGF0YSRnbG9iYWxzNSwgZXhwb3J0cywgbWVtQWxsb2MsIG1lbW9yeSwgc2hhcGUsIGluZGljZXNBZGRyZXNzLCBiaXREZXB0aFN0YXJ0cywgYml0RGVwdGhzLCBtZXRhc0FkZHJlc3MsIGJsb2Nrc0FkZHJlc3MsIG4sIHhPZmZzZXQsIHhCdWZmZXIsIGJpYXNBZGRyZXNzLCBhbGlnbmVkX2FsbG9jLCBmcmVlLCBwdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X2ZvcndhcmRfbXVsdGlwbGUsIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfYWRkX2JpYXMsIF9tZW1BbGxvYyRnZXQ1LCB3b3JrZXJJbmRpY2VzQWRkcmVzcywgX21lbUFsbG9jJGdldDYsIHdvcmtlck1ldGFzQWRkcmVzcywgX21lbUFsbG9jJGdldDcsIHdvcmtlckJsb2Nrc0FkZHJlc3MsIHNoYXBlQWRkcmVzcywgYml0RGVwdGhzU3RhcnRBZGRyZXNzLCBiaXREZXB0aHNBZGRyZXNzLCB3b3JrZXJYQWRkcmVzcywgd29ya2VyWUFkZHJlc3MsIG1lbW9yeUJ1ZmZlckZsb2F0MzIsIG1lbW9yeUJ1ZmZlckludDMyLCBfbWVtQWxsb2MkZ2V0OCwgd29ya2VyQmlhc0FkZHJlc3MsIGFsbG9jU2l6ZSwgZGltZW5zaW9uLCByZXM7CiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lJDEud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7CiAgICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkgewogICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICBfZGF0YSRnbG9iYWxzNSA9IGRhdGEuZ2xvYmFscywgZXhwb3J0cyA9IF9kYXRhJGdsb2JhbHM1LmV4cG9ydHMsIG1lbUFsbG9jID0gX2RhdGEkZ2xvYmFsczUubWVtQWxsb2MsIG1lbW9yeSA9IF9kYXRhJGdsb2JhbHM1Lm1lbW9yeTsKICAgICAgICAgICAgc2hhcGUgPSBkYXRhLnNoYXBlLCBpbmRpY2VzQWRkcmVzcyA9IGRhdGEuaW5kaWNlc0FkZHJlc3MsIGJpdERlcHRoU3RhcnRzID0gZGF0YS5iaXREZXB0aFN0YXJ0cywgYml0RGVwdGhzID0gZGF0YS5iaXREZXB0aHMsIG1ldGFzQWRkcmVzcyA9IGRhdGEubWV0YXNBZGRyZXNzLCBibG9ja3NBZGRyZXNzID0gZGF0YS5ibG9ja3NBZGRyZXNzLCBuID0gZGF0YS5uLCB4T2Zmc2V0ID0gZGF0YS54T2Zmc2V0LCB4QnVmZmVyID0gZGF0YS54QnVmZmVyLCBiaWFzQWRkcmVzcyA9IGRhdGEuYmlhc0FkZHJlc3M7CiAgICAgICAgICAgIGFsaWduZWRfYWxsb2MgPSBleHBvcnRzLmFsaWduZWRfYWxsb2MsIGZyZWUgPSBleHBvcnRzLmZyZWUsIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfZm9yd2FyZF9tdWx0aXBsZSA9IGV4cG9ydHMucHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9mb3J3YXJkX211bHRpcGxlLCBwdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X2FkZF9iaWFzID0gZXhwb3J0cy5wdl9waWNvbGxtX3dlaWdodF9ibG9ja19taXhlZF8xNng4X2FkZF9iaWFzOwogICAgICAgICAgICBfbWVtQWxsb2MkZ2V0NSA9IG1lbUFsbG9jLmdldChpbmRpY2VzQWRkcmVzcyksIHdvcmtlckluZGljZXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDUud29ya2VyTWVtQWRkcmVzczsKICAgICAgICAgICAgX21lbUFsbG9jJGdldDYgPSBtZW1BbGxvYy5nZXQobWV0YXNBZGRyZXNzKSwgd29ya2VyTWV0YXNBZGRyZXNzID0gX21lbUFsbG9jJGdldDYud29ya2VyTWVtQWRkcmVzczsKICAgICAgICAgICAgX21lbUFsbG9jJGdldDcgPSBtZW1BbGxvYy5nZXQoYmxvY2tzQWRkcmVzcyksIHdvcmtlckJsb2Nrc0FkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Ny53b3JrZXJNZW1BZGRyZXNzOwogICAgICAgICAgICBzaGFwZUFkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBzaGFwZS5sZW5ndGgpOwogICAgICAgICAgICBiaXREZXB0aHNTdGFydEFkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKiBiaXREZXB0aFN0YXJ0cy5sZW5ndGgpOwogICAgICAgICAgICBiaXREZXB0aHNBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogYml0RGVwdGhzLmxlbmd0aCk7CiAgICAgICAgICAgIHdvcmtlclhBZGRyZXNzID0gYWxpZ25lZF9hbGxvYyhGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCAqIHhCdWZmZXIubGVuZ3RoKTsKICAgICAgICAgICAgd29ya2VyWUFkZHJlc3MgPSBhbGlnbmVkX2FsbG9jKEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UICogKHNoYXBlWzBdICogbikpOwogICAgICAgICAgICBtZW1vcnlCdWZmZXJGbG9hdDMyID0gbmV3IEZsb2F0MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzIuc2V0KHNoYXBlLCBzaGFwZUFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzIuc2V0KGJpdERlcHRoU3RhcnRzLCBiaXREZXB0aHNTdGFydEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UKTsKICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzIuc2V0KGJpdERlcHRocywgYml0RGVwdGhzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICAgICAgICBtZW1vcnlCdWZmZXJGbG9hdDMyLnNldCh4QnVmZmVyLCB3b3JrZXJYQWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCk7CiAgICAgICAgICAgIHB2X3BpY29sbG1fd2VpZ2h0X2Jsb2NrX21peGVkXzE2eDhfZm9yd2FyZF9tdWx0aXBsZShzaGFwZUFkZHJlc3MsIHdvcmtlckluZGljZXNBZGRyZXNzLCBiaXREZXB0aHMubGVuZ3RoLCBiaXREZXB0aHNTdGFydEFkZHJlc3MsIGJpdERlcHRoc0FkZHJlc3MsIHdvcmtlck1ldGFzQWRkcmVzcywgd29ya2VyQmxvY2tzQWRkcmVzcywgbiwgd29ya2VyWEFkZHJlc3MgKyB4T2Zmc2V0LCB3b3JrZXJZQWRkcmVzcyk7CiAgICAgICAgICAgIGlmIChtZW1BbGxvYy5oYXMoYmlhc0FkZHJlc3MpKSB7CiAgICAgICAgICAgICAgX21lbUFsbG9jJGdldDggPSBtZW1BbGxvYy5nZXQoYmlhc0FkZHJlc3MpLCB3b3JrZXJCaWFzQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQ4Lndvcmtlck1lbUFkZHJlc3MsIGFsbG9jU2l6ZSA9IF9tZW1BbGxvYyRnZXQ4LmFsbG9jU2l6ZTsKICAgICAgICAgICAgICBkaW1lbnNpb24gPSBhbGxvY1NpemUgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQ7CiAgICAgICAgICAgICAgcHZfcGljb2xsbV93ZWlnaHRfYmxvY2tfbWl4ZWRfMTZ4OF9hZGRfYmlhcyhuLCBkaW1lbnNpb24sIHdvcmtlcllBZGRyZXNzLCB3b3JrZXJCaWFzQWRkcmVzcyk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmVzID0gbmV3IEZsb2F0MzJBcnJheShtZW1vcnkuYnVmZmVyKS5zbGljZSh3b3JrZXJZQWRkcmVzcyAvIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgd29ya2VyWUFkZHJlc3MgLyBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQgKyBzaGFwZVswXSAqIG4pOwogICAgICAgICAgICBmcmVlKHNoYXBlQWRkcmVzcyk7CiAgICAgICAgICAgIGZyZWUoYml0RGVwdGhzU3RhcnRBZGRyZXNzKTsKICAgICAgICAgICAgZnJlZShiaXREZXB0aHNBZGRyZXNzKTsKICAgICAgICAgICAgZnJlZSh3b3JrZXJYQWRkcmVzcyk7CiAgICAgICAgICAgIGZyZWUod29ya2VyWUFkZHJlc3MpOwogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLmFicnVwdCgicmV0dXJuIiwgcmVzKTsKICAgICAgICAgIGNhc2UgMjY6CiAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQzLnN0b3AoKTsKICAgICAgICB9CiAgICAgIH0sIF9jYWxsZWUzKTsKICAgIH0pKTsKICAgIHJldHVybiBmdW5jdGlvbiB3ZWlnaHRCbG9ja01peGVkMTZ4OEZvcndhcmRNdWx0aXBsZShfeDMpIHsKICAgICAgcmV0dXJuIF9yZWYzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7CiAgICB9OwogIH0oKTsKICB2YXIgcHZQaWNvbGxtV2VpZ2h0QWN0aW9uTWFwID0gX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eSh7fSwgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uLldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X1BSRVBST0NFU1NfQkxPQ0tTLCB3ZWlnaHRCbG9ja01peGVkMTZ4OFByZXByb2Nlc3NCbG9ja3MpLCBQdlBpY29sbG1XZWlnaHRBY3Rpb24uV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfUFJFUFJPQ0VTU19NRVRBUywgd2VpZ2h0QmxvY2tNaXhlZDE2eDhQcmVwcm9jZXNzTWV0YXMpLCBQdlBpY29sbG1XZWlnaHRBY3Rpb24uV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfUFJFUFJPQ0VTU19CSUFTLCB3ZWlnaHRCbG9ja01peGVkMTZ4OFByZXByb2Nlc3NCaWFzKSwgUHZQaWNvbGxtV2VpZ2h0QWN0aW9uLldFSUdIVF9CTE9DS19NSVhFRF8xNlg4X0ZPUldBUkRfU0lOR0xFLCB3ZWlnaHRCbG9ja01peGVkMTZ4OEZvcndhcmRTaW5nbGUpLCBQdlBpY29sbG1XZWlnaHRBY3Rpb24uV0VJR0hUX0JMT0NLX01JWEVEXzE2WDhfRk9SV0FSRF9NVUxUSVBMRSwgd2VpZ2h0QmxvY2tNaXhlZDE2eDhGb3J3YXJkTXVsdGlwbGUpOwoKICBmdW5jdGlvbiBvd25LZXlzKGUsIHIpIHsgdmFyIHQgPSBPYmplY3Qua2V5cyhlKTsgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHsgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGUpOyByICYmIChvID0gby5maWx0ZXIoZnVuY3Rpb24gKHIpIHsgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSwgcikuZW51bWVyYWJsZTsgfSkpLCB0LnB1c2guYXBwbHkodCwgbyk7IH0gcmV0dXJuIHQ7IH0KICBmdW5jdGlvbiBfb2JqZWN0U3ByZWFkKGUpIHsgZm9yICh2YXIgciA9IDE7IHIgPCBhcmd1bWVudHMubGVuZ3RoOyByKyspIHsgdmFyIHQgPSBudWxsICE9IGFyZ3VtZW50c1tyXSA/IGFyZ3VtZW50c1tyXSA6IHt9OyByICUgMiA/IG93bktleXMoT2JqZWN0KHQpLCAhMCkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBfZGVmaW5lUHJvcGVydHkoZSwgciwgdFtyXSk7IH0pIDogT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0KSkgOiBvd25LZXlzKE9iamVjdCh0KSkuZm9yRWFjaChmdW5jdGlvbiAocikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgciwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKSk7IH0pOyB9IHJldHVybiBlOyB9CiAgdmFyIGV4cG9ydHMkMTsKICB2YXIgbWVtb3J5OwogIHZhciBtZW1BbGxvYyA9IG5ldyBNYXAoKTsKICBmdW5jdGlvbiBhcnJheUJ1ZmZlclRvU3RyaW5nQXRJbmRleChhcnJheUJ1ZmZlciwgaW5kZXhTdGFydCkgewogICAgdmFyIGluZGV4RW5kID0gaW5kZXhTdGFydDsKICAgIHdoaWxlIChhcnJheUJ1ZmZlcltpbmRleEVuZF0gIT09IDApIHsKICAgICAgaW5kZXhFbmQrKzsKICAgIH0KICAgIHZhciB1dGY4ZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTsKICAgIHJldHVybiB1dGY4ZGVjb2Rlci5kZWNvZGUoYXJyYXlCdWZmZXIuc3ViYXJyYXkoaW5kZXhTdGFydCwgaW5kZXhFbmQpKTsKICB9CiAgdmFyIGdldFdhc20gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgdmFyIF9yZWYgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL19yZWdlbmVyYXRvclJ1bnRpbWUkMS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUod2FzbSkgewogICAgICB2YXIgcHZDb25zb2xlTG9nV2FzbSwgcHZBc3NlcnRXYXNtLCBwdlRpbWVXYXNtLCBwdkZpbGVPcGVuV2FzbSwgcHZGaWxlQ2xvc2VXYXNtLCBwdkZpbGVSZWFkV2FzbSwgcHZGaWxlV3JpdGVXYXNtLCBwdkZpbGVTZWVrV2FzbSwgcHZGaWxlVGVsbFdhc20sIHB2RmlsZVJlbW92ZVdhc20sIGluc3RhbmNlLCBhbGlnbmVkX2FsbG9jLCBhbGlnbmVkQWxsb2M7CiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lJDEud3JhcChmdW5jdGlvbiBfY2FsbGVlJChfY29udGV4dCkgewogICAgICAgIHdoaWxlICgxKSBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7CiAgICAgICAgICBjYXNlIDA6CiAgICAgICAgICAgIHB2Q29uc29sZUxvZ1dhc20gPSBmdW5jdGlvbiBwdkNvbnNvbGVMb2dXYXNtKGluZGV4KSB7CiAgICAgICAgICAgICAgaW5kZXggPSB1bnNpZ25lZEFkZHJlc3MoaW5kZXgpOwogICAgICAgICAgICAgIHZhciBtZW1vcnlCdWZmZXJVaW50OCA9IG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlCiAgICAgICAgICAgICAgY29uc29sZS5sb2coYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIGluZGV4KSk7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHB2QXNzZXJ0V2FzbSA9IGZ1bmN0aW9uIHB2QXNzZXJ0V2FzbShleHByLCBsaW5lLCBmaWxlTmFtZUFkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlTmFtZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZU5hbWVBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICBpZiAoZXhwciA9PT0gMCkgewogICAgICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIGZpbGVOYW1lQWRkcmVzcyk7CiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoImFzc2VydGlvbiBmYWlsZWQgYXQgbGluZSAiLmNvbmNhdChsaW5lLCAiIGluIFwiIikuY29uY2F0KGZpbGVOYW1lLCAiXCIiKSk7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdlRpbWVXYXNtID0gZnVuY3Rpb24gcHZUaW1lV2FzbSgpIHsKICAgICAgICAgICAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwOwogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVPcGVuV2FzbSA9IGZ1bmN0aW9uIHB2RmlsZU9wZW5XYXNtKGZpbGVBZGRyZXNzLCBwYXRoQWRkcmVzcywgbW9kZUFkZHJlc3MsIHN0YXR1c0FkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgcGF0aEFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MocGF0aEFkZHJlc3MpOwogICAgICAgICAgICAgIG1vZGVBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKG1vZGVBZGRyZXNzKTsKICAgICAgICAgICAgICBzdGF0dXNBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKHN0YXR1c0FkZHJlc3MpOwogICAgICAgICAgICAgIHZhciBtZW1vcnlCdWZmZXJVaW50OCA9IG5ldyBVaW50OEFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIHZhciBtZW1vcnlCdWZmZXJJbnQzMiA9IG5ldyBJbnQzMkFycmF5KG1lbW9yeS5idWZmZXIpOwogICAgICAgICAgICAgIHZhciBwYXRoID0gYXJyYXlCdWZmZXJUb1N0cmluZ0F0SW5kZXgobWVtb3J5QnVmZmVyVWludDgsIHBhdGhBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbW9kZSA9IGFycmF5QnVmZmVyVG9TdHJpbmdBdEluZGV4KG1lbW9yeUJ1ZmZlclVpbnQ4LCBtb2RlQWRkcmVzcyk7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLm9wZW4ocGF0aCwgbW9kZSk7CiAgICAgICAgICAgICAgICBQdkZpbGVNZW0uc2V0UHRyKGZpbGVBZGRyZXNzLCBmaWxlKTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW3N0YXR1c0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IDA7CiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbc3RhdHVzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gLTE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVDbG9zZVdhc20gPSBmdW5jdGlvbiBwdkZpbGVDbG9zZVdhc20oZmlsZUFkZHJlc3MsIHN0YXR1c0FkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgc3RhdHVzQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhzdGF0dXNBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uZ2V0UHRyKGZpbGVBZGRyZXNzKTsKICAgICAgICAgICAgICAgIGZpbGUuY2xvc2UoKTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW3N0YXR1c0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IDA7CiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkgewogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbc3RhdHVzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gLTE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVSZWFkV2FzbSA9IGZ1bmN0aW9uIHB2RmlsZVJlYWRXYXNtKGZpbGVBZGRyZXNzLCBjb250ZW50QWRkcmVzcywgc2l6ZSwgY291bnQsIG51bVJlYWRBZGRyZXNzKSB7CiAgICAgICAgICAgICAgZmlsZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZUFkZHJlc3MpOwogICAgICAgICAgICAgIGNvbnRlbnRBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKGNvbnRlbnRBZGRyZXNzKTsKICAgICAgICAgICAgICBudW1SZWFkQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhudW1SZWFkQWRkcmVzcyk7CiAgICAgICAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlclVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlckludDMyID0gbmV3IEludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLmdldFB0cihmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IGZpbGUucmVhZChzaXplLCBjb3VudCk7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJVaW50OC5zZXQoY29udGVudCwgY29udGVudEFkZHJlc3MpOwogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbbnVtUmVhZEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IGNvbnRlbnQubGVuZ3RoIC8gc2l6ZTsKICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMltudW1SZWFkQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gLTE7CiAgICAgICAgICAgICAgfQogICAgICAgICAgICB9OwogICAgICAgICAgICBwdkZpbGVXcml0ZVdhc20gPSBmdW5jdGlvbiBwdkZpbGVXcml0ZVdhc20oZmlsZUFkZHJlc3MsIGNvbnRlbnRBZGRyZXNzLCBzaXplLCBjb3VudCwgbnVtV3JpdGVBZGRyZXNzKSB7CiAgICAgICAgICAgICAgZmlsZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZUFkZHJlc3MpOwogICAgICAgICAgICAgIGNvbnRlbnRBZGRyZXNzID0gdW5zaWduZWRBZGRyZXNzKGNvbnRlbnRBZGRyZXNzKTsKICAgICAgICAgICAgICBudW1Xcml0ZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MobnVtV3JpdGVBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uZ2V0UHRyKGZpbGVBZGRyZXNzKTsKICAgICAgICAgICAgICAgIHZhciBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSAqIGNvdW50KTsKICAgICAgICAgICAgICAgIGNvbnRlbnQuc2V0KG1lbW9yeUJ1ZmZlclVpbnQ4LnNsaWNlKGNvbnRlbnRBZGRyZXNzLCBjb250ZW50QWRkcmVzcyArIHNpemUgKiBjb3VudCksIDApOwogICAgICAgICAgICAgICAgZmlsZS53cml0ZShjb250ZW50KTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW251bVdyaXRlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gY29udGVudC5sZW5ndGggLyBzaXplOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW251bVdyaXRlQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gMTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHB2RmlsZVNlZWtXYXNtID0gZnVuY3Rpb24gcHZGaWxlU2Vla1dhc20oZmlsZUFkZHJlc3MsIG9mZnNldCwgd2hlbmNlLCBzdGF0dXNBZGRyZXNzKSB7CiAgICAgICAgICAgICAgZmlsZUFkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3MoZmlsZUFkZHJlc3MpOwogICAgICAgICAgICAgIHN0YXR1c0FkZHJlc3MgPSB1bnNpZ25lZEFkZHJlc3Moc3RhdHVzQWRkcmVzcyk7CiAgICAgICAgICAgICAgdmFyIG1lbW9yeUJ1ZmZlckludDMyID0gbmV3IEludDMyQXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLmdldFB0cihmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgICBmaWxlLnNlZWsob2Zmc2V0LCB3aGVuY2UpOwogICAgICAgICAgICAgICAgbWVtb3J5QnVmZmVySW50MzJbc3RhdHVzQWRkcmVzcyAvIEludDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlRdID0gMDsKICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMltzdGF0dXNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVF0gPSAtMTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHB2RmlsZVRlbGxXYXNtID0gZnVuY3Rpb24gcHZGaWxlVGVsbFdhc20oZmlsZUFkZHJlc3MsIG9mZnNldEFkZHJlc3MpIHsKICAgICAgICAgICAgICBmaWxlQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhmaWxlQWRkcmVzcyk7CiAgICAgICAgICAgICAgb2Zmc2V0QWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhvZmZzZXRBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBQdkZpbGVNZW0uZ2V0UHRyKGZpbGVBZGRyZXNzKTsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW29mZnNldEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IGZpbGUudGVsbCgpOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW29mZnNldEFkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IC0xOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgICAgcHZGaWxlUmVtb3ZlV2FzbSA9IGZ1bmN0aW9uIHB2RmlsZVJlbW92ZVdhc20ocGF0aEFkZHJlc3MsIHN0YXR1c0FkZHJlc3MpIHsKICAgICAgICAgICAgICBwYXRoQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhwYXRoQWRkcmVzcyk7CiAgICAgICAgICAgICAgc3RhdHVzQWRkcmVzcyA9IHVuc2lnbmVkQWRkcmVzcyhzdGF0dXNBZGRyZXNzKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB2YXIgbWVtb3J5QnVmZmVySW50MzIgPSBuZXcgSW50MzJBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgICAgICAgICAgICB2YXIgcGF0aCA9IGFycmF5QnVmZmVyVG9TdHJpbmdBdEluZGV4KG1lbW9yeUJ1ZmZlclVpbnQ4LCBwYXRoQWRkcmVzcyk7CiAgICAgICAgICAgICAgdHJ5IHsKICAgICAgICAgICAgICAgIHZhciBmaWxlID0gUHZGaWxlTWVtLm9wZW4ocGF0aCwgInciKTsKICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlKCk7CiAgICAgICAgICAgICAgICBtZW1vcnlCdWZmZXJJbnQzMltzdGF0dXNBZGRyZXNzIC8gSW50MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVF0gPSAwOwogICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsKICAgICAgICAgICAgICAgIG1lbW9yeUJ1ZmZlckludDMyW3N0YXR1c0FkZHJlc3MgLyBJbnQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5UXSA9IC0xOwogICAgICAgICAgICAgIH0KICAgICAgICAgICAgfTsKICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDEyOwogICAgICAgICAgICByZXR1cm4gV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUod2FzbSwgewogICAgICAgICAgICAgIHdhc2lfc25hcHNob3RfcHJldmlldzE6IHdhc2lfc25hcHNob3RfcHJldmlldzFfZW11bGF0b3IsCiAgICAgICAgICAgICAgZW52OiB7CiAgICAgICAgICAgICAgICBtZW1vcnk6IG1lbW9yeSwKICAgICAgICAgICAgICAgIHB2X2NvbnNvbGVfbG9nX3dhc206IHB2Q29uc29sZUxvZ1dhc20sCiAgICAgICAgICAgICAgICBwdl9hc3NlcnRfd2FzbTogcHZBc3NlcnRXYXNtLAogICAgICAgICAgICAgICAgcHZfdGltZV93YXNtOiBwdlRpbWVXYXNtLAogICAgICAgICAgICAgICAgcHZfZmlsZV9vcGVuX3dhc206IHB2RmlsZU9wZW5XYXNtLAogICAgICAgICAgICAgICAgcHZfZmlsZV9jbG9zZV93YXNtOiBwdkZpbGVDbG9zZVdhc20sCiAgICAgICAgICAgICAgICBwdl9maWxlX3JlYWRfd2FzbTogcHZGaWxlUmVhZFdhc20sCiAgICAgICAgICAgICAgICBwdl9maWxlX3dyaXRlX3dhc206IHB2RmlsZVdyaXRlV2FzbSwKICAgICAgICAgICAgICAgIHB2X2ZpbGVfc2Vla193YXNtOiBwdkZpbGVTZWVrV2FzbSwKICAgICAgICAgICAgICAgIHB2X2ZpbGVfdGVsbF93YXNtOiBwdkZpbGVUZWxsV2FzbSwKICAgICAgICAgICAgICAgIHB2X2ZpbGVfcmVtb3ZlX3dhc206IHB2RmlsZVJlbW92ZVdhc20KICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0pOwogICAgICAgICAgY2FzZSAxMjoKICAgICAgICAgICAgaW5zdGFuY2UgPSBfY29udGV4dC5zZW50Lmluc3RhbmNlOwogICAgICAgICAgICBhbGlnbmVkX2FsbG9jID0gaW5zdGFuY2UuZXhwb3J0cy5hbGlnbmVkX2FsbG9jOwogICAgICAgICAgICBhbGlnbmVkQWxsb2MgPSBmdW5jdGlvbiBhbGlnbmVkQWxsb2MoYWxpZ25tZW50LCBzaXplKSB7CiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lCiAgICAgICAgICAgICAgdmFyIHBvaW50ZXIgPSBhbGlnbmVkX2FsbG9jKGFsaWdubWVudCwgc2l6ZSk7CiAgICAgICAgICAgICAgaWYgKHBvaW50ZXIgPCAwKSB7CiAgICAgICAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciA+Pj4gMDsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgcmV0dXJuIHBvaW50ZXI7CiAgICAgICAgICAgIH07CiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoInJldHVybiIsIF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZCh7fSwgaW5zdGFuY2UuZXhwb3J0cyksIHt9LCB7CiAgICAgICAgICAgICAgYWxpZ25lZF9hbGxvYzogYWxpZ25lZEFsbG9jCiAgICAgICAgICAgIH0pKTsKICAgICAgICAgIGNhc2UgMTY6CiAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpOwogICAgICAgIH0KICAgICAgfSwgX2NhbGxlZSk7CiAgICB9KSk7CiAgICByZXR1cm4gZnVuY3Rpb24gZ2V0V2FzbShfeCkgewogICAgICByZXR1cm4gX3JlZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpOwogICAgfTsKICB9KCk7CiAgdmFyIGluaXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkgewogICAgdmFyIF9yZWYyID0gX2FzeW5jVG9HZW5lcmF0b3IoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3JSdW50aW1lJDEubWFyayhmdW5jdGlvbiBfY2FsbGVlMihkYXRhKSB7CiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lJDEud3JhcChmdW5jdGlvbiBfY2FsbGVlMiQoX2NvbnRleHQyKSB7CiAgICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQyLnByZXYgPSBfY29udGV4dDIubmV4dCkgewogICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICBtZW1vcnkgPSBuZXcgV2ViQXNzZW1ibHkuTWVtb3J5KHsKICAgICAgICAgICAgICBpbml0aWFsOiAxMjgKICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMzsKICAgICAgICAgICAgcmV0dXJuIGdldFdhc20oZGF0YS53YXNtKTsKICAgICAgICAgIGNhc2UgMzoKICAgICAgICAgICAgZXhwb3J0cyQxID0gX2NvbnRleHQyLnNlbnQ7CiAgICAgICAgICBjYXNlIDQ6CiAgICAgICAgICBjYXNlICJlbmQiOgogICAgICAgICAgICByZXR1cm4gX2NvbnRleHQyLnN0b3AoKTsKICAgICAgICB9CiAgICAgIH0sIF9jYWxsZWUyKTsKICAgIH0pKTsKICAgIHJldHVybiBmdW5jdGlvbiBpbml0KF94MikgewogICAgICByZXR1cm4gX3JlZjIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsKICAgIH07CiAgfSgpOwogIHZhciBhbGxvY01lbSA9IGZ1bmN0aW9uIGFsbG9jTWVtKGRhdGEpIHsKICAgIHZhciBzaXplID0gZGF0YS5zaXplLAogICAgICBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzOwogICAgdmFyIF9leHBvcnRzID0gZXhwb3J0cyQxLAogICAgICBhbGlnbmVkX2FsbG9jID0gX2V4cG9ydHMuYWxpZ25lZF9hbGxvYzsKICAgIGlmIChzaXplID4gMCkgewogICAgICB2YXIgd29ya2VyTWVtQWRkcmVzcyA9IGFsaWduZWRfYWxsb2MoVWludDhBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgc2l6ZSAqIFVpbnQ4QXJyYXkuQllURVNfUEVSX0VMRU1FTlQpOwogICAgICBtZW1BbGxvYy5zZXQobWVtQWRkcmVzcywgewogICAgICAgIGFsbG9jU2l6ZTogc2l6ZSwKICAgICAgICB3b3JrZXJNZW1BZGRyZXNzOiB3b3JrZXJNZW1BZGRyZXNzCiAgICAgIH0pOwogICAgfQogIH07CiAgdmFyIGZyZWVNZW0gPSBmdW5jdGlvbiBmcmVlTWVtKGRhdGEpIHsKICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzOwogICAgdmFyIF9leHBvcnRzMiA9IGV4cG9ydHMkMSwKICAgICAgZnJlZSA9IF9leHBvcnRzMi5mcmVlOwogICAgaWYgKG1lbUFsbG9jLmhhcyhtZW1BZGRyZXNzKSkgewogICAgICB2YXIgX21lbUFsbG9jJGdldCA9IG1lbUFsbG9jLmdldChtZW1BZGRyZXNzKSwKICAgICAgICB3b3JrZXJNZW1BZGRyZXNzID0gX21lbUFsbG9jJGdldC53b3JrZXJNZW1BZGRyZXNzOwogICAgICBmcmVlKHdvcmtlck1lbUFkZHJlc3MpOwogICAgICBtZW1BbGxvY1siZGVsZXRlIl0obWVtQWRkcmVzcyk7CiAgICB9CiAgfTsKICB2YXIgY29weVRvWHB1ID0gZnVuY3Rpb24gY29weVRvWHB1KGRhdGEpIHsKICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzLAogICAgICBvZmZzZXQgPSBkYXRhLm9mZnNldCwKICAgICAgYnVmZmVyID0gZGF0YS5idWZmZXI7CiAgICB2YXIgX21lbUFsbG9jJGdldDIgPSBtZW1BbGxvYy5nZXQobWVtQWRkcmVzcyksCiAgICAgIHdvcmtlck1lbUFkZHJlc3MgPSBfbWVtQWxsb2MkZ2V0Mi53b3JrZXJNZW1BZGRyZXNzOwogICAgdmFyIG1lbW9yeUJ1ZmZlclVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICBtZW1vcnlCdWZmZXJVaW50OC5zZXQoYnVmZmVyLCB3b3JrZXJNZW1BZGRyZXNzICsgb2Zmc2V0KTsKICB9OwogIHZhciBjb3B5RnJvbVhwdSA9IGZ1bmN0aW9uIGNvcHlGcm9tWHB1KGRhdGEpIHsKICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzLAogICAgICBvZmZzZXQgPSBkYXRhLm9mZnNldCwKICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTsKICAgIHZhciBfbWVtQWxsb2MkZ2V0MyA9IG1lbUFsbG9jLmdldChtZW1BZGRyZXNzKSwKICAgICAgd29ya2VyTWVtQWRkcmVzcyA9IF9tZW1BbGxvYyRnZXQzLndvcmtlck1lbUFkZHJlc3M7CiAgICB2YXIgbWVtb3J5QnVmZmVyVWludDggPSBuZXcgVWludDhBcnJheShtZW1vcnkuYnVmZmVyKTsKICAgIHJldHVybiBtZW1vcnlCdWZmZXJVaW50OC5zbGljZSh3b3JrZXJNZW1BZGRyZXNzICsgb2Zmc2V0LCB3b3JrZXJNZW1BZGRyZXNzICsgb2Zmc2V0ICsgc2l6ZSk7CiAgfTsKICB2YXIgbWVtc2V0ID0gZnVuY3Rpb24gbWVtc2V0KGRhdGEpIHsKICAgIHZhciBtZW1BZGRyZXNzID0gZGF0YS5tZW1BZGRyZXNzLAogICAgICBmaWxsQnl0ZSA9IGRhdGEuZmlsbEJ5dGUsCiAgICAgIHNpemUgPSBkYXRhLnNpemU7CiAgICBpZiAobWVtQWxsb2MuaGFzKG1lbUFkZHJlc3MpKSB7CiAgICAgIHZhciBfbWVtQWxsb2MkZ2V0NCA9IG1lbUFsbG9jLmdldChtZW1BZGRyZXNzKSwKICAgICAgICB3b3JrZXJNZW1BZGRyZXNzID0gX21lbUFsbG9jJGdldDQud29ya2VyTWVtQWRkcmVzczsKICAgICAgdmFyIG1lbW9yeUJ1ZmZlclVpbnQ4ID0gbmV3IFVpbnQ4QXJyYXkobWVtb3J5LmJ1ZmZlcik7CiAgICAgIG1lbW9yeUJ1ZmZlclVpbnQ4LmZpbGwoZmlsbEJ5dGUsIHdvcmtlck1lbUFkZHJlc3MsIHdvcmtlck1lbUFkZHJlc3MgKyBzaXplKTsKICAgIH0KICB9OwogIHZhciB0aW1lclN0YXJ0ID0gZnVuY3Rpb24gdGltZXJTdGFydChkYXRhKSB7CiAgICB2YXIgd29ya2VySW5kZXggPSBkYXRhLndvcmtlckluZGV4OwogICAgdmFyIF9leHBvcnRzMyA9IGV4cG9ydHMkMSwKICAgICAgcHZfcGljb2xsbV90aW1lcl9zdGFydF93YXNtID0gX2V4cG9ydHMzLnB2X3BpY29sbG1fdGltZXJfc3RhcnRfd2FzbTsKICAgIGlmIChwdl9waWNvbGxtX3RpbWVyX3N0YXJ0X3dhc20pIHsKICAgICAgcHZfcGljb2xsbV90aW1lcl9zdGFydF93YXNtKHdvcmtlckluZGV4KTsKICAgIH0KICB9OwogIHZhciB0aW1lclN0b3AgPSBmdW5jdGlvbiB0aW1lclN0b3AoKSB7CiAgICB2YXIgX2V4cG9ydHM0ID0gZXhwb3J0cyQxLAogICAgICBwdl9waWNvbGxtX3RpbWVyX3N0b3Bfd2FzbSA9IF9leHBvcnRzNC5wdl9waWNvbGxtX3RpbWVyX3N0b3Bfd2FzbTsKICAgIGlmIChwdl9waWNvbGxtX3RpbWVyX3N0b3Bfd2FzbSkgewogICAgICBwdl9waWNvbGxtX3RpbWVyX3N0b3Bfd2FzbSgpOwogICAgfQogIH07CiAgdmFyIHhwdUFjdGlvbk1hcCA9IF9vYmplY3RTcHJlYWQoX29iamVjdFNwcmVhZChfb2JqZWN0U3ByZWFkKF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoX2RlZmluZVByb3BlcnR5KF9kZWZpbmVQcm9wZXJ0eShfZGVmaW5lUHJvcGVydHkoe30sIFB2WHB1QWN0aW9uLklOSVQsIGluaXQpLCBQdlhwdUFjdGlvbi5BTExPQywgYWxsb2NNZW0pLCBQdlhwdUFjdGlvbi5GUkVFLCBmcmVlTWVtKSwgUHZYcHVBY3Rpb24uQ09QWV9UT19YUFUsIGNvcHlUb1hwdSksIFB2WHB1QWN0aW9uLkNPUFlfRlJPTV9YUFUsIGNvcHlGcm9tWHB1KSwgUHZYcHVBY3Rpb24uTUVNU0VULCBtZW1zZXQpLCBQdlhwdUFjdGlvbi5USU1FUl9TVEFSVCwgdGltZXJTdGFydCksIFB2WHB1QWN0aW9uLlRJTUVSX1NUT1AsIHRpbWVyU3RvcCksIHB2TXZtQWN0aW9uTWFwKSwgcHZQaWNvbGxtQXR0ZW50aW9uQWN0aW9uTWFwKSwgcHZQaWNvbGxtV2VpZ2h0QWN0aW9uTWFwKTsKICBzZWxmLm9ubWVzc2FnZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7CiAgICB2YXIgX3JlZjMgPSBfYXN5bmNUb0dlbmVyYXRvciggLyojX19QVVJFX18qL19yZWdlbmVyYXRvclJ1bnRpbWUkMS5tYXJrKGZ1bmN0aW9uIF9jYWxsZWUzKGV2ZW50KSB7CiAgICAgIHZhciByZXM7CiAgICAgIHJldHVybiBfcmVnZW5lcmF0b3JSdW50aW1lJDEud3JhcChmdW5jdGlvbiBfY2FsbGVlMyQoX2NvbnRleHQzKSB7CiAgICAgICAgd2hpbGUgKDEpIHN3aXRjaCAoX2NvbnRleHQzLnByZXYgPSBfY29udGV4dDMubmV4dCkgewogICAgICAgICAgY2FzZSAwOgogICAgICAgICAgICBpZiAoIShldmVudC5kYXRhLmFjdGlvbiBpbiB4cHVBY3Rpb25NYXApKSB7CiAgICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAxNDsKICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgICAgICBldmVudC5kYXRhLmdsb2JhbHMgPSB7CiAgICAgICAgICAgICAgZXhwb3J0czogZXhwb3J0cyQxLAogICAgICAgICAgICAgIG1lbW9yeTogbWVtb3J5LAogICAgICAgICAgICAgIG1lbUFsbG9jOiBtZW1BbGxvYwogICAgICAgICAgICB9OwogICAgICAgICAgICBfY29udGV4dDMucHJldiA9IDI7CiAgICAgICAgICAgIF9jb250ZXh0My5uZXh0ID0gNTsKICAgICAgICAgICAgcmV0dXJuIHhwdUFjdGlvbk1hcFtldmVudC5kYXRhLmFjdGlvbl0oZXZlbnQuZGF0YSk7CiAgICAgICAgICBjYXNlIDU6CiAgICAgICAgICAgIHJlcyA9IF9jb250ZXh0My5zZW50OwogICAgICAgICAgICBpZiAocmVzKSB7CiAgICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgICAgICAgICAgICBjb21tYW5kOiAnb2snLAogICAgICAgICAgICAgICAgd29ya0lkOiBldmVudC5kYXRhLndvcmtJZCwKICAgICAgICAgICAgICAgIHJlc3VsdDogcmVzCiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlCiAgICAgICAgICAgICAgfSwgW3Jlcy5idWZmZXJdKTsKICAgICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdvaycsCiAgICAgICAgICAgICAgICB3b3JrSWQ6IGV2ZW50LmRhdGEud29ya0lkCiAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgX2NvbnRleHQzLm5leHQgPSAxMjsKICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICBjYXNlIDk6CiAgICAgICAgICAgIF9jb250ZXh0My5wcmV2ID0gOTsKICAgICAgICAgICAgX2NvbnRleHQzLnQwID0gX2NvbnRleHQzWyJjYXRjaCJdKDIpOwogICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgICAgICAgICBjb21tYW5kOiAnZXJyb3InLAogICAgICAgICAgICAgIHdvcmtJZDogZXZlbnQuZGF0YS53b3JrSWQsCiAgICAgICAgICAgICAgbWVzc2FnZTogX2NvbnRleHQzLnQwLm1lc3NhZ2UKICAgICAgICAgICAgfSk7CiAgICAgICAgICBjYXNlIDEyOgogICAgICAgICAgICBfY29udGV4dDMubmV4dCA9IDE1OwogICAgICAgICAgICBicmVhazsKICAgICAgICAgIGNhc2UgMTQ6CiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICAgICAgICAgIGNvbW1hbmQ6ICdmYWlsZWQnLAogICAgICAgICAgICAgIG1lc3NhZ2U6ICJVbnJlY29nbml6ZWQgY29tbWFuZDogIi5jb25jYXQoZXZlbnQuZGF0YS5hY3Rpb24pCiAgICAgICAgICAgIH0pOwogICAgICAgICAgY2FzZSAxNToKICAgICAgICAgIGNhc2UgImVuZCI6CiAgICAgICAgICAgIHJldHVybiBfY29udGV4dDMuc3RvcCgpOwogICAgICAgIH0KICAgICAgfSwgX2NhbGxlZTMsIG51bGwsIFtbMiwgOV1dKTsKICAgIH0pKTsKICAgIHJldHVybiBmdW5jdGlvbiAoX3gzKSB7CiAgICAgIHJldHVybiBfcmVmMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpOwogICAgfTsKICB9KCk7Cgp9KSgpOwoK', null, false);
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

  function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }
  function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
          var _iterator = _createForOfIteratorHelper$3(deviceMem),
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
    }, {
      key: "getUniquePointer",
      value: function getUniquePointer() {
        while (true) {
          var ptr = Math.ceil((performance.now() + Math.random()) * 10e2);
          if (!this.uniquePointers.has(ptr)) {
            this.uniquePointers.add(ptr);
            return ptr;
          }
        }
      }
    }, {
      key: "removeUniquePointer",
      value: function removeUniquePointer(ptr) {
        if (this.uniquePointers.has(ptr)) {
          this.uniquePointers["delete"](ptr);
        }
      }
    }]);
    return PvXpu;
  }();
  _defineProperty(PvXpu, "xpuObjects", new Map());
  _defineProperty(PvXpu, "memoryObjects", new Map());
  _defineProperty(PvXpu, "uniquePointers", new Set());

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$4(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread();
  }

  function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }
  function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var colorMap = new Map();
  function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  function getColor(level) {
    if (!colorMap.has(level)) {
      colorMap.set(level, getRandomColor());
    }
    return colorMap.get(level);
  }
  var PvGraph = /*#__PURE__*/function () {
    function PvGraph() {
      _classCallCheck(this, PvGraph);
      _defineProperty(this, "_names", new Map());
      _defineProperty(this, "_paths", void 0);
      _defineProperty(this, "_stack", void 0);
      _defineProperty(this, "_enabled", void 0);
      _defineProperty(this, "_memory", null);
      this._paths = new Map();
      this._stack = [];
      this._enabled = false;
    }
    _createClass(PvGraph, [{
      key: "addName",
      value: function addName(addr, name) {
        this._names.set(addr, name);
      }
    }, {
      key: "getName",
      value: function getName(addr) {
        return this._names.get(addr);
      }
    }, {
      key: "enabled",
      get: function get() {
        return this._enabled;
      },
      set: function set(value) {
        this._enabled = value;
      }
    }, {
      key: "memory",
      get: function get() {
        return this._memory;
      },
      set: function set(value) {
        this._memory = value;
      }
    }, {
      key: "graphify",
      value: function graphify(originalFunction, inputsIdx, outputIdx, subNameIdx) {
        var overrideStatus = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
        var methodName = originalFunction.name;
        var that = this;
        function replacementFunction() {
          return _replacementFunction.apply(this, arguments);
        }
        function _replacementFunction() {
          _replacementFunction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
            var _len,
              args,
              _key,
              memoryBufferInt32,
              inputs,
              output,
              subName,
              node,
              _args = arguments;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = _args[_key];
                  }
                  if (that.memory && overrideStatus !== undefined) {
                    memoryBufferInt32 = new Int32Array(that.memory.buffer);
                    memoryBufferInt32[args[args.length - 1] / Int32Array.BYTES_PER_ELEMENT] = overrideStatus;
                  }
                  if (that.enabled) {
                    _context.next = 6;
                    break;
                  }
                  _context.next = 5;
                  return originalFunction.apply(originalFunction, args);
                case 5:
                  return _context.abrupt("return");
                case 6:
                  inputs = inputsIdx.map(function (i) {
                    return args[i];
                  });
                  output = outputIdx >= 0 ? args[outputIdx] : outputIdx;
                  subName = subNameIdx ? args[subNameIdx] : undefined;
                  node = new PvNode(methodName, originalFunction, args);
                  node.inputsAddr = inputs;
                  node.output = output;
                  node.subName = that.getName(subName);
                  if (methodName === "pvXpuDeviceMemFree" || methodName === "pvXpuGraphifiedFree") {
                    that.addFreeNode(node, inputs[0]);
                  } else {
                    that.addNode(node, inputs);
                  }
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return _replacementFunction.apply(this, arguments);
        }
        return replacementFunction;
      }
    }, {
      key: "addNode",
      value: function addNode(node, inputs) {
        this._stack.push(node);
        if (!this._paths.has(node)) {
          this._paths.set(node, new Set());
        }
        var _iterator = _createForOfIteratorHelper$2(inputs),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var input = _step.value;
            for (var i = this._stack.length - 2; i >= 0; i--) {
              var n = this._stack[i];
              if (n.output === input) {
                this._paths.get(n).add(node);
                node.inputs.add(n);
                break;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "addFreeNode",
      value: function addFreeNode(node, input) {
        this._stack.push(node);
        if (!this._paths.has(node)) {
          this._paths.set(node, new Set());
        }
        for (var i = this._stack.length - 2; i >= 0; i--) {
          var n = this._stack[i];
          if (n.inputsAddr.includes(input)) {
            this._paths.get(n).add(node);
            node.inputs.add(n);
            break;
          }
        }
      }
    }, {
      key: "executeHelper",
      value: function executeHelper(node) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        node.numVisited++;
        node.level = Math.max(level, node.level);
        if (node.numVisited < node.inputs.size) {
          return;
        }
        if (node.visited) {
          return;
        }
        node.visited = true;
        node.runOnce();
        var _iterator2 = _createForOfIteratorHelper$2(this._paths.get(node)),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var next = _step2.value;
            this.executeHelper(next, node.level + 1);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }, {
      key: "execute",
      value: function () {
        var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
          var _this = this;
          var inits, chunks, _i, _chunks, chunk, results, _iterator3, _step3, node, wait;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                PvNode.tick = performance.now();
                inits = this._stack.filter(function (x) {
                  return x.inputs.size === 0;
                });
                chunks = [];
                while (inits.length > 0) {
                  chunks.push(inits.splice(0, 8));
                }
                _i = 0, _chunks = chunks;
              case 5:
                if (!(_i < _chunks.length)) {
                  _context2.next = 15;
                  break;
                }
                chunk = _chunks[_i];
                results = [];
                _iterator3 = _createForOfIteratorHelper$2(chunk);
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    node = _step3.value;
                    this.executeHelper(node);
                    results.push(node.executionPromise);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
                _context2.next = 12;
                return Promise.all(results);
              case 12:
                _i++;
                _context2.next = 5;
                break;
              case 15:
                wait = new Promise(function (resolve) {
                  Promise.all(_this._stack.map(function (x) {
                    return x.executionPromise;
                  })).then(function () {
                    resolve();
                  });
                });
                _context2.next = 18;
                return wait;
              case 18:
                this.clear();
              case 19:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function execute() {
          return _execute.apply(this, arguments);
        }
        return execute;
      }()
    }, {
      key: "generateViz",
      value: function generateViz() {
        var labels = "";
        var edges = "";
        var _iterator4 = _createForOfIteratorHelper$2(this._paths),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _step4$value = _slicedToArray(_step4.value, 2),
              node = _step4$value[0],
              refs = _step4$value[1];
            labels += "  ".concat(node.id, " [label=<[").concat(node.id, "] ").concat(node.name).concat(node.subName ? ' (' + node.subName + ')' : '', "<BR /><FONT POINT-SIZE=\"10\">wait: ").concat(node.timeWait.toFixed(4), ", execute: ").concat(node.timeExecute.toFixed(4), "</FONT>>, style=filled, fillcolor=\"").concat(getColor(node.level), "\"]\n");
            var _iterator5 = _createForOfIteratorHelper$2(refs),
              _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                var ref = _step5.value;
                edges += "  ".concat(node.id, " -> ").concat(ref.id, "\n");
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        var diagraph = "digraph {\n".concat(labels, "\n").concat(edges, "}");
        console.log(diagraph);
      }
    }, {
      key: "clear",
      value: function clear() {
        this._paths.clear();
        this._stack = [];
        PvNode.reset();
      }
    }]);
    return PvGraph;
  }();
  var PvNode = /*#__PURE__*/function () {
    function PvNode(name, fn, args) {
      _classCallCheck(this, PvNode);
      _defineProperty(this, "id", void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "subName", void 0);
      _defineProperty(this, "visited", void 0);
      _defineProperty(this, "numVisited", void 0);
      _defineProperty(this, "executionPromise", void 0);
      _defineProperty(this, "inputs", void 0);
      _defineProperty(this, "inputsAddr", void 0);
      _defineProperty(this, "output", void 0);
      _defineProperty(this, "timeWait", 0);
      _defineProperty(this, "timeExecute", 0);
      _defineProperty(this, "level", 0);
      _defineProperty(this, "_fn", void 0);
      _defineProperty(this, "_args", void 0);
      this.id = PvNode.nodeId++;
      this.name = name;
      this.visited = false;
      this.numVisited = 0;
      this.inputs = new Set();
      this.inputsAddr = [];
      this.output = -1;
      this._fn = fn;
      this._args = args;
    }
    _createClass(PvNode, [{
      key: "runOnce",
      value: function runOnce() {
        var _this2 = this;
        if (this.executionPromise === undefined) {
          var parents = _toConsumableArray(this.inputs).map(function (x) {
            return x.executionPromise;
          });
          this.executionPromise = Promise.all(parents).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
            var tock, tick, res;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  tock = performance.now();
                  _this2.timeWait = (tock - PvNode.tick) / 1000;
                  tick = performance.now();
                  _context3.next = 5;
                  return _this2._fn.apply(null, _this2._args);
                case 5:
                  res = _context3.sent;
                  tock = performance.now();
                  _this2.timeExecute = (tock - tick) / 1000;
                  return _context3.abrupt("return", res);
                case 9:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          })));
        }
      }
    }, {
      key: "runFn",
      value: function () {
        var _runFn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
          return _regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._fn.apply(null, this._args);
              case 2:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this);
        }));
        function runFn() {
          return _runFn.apply(this, arguments);
        }
        return runFn;
      }()
    }], [{
      key: "reset",
      value: function reset() {
        PvNode.nodeId = 0;
      }
    }]);
    return PvNode;
  }();
  _defineProperty(PvNode, "nodeId", 0);
  _defineProperty(PvNode, "executeWasmFn", void 0);
  _defineProperty(PvNode, "tick", 0);

  function ownKeys$1(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread$1(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys$1(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var PvWorker = /*#__PURE__*/function () {
    function PvWorker(worker) {
      var _this = this;
      _classCallCheck(this, PvWorker);
      _defineProperty(this, "worker", void 0);
      _defineProperty(this, "listeners", {});
      this.worker = worker;
      this.worker.onmessage = function (e) {
        switch (e.data.command) {
          case "ok":
            if (e.data.workId in _this.listeners) {
              _this.listeners[e.data.workId](e.data.result);
              _this.removeListener(e.data.workId);
            }
            break;
          case "failed":
          case "error":
            _this.removeListener(e.data.workId);
            throw new Error(e.data.message);
          default:
            _this.removeListener(e.data.workId);
            throw new Error("Unrecognized command: ".concat(e.data.command));
        }
      };
    }
    _createClass(PvWorker, [{
      key: "postMessage",
      value: function postMessage(message, options) {
        this.worker.postMessage(message, options);
      }
    }, {
      key: "terminate",
      value: function terminate() {
        this.worker.terminate();
      }
    }, {
      key: "addListener",
      value: function addListener(workId, listener) {
        this.listeners[workId] = listener;
      }
    }, {
      key: "removeListener",
      value: function removeListener(workId) {
        delete this.listeners[workId];
      }
    }]);
    return PvWorker;
  }();
  var generateWorkId = function generateWorkId() {
    return Math.ceil((performance.now() + Math.random()) * 10e9);
  };
  var promisifyPvWorker = function promisifyPvWorker(workId, worker) {
    return new Promise(function (resolve) {
      worker.addListener(workId, function (result) {
        resolve(result);
      });
    });
  };
  var poolPvWorker = function poolPvWorker(worker, command, options) {
    var workId = generateWorkId();
    var response = promisifyPvWorker(workId, worker);
    worker.postMessage(_objectSpread$1(_objectSpread$1({}, command), {}, {
      workId: workId
    }), options);
    return response;
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
              workerResults.push(poolPvWorker(obj.workers[i], {
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
                workerResults.push(poolPvWorker(obj.workers[_i2], {
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
    PvPicollmAttentionAction[PvPicollmAttentionAction["ATTENTION_ATTEND_COMBINED"] = 201] = "ATTENTION_ATTEND_COMBINED";
  })(PvPicollmAttentionAction || (PvPicollmAttentionAction = {}));

  var getPicollmAttentionWasmFunctions = function getPicollmAttentionWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmAttentionPrecomputeEncoding = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, encodingAddress, dimension, steps, theta, statusAddress) {
        var obj;
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
              _context.next = 9;
              return poolPvWorker(obj.workers[0], {
                action: PvPicollmAttentionAction.ATTENTION_PRECOMPUTE_ENCODING,
                encodingAddress: encodingAddress,
                dimension: dimension,
                steps: steps,
                theta: theta
              });
            case 9:
              setStatus(statusAddress, 0);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function pvPicollmAttentionPrecomputeEncoding(_x, _x2, _x3, _x4, _x5, _x6) {
        return _ref.apply(this, arguments);
      };
    }();
    var pvPicollmAttentionAttendCombined = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, numHeads, numKvHeads, windowLength, headDimension, ropeDimension, ropeInterleaved, newEncodingAddress, qAddress, kAddress, vAddress, keysAddress, keyInterceptsAddress, keySlopesAddress, valuesAddress, valueInterceptsAddress, valueSlopesAddress, position, queryAddress, n, outputAddress, statusAddress) {
        var obj, memoryBufferFloat32, length, qBuffer, kBuffer, vBuffer, res;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              newEncodingAddress = unsignedAddress(newEncodingAddress);
              qAddress = unsignedAddress(qAddress);
              kAddress = unsignedAddress(kAddress);
              vAddress = unsignedAddress(vAddress);
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
                _context2.next = 18;
                break;
              }
              setStatus(statusAddress, -1);
              return _context2.abrupt("return");
            case 18:
              memoryBufferFloat32 = new Float32Array(memory.buffer);
              length = n * numHeads * headDimension;
              qBuffer = memoryBufferFloat32.slice(qAddress / Float32Array.BYTES_PER_ELEMENT, qAddress / Float32Array.BYTES_PER_ELEMENT + length);
              kBuffer = memoryBufferFloat32.slice(kAddress / Float32Array.BYTES_PER_ELEMENT, kAddress / Float32Array.BYTES_PER_ELEMENT + length);
              vBuffer = memoryBufferFloat32.slice(vAddress / Float32Array.BYTES_PER_ELEMENT, vAddress / Float32Array.BYTES_PER_ELEMENT + length);
              _context2.next = 25;
              return poolPvWorker(obj.workers[0], {
                action: PvPicollmAttentionAction.ATTENTION_ATTEND_COMBINED,
                numHeads: numHeads,
                numKvHeads: numKvHeads,
                windowLength: windowLength,
                headDimension: headDimension,
                ropeDimension: ropeDimension,
                ropeInterleaved: ropeInterleaved,
                newEncodingAddress: newEncodingAddress,
                qBuffer: qBuffer,
                kBuffer: kBuffer,
                vBuffer: vBuffer,
                keysAddress: keysAddress,
                keyInterceptsAddress: keyInterceptsAddress,
                keySlopesAddress: keySlopesAddress,
                valuesAddress: valuesAddress,
                valueInterceptsAddress: valueInterceptsAddress,
                valueSlopesAddress: valueSlopesAddress,
                position: position,
                queryAddress: queryAddress,
                n: n
              }, [qBuffer.buffer, kBuffer.buffer, vBuffer.buffer]);
            case 25:
              res = _context2.sent;
              memoryBufferFloat32 = new Float32Array(memory.buffer);
              memoryBufferFloat32.set(res, outputAddress / Float32Array.BYTES_PER_ELEMENT);
            case 28:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function pvPicollmAttentionAttendCombined(_x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26, _x27, _x28) {
        return _ref2.apply(this, arguments);
      };
    }();
    return {
      pv_picollm_attention_precompute_encoding_web_worker_wasm: pvPicollmAttentionPrecomputeEncoding,
      pv_picollm_attention_attend_combined_web_worker_wasm: graph.graphify(pvPicollmAttentionAttendCombined, [7, 8, 9, 10, 11, 14, 18, 20], 20)
    };
  };

  var attentionPrecomputeEncoding = function attentionPrecomputeEncoding(data) {
    var _data$globals = data.globals,
      exports = _data$globals.exports,
      memAlloc = _data$globals.memAlloc;
    var encodingAddress = data.encodingAddress,
      dimension = data.dimension,
      steps = data.steps,
      theta = data.theta;
    var pv_picollm_attention_precompute_encoding_wasm = exports.pv_picollm_attention_precompute_encoding_wasm;
    var _memAlloc$get = memAlloc.get(encodingAddress),
      workerEncodingAddress = _memAlloc$get.workerMemAddress;
    pv_picollm_attention_precompute_encoding_wasm(workerEncodingAddress, dimension, steps, theta);
  };
  var attentionAttendCombined = function attentionAttendCombined(data) {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc,
      memory = _data$globals2.memory;
    var numHeads = data.numHeads,
      numKvHeads = data.numKvHeads,
      windowLength = data.windowLength,
      headDimension = data.headDimension,
      ropeDimension = data.ropeDimension,
      ropeInterleaved = data.ropeInterleaved,
      newEncodingAddress = data.newEncodingAddress,
      qBuffer = data.qBuffer,
      kBuffer = data.kBuffer,
      vBuffer = data.vBuffer,
      keysAddress = data.keysAddress,
      keyInterceptsAddress = data.keyInterceptsAddress,
      keySlopesAddress = data.keySlopesAddress,
      valuesAddress = data.valuesAddress,
      valueInterceptsAddress = data.valueInterceptsAddress,
      valueSlopesAddress = data.valueSlopesAddress,
      position = data.position,
      queryAddress = data.queryAddress,
      n = data.n;
    var aligned_alloc = exports.aligned_alloc,
      free = exports.free,
      pv_picollm_attention_encode_wasm = exports.pv_picollm_attention_encode_wasm,
      pv_picollm_attention_update_keys_wasm = exports.pv_picollm_attention_update_keys_wasm,
      pv_picollm_attention_update_values_wasm = exports.pv_picollm_attention_update_values_wasm,
      pv_picollm_attention_transpose_query_wasm = exports.pv_picollm_attention_transpose_query_wasm,
      pv_picollm_attention_attend_wasm = exports.pv_picollm_attention_attend_wasm;
    var _memAlloc$get2 = memAlloc.get(newEncodingAddress),
      workerEncodingAddress = _memAlloc$get2.workerMemAddress;
    var _memAlloc$get3 = memAlloc.get(keysAddress),
      workerKeysAddress = _memAlloc$get3.workerMemAddress;
    var _memAlloc$get4 = memAlloc.get(keyInterceptsAddress),
      workerKeyInterceptsAddress = _memAlloc$get4.workerMemAddress;
    var _memAlloc$get5 = memAlloc.get(keySlopesAddress),
      workerKeySlopesAddress = _memAlloc$get5.workerMemAddress;
    var _memAlloc$get6 = memAlloc.get(valuesAddress),
      workerValuesAddress = _memAlloc$get6.workerMemAddress;
    var _memAlloc$get7 = memAlloc.get(valueInterceptsAddress),
      workerValueInterceptsAddress = _memAlloc$get7.workerMemAddress;
    var _memAlloc$get8 = memAlloc.get(valueSlopesAddress),
      workerValueSlopesAddress = _memAlloc$get8.workerMemAddress;
    var _memAlloc$get9 = memAlloc.get(queryAddress),
      workerQueryAddress = _memAlloc$get9.workerMemAddress;
    var workerQAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, qBuffer.length * Float32Array.BYTES_PER_ELEMENT);
    var workerKAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, kBuffer.length * Float32Array.BYTES_PER_ELEMENT);
    var workerVAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, vBuffer.length * Float32Array.BYTES_PER_ELEMENT);
    var length = numHeads * headDimension * n;
    var workerOutputAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, length * Float32Array.BYTES_PER_ELEMENT);
    var memoryBufferFloat32 = new Float32Array(memory.buffer);
    memoryBufferFloat32.set(qBuffer, workerQAddress / Float32Array.BYTES_PER_ELEMENT);
    memoryBufferFloat32.set(kBuffer, workerKAddress / Float32Array.BYTES_PER_ELEMENT);
    memoryBufferFloat32.set(vBuffer, workerVAddress / Float32Array.BYTES_PER_ELEMENT);
    memoryBufferFloat32.fill(0, workerOutputAddress / Float32Array.BYTES_PER_ELEMENT, workerOutputAddress / Float32Array.BYTES_PER_ELEMENT + length);
    pv_picollm_attention_encode_wasm(workerQAddress, workerEncodingAddress, n, numHeads, ropeInterleaved, headDimension, ropeDimension, position);
    pv_picollm_attention_transpose_query_wasm(n, workerQAddress, workerQueryAddress, numHeads, headDimension);
    pv_picollm_attention_encode_wasm(workerKAddress, workerEncodingAddress, n, numKvHeads, ropeInterleaved, headDimension, ropeDimension, position);
    pv_picollm_attention_update_keys_wasm(numKvHeads, windowLength, headDimension, workerKeysAddress, workerKeyInterceptsAddress, workerKeySlopesAddress, position, n, workerKAddress);
    pv_picollm_attention_update_values_wasm(numKvHeads, windowLength, headDimension, workerValuesAddress, workerValueInterceptsAddress, workerValueSlopesAddress, position, n, workerVAddress);
    pv_picollm_attention_attend_wasm(numHeads, numKvHeads, windowLength, headDimension, workerKeysAddress, workerKeyInterceptsAddress, workerKeySlopesAddress, workerValuesAddress, workerValueInterceptsAddress, workerValueSlopesAddress, position, workerQueryAddress, n, workerOutputAddress);
    memoryBufferFloat32 = new Float32Array(memory.buffer);
    var res = memoryBufferFloat32.slice(workerOutputAddress / Float32Array.BYTES_PER_ELEMENT, workerOutputAddress / Float32Array.BYTES_PER_ELEMENT + length);
    free(workerQAddress);
    free(workerKAddress);
    free(workerVAddress);
    free(workerOutputAddress);
    return res;
  };
  _defineProperty(_defineProperty({}, PvPicollmAttentionAction.ATTENTION_PRECOMPUTE_ENCODING, attentionPrecomputeEncoding), PvPicollmAttentionAction.ATTENTION_ATTEND_COMBINED, attentionAttendCombined);

  var getPicollmFeedForwardWasmFunctions = function getPicollmFeedForwardWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmFeedForwardSilu = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, xAddress, statusAddress) {
        var obj;
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
              _context.next = 9;
              return imports.pv_picollm_feed_forward_silu_wasm(n, xAddress);
            case 9:
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
        var obj;
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
              _context2.next = 9;
              return imports.pv_picollm_feed_forward_gelu_wasm(n, xAddress);
            case 9:
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
        var obj;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              xAddress = unsignedAddress(xAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return");
            case 6:
              _context3.next = 8;
              return imports.pv_picollm_feed_forward_almost_gelu_wasm(n, xAddress);
            case 8:
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
        var obj;
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
              _context4.next = 10;
              return imports.pv_picollm_feed_forward_multiply_buffers_wasm(n, xAddress, yAddress);
            case 10:
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
      pv_picollm_feed_forward_silu_web_worker_wasm: graph.graphify(pvPicollmFeedForwardSilu, [2], 2),
      pv_picollm_feed_forward_gelu_web_worker_wasm: graph.graphify(pvPicollmFeedForwardGelu, [2], 2),
      pv_picollm_feed_forward_almost_gelu_web_worker_wasm: graph.graphify(pvPicollmFeedForwardAlmostGelu, [2], 2),
      pv_picollm_feed_forward_multiply_buffers_web_worker_wasm: graph.graphify(pvPicollmFeedForwardMultiplyBuffers, [2, 3], 3)
    };
  };

  var getPicollmGateWasmFunctions = function getPicollmGateWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmGateForward = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, k, numExperts, indicesAddress, weightsAddress, yAddress, statusAddress) {
        var obj;
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
              _context.next = 11;
              return imports.pv_picollm_gate_forward_wasm(n, k, numExperts, indicesAddress, weightsAddress, yAddress);
            case 11:
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
      pv_picollm_gate_forward_web_worker_wasm: graph.graphify(pvPicollmGateForward, [], 6)
    };
  };

  var getPicollmMoeTransformerWasmFunctions = function getPicollmMoeTransformerWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmMoeTransformerAddToBuffer = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, xAddress, bufferAddress, statusAddress) {
        var obj;
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
              _context.next = 10;
              return imports.pv_picollm_moe_transformer_add_to_buffer_wasm(n, xAddress, bufferAddress);
            case 10:
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
        var obj;
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
              _context2.next = 11;
              return imports.pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_wasm(n, weightsIndex, yIndex, weightsAddress, xAddress, yAddress);
            case 11:
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
        var obj;
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
              _context3.next = 11;
              return imports.pv_picollm_moe_transformer_add_buffers_wasm(n, buffer1Address, buffer2Address, yAddress);
            case 11:
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
      pv_picollm_moe_transformer_add_to_buffer_web_worker_wasm: graph.graphify(pvPicollmMoeTransformerAddToBuffer, [2], 3),
      pv_picollm_moe_transformer_multiply_weight_and_add_to_buffer_web_worker_wasm: graph.graphify(pvPicollmMoeTransformerMultipleWeightAndAddToBuffer, [5], 6),
      pv_picollm_moe_transformer_add_buffers_web_worker_wasm: graph.graphify(pvPicollmMoeTransformerAddBuffers, [2, 3], 4)
    };
  };

  var getPicollmNormWasmFunctions = function getPicollmNormWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmNormForward = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, dimension, eps, weightAddress, n, xOffset, xAddress, yOffset, yAddress, statusAddress) {
        var obj;
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
              _context.next = 11;
              return imports.pv_picollm_norm_forward_wasm(dimension, eps, weightAddress, n, xAddress + xOffset, yAddress + yOffset);
            case 11:
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
      pv_picollm_norm_forward_web_worker_wasm: graph.graphify(pvPicollmNormForward, [6], 8)
    };
  };

  var getPicollmNormLayerWasmFunctions = function getPicollmNormLayerWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmNormLayerForward = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, dimension, eps, weightAddress, biasAddress, n, xOffset, xAddress, yOffset, yAddress, statusAddress) {
        var obj;
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
              _context.next = 12;
              return imports.pv_picollm_norm_layer_forward_wasm(dimension, eps, weightAddress, biasAddress, n, xAddress + xOffset, yAddress + yOffset);
            case 12:
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
      pv_picollm_norm_layer_forward_web_worker_wasm: graph.graphify(pvPicollmNormLayerForward, [7, 9], 9)
    };
  };

  var getPicollmTransformerWasmFunctions = function getPicollmTransformerWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmTransformerAddToBuffer = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, n, xAddress, bufferAddress, statusAddress) {
        var obj;
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
              _context.next = 10;
              return imports.pv_picollm_transformer_add_to_buffer_wasm(n, xAddress, bufferAddress);
            case 10:
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
        var obj;
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
              _context2.next = 11;
              return imports.pv_picollm_transformer_add_buffers_wasm(n, buffer1Address, buffer2Address, yAddress);
            case 11:
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
      pv_picollm_transformer_add_to_buffer_web_worker_wasm: graph.graphify(pvPicollmTransformerAddToBuffer, [2, 3], 3),
      pv_picollm_transformer_add_buffers_web_worker_wasm: graph.graphify(pvPicollmTransformerAddBuffers, [2, 3], 4)
    };
  };

  /* eslint camelcase: 0 */
  var PvPicollmWeightAction;
  (function (PvPicollmWeightAction) {
    PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS"] = 100] = "WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS";
    PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_METAS"] = 101] = "WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_METAS";
    PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BIAS"] = 102] = "WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BIAS";
    PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE"] = 103] = "WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE";
    PvPicollmWeightAction[PvPicollmWeightAction["WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE"] = 104] = "WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE";
  })(PvPicollmWeightAction || (PvPicollmWeightAction = {}));

  function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  function blpo2(x) {
    x = x | x >> 1;
    x = x | x >> 2;
    x = x | x >> 4;
    x = x | x >> 8;
    x = x | x >> 16;
    x = x | x >> 32;
    return x - (x >> 1);
  }
  function range(start, end) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    if (end === undefined) {
      end = start;
      start = 0;
    }
    var result = [];
    for (var i = start; step > 0 ? i < end : i > end; i += step) {
      result.push(i);
    }
    return result;
  }
  var getPicollmWeightWasmFunctions = function getPicollmWeightWasmFunctions(memory, graph, imports) {
    var setStatus = function setStatus(statusAddress, value) {
      var memoryBufferInt32 = new Int32Array(memory.buffer);
      memoryBufferInt32[statusAddress / Int32Array.BYTES_PER_ELEMENT] = value;
    };
    var pvPicollmWeightBlockMixed16x8PreprocessBlocks = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(objAddress, nameAddress, shapeAddress, numBitDepths, bitDepthsAddress, bitDepthsStartAddress, batchSize, numBlockBytes, blocksAddress, blocksXpuAddress, statusAddress) {
        var obj, buffer, name, memoryBufferInt32, shape, bitDepths, bitDepthStarts, block, indexes, acc, i, nextBitDepthStart, blockChunkSize, workerSet, n, ff, att, rem, chunkSize, splitFactor, workerResults, remaining, _i, blockChunk, prev, _iterator, _step, _step$value, start, bytes, offset;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              nameAddress = unsignedAddress(nameAddress);
              shapeAddress = unsignedAddress(shapeAddress);
              bitDepthsAddress = unsignedAddress(bitDepthsAddress);
              bitDepthsStartAddress = unsignedAddress(bitDepthsStartAddress);
              blocksAddress = unsignedAddress(blocksAddress);
              blocksXpuAddress = unsignedAddress(blocksXpuAddress);
              statusAddress = unsignedAddress(statusAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context.next = 12;
                break;
              }
              setStatus(statusAddress, -1);
              return _context.abrupt("return");
            case 12:
              buffer = new Uint8Array(memory.buffer);
              name = arrayBufferToStringAtIndex(buffer, nameAddress);
              graph.addName(blocksAddress, name);
              memoryBufferInt32 = new Int32Array(memory.buffer);
              shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
              bitDepths = memoryBufferInt32.slice(bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              block = new Uint8Array(memory.buffer).slice(blocksAddress, blocksAddress + numBlockBytes);
              indexes = [];
              acc = 0;
              for (i = 0; i < numBitDepths; i++) {
                nextBitDepthStart = i === numBitDepths - 1 ? shape[1] / 8 : bitDepthStarts[i + 1];
                blockChunkSize = (nextBitDepthStart - bitDepthStarts[i]) * bitDepths[i] * shape[0];
                indexes.push([acc, blockChunkSize]);
                acc += blockChunkSize;
              }
              workerSet = [];
              if (obj.numWorkers < 4) {
                n = blpo2(obj.numWorkers);
                workerSet = range(obj.numWorkers - n, obj.numWorkers);
              } else {
                ff = blpo2((obj.numWorkers - 1) * (2 / 3));
                att = blpo2((obj.numWorkers - 1) * (1 / 3));
                rem = obj.numWorkers - 1 - ff - att;
                if (name.includes("ff") || numBlockBytes > 10240000) {
                  workerSet = range(1, 1 + ff);
                } else {
                  workerSet = range(1 + ff, 1 + ff + att);
                }
                if (rem > 0 && name.includes("att.v")) {
                  // if we have more remaining workers, we send 'value weight' to different worker
                  if (rem >= att) {
                    workerSet = range(1 + ff + att, 1 + ff + att * 2);
                  } else if (att === rem + 1) {
                    // use attend worker for weight
                    workerSet = [0].concat(_toConsumableArray(range(1 + ff + att, ff + att * 2)));
                  }
                }
              }
              chunkSize = Math.ceil(numBlockBytes / batchSize / workerSet.length) * batchSize;
              splitFactor = numBlockBytes / chunkSize;
              shape[0] /= splitFactor;
              workerResults = [];
              remaining = numBlockBytes;
              _i = 0;
            case 31:
              if (!(_i < workerSet.length)) {
                _context.next = 43;
                break;
              }
              blockChunk = new Uint8Array(chunkSize);
              prev = 0;
              _iterator = _createForOfIteratorHelper$1(indexes);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _step$value = _slicedToArray(_step.value, 2), start = _step$value[0], bytes = _step$value[1];
                  offset = _i * (bytes / splitFactor);
                  blockChunk.set(block.slice(start + offset, start + offset + bytes / splitFactor), prev);
                  prev += bytes / splitFactor;
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              remaining -= prev;
              workerResults.push(poolPvWorker(obj.workers[workerSet[_i]], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS,
                shape: shape,
                bitDepths: bitDepths,
                bitDepthStarts: bitDepthStarts,
                numBlockBytes: chunkSize,
                blocksAddress: blocksXpuAddress,
                block: blockChunk
              }, [blockChunk.buffer]));
              if (!(remaining <= 0)) {
                _context.next = 40;
                break;
              }
              return _context.abrupt("break", 43);
            case 40:
              _i++;
              _context.next = 31;
              break;
            case 43:
              _context.next = 45;
              return Promise.all(workerResults);
            case 45:
              setStatus(statusAddress, 0);
              PvXpu.addMemory(blocksXpuAddress, {
                objAddress: objAddress,
                memFlag: 0,
                allocSize: numBlockBytes,
                chunkSize: chunkSize,
                workerSet: workerSet
              });
            case 47:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function pvPicollmWeightBlockMixed16x8PreprocessBlocks(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
        return _ref.apply(this, arguments);
      };
    }();
    var pvPicollmWeightBlockMixed16x8PreprocessMetas = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(objAddress, shapeAddress, numBitDepths, bitDepthsStartAddress, blocksXpuAddress, batchSize, numMetas, metasAddress, metasXpuAddress, statusAddress) {
        var obj, blocksMem, memoryBufferInt32, shape, bitDepthStarts, metas, indexes, acc, j, nextBitDepthStart, metasChunkSize, chunkSize, splitFactor, workerResults, remaining, i, metasChunk, prev, _iterator2, _step2, _step2$value, start, size, offset;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              shapeAddress = unsignedAddress(shapeAddress);
              bitDepthsStartAddress = unsignedAddress(bitDepthsStartAddress);
              blocksXpuAddress = unsignedAddress(blocksXpuAddress);
              metasAddress = unsignedAddress(metasAddress);
              metasXpuAddress = unsignedAddress(metasXpuAddress);
              statusAddress = unsignedAddress(statusAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context2.next = 11;
                break;
              }
              setStatus(statusAddress, -1);
              return _context2.abrupt("return");
            case 11:
              blocksMem = PvXpu.getMemory(blocksXpuAddress);
              if (blocksMem) {
                _context2.next = 15;
                break;
              }
              setStatus(statusAddress, -1);
              return _context2.abrupt("return");
            case 15:
              memoryBufferInt32 = new Int32Array(memory.buffer);
              shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
              bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              metas = new Uint16Array(memory.buffer).slice(metasAddress / Uint16Array.BYTES_PER_ELEMENT, metasAddress / Uint16Array.BYTES_PER_ELEMENT + numMetas);
              indexes = [];
              acc = 0;
              for (j = 0; j < numBitDepths; j++) {
                nextBitDepthStart = j === numBitDepths - 1 ? shape[1] / 8 : bitDepthStarts[j + 1];
                metasChunkSize = (nextBitDepthStart - bitDepthStarts[j]) * 2 * (shape[0] / 16);
                indexes.push([acc, metasChunkSize]);
                acc += metasChunkSize;
              }
              chunkSize = Math.ceil(numMetas / batchSize / blocksMem.workerSet.length) * batchSize;
              splitFactor = numMetas / chunkSize;
              workerResults = [];
              remaining = numMetas;
              i = 0;
            case 27:
              if (!(i < blocksMem.workerSet.length)) {
                _context2.next = 39;
                break;
              }
              metasChunk = new Uint16Array(chunkSize);
              prev = 0;
              _iterator2 = _createForOfIteratorHelper$1(indexes);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  _step2$value = _slicedToArray(_step2.value, 2), start = _step2$value[0], size = _step2$value[1];
                  offset = i * (size / splitFactor);
                  metasChunk.set(metas.slice(start + offset, start + offset + size / splitFactor), prev);
                  prev += size / splitFactor;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              remaining -= prev;
              workerResults.push(poolPvWorker(obj.workers[blocksMem.workerSet[i]], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_METAS,
                memAddress: metasXpuAddress,
                metas: metasChunk
              }, [metasChunk.buffer]));
              if (!(remaining <= 0)) {
                _context2.next = 36;
                break;
              }
              return _context2.abrupt("break", 39);
            case 36:
              i++;
              _context2.next = 27;
              break;
            case 39:
              _context2.next = 41;
              return Promise.all(workerResults);
            case 41:
              setStatus(statusAddress, 0);
              PvXpu.addMemory(metasXpuAddress, {
                objAddress: objAddress,
                memFlag: 0,
                allocSize: numMetas * Uint16Array.BYTES_PER_ELEMENT,
                chunkSize: chunkSize,
                workerSet: blocksMem.workerSet
              });
            case 43:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function pvPicollmWeightBlockMixed16x8PreprocessMetas(_x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21) {
        return _ref2.apply(this, arguments);
      };
    }();
    var pvPicollmWeightBlockMixed16x8PreprocessBias = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, shapeAddress, blocksXpuAddress, batchSize, biasAddress, biasXpuAddress, statusAddress) {
        var obj, blocksMem, memoryBufferInt32, shape, numBias, bias, chunkSize, workerResults, remaining, i, biasChunk;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              shapeAddress = unsignedAddress(shapeAddress);
              blocksXpuAddress = unsignedAddress(blocksXpuAddress);
              biasAddress = unsignedAddress(biasAddress);
              biasXpuAddress = unsignedAddress(biasXpuAddress);
              statusAddress = unsignedAddress(statusAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context3.next = 10;
                break;
              }
              setStatus(statusAddress, -1);
              return _context3.abrupt("return");
            case 10:
              blocksMem = PvXpu.getMemory(blocksXpuAddress);
              if (blocksMem) {
                _context3.next = 14;
                break;
              }
              setStatus(statusAddress, -1);
              return _context3.abrupt("return");
            case 14:
              memoryBufferInt32 = new Int32Array(memory.buffer);
              shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
              numBias = shape[0];
              bias = new Float32Array(memory.buffer).slice(biasAddress / Float32Array.BYTES_PER_ELEMENT, biasAddress / Float32Array.BYTES_PER_ELEMENT + numBias);
              chunkSize = Math.ceil(numBias / batchSize / blocksMem.workerSet.length) * batchSize;
              workerResults = [];
              remaining = numBias;
              i = 0;
            case 22:
              if (!(i < blocksMem.workerSet.length)) {
                _context3.next = 31;
                break;
              }
              biasChunk = bias.slice(i * chunkSize, (i + 1) * chunkSize);
              workerResults.push(poolPvWorker(obj.workers[blocksMem.workerSet[i]], {
                action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BIAS,
                memAddress: biasXpuAddress,
                bias: biasChunk
              }, [biasChunk.buffer]));
              remaining -= chunkSize;
              if (!(remaining <= 0)) {
                _context3.next = 28;
                break;
              }
              return _context3.abrupt("break", 31);
            case 28:
              i++;
              _context3.next = 22;
              break;
            case 31:
              _context3.next = 33;
              return Promise.all(workerResults);
            case 33:
              setStatus(statusAddress, 0);
              PvXpu.addMemory(biasXpuAddress, {
                objAddress: objAddress,
                memFlag: 0,
                allocSize: numBias * Float32Array.BYTES_PER_ELEMENT,
                chunkSize: chunkSize,
                workerSet: blocksMem.workerSet
              });
            case 35:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function pvPicollmWeightBlockMixed16x8PreprocessBias(_x22, _x23, _x24, _x25, _x26, _x27, _x28) {
        return _ref3.apply(this, arguments);
      };
    }();
    var pvPicollmWeightBlockMixed16x8ForwardSingle = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(objAddress, shapeAddress, indicesAddress, numBitDepths, bitDepthsStartAddress, bitDepthsAddress, numMetas, metasAddress, numBlockBytes, blocksAddress, xOffset, xAddress, yAddress, biasAddress, statusAddress) {
        var obj, mem, metasMem, xMem, yMem, memoryBufferFloat32, memoryBufferInt32, shape, bitDepthStarts, bitDepths, xBuffer, chunkSize, splitFactor, workerResults, i, results, y, _i2, res;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
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
              biasAddress = unsignedAddress(biasAddress);
              statusAddress = unsignedAddress(statusAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context4.next = 15;
                break;
              }
              setStatus(statusAddress, -1);
              return _context4.abrupt("return");
            case 15:
              mem = PvXpu.getMemory(blocksAddress);
              if (mem) {
                _context4.next = 19;
                break;
              }
              setStatus(statusAddress, -1);
              return _context4.abrupt("return");
            case 19:
              metasMem = PvXpu.getMemory(metasAddress);
              if (metasMem) {
                _context4.next = 23;
                break;
              }
              setStatus(statusAddress, -1);
              return _context4.abrupt("return");
            case 23:
              xMem = PvXpu.getMemory(xAddress);
              if (xMem) {
                _context4.next = 27;
                break;
              }
              setStatus(statusAddress, -1);
              return _context4.abrupt("return");
            case 27:
              yMem = PvXpu.getMemory(yAddress);
              if (yMem) {
                _context4.next = 31;
                break;
              }
              setStatus(statusAddress, -1);
              return _context4.abrupt("return");
            case 31:
              memoryBufferFloat32 = new Float32Array(memory.buffer);
              memoryBufferInt32 = new Int32Array(memory.buffer);
              shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
              bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              bitDepths = memoryBufferInt32.slice(bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              xBuffer = memoryBufferFloat32.slice(xAddress / Float32Array.BYTES_PER_ELEMENT, (xAddress + xMem.allocSize) / Float32Array.BYTES_PER_ELEMENT);
              chunkSize = mem.chunkSize;
              splitFactor = numBlockBytes / chunkSize;
              shape[0] /= splitFactor;
              workerResults = [];
              for (i = 0; i < mem.workerSet.length; i++) {
                workerResults.push(poolPvWorker(obj.workers[mem.workerSet[i]], {
                  action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE,
                  shape: shape,
                  indicesAddress: indicesAddress,
                  bitDepthStarts: bitDepthStarts,
                  bitDepths: bitDepths,
                  numMetas: numMetas,
                  metasAddress: metasAddress,
                  numBlockBytes: chunkSize,
                  blocksAddress: blocksAddress,
                  xOffset: xOffset,
                  xAddress: xAddress,
                  xBuffer: xBuffer,
                  biasAddress: biasAddress
                }));
              }
              _context4.next = 44;
              return Promise.all(workerResults);
            case 44:
              results = _context4.sent;
              y = new Float32Array(shape[0] * splitFactor);
              for (_i2 = 0; _i2 < results.length; _i2++) {
                res = new Float32Array(results[_i2].buffer);
                y.set(res, _i2 * res.length);
              }
              memoryBufferFloat32.set(y, yAddress / Float32Array.BYTES_PER_ELEMENT);
            case 48:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function pvPicollmWeightBlockMixed16x8ForwardSingle(_x29, _x30, _x31, _x32, _x33, _x34, _x35, _x36, _x37, _x38, _x39, _x40, _x41, _x42, _x43) {
        return _ref4.apply(this, arguments);
      };
    }();
    var pvPicollmWeightBlockMixed16x8ForwardMultiple = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(objAddress, shapeAddress, indicesAddress, numBitDepths, bitDepthsStartAddress, bitDepthsAddress, numMetas, metasAddress, numBlockBytes, blocksAddress, n, xOffset, xAddress, yAddress, biasAddress, statusAddress) {
        var obj, mem, metasMem, yMem, xMem, memoryBufferFloat32, memoryBufferInt32, shape, bitDepthStarts, bitDepths, xBuffer, chunkSize, splitFactor, workerResults, i, results, y, outerOffset, _i3, res, innerOffset, j;
        return _regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
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
              biasAddress = unsignedAddress(biasAddress);
              statusAddress = unsignedAddress(statusAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context5.next = 15;
                break;
              }
              setStatus(statusAddress, -1);
              return _context5.abrupt("return");
            case 15:
              mem = PvXpu.getMemory(blocksAddress);
              if (mem) {
                _context5.next = 19;
                break;
              }
              setStatus(statusAddress, -1);
              return _context5.abrupt("return");
            case 19:
              metasMem = PvXpu.getMemory(metasAddress);
              if (metasMem) {
                _context5.next = 23;
                break;
              }
              setStatus(statusAddress, -1);
              return _context5.abrupt("return");
            case 23:
              yMem = PvXpu.getMemory(yAddress);
              if (yMem) {
                _context5.next = 27;
                break;
              }
              setStatus(statusAddress, -1);
              return _context5.abrupt("return");
            case 27:
              xMem = PvXpu.getMemory(xAddress);
              if (xMem) {
                _context5.next = 31;
                break;
              }
              setStatus(statusAddress, -1);
              return _context5.abrupt("return");
            case 31:
              memoryBufferFloat32 = new Float32Array(memory.buffer);
              memoryBufferInt32 = new Int32Array(memory.buffer);
              shape = memoryBufferInt32.slice(shapeAddress / Int32Array.BYTES_PER_ELEMENT, shapeAddress / Int32Array.BYTES_PER_ELEMENT + 2);
              bitDepthStarts = memoryBufferInt32.slice(bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              bitDepths = memoryBufferInt32.slice(bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT + numBitDepths);
              xBuffer = memoryBufferFloat32.slice(xAddress / Float32Array.BYTES_PER_ELEMENT, (xAddress + xMem.allocSize) / Float32Array.BYTES_PER_ELEMENT);
              chunkSize = mem.chunkSize;
              splitFactor = numBlockBytes / chunkSize;
              shape[0] /= splitFactor;
              workerResults = [];
              for (i = 0; i < mem.workerSet.length; i++) {
                workerResults.push(poolPvWorker(obj.workers[mem.workerSet[i]], {
                  action: PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE,
                  shape: shape,
                  indicesAddress: indicesAddress,
                  bitDepthStarts: bitDepthStarts,
                  bitDepths: bitDepths,
                  numMetas: numMetas,
                  metasAddress: metasAddress,
                  numBlockBytes: chunkSize,
                  blocksAddress: blocksAddress,
                  n: n,
                  xOffset: xOffset,
                  xAddress: xAddress,
                  xBuffer: xBuffer,
                  biasAddress: biasAddress
                }));
              }
              _context5.next = 44;
              return Promise.all(workerResults);
            case 44:
              results = _context5.sent;
              y = new Float32Array(shape[0] * splitFactor * n);
              outerOffset = 0;
              for (_i3 = 0; _i3 < results.length; _i3++) {
                res = new Float32Array(results[_i3].buffer);
                innerOffset = 0;
                for (j = 0; j < n; j++) {
                  y.set(res.slice(innerOffset, innerOffset + shape[0]), innerOffset * splitFactor + outerOffset);
                  innerOffset += shape[0];
                }
                outerOffset += shape[0];
              }
              memoryBufferFloat32.set(y, yAddress / Float32Array.BYTES_PER_ELEMENT);
            case 49:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function pvPicollmWeightBlockMixed16x8ForwardMultiple(_x44, _x45, _x46, _x47, _x48, _x49, _x50, _x51, _x52, _x53, _x54, _x55, _x56, _x57, _x58, _x59) {
        return _ref5.apply(this, arguments);
      };
    }();
    var pvPicollmWeightFloatForward = /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(objAddress, n, nc, nr, wAddress, xOffset, xAddress, yAddress, statusAddress) {
        var obj;
        return _regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              wAddress = unsignedAddress(wAddress);
              xAddress = unsignedAddress(xAddress);
              yAddress = unsignedAddress(yAddress);
              statusAddress = unsignedAddress(statusAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context6.next = 9;
                break;
              }
              setStatus(statusAddress, -1);
              return _context6.abrupt("return");
            case 9:
              _context6.next = 11;
              return imports.pv_picollm_weight_float_forward_wasm(n, nc, nr, wAddress, xAddress + xOffset, yAddress);
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function pvPicollmWeightFloatForward(_x60, _x61, _x62, _x63, _x64, _x65, _x66, _x67, _x68) {
        return _ref6.apply(this, arguments);
      };
    }();
    return {
      pv_picollm_weight_block_mixed_16x8_preprocess_blocks_web_worker_wasm: pvPicollmWeightBlockMixed16x8PreprocessBlocks,
      pv_picollm_weight_block_mixed_16x8_preprocess_metas_web_worker_wasm: pvPicollmWeightBlockMixed16x8PreprocessMetas,
      pv_picollm_weight_block_mixed_16x8_preprocess_bias_web_worker_wasm: pvPicollmWeightBlockMixed16x8PreprocessBias,
      pv_picollm_weight_block_mixed_16x8_forward_single_web_worker_wasm: graph.graphify(pvPicollmWeightBlockMixed16x8ForwardSingle, [11, 12], 12, 9),
      pv_picollm_weight_block_mixed_16x8_forward_multiple_web_worker_wasm: graph.graphify(pvPicollmWeightBlockMixed16x8ForwardMultiple, [12, 13], 13, 9),
      pv_picollm_weight_float_forward_web_worker_wasm: graph.graphify(pvPicollmWeightFloatForward, [6, 7], 7)
    };
  };

  var weightBlockMixed16x8PreprocessBlocks = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(data) {
      var _data$globals, exports, memAlloc, memory, shape, bitDepths, bitDepthStarts, numBlockBytes, blocksAddress, block, aligned_alloc, free, pv_picollm_weight_block_mixed_16x8_preprocess_blocks, workerBlocksAddress, shapeAddress, bitDepthsAddress, bitDepthsStartAddress, memoryBufferUint8, memoryBufferInt32;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _data$globals = data.globals, exports = _data$globals.exports, memAlloc = _data$globals.memAlloc, memory = _data$globals.memory;
            shape = data.shape, bitDepths = data.bitDepths, bitDepthStarts = data.bitDepthStarts, numBlockBytes = data.numBlockBytes, blocksAddress = data.blocksAddress, block = data.block;
            aligned_alloc = exports.aligned_alloc, free = exports.free, pv_picollm_weight_block_mixed_16x8_preprocess_blocks = exports.pv_picollm_weight_block_mixed_16x8_preprocess_blocks;
            workerBlocksAddress = aligned_alloc(Uint8Array.BYTES_PER_ELEMENT, numBlockBytes * Uint8Array.BYTES_PER_ELEMENT);
            if (workerBlocksAddress) {
              memAlloc.set(blocksAddress, {
                allocSize: numBlockBytes,
                workerMemAddress: workerBlocksAddress
              });
              shapeAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * shape.length);
              bitDepthsAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepths.length);
              bitDepthsStartAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepthStarts.length);
              memoryBufferUint8 = new Uint8Array(memory.buffer);
              memoryBufferInt32 = new Int32Array(memory.buffer);
              memoryBufferUint8.set(block, workerBlocksAddress);
              memoryBufferInt32.set(shape, shapeAddress / Int32Array.BYTES_PER_ELEMENT);
              memoryBufferInt32.set(bitDepths, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT);
              memoryBufferInt32.set(bitDepthStarts, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT);
              pv_picollm_weight_block_mixed_16x8_preprocess_blocks(shapeAddress, bitDepths.length, bitDepthsAddress, bitDepthsStartAddress, workerBlocksAddress);
              free(shapeAddress);
              free(bitDepthsAddress);
              free(bitDepthsStartAddress);
            }
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function weightBlockMixed16x8PreprocessBlocks(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var weightBlockMixed16x8PreprocessMetas = function weightBlockMixed16x8PreprocessMetas(data) {
    var _data$globals2 = data.globals,
      exports = _data$globals2.exports,
      memAlloc = _data$globals2.memAlloc,
      memory = _data$globals2.memory;
    var memAddress = data.memAddress,
      metas = data.metas;
    var aligned_alloc = exports.aligned_alloc;
    var workerMetasAddress = aligned_alloc(Uint16Array.BYTES_PER_ELEMENT, metas.length * Uint16Array.BYTES_PER_ELEMENT);
    if (workerMetasAddress) {
      memAlloc.set(memAddress, {
        allocSize: metas.length * Uint16Array.BYTES_PER_ELEMENT,
        workerMemAddress: workerMetasAddress
      });
      var memoryBufferUint16 = new Uint16Array(memory.buffer);
      memoryBufferUint16.set(metas, workerMetasAddress / Uint16Array.BYTES_PER_ELEMENT);
    }
  };
  var weightBlockMixed16x8PreprocessBias = function weightBlockMixed16x8PreprocessBias(data) {
    var _data$globals3 = data.globals,
      exports = _data$globals3.exports,
      memAlloc = _data$globals3.memAlloc,
      memory = _data$globals3.memory;
    var memAddress = data.memAddress,
      bias = data.bias;
    var aligned_alloc = exports.aligned_alloc;
    var workerBiasAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, bias.length * Float32Array.BYTES_PER_ELEMENT);
    if (workerBiasAddress) {
      memAlloc.set(memAddress, {
        allocSize: bias.length * Float32Array.BYTES_PER_ELEMENT,
        workerMemAddress: workerBiasAddress
      });
      var memoryBufferFloat32 = new Float32Array(memory.buffer);
      memoryBufferFloat32.set(bias, workerBiasAddress / Float32Array.BYTES_PER_ELEMENT);
    }
  };
  var weightBlockMixed16x8ForwardSingle = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(data) {
      var _data$globals4, exports, memAlloc, memory, shape, indicesAddress, bitDepthStarts, bitDepths, metasAddress, blocksAddress, xOffset, xBuffer, biasAddress, aligned_alloc, free, pv_picollm_weight_block_mixed_16x8_forward_single, pv_picollm_weight_block_mixed_16x8_add_bias, _memAlloc$get, workerIndicesAddress, _memAlloc$get2, workerMetasAddress, _memAlloc$get3, workerBlocksAddress, shapeAddress, bitDepthsStartAddress, bitDepthsAddress, workerXAddress, workerYAddress, memoryBufferFloat32, memoryBufferInt32, _memAlloc$get4, workerBiasAddress, allocSize, dimension, res;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _data$globals4 = data.globals, exports = _data$globals4.exports, memAlloc = _data$globals4.memAlloc, memory = _data$globals4.memory;
            shape = data.shape, indicesAddress = data.indicesAddress, bitDepthStarts = data.bitDepthStarts, bitDepths = data.bitDepths, metasAddress = data.metasAddress, blocksAddress = data.blocksAddress, xOffset = data.xOffset, xBuffer = data.xBuffer, biasAddress = data.biasAddress;
            aligned_alloc = exports.aligned_alloc, free = exports.free, pv_picollm_weight_block_mixed_16x8_forward_single = exports.pv_picollm_weight_block_mixed_16x8_forward_single, pv_picollm_weight_block_mixed_16x8_add_bias = exports.pv_picollm_weight_block_mixed_16x8_add_bias;
            _memAlloc$get = memAlloc.get(indicesAddress), workerIndicesAddress = _memAlloc$get.workerMemAddress;
            _memAlloc$get2 = memAlloc.get(metasAddress), workerMetasAddress = _memAlloc$get2.workerMemAddress;
            _memAlloc$get3 = memAlloc.get(blocksAddress), workerBlocksAddress = _memAlloc$get3.workerMemAddress;
            shapeAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * shape.length);
            bitDepthsStartAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepthStarts.length);
            bitDepthsAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepths.length);
            workerXAddress = aligned_alloc(256, Float32Array.BYTES_PER_ELEMENT * xBuffer.length);
            workerYAddress = aligned_alloc(256, Float32Array.BYTES_PER_ELEMENT * shape[0]);
            memoryBufferFloat32 = new Float32Array(memory.buffer);
            memoryBufferInt32 = new Int32Array(memory.buffer);
            memoryBufferInt32.set(shape, shapeAddress / Int32Array.BYTES_PER_ELEMENT);
            memoryBufferInt32.set(bitDepthStarts, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT);
            memoryBufferInt32.set(bitDepths, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT);
            memoryBufferFloat32.set(xBuffer, workerXAddress / Float32Array.BYTES_PER_ELEMENT);
            pv_picollm_weight_block_mixed_16x8_forward_single(shapeAddress, workerIndicesAddress, bitDepths.length, bitDepthsStartAddress, bitDepthsAddress, workerMetasAddress, workerBlocksAddress, workerXAddress + xOffset, workerYAddress);
            if (memAlloc.has(biasAddress)) {
              _memAlloc$get4 = memAlloc.get(biasAddress), workerBiasAddress = _memAlloc$get4.workerMemAddress, allocSize = _memAlloc$get4.allocSize;
              dimension = allocSize / Float32Array.BYTES_PER_ELEMENT;
              pv_picollm_weight_block_mixed_16x8_add_bias(1, dimension, workerYAddress, workerBiasAddress);
            }
            res = new Float32Array(memory.buffer).slice(workerYAddress / Float32Array.BYTES_PER_ELEMENT, workerYAddress / Float32Array.BYTES_PER_ELEMENT + shape[0]);
            free(shapeAddress);
            free(bitDepthsStartAddress);
            free(bitDepthsAddress);
            free(workerXAddress);
            free(workerYAddress);
            return _context2.abrupt("return", res);
          case 26:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function weightBlockMixed16x8ForwardSingle(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  var weightBlockMixed16x8ForwardMultiple = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(data) {
      var _data$globals5, exports, memAlloc, memory, shape, indicesAddress, bitDepthStarts, bitDepths, metasAddress, blocksAddress, n, xOffset, xBuffer, biasAddress, aligned_alloc, free, pv_picollm_weight_block_mixed_16x8_forward_multiple, pv_picollm_weight_block_mixed_16x8_add_bias, _memAlloc$get5, workerIndicesAddress, _memAlloc$get6, workerMetasAddress, _memAlloc$get7, workerBlocksAddress, shapeAddress, bitDepthsStartAddress, bitDepthsAddress, workerXAddress, workerYAddress, memoryBufferFloat32, memoryBufferInt32, _memAlloc$get8, workerBiasAddress, allocSize, dimension, res;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _data$globals5 = data.globals, exports = _data$globals5.exports, memAlloc = _data$globals5.memAlloc, memory = _data$globals5.memory;
            shape = data.shape, indicesAddress = data.indicesAddress, bitDepthStarts = data.bitDepthStarts, bitDepths = data.bitDepths, metasAddress = data.metasAddress, blocksAddress = data.blocksAddress, n = data.n, xOffset = data.xOffset, xBuffer = data.xBuffer, biasAddress = data.biasAddress;
            aligned_alloc = exports.aligned_alloc, free = exports.free, pv_picollm_weight_block_mixed_16x8_forward_multiple = exports.pv_picollm_weight_block_mixed_16x8_forward_multiple, pv_picollm_weight_block_mixed_16x8_add_bias = exports.pv_picollm_weight_block_mixed_16x8_add_bias;
            _memAlloc$get5 = memAlloc.get(indicesAddress), workerIndicesAddress = _memAlloc$get5.workerMemAddress;
            _memAlloc$get6 = memAlloc.get(metasAddress), workerMetasAddress = _memAlloc$get6.workerMemAddress;
            _memAlloc$get7 = memAlloc.get(blocksAddress), workerBlocksAddress = _memAlloc$get7.workerMemAddress;
            shapeAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * shape.length);
            bitDepthsStartAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepthStarts.length);
            bitDepthsAddress = aligned_alloc(Int32Array.BYTES_PER_ELEMENT, Int32Array.BYTES_PER_ELEMENT * bitDepths.length);
            workerXAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, Float32Array.BYTES_PER_ELEMENT * xBuffer.length);
            workerYAddress = aligned_alloc(Float32Array.BYTES_PER_ELEMENT, Float32Array.BYTES_PER_ELEMENT * (shape[0] * n));
            memoryBufferFloat32 = new Float32Array(memory.buffer);
            memoryBufferInt32 = new Int32Array(memory.buffer);
            memoryBufferInt32.set(shape, shapeAddress / Int32Array.BYTES_PER_ELEMENT);
            memoryBufferInt32.set(bitDepthStarts, bitDepthsStartAddress / Int32Array.BYTES_PER_ELEMENT);
            memoryBufferInt32.set(bitDepths, bitDepthsAddress / Int32Array.BYTES_PER_ELEMENT);
            memoryBufferFloat32.set(xBuffer, workerXAddress / Float32Array.BYTES_PER_ELEMENT);
            pv_picollm_weight_block_mixed_16x8_forward_multiple(shapeAddress, workerIndicesAddress, bitDepths.length, bitDepthsStartAddress, bitDepthsAddress, workerMetasAddress, workerBlocksAddress, n, workerXAddress + xOffset, workerYAddress);
            if (memAlloc.has(biasAddress)) {
              _memAlloc$get8 = memAlloc.get(biasAddress), workerBiasAddress = _memAlloc$get8.workerMemAddress, allocSize = _memAlloc$get8.allocSize;
              dimension = allocSize / Float32Array.BYTES_PER_ELEMENT;
              pv_picollm_weight_block_mixed_16x8_add_bias(n, dimension, workerYAddress, workerBiasAddress);
            }
            res = new Float32Array(memory.buffer).slice(workerYAddress / Float32Array.BYTES_PER_ELEMENT, workerYAddress / Float32Array.BYTES_PER_ELEMENT + shape[0] * n);
            free(shapeAddress);
            free(bitDepthsStartAddress);
            free(bitDepthsAddress);
            free(workerXAddress);
            free(workerYAddress);
            return _context3.abrupt("return", res);
          case 26:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function weightBlockMixed16x8ForwardMultiple(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
  _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BLOCKS, weightBlockMixed16x8PreprocessBlocks), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_METAS, weightBlockMixed16x8PreprocessMetas), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_PREPROCESS_BIAS, weightBlockMixed16x8PreprocessBias), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_SINGLE, weightBlockMixed16x8ForwardSingle), PvPicollmWeightAction.WEIGHT_BLOCK_MIXED_16X8_FORWARD_MULTIPLE, weightBlockMixed16x8ForwardMultiple);

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
  var PV_XPU_DEVICE_MEM_FLAG_SHARED = 1 << 1;
  var PV_XPU_DEVICE_MEM_FLAG_WORKER = 1 << 2;
  var PV_XPU_DEVICE_MEM_FLAG_SINGLE = 1 << 3;
  var DEFAULT_NUM_WORKERS = 8;
  var initXpu = function initXpu(memory, xpuHelperWasm) {
    var graph = new PvGraph();
    graph.memory = memory;
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
              numCores = self.navigator.hardwareConcurrency;
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
              if (numWorkers === 0) {
                numWorkers = DEFAULT_NUM_WORKERS;
              }
              osWorkers = self.navigator.hardwareConcurrency;
              workerSize = osWorkers && osWorkers < numWorkers ? osWorkers : numWorkers;
              workers = [];
              i = 0;
            case 10:
              if (!(i < workerSize)) {
                _context2.next = 18;
                break;
              }
              worker = new PvWorker(new WorkerFactory());
              workers.push(worker);
              _context2.next = 15;
              return poolPvWorker(worker, {
                action: PvXpuAction.INIT,
                wasm: xpuHelperWasm
              });
            case 15:
              i++;
              _context2.next = 10;
              break;
            case 18:
              if (!imports.pv_picollm_feed_forward_almost_gelu_init_lookup_table) {
                _context2.next = 21;
                break;
              }
              _context2.next = 21;
              return imports.pv_picollm_feed_forward_almost_gelu_init_lookup_table();
            case 21:
              PvXpu.addXpu(objAddress, {
                deviceMem: new Set(),
                numWorkers: workerSize,
                workers: workers,
                graph: graph
              });
              setInt(statusAddress, 0);
            case 23:
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
    var pvXpuDeviceGetUniquePointer = function pvXpuDeviceGetUniquePointer() {
      return PvXpu.getUniquePointer();
    };
    var pvXpuDeviceMemAlloc = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(objAddress, memAddress, sizeBytes, batchSize, memFlag, statusAddress) {
        var obj, workers, numWorkers, chunkSize, worker, workerResults, single, shared, batch, remaining, i;
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
              workers = obj.workers, numWorkers = obj.numWorkers;
              chunkSize = sizeBytes;
              worker = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_WORKER);
              if (!worker) {
                _context3.next = 40;
                break;
              }
              workerResults = [];
              single = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SINGLE);
              if (!single) {
                _context3.next = 17;
                break;
              }
              workerResults.push(poolPvWorker(workers[0], {
                action: PvXpuAction.ALLOC,
                size: sizeBytes,
                memAddress: memAddress
              }));
              _context3.next = 38;
              break;
            case 17:
              shared = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SHARED);
              batch = batchSize === 0 ? numWorkers : batchSize;
              if (!(!shared && sizeBytes % batch !== 0)) {
                _context3.next = 23;
                break;
              }
              setInt(statusAddress, -1);
              console.error("Failed to allocate memory: alloc size ".concat(sizeBytes, " must be divisible by batch ").concat(batch, "."));
              return _context3.abrupt("return");
            case 23:
              chunkSize = Math.ceil(sizeBytes / batch / obj.numWorkers) * batch;
              remaining = sizeBytes;
              i = 0;
            case 26:
              if (!(i < obj.numWorkers)) {
                _context3.next = 38;
                break;
              }
              if (!shared) {
                _context3.next = 31;
                break;
              }
              workerResults.push(poolPvWorker(workers[i], {
                action: PvXpuAction.ALLOC,
                size: sizeBytes,
                memAddress: memAddress
              }));
              _context3.next = 35;
              break;
            case 31:
              workerResults.push(poolPvWorker(workers[i], {
                action: PvXpuAction.ALLOC,
                size: Math.min(remaining, chunkSize),
                memAddress: memAddress
              }));
              remaining -= chunkSize;
              if (!(remaining <= 0)) {
                _context3.next = 35;
                break;
              }
              return _context3.abrupt("break", 38);
            case 35:
              i++;
              _context3.next = 26;
              break;
            case 38:
              _context3.next = 40;
              return Promise.all(workerResults);
            case 40:
              PvXpu.addMemory(memAddress, {
                objAddress: objAddress,
                memFlag: memFlag,
                allocSize: sizeBytes,
                chunkSize: chunkSize
              });
              if (!graph.enabled) {
                setInt(statusAddress, 0);
              }
            case 42:
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
        var _PvXpu$getMemory, objAddress, memFlag, obj, worker, workerResults, i;
        return _regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              memAddress = unsignedAddress(memAddress);
              if (!PvXpu.hasMemory(memAddress)) {
                _context4.next = 16;
                break;
              }
              _PvXpu$getMemory = PvXpu.getMemory(memAddress), objAddress = _PvXpu$getMemory.objAddress, memFlag = _PvXpu$getMemory.memFlag;
              obj = PvXpu.getXpu(objAddress);
              worker = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_WORKER);
              if (worker) {
                _context4.next = 10;
                break;
              }
              _context4.next = 8;
              return imports.free(memAddress);
            case 8:
              _context4.next = 14;
              break;
            case 10:
              workerResults = [];
              for (i = 0; i < obj.numWorkers; i++) {
                workerResults.push(poolPvWorker(obj.workers[i], {
                  action: PvXpuAction.FREE,
                  memAddress: memAddress
                }));
              }
              _context4.next = 14;
              return Promise.all(workerResults);
            case 14:
              PvXpu.removeMemory(memAddress);
              PvXpu.removeUniquePointer(memAddress);
            case 16:
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
        var mem, objAddress, memFlag, chunkSize, obj, worker, memoryBufferUint8, workerResults, buffer, single, shared, remaining, i, chunkStart, chunkEnd, inChunkOffset, inChunkSize, inChunkBufferStart;
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
              objAddress = mem.objAddress, memFlag = mem.memFlag, chunkSize = mem.chunkSize;
              obj = PvXpu.getXpu(objAddress);
              worker = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_WORKER);
              if (worker) {
                _context5.next = 13;
                break;
              }
              memoryBufferUint8 = new Uint8Array(memory.buffer);
              memoryBufferUint8.set(memoryBufferUint8.slice(hostAddress, hostAddress + sizeBytes), memAddress + offset);
              _context5.next = 38;
              break;
            case 13:
              workerResults = [];
              buffer = new Uint8Array(memory.buffer).slice(hostAddress, hostAddress + sizeBytes);
              single = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SINGLE);
              if (!single) {
                _context5.next = 20;
                break;
              }
              workerResults.push(poolPvWorker(obj.workers[0], {
                action: PvXpuAction.COPY_TO_XPU,
                memAddress: memAddress,
                offset: offset,
                buffer: buffer
              }));
              _context5.next = 36;
              break;
            case 20:
              shared = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SHARED);
              remaining = sizeBytes;
              i = 0;
            case 23:
              if (!(i < obj.numWorkers)) {
                _context5.next = 36;
                break;
              }
              if (!shared) {
                _context5.next = 28;
                break;
              }
              workerResults.push(poolPvWorker(obj.workers[i], {
                action: PvXpuAction.COPY_TO_XPU,
                memAddress: memAddress,
                offset: offset,
                buffer: buffer
              }));
              _context5.next = 33;
              break;
            case 28:
              chunkStart = i * chunkSize;
              chunkEnd = (i + 1) * chunkSize;
              if (offset < chunkEnd) {
                inChunkOffset = offset > chunkStart ? offset - chunkStart : 0;
                inChunkSize = chunkSize - inChunkOffset;
                inChunkBufferStart = sizeBytes - remaining;
                workerResults.push(poolPvWorker(obj.workers[i], {
                  action: PvXpuAction.COPY_TO_XPU,
                  memAddress: memAddress,
                  offset: inChunkOffset,
                  buffer: buffer.slice(inChunkBufferStart, inChunkBufferStart + inChunkSize)
                }));
                remaining -= inChunkSize;
              }
              if (!(remaining <= 0)) {
                _context5.next = 33;
                break;
              }
              return _context5.abrupt("break", 36);
            case 33:
              i++;
              _context5.next = 23;
              break;
            case 36:
              _context5.next = 38;
              return Promise.all(workerResults);
            case 38:
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
        var mem, objAddress, allocSize, memFlag, chunkSize, obj, worker, memoryBufferUint8, workerResults, shared, single, remaining, i, chunkStart, chunkEnd, inChunkOffset, inChunkSize, results, _memoryBufferUint, copied, _i3, result;
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
              objAddress = mem.objAddress, allocSize = mem.allocSize, memFlag = mem.memFlag, chunkSize = mem.chunkSize;
              obj = PvXpu.getXpu(objAddress);
              worker = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_WORKER);
              if (worker) {
                _context6.next = 13;
                break;
              }
              memoryBufferUint8 = new Uint8Array(memory.buffer);
              memoryBufferUint8.set(memoryBufferUint8.slice(memAddress + offset, memAddress + offset + sizeBytes), hostAddress);
              _context6.next = 49;
              break;
            case 13:
              workerResults = [];
              shared = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SHARED);
              single = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SINGLE);
              if (!(shared || single)) {
                _context6.next = 20;
                break;
              }
              workerResults.push(poolPvWorker(obj.workers[0], {
                action: PvXpuAction.COPY_FROM_XPU,
                memAddress: memAddress,
                offset: offset,
                size: allocSize
              }));
              _context6.next = 31;
              break;
            case 20:
              remaining = allocSize;
              i = 0;
            case 22:
              if (!(i < obj.numWorkers)) {
                _context6.next = 31;
                break;
              }
              chunkStart = i * chunkSize;
              chunkEnd = (i + 1) * chunkSize;
              if (offset < chunkEnd) {
                inChunkOffset = offset > chunkStart ? offset - chunkStart : 0;
                inChunkSize = Math.min(remaining, chunkSize - inChunkOffset);
                workerResults.push(poolPvWorker(obj.workers[i], {
                  action: PvXpuAction.COPY_FROM_XPU,
                  memAddress: memAddress,
                  offset: inChunkOffset,
                  size: inChunkSize
                }));
                remaining -= inChunkSize;
              }
              if (!(remaining === 0)) {
                _context6.next = 28;
                break;
              }
              return _context6.abrupt("break", 31);
            case 28:
              i++;
              _context6.next = 22;
              break;
            case 31:
              _context6.next = 33;
              return Promise.all(workerResults);
            case 33:
              results = _context6.sent;
              _memoryBufferUint = new Uint8Array(memory.buffer);
              copied = 0;
              _i3 = 0;
            case 37:
              if (!(_i3 < results.length)) {
                _context6.next = 49;
                break;
              }
              result = results[_i3];
              if (!(copied + result.length > sizeBytes)) {
                _context6.next = 44;
                break;
              }
              _memoryBufferUint.set(result.slice(0, sizeBytes - copied), hostAddress + copied);
              return _context6.abrupt("break", 49);
            case 44:
              _memoryBufferUint.set(result, hostAddress + copied);
              copied += result.length;
            case 46:
              _i3++;
              _context6.next = 37;
              break;
            case 49:
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
        var mem, objAddress, allocSize, memFlag, chunkSize, obj, worker, memoryBufferUint8, workerResults, single, shared, remaining, i;
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
              objAddress = mem.objAddress, allocSize = mem.allocSize, memFlag = mem.memFlag, chunkSize = mem.chunkSize;
              obj = PvXpu.getXpu(objAddress);
              worker = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_WORKER);
              if (worker) {
                _context7.next = 12;
                break;
              }
              memoryBufferUint8 = new Uint8Array(memory.buffer);
              memoryBufferUint8.fill(fillByte, memAddress, memAddress + sizeBytes);
              _context7.next = 35;
              break;
            case 12:
              workerResults = [];
              single = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SINGLE);
              if (!single) {
                _context7.next = 18;
                break;
              }
              workerResults.push(poolPvWorker(obj.workers[0], {
                action: PvXpuAction.MEMSET,
                memAddress: memAddress,
                fillByte: fillByte,
                size: allocSize
              }));
              _context7.next = 33;
              break;
            case 18:
              shared = Boolean(memFlag & PV_XPU_DEVICE_MEM_FLAG_SHARED);
              remaining = sizeBytes;
              i = 0;
            case 21:
              if (!(i < obj.numWorkers)) {
                _context7.next = 33;
                break;
              }
              if (!shared) {
                _context7.next = 26;
                break;
              }
              workerResults.push(poolPvWorker(obj.workers[i], {
                action: PvXpuAction.MEMSET,
                memAddress: memAddress,
                fillByte: fillByte,
                size: allocSize
              }));
              _context7.next = 30;
              break;
            case 26:
              workerResults.push(poolPvWorker(obj.workers[i], {
                action: PvXpuAction.MEMSET,
                memAddress: memAddress,
                fillByte: fillByte,
                size: Math.min(remaining, chunkSize)
              }));
              remaining -= chunkSize;
              if (!(remaining <= 0)) {
                _context7.next = 30;
                break;
              }
              return _context7.abrupt("break", 33);
            case 30:
              i++;
              _context7.next = 21;
              break;
            case 33:
              _context7.next = 35;
              return Promise.all(workerResults);
            case 35:
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
              maxWorkers = self.navigator.hardwareConcurrency;
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
                workerResults.push(poolPvWorker(obj.workers[i], {
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
                workerResults.push(poolPvWorker(obj.workers[i], {
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
    var pvXpuStartGraph = /*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee11(objAddress) {
        var obj;
        return _regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context11.next = 4;
                break;
              }
              return _context11.abrupt("return");
            case 4:
              graph.enabled = true;
            case 5:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      return function pvXpuStartGraph(_x30) {
        return _ref11.apply(this, arguments);
      };
    }();
    var pvXpuStopGraph = /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee12(objAddress) {
        var obj;
        return _regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context12.next = 4;
                break;
              }
              return _context12.abrupt("return");
            case 4:
              graph.enabled = false;
            case 5:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      return function pvXpuStopGraph(_x31) {
        return _ref12.apply(this, arguments);
      };
    }();
    var pvXpuExecuteGraph = /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee13(objAddress, statusAddress) {
        var obj;
        return _regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              objAddress = unsignedAddress(objAddress);
              obj = PvXpu.getXpu(objAddress);
              if (obj) {
                _context13.next = 5;
                break;
              }
              setInt(statusAddress, -1);
              return _context13.abrupt("return");
            case 5:
              _context13.prev = 5;
              _context13.next = 8;
              return graph.execute();
            case 8:
              setInt(statusAddress, 0);
              _context13.next = 14;
              break;
            case 11:
              _context13.prev = 11;
              _context13.t0 = _context13["catch"](5);
              setInt(statusAddress, -1);
            case 14:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[5, 11]]);
      }));
      return function pvXpuExecuteGraph(_x32, _x33) {
        return _ref13.apply(this, arguments);
      };
    }();
    var pvXpuGraphifiedAlloc = /*#__PURE__*/function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee14(alignment, size, addressAddress) {
        var addr, memoryBufferInt32, _memoryBufferInt;
        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              addressAddress = unsignedAddress(addressAddress);
              _context14.prev = 1;
              _context14.next = 4;
              return imports.aligned_alloc(alignment, size);
            case 4:
              addr = _context14.sent;
              memoryBufferInt32 = new Int32Array(memory.buffer);
              memoryBufferInt32[addressAddress / Int32Array.BYTES_PER_ELEMENT] = addr;
              _context14.next = 13;
              break;
            case 9:
              _context14.prev = 9;
              _context14.t0 = _context14["catch"](1);
              _memoryBufferInt = new Int32Array(memory.buffer);
              _memoryBufferInt[addressAddress / Int32Array.BYTES_PER_ELEMENT] = 0;
            case 13:
            case "end":
              return _context14.stop();
          }
        }, _callee14, null, [[1, 9]]);
      }));
      return function pvXpuGraphifiedAlloc(_x34, _x35, _x36) {
        return _ref14.apply(this, arguments);
      };
    }();
    var pvXpuGraphifiedFree = /*#__PURE__*/function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee15(address) {
        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return imports.free(address);
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      return function pvXpuGraphifiedFree(_x37) {
        return _ref15.apply(this, arguments);
      };
    }();
    var pvXpuTableForward = /*#__PURE__*/function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee16(objAddress, n, xAddress, yAddress) {
        return _regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return imports.pv_picollm_table_forward(objAddress, n, xAddress, yAddress);
            case 2:
            case "end":
              return _context16.stop();
          }
        }, _callee16);
      }));
      return function pvXpuTableForward(_x38, _x39, _x40, _x41) {
        return _ref16.apply(this, arguments);
      };
    }();
    var imports = _objectSpread({
      aligned_alloc: function aligned_alloc(alignment, size) {
        throw new Error("aligned_alloc was not passed in from parent module");
      },
      free: function free(address) {
        throw new Error("free was not passed in from parent module");
      },
      pv_picollm_table_forward: function pv_picollm_table_forward(objAddress, numTokens, xAddress, yAddress) {
        throw new Error("pv_picollm_table_forward was not passed in from parent module");
      },
      pv_picollm_feed_forward_almost_gelu_init_lookup_table: undefined,
      pv_xpu_graphified_alloc_wasm: graph.graphify(pvXpuGraphifiedAlloc, [2], 2, undefined, 1),
      pv_xpu_graphified_free_wasm: graph.graphify(pvXpuGraphifiedFree, [0], 0, undefined, 1),
      pv_xpu_web_worker_device_info_wasm: pvXpuDeviceInfo,
      pv_xpu_web_worker_device_init_wasm: pvXpuDeviceInit,
      pv_xpu_web_worker_device_cleanup_wasm: pvXpuDeviceCleanup,
      pv_xpu_web_worker_device_get_unique_pointer_wasm: pvXpuDeviceGetUniquePointer,
      pv_xpu_web_worker_device_mem_alloc_wasm: graph.graphify(pvXpuDeviceMemAlloc, [1], 1),
      pv_xpu_web_worker_device_mem_free_wasm: graph.graphify(pvXpuDeviceMemFree, [0], 0, undefined, undefined),
      pv_xpu_web_worker_device_mem_copy_to_xpu_wasm: graph.graphify(pvXpuDeviceMemCopyToXpu, [0, 1], 0, undefined, undefined),
      pv_xpu_web_worker_device_mem_copy_from_xpu_wasm: graph.graphify(pvXpuDeviceMemCopyFromXpu, [0, 1], -1, undefined, undefined),
      pv_xpu_web_worker_device_mem_memset_wasm: graph.graphify(pvXpuDeviceMemMemset, [0], 0, undefined, undefined),
      pv_xpu_web_worker_get_max_workers_wasm: pvXpuGetMaxWorkersWasm,
      pv_xpu_web_worker_timer_start_wasm: pvXpuTimerStart,
      pv_xpu_web_worker_timer_stop_wasm: pvXpuTimerStop,
      pv_xpu_web_worker_start_graph_wasm: pvXpuStartGraph,
      pv_xpu_web_worker_stop_graph_wasm: pvXpuStopGraph,
      pv_xpu_web_worker_execute_graph_wasm: pvXpuExecuteGraph,
      pv_xpu_web_worker_picollm_table_forward_wasm: graph.graphify(pvXpuTableForward, [2, 3], 3, undefined, undefined)
    }, getMvmWasmFunctions(memory));
    var wasmFunctionList = [getPicollmAttentionWasmFunctions, getPicollmFeedForwardWasmFunctions, getPicollmGateWasmFunctions, getPicollmMoeTransformerWasmFunctions, getPicollmNormWasmFunctions, getPicollmNormLayerWasmFunctions, getPicollmTransformerWasmFunctions, getPicollmWeightWasmFunctions];
    for (var _i4 = 0, _wasmFunctionList = wasmFunctionList; _i4 < _wasmFunctionList.length; _i4++) {
      var fn = _wasmFunctionList[_i4];
      // @ts-ignore
      for (var _i5 = 0, _Object$entries = Object.entries(fn(memory, graph, imports)); _i5 < _Object$entries.length; _i5++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i5], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];
        // @ts-ignore
        imports[k] = v;
      }
    }
    return imports;
  };

  return initXpu;

})();
