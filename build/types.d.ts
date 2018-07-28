export interface Vertex {
    position: [number, number, number, number];
}
export interface Normal {
    normal: [number, number, number, number];
}
export declare class Mesh {
    vertices: Map<number, Vertex>;
    faces_vert: Uint16Array[];
    normals: Normal[];
    tris: number[];
    constructor(vertices: Map<number, Vertex>, faces_vert: Uint16Array[], normals: Normal[]);
    makeTris(): void;
    numFaceVerts(): number;
}
export declare class Shape {
    mesh: Mesh;
    position: Float32Array;
    scale: number;
    orientation: number[];
    rotation_speed: number[];
    opacity: number;
    specular_intensity: number;
    constructor(mesh: Mesh, position: Float32Array, orientation: number[], rotation_speed: number[], opacity: number, specular_intensity: number);
}
export interface Camera {
    position: Float32Array;
    θ: number[];
    fov: number;
    aspect: number;
    aspect_4: number;
    near: number;
    far: number;
    fourd_proj_dist: number;
}
export interface Source {
    position: number[];
    color: number[];
    intensity: number;
}
export interface Lighting {
    ambient_intensity: number;
    diffuse_intensity: number;
    ambient_color: Float32Array;
    diffuse_color: Float32Array;
    diffuse_direction: Float32Array;
    sources: Source[];
}
export interface Scene {
    shapes: Map<number, Shape>;
    cam: Camera;
    cam_type: string;
    color_max: number;
    lighting: Lighting;
    sensitivities: [number, number, number];
}
export interface MainState {
    shapes: Map<number, Shape>;
    scene: number;
    shape: number;
}
export interface ProgramInfo {
    program: any;
    attribLocations: any;
    uniformLocations: any;
}
