"use client";

import Link from "next/link";
import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

// ─── Camera Views ─────────────────────────────────────────────────────────────
// Garden world bounds after auto-scale:
//   X: -20 to +20  (width, long axis)
//   Y:   0 to 2.34 (height — very flat landscape)
//   Z: -9.4 to +9.4 (depth)
// Sofa, dining & pergola all cluster near center (0.5, 1.3, -0.3)
//
// Both views place camera INSIDE the garden at standing eye height (~1.4 units)
const VIEWS = {
  // Seating Area — standing at the west end (-X), looking east along the garden length
  // Camera is inside the garden, looking toward the pergola and dining area
  front: {
    position: [4, 2, 10]  as [number, number, number],
    target:   [-4 ,  0.5, 18] as [number, number, number],
  },
  // Pergola View — standing at the east end (+X), looking west back across the garden
  // Camera is inside near the far end, looking back toward seating
  back: {
    position: [2,  2, -8]  as [number, number, number],
    target:   [-8,  1 , -35] as [number, number, number],
  },
};

function CameraController({
  view,
  controlsRef,
}: {
  view: "front" | "back";
  controlsRef: React.RefObject<OrbitControlsImpl>;
}) {
  const { camera } = useThree();
  const animating = useRef(false);
  const startPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const progress = useRef(0);
  const lastView = useRef<string>("");

  useEffect(() => {
    if (lastView.current === view) return;
    lastView.current = view;
    startPos.current.copy(camera.position);
    if (controlsRef.current) startTarget.current.copy(controlsRef.current.target);
    progress.current = 0;
    animating.current = true;
  }, [view, camera, controlsRef]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    progress.current = Math.min(progress.current + delta * 1.5, 1);
    const t = 1 - Math.pow(1 - progress.current, 3);
    const destPos = new THREE.Vector3(...VIEWS[view].position);
    const destTarget = new THREE.Vector3(...VIEWS[view].target);
    camera.position.lerpVectors(startPos.current, destPos, t);
    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(startTarget.current, destTarget, t);
      controlsRef.current.update();
    }
    if (progress.current >= 1) animating.current = false;
  });

  return null;
}

function BuildingModel() {
  // GLB file — place in public/3d_models/landscape_fpr_renovation_2.glb
  const { scene } = useGLTF("/landscape fpr renovation 2-blender.glb");
  useEffect(() => {
    if (!scene) return;
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Scale so the garden's longest dimension = 40 units
    // ↑ increase to make bigger, ↓ decrease to shrink
    const targetSize = 40;
    const scale = targetSize / maxDim;

    scene.scale.setScalar(scale);
    // Center horizontally, sit flush on ground
    scene.position.set(
      -center.x * scale,
      -box.min.y * scale,
      -center.z * scale
    );

    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Ensure textures are decoded in sRGB so colours match the original render
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.map)              mat.map.colorSpace              = THREE.SRGBColorSpace;
        if (mat && mat.emissiveMap)      mat.emissiveMap.colorSpace      = THREE.SRGBColorSpace;
        if (mat && (mat as any).needsUpdate !== undefined) mat.needsUpdate = true;
      }
    });
  }, [scene]);
  return <primitive object={scene} />;
}

function Loader() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 1.2;
    ref.current.rotation.x += delta * 0.4;
  });
  return (
    <mesh ref={ref} position={[0, 1.5, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#c8a97e" wireframe />
    </mesh>
  );
}

function Scene({ view }: { view: "front" | "back" }) {
  const controlsRef = useRef<OrbitControlsImpl>(null!);
  return (
    <>
      {/* Bright outdoor sun — matches the reference renders */}
      <ambientLight intensity={1.2} />
      <directionalLight
        position={[15, 20, 10]}
        intensity={3.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={100}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      {/* Soft sky fill from opposite side */}
      <directionalLight position={[-10, 8, -10]} intensity={1.0} color="#c8e0ff" />
      {/* Warm bounce light from ground */}
      <hemisphereLight args={["#87ceeb", "#c8a97e", 0.6]} />
      <Environment preset="sunset" environmentIntensity={0.4} backgroundIntensity={0} />
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={80} blur={2} far={10} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#d9cbb8" roughness={0.95} />
      </mesh>
      <CameraController view={view} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.06}

        // ── Mouse button assignments ──────────────────────────────────────
        // 0 = LEFT, 1 = MIDDLE, 2 = RIGHT
        mouseButtons={{
          LEFT:   THREE.MOUSE.ROTATE,  // left-drag  → rotate
          MIDDLE: THREE.MOUSE.PAN,     // middle-drag → pan
          RIGHT:  THREE.MOUSE.PAN,     // right-drag  → pan
        }}

        // ── Touch assignments ─────────────────────────────────────────────
        // 1 finger = rotate, 2 fingers = dolly + pan
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}

        // ── Zoom caps — edit these values to your liking ──────────────────
        // minDistance={20}   // closest zoom IN  (lower number = can zoom closer)
        // maxDistance={300}  // furthest zoom OUT (higher number = can zoom farther)

        // maxPolarAngle={Math.PI / 2.05} // uncomment to prevent going below ground
        target={[0, 1, 0]}
      />
      <Suspense fallback={<Loader />}>
        <BuildingModel />
      </Suspense>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Project1() {
  const [view, setView] = useState<"front" | "back">("front");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --cream:      #e8ddd0;
          --parchment:  #d9cbb8;
          --warm-white: #efe6d8;
          --brown-100:  #cdbfa8;
          --brown-300:  #a8835a;
          --brown-500:  #7a5230;
          --brown-700:  #4e2f10;
          --brown-900:  #2c1a0a;
          --ink:        #1a0f05;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: 'EB Garamond', serif;
        }

        .page-wrap {
          min-height: 100vh;
          background: var(--cream);
          position: relative;
          overflow-x: hidden;
        }

        /* grain overlay */
        .page-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }

        /* ── Nav ── */
        .nav {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          background: var(--warm-white);
          border-bottom: 1px solid var(--brown-100);
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          height: 64px;
        }

        .nav-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brown-500);
          text-decoration: none;
          transition: color 0.2s, gap 0.2s;
          justify-self: start;
        }

        .nav-back:hover {
          color: var(--brown-700);
          gap: 12px;
        }

        .nav-back-arrow {
          font-size: 0.9rem;
          line-height: 1;
          transition: transform 0.2s;
        }

        .nav-back:hover .nav-back-arrow {
          transform: translateX(-3px);
        }

        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--brown-700);
          text-decoration: none;
          letter-spacing: 0.04em;
          justify-self: center;
          text-align: center;
        }

        /* ── Main layout ── */
        .main {
          position: relative;
          z-index: 1;
          padding-top: 64px;
          display: grid;
          grid-template-columns: 300px 1fr;
          min-height: 100vh;
        }

        /* ── Sidebar ── */
        .sidebar {
          border-right: 1px solid var(--brown-100);
          padding: 56px 36px 56px 48px;
          display: flex;
          flex-direction: column;
          gap: 48px;
          background: var(--warm-white);
          position: sticky;
          top: 64px;
          height: calc(100vh - 64px);
          overflow-y: auto;
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--brown-300);
        }

        .sidebar-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem;
          font-weight: 700;
          line-height: 1.1;
          color: var(--brown-900);
        }

        .sidebar-title em {
          font-style: italic;
          color: var(--brown-500);
        }

        .sidebar-body {
          font-family: 'EB Garamond', serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--brown-700);
        }

        .meta-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .meta-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 8px 0;
          border-bottom: 1px solid var(--brown-100);
        }

        .meta-key {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brown-300);
        }

        .meta-val {
          font-family: 'EB Garamond', serif;
          font-size: 0.95rem;
          color: var(--brown-700);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--brown-500);
          text-decoration: none;
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid var(--brown-100);
          transition: color 0.2s, gap 0.2s;
        }

        .back-link:hover {
          color: var(--brown-700);
          gap: 12px;
        }

        /* ── Viewer panel ── */
        .viewer-panel {
          display: flex;
          flex-direction: column;
          padding: 48px 56px;
          gap: 28px;
          background: var(--cream);
        }

        .viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .viewer-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brown-300);
        }

        /* View toggle */
        .toggle-group {
          display: flex;
          background: var(--warm-white);
          border: 1px solid var(--brown-100);
          border-radius: 6px;
          overflow: hidden;
          padding: 3px;
          gap: 3px;
        }

        .toggle-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: var(--brown-300);
        }

        .toggle-btn.active {
          background: var(--brown-700);
          color: var(--cream);
        }

        .toggle-btn:not(.active):hover {
          background: var(--brown-100);
          color: var(--brown-700);
        }

        /* Canvas wrapper */
        .canvas-wrap {
          flex: 1;
          min-height: 520px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--brown-100);
          box-shadow:
            0 2px 4px rgba(44,26,10,0.08),
            0 8px 24px rgba(44,26,10,0.14),
            0 32px 64px rgba(44,26,10,0.12);
          background: var(--parchment);
          position: relative;
        }

        /* Corner ornaments */
        .canvas-wrap::before,
        .canvas-wrap::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 10;
          pointer-events: none;
        }
        .canvas-wrap::before {
          top: 10px; left: 10px;
          border-top: 1px solid var(--brown-300);
          border-left: 1px solid var(--brown-300);
        }
        .canvas-wrap::after {
          bottom: 10px; right: 10px;
          border-bottom: 1px solid var(--brown-300);
          border-right: 1px solid var(--brown-300);
        }

        /* Hints bar */
        .hints-bar {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .hint-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.63rem;
          letter-spacing: 0.08em;
          color: var(--brown-300);
          text-transform: uppercase;
        }

        .hint-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--brown-300);
          opacity: 0.5;
        }

        /* Fade-in on load */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sidebar  { animation: fadeUp 0.5s ease both; }
        .viewer-panel { animation: fadeUp 0.5s 0.1s ease both; }

        /* ── Mobile: stack layout vertically ── */
        @media (max-width: 768px) {
          .nav {
            padding: 0 20px;
            height: 56px;
          }

          .nav-logo {
            font-size: 0.95rem;
          }

          .nav-back {
            font-size: 0.6rem;
            gap: 6px;
          }

          /* Switch from side-by-side grid to single column */
          .main {
            grid-template-columns: 1fr;
            padding-top: 56px;
          }

          /* Sidebar becomes a top info strip, not sticky */
          .sidebar {
            position: static;
            height: auto;
            border-right: none;
            border-bottom: 1px solid var(--brown-100);
            padding: 32px 24px;
            gap: 28px;
          }

          .sidebar-title {
            font-size: 1.8rem;
          }

          /* Meta items in a 2-col grid on mobile */
          .meta-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }

          .meta-item {
            flex-direction: column;
            gap: 2px;
            padding: 10px 8px;
            border-bottom: 1px solid var(--brown-100);
            border-right: 1px solid var(--brown-100);
          }

          .meta-item:nth-child(even) {
            border-right: none;
          }

          .back-link {
            margin-top: 8px;
            padding-top: 16px;
          }

          /* Viewer panel tighter on mobile */
          .viewer-panel {
            padding: 24px 16px;
            gap: 16px;
          }

          /* Canvas shorter on mobile */
          .canvas-wrap {
            min-height: 300px;
          }

          .hints-bar {
            gap: 12px;
            flex-wrap: wrap;
          }

          .hint-item {
            font-size: 0.58rem;
          }

          .toggle-btn {
            padding: 8px 14px;
            font-size: 0.62rem;
          }
        }

        /* ── Tablet tweaks ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .main {
            grid-template-columns: 240px 1fr;
          }

          .sidebar {
            padding: 40px 24px 40px 32px;
          }

          .viewer-panel {
            padding: 40px 36px;
          }

          .canvas-wrap {
            min-height: 420px;
          }
        }
      `}</style>

      <div className="page-wrap">
        {/* ── Nav ── */}
        <nav className="nav">
          <Link href="/projects" className="nav-back">
            <span className="nav-back-arrow">←</span>
            Back to Projects
          </Link>
          <Link href="/" className="nav-logo">SKS Groups</Link>
          <div />
        </nav>

        {/* ── Main grid ── */}
        <div className="main">

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <span className="sidebar-label">Portfolio — 01</span>
              <h1 className="sidebar-title">
                landscape <em>front pourch</em><br />renovation 
              </h1>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">Overview</span>
              <p className="sidebar-body">
                A landmark commercial development designed for enduring elegance. 
                Explore the structure in full three dimensions — rotate, zoom, 
                and examine every facade.
              </p>
            </div>

            <div className="sidebar-section">
              <span className="sidebar-label">Project Details</span>
              <div className="meta-row">
                {[
                  ["Type",     "Commercial"],
                  ["Year",     "2024"],
                  ["Status",   "Completed"],
                  ["Location", "Chennai, IN"],
                  ["Area",     "12,400 sq ft"],
                ].map(([k, v]) => (
                  <div key={k} className="meta-item">
                    <span className="meta-key">{k}</span>
                    <span className="meta-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

                
          </aside>

          {/* Viewer */}
          <section className="viewer-panel">
            <div className="viewer-header">
              <span className="viewer-eyebrow">Interactive 3D Model</span>

              <div className="toggle-group">
                <button
                  className={`toggle-btn ${view === "front" ? "active" : ""}`}
                  onClick={() => setView("front")}
                >
                  Seating Area
                </button>
                <button
                  className={`toggle-btn ${view === "back" ? "active" : ""}`}
                  onClick={() => setView("back")}
                >
                  Pergola View
                </button>
              </div>
            </div>

            <div className="canvas-wrap">
              <Canvas
                shadows
                camera={{ position: VIEWS.front.position, fov: 60, near: 0.1, far: 200 }}
                gl={{
                  antialias: true,
                  toneMapping: THREE.ACESFilmicToneMapping,
                  toneMappingExposure: 0.8,
                  outputColorSpace: THREE.SRGBColorSpace,
                }}
              >
                <Scene view={view} />
              </Canvas>
            </div>

            <div className="hints-bar">
              {[
                "Drag to rotate",
                "Scroll to zoom",
                "Middle-drag to pan",
                "Pinch to zoom on mobile",
              ].map((h, i) => (
                <span key={h} className="hint-item">
                  {i > 0 && <span className="hint-dot" />}
                  {h}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}