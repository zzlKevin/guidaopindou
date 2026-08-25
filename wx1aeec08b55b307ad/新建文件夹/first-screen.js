function e(e, t, o) {
  var a = function(e, t, o) {
    var a = r(e, e.VERTEX_SHADER, t),
      n = r(e, e.FRAGMENT_SHADER, o);
    if (!a || !n) return null;
    var i = e.createProgram();
    if (!i) return null;
    if (e.attachShader(i, a), e.attachShader(i, n), e.linkProgram(i), !e.getProgramParameter(i, e.LINK_STATUS)) {
      var l = e.getProgramInfoLog(i);
      return console.log("Failed to link program: " + l), e.deleteProgram(i), e.deleteShader(n), e.deleteShader(a), null
    }
    return i
  }(e, t, o);
  return a ? (e.useProgram(a), e.program = a, !0) : (console.log("Failed to create program"), !1)
}

function r(e, r, t) {
  var o = e.createShader(r);
  if (null == o) return console.log("unable to create shader"), null;
  if (e.shaderSource(o, t), e.compileShader(o), !e.getShaderParameter(o, e.COMPILE_STATUS)) {
    var a = e.getShaderInfoLog(o);
    return console.log("Failed to compile shader: " + a), e.deleteShader(o), null
  }
  return o
}
exports.drawImg = function(r) {
  var t = new Float32Array([-1, 1, 0, 1, -1, -1, 0, 0, 1, 1, 1, 1, 1, -1, 1, 0]),
    o = wx.__first__canvas.getContext("webgl", {
      stencil: !0
    });
  if (o)
    if (e(o, "attribute vec4 a_Position;\nattribute vec2 a_TexCoord;\nvarying vec2 v_TexCoord;\nvoid main() {\n  gl_Position = a_Position;\n  v_TexCoord = a_TexCoord;\n}\n", "#ifdef GL_ES\nprecision mediump float;\n#endif\nuniform sampler2D u_Sampler;\nvarying vec2 v_TexCoord;\nvoid main() {\n  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n}\n")) {
      var a = function(e, r) {
        var t = r || new Float32Array([-1, 1, 0, 1, -1, -1, 0, 0, 1, 1, 1, 1, 1, -1, 1, 0]),
          o = e.createBuffer();
        if (!o) return console.log("Failed to create the buffer object"), -1;
        e.bindBuffer(e.ARRAY_BUFFER, o), e.bufferData(e.ARRAY_BUFFER, t, e.STATIC_DRAW);
        var a = t.BYTES_PER_ELEMENT,
          n = e.getAttribLocation(e.program, "a_Position");
        if (n < 0) return console.log("Failed to get the storage location of a_Position"), -1;
        e.vertexAttribPointer(n, 2, e.FLOAT, !1, 4 * a, 0), e.enableVertexAttribArray(n);
        var i = e.getAttribLocation(e.program, "a_TexCoord");
        return i < 0 ? (console.log("Failed to get the storage location of a_TexCoord"), -1) : (e.vertexAttribPointer(i, 2, e.FLOAT, !1, 4 * a, 2 * a), e.enableVertexAttribArray(i), 4)
      }(o, t);
      a < 0 ? console.log("Failed to set the vertex information") : (o.clearColor(1, 1, 1, 1), function(e, r, t) {
        var o = e.createTexture();
        if (!o) return console.log("Failed to create the texture object"), !1;
        var a = e.getUniformLocation(e.program, "u_Sampler");
        if (!a) return console.log("Failed to get the storage location of u_Sampler"), !1;
        var n = wx.createImage();
        return n ? (n.onload = function() {
          ! function(e, r, t, o, a) {
            e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, e.RGB, e.RGB, e.UNSIGNED_BYTE, a), e.uniform1i(o, 0), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLE_STRIP, 0, r)
          }(e, r, o, a, n)
        }, n.src = t, !0) : (console.log("Failed to create the image object"), !1)
      }(o, a, r) || console.log("Failed to intialize the texture."))
    } else console.log("Failed to intialize shaders.");
  else console.log("Failed to get the rendering context for WebGL")
};