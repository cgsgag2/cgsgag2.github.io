#version 300 es
precision highp float;
in vec4 in_pos;
out vec4 color;
out vec2 tpos;

void main() {
    gl_Position = in_pos;
    tpos = in_pos.xy;
    color = vec4(in_pos.xy, 0.8, 1);
}