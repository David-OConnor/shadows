import { Shape } from './types';
export declare function makeStaticBuffers(gl: WebGLRenderingContext, shapes_: Map<number, Shape>): {
    indexBuffers: Map<any, any>;
    vertexBuffers: Map<any, any>;
    normalBuffers: Map<any, any>;
    skybox: WebGLBuffer;
};
export declare function main(viewMatMaker: Function, modelMatMaker: Function, makeRotator: Function, makeProj: Function): void;
