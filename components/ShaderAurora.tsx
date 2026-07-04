"use client";

import { useEffect, useRef } from "react";

// Hand-rolled WebGL aurora: domain-warped fbm noise in the brand palette that
// glows toward the cursor. No dependencies (~4KB). Reads colours from the CSS
// variables so it re-tints on theme change. Renders only while the hero is on
// screen and the tab is visible; desktop pointers only. If WebGL is missing
// (or on mobile / reduced motion) the CSS .hero-aurora underneath remains.

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float uT;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.05 + vec2(3.1, 1.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float t = uT * 0.05;

  vec2 warp = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 - t * 0.8));
  float n1 = fbm(p * 2.0 + warp * 1.5 + t);
  float n2 = fbm(p * 1.3 - warp * 1.2 - t * 0.7);

  float md = length(p - m);
  float glow = smoothstep(0.6, 0.0, md) * 0.4;

  vec3 col = uC1 * (n1 * 0.6 + glow)
           + uC2 * n2 * 0.38
           + uC3 * fbm(p * 3.1 + t * 1.3) * 0.2;

  float alpha = clamp(n1 * 0.5 + n2 * 0.45 + glow, 0.0, 1.0);
  alpha *= smoothstep(0.02, 0.5, alpha) * 0.5;
  gl_FragColor = vec4(col, alpha);
}
`;

function cssColor(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
    return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
  }
  return [0.13, 0.73, 0.69];
}

export function ShaderAurora({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) return null;
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const uT = gl.getUniformLocation(prog, "uT");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uC1 = gl.getUniformLocation(prog, "uC1");
    const uC2 = gl.getUniformLocation(prog, "uC2");
    const uC3 = gl.getUniformLocation(prog, "uC3");

    const setColors = () => {
      gl.uniform3fv(uC1, cssColor("--brand"));
      gl.uniform3fv(uC2, cssColor("--accent"));
      gl.uniform3fv(uC3, cssColor("--ink"));
    };
    setColors();
    const themeWatch = new MutationObserver(setColors);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / Math.max(r.width, 1);
      mouse.ty = 1 - (e.clientY - r.top) / Math.max(r.height, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let raf = 0;
    let faded = false;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!faded) {
        faded = true;
        canvas.style.opacity = "1";
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      themeWatch.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`opacity-0 transition-opacity duration-1000 ${className}`}
    />
  );
}
