#version 300 es
precision highp float;
// Layouts
layout(location = 0) in highp vec3 in_pos;

// UBOs
uniform float Time;

// For fragment shader
out float i_flag;

void main() {
    gl_Position = vec4(in_pos, 1);
}
