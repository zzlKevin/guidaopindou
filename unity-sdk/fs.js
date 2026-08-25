Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = void 0;
var e = require("../@babel/runtime/helpers/objectSpread2"),
  t = i(require("./response")),
  n = i(require("./module-helper")),
  a = require("./utils"),
  r = require("./file-info");

function i(e) {
  return e && e.__esModule ? e : {
    default: e
  }
}

function l(t, r, i) {
  var l = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
  try {
    var s, c = wx.getFileSystemManager();
    s = "string" == typeof r ? (0, a.formatJsonStr)(r) : r, "readZipEntry" !== t || s.encoding || (s.encoding = "utf-8", console.error("fs.readZipEntry不支持读取ArrayBuffer，已改为utf-8")), c[t](e(e({}, s), {}, {
      success: function(e) {
        var r, c, f = "";
        if ("read" === t)(0, a.cacheArrayBuffer)(i, e.arrayBuffer), f = JSON.stringify({
          bytesRead: e.bytesRead,
          arrayBufferLength: null !== (r = null === (c = e.arrayBuffer) || void 0 === c ? void 0 : c.byteLength) && void 0 !== r ? r : 0
        });
        else if ("readCompressedFile" === t) {
          var o, y;
          (0, a.cacheArrayBuffer)(i, e.data), f = JSON.stringify({
            arrayBufferLength: null !== (o = null === (y = e.data) || void 0 === y ? void 0 : y.byteLength) && void 0 !== o ? o : 0
          })
        } else if ("readFile" === t) {
          var g, u;
          if (s.encoding) f = JSON.stringify({
            stringData: e.data || ""
          });
          else(0, a.cacheArrayBuffer)(i, e.data), f = JSON.stringify({
            arrayBufferLength: null !== (g = null === (u = e.data) || void 0 === u ? void 0 : u.byteLength) && void 0 !== g ? g : 0
          })
        } else f = JSON.stringify(e);
        n.default.send("FileSystemManagerCallback", JSON.stringify({
          callbackId: i,
          type: "success",
          res: f,
          method: l ? "".concat(t, "_string") : t
        }))
      },
      fail: function(e) {
        n.default.send("FileSystemManagerCallback", JSON.stringify({
          callbackId: i,
          type: "fail",
          res: JSON.stringify(e),
          method: l ? "".concat(t, "_string") : t
        }))
      },
      complete: function(e) {
        n.default.send("FileSystemManagerCallback", JSON.stringify({
          callbackId: i,
          type: "complete",
          res: JSON.stringify(e),
          method: l ? "".concat(t, "_string") : t
        }))
      }
    }))
  } catch (e) {
    n.default.send("FileSystemManagerCallback", JSON.stringify({
      callbackId: i,
      type: "complete",
      res: "fail",
      method: l ? "".concat(t, "_string") : t
    }))
  }
}
exports.default = {
  WXGetUserDataPath: function() {
    return wx.env.USER_DATA_PATH
  },
  WXWriteFileSync: function(e, t, n) {
    try {
      wx.getFileSystemManager().writeFileSync(e, t, n), r.fileInfoHandler.addFileInfo(e, t)
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
    return "ok"
  },
  WXAccessFileSync: function(e) {
    try {
      return wx.getFileSystemManager().accessSync(e), "access:ok"
    } catch (e) {
      return e.message ? e.message : "fail"
    }
  },
  WXAccessFile: function(n, a, r, i) {
    wx.getFileSystemManager().access(e({
      path: n
    }, t.default.handleText(a, r, i)))
  },
  WXCopyFileSync: function(e, t) {
    try {
      return wx.getFileSystemManager().copyFileSync(e, t), "copyFile:ok"
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
  },
  WXCopyFile: function(n, a, r, i, l) {
    wx.getFileSystemManager().copyFile(e({
      srcPath: n,
      destPath: a
    }, t.default.handleText(r, i, l)))
  },
  WXUnlinkSync: function(e) {
    try {
      return wx.getFileSystemManager().unlinkSync(e), r.fileInfoHandler.removeFileInfo(e), "unlink:ok"
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
  },
  WXUnlink: function(n, a, i, l) {
    wx.getFileSystemManager().unlink(e({
      filePath: n
    }, (0, r.responseWrapper)(t.default.handleText(a, i, l), {
      filePath: n,
      type: r.fileInfoType.remove
    })))
  },
  WXWriteFile: function(n, a, i, l, s, c) {
    wx.getFileSystemManager().writeFile(e({
      filePath: n,
      data: a.buffer,
      encoding: i
    }, (0, r.responseWrapper)(t.default.handleTextLongBack(l, s, c), {
      filePath: n,
      data: a.buffer,
      type: r.fileInfoType.add
    })))
  },
  WXWriteStringFile: function(n, a, i, l, s, c) {
    wx.getFileSystemManager().writeFile(e({
      filePath: n,
      data: a,
      encoding: i
    }, (0, r.responseWrapper)(t.default.handleTextLongBack(l, s, c), {
      filePath: n,
      data: a,
      type: r.fileInfoType.add
    })))
  },
  WXAppendFile: function(n, a, r, i, l, s) {
    wx.getFileSystemManager().appendFile(e({
      filePath: n,
      data: a.buffer,
      encoding: r
    }, t.default.handleTextLongBack(i, l, s)))
  },
  WXAppendStringFile: function(n, a, r, i, l, s) {
    wx.getFileSystemManager().appendFile(e({
      filePath: n,
      data: a,
      encoding: r
    }, t.default.handleTextLongBack(i, l, s)))
  },
  WXWriteBinFileSync: function(e, t, n) {
    var a = wx.getFileSystemManager();
    try {
      a.writeFileSync(e, t.buffer, n), r.fileInfoHandler.addFileInfo(e, t.buffer)
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
    return "ok"
  },
  WXReadFile: function(e, t) {
    l("readFile", e, t)
  },
  WXReadFileSync: function(e) {
    var t = wx.getFileSystemManager(),
      n = (0, a.formatJsonStr)(e);
    try {
      var r = n.filePath,
        i = t.readFileSync(n.filePath, n.encoding, n.position, n.length);
      return n.encoding || "string" == typeof i ? i : ((0, a.cacheArrayBuffer)(r, i), "".concat(i.byteLength))
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
  },
  WXMkdir: function(n, a, r, i, l) {
    wx.getFileSystemManager().mkdir(e({
      dirPath: n,
      recursive: Boolean(a)
    }, t.default.handleText(r, i, l)))
  },
  WXMkdirSync: function(e, t) {
    try {
      return wx.getFileSystemManager().mkdirSync(e, Boolean(t)), "mkdir:ok"
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
  },
  WXRmdir: function(n, a, r, i, l) {
    wx.getFileSystemManager().rmdir(e({
      dirPath: n,
      recursive: Boolean(a)
    }, t.default.handleText(r, i, l)))
  },
  WXRmdirSync: function(e, t) {
    try {
      return wx.getFileSystemManager().rmdirSync(e, Boolean(t)), "rmdirSync:ok"
    } catch (e) {
      return console.error(e), e.message ? e.message : "fail"
    }
  },
  WXStat: function(t, r) {
    var i = (0, a.formatJsonStr)(t);
    wx.getFileSystemManager().stat(e(e({}, i), {}, {
      success: function(e) {
        Array.isArray(e.stats) || (e.one_stat = e.stats, e.stats = null), n.default.send("StatCallback", JSON.stringify({
          callbackId: r,
          type: "success",
          res: JSON.stringify(e)
        }))
      },
      fail: function(e) {
        n.default.send("StatCallback", JSON.stringify({
          callbackId: r,
          type: "fail",
          res: JSON.stringify(e)
        }))
      },
      complete: function(e) {
        Array.isArray(e.stats) || (e.one_stat = e.stats, e.stats = null), n.default.send("StatCallback", JSON.stringify({
          callbackId: r,
          type: "complete",
          res: JSON.stringify(e)
        }))
      }
    }))
  },
  WX_FileSystemManagerClose: function(e, t) {
    l("close", e, t)
  },
  WX_FileSystemManagerFstat: function(e, t) {
    l("fstat", e, t)
  },
  WX_FileSystemManagerFtruncate: function(e, t) {
    l("ftruncate", e, t)
  },
  WX_FileSystemManagerGetFileInfo: function(e, t) {
    l("getFileInfo", e, t)
  },
  WX_FileSystemManagerGetSavedFileList: function(e, t) {
    l("getSavedFileList", e, t)
  },
  WX_FileSystemManagerOpen: function(e, t) {
    l("open", e, t)
  },
  WX_FileSystemManagerRead: function(e, t, n) {
    var r = (0, a.formatJsonStr)(e);
    r.arrayBuffer = t.buffer, l("read", r, n)
  },
  WX_FileSystemManagerReadCompressedFile: function(e, t) {
    l("readCompressedFile", e, t)
  },
  WX_FileSystemManagerReadZipEntry: function(e, t) {
    l("readZipEntry", e, t)
  },
  WX_FileSystemManagerReadZipEntryString: function(e, t) {
    l("readZipEntry", e, t, !0)
  },
  WX_FileSystemManagerReaddir: function(e, t) {
    l("readdir", e, t)
  },
  WX_FileSystemManagerRemoveSavedFile: function(e, t) {
    l("removeSavedFile", e, t)
  },
  WX_FileSystemManagerRename: function(e, t) {
    l("rename", e, t)
  },
  WX_FileSystemManagerSaveFile: function(e, t) {
    l("saveFile", e, t)
  },
  WX_FileSystemManagerTruncate: function(e, t) {
    l("truncate", e, t)
  },
  WX_FileSystemManagerUnzip: function(e, t) {
    l("unzip", e, t)
  },
  WX_FileSystemManagerWrite: function(e, t, n) {
    var r = (0, a.formatJsonStr)(e);
    r.data = t.buffer, l("write", r, n)
  },
  WX_FileSystemManagerWriteString: function(e, t) {
    l("write", e, t, !0)
  },
  WX_FileSystemManagerReaddirSync: function(e) {
    var t = wx.getFileSystemManager();
    try {
      return JSON.stringify(t.readdirSync(e) || [])
    } catch (e) {
      return console.error(e), "[]"
    }
  },
  WX_FileSystemManagerReadCompressedFileSync: function(e, t) {
    var n = wx.getFileSystemManager().readCompressedFileSync((0, a.formatJsonStr)(e));
    return (0, a.cacheArrayBuffer)(t, n), n.byteLength
  },
  WX_FileSystemManagerAppendFileStringSync: function(e, t, n) {
    wx.getFileSystemManager().appendFileSync(e, t, n)
  },
  WX_FileSystemManagerAppendFileSync: function(e, t, n) {
    wx.getFileSystemManager().appendFileSync(e, t.buffer, n)
  },
  WX_FileSystemManagerRenameSync: function(e, t) {
    return wx.getFileSystemManager().renameSync(e, t), "ok"
  },
  WX_FileSystemManagerReadSync: function(e, t) {
    var n, r, i = wx.getFileSystemManager(),
      l = (0, a.formatJsonStr)(e);
    l.arrayBuffer = new ArrayBuffer(l.arrayBuffer.length);
    var s = i.readSync(l);
    return (0, a.cacheArrayBuffer)(t, s.arrayBuffer), JSON.stringify({
      bytesRead: s.bytesRead,
      arrayBufferLength: null !== (n = null === (r = s.arrayBuffer) || void 0 === r ? void 0 : r.byteLength) && void 0 !== n ? n : 0
    })
  },
  WX_FileSystemManagerFstatSync: function(e) {
    var t = wx.getFileSystemManager().fstatSync((0, a.formatJsonStr)(e));
    return (0, a.formatResponse)("Stats", t), JSON.stringify(t)
  },
  WX_FileSystemManagerStatSync: function(e, t) {
    var n, a = wx.getFileSystemManager().statSync(e, t);
    return n = Array.isArray(a) ? a : [a], JSON.stringify(n)
  },
  WX_FileSystemManagerWriteSync: function(e, t) {
    var n = wx.getFileSystemManager(),
      r = (0, a.formatJsonStr)(e);
    r.data = t.buffer;
    var i = n.writeSync(r);
    return JSON.stringify(i)
  },
  WX_FileSystemManagerWriteStringSync: function(e) {
    var t = wx.getFileSystemManager().writeSync((0, a.formatJsonStr)(e));
    return JSON.stringify(t)
  },
  WX_FileSystemManagerOpenSync: function(e) {
    return wx.getFileSystemManager().openSync((0, a.formatJsonStr)(e))
  },
  WX_FileSystemManagerSaveFileSync: function(e, t) {
    return wx.getFileSystemManager().saveFileSync(e, t)
  },
  WX_FileSystemManagerCloseSync: function(e) {
    return wx.getFileSystemManager().closeSync((0, a.formatJsonStr)(e)), "ok"
  },
  WX_FileSystemManagerFtruncateSync: function(e) {
    return wx.getFileSystemManager().ftruncateSync((0, a.formatJsonStr)(e)), "ok"
  },
  WX_FileSystemManagerTruncateSync: function(e) {
    return wx.getFileSystemManager().truncateSync((0, a.formatJsonStr)(e)), "ok"
  }
};