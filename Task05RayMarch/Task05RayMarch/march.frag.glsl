#version 300 es
precision highp float;
out vec4 o_color;

// Data from vertex shader
in float i_flag;

// UBOs
// uniform float Time;
// uniform float DeltaX;
// uniform float Wheel;
// uniform float DeltaY;
// uniform vec3 CamPos;
// uniform vec3 WH;
// #define ScreenW WH.x 
// #define ScreenH WH.y

// New UBOs
layout(std140) uniform Camera
{
  vec4 MouseXYZTime;
  vec4 MouseDeltaXYScreenWH;
};
#define CamPos MouseXYZTime.xyz
#define Time MouseXYZTime.w
#define DeltaX MouseDeltaXYScreenWH.x
#define NumberOfSpheres MouseDeltaXYScreenWH.y
#define ScreenW MouseDeltaXYScreenWH.z
#define ScreenH MouseDeltaXYScreenWH.w
// #define NumberOfSpheres numOfSphEtc.x

// float map_the_world(in vec3 p)
// {
//     float sphere_0 = distance_from_sphere(p, vec3(0.0), 1.0);

//     return sphere_0;
// }

float distance_from_sphere(in vec3 p, in vec3 c, float r)
{
    return length(p - c) - r;
}

float distance_from_plane( vec3 p, vec3 n, float h )
{
  // n must be normalized
  return dot(p, n) + h;
}

float distance_from_roundBox( vec3 p, vec3 b, float r )
{
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

float distance_from_link( vec3 p, float le, float r1, float r2 )
{
  vec3 q = vec3(p.x, max(abs(p.y) - le, 0.0), p.z);
  return length(vec2(length(q.xy) - r1,q.z)) - r2;
}

float distance_from_deathStar( vec3 p2, float ra, float rb, float d )
{
  // sampling independent computations (only depend on shape)
  float a = (ra * ra - rb * rb + d * d) / (2.0 * d);
  float b = sqrt(max(ra * ra - a * a, 0.0));
	
  // sampling dependant computations
  vec2 p = vec2(p2.x, length(p2.yz));
  if (p.x * b - p.y * a > d * max(b - p.y, 0.0))
    return length(p - vec2(a, b));
  else
    return max((length(p) - ra),
               -(length(p - vec2(d, 0.0)) - rb));
}

float distance_from_torus( vec3 p, vec2 t )
{
  vec2 q = vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float map_the_world(in vec3 p)
{
    // float displacement = sin(5.0 * p.x) * sin(5.0 * p.y) * sin(5.0 * p.z) * 0.25;
    // // displacement = 0.0;
    // float sphere_0 = distance_from_sphere(p, vec3(0, 0, 0), 1.0);
    // float sphere_1 = distance_from_sphere(p, center + 1.0, 1.0);
    // float plane = distance_from_plane(p, vec3(0, 1, 0), 1.5);
    // return sphere_0 + displacement;
    // return min(sphere_0, sphere_1);

    // float minsh = distance_from_sphere(p, vec3(0), 1.0);
    // float sphere_i;
    // for (int i = 1; i < 30; i++)
    // {
    //   sphere_i = distance_from_sphere(p, vec3(i * 2, 0, 0), 1.0);
    //   minsh = min(minsh, sphere_i);
    // }
    // return minsh;

    // return min(distance_from_link(p, 1.5, 2.0, 0 .9), distance_from_sphere(p, vec3(6, 0, 0), 2.0));
    float min_sphere_dist = distance_from_sphere(p, vec3(0, 0, -3), 1.0);

    for (int i = 1; i < int(NumberOfSpheres); i++)
      min_sphere_dist = min(min_sphere_dist, distance_from_sphere(p, vec3(i * 2, 0, -3), 1.0));
    
    // return min(distance_from_torus(p, vec2(1.0, 0.1)),
    //            min(distance_from_link(p, 1.5, 2.0, 0.9),
    //            min(distance_from_deathStar(p, 0.5, 0.35 + 0.20, 0.50 + 0.15), 
    //            min(min_sphere_dist, distance_from_sphere(p, vec3(6, 0, 0), 2.0)))));
    return min(distance_from_torus(p, vec2(1.0, 0.1)),
           min(distance_from_link(p, 1.5, 2.0, 0.9),
           min(distance_from_deathStar(p, 0.5, 0.35 + 0.20, 0.50 + 0.15), 
           min_sphere_dist)));
    // return min(distance_from_torus(p, vec2(2, 0.3)), distance_from_sphere(p, vec3(6, 0, 0), 2.0));
}

vec3 calculate_normal(in vec3 p)
{
    const vec3 small_step = vec3(0.001, 0.0, 0.0);

    float gradient_x = map_the_world(p + small_step.xyy) - map_the_world(p - small_step.xyy);
    float gradient_y = map_the_world(p + small_step.yxy) - map_the_world(p - small_step.yxy);
    float gradient_z = map_the_world(p + small_step.yyx) - map_the_world(p - small_step.yyx);

    vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

    return normalize(normal);
}

// Plane module

float map_the_plane(in vec3 p)
{
    return distance_from_plane(p, vec3(0, 1, 0), /*1.5*/4.0);
}

vec3 calculate_normal_plane(in vec3 p)
{
    const vec3 small_step = vec3(0.001, 0.0, 0.0);

    float gradient_x = map_the_plane(p + small_step.xyy) - map_the_plane(p - small_step.xyy);
    float gradient_y = map_the_plane(p + small_step.yxy) - map_the_plane(p - small_step.yxy);
    float gradient_z = map_the_plane(p + small_step.yyx) - map_the_plane(p - small_step.yyx);

    vec3 normal = vec3(gradient_x, gradient_y, gradient_z);

    return normalize(normal);
}

// Shading
vec3 Shade( vec3 P, vec3 N, vec3 Ka, vec3 Kd, vec3 Ks, float Ph, bool Mod ) 
{
    vec3 L = normalize(vec3(0.0, 2.0, 10.0));
    vec3 LC = vec3(1, 1, 1);
    vec3 color = vec3(0);
    vec3 V = normalize(P);

    // Ambient
    // color = vec3(0.1745, 0.01175, 0.01175); // Ka
    color = Ka;

    N = faceforward(N, V, N);
      
    // vec3 diff = vec3(0.61424, 0.04136, 0.04136); // Kd
    vec3 diff = Kd;
    
    // ((INT(Sh->P.X) ^ INT(Sh->P.Y) ^ INT(Sh->P.Z)) & 1) ? 1 : 0.28;
    if (bool((int(P.x) ^ int(P.y) ^ int(P.z)) & 1) && Mod)
      diff *= 1.0;
    else
      diff *= 0.28;
    
    color += max(0.0, dot(N, L)) * diff * LC;

    // Specular
    vec3 R = reflect(V, N);
    color += pow(max(0.0, dot(R, L)), Ph/*76.8*/) * Ks/*vec3(0.727811, 0.626959, 0.626959)*/ * LC; // Ph then Ks
      
    return color;
}

vec3 ray_march(in vec3 ro, in vec3 rd)
{
    float total_distance_traveled = 0.0;
    const int NUMBER_OF_STEPS = 256;
    const float MINIMUM_HIT_DISTANCE = 0.0001;
    const float MAXIMUM_TRACE_DISTANCE = 1000.0;
    
    // Spheres and other figures
    for (int i = 0; i < NUMBER_OF_STEPS; ++i)
    {
        vec3 current_position = ro + total_distance_traveled * rd;

        // float distance_to_figures;
        // vec3 center_min = vec3(0);
        // for (float i = 0.0; i < 3.0; i++)
        // {
        //   if (map_the_world(current_position, vec3(i, 0, 0)) < map_the_world(current_position, vec3(i + 0.1, 0, 0)))
        //   {
        //     distance_to_figures = map_the_world(current_position, vec3(i));
        //     center_min = vec3(i, 0, 0);
        //   }
        //   else
        //   {
        //     distance_to_figures = map_the_world(current_position, vec3(i + 0.1, 0, 0));
        //     center_min = vec3(0, i + 0.1, 0);
        //   }
        //   // distance_to_figures = min(map_the_world(current_position, vec3(0)), map_the_world(current_position, vec3(i, 0, 0)));
        // }
        float distance_to_figures = map_the_world(current_position);
        
        float distance_to_plane = map_the_plane(current_position);
        float distance_to_closest = min(distance_to_plane, distance_to_figures);
    
        if (distance_to_closest < MINIMUM_HIT_DISTANCE) 
        {
            if (distance_to_plane <= distance_to_figures)
            {
              vec3 normal = calculate_normal_plane(current_position);
              return Shade(current_position, normal, vec3(0.24725,0.1995,0.0745), 
                vec3(0.75164,0.60648,0.22648), vec3(0.628281,0.555802,0.366065), 51.2, true);
            }
            vec3 normal = calculate_normal(current_position);
            return Shade(current_position, normal, vec3(0.1745, 0.01175, 0.01175), 
              vec3(0.61424, 0.04136, 0.04136), vec3(0.727811, 0.626959, 0.626959), 76.8, false);
        }
    
        if (total_distance_traveled > MAXIMUM_TRACE_DISTANCE)
        {
            break;
        }
        total_distance_traveled += distance_to_closest;
    }
    return vec3(0.30, 0.47, 0.80);
}

void main()
{
    // vec2 uv = vUV.st * 2.0 - 1.0;
    vec2 uv = vec2(-1.0, -1.0) + 2.0 * gl_FragCoord.xy / max(ScreenW, ScreenH);

    // vec3 camera_position = vec3(0.0 + DeltaX * -0.01, 0.0 + DeltaY * 0.01, -5.0 + Wheel * 0.002);
    // abs(sin(Time))
    vec3 camera_position = CamPos;
    // vec3 camera_position = vec3(max(-3.0, CamPos.x) , min(3.0, CamPos.y), CamPos.z);
    // camera_position = vec3(4.0, 2.0, -10.0);
    vec3 ro = camera_position;
    vec3 rd = vec3(uv, 1.0);

    vec3 shaded_color = ray_march(ro, rd);
    o_color = vec4(shaded_color, 1.0);    
}
