Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = [],
  t = !1;
exports.default = {
  addCreatedListener: function(r) {
    t ? r() : e.push(r)
  },
  _triggerCallback: function() {
    t = !0, e.forEach((function(e) {
      return e()
    }))
  }
};