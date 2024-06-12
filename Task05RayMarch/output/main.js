var XXX = (function (exports) {
    'use strict';

    /* FILE NAME: input.ts
     * PROGRAMMER: AG2
     * LAST UPDATE: 03.06.2023
     * PURPOSE: input module.
     */
    class input {
        Mx;
        My;
        Mz;
        Mdx;
        Mdy;
        Mdz;
        OnShift;
        IsPressed;
        IsPressedRight;
        Keys = [];
        constructor() {
            this.Mx = this.My = this.Mz = this.Mdx = this.Mdy = this.Mdz = 0;
            this.OnShift = false;
            this.IsPressed = false;
            this.IsPressedRight = false;
            this.Keys['KeyP'] = 0;
            this.Keys['KeyS'] = 0;
            this.Keys['KeyW'] = 0;
            this.Keys['ShiftLeft'] = 0;
            this.Keys['ArrowDown'] = 0;
            this.Keys['ArrowUp'] = 0;
            this.Keys['ArrowRight'] = 0;
            this.Keys['ArrowLeft'] = 0;
            this.Keys['KeyP'] = 0;
            this.Keys['AltLeft'] = 0;
            this.Keys['KeyD'] = 0;
            this.Keys['KeyA'] = 0;
            document.addEventListener('mousemove', (event) => {
                this.Mx = event.clientX;
                this.My = event.clientY;
                this.Mdx = event.movementX;
                this.Mdy = event.movementY;
            });
            document.addEventListener('wheel', (event) => {
                this.setWheel(event.deltaY * -1);
            });
            document.addEventListener('mousedown', (event) => {
                if (event.button === 0)
                    this.IsPressed = true;
                else if (event.button === 2) {
                    event.preventDefault();
                    this.IsPressedRight = true;
                }
            });
            document.addEventListener('mouseup', (event) => {
                if (event.button === 0)
                    this.IsPressed = false;
                else if (event.button === 2)
                    this.IsPressedRight = false;
            });
            document.addEventListener('keydown', (event) => {
                // this.OnShift = true;
                // if (event.ctrlKey) this.Keys['CTLR'] = 1;
                // if (event.altKey) this.Keys['ALT'] = 1;
                // if (event.shiftKey) this.Keys['SHIFT'] = 1;
                // this.Keys[event.key.toString()] = 1;
                this.Keys[event.code] = 1;
            });
            document.addEventListener('keyup', (event) => {
                // this.OnShift = false;
                // this.Keys[event.key.toString()] = 0;
                this.Keys[event.code] = 0;
            });
        }
        setWheel(z) {
            this.Mdz = z;
            this.Mz += z;
        }
    }
    /* END OF 'input.ts' FILE */

    /* FILE NAME: vec3.ts
     * PROGRAMMER: AG2
     * LAST UPDATE: 03.06.2023
     * PURPOSE: 3D math vector implementation module.
     */
    /***
     * Vector with 3 components module
     ***/
    /* Vector/point representation type */
    class vec3 {
        x;
        y;
        z;
        constructor(x, y, z) {
            if (x == undefined) {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }
            else {
                if (y == undefined && z == undefined) {
                    this.x = x;
                    this.y = x;
                    this.z = x;
                }
                else {
                    this.x = x;
                    this.y = y;
                    this.z = z;
                }
            }
        }
        /* Set vector function */
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        /* Add two vectors function */
        add(vec) {
            return new vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
        }
        /* Add two vectors function */
        addNum(n) {
            return new vec3(this.x + n, this.y + n, this.z + n);
        }
        /* Sub two vectors function */
        sub(vec) {
            return new vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
        }
        /* Multiplu vector by a number function */
        mulNum(n) {
            return new vec3(this.x * n, this.y * n, this.z * n);
        }
        /* Divise vector by a number function */
        divNum(n) {
            return new vec3(this.x / n, this.y / n, this.z / n);
        }
        /* Negative vector function */
        negative() {
            return new vec3(-this.x, -this.y, -this.z);
        }
        /* Dot productof vectors function */
        dot(vec) {
            return this.x * vec.x + this.y * vec.y + this.z * vec.z;
        }
        /* Cross product of vectors function */
        cross(vec) {
            return new vec3(this.y * vec.z - this.z * vec.y, -(this.x * vec.z - this.z * vec.x), this.x * vec.y - this.y * vec.x);
        }
        /* Count lenght of vector function */
        len() {
            let length = this.dot(this);
            if (length == 1 || length == 0) {
                return length;
            }
            return Math.sqrt(length);
        }
        /* Normalize vector function and returning new vector */
        normalizing() {
            let length = this.dot(this);
            if (length == 1 || length == 0) {
                return new vec3(this.x, this.y, this.z);
            }
            length = Math.sqrt(length);
            return new vec3(this.x / length, this.y / length, this.z / length);
        }
        /* Normalize vector fucntion */
        normalize() {
            let length = this.dot(this);
            if (length == 1 || length == 0) {
                return new vec3(this.x, this.y, this.z);
            }
            length = Math.sqrt(length);
            (this.x /= length), (this.y /= length), (this.z /= length);
            return this;
        }
        /* Transform point of vector function */
        // transform(mat) {
        //   return vec3(
        //     this.x * mat.a[0][0] +
        //       this.y * mat.a[1][0] +
        //       this.z * mat.a[2][0] +
        //       mat.a[3][0],
        //     this.x * mat.a[0][1] +
        //       this.y * mat.a[1][1] +
        //       this.z * mat.a[2][1] +
        //       mat.a[3][1],
        //     this.x * mat.a[0][2] +
        //       this.y * mat.a[1][2] +
        //       this.z * mat.a[2][2] +
        //       mat[3][3]
        //   );
        // }
        // /* Transform vector function */
        // transform(mat) {
        //   return vec3(
        //     this.x * mat.a[0][0] + this.y * mat.a[1][0] + this.z * mat.a[2][0],
        //     this.x * mat.a[0][1] + this.y * mat.a[1][1] + this.z * mat.a[2][1],
        //     this.x * mat.a[0][2] + this.y * mat.a[1][2] + this.z * mat.a[2][2]
        //   );
        // }
        // /* Vector by matrix multiplication (with homogenious devide) function */
        // vecMulMatr(mat) {
        //   let w =
        //     this.x * mat.a[0][3] +
        //     this.y * mat.a[1][3] +
        //     this.z * mat.a[2][3] +
        //     mat.a[3][3];
        //   return vec3(
        //     (this.x * mat.a[0][0] +
        //       this.y * mat.a[1][0] +
        //       this.z * mat.a[2][0] +
        //       mat.a[3][0]) /
        //       w,
        //     (this.x * mat.a[0][1] +
        //       this.y * mat.a[1][1] +
        //       this.z * mat.a[2][1] +
        //       mat.a[3][1]) /
        //       w,
        //     (this.x * mat.a[0][2] +
        //       this.y * mat.a[1][2] +
        //       this.z * mat.a[2][2] +
        //       mat.a[3][2]) /
        //       w
        //   );
        // }
        /* Reset vector to array functions */
        toArray() {
            return [this.x, this.y, this.z];
        }
    }
    /*
    let v1 = new vec3(0, 0, 0);
    let v2 = new vec3(5, 6, 7);
    let v3 = new vec3(8, 9, 10);
    let v4 = new vec3(11, 12, 13);
    let v5 = new vec3(14, 15, 16);
    let v6 = new vec3(17, 18, 19);

    console.log(v1.dot(v2));
    console.log(v1.sub(v2));
    console.log(v6.negative());
    console.log(v1.divNum(2));
    console.log(v1.len());
    console.log(v3.normalize());
    */
    /* END OF 'vec3.ts' FILE */

    class timer {
        startTime; // Start program time (in ticks)
        oldTime; // Previous frame time (in ticks)
        oldTimeFPS; // Old time FPS measurement (in ticks)
        pauseTime; // Time during pause period (in ticks)
        frameCounter; // Frame counter
        localDeltaTime;
        localTime;
        globalTime;
        globalDeltaTime; // Global time and interframe interval in seconds
        FPS; // Frames per second value
        isPause; // Pause flag
        // Timer obtain current time in seconds method
        getTime = () => {
            const date = new Date();
            let t = date.getMilliseconds() / 1000.0 +
                date.getSeconds() +
                date.getMinutes() * 60;
            return t;
        };
        /* Class default constructor.
         * ARGUMENTS: None.
         */
        constructor() {
            this.globalTime =
                this.localTime =
                    this.startTime =
                        this.oldTime =
                            this.oldTimeFPS =
                                this.getTime();
            // this.startTime = this.oldTime = this.oldTimeFPS = Date.now() / 1000.0;
            this.pauseTime = this.frameCounter = 0; // Old time FPS measurement (in ticks)
            this.localDeltaTime = this.globalDeltaTime = 0;
            this.FPS = 30.0;
            // this.globalTime = this.globalDeltaTime = 0
            this.isPause = false; // Pause flag
        } /* End of 'timer' function */
        /* Timer response function.
         * ARGUMENTS: None.
         * RETURNS: None.
         */
        response() {
            let t = this.getTime();
            // Global time measure
            this.globalTime = t;
            this.globalDeltaTime = t - this.oldTime;
            // Measure pause time
            if (this.isPause) {
                this.localDeltaTime = 0;
                this.pauseTime += t - this.oldTime;
            }
            else {
                this.localDeltaTime = this.globalDeltaTime;
                this.localTime = t - this.pauseTime - this.startTime;
            }
            // Measure FPS
            this.frameCounter++;
            if (t - this.oldTimeFPS > 3) {
                this.FPS = this.frameCounter / (t - this.oldTimeFPS);
                this.oldTimeFPS = t;
                this.frameCounter = 0;
                let DrawFPS = document.getElementById('fps');
                if (DrawFPS != null) {
                    DrawFPS.innerText = 'FPS:' + this.FPS.toFixed(3);
                }
            }
            this.oldTime = t;
        }
    }

    class shader {
        gl;
        programInfo;
        /* Class constructor */
        constructor(Newgl) {
            this.gl = Newgl;
            this.programInfo = null;
        } /* End of constructor */
        loadShader(type, source) {
            const shader = this.gl.createShader(type);
            if (!shader)
                return null;
            // Send the source to the shader object
            this.gl.shaderSource(shader, source);
            // Compile the shader program
            this.gl.compileShader(shader);
            // See if shader is compiled successfully
            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                alert(`An error occurred compiling the shaders: ${this.gl.getShaderInfoLog(shader)}`);
                this.gl.deleteShader(shader);
                return null;
            }
            return shader;
        } /* End of 'loadShader' function */
        /* Initialize a shader program, so WebGL knows how to draw our data */
        initShaderProgram(vsSource, fsSource) {
            const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
            if (!vertexShader)
                return;
            const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);
            if (!fragmentShader)
                return;
            // Create the shader program
            const shaderProgram = this.gl.createProgram();
            if (!shaderProgram)
                return;
            this.gl.attachShader(shaderProgram, vertexShader);
            this.gl.attachShader(shaderProgram, fragmentShader);
            this.gl.linkProgram(shaderProgram);
            // If creating the shader program failed, alert
            if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
                alert(`Unable to initialize the shader program: ${this.gl.getProgramInfoLog(shaderProgram)}`);
                return null;
            }
            return shaderProgram;
        } /* End of 'initShaderProgram' function */
        async fetchShaders(name) {
            const response = await fetch(name + '?nocache' + new Date().getTime());
            return response.text();
        } /* End of 'fetchShaders' function */
        async reloadShaders() {
            const vert = await this.fetchShaders('./march.vertex.glsl');
            const frag = await this.fetchShaders('./march.frag.glsl');
            const shaderProgram = this.initShaderProgram(vert, frag);
            if (!shaderProgram)
                return null;
            const programInfo = {
                program: shaderProgram,
                attribLocations: {
                    vertexPosition: this.gl.getAttribLocation(shaderProgram, 'in_pos')
                }
            };
            return programInfo;
        }
    }

    /*** BUFFERS MODULE ***/
    class buffer {
        gl;
        buffers;
        /* Class constructor */
        constructor(Newgl) {
            this.gl = Newgl;
            this.buffers = null;
        } /* End of constructor */
        initPositionBuffer() {
            // Create a buffer for the square's positions.
            const positionBuffer = this.gl.createBuffer();
            // Select the positionBuffer as the one to apply buffer
            // operations to from here out.
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
            // Now create an array of positions for the square.
            const positions = [
                1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0
            ];
            // Now pass the list of positions into WebGL to build the
            // shape. We do this by creating a Float32Array from the
            // JavaScript array, then use it to fill the current buffer.
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
            return positionBuffer;
        } /* End of 'initPositionBuffer' function */
        initBuffers() {
            const positionBuffer = this.initPositionBuffer();
            return {
                position: positionBuffer
            };
        } /* End of 'initBuffers' function */
        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.
        setPositionAttribute(buffers, programInfo) {
            const numComponents = 3; // pull out 2 values per iteration
            const type = this.gl.FLOAT; // the data in the buffer is 32bit floats
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set of values to the next
            // 0 = use type and numComponents above
            const offset = 0; // how many bytes inside the buffer to start from
            // Bind buffers
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
            this.gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, numComponents, type, normalize, stride, offset);
            this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        } /* End of 'setPositionAttribute' function */
    }

    class ubo {
        gl;
        name; // UBO name
        size; // UBO size
        bindPoint; // GL UBO bind point
        Buffer; // UBO buffer instance
        /* Class constructor */
        constructor(Newgl) {
            this.gl = Newgl;
            this.name = '';
            this.size = 0;
            this.bindPoint = 0;
            this.Buffer = null;
        } /* End of constructor */
        create(NewbindPoint, numOfBlocks, Bits) {
            // Setup WebGL UBO
            this.Buffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.Buffer);
            this.gl.bufferData(this.gl.UNIFORM_BUFFER, numOfBlocks * 16, this.gl.STATIC_DRAW);
            if (Bits != null) {
                this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, 0, Bits);
            }
            this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);
            /* Set UBO parameters */
            this.size = numOfBlocks;
            this.bindPoint = NewbindPoint;
        } /* End of 'create' function */
        update(blocksOffset, numOfBlocks, Bits) {
            /* Update UBO data */
            if (blocksOffset >= this.size)
                return;
            if (blocksOffset < 0)
                blocksOffset = 0;
            if (numOfBlocks === 0)
                numOfBlocks = this.size;
            if (blocksOffset + numOfBlocks >= this.size)
                numOfBlocks = this.size - blocksOffset;
            this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.Buffer);
            this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, blocksOffset * 16, Bits);
            this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);
        } /* End of 'update' function */
        apply() {
            this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, this.bindPoint, this.Buffer);
        } /* End of 'AG2_RndUBOApply' function */
    }

    /*** Camera module ***/
    class camera {
        // Screen width and height
        ScreenW = 0;
        ScreenH = 0;
        Loc = new vec3(3, 0, -5); // Camera location
        Dir; // Camera direction
        Right = new vec3(0, 0, 0); // camera right vector
        Up = new vec3(0, 1, 0); // Camera up vector
        At = new vec3(0, 0, 0); // Camera at vector
        FarClip = 10000; // Distance to project far clip plane (far)
        Wp = 0.1; // Projection plane width size
        Hp = 0.1; // Projection plane height size
        ProjDist = 0.1; // Distance to projection plane
        ProjSize = 0.1; // Projection size
        /* Class constructor */
        constructor() {
            this.Dir = this.At.sub(this.Loc).normalizing();
            this.Right = this.Dir.cross(this.Up).normalizing();
        } /* End of constructor */
        /* Set camera function */
        set(Loc1, At1, Up1) {
            this.Loc = Loc1;
            this.At = At1;
            this.Dir = At1.sub(Loc1).normalizing();
            this.Right = this.Dir.cross(Up1).normalizing();
            this.Up = this.Right.cross(this.Dir).normalizing();
        } /* End of 'set' function */
        projset() {
            let rx;
            let ry;
            rx = ry = this.ProjSize;
            // Correct aspect ratio
            if (this.ScreenW > this.ScreenH)
                rx *= this.ScreenW / this.ScreenH;
            else
                ry *= this.ScreenH / this.ScreenW;
            this.Wp = rx;
            this.Hp = ry;
        }
        /* Resize camera function */
        resize() {
            this.ScreenW = window.innerWidth;
            this.ScreenH = window.innerHeight;
            this.projset();
        } /* End of 'resize' function */
    }

    class render {
        gl;
        canvas;
        Shader;
        Vertex_Buffer;
        numberOfSpheres;
        Timer;
        InputSystem;
        ubo_camera;
        Camera;
        /* Class constructor */
        constructor() {
            this.gl = null;
            this.canvas = null;
            this.Shader = null;
            this.Vertex_Buffer = null;
            this.ubo_camera = null;
            this.Timer = new timer();
            this.InputSystem = new input();
            this.Camera = new camera();
            this.numberOfSpheres = 1;
            /* Callbacks: render resize function */
            document.addEventListener('resize', (event) => {
                if (this.canvas != null && this.gl != null) {
                    this.Camera.resize();
                    // Set canvas sizes
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
                }
            });
        } /* End of constructor */
        async initGL() {
            this.canvas = document.querySelector('#glcanvas');
            if (!this.canvas) {
                return;
            }
            // Set canvas sizes
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            // Initialize the GL context
            this.gl = this.canvas.getContext('webgl2');
            // Only continue if WebGL is available and working
            if (this.gl === null) {
                alert('Unable to initialize WebGL. Your browser or machine may not support it.');
                return;
            }
            // Set clear color to black, fully opaque
            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            // Clear the color buffer with specified clear color
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            // Init shaders
            this.Shader = new shader(this.gl);
            this.Shader.programInfo = await this.Shader.reloadShaders();
            // Init vertex (now: only position) buffer
            this.Vertex_Buffer = new buffer(this.gl);
            this.Vertex_Buffer.buffers = this.Vertex_Buffer.initBuffers();
            // Init camera UBO
            this.ubo_camera = new ubo(this.gl);
            this.ubo_camera.create(0, 2, new Float32Array());
            this.ubo_camera.apply();
            // Set camera
            this.Camera.resize();
            this.Camera.set(new vec3(0, 2, -10), new vec3(0, 0, 0), new vec3(0, 1, 0));
            // Module for adding/deleting spheres
            let a = document.getElementById('AddSph');
            if (a != null) {
                a.addEventListener('click', (event) => {
                    this.numberOfSpheres++;
                    if (this.numberOfSpheres > 30) {
                        a.setAttribute('disabled', '');
                    }
                    else {
                        console.log(this.numberOfSpheres);
                    }
                });
            }
            let d = document.getElementById('DelSph');
            if (d != null) {
                d.addEventListener('click', (event) => {
                    this.numberOfSpheres--;
                    if (this.numberOfSpheres < 2) {
                        d.setAttribute('disabled', '');
                    }
                    else {
                        console.log(this.numberOfSpheres);
                    }
                });
            }
            // a.onclick = (event) => {
            //   console.log(this.numberOfSpheres);
            //   if (this.numberOfSpheres > 30) {
            //     a.setAttribute('disabled', '');
            //   } else {
            //     this.numberOfSpheres++;
            //   }
            // };
        } /* End of 'initGL' function */
        resize() { } /* End of 'resize' function */
        draw() {
            if (this.Shader &&
                this.Shader.programInfo &&
                this.Vertex_Buffer &&
                this.Vertex_Buffer.buffers != null &&
                this.gl != null &&
                this.canvas != null) {
                // Frame start module
                this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
                this.gl.clearDepth(1.0); // Clear everything
                this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing
                this.gl.depthFunc(this.gl.LEQUAL); // Near things obscure far things
                // Clear the canvas before we start drawing on it.
                this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
                if (this.numberOfSpheres > 1) {
                    document.getElementById('DelSph')?.removeAttribute('disabled');
                }
                if (this.numberOfSpheres <= 30) {
                    document.getElementById('AddSph')?.removeAttribute('disabled');
                }
                // Create a perspective matrix, a special matrix that is
                // used to simulate the distortion of perspective in a camera.
                // Our field of view is 45 degrees, with a width/height
                // ratio that matches the display size of the canvas
                // and we only want to see objects between 0.1 units
                // and 100 units away from the camera.
                /* Send UBO to shader */
                // const render_ubo_camera = [
                //   (1.0 - this.InputSystem.Mx / this.canvas.width) * 9.0 - 4.5,
                //   (this.InputSystem.My / this.canvas.height - 1.0) * 9.0 + 4.5,
                //   -5.0 + this.InputSystem.Mz * 0.002,
                //   this.Timer.localTime,
                //   this.InputSystem.Mdx,
                //   this.InputSystem.Mdy,
                //   this.Camera.ScreenW,
                //   this.Camera.ScreenH
                // ];
                const render_ubo_camera = [
                    this.Camera.Loc.x,
                    this.Camera.Loc.y,
                    this.Camera.Loc.z,
                    this.Timer.localTime,
                    this.InputSystem.Mdx,
                    // this.InputSystem.Mdy,
                    this.numberOfSpheres,
                    this.Camera.ScreenW,
                    this.Camera.ScreenH
                ];
                if (this.ubo_camera != null) {
                    this.ubo_camera.update(0, 0, new Float32Array(render_ubo_camera));
                }
                // buffer into the vertexPosition attribute.
                this.Vertex_Buffer.setPositionAttribute(this.Vertex_Buffer.buffers, this.Shader.programInfo);
                // Tell WebGL to use our program when drawing
                this.gl.useProgram(this.Shader.programInfo.program);
                {
                    const offset = 0;
                    const vertexCount = 4;
                    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
                }
            }
        } /* End of 'draw' function */
    }

    /* Base math functions */
    class mth {
        /* PI math constant */
        PI = 3.14159265358979323846;
        /* Class constructor */
        constructor() { }
        /* Degrees to radians conversion */
        Degree2Radian = (alpha) => {
            return alpha * (this.PI / 180.0);
        };
        /* Radians to degrees conversion */
        Radian2Degree = (alpha) => {
            return alpha * (180.0 / this.PI);
        };
        /* Sinus math operation (in radians) */
        sin = (alpha) => {
            return Math.sin(alpha);
        };
        /* Cosinus math operation (in radians) */
        cos = (alpha) => {
            return Math.cos(alpha);
        };
    }

    /* Matrix module */
    let math$1 = new mth();
    class mat4 {
        a = [];
        // constructor(
        //   a00: number | null = null,
        //   a01: number | null = null,
        //   a02: number | null = null,
        //   a03: number | null = null,
        //   a10: number | null = null,
        //   a11: number | null = null,
        //   a12: number | null = null,
        //   a13: number | null = null,
        //   a20: number | null = null,
        //   a21: number | null = null,
        //   a22: number | null = null,
        //   a23: number | null = null,
        //   a30: number | null = null,
        //   a31: number | null = null,
        //   a32: number | null = null,
        //   a33: number | null = null
        // ) {
        //   if (a00 === null) {
        //     this.a = [
        //       [1, 0, 0, 0],
        //       [0, 1, 0, 0],
        //       [0, 0, 1, 0],
        //       [0, 0, 0, 1]
        //     ];
        //   } else if (a00 != null) {
        //     this.a[0][0] = a00;
        //     this.a[0][1] = a00;
        //     this.a[0][2] = a00;
        //     this.a[0][3] = a00;
        //     this.a[1][0] = a00;
        //     this.a[1][1] = a00;
        //     this.a[1][2] = a00;
        //     this.a[1][3] = a00;
        //     this.a[2][0] = a00;
        //     this.a[2][1] = a00;
        //     this.a[2][2] = a00;
        //     this.a[2][3] = a00;
        //     this.a[3][0] = a00;
        //     this.a[3][1] = a00;
        //     this.a[3][2] = a00;
        //     this.a[3][3] = a00;
        //   }
        // }
        constructor() {
            this.a = [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ];
        }
        /* Set matrix by 16 element functiuon */
        set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
            let m = new mat4();
            m.a[0][0] = a00;
            m.a[0][1] = a01;
            m.a[0][2] = a02;
            m.a[0][3] = a03;
            m.a[1][0] = a10;
            m.a[1][1] = a11;
            m.a[1][2] = a12;
            m.a[1][3] = a13;
            m.a[2][0] = a20;
            m.a[2][1] = a21;
            m.a[2][2] = a22;
            m.a[2][3] = a23;
            m.a[3][0] = a30;
            m.a[3][1] = a31;
            m.a[3][2] = a32;
            m.a[3][3] = a33;
            return m;
        } /* End of 'set' function */
        /* Multiply matrix function */
        mul(m) {
            let r = new mat4();
            r.a[0][0] = r.a[1][1] = r.a[2][2] = r.a[3][3] = 0;
            let k = 0;
            for (let i = 0; i < 4; i++)
                for (let j = 0; j < 4; j++)
                    for (r.a[i][j] = 0, k = 0; k < 4; k++)
                        r.a[i][j] += this.a[i][k] * m.a[k][j];
            return r;
        } /* End of'mul' function */
        determ3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
            return (a11 * a22 * a33 +
                a12 * a23 * a31 +
                a13 * a21 * a32 -
                a11 * a23 * a32 -
                a12 * a21 * a33 -
                a13 * a22 * a31);
        } /* End of 'determ3x3' function */
        determ() {
            return (this.a[0][0] *
                this.determ3x3(this.a[1][1], this.a[1][2], this.a[1][3], this.a[2][1], this.a[2][2], this.a[2][3], this.a[3][1], this.a[3][2], this.a[3][3]) +
                -this.a[0][1] *
                    this.determ3x3(this.a[1][0], this.a[1][2], this.a[1][3], this.a[2][0], this.a[2][2], this.a[2][3], this.a[3][0], this.a[3][2], this.a[3][3]) +
                +this.a[0][2] *
                    this.determ3x3(this.a[1][0], this.a[1][1], this.a[1][3], this.a[2][0], this.a[2][1], this.a[2][3], this.a[3][0], this.a[3][1], this.a[3][3]) +
                -this.a[0][3] *
                    this.determ3x3(this.a[1][0], this.a[1][1], this.a[1][2], this.a[2][0], this.a[2][1], this.a[2][2], this.a[3][0], this.a[3][1], this.a[3][2]));
        } /* End of 'determ' function */
        /* Get identity matrix function */
        identity() {
            let m = new mat4();
            (m.a[0][0] = 0), (m.a[0][1] = 0), (m.a[0][2] = 0), (m.a[0][3] = 0);
            (m.a[1][0] = 0), (m.a[1][1] = 0), (m.a[1][2] = 0), (m.a[1][3] = 0);
            (m.a[2][0] = 0), (m.a[2][1] = 0), (m.a[2][2] = 0), (m.a[2][3] = 0);
            (m.a[3][0] = 0), (m.a[3][1] = 0), (m.a[3][2] = 0), (m.a[3][3] = 0);
            return m;
            // return new mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        } /* End of 'identity' function */
        /* Get inverse matrix function */
        inverse() {
            let r = new mat4();
            let det = this.determ();
            if (det === 0)
                return r;
            /* Build adjoint matrix */
            r.a[0][0] =
                +this.determ3x3(this.a[1][1], this.a[1][2], this.a[1][3], this.a[2][1], this.a[2][2], this.a[2][3], this.a[3][1], this.a[3][2], this.a[3][3]) / det;
            r.a[1][0] =
                -this.determ3x3(this.a[1][0], this.a[1][2], this.a[1][3], this.a[2][0], this.a[2][2], this.a[2][3], this.a[3][0], this.a[3][2], this.a[3][3]) / det;
            r.a[2][0] =
                +this.determ3x3(this.a[1][0], this.a[1][1], this.a[1][3], this.a[2][0], this.a[2][1], this.a[2][3], this.a[3][0], this.a[3][1], this.a[3][3]) / det;
            r.a[3][0] =
                -this.determ3x3(this.a[1][0], this.a[1][1], this.a[1][2], this.a[2][0], this.a[2][1], this.a[2][2], this.a[3][0], this.a[3][1], this.a[3][2]) / det;
            r.a[0][1] =
                -this.determ3x3(this.a[0][1], this.a[0][2], this.a[0][3], this.a[2][1], this.a[2][2], this.a[2][3], this.a[3][1], this.a[3][2], this.a[3][3]) / det;
            r.a[1][1] =
                +this.determ3x3(this.a[0][0], this.a[0][2], this.a[0][3], this.a[2][0], this.a[2][2], this.a[2][3], this.a[3][0], this.a[3][2], this.a[3][3]) / det;
            r.a[2][1] =
                -this.determ3x3(this.a[0][0], this.a[0][1], this.a[0][3], this.a[2][0], this.a[2][1], this.a[2][3], this.a[3][0], this.a[3][1], this.a[3][3]) / det;
            r.a[3][1] =
                +this.determ3x3(this.a[0][0], this.a[0][1], this.a[0][2], this.a[2][0], this.a[2][1], this.a[2][2], this.a[3][0], this.a[3][1], this.a[3][2]) / det;
            r.a[0][2] =
                +this.determ3x3(this.a[0][1], this.a[0][2], this.a[0][3], this.a[1][1], this.a[1][2], this.a[1][3], this.a[3][1], this.a[3][2], this.a[3][3]) / det;
            r.a[1][2] =
                -this.determ3x3(this.a[0][0], this.a[0][2], this.a[0][3], this.a[1][0], this.a[1][2], this.a[1][3], this.a[3][0], this.a[3][2], this.a[3][3]) / det;
            r.a[2][2] =
                this.determ3x3(this.a[0][0], this.a[0][1], this.a[0][3], this.a[1][0], this.a[1][1], this.a[1][3], this.a[3][0], this.a[3][1], this.a[3][3]) / det;
            r.a[3][2] =
                -this.determ3x3(this.a[0][0], this.a[0][1], this.a[0][2], this.a[1][0], this.a[1][1], this.a[1][2], this.a[3][0], this.a[3][1], this.a[3][2]) / det;
            r.a[0][3] =
                -this.determ3x3(this.a[0][1], this.a[0][2], this.a[0][3], this.a[1][1], this.a[1][2], this.a[1][3], this.a[2][1], this.a[2][2], this.a[2][3]) / det;
            r.a[1][3] =
                +this.determ3x3(this.a[0][0], this.a[0][2], this.a[0][3], this.a[1][0], this.a[1][2], this.a[1][3], this.a[2][0], this.a[2][2], this.a[2][3]) / det;
            r.a[2][3] =
                -this.determ3x3(this.a[0][0], this.a[0][1], this.a[0][3], this.a[1][0], this.a[1][1], this.a[1][3], this.a[2][0], this.a[2][1], this.a[2][3]) / det;
            r.a[3][3] =
                +this.determ3x3(this.a[0][0], this.a[0][1], this.a[0][2], this.a[1][0], this.a[1][1], this.a[1][2], this.a[2][0], this.a[2][1], this.a[2][2]) / det;
            return r;
        } /* End of 'inverse' function */
        /* Transpose matrix function */
        transpose() {
            let r = new mat4();
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    r.a[i][j] = this.a[j][i];
                }
            }
            return r;
        } /* End of 'transpose' function */
        /* Rotate matrix by OX function */
        rotateX(AngleInDegree) {
            let co = math$1.cos(math$1.Degree2Radian(AngleInDegree));
            let si = math$1.sin(math$1.Degree2Radian(AngleInDegree));
            return new mat4().set(1, 0, 0, 0, 0, co, si, 0, 0, -si, co, 0, 0, 0, 0, 1);
        } /* End of 'rotateX' function */
        /* Rotate matrix by OY function */
        rotateY(AngleInDegree) {
            let co = math$1.cos(math$1.Degree2Radian(AngleInDegree));
            let si = math$1.sin(math$1.Degree2Radian(AngleInDegree));
            return new mat4().set(co, 0, -si, 0, 0, 1, 0, 0, si, 0, co, 0, 0, 0, 0, 1);
        } /* End of 'rotateY' function */
        /* Rotate matrix by OZ function */
        rotateZ(AngleInDegree) {
            let co = math$1.cos(math$1.Degree2Radian(AngleInDegree));
            let si = math$1.sin(math$1.Degree2Radian(AngleInDegree));
            return new mat4().set(co, si, 0, 0, -si, co, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        } /* End of 'rotateZ' function */
        /* Rotate matrix by vector function */
        rotate(AngleInDegree, V) {
            let co = math$1.cos(math$1.Degree2Radian(AngleInDegree));
            let si = math$1.sin(math$1.Degree2Radian(AngleInDegree));
            return new mat4().set(co + V.x * V.x * (1 - co), V.x * V.y * (1 - co) + V.z * si, V.x * V.z * (1 - co) - V.y * si, 0, V.x * V.y * (1 - co) - V.z * si, co + V.y * V.y * (1 - co), V.z * V.y * (1 - co) + V.x * si, 0, V.x * V.z * (1 - co) + V.y * si, V.z * V.y * (1 - co) - V.x * si, co + V.z * V.z * (1 - co), 0, 0, 0, 0, 1);
        } /* End of 'rotate' function */
        /* Matrix translation function */
        translate(T) {
            return new mat4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, T.x, T.y, T.z, 1);
        } /* End of 'translate' function */
        /* Matrix scaling function */
        scale(S) {
            return new mat4().set(S.x, 0, 0, 0, 0, S.y, 0, 0, 0, 0, S.z, 0, 0, 0, 0, 1);
        } /* End of 'scale' function */
        /* Matrix translation function */
        scaleNum(A) {
            return new mat4().set(A, 0, 0, 0, 0, A, 0, 0, 0, 0, A, 0, 0, 0, 0, 1);
        } /* End of 'scaleNum' function */
        /* Transform point of vector function */
        transformPoint(V) {
            return new vec3(V.x * this.a[0][0] +
                V.y * this.a[1][0] +
                V.z * this.a[2][0] +
                this.a[3][0], V.x * this.a[0][1] +
                V.y * this.a[1][1] +
                V.z * this.a[2][1] +
                this.a[3][1], V.x * this.a[0][2] +
                V.y * this.a[1][2] +
                V.z * this.a[2][2] +
                this.a[3][2]);
        } /* End of 'transformPoint' function */
        /* Transform vector function */
        transformVector(V) {
            return new vec3(V.x * this.a[0][0] + V.y * this.a[1][0] + V.z * this.a[2][0], V.x * this.a[0][1] + V.y * this.a[1][1] + V.z * this.a[2][1], V.x * this.a[0][2] + V.y * this.a[1][2] + V.z * this.a[2][2]);
        } /* End of 'transformVector' function */
        /* Transform normal vector function */
        transformNormal(V) {
            let M = this.inverse().transpose();
            return new vec3(V.x * M.a[0][0] + V.y * M.a[1][0] + V.z * M.a[2][0], V.x * M.a[0][1] + V.y * M.a[1][1] + V.z * M.a[2][1], V.x * M.a[0][2] + V.y * M.a[1][2] + V.z * M.a[2][2]);
        } /* End of 'transformNormal' function */
        /* Transform matrix 4x4 function */
        transform4x4(V) {
            let w = V.x * this.a[0][3] +
                V.y * this.a[1][3] +
                V.z * this.a[2][3] +
                this.a[3][3];
            return new vec3((V.x * this.a[0][0] +
                V.y * this.a[1][0] +
                V.z * this.a[2][0] +
                this.a[3][0]) /
                w, (V.x * this.a[0][1] +
                V.y * this.a[1][1] +
                V.z * this.a[2][1] +
                this.a[3][1]) /
                w, (V.x * this.a[0][2] +
                V.y * this.a[1][2] +
                V.z * this.a[2][2] +
                this.a[3][2]) /
                w);
        } /* End of 'transform4x4' function */
    }

    /* Camera control module */
    let math = new mth();
    function ResponseControl(Camera, Timer, Input) {
        // if (Input.Keys['ALT']) {
        // Handle camera orientation
        let Dist = Camera.At.sub(Camera.Loc).len();
        let cosT = (Camera.Loc.y - Camera.At.y) / Dist;
        let sinT = Math.sqrt(1 - cosT * cosT);
        let plen = Dist * sinT;
        let cosP = (Camera.Loc.z - Camera.At.z) / plen;
        let sinP = (Camera.Loc.x - Camera.At.x) / plen;
        let Azimuth = math.Radian2Degree(Math.atan2(sinP, cosP));
        let Elevator = math.Radian2Degree(Math.atan2(sinT, cosT));
        // Azimuth +=
        //   3 *
        //   (-0.5 * Input.IsPressed * Input.Mdx * Input.Keys['AltLeft'] +
        //     Timer.globalDeltaTime * 10 * (Input.Keys['KeyD'] - Input.Keys['KeyA']));
        Elevator +=
            2 *
                (-0.5 * Input.IsPressed * Input.Mdy * Input.Keys['AltLeft'] +
                    Timer.globalDeltaTime *
                        10 *
                        (Input.Keys['ArrowUp'] - Input.Keys['ArrowDown']));
        if (Elevator < 0.08)
            Elevator = 0.08;
        else if (Elevator > 178.9)
            Elevator = 178.9;
        Dist +=
            (1 + Input.Keys['ShiftLeft'] * 28) *
                (0.0001 * Input.Mdz * Input.Keys['AltLeft'] +
                    Timer.globalDeltaTime * 8 * (Input.Keys['KeyS'] - Input.Keys['KeyW']));
        if (Dist < 0.1)
            Dist = 0.1;
        // Handle camera position
        if (Input.IsPressedRight) {
            let Wp = Camera.ProjSize;
            let Hp = Camera.ProjSize;
            if (Camera.ScreenW > Camera.ScreenH)
                Wp *= Camera.ScreenW / Camera.ScreenH;
            else
                Hp *= Camera.ScreenH / Camera.ScreenW;
            let sx = (((-Input.Mdx * Wp) / Camera.ScreenW) * Dist) / Camera.ProjDist;
            let sy = (((Input.Mdy * Hp) / Camera.ScreenH) * Dist) / Camera.ProjDist;
            let dv = Camera.Right.mulNum(sx).add(Camera.Up.mulNum(sy));
            Camera.At = Camera.At.add(dv);
            Camera.Loc = Camera.Loc.add(dv);
        }
        /* Setup result camera */
        Camera.set(new mat4()
            .rotateX(Elevator)
            .mul(new mat4().rotateY(Azimuth))
            .mul(new mat4().translate(Camera.At))
            .transformPoint(new vec3(0, Dist, 0)), Camera.At, new vec3(0, 1, 0));
        Camera.Loc.x += (Input.Keys['KeyA'] - Input.Keys['KeyD']) * 0.05;
        if (Input.Keys['ShiftLeft'] && Input.Keys['KeyP']) {
            Timer.isPause = !Timer.isPause;
        }
    }

    // https://github.com/Eugeny/tabby
    // https://michaelwalczyk.com/blog-ray-marching.html
    // https://iquilezles.org/articles/distfunctions/
    let RayMarchingRender;
    // Start here
    /* Main program function */
    async function main() {
        RayMarchingRender = new render();
        RayMarchingRender.initGL();
        // Main programm loop
        const draw = async () => {
            RayMarchingRender.Timer.response();
            ResponseControl(RayMarchingRender.Camera, RayMarchingRender.Timer, RayMarchingRender.InputSystem);
            RayMarchingRender.draw();
            // programInfo = await reloadShaders();
            window.requestAnimationFrame(draw);
        };
        draw();
    }
    window.addEventListener('load', (event) => {
        main();
    });

    exports.main = main;

    return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vaW5wdXQudHMiLCIuLi9tdGgvdmVjMy50cyIsIi4uL3RpbWVyLnRzIiwiLi4vcmVzb3VyY2VzL3NoYWRlci50cyIsIi4uL3Jlc291cmNlcy9idWZmZXIudHMiLCIuLi9yZXNvdXJjZXMvdWJvLnRzIiwiLi4vbXRoL2NhbWVyYS50cyIsIi4uL3JlbmRlci50cyIsIi4uL210aC9iYXNlX21hdGgudHMiLCIuLi9tdGgvbWF0NC50cyIsIi4uL2NvbnRyb2wudHMiLCIuLi9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGxdLCJuYW1lcyI6WyJtYXRoIl0sIm1hcHBpbmdzIjoiOzs7SUFBQTs7OztJQUlHO0lBUUgsTUFBTSxLQUFLLENBQUE7SUFDVCxJQUFBLEVBQUUsQ0FBUztJQUNYLElBQUEsRUFBRSxDQUFTO0lBQ1gsSUFBQSxFQUFFLENBQVM7SUFDWCxJQUFBLEdBQUcsQ0FBUztJQUNaLElBQUEsR0FBRyxDQUFTO0lBQ1osSUFBQSxHQUFHLENBQVM7SUFDWixJQUFBLE9BQU8sQ0FBTTtJQUNiLElBQUEsU0FBUyxDQUFNO0lBQ2YsSUFBQSxjQUFjLENBQU07UUFDcEIsSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUVwQixJQUFBLFdBQUEsR0FBQTtZQUNFLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqRSxRQUFBLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLFFBQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdkIsUUFBQSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM1QixRQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLFFBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsUUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixRQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLFFBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsUUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixRQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLFFBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsUUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixRQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLFFBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsUUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxLQUFJO0lBQy9DLFlBQUEsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ3hCLFlBQUEsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0lBQ3hCLFlBQUEsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQzNCLFlBQUEsSUFBSSxDQUFDLEdBQUcsR0FBRyxL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QUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ2hCLENB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O29CQUNYLElBQUksQ0FBQyxTQUFTLENBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2I7Z0JBQ0gsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxJQUFJLENBQUMsU0FBUyxDQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiO2dCQUNILENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDYixFQUNIO0lBQ0osS0FBQzs7UUFHRCxRQUFRLEdBQUE7SUFDTixRQUFBLElBQUksQ0FBQyxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbkUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ25FLFFBQUEsT0FBTyxDQUFDLENBQUM7O0lBRVgsS0FBQzs7UUFHRCxPQUFPLEdBQUE7SUFDTCxRQUFBLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDbkIsUUFBQSxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFaEMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUFFLFlBQUEsT0FBTyxDQUFDLENBQUM7O0lBR3hCLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiLEdBQUcsR0FBRyxDQUFDO0lBRVYsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2IsR0FBRyxHQUFHLENBQUM7SUFFVixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDYixHQUFHLEdBQUcsQ0FBQztJQUVWLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiLEdBQUcsR0FBRyxDQUFDO0lBRVYsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2IsR0FBRyxHQUFHLENBQUM7SUFFVixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDYixHQUFHLEdBQUcsQ0FBQztJQUVWLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiLEdBQUcsR0FBRyxDQUFDO0lBRVYsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2IsR0FBRyxHQUFHLENBQUM7SUFFVixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDYixHQUFHLEdBQUcsQ0FBQztJQUVWLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiLEdBQUcsR0FBRyxDQUFDO0lBRVYsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsU0FBUyxDQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiLEdBQUcsR0FBRyxDQUFDO0lBRVYsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2IsR0FBRyxHQUFHLENBQUM7SUFFVixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDYixHQUFHLEdBQUcsQ0FBQztJQUVWLFFBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNiLEdBQUcsR0FBRyxDQUFDO0lBRVYsUUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2IsR0FBRyxHQUFHLENBQUM7SUFFVixRQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDYixHQUFHLEdBQUcsQ0FBQztJQUVWLFFBQUEsT0FBTyxDQUFDLENBQUM7SUFDWCxLQUFDOztRQUdELFNBQVMs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QUEsZUFBZSxDQUFDLENBQU8sRUFBQTtJQUNyQixRQUFBLE9BQU8sSUFBSSxJQUFJLENBQ2IsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVELENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDN0QsQ0FBQztJQUNKLEtBQUM7O0lBR0QsSUFBQSxlQUFlLENBQUMsQ0FBTyxFQUFBO1lBQ3JCLElBQUksQ0FBQyxHQUFTLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUV6QyxRQUFBLE9BQU8sSUFBSSxJQUFJLENBQ2IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ25ELENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNuRCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDcEQsQ0FBQztJQUNKLEtBQUM7O0lBR0QsSUFBQSxZQUFZLENBQUMsQ0FBTyxFQUFBO0lBQ2xCLFFBQUEsSUFBSSxDQUFDLEdBQ0gsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNm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
