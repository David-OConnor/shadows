// Similar to types.rs. Much of these are imported from Rust via bindgen,
// so must be similar to their rust equivalent.

// snake_case is used here for types that fall under Scene, for smoother
// interoperability with Rust.


export interface Vertex {
    position: [number, number, number, number]
}

export interface Normal {
    normal: [number, number, number, number]
}

export class Mesh {
    vertices: Map<number, Vertex>
    faces_vert: Uint16Array[]  // Indicies of vertexes.
    normals: Normal[]
    tris: number[]

    constructor(vertices: Map<number, Vertex>, faces_vert: Uint16Array[], normals: Normal[]) {
        this.vertices = vertices
        this.faces_vert = faces_vert
        this.normals = normals

        this.makeTris()
    }

     makeTris() {
        // Divide faces into triangles of indices. These indices aren't of node
        // ids; rather of cumulative node ids; eg how they'll appear in an index buffer.
        // Result is a 1d array; Float32array-style.
        let result = []
        let current_i = 0
        for (let face of this.faces_vert) {
            if (face.length === 3) {
                // Only one triangle.
                result.push(current_i)
                result.push(current_i + 1)
                result.push(current_i + 2)
            } else if (face.length === 4) {
                // First triangle
                result.push(current_i)
                result.push(current_i + 1)
                result.push(current_i + 2)
                // Second triangle
                result.push(current_i)
                result.push(current_i + 2)
                result.push(current_i + 3)
            } else if (face.length === 2) {
                throw "Faces must have len 3 or more."
            } else {
                throw "Error: Haven't implemented faces with vertex counds higher than four."
            }
            current_i += face.length
        }
        this.tris = result
    }

    numFaceVerts(): number {
        // Find the number of vertices used in drawing faces.  Ie for a box,
        // it's 6 faces x 4 vertices/face.
        return this.faces_vert.reduce((acc, face) => acc + face.length, 0)
    }
}


export class Shape {
    // faces_vert corresponds to faces, but uses vertices rather than edges.  This corresponds
    // to WebGl's implementation of faces.  We can't implicitly create this by
    // iterating over over faces/edges due to edges being used in multiple directions.
    // Vertex indices for each face.
    // normals is in the style of faces_vert; eg duplicate the vertices for each
    // face. Vut instead of
    mesh: Mesh
    position: Float32Array
    scale: number
    orientation: number[]
    rotation_speed: number[]
    opacity: number
    specular_intensity: number

    constructor(mesh: Mesh,
                position: Float32Array, orientation: number[],
                rotation_speed: number[], opacity: number, specular_intensity: number) {
        this.mesh = mesh
        this.position = position
        this.scale = 1
        this.orientation = orientation
        this.rotation_speed = rotation_speed
        this.opacity = opacity
        this.specular_intensity = specular_intensity
    }
}

export interface Camera {
    // See Rust's Camera struct for information.
    position: Float32Array
    θ: number[]
    fov: number
    aspect: number
    aspect_4: number
    near: number
    far: number
    fourd_proj_dist: number
}

export interface Source {
    position: number[]
    color: number[]
    intensity: number
}

export interface Lighting {
    ambient_intensity: number,
    diffuse_intensity: number,
    ambient_color: Float32Array,
    diffuse_color: Float32Array
    diffuse_direction: Float32Array
    sources: Source[]
}

export interface Scene {
    shapes: Map<number, Shape>,
    cam: Camera,
    cam_type: string,  // 'single', 'fps', or 'ffree'
    color_max: number, // distance thresh for max 4d-color indicator.
    lighting: Lighting,
    sensitivities: [number, number, number]
}

export interface MainState {
    shapes: Map<number, Shape>
    scene: number
    shape: number
}

export interface ProgramInfo {
    program: any
    attribLocations: any
    uniformLocations: any
}