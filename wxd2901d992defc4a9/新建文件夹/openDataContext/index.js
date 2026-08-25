var _typeof2 = require("../openDataContext/@babel/runtime/helpers/typeof");
! function(t) {
  var e = {};

  function n(i) {
    if (e[i]) return e[i].exports;
    var r = e[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
  }
  n.m = t, n.c = e, n.d = function(t, e, i) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: i
    });
  }, n.r = function(t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    });
  }, n.t = function(t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof2(t) && t && t.__esModule) return t;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
      for (var r in t) n.d(i, r, function(e) {
        return t[e];
      }.bind(null, r));
    return i;
  }, n.n = function(t) {
    var e = t && t.__esModule ? function() {
      return t.default;
    } : function() {
      return t;
    };
    return n.d(e, "a", e), e;
  }, n.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = "", n(n.s = 0);
}([function(t, e, n) {


  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }
  n.r(e);
  var r = function() {
    function t(e) {
      if (function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this._init = e, this._children = [], this._parent = null, this.x = 0, this.y = 0, this.width = 0, this.height = 0, this._active = !0, this.engine = null, this.__mixin__)
        for (var n = 0; n < this.__mixin__.length; n++) this.__mixin__[n].call(this, e);
      if (e)
        for (var i in e) "$" != i[0] && (this[i] = e[i]);
    }
    var e, n, r;
    return e = t, (n = [{
      key: "active",
      get: function get() {
        return this._active;
      },
      set: function set(t) {
        this._active != t && (this._active = t, this.engine && (t ? this._callOnEnter(this.engine) : t || this._callOnExit(this.engine)));
      }
    }, {
      key: "addChild",
      value: function value(t) {
        this._children.push(t), t._parent = this, this._attached && t._call, this._active && this.engine && t._callOnEnter(this.engine), this.onAddChild && this.onAddChild(t);
      }
    }, {
      key: "removeChild",
      value: function value(t) {
        var e = this._children.indexOf(t); -
        1 != e && (this._children.splice(e, 1), this._active && this.engine && t._callOnExit(null), this.onRemoveChild && this.onRemoveChild(t));
      }
    }, {
      key: "removeAllChildren",
      value: function value() {
        for (; this._children.length;) {
          var t = this._children.shift();
          this._active && this.engine && t._callOnExit(null), this.onRemoveChild && this.onRemoveChild(t);
        }
      }
    }, {
      key: "removeFromParent",
      value: function value() {
        null !== this._parent && this._parent.removeChild(this);
      }
    }, {
      key: "_callOnEnter",
      value: function value(t) {
        if (this.engine = t, this._active) {
          for (var e = 0; e < this._children.length; e++) this._children[e]._callOnEnter(t);
          this.onEnter && this.onEnter(), this.__mixinEvent__ && this.emit("enter");
        }
      }
    }, {
      key: "_callOnExit",
      value: function value(t) {
        if (this._active) {
          this.onExit && this.onExit(), this.__mixinEvent__ && this.emit("exit");
          for (var e = 0; e < this._children.length; e++) this._children[e]._callOnExit(t);
          this.engine = t;
        }
      }
    }, {
      key: "_callUpdate",
      value: function value(t) {
        for (var e = 0; e < this._children.length; e++) this._children[e]._callUpdate(t);
        this.update && this.update(t);
      }
    }, {
      key: "_render",
      value: function value(t, e, n, i, r, o, a) {
        this.render && this.render(t, e, n, i, r, this.x * this.engine._scale.x + o, this.y * this.engine._scale.y + a);
        for (var s = 0; s < this._children.length; s++) this._children[s]._render(t, e, n, i, r, this.x * this.engine._scale.x + o, this.y * this.engine._scale.y + a);
      }
    }, {
      key: "mixin",
      value: function value(t) {
        this.__proto__ = {
          __proto__: this.__proto__
        }, Object.assign(this.__proto__, t.prototype), t.call(this, this._init);
      }
    }, {
      key: "localToGlobal",
      value: function value(t, e) {
        return null == this._parent ? {
          x: 0,
          y: 0
        } : this._parent.localToGlobal(this.x + t, this.y + e);
      }
    }, {
      key: "globalToLocal",
      value: function value(t, e) {
        if (null == this._parent) return {
          x: 0,
          y: 0
        };
        var n = this._parent.globalToLocal(t, e);
        return {
          x: n.x - this.x,
          y: n.y - this.y
        };
      }
    }, {
      key: "isInside",
      value: function value(t, e) {
        return t > 0 && t < this.width && e > 0 && e < this.height;
      }
    }]) && i(e.prototype, n), r && i(e, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), t;
  }();

  function o(t) {
    return (o = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function a(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function s(t, e) {
    return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function c(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = u(t);
      if (e) {
        var r = u(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return h(this, n);
    };
  }

  function h(t, e) {
    if (e && ("object" === o(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function u(t) {
    return (u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var l = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && s(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = c(o);

    function o(t) {
      var e;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (e = r.call(this, t))._wxCanvas = wx.getSharedCanvas(), e.ctx = e._wxCanvas.getContext("2d"), e.width = e._wxCanvas.width, e.height = e._wxCanvas.height, e;
    }
    return e = o, (n = [{
      key: "_renderCanvas",
      value: function value() {
        this.ctx.setTransform(this.engine._scale.x, 0, 0, this.engine._scale.y, 0, 0), this.ctx.clearRect(0, 0, this.width, this.height);
        for (var t = 0; t < this._children.length; t++) this._children[t]._render(this.ctx, 1, 0, 0, 1, 0, 0);
      }
    }, {
      key: "localToGlobal",
      value: function value(t, e) {
        return {
          x: t,
          y: e
        };
      }
    }, {
      key: "globalToLocal",
      value: function value(t, e) {
        return {
          x: t,
          y: e
        };
      }
    }]) && a(e.prototype, n), i && a(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function f(t) {
    this._events = this._events || {}, this.__mixinEvent__ = !0;
  }

  function d(t) {
    return (d = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function p(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function y(t, e) {
    return (y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function v(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = b(t);
      if (e) {
        var r = b(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return g(this, n);
    };
  }

  function g(t, e) {
    if (e && ("object" === d(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function b(t) {
    return (b = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  f.prototype.on = function(t, e) {
    (this._events[t] || (this._events[t] = [])).push({
      func: e,
      once: !1
    });
  }, f.prototype.once = function(t, e) {
    (this._events[t] || (this._events[t] = [])).push({
      func: e,
      once: !0
    });
  }, f.prototype.off = function(t, e) {
    var n = this._events[t];
    if (n && 0 !== n.length)
      if (void 0 !== e) {
        for (var i = 0; i < n.length; i++)
          if (n[i].func == e) return void n.splice(i, 1);
      } else null != t ? this._events[t] = [] : this._events = {};
  }, f.prototype.emit = function(t) {
    var e = this._events[t];
    if (e && 0 !== e.length) {
      for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) i[r - 1] = arguments[r];
      for (var o = 0; o < e.length; o++) {
        var a;
        (a = e[o].func).call.apply(a, [this].concat(i)), e[o].once && (e.splice(o, 1), o--);
      }
    }
  };
  var _ = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && y(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = v(o);

    function o(t) {
      var e;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (e = r.call(this, t)).text = void 0 === e.text ? "Label" : e.text, e.font = e.font || "normal 28px Microsoft YaHei", e.textBaseline = e.textBaseline || "middle", e.fillStyle = e.fillStyle || "#000000", e.textAlign = e.textAlign || "left", e.maxWidth = e.maxWidth || 600, e.stroke = e.stroke || 0, e.stroke = e.stroke || 0, e.strokeStyle = e.strokeStyle || "#000000", e;
    }
    return e = o, (n = [{
      key: "render",
      value: function value(t, e, n, i, r, o, a) {
        t.setTransform(e, n, i, r, o, a), t.font = this.font, t.fillStyle = this.fillStyle, t.textAlign = this.textAlign, t.textBaseline = this.textBaseline, this.stroke && (t.lineWidth = 2 * this.stroke, t.strokeStyle = this.strokeStyle, t.strokeText(this.text, 0, 0)), t.fillText(this.text, 0, 0, this.maxWidth);
      }
    }, {
      key: "getTextWidth",
      value: function value() {
        var t = wx.getSharedCanvas().getContext("2d");
        return t.font = this.font, t.measureText(this.text).width;
      }
    }]) && p(e.prototype, n), i && p(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function m(t) {
    return (m = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function w(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function x(t, e) {
    return (x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function O(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = T(t);
      if (e) {
        var r = T(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return k(this, n);
    };
  }

  function k(t, e) {
    if (e && ("object" === m(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function T(t) {
    return (T = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var S = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && x(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = O(o);

    function o(t) {
      var e;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (e = r.call(this, t)).image = e.image || null, e.patch9 = e.patch9 || null, e;
    }
    return e = o, (n = [{
      key: "render",
      value: function value(t, e, n, i, r, o, a) {
        if (this.image)
          if (t.setTransform(e, n, i, r, o, a), this.patch9) {
            var s = this.patch9.x,
              c = this.patch9.y,
              h = this.patch9.w,
              u = this.patch9.h,
              l = this.image.width,
              f = this.image.height,
              d = this.width,
              p = this.height;
            t.drawImage(this.image, 0, 0, s, c, 0, 0, s, c), t.drawImage(this.image, s, 0, h, c, s, 0, d - s - (l - s - h), c), t.drawImage(this.image, s + h, 0, l - s - h, c, d - (l - s - h), 0, l - s - h, c), t.drawImage(this.image, 0, c, s, u, 0, c, s, p - c - (f - c - u)), t.drawImage(this.image, s, c, h, u, s, c, d - s - (l - s - h), p - c - (f - c - u)), t.drawImage(this.image, s + h, c, l - s - h, u, d - (l - s - h), c, l - s - h, p - c - (f - c - u)), t.drawImage(this.image, 0, c + u, s, f - u - c, 0, p - (f - c - u), s, f - c - u), t.drawImage(this.image, s, c + u, h, f - u - c, s, p - (f - c - u), d - s - (l - s - h), f - c - u), t.drawImage(this.image, s + h, c + u, l - s - h, f - u - c, d - (l - s - h), p - (f - c - u), l - s - h, f - c - u);
          } else t.drawImage(this.image, 0, 0, this.width, this.height);
      }
    }, {
      key: "fitImgSize",
      value: function value() {
        this.width = this.image.width, this.height = this.image.height;
      }
    }, {
      key: "wait",
      value: function value(t, e) {
        var n = this;
        t.then(function(t) {
          n.image = t, e && n.fitImgSize();
        });
      }
    }]) && w(e.prototype, n), i && w(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function j(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function P(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function C(t, e, n) {
    return e && P(t.prototype, e), n && P(t, n), Object.defineProperty(t, "prototype", {
      writable: !1
    }), t;
  }
  var L = function() {
      function t(e, n, i) {
        j(this, t), this.id = e, this.begin = {
          x: n,
          y: i
        }, this.beginAt = Date.now(), this.current = {
          x: n,
          y: i
        }, this.currentAt = this.beginAt, this.delta = {
          x: 0,
          y: 0
        }, this.interval = 0, this.inviter = [], this.handle = !1, this.swallow = !1;
      }
      return C(t, [{
        key: "_moveTo",
        value: function value(t, e) {
          if (t != this.current.x || e != this.current.y) {
            var n = this.current,
              i = this.currentAt;
            this.current = {
              x: t,
              y: e
            }, this.currentAt = Date.now(), this.delta = {
              x: this.current.x - n.x,
              y: this.current.y - n.y
            }, this.interval = this.currentAt - i;
          }
        }
      }, {
        key: "distance",
        get: function get() {
          var t = this.current.x - this.begin.x,
            e = this.current.y - this.begin.y;
          return Math.sqrt(t * t + e * e);
        }
      }]), t;
    }(),
    E = function() {
      function t(e) {
        j(this, t), this.engine = e, this.touch = null, this.handlers = {
          begin: this._onTouchBegin.bind(this),
          move: this._onTouchMove.bind(this),
          end: this._onTouchEnd.bind(this),
          cancel: this._onTouchCancel.bind(this)
        }, this.layers = [], this.layerNodes = {}, this.layerNodeMap = new Map(), this._addListener();
      }
      return C(t, [{
        key: "addLayer",
        value: function value(t, e) {
          -1 == this.layers.indexOf(t) && (this.layers.push(t), this.layers.sort(), this.layerNodes[t.toString()] = []), this.layerNodes[t.toString()].push(e), this.layerNodeMap.set(e, t);
        }
      }, {
        key: "removeLayer",
        value: function value(t) {
          var e = this.layerNodeMap.get(t);
          if (void 0 !== e) {
            this.layerNodeMap.delete(t);
            var n = this.layerNodes[e.toString()];
            if (n) {
              var i = n.indexOf(t);
              i >= 0 && n.splice(i, 1);
            }
          }
        }
      }, {
        key: "_addListener",
        value: function value() {
          wx.onTouchStart(this.handlers.begin), wx.onTouchMove(this.handlers.move), wx.onTouchEnd(this.handlers.end), wx.onTouchCancel(this.handlers.cancel);
        }
      }, {
        key: "_removeListener",
        value: function value() {
          wx.offTouchStart(this.handlers.begin), wx.offTouchMove(this.handlers.move), wx.offTouchEnd(this.handlers.end), wx.offTouchCancel(this.handlers.cancel);
        }
      }, {
        key: "_onTouchBegin",
        value: function value(t) {
          if (this.engine.updateTimer && null == this.touch && !(t.changedTouches.length <= 0)) {
            var e = t.changedTouches[0];
            this.touch = new L(e.identifier, e.pageX * this.engine._scale.x * this.engine._touchScale.x - this.engine._touchOffset.x, e.pageY * this.engine._scale.y * this.engine._touchScale.y - this.engine._touchOffset.y);
            for (var n = 0; n < this.layers.length; n++)
              for (var i = this.layerNodes[this.layers[n]], r = 0; r < i.length; r++) {
                if (this.touch.handle = !1, this.touch.swallow = !1, !0 === i[r].onTouchBegin(this.touch) || this.touch.handle) {
                  if (this.touch.swallow) {
                    for (var o = 0; o < this.touch.inviter.length; o++)
                      if (this.touch.inviter[o].onTouchCancel) try {
                        this.touch.inviter[o].onTouchCancel(this.touch);
                      } catch (t) {
                        console.error(t);
                      }
                    return void(this.touch.inviter = [i[r]]);
                  }
                  this.touch.inviter.push(i[r]);
                }
              }
          }
        }
      }, {
        key: "_onTouchMove",
        value: function value(t) {
          if (this.engine.updateTimer && null != this.touch && !(t.changedTouches.length <= 0)) {
            for (var e = null, n = 0; n < t.changedTouches.length; n++) t.changedTouches[n].identifier == this.touch.id && (e = t.changedTouches[n]);
            if (null != e) {
              this.touch.swallow = !1, this.touch._moveTo(e.pageX * this.engine._scale.x * this.engine._touchScale.x - this.engine._touchOffset.x, e.pageY * this.engine._scale.y * this.engine._touchScale.y - this.engine._touchOffset.y);
              for (var i = 0; i < this.touch.inviter.length; i++)
                if (this.touch.inviter[i].onTouchMove) {
                  try {
                    this.touch.inviter[i].onTouchMove(this.touch);
                  } catch (t) {
                    console.error(t);
                  }
                  if (this.touch.swallow) {
                    for (var r = 0; r < this.touch.inviter.length; r++)
                      if (r != i && this.touch.inviter[r].onTouchCancel) try {
                        this.touch.inviter[i].onTouchCancel(this.touch);
                      } catch (t) {
                        console.error(t);
                      }
                    return void(this.touch.inviter = [this.touch.inviter[i]]);
                  }
                }
            }
          }
        }
      }, {
        key: "_onTouchEnd",
        value: function value(t) {
          if (null != this.touch && !(t.changedTouches.length <= 0)) {
            for (var e = null, n = 0; n < t.changedTouches.length; n++) t.changedTouches[n].identifier == this.touch.id && (e = t.changedTouches[n]);
            if (null != e) {
              this.touch._moveTo(e.pageX * this.engine._scale.x * this.engine._touchScale.x - this.engine._touchOffset.x, e.pageY * this.engine._scale.y * this.engine._touchScale.y - this.engine._touchOffset.y);
              for (var i = 0; i < this.touch.inviter.length; i++)
                if (this.touch.inviter[i].onTouchEnd) try {
                  this.touch.inviter[i].onTouchEnd(this.touch);
                } catch (t) {
                  console.error(t);
                }
              if (this.touch.distance < 20 && this.touch.currentAt - this.touch.beginAt < 350)
                for (var r = 0; r < this.touch.inviter.length; r++)
                  if (this.touch.inviter[r].onTouchTap) try {
                    this.touch.inviter[r].onTouchTap(this.touch);
                  } catch (t) {
                    console.error(t);
                  }
              this.touch = null;
            }
          }
        }
      }, {
        key: "_onTouchCancel",
        value: function value(t) {
          if (null != this.touch && !(t.changedTouches.length <= 0)) {
            for (var e = null, n = 0; n < t.changedTouches.length; n++) t.changedTouches[n].identifier == this.touch.id && (e = t.changedTouches[n]);
            if (null != e) {
              for (var i = 0; i < this.touch.inviter.length; i++) this.touch.inviter[i].onTouchCancel && this.touch.inviter[i].onTouchCancel(this.touch);
              this.touch = null;
            }
          }
        }
      }], [{
        key: "addon",
        value: function value(e) {
          e.touchManager = new t(e);
        }
      }]), t;
    }();

  function M(t) {
    var e = this;
    this.__mixinTouchEvent__ || (this.__mixinTouchEvent__ = !0, this.__mixinEvent__ || this.mixin(f), this.touchLayer = 10, t && t.$touchMixin && null != t.$touchMixin.layer && (this.touchLayer = t.$touchEventMixin.layer), this.on("enter", function() {
      e.engine.touchManager.addLayer(e.touchLayer, e);
    }), this.on("exit", function() {
      e.engine.touchManager.removeLayer(e);
    }));
  }

  function I(t) {
    return (I = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function R(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function D(t, e) {
    return (D = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function B(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = A(t);
      if (e) {
        var r = A(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return F(this, n);
    };
  }

  function F(t, e) {
    if (e && ("object" === I(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function A(t) {
    return (A = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  M.prototype.onTouchBegin = function(t) {
    var e = this.globalToLocal(t.current.x, t.current.y);
    if (this.isInside(e.x, e.y)) return this.emit("touchBegin", t, e), !0;
  }, M.prototype.onTouchMove = function(t) {
    this.emit("touchMove", t);
  }, M.prototype.onTouchEnd = function(t) {
    this.emit("touchEnd", t);
  }, M.prototype.onTouchCancel = function(t) {
    this.emit("touchCancel", t);
  }, M.prototype.onTouchTap = function(t) {
    this.emit("touchTap", t);
  };
  var Y = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && D(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = B(o);

    function o(t) {
      var e;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (e = r.call(this, t)).maxY = 0, e.scrollY = 0, e.speed = 0, e._last5move = [], e._last5time = [], e.brake = .2, e.maxX = 0, e.scrollX = 0, e.isHorizontal = !1, null != t && null != t.isHorizontal && (e.isHorizontal = t.isHorizontal), e;
    }
    return e = o, (n = [{
      key: "onEnter",
      value: function value() {
        this.engine.touchManager.addLayer(10, this);
      }
    }, {
      key: "onAddChild",
      value: function value() {
        this.calculate();
      }
    }, {
      key: "onRemoveChild",
      value: function value() {
        this.calculate();
      }
    }, {
      key: "calculate",
      value: function value() {
        if (this.isHorizontal) {
          this.maxX = 0;
          for (var t = 0; t < this._children.length; t++) this.maxX = Math.max(this.maxX, this._children[t].x + this._children[t].width);
          this.maxX = this.maxX - this.width;
        } else {
          this.maxY = 0;
          for (var e = 0; e < this._children.length; e++) this.maxY = Math.max(this.maxY, this._children[e].y + this._children[e].height);
          this.maxY = this.maxY - this.height;
        }
      }
    }, {
      key: "update",
      value: function value(t) {
        if (0 != this.speed) {
          if (this.isHorizontal) {
            var e = this.speed * t;
            if (this.scrollX + e >= 0 && (e = -this.scrollX, this.speed = 0), this.scrollX + e < -this.maxX + this.width && (e = -(this.scrollX + this.maxX - this.width), this.speed = 0), 0 == e) return;
            this.scrollX += e;
            for (var n = 0; n < this._children.length; n++) this._children[n].x += e;
            this.onScroll && this.onScroll(e);
          } else {
            var i = this.speed * t;
            if (this.scrollY + i >= 0 && (i = -this.scrollY, this.speed = 0), this.scrollY + i < -this.maxY + this.height && (i = -(this.scrollY + this.maxY - this.height), this.speed = 0), 0 == i) return;
            this.scrollY += i;
            for (var r = 0; r < this._children.length; r++) this._children[r].y += i;
            this.onScroll && this.onScroll(i);
          }
          this.speed > 0 ? (this.speed -= 5e-4 * t, this.speed < 0 && (this.speed = 0)) : (this.speed += 5e-4 * t, this.speed > 0 && (this.speed = 0)), this.speed < .03 && this.speed > -.03 && (this.speed = 0);
        }
      }
    }, {
      key: "onTouchBegin",
      value: function value(t) {
        if (this.isHorizontal) {
          if (this.maxX <= this.width) return;
          var e = this.globalToLocal(t.current.x, t.current.y);
          if (!this.isInside(e.x, e.y)) return;
        } else {
          if (this.maxY <= this.height) return;
          var n = this.globalToLocal(t.current.x, t.current.y);
          if (!this.isInside(n.x, n.y)) return;
        }
        return this.speed = 0, this._last5move = [], !0;
      }
    }, {
      key: "onTouchMove",
      value: function value(t) {
        if (this.isHorizontal) {
          var e = t.delta.x;
          if (this.scrollX + e >= 0 && (e = -this.scrollX), this.scrollX + e < -this.maxX + this.width && (e = -(this.scrollX + this.maxX - this.width)), 0 == e) return;
          this.scrollX += e;
          for (var n = 0; n < this._children.length; n++) this._children[n].x += e;
          t.distance > 20 && (t.swallow = !0), this.onScroll && this.onScroll(e), this._gatherTouchMove(e, t.interval), console.log(this.scrollX, this.maxX, e);
        } else {
          var i = t.delta.y;
          if (this.scrollY + i >= 0 && (i = -this.scrollY), this.scrollY + i < -this.maxY + this.height && (i = -(this.scrollY + this.maxY - this.height)), 0 == i) return;
          this.scrollY += i;
          for (var r = 0; r < this._children.length; r++) this._children[r].y += i;
          t.distance > 20 && (t.swallow = !0), this.onScroll && this.onScroll(i), this._gatherTouchMove(i, t.interval);
        }
      }
    }, {
      key: "onTouchEnd",
      value: function value(t) {
        var e = 0,
          n = 0;
        if (this.isHorizontal) {
          if (this.scrollX >= 0) return void(this.speed = 0);
          if (this.scrollX <= -this.maxX) return void(this.speed = 0);
          this._gatherTouchMove(t.delta.x, t.interval);
          for (var i = 0; i < this._last5move.length; i++) n += this._last5move[i], e += this._last5time[i];
          if (e <= 0 || e > 500) return void(this.speed = 0);
        } else {
          if (this.scrollY >= 0) return void(this.speed = 0);
          if (this.scrollY <= -this.maxY) return void(this.speed = 0);
          this._gatherTouchMove(t.delta.y, t.interval);
          for (var r = 0; r < this._last5move.length; r++) n += this._last5move[r], e += this._last5time[r];
          if (e <= 0 || e > 500) return void(this.speed = 0);
        }
        this.speed = n * (1 - this.brake) / e;
      }
    }, {
      key: "onTouchCancel",
      value: function value(t) {}
    }, {
      key: "_gatherTouchMove",
      value: function value(t, e) {
        this._last5move.push(t), this._last5time.push(e), this._last5move.length > 5 && (this._last5move.shift(), this._last5time.shift());
      }
    }, {
      key: "onExit",
      value: function value() {
        this.engine.touchManager.removeLayer(this);
      }
    }, {
      key: "_render",
      value: function value(t, e, n, i, r, o, a) {
        var s = this.engine._getTempCanvas(this.width, this.height);
        s.context.globalCompositeOperation = "source-over", s.context.setTransform(1, 0, 0, 1, 0, 0), s.context.clearRect(0, 0, this.width, this.height);
        for (var c = 0; c < this._children.length; c++) this._children[c]._render(s.context, 1, 0, 0, 1, 0, 0);
        t.setTransform(e, n, i, r, this.x + o, this.y + a), t.drawImage(s.canvas, 0, 0, this.width, this.height), this.engine._backTempCanvas(s);
      }
    }]) && R(e.prototype, n), i && R(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function X(t) {
    return (X = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function H(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function N(t, e) {
    return (N = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function U(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = V(t);
      if (e) {
        var r = V(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return K(this, n);
    };
  }

  function K(t, e) {
    if (e && ("object" === X(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function V(t) {
    return (V = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var W = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && N(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = U(o);

    function o(t) {
      var e;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (e = r.call(this, t)).createNode = null, e.nodeHeight = 0, e.nodeWidth = 0, e.data = [], e;
    }
    return e = o, (n = [{
      key: "onEnter",
      value: function value() {
        if (Y.prototype.onEnter.call(this), null == this.createNode) throw Error("ScrollList.createNode is null");
        if (0 == this.nodeHeight && 0 == this.nodeWidth) throw Error("ScrollList.nodeHeight or ScrollList.nodeWidth is 0");
      }
    }, {
      key: "onScroll",
      value: function value(t) {
        if (this.isHorizontal) {
          var e = this.width,
            n = (r = 0, 0);
          for (a = 0, s = 0; s < this._children.length; s++) e > this._children[s].x && (e = this._children[s].x, r = this._children[s]), n < this._children[s].x + this.nodeWidth && (n = this._children[s].x + this.nodeWidth, a = this._children[s]);
          e > 0 && r._scrollListIndex > 0 && (a._scrollListIndex = r._scrollListIndex - 1, a.setData(this.data[r._scrollListIndex - 1]), a.x = e - this.nodeWidth), n < this.width && this.data.length > a._scrollListIndex + 1 && (r._scrollListIndex = a._scrollListIndex + 1, r.setData(this.data[a._scrollListIndex + 1]), r.x = n);
        } else {
          for (var i = this.height, r = 0, o = 0, a = 0, s = 0; s < this._children.length; s++) i > this._children[s].y && (i = this._children[s].y, r = this._children[s]), o < this._children[s].y + this.nodeHeight && (o = this._children[s].y + this.nodeHeight, a = this._children[s]);
          i > 0 && r._scrollListIndex > 0 && (a._scrollListIndex = r._scrollListIndex - 1, a.setData(this.data[r._scrollListIndex - 1]), a.y = i - this.nodeHeight), o < this.height && this.data.length > a._scrollListIndex + 1 && (r._scrollListIndex = a._scrollListIndex + 1, r.setData(this.data[a._scrollListIndex + 1]), r.y = o);
        }
      }
    }, {
      key: "setData",
      value: function value(t) {
        this.data = t, this.rebuild();
      }
    }, {
      key: "rebuild",
      value: function value() {
        if (this.removeAllChildren(), this.isHorizontal) {
          var t = 0;
          for (n = Math.ceil(this.width / this.nodeWidth) + 1, i = 0; !(i >= n || i >= this.data.length);)(r = this.createNode()).x = t, t += this.nodeWidth, r.setData && r.setData(this.data[i]), r._scrollListIndex = i, this.addChild(r), i++;
          this.scrollX = 0, this.maxX = this.nodeWidth * this.data.length;
        } else {
          for (var e = 0, n = Math.ceil(this.height / this.nodeHeight) + 1, i = 0; !(i >= n || i >= this.data.length);) {
            var r;
            (r = this.createNode()).y = e, e += this.nodeHeight, r.setData && r.setData(this.data[i]), r._scrollListIndex = i, this.addChild(r), i++;
          }
          this.scrollY = 0, this.maxY = this.nodeHeight * this.data.length;
        }
      }
    }]) && H(e.prototype, n), i && H(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(Y);

  function z(t, e) {
    var _n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
    if (!_n) {
      if (Array.isArray(t) || (_n = function(t, e) {
          if (!t) return;
          if ("string" == typeof t) return q(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === n && t.constructor && (n = t.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(t);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return q(t, e);
        }(t)) || e && t && "number" == typeof t.length) {
        _n && (t = _n);
        var i = 0,
          r = function r() {};
        return {
          s: r,
          n: function n() {
            return i >= t.length ? {
              done: !0
            } : {
              done: !1,
              value: t[i++]
            };
          },
          e: function e(t) {
            throw t;
          },
          f: r
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      s = !1;
    return {
      s: function s() {
        _n = _n.call(t);
      },
      n: function n() {
        var t = _n.next();
        return a = t.done, t;
      },
      e: function e(t) {
        s = !0, o = t;
      },
      f: function f() {
        try {
          a || null == _n.return || _n.return();
        } finally {
          if (s) throw o;
        }
      }
    };
  }

  function q(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];
    return i;
  }

  function $(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function G(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function Q(t, e, n) {
    return e && G(t.prototype, e), n && G(t, n), Object.defineProperty(t, "prototype", {
      writable: !1
    }), t;
  }
  var J = new(function() {
      function t() {
        $(this, t), this._tweens = new Map();
      }
      return Q(t, [{
        key: "removeAll",
        value: function value() {
          this._tweens = new Map();
        }
      }, {
        key: "add",
        value: function value(t) {
          this._tweens.set(t.id, t);
        }
      }, {
        key: "remove",
        value: function value(t) {
          this._tweens.delete(t.id);
        }
      }, {
        key: "update",
        value: function value(t) {
          var e,
            n = z(this._tweens.values());
          try {
            for (n.s(); !(e = n.n()).done;) {
              var i = e.value;
              i.update && !1 === i.update(t) && (i.isPlaying = !1, this._tweens.delete(i.id));
            }
          } catch (t) {
            n.e(t);
          } finally {
            n.f();
          }
        }
      }]), t;
    }())(),
    Z = 0;
  var tt,
    et = function() {
      function t(e, n) {
        $(this, t), this.id = Z++, this._target = e, this._group = n || J, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._repeat = 0, this._repeatDelayTime = void 0, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = null, this._easingFunction = nt.Linear.None, this._interpolation = it.Linear, this._chainedTweens = [], this._onStart = null, this._onStartFired = !1, this._onUpdate = null, this._onComplete = null, this._onStop = null;
      }
      return Q(t, [{
        key: "isPlaying",
        value: function value() {
          return this._isPlaying;
        }
      }, {
        key: "to",
        value: function value(t, e) {
          return this._valuesEnd = t, void 0 !== e && (this._duration = e), this;
        }
      }, {
        key: "start",
        value: function value(t) {
          for (var e in this._group.add(this), this._isPlaying = !0, this._onStartFired = !1, this._startTime = t || 0, this._startTime += this._delayTime, this._valuesEnd) {
            if (this._valuesEnd[e] instanceof Array) {
              if (0 == this._valuesEnd[e].length) continue;
              this._valuesEnd[e] = [this._target[e]].concat(this._valuesEnd[e]);
            }
            void 0 !== this._target[e] && (this._valuesStart[e] = this.target[e], !this._valuesStart[e] instanceof Array && (this._valuesStart[e] *= 1), this._valuesStartRepeat[e] = this._valuesStart[e] || 0);
          }
          return this;
        }
      }, {
        key: "stop",
        value: function value() {
          return this._isPlaying ? (this._group.remove(this), this._isPlaying = !1, this._onStop && this._onStop(this._target), this.stopChainedTweens(), this) : this;
        }
      }, {
        key: "end",
        value: function value() {
          return this.update(this._startTime + this._duration), this;
        }
      }, {
        key: "stopChainedTweens",
        value: function value() {
          for (var t = 0; t < this._chainedTweens; t++) this._chainedTweens[t].stop();
        }
      }, {
        key: "group",
        value: function value(t) {
          return this._group = t, this;
        }
      }, {
        key: "delay",
        value: function value(t) {
          return this._delayTime = t, this;
        }
      }, {
        key: "repeat",
        value: function value(t) {
          return this._repeat = t, this;
        }
      }, {
        key: "repeatDelay",
        value: function value(t) {
          return this._repeatDelayTime = t, this;
        }
      }, {
        key: "easing",
        value: function value(t) {
          return this._easingFunction = t, this;
        }
      }, {
        key: "interpolation",
        value: function value(t) {
          this._interpolation = t;
        }
      }, {
        key: "chain",
        value: function value() {
          return this._chainedTweens = arguments, this;
        }
      }, {
        key: "onStart",
        value: function value(t) {
          return this._onStart = t, this;
        }
      }, {
        key: "onUpdate",
        value: function value(t) {
          return this._onUpdate = t, this;
        }
      }, {
        key: "onComplete",
        value: function value(t) {
          return this._onComplete = t, this;
        }
      }, {
        key: "onStop",
        value: function value(t) {
          return this._onStop = t, this;
        }
      }, {
        key: "update",
        value: function value(t) {
          if (this._startTime -= t, this._startTime > 0) return !0;
          0 == this._onStartFired && (this._onStart && this._onStart(this._target), this._onStartFired = !0);
          var e = this._startTime / this._duration;
          e = 0 == this._duration || e > 1 ? 1 : e;
          var n = this._easingFunction(e);
          for (var i in this._valuesEnd)
            if (void 0 !== this._valuesStart[i]) {
              var r = this._valuesStart[i] || 0,
                o = this._valuesEnd[i] || 0;
              o instanceof Array ? this._target[i] = this._interpolation(o, n) : ("string" == typeof o && (o = "+" === o.charAt(0) || "-" === o.charAt(0) ? r + parseFloat(o) : parseFloat(o)), "number" == typeof o && (this._target[i] = r + (o - r) * n));
            }
          if (this._onUpdate && this._onUpdate(this._target), 1 == e) {
            if (this._repeat > 0) {
              for (var i in isFinite(this._repeat) && this._repeat--, this._valuesStartRepeat) "string" == typeof this._valuesEnd[i] && (this._valuesStartRepeat[i] = this._valuesStart[i] + parseFloat(this._valuesEnd[i])), this._valuesStart[i] = this._valuesStartRepeat[i];
              return void 0 !== this._repeatDelayTime && (this._startTime = this._repeatDelayTime), !0;
            }
            this._onComplete && this._onComplete(this._target);
            for (var a = 0; a < this._chainedTweens.length; a++) this._chainedTweens[a].start(this._startTime - this._duration);
            return !1;
          }
          return !0;
        }
      }], [{
        key: "addon",
        value: function value(t) {
          t.on("update", J.update.bind(J));
        }
      }]), t;
    }(),
    nt = {
      Linear: {
        None: function None(t) {
          return t;
        }
      },
      Quadratic: {
        In: function In(t) {
          return t * t;
        },
        Out: function Out(t) {
          return t * (2 - t);
        },
        InOut: function InOut(t) {
          return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
        }
      },
      Cubic: {
        In: function In(t) {
          return t * t * t;
        },
        Out: function Out(t) {
          return --t * t * t + 1;
        },
        InOut: function InOut(t) {
          return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
        }
      },
      Quartic: {
        In: function In(t) {
          return t * t * t * t;
        },
        Out: function Out(t) {
          return 1 - --t * t * t * t;
        },
        InOut: function InOut(t) {
          return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
        }
      },
      Quintic: {
        In: function In(t) {
          return t * t * t * t * t;
        },
        Out: function Out(t) {
          return --t * t * t * t * t + 1;
        },
        InOut: function InOut(t) {
          return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
        }
      },
      Sinusoidal: {
        In: function In(t) {
          return 1 - Math.cos(t * Math.PI / 2);
        },
        Out: function Out(t) {
          return Math.sin(t * Math.PI / 2);
        },
        InOut: function InOut(t) {
          return .5 * (1 - Math.cos(Math.PI * t));
        }
      },
      Exponential: {
        In: function In(t) {
          return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        Out: function Out(t) {
          return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        InOut: function InOut(t) {
          return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        }
      },
      Circular: {
        In: function In(t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        Out: function Out(t) {
          return Math.sqrt(1 - --t * t);
        },
        InOut: function InOut(t) {
          return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        }
      },
      Elastic: {
        In: function In(t) {
          return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI);
        },
        Out: function Out(t) {
          return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin(5 * (t - .1) * Math.PI) + 1;
        },
        InOut: function InOut(t) {
          return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) + 1;
        }
      },
      Back: {
        In: function In(t) {
          var e = 1.70158;
          return t * t * ((e + 1) * t - e);
        },
        Out: function Out(t) {
          var e = 1.70158;
          return --t * t * ((e + 1) * t + e) + 1;
        },
        InOut: function InOut(t) {
          var e = 2.5949095;
          return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        }
      },
      Bounce: {
        In: function In(t) {
          return 1 - nt.Bounce.Out(1 - t);
        },
        Out: function Out(t) {
          return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        },
        InOut: function InOut(t) {
          return t < .5 ? .5 * TWEEN.Easing.Bounce.In(2 * t) : .5 * TWEEN.Easing.Bounce.Out(2 * t - 1) + .5;
        }
      }
    },
    it = {
      Linear: function Linear(t, e) {
        var n = t.length - 1,
          i = n * e,
          r = Math.floor(i),
          o = it.Utils.Linear;
        return e < 0 ? o(t[0], t[1], i) : e > 1 ? o(t[n], t[n - 1], n - i) : o(t[r], t[r + 1 > n ? n : r + 1], i - r);
      },
      Bezier: function Bezier(t, e) {
        for (var n = 0, i = t.length - 1, r = Math.pow, o = it.Utils.Bernstein, a = 0; a <= i; a++) n += r(1 - e, i - a) * r(e, a) * t[a] * o(i, a);
        return n;
      },
      CatmullRom: function CatmullRom(t, e) {
        var n = t.length - 1,
          i = n * e,
          r = Math.floor(i),
          o = it.Utils.CatmullRom;
        return t[0] === t[n] ? (e < 0 && (r = Math.floor(i = n * (1 + e))), o(t[(r - 1 + n) % n], t[r], t[(r + 1) % n], t[(r + 2) % n], i - r)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -i) - t[0]) : e > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], i - n) - t[n]) : o(t[r ? r - 1 : 0], t[r], t[n < r + 1 ? n : r + 1], t[n < r + 2 ? n : r + 2], i - r);
      },
      Utils: {
        Linear: function Linear(t, e, n) {
          return (e - t) * n + t;
        },
        Bernstein: function Bernstein(t, e) {
          var n = it.Utils.Factorial;
          return n(t) / n(e) / n(t - e);
        },
        Factorial: (tt = [1], function(t) {
          var e = 1;
          if (tt[t]) return tt[t];
          for (var n = t; n > 1; n--) e *= n;
          return tt[t] = e, e;
        }),
        CatmullRom: function CatmullRom(t, e, n, i, r) {
          var o = .5 * (n - t),
            a = .5 * (i - e),
            s = r * r;
          return (2 * e - 2 * n + o + a) * (r * s) + (-3 * e + 3 * n - 2 * o - a) * s + o * r + e;
        }
      }
    };

  function rt(t) {
    return (rt = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function ot(t, e) {
    var n = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      e && (i = i.filter(function(e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), n.push.apply(n, i);
    }
    return n;
  }

  function at(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {};
      e % 2 ? ot(Object(n), !0).forEach(function(e) {
        st(t, e, n[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ot(Object(n)).forEach(function(e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
      });
    }
    return t;
  }

  function st(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n, t;
  }

  function ct(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function ht(t, e) {
    return (ht = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function ut(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = dt(t);
      if (e) {
        var r = dt(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return lt(this, n);
    };
  }

  function lt(t, e) {
    if (e && ("object" === rt(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return ft(t);
  }

  function ft(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }

  function dt(t) {
    return (dt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var pt = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && ht(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = ut(o);

    function o() {
      var t;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (t = r.call(this)).canvas = new l(), t.canvas._active = !0, t.canvas.engine = ft(t), t.updateTimer = null, t._lastUpdate = 0, t._scale = {
        x: 1,
        y: 1
      }, t._touchScale = {
        x: 1,
        y: 1
      }, t._touchOffset = {
        x: 0,
        y: 0
      }, t._tempCanvas = {}, t;
    }
    return e = o, i = [{
      key: "mixin",
      value: function value(t, e) {
        if ("function" != typeof t) throw Error("mixin target must be class");
        if ("function" != typeof e) throw Error("mixin must be class");
        t.__mixin__ ? t.__mixin__.push(e) : t.__mixin__ = [e], t.prototype = at(at({}, t.prototype), e.prototype), t.prototype = {
          __proto__: t.prototype
        }, Object.assign(t.prototype, e.prototype);
      }
    }], (n = [{
      key: "update",
      value: function value() {
        this.updateTimer = requestAnimationFrame(this.update.bind(this));
        var t = this._lastUpdate;
        this._lastUpdate = Date.now(), this.canvas._callUpdate(this._lastUpdate - t), this.emit("update", this._lastUpdate - t), this.canvas._renderCanvas();
      }
    }, {
      key: "start",
      value: function value() {
        null === this.updateTimer && (this.emit("start"), this._lastUpdate = Date.now(), this.updateTimer = requestAnimationFrame(this.update.bind(this)));
      }
    }, {
      key: "stop",
      value: function value() {
        null !== this.updateTimer && (cancelAnimationFrame(this.updateTimer), this.updateTimer = null, this.emit("stop"));
      }
    }, {
      key: "scale",
      value: function value(t, e) {
        this._scale.x = t, this._scale.y = e;
      }
    }, {
      key: "touchScale",
      value: function value(t, e) {
        this._touchScale.x = t, this._touchScale.y = e;
      }
    }, {
      key: "touchOffset",
      value: function value(t, e) {
        this._touchOffset.x = t, this._touchOffset.y = e;
      }
    }, {
      key: "_getTempCanvas",
      value: function value(t, e) {
        var n = t + "x" + e,
          i = this._tempCanvas[n] || (this._tempCanvas[n] = []);
        if (0 == i.length) {
          var r = wx.createCanvas();
          return console.log("create temp canvas:" + n), r.width = t, r.height = e, {
            id: n,
            canvas: r,
            context: r.getContext("2d")
          };
        }
        return i.pop();
      }
    }, {
      key: "_backTempCanvas",
      value: function value(t) {
        (this._tempCanvas[t.id] || (this._tempCanvas[id] = [])).push(t);
      }
    }]) && ct(e.prototype, n), i && ct(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(f);

  function yt(t) {
    return (yt = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function vt(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function gt(t, e) {
    return (gt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function bt(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = mt(t);
      if (e) {
        var r = mt(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return _t(this, n);
    };
  }

  function _t(t, e) {
    if (e && ("object" === yt(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function mt(t) {
    return (mt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var wt = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && gt(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = bt(o);

    function o(t, e) {
      var n;
      ! function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (n = r.call(this)).width = t, n.height = e;
      var i = wx.createImage();
      i.src = "openDataContext/assets/rank_bg.png", n.bg = new S({
        width: n.width,
        height: n.height,
        image: i
      }), n.bg.y = 10, n.addChild(n.bg);
      var a = wx.createImage();
      n.avatar = new S({
        width: 84,
        height: 84,
        image: a
      }), n.avatar.x = 30, n.avatar.y = 32, n.addChild(n.avatar);
      var s = wx.createImage();
      s.src = "openDataContext/assets/icon_avatar.png";
      var c = new S({
        width: 100,
        height: 100,
        image: s
      });
      if (c.x = 22, c.y = 24, n.addChild(c), n.nameLabel = new _({
          text: "",
          fillStyle: "#7B4F22",
          bold: "false",
          font: "normal 32px Microsoft YaHei"
        }), n.nameLabel.x = 144, n.nameLabel.y = 75, n.addChild(n.nameLabel), wx.getPotentialFriendList) {
        var h = wx.createImage();
        h.src = "openDataContext/assets/btn_invite.png", n.btn = new S({
          x: 450,
          y: n.y + 20,
          width: 166,
          height: 91,
          image: h
        }), n.animationForward = !0, n.scale = 1, n.addChild(n.btn);
      }
      return n;
    }
    return e = o, (n = [{
      key: "setData",
      value: function value(t) {
        this.data = t, this.nameLabel.text = this.formatLongName(t.nickname, 10), this.avatar.image.src = t.avatarUrl;
      }
    }, {
      key: "onEnter",
      value: function value() {
        this.engine.touchManager.addLayer(19, this);
      }
    }, {
      key: "onExit",
      value: function value() {
        this.engine.touchManager.removeLayer(this);
      }
    }, {
      key: "onTouchBegin",
      value: function value(t) {
        if (this.btn) {
          var e = this.btn.globalToLocal(t.current.x, t.current.y);
          if (this.btn.isInside(e.x, e.y))
            if (wx.shareMessageToFriend) {
              console.log("shareMessageToFriend", this.data.openid);
              var n = Math.random() > .5 ? 1 : 2,
                i = 1 == n ? "兔兔鹅要花束,快帮我【合成】吧!" : "这只肥鹅要减肥?【合成】虾仁便当!";
              wx.shareMessageToFriend({
                openId: this.data.openid,
                title: i,
                imageUrl: "https://gj-femsj-res.hortorgames.com/remoteRes/share/shareFriendInvite" + n + ".jpg"
              });
            } else console.log("不支持定向分享");
        }
      }
    }, {
      key: "formatLongName",
      value: function value(t) {
        for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = 0, i = 0; i < t.length; i++)
          if (t.charCodeAt(i) > 255 ? n += 2 : n++, n >= e) {
            t = t.slice(0, n) + "...";
            break;
          }
        return t;
      }
    }]) && vt(e.prototype, n), i && vt(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function xt(t) {
    return (xt = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function Ot(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function kt(t, e) {
    return (kt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function Tt(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = jt(t);
      if (e) {
        var r = jt(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return St(this, n);
    };
  }

  function St(t, e) {
    if (e && ("object" === xt(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function jt(t) {
    return (jt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var Pt = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && kt(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = Tt(o);

    function o(t, e) {
      var n;
      return function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (n = r.call(this, t)).uid = e.uid, n;
    }
    return e = o, (n = [{
      key: "showFriend",
      value: function value() {
        var t = this;
        wx.getPotentialFriendList ? wx.getPotentialFriendList({
          success: function success(e) {
            console.log("开放数据域getPotentialFriendList的返回->>", e), t.buildCells(e.list);
          },
          fail: function fail(e) {
            console.log("开放数据域getPotentialFriendList返回失败-----\x3e>>>>", e), t.buildCells([]);
          }
        }) : console.error("不支持wx.getPotentialFriendList");
      }
    }, {
      key: "buildCells",
      value: function value(t) {
        this.datas = t;
        var e = new W();
        if (e.width = this.width, e.height = this.height, e.createNode = function() {
            return new wt(630, 128);
          }, e.nodeHeight = 140, this.addChild(e), e.setData(this.datas), 0 == this.datas.length) {
          var n = new _({
            text: "暂无好友信息",
            maxWidth: 200,
            stroke: 0,
            strokeStyle: "#906438",
            fillStyle: "#906438",
            bold: "true",
            textAlign: "center",
            font: "normal 40px Microsoft YaHei"
          });
          n.x = this.width / 2, n.y = this.height / 2 - 60, this.addChild(n);
        }
      }
    }]) && Ot(e.prototype, n), i && Ot(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function Ct(t) {
    return (Ct = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function Lt(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function Et(t, e) {
    return (Et = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function Mt(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = Rt(t);
      if (e) {
        var r = Rt(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return It(this, n);
    };
  }

  function It(t, e) {
    if (e && ("object" === Ct(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function Rt(t) {
    return (Rt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var Dt = function(t) {
    ! function(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), Object.defineProperty(t, "prototype", {
        writable: !1
      }), e && Et(t, e);
    }(o, t);
    var e,
      n,
      i,
      r = Mt(o);

    function o(t, e, n) {
      var i;
      ! function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, o), (i = r.call(this)).width = t, i.height = e, i.rankType = n;
      var a = wx.createImage();
      i.bg = new S({
        width: i.width,
        height: i.height,
        image: a
      }), i.bg.y = 10, i.addChild(i.bg);
      var s = wx.createImage();
      i.rankBg = new S({
        width: 128,
        height: 128,
        image: s
      }), i.rankBg.x = 8, i.rankBg.y = 10, i.addChild(i.rankBg);
      var c = wx.createImage();
      i.avatar = new S({
        width: 84,
        height: 84,
        image: c
      }), i.avatar.x = 142, i.avatar.y = 32, i.addChild(i.avatar);
      var h = wx.createImage();
      h.src = "openDataContext/assets/icon_avatar.png";
      var u = new S({
        width: 100,
        height: 100,
        image: h
      });
      u.x = 134, u.y = 24, i.addChild(u);
      var l = wx.createImage(),
        f = new S({
          width: 42,
          height: 42,
          image: l
        });
      if (f.x = 248, f.y = 73, i.addChild(f), "expNew" == i.rankType) {
        l.src = "openDataContext/assets/icon_level.png", f.width = f.height = 52, f.y = 68, i.levelLabel = new _({
          text: "",
          fillStyle: "#FFFFFF",
          bold: "true",
          stroke: 3,
          strokeStyle: "#762a15",
          textAlign: "center",
          font: "normal 28px Microsoft YaHei"
        }), i.levelLabel.x = 273, i.levelLabel.y = 96, i.addChild(i.levelLabel);
        var d = wx.createImage();
        d.src = "openDataContext/assets/icon_card.png";
        var p = new S({
          width: 52,
          height: 52,
          image: d
        });
        p.x = 455, p.y = 68, i.addChild(p), i.starLabel = new _({
          text: "",
          fillStyle: "#7B4F22",
          bold: "true",
          font: "normal 24px Microsoft YaHei"
        }), i.starLabel.x = 508, i.starLabel.y = 96, i.addChild(i.starLabel);
      } else "adornPoint" == i.rankType ? l.src = "openDataContext/assets/icon_adornpoint.png" : "praise" == i.rankType && (l.src = "openDataContext/assets/icon_praise.png");
      return i.rankLabel = new _({
        text: "1",
        maxWidth: 110,
        stroke: 3,
        strokeStyle: "#762a15",
        fillStyle: "#ffffff",
        bold: "true",
        textAlign: "center",
        font: "normal 40px Microsoft YaHei"
      }), i.rankLabel.x = 73, i.rankLabel.y = i.height / 2 + 10, i.addChild(i.rankLabel), i.nameLabel = new _({
        text: "",
        fillStyle: "#7B4F22",
        bold: "false",
        font: "normal 32px Microsoft YaHei"
      }), i.nameLabel.x = 248, i.nameLabel.y = 48, i.addChild(i.nameLabel), i.scoreLabel = new _({
        text: "",
        fillStyle: "#7B4F22",
        bold: "true",
        font: "normal 24px Microsoft YaHei"
      }), i.scoreLabel.x = 300, i.scoreLabel.y = 96, i.addChild(i.scoreLabel), i;
    }
    return e = o, (n = [{
      key: "setData",
      value: function value(t) {
        this.data = t, this.nameLabel.text = this.formatLongName(t.nickname, 10), this.rankLabel.text = t.rank.toString(), "expNew" == this.rankType ? (this.levelLabel.text = t.KVDataList[1].value.toString(), this.scoreLabel.text = "经验值:" + (t.KVDataList.length > 4 ? t.KVDataList[4].value : "无"), this.starLabel.text = t.KVDataList.length > 6 ? t.KVDataList[6].value : "0") : "adornPoint" == this.rankType ? this.scoreLabel.text = "装扮值:" + t.KVDataList[0].value : "praise" == this.rankType && (this.scoreLabel.text = "好评度:" + t.KVDataList[0].value), this.avatar.image.src = t.avatarUrl;
        var e = this.data.isMe ? "rank_me" : "rank_bg";
        this.bg.image.src = "openDataContext/assets/".concat(e, ".png");
        var n = t.rank < 4 ? "icon_rank_" + t.rank : "icon_rank_0";
        this.rankBg.image.src = "openDataContext/assets/".concat(n, ".png");
      }
    }, {
      key: "formatLongName",
      value: function value(t) {
        for (var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = 0, i = 0; i < t.length; i++)
          if (t.charCodeAt(i) > 255 ? n += 2 : n++, n >= e) {
            t = t.slice(0, n) + "...";
            break;
          }
        return t;
      }
    }]) && Lt(e.prototype, n), i && Lt(e, i), Object.defineProperty(e, "prototype", {
      writable: !1
    }), o;
  }(r);

  function Bt(t) {
    return (Bt = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(t) {
      return _typeof2(t);
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : _typeof2(t);
    })(t);
  }

  function Ft(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  function At(t, e) {
    return (At = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function Yt(t) {
    var e = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
      } catch (t) {
        return !1;
      }
    }();
    return function() {
      var n,
        i = Ht(t);
      if (e) {
        var r = Ht(this).constructor;
        n = Reflect.construct(i, arguments, r);
      } else n = i.apply(this, arguments);
      return Xt(this, n);
    };
  }

  function Xt(t, e) {
    if (e && ("object" === Bt(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return function(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t;
    }(t);
  }

  function Ht(t) {
    return (Ht = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }
  var Nt = function(t) {
      ! function(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
          constructor: {
            value: t,
            writable: !0,
            configurable: !0
          }
        }), Object.defineProperty(t, "prototype", {
          writable: !1
        }), e && At(t, e);
      }(o, t);
      var e,
        n,
        i,
        r = Yt(o);

      function o(t, e) {
        var n;
        return function(t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, o), (n = r.call(this, t)).uid = e.uid, n;
      }
      return e = o, (n = [{
        key: "showRank",
        value: function value(t) {
          for (var e = this, n = ["score", "level", "uid", "timestamp", "exp", "star", "card"], i = 0; i < n.length; i++) n[i] = t + "_" + n[i];
          wx.getFriendCloudStorage({
            keyList: n,
            success: function success(n) {
              console.log("[getRank]", "success", n), n.data.sort(function(t, e) {
                if (0 === t.KVDataList.length && 0 === e.KVDataList.length) return 0;
                if (0 === t.KVDataList.length) return 1;
                if (0 === e.KVDataList.length) return -1;
                var n = parseInt(e.KVDataList[0].value) - parseInt(t.KVDataList[0].value);
                return 0 == n && e.KVDataList.length >= 4 && t.KVDataList.length >= 4 ? parseInt(t.KVDataList[3].value) - parseInt(e.KVDataList[3].value) : n;
              });
              for (var i = 0; i < n.data.length; i++) n.data[i].rank = i + 1;
              e.buildCells(n.data, t);
            },
            fail: function fail(t) {
              console.log("[getRank]", "fail");
            }
          });
        }
      }, {
        key: "buildCells",
        value: function value(t, e) {
          this.ranks = [];
          for (var n = null, i = 0; i < t.length; i++) t[i].KVDataList.length > 2 && ("adornPoint" == e || "praise" == e ? parseInt(t[i].KVDataList[0].value) > 0 && (this.ranks.push(t[i]), t[i].KVDataList[2].value == this.uid && ((n = t[i]).isMe = !0)) : (this.ranks.push(t[i]), t[i].KVDataList[2].value == this.uid && ((n = t[i]).isMe = !0)));
          if (n) {
            var r = new Dt(630, 128, e);
            r.x = 0, r.width = this.width, r.y = this.height - r.height - 10, this.addChild(r), r.setData(n);
          }
          var o = new W();
          if (o.width = this.width, o.height = this.height - (n ? 138 : 0), o.createNode = function() {
              return new Dt(630, 128, e);
            }, o.nodeHeight = 140, this.addChild(o), o.setData(this.ranks), 0 == this.ranks.length) {
            var a = new _({
              text: "暂无排行信息",
              maxWidth: 200,
              stroke: 0,
              strokeStyle: "#906438",
              fillStyle: "#906438",
              bold: "true",
              textAlign: "center",
              font: "normal 40px Microsoft YaHei"
            });
            a.x = this.width / 2, a.y = this.height / 2 - 60, this.addChild(a);
          }
        }
      }]) && Ft(e.prototype, n), i && Ft(e, i), Object.defineProperty(e, "prototype", {
        writable: !1
      }), o;
    }(r),
    Ut = null,
    Kt = null;

  function Vt() {
    Ut && (Ut.canvas.removeAllChildren(), Ut.canvas && (Ut.canvas.width = sharedCanvas.width, Ut.canvas.height = sharedCanvas.height));
  }

  function Wt() {
    Ut || (Ut = new pt(), E.addon(Ut), et.addon(Ut)), Ut.start();
    var t = Kt.touchScale || {
      x: 1,
      y: 1
    };
    Ut.touchScale(t.x, t.y);
    var e = Kt.touchOffset || {
      x: 0,
      y: 0
    };
    Ut.touchOffset(e.x, e.y);
  }
  wx.onMessage(function(t) {
    if (t && t.command) switch (console.log("onMessage", t, Kt ? Kt.command : "null"), Kt = t, t.command) {
      case "close":
        clearCanvas(), Ut && Ut.stop();
        break;
      case "pause":
        Ut && Ut.stop();
        break;
      case "resume":
        Ut && Ut.start();
        break;
      case "expNew":
      case "adornPoint":
      case "praise":
        Wt(),
          function(t) {
            Vt();
            var e = new Nt(null, Kt.data);
            e.width = sharedCanvas.width, e.height = sharedCanvas.height, Ut.canvas.addChild(e), e.showRank(t);
          }(t.command);
        break;
      case "friend":
        Wt(),
          function() {
            Vt();
            var t = new Pt(null, Kt.data);
            t.width = sharedCanvas.width, t.height = sharedCanvas.height, Ut.canvas.addChild(t), t.showFriend();
          }();
        break;
      case "friendInvited":
        console.log("拉新好友修改互动链数据!"), wx.modifyFriendInteractiveStorage ? wx.modifyFriendInteractiveStorage({
          key: "1",
          opNum: 1,
          operation: "add",
          quiet: !0,
          success: function success(t) {
            console.log("赠送道具:", "diamond", "成功===>", t);
          },
          fail: function fail(t) {
            console.log("赠送道具:", "diamond", "失败===>", t);
          }
        }) : console.error("不支持wx.modifyFriendInteractiveStorage");
    }
  });
}]);