/* FILE NAME: main.js
 * PROGRAMMER: AG2
 * LAST UPDATE: 06.06.2023
 * PURPOSE: 3D main module.
 */

import { mat4, vec3 } from "./mth/matr4.js";
import { camera } from "./mth/camera.js";
import { prim } from "./rnd/rndprim.js";
import {
  cubData,
  cubInd,
  tetrData,
  tetrInd,
  octaData,
  octaInd,
  dodecaData,
  dodecaInd,
  icosaData,
  icosaInd,
} from "./data/buffers.js";

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
    layout(location = 2) in vec3 in_normal;
    
    out vec4 i_color;

    uniform mat4 MatrWVP;
    uniform mat4 MatrWInv;
    uniform mat4 MatrW;
    uniform float Time;

    void main() {
        gl_Position = MatrWVP * vec4(in_pos, 1);
        // i_color = in_color;
        if (Time > 4.0 && Time < 10.0)
          i_color = vec4(1, 0, 0, 1);
        else
          i_color = vec4(in_pos, 1);
    }
  `;

  const fs = `#version 300 es
    precision highp float;
    in vec4 i_color;  

    out vec4 o_color;

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

  // POINTS, LINES, TRIANGLE_STRIP, TRIANGLES
  let prim1 = new prim(gl, gl.TRIANGLES, cubData, cubInd, shdprogram);
  let prim2 = new prim(gl, gl.TRIANGLE_STRIP, octaData, octaInd, shdprogram);
  let prim3 = new prim(gl, gl.TRIANGLE_STRIP, tetrData, tetrInd, shdprogram);
  let prim4 = new prim(gl, gl.TRIANGLE_STRIP, icosaData, icosaInd, shdprogram);
  let prim5 = new prim(
    gl,
    gl.TRIANGLE_STRIP,
    dodecaData,
    dodecaInd,
    shdprogram
  );
  let cam = camera();

  const drawRender = () => {
    gl.enable(gl.DEPTH_TEST);
    prim1.draw(
      cam,
      mat4()
        .translate(-7, 0, 0)
        .rotate(Date.now() / 2500, vec3(1, 0, 0))
    );
    prim2.draw(
      cam,
      mat4()
        .translate(-3, 0, 0)
        .rotate(Date.now() / 2500, vec3(1, 0, 0))
    );
    prim3.draw(
      cam,
      mat4()
        .translate(1, 0, 0)
        .rotate(Date.now() / 2500, vec3(1, 0, 0))
    );
    prim4.draw(
      cam,
      mat4()
        .translate(5, 0, 0)
        .rotate(Date.now() / 2500, vec3(1, 0, 0))
    );
    prim5.draw(
      cam,
      mat4()
        .scale(1.3, 1.3, 1.3)
        .translate(9, 0, 0)
        .rotate(Date.now() / 2500, vec3(1, 0, 0))
    );

    window.requestAnimationFrame(drawRender);
  };
  drawRender();
}

/* END OF 'main.js' FILE */
