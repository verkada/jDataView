var A = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var a = (n, t, e) => (A(n, t, "read from private field"), e ? e.call(n) : t.get(n)), d = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, g = (n, t, e, i) => (A(n, t, "write to private field"), i ? i.call(n, e) : t.set(n, e), e);
var u = (n, t, e) => (A(n, t, "access private method"), e);
function b(n) {
  const t = new Uint8Array(n.length);
  for (let e = 0, i = n.length; e < i; e++)
    t[e] = n.charCodeAt(e);
  return t;
}
function C(n) {
  switch (typeof n) {
    case "number": {
      n = new Uint8Array(n).buffer;
      break;
    }
    case "string": {
      n = b(n).buffer;
      break;
    }
    default:
      n instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && n instanceof SharedArrayBuffer || (n = new Uint8Array(n).buffer);
  }
  return n;
}
const D = new TextEncoder();
var l, o, f, U, w, E, y, I, p, k;
const c = class c {
  /**
   * jDataView provides a layer on top of the built-in `DataView` with a plethora of utilities to make working with binary data a pleasure.
   *
   * [Read the docs](https://github.com/jDataView/jDataView/wiki)
   */
  constructor(t, e, i, r) {
    d(this, f);
    // Setters and getters
    d(this, w);
    d(this, y);
    d(this, p);
    d(this, l, void 0);
    d(this, o, void 0);
    if (this.jDataView = this, t instanceof c) {
      const h = t.slice(e, e + i);
      return h.littleEndian = r ?? h.littleEndian, h;
    }
    const s = C(t);
    this.dataView = new DataView(s, e, i), this.littleEndian = !!r, g(this, o, 0), g(this, l, 0);
  }
  /** Getters for properties managed by the internal DataView */
  get buffer() {
    return this.dataView.buffer;
  }
  get byteLength() {
    return this.dataView.byteLength;
  }
  get byteOffset() {
    return this.dataView.byteOffset;
  }
  get [Symbol.toStringTag]() {
    return "jDataView";
  }
  /**
   * Constructs a new jDataView filled with the provided data
   */
  static from(...t) {
    return new c(t.flat(1 / 0));
  }
  /**
   * Get the current byte pointer position
   */
  tell() {
    return a(this, o);
  }
  /**
   * Get the current bit offset
   */
  tellBit() {
    return a(this, l);
  }
  /**
   * Set the current byte pointer position
   */
  seek(t) {
    return u(this, f, U).call(this, t, 0), g(this, o, t), a(this, o);
  }
  /**
   * Move the current pointer position forward
   */
  skip(t) {
    return this.seek(a(this, o) + t);
  }
  /**
   * Returns a new `jDataView` instance between `start` and `end`, optionally duplicating all the contained data in memory.
   */
  slice(t, e, i) {
    function r(s, h) {
      return s < 0 ? s + h : s;
    }
    return t = r(t, this.byteLength), e = r(e ?? this.byteLength, this.byteLength), i ? new c(
      this.getBytes(e - t, t, !0),
      void 0,
      void 0,
      this.littleEndian
    ) : new c(
      this.buffer,
      this.byteOffset + t,
      e - t,
      this.littleEndian
    );
  }
  /**
   * Aligns the pointer (clearing any bitOffset). Can also move the pointer
   */
  alignBy(t) {
    return g(this, l, 0), (t ?? 1) !== 1 ? this.skip(
      t - (a(this, o) % t || t)
    ) : a(this, o);
  }
  /**
   * Get raw bytes. If length is undefined, it will go to the end of the buffer.
   */
  getBytes(t, e, i) {
    return u(this, w, E).call(this, t, e, i ?? !0);
  }
  /**
   * Directly set raw bytes at `byteOffset` or the current pointer.
   */
  setBytes(t, e, i) {
    u(this, y, I).call(this, t, e, i ?? !0);
  }
  /**
   * Read a string using the specified encoding, or binary if unspecified
   */
  getString(t, e, i = "binary") {
    const r = u(this, w, E).call(this, t, e, !0);
    if (i !== "binary")
      return new TextDecoder(i).decode(r);
    let s = "";
    t = r.length;
    for (let h = 0; h < t; h++)
      s += String.fromCharCode(r[h]);
    return s;
  }
  /**
   * Set a string using the specified encoding, or binary if unspecified
   */
  setString(t, e, i = "binary") {
    let r;
    i !== "binary" ? r = D.encode(e) : r = b(e), u(this, y, I).call(this, t, r, !0);
  }
  /**
   * Get a single character.
   * This is the same as getting a 1-length string using binary encoding
   */
  getChar(t) {
    return this.getString(1, t);
  }
  /**
   * Set a single character.
   * This is the same as setting a 1-length string using binary encoding
   */
  setChar(t, e) {
    this.setString(t, e);
  }
  /**
   * Get an integer of any bit length up to 32
   */
  getSigned(t, e) {
    const i = 32 - t;
    return this.getUnsigned(t, e) << i >> i;
  }
  /**
   * Get an unsigned integer of any bit length up to 32
   */
  getUnsigned(t, e) {
    const i = u(this, p, k).call(this, t, e).wideValue >>> -a(this, l);
    return t < 32 ? i & ~(-1 << t) : i;
  }
  /**
   * Set an unsigned integer of any bit length up to 32
   */
  setUnsigned(t, e, i) {
    const r = u(this, p, k).call(this, i, t);
    let s = r.wideValue;
    s &= ~(~(-1 << i) << -a(this, l)), s |= (i < 32 ? e & ~(-1 << i) : e) << -a(this, l);
    for (let h = r.bytes.length - 1; h >= 0; h--)
      r.bytes[h] = s & 255, s >>>= 8;
    u(this, y, I).call(this, r.start, r.bytes, !0);
  }
  /**
   * Set a signed integer of any bit length up to 32
   */
  setSigned(t, e, i) {
    return this.setUnsigned(t, e, i);
  }
  /**
   * Sets an unsigned 64 bit integer. Takes a regular Number, not a BigInt.
   *
   * For more precision, use `setBigUint64()`
   */
  setUint64(t, e, i) {
    this.setBigUint64(t, BigInt(e), i);
  }
  /**
   * Sets a 64 bit integer. Takes a regular Number, not a BigInt.
   *
   * For more precision, use `setBigInt64()`
   */
  setInt64(t, e, i) {
    this.setBigInt64(t, BigInt(e), i);
  }
  /**
   * Get an unsigned 64 bit integer. Returns a regular Number, not a BigInt.
   *
   * For more precision, use `getBigUint64()`
   */
  getUint64(t, e) {
    return Number(this.getBigUint64(t, e));
  }
  /**
   * Get a 64 bit integer. Returns a regular Number, not a BigInt.
   *
   * For more precision, use `getBigInt64()`
   */
  getInt64(t, e) {
    return Number(this.getBigInt64(t, e));
  }
};
l = new WeakMap(), o = new WeakMap(), f = new WeakSet(), U = function(t, e, i) {
  if (typeof t != "number")
    throw new TypeError("Offset is not a number.");
  if (typeof e != "number")
    throw new TypeError("Size is not a number.");
  if (e < 0)
    throw new RangeError("Length is negative.");
  if (t < 0 || t + e > (i ?? this.byteLength))
    throw new RangeError("Offsets are out of bounds.");
}, w = new WeakSet(), E = function(t, e = a(this, o), i = this.littleEndian) {
  t ?? (t = this.byteLength - e), u(this, f, U).call(this, e, t), e += this.byteOffset, g(this, o, e - this.byteOffset + t);
  const r = new Uint8Array(this.buffer, e, t);
  return i || t <= 1 ? r : new Uint8Array(r).reverse();
}, y = new WeakSet(), I = function(t = a(this, o), e, i = this.littleEndian) {
  const r = e.length;
  u(this, f, U).call(this, t, r), !i && r > 1 && (e = new Uint8Array(e).reverse()), t += this.byteOffset, new Uint8Array(this.buffer, t, r).set(e), g(this, o, t - this.byteOffset + r);
}, p = new WeakSet(), k = function(t, e) {
  const i = ((e ?? a(this, o)) << 3) + a(this, l), r = i + t, s = i >>> 3, h = r + 7 >>> 3, S = u(this, w, E).call(this, h - s, s, !0);
  let V = 0;
  g(this, l, r & 7) && g(this, l, a(this, l) - 8);
  for (let m = 0, x = S.length; m < x; m++)
    V = V << 8 | S[m];
  return {
    start: s,
    bytes: S,
    wideValue: V
  };
};
let B = c;
const T = {
  Float64: 8,
  Float32: 4,
  BigInt64: 8,
  BigUint64: 8,
  Int32: 4,
  Uint32: 4,
  Int16: 2,
  Uint16: 2,
  Int8: 1,
  Uint8: 1
}, j = [
  ...Object.keys(T),
  "Int64",
  "Uint64",
  "Signed",
  "Unsigned",
  "String",
  "Char",
  "Bytes"
];
for (const n in T) {
  const t = T[n];
  B.prototype["get" + n] = function(e = this.tell(), i = this.littleEndian) {
    return this.seek(e + t), this.dataView["get" + n](e, i);
  }, B.prototype["set" + n] = function(e = this.tell(), i, r = this.littleEndian) {
    return this.seek(e + t), this.dataView["set" + n](e, i, r);
  };
}
for (const n of j)
  B.prototype["write" + n] = function(t, e) {
    return this["set" + n].call(
      this,
      void 0,
      t,
      e
    );
  };
export {
  B as default,
  B as jDataView
};
