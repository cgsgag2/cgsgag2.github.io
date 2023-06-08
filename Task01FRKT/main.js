/* Load shader function */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(type === gl.VERTEX_SHADER ? "vertex" : "fragment");
  }
  return shader;
}

/* Function to do later (load shaders from text file) */
async function fetchShader(shaderURL) {
  try {
    const response = await fetch(shaderURL);
    const text = await response.text();

    console.log(text);
  } catch (err) {
    console.log(err);
  }
}

/* Function not needed now, useful example */
function readFilePromised(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

/* GL initialization function */
export function initGL() {
  const canvas = document.getElementById("glCanvas");
  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.3, 0.47, 0.8, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Shader initialization
  const vs = `#version 300 es
    precision highp float;
    in vec4 in_pos;
    out vec4 color;
    out vec2 tpos;

    void main() {
        gl_Position = in_pos;
        tpos = in_pos.xy;
        color = vec4(in_pos.xy, 0.8, 1);
    }
  `;

  const fs = `#version 300 es
    precision highp float;
    out vec4 o_color;
    in vec4 color;
    in vec2 tpos;

    uniform float Time;

    vec2 mul( vec2 z1, vec2 z2 ) {
        return vec2(z1.x * z2.x - z1.y * z2.y, z1.x * z2.y + z1.y * z2.x);
    }
    
    float Julia( vec2 z, vec2 z0 ) {
        for (int i = 0; i < 256; i++)
        {
            if (dot(z, z) > 4.0)
              return float(i);
            z = mul(z, z) + z0;
        }
        return 256.0;
    }
    
    void main() {
        float X0 = -2.0, X1 = 2.0, Y0 = -2.0, Y1 = 2.0, n;
        vec2 Z, C;
        
        C = vec2(0.35 + 0.08 * sin(Time + 1.0), 0.39 + 0.4 * sin(1.1 * Time - 3.0));    
        Z = vec2(gl_FragCoord.x * (X1 - X0) / 500.0 + X0, gl_FragCoord.y * (Y1 - Y0) / 500.0 + Y0);
        n = Julia(Z, C) / 256.0;
            
        o_color = vec4(n * 16.0, n / 32.0, n * 2.0, 1);
    }
  `;

  const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
  const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);
  const program = gl.createProgram();

  gl.attachShader(program, vertexSh);
  gl.attachShader(program, fragmentSh);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("Error in program");
  }

  const posLoc = gl.getAttribLocation(program, "in_pos");
  const posBuf = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  // const pos = [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1];

  const x = 1;
  const pos = [-x, x, 0, -x, -x, 0, x, x, 0, x, -x, 0];
  // Time measure (from )
  const timeBegin = Date.now();

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
  gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0); /* 3 */
  gl.enableVertexAttribArray(posLoc);
  gl.useProgram(program);

  const timeFromStart = Date.now() - timeBegin;
  const uniformLoc = gl.getUniformLocation(program, "Time");
  gl.uniform1f(uniformLoc, timeFromStart / 1000.0);
  /* gl.clear(gl.COLOR_BUFFER_BIT); */
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); /* new function */

  // For time measuring
  const draw = () => {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0); /* 3 */
    gl.enableVertexAttribArray(posLoc);
    gl.useProgram(program);
    const timeFromStart = Date.now() - timeBegin;
    gl.uniform1f(uniformLoc, timeFromStart / 1000.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); /* new function */

    window.requestAnimationFrame(draw);
  };
  draw();
}
