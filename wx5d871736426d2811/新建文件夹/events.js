var n = [],
  e = {
    on: function(e, c) {
      n.push({
        eventName: e,
        callback: c,
        once: !1
      })
    },
    once: function(e, c) {
      n.push({
        eventName: e,
        callback: c,
        once: !0
      })
    },
    off: function(e, c) {
      n.forEach((function(a, o) {
        a.eventName === e && (c && a.callback !== c || n.splice(o, 1))
      }))
    },
    emit: function(e) {
      for (var c = arguments.length, a = new Array(c > 1 ? c - 1 : 0), o = 1; o < c; o++) a[o - 1] = arguments[o];
      var t = [],
        f = [];
      return n.forEach((function(n, c) {
        n.eventName === e && (t.push(n.callback.apply(n, a)), n.once && f.unshift(c))
      })), f.forEach((function(e) {
        n.splice(e, 1)
      })), t
    }
  };
GameGlobal.events = e;