function e(e) {
  return e && ("string" == typeof e || e.byteLength) && (e.byteLength || e.length) || 0
}
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.fileInfoType = exports.fileInfoHandler = void 0, exports.responseWrapper = function(e, n) {
  var f = n.filePath,
    l = n.data,
    i = n.type;
  return {
    success: function(n) {
      i === o.add && a.addFileInfo(f, l), i === o.remove && a.removeFileInfo(f), i === o.modify && a.modifyFileInfo(f, l), e.success(n)
    },
    fail: e.fail,
    complete: e.complete
  }
};
var a = exports.fileInfoHandler = {
    addFileInfo: function(a, o) {
      GameGlobal.manager.fs && GameGlobal.manager.fs.addFileInfo && GameGlobal.manager.fs.addFileInfo({
        path: a,
        size: e(o),
        erasable: !1
      })
    },
    modifyFileInfo: function(a, o) {
      GameGlobal.manager.fs && GameGlobal.manager.fs.modifyFileInfo && GameGlobal.manager.fs.modifyFileInfo({
        path: a,
        size: e(o)
      })
    },
    removeFileInfo: function(e) {
      GameGlobal.manager.fs && GameGlobal.manager.fs.removeFileInfo && GameGlobal.manager.fs.removeFileInfo(e)
    }
  },
  o = exports.fileInfoType = {
    add: 0,
    remove: 1,
    modify: 2
  };