import { Camera } from './types';
export declare function makeRotator(out: Float32Array, θ: number[]): Float32Array;
export declare function makeModelMat4(orientation: number[], scale: number): Float32Array;
export declare function makeViewMat4(θ: number[]): Float32Array;
export declare function makeProjMat(cam: Camera): Float32Array;
