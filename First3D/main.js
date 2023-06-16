/* FILE NAME: main.js
 * PROGRAMMER: AG2
 * LAST UPDATE: 06.06.2023
 * PURPOSE: 3D main module.
 */

import { mat4, vec3 } from "./mth/matr4.js";
import { camera } from "./mth/camera.js";
import { prim, loadPrim } from "./rnd/rndprim.js";
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
//import { tetrData, tetrInd } from "./data/buffers.js";
//import { octaData, octaInd } from "./data/buffers.js";
//import { dodecaData, dodecaInd } from "./data/buffers.js";
//import { icosaData, icosaInd } from "./data/buffers.js";

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
    // layout(location = 1) in vec4 in_color;
    layout(location = 1) in vec3 in_normal;
    
    out vec4 i_color;
    out vec3 DrawPos;
    out vec3 DrawNormal;

    uniform mat4 MatrWVP;
    uniform mat4 MatrWInv;
    uniform mat4 MatrW;
    uniform float Time;

    void main() {
        gl_Position = MatrWVP * vec4(in_pos, 1);
        // i_color = in_color;
        // if (Time > 4.0 && Time < 10.0)
        // i_color = vec4(0, 0, 0, 1);
        // else
        // i_color = vec4(in_pos, 1);
        DrawPos = (MatrW * vec4(in_pos, 1)).xyz;
        DrawNormal = mat3(MatrWInv) * in_normal;
        i_color = vec4(in_normal, 1);
    }
  `;

  const fs = `#version 300 es
    precision highp float;
    in vec4 i_color;
    in vec3 DrawNormal;
    in vec3 DrawPos;

    out vec4 o_color;

    vec3 Shade( vec3 P, vec3 N ) 
    {
      vec3 L = normalize(vec3(1, 2, 3));
      vec3 LC = vec3(1, 1, 1);
      vec3 color = vec3(0);
      vec3 V = normalize(P - vec3(3, 3, 3));

      // Ambient
      color = vec3(0.1745, 0.01175, 0.01175); // Ka

      N = faceforward(N, V, N);
      
      vec3 diff = vec3(0.61424, 0.04136, 0.04136); // Kd
      color += max(0.0, dot(N, L)) * diff * LC;

      // Specular
      vec3 R = reflect(V, N);
      color += pow(max(0.0, dot(R, L)), 76.8) * vec3(0.727811, 0.626959, 0.626959) * LC; // Ph then Ks
      
      return color;
    }

    void main() {
        o_color = vec4(Shade(DrawPos, normalize(DrawNormal)), 1);
        // o_color = vec4(DrawNormal, 1);
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
  let cowObj = loadPrim();
  // console.log(cowObj[0]);
  let prim1 = new prim(gl, gl.TRIANGLE_STRIP, cubData, cubInd, shdprogram);
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
  let prim6 = new prim(gl, gl.TRIANGLES, cowObj[0], cowObj[1], shdprogram);
  let cam = camera();

  const drawRender = () => {
    gl.enable(gl.DEPTH_TEST);
    prim6.draw(cam, mat4().setRotate(Date.now() / 2500, vec3(1, 2, 0)));
    // prim6.draw(cam, mat4().setIdentity());
    window.requestAnimationFrame(drawRender);
  };
  drawRender();
}

/* END OF 'main.js' FILE */
