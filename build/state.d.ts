import { Camera, Lighting, Scene } from "./types";
export declare let currentlyPressedKeys: number[];
export declare let staticBuffers: {};
export declare let sceneLib: Map<number, Scene>;
export declare let scene: {
    shapes: Map<any, any>;
    cam: Camera;
    cam_type: string;
    lighting: Lighting;
    color_max: number;
    sensitivities: number[];
};
export declare function setSceneLib(sceneLib_: Map<number, Scene>): void;
export declare function setScene(sceneId: number): void;
export declare function updateStaticBuffers(gl: any, buffers: any): void;
export declare function emptyStaticBuffers(): void;
