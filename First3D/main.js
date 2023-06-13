/* FILE NAME: main.js
 * PROGRAMMER: AG2
 * LAST UPDATE: 06.06.2023
 * PURPOSE: 3D main module.
 */

import { mat4, vec3 } from "./mth/matr4.js";
import { camera } from "./mth/camera.js";
import { prim } from "./rnd/rndprim.js";

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

/* GL initialization function */
export function initGL() {
  const canvas = document.getElementById("glCanvas");
  const gl = canvas.getContext("webgl2");

  gl.clearColor(0.3, 0.47, 0.8, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Shader initialization

  const vs = `#version 300 es
    precision highp float;
    layout(location = 0) in vec3 in_pos;
    layout(location = 1) in vec4 in_color;
    out vec4 i_color;
    uniform mat4 MatrWVP;

    void main() {
        gl_Position = MatrWVP * vec4(in_pos, 1);
        i_color = in_color;
    }
  `;

  const fs = `#version 300 es
    precision highp float;
    out vec4 o_color;
    in vec4 i_color;

    void main() {
        o_color = i_color;
    }
  `;

  const vertexSh = loadShader(gl, gl.VERTEX_SHADER, vs);
  const fragmentSh = loadShader(gl, gl.FRAGMENT_SHADER, fs);
  const shdprogram = gl.createProgram();

  gl.attachShader(shdprogram, vertexSh);
  gl.attachShader(shdprogram, fragmentSh);
  gl.linkProgram(shdprogram);

  if (!gl.getProgramParameter(shdprogram, gl.LINK_STATUS)) {
    alert("Error in program");
  }

  /* Buffers */
  const vBuf = gl.createBuffer();
  // Position     Color          Normals
  let dataBuf = [
    0, 0, 1,    0, 1, 0, 1,      1, 0, 0,
    0, 1, 1,    1, 0, 0, 1,      1, 0, 0, 
    1, 1, 1,    0, 0, 1, 1,      1, 0, 0, 
    1, 0, 1,    1, 1, 0, 1,      1, 0, 0, 
    1, 0, 1,    1, 0, 1, 1,     -1, 0, 0,
    1, 1, 1,    0, 1, 1, 1,     -1, 0, 0,
    1, 1, 0,    1, 0, 0, 1,     -1, 0, 0,
    1, 0, 0,    0, 1, 0, 1,     -1, 0, 0,
    1, 0, 0,    1, 0, 1, 1,      0, 1, 0, 
    0, 0, 0,    1, 0.5, 1, 0.3,  0, 1, 0, 
    0, 1, 0,    1, 1, 0.4, 1,    0, 1, 0, 
    1, 1, 0,    1, 1, 0.5, 0.4,  0, 1, 0, 
    0, 0, 0,    1, 0, 0, 1,      0, -1, 0,
    0, 0, 1,    1, 0, 0, 1,      0, -1, 0,
    0, 1, 1,    1, 0, 1, 1,      0, -1, 0, 
    0, 1, 0,    1, 0, 0, 1,      0, -1, 0, 
    0, 1, 1,    1, 0, 0, 1,      0, 0, 1, 
    0, 1, 0,    1, 1, 1, 1,      0, 0, 1, 
    1, 1, 0,    1, 0, 0, 1,      0, 0, 1, 
    1, 1, 1,    0, 0, 1, 1,      0, 0, 1, 
    0, 0, 1,    1, 0, 0, 1,      0, 0, -1,
    0, 0, 0,    1, 0, 0, 1,      0, 0, -1,
    1, 0, 0,    1, 0, 0, 1,      0, 0, -1,  
    1, 0, 1,    1, 0, 1, 1,      0, 0, -1,
  ];

  let ind = [
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ];
  // POINTS, LINES, TRIANGLE_STRIP, TRIANGLES
  let prim1 = new prim(gl, gl.TRIANGLE_STRIP, dataBuf, ind, shdprogram);
  let cam = camera();

  const drawRender = () => {
    gl.enable(gl.DEPTH_TEST);
    prim1.draw(
      cam,
      mat4().setRotate(Math.sin(Date.now() / 1000), vec3(1, 2, 3))
    );

    window.requestAnimationFrame(drawRender);
  };
  drawRender();
}
