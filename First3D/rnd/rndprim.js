/* FILE NAME: rndprim.js
 * PROGRAMMER: AG2
 * LAST UPDATE: 07.06.2023
 * PURPOSE: 3D primitives module.
 */

import { vec3, mat4, MatrMulMatr2 } from "../mth/matr4.js";
export { vec3, mat4 };

/***
 * Primitives module
 ***/

/* Primitives representation type */ // DONT USE NoofV --> V.length / (length of 1 vertix = 3, color = 4)
export class prim {
  constructor(gl, type, V, I, shdprogram) {
    if (V != undefined) {
      this.vBuf = gl.createBuffer();
      this.va = gl.createVertexArray();
      // Vertex data
      gl.bindVertexArray(this.va);
      // Active buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vBuf);
      // Merge data
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(V), gl.STATIC_DRAW);

      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 10 * 4, 0); // position
      gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 10 * 4, 4 * 3); // color
      gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 10 * 4, 4 * 7); // normal

      // Include the necessary attributes (layout)
      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);
      gl.enableVertexAttribArray(2);
      // Close vertex array
      gl.bindVertexArray(null);
    }
    if (I != null) {
      // Index data
      this.iBuf = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int32Array(I), gl.STATIC_DRAW);
      // gl.bindBuffer(0);
      this.numOfElements = I.length;
    } else {
      this.numOfElements = V.length;
    }
    this.trans = mat4().setIdentity();
    this.type = type;
    this.shdprogram = shdprogram;
    this.gl = gl;
  }
  /* Draw primitive function */
  draw(cam, world) {
    let w = MatrMulMatr2(this.trans, world);
    // let winw =  Transponce!!!
    let wvp = mat4(w).mul(cam.matrVP);

    this.gl.useProgram(this.shdprogram);
    this.gl.bindVertexArray(this.va);

    let locWVP = this.gl.getUniformLocation(this.shdprogram, "MatrWVP");
    if (locWVP != null) {
      this.gl.uniformMatrix4fv(locWVP, false, new Float32Array(wvp.toArray()));
    }

    if (this.iBuf != undefined) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.iBuf);
      this.gl.drawElements(
        this.type,
        this.numOfElements,
        this.gl.UNSIGNED_INT,
        0
      );
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    } else {
      this.gl.drawArrays(this.type, 0, this.numOfElements);
    }

    this.gl.bindVertexArray(null);
    this.gl.useProgram(null);
  }
}
