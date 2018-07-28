import { Scene } from "./types";
export declare function addVecs4(out: Float32Array, a: Float32Array, b: Float32Array): Float32Array;
export declare function mulVConst4(out: Float32Array, V: Float32Array, c: number): Float32Array;
export declare function dotMV4(out: Float32Array, M: Float32Array, v: Float32Array): Float32Array;
export declare function dotMM4(out: Float32Array, M0: Float32Array, M1: Float32Array): Float32Array;
export declare function findColor(dist: number): number[];
export declare function deserSceneLib(rawLib: any): Map<number, Scene>;
