#version 300 es
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
    n = Julia(Z, Z) / 256.0;
        
    o_color = vec4(n * 16.0, n / 32.0, n * 2.0, 1);
}