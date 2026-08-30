"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { queryPoints } from "@/lib/queryPoints";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Every query the five client properties rank for, as a WebGL point cloud.
 *   x  log impressions          how often the term gets searched
 *   y  average position         sqrt scale, position 1 at the top
 *   z  clicks                   the ones that earn come forward
 * The band across the top is positions 1 to 3. Colours come from the theme
 * tokens and re-tint when the theme flips.
 *
 * Falls back to nothing if WebGL is missing; the caller renders the 2D canvas
 * in that case.
 */

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aTop;
  attribute float aSeed;
  attribute float aDelay;
  uniform float uTime;
  uniform float uReveal;
  uniform float uDpr;
  varying float vTop;
  varying float vAlpha;

  void main() {
    vTop = aTop;
    float appear = clamp((uReveal - aDelay) * 4.0, 0.0, 1.0);
    vec3 pos = position;
    pos.y += sin(uTime * 0.22 + aSeed) * 0.018;
    pos.x += cos(uTime * 0.17 + aSeed) * 0.015;
    pos.z += (1.0 - appear) * -2.4;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uDpr * (3.4 / -mv.z) * appear;
    vAlpha = appear;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uBrand;
  uniform vec3 uMuted;
  varying float vTop;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.16, d);
    float halo = smoothstep(0.5, 0.0, d);
    vec3 col = mix(uMuted, uBrand, vTop);
    float a = mix(0.42, 0.95, vTop) * vAlpha;
    a *= mix(core, halo * 0.85 + core * 0.4, vTop);
    gl_FragColor = vec4(col, a);
  }
`;

function readToken(name: string) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r, g, b] = raw.split(/\s+/).map(Number);
  return new THREE.Color(
    (isFinite(r) ? r : 0) / 255,
    (isFinite(g) ? g : 0) / 255,
    (isFinite(b) ? b : 0) / 255
  );
}

export function QueryFieldGL({ onFail }: { onFail: () => void }) {
  const host = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      onFail();
      return;
    }
    if (!renderer.getContext()) {
      onFail();
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W0 = el.clientWidth || 1;
    const H0 = el.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(W0, H0, false);
    renderer.domElement.className = "block h-full w-full";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W0 / H0, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    // Plot insets in px, matched by the DOM axis labels below.
    const INSET = { top: 40, bottom: 40, left: 56, right: 26 };

    /* ---- geometry from the real export ---- */
    const N = queryPoints.length;
    const SPAN_X = 9.2;
    const SPAN_Y = 4.1;
    // 99th-percentile ceiling: a handful of pages carry six-figure impressions,
    // and mapping to those alone would squash every other query into the left third.
    const MAX_IMP = Math.log10(60000);
    const posArr = new Float32Array(N * 3);
    const sizeArr = new Float32Array(N);
    const topArr = new Float32Array(N);
    const seedArr = new Float32Array(N);
    const delayArr = new Float32Array(N);

    const yFor = (pos: number) =>
      SPAN_Y / 2 - Math.sqrt(Math.min(1, (pos - 1) / 99)) * SPAN_Y;

    for (let i = 0; i < N; i++) {
      const [imp, pos, clicks] = queryPoints[i];
      const lx = Math.min(1, Math.log10(Math.max(1, imp)) / MAX_IMP);
      posArr[i * 3] = -SPAN_X / 2 + lx * SPAN_X;
      posArr[i * 3 + 1] = yFor(pos);
      posArr[i * 3 + 2] = clicks > 0 ? Math.min(0.9, Math.sqrt(clicks) * 0.16) : -0.25 + (i % 7) * 0.03;
      sizeArr[i] = clicks > 0 ? 7 + Math.min(16, Math.sqrt(clicks) * 4.2) : 4.6;
      topArr[i] = pos <= 3 ? 1 : 0;
      seedArr[i] = (i * 2.399963) % 6.283;
      delayArr[i] = (i % 41) / 41;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizeArr, 1));
    geo.setAttribute("aTop", new THREE.BufferAttribute(topArr, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seedArr, 1));
    geo.setAttribute("aDelay", new THREE.BufferAttribute(delayArr, 1));

    const uniforms = {
      uTime: { value: 0 },
      uReveal: { value: reduce ? 1 : 0 },
      uDpr: { value: renderer.getPixelRatio() },
      uBrand: { value: readToken("--brand") },
      uMuted: { value: readToken("--muted") },
    };

    const points = new THREE.Points(
      geo,
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      })
    );

    /* ---- the band that pays, and the position rules ---- */
    const group = new THREE.Group();
    group.add(points);

    /** Scales the plot so it fills the frame minus the label gutters. */
    function fit() {
      if (!el) return;
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      const visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
      const visW = visH * (w / h);
      const plotW = visW * ((w - INSET.left - INSET.right) / w);
      const plotH = visH * ((h - INSET.top - INSET.bottom) / h);
      group.scale.set(plotW / SPAN_X, plotH / SPAN_Y, 1);
      group.position.x = ((INSET.left - INSET.right) / 2 / w) * visW;
      group.position.y = ((INSET.bottom - INSET.top) / 2 / h) * visH;
    }

    const bandTop = yFor(1);
    const bandBot = yFor(3);
    const band = new THREE.Mesh(
      new THREE.PlaneGeometry(SPAN_X + 0.5, Math.max(0.16, bandTop - bandBot + 0.16)),
      new THREE.MeshBasicMaterial({
        color: uniforms.uBrand.value.clone(),
        transparent: true,
        opacity: 0.1,
        depthWrite: false,
      })
    );
    band.position.set(0, (bandTop + bandBot) / 2, -0.6);
    group.add(band);

    const rulePts: number[] = [];
    for (const p of [1, 10, 25, 50, 100]) {
      const y = yFor(p);
      rulePts.push(-SPAN_X / 2 - 0.2, y, -0.55, SPAN_X / 2 + 0.2, y, -0.55);
    }
    const ruleGeo = new THREE.BufferGeometry();
    ruleGeo.setAttribute("position", new THREE.Float32BufferAttribute(rulePts, 3));
    const ruleMat = new THREE.LineBasicMaterial({
      color: uniforms.uMuted.value.clone(),
      transparent: true,
      opacity: 0.18,
    });
    group.add(new THREE.LineSegments(ruleGeo, ruleMat));
    scene.add(group);

    /* ---- theme re-tint ---- */
    const retint = () => {
      uniforms.uBrand.value.copy(readToken("--brand"));
      uniforms.uMuted.value.copy(readToken("--muted"));
      (band.material as THREE.MeshBasicMaterial).color.copy(uniforms.uBrand.value);
      ruleMat.color.copy(uniforms.uMuted.value);
    };
    const themeObs = new MutationObserver(retint);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    /* ---- motion ---- */
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const scrollTilt = { v: 0 };

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.to(uniforms.uReveal, { value: 1, duration: 2.4, ease: "power2.out", delay: 0.15 });
      }
      gsap.to(scrollTilt, {
        v: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, el);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(el);

    fit();
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      // fast enough to feel like the plot is tracking you, not lagging behind
      pointer.x += (target.x - pointer.x) * 0.11;
      pointer.y += (target.y - pointer.y) * 0.11;
      group.rotation.y = pointer.x * 0.07 + scrollTilt.v * 0.05;
      group.rotation.x = -pointer.y * 0.04 + scrollTilt.v * 0.03;
      camera.position.z = 7.4 - pointer.y * 0.08;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      target.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        uniforms.uDpr.value = renderer.getPixelRatio();
        fit();
      }, 150);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      ctx.revert();
      io.disconnect();
      themeObs.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      ruleGeo.dispose();
      (points.material as THREE.Material).dispose();
      (band.material as THREE.Material).dispose();
      band.geometry.dispose();
      ruleMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onFail]);

  return <div ref={host} className="absolute inset-0" aria-hidden />;
}

/** Chrome around the field: the frame, the axis labels, the fallback switch. */
/** Label positions share the plot's sqrt scale so they line up with the rules. */
const AXIS: [number, number][] = [1, 10, 25, 50, 100].map((p) => [
  p,
  Math.sqrt((p - 1) / 99),
]) as [number, number][];

export function QueryField({ fallback }: { fallback: React.ReactNode }) {
  const [failed, setFailed] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative h-[220px] overflow-hidden rounded-md border border-line bg-surface sm:h-[340px]">
      {mounted && !failed ? <QueryFieldGL onFail={() => setFailed(true)} /> : null}
      {failed || !mounted ? <div className="absolute inset-0">{fallback}</div> : null}

      {AXIS.map(([pos, f]) => (
        <span
          key={pos}
          className="pointer-events-none absolute left-4 font-mono text-[10px] tabular-nums text-muted"
          style={{ top: `calc(40px + (100% - 80px) * ${f} - 6px)` }}
        >
          {pos}
        </span>
      ))}

      <span className="eyebrow pointer-events-none absolute left-4 top-3">Avg position</span>
      <span className="eyebrow pointer-events-none absolute bottom-2.5 right-4">
        More impressions &rarr;
      </span>
      <span className="eyebrow pointer-events-none absolute right-4 top-3 text-brand">
        &#9679; Top 3
      </span>
      <span className="eyebrow pointer-events-none absolute bottom-2.5 left-4">
        1,100 live queries
      </span>
    </div>
  );
}
