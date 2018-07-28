/* tslint:disable */
import * as wasm from './from_rust_bg';

const stack = [];

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];
        
        return val.obj;
        
    }
}

let slab_next = slab.length;

function dropRef(idx) {
    
    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];
    
    obj.cnt -= 1;
    if (obj.cnt > 0) return;
    
    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}
/**
* @returns {any}
*/
export function scene_lib() {
    return takeObject(wasm.scene_lib());
}

let cachegetFloat32Memory = null;
function getFloat32Memory() {
    if (cachegetFloat32Memory === null || cachegetFloat32Memory.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory;
}

function passArrayF32ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 4);
    getFloat32Memory().set(arg, ptr / 4);
    return [ptr, arg.length];
}

function getArrayF32FromWasm(ptr, len) {
    return getFloat32Memory().subarray(ptr / 4, ptr / 4 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {Float32Array} arg0
* @returns {Float32Array}
*/
export function view_mat(arg0) {
    const [ptr0, len0] = passArrayF32ToWasm(arg0);
    const retptr = globalArgumentPtr();
    wasm.view_mat(retptr, ptr0, len0);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    
    const realRet = getArrayF32FromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 4);
    return realRet;
    
}

/**
* @param {Float32Array} arg0
* @param {number} arg1
* @returns {Float32Array}
*/
export function model_mat(arg0, arg1) {
    const [ptr0, len0] = passArrayF32ToWasm(arg0);
    const retptr = globalArgumentPtr();
    wasm.model_mat(retptr, ptr0, len0, arg1);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    
    const realRet = getArrayF32FromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 4);
    return realRet;
    
}

/**
* @param {Float32Array} arg0
* @param {Float32Array} arg1
* @param {number} arg2
* @param {number} arg3
* @param {number} arg4
* @param {number} arg5
* @param {number} arg6
* @param {number} arg7
* @returns {Float32Array}
*/
export function proj_mat(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    const [ptr0, len0] = passArrayF32ToWasm(arg0);
    const [ptr1, len1] = passArrayF32ToWasm(arg1);
    const retptr = globalArgumentPtr();
    wasm.proj_mat(retptr, ptr0, len0, ptr1, len1, arg2, arg3, arg4, arg5, arg6, arg7);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    
    const realRet = getArrayF32FromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 4);
    return realRet;
    
}

/**
* @param {Float32Array} arg0
* @returns {Float32Array}
*/
export function rotator(arg0) {
    const [ptr0, len0] = passArrayF32ToWasm(arg0);
    const retptr = globalArgumentPtr();
    wasm.rotator(retptr, ptr0, len0);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    
    const realRet = getArrayF32FromWasm(ptr, len).slice();
    wasm.__wbindgen_free(ptr, len * 4);
    return realRet;
    
}

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];
    
    slab_next = next;
    
    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_json_parse(ptr, len) {
    return addHeapObject(JSON.parse(getStringFromWasm(ptr, len)));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

export function __wbindgen_Math_tan(x) { return Math.tan(x); }

