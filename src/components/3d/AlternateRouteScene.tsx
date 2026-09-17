import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSimulation } from '../../context/SimulationContext';

export const AlternateRouteScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isAlternateRouteActive, toggleAlternateRouting } = useSimulation();
  const routeStateRef = useRef({ isAlternateRouteActive });

  useEffect(() => {
    routeStateRef.current = { isAlternateRouteActive };
  }, [isAlternateRouteActive]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 700;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);
    scene.fog = new THREE.FogExp2(0xfcfcfd, 0.025);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 18, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    // Floor grid
    const grid = new THREE.GridHelper(26, 26, 0xe5e7eb, 0xf3f4f6);
    grid.position.y = 0.01;
    scene.add(grid);

    // Route Waypoints
    // Sector 12 origin
    const startPoint = new THREE.Vector3(-8, 0.3, 0);

    // Main Route: Sector 12 -> Main Gate (Direct central arterial path)
    const mainPathPoints = [
      startPoint,
      new THREE.Vector3(-4, 0.3, 0),
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(4, 0.3, 0),
      new THREE.Vector3(8, 0.3, 0), // Main Gate
    ];
    const mainCurve = new THREE.CatmullRomCurve3(mainPathPoints);

    // Alternate Route: Sector 12 -> Route B bypass -> Gate C
    const altPathPoints = [
      startPoint,
      new THREE.Vector3(-4, 0.3, 0),
      new THREE.Vector3(-1, 0.3, 5),
      new THREE.Vector3(4, 0.3, 5),
      new THREE.Vector3(8, 0.3, 4), // Gate C
    ];
    const altCurve = new THREE.CatmullRomCurve3(altPathPoints);

    // Draw Route Ribbons / Lines
    const mainLineGeo = new THREE.BufferGeometry().setFromPoints(mainCurve.getPoints(50));
    const mainLineMat = new THREE.LineBasicMaterial({ color: 0x1f2937, linewidth: 2 });
    const mainLine = new THREE.Line(mainLineGeo, mainLineMat);
    scene.add(mainLine);

    const altLineGeo = new THREE.BufferGeometry().setFromPoints(altCurve.getPoints(50));
    const altLineMat = new THREE.LineBasicMaterial({
      color: 0xff6b00,
      linewidth: 2,
      transparent: true,
      opacity: 0.5,
    });
    const altLine = new THREE.Line(altLineGeo, altLineMat);
    scene.add(altLine);

    // Portal Gates representation
    const createPortal = (pos: THREE.Vector3, name: string, isAlt: boolean = false) => {
      const g = new THREE.Group();
      g.position.copy(pos);

      // Gate pillars
      const p1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 2, 0.3),
        new THREE.MeshStandardMaterial({ color: isAlt ? 0xea580c : 0x111827 })
      );
      p1.position.set(-0.8, 1, 0);
      g.add(p1);

      const p2 = p1.clone();
      p2.position.set(0.8, 1, 0);
      g.add(p2);

      const lintel = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.3, 0.4),
        new THREE.MeshStandardMaterial({ color: isAlt ? 0xea580c : 0x111827 })
      );
      lintel.position.set(0, 2.1, 0);
      g.add(lintel);

      scene.add(g);
    };

    createPortal(startPoint, 'Sector 12 Staging');
    createPortal(new THREE.Vector3(8, 0, 0), 'Main Gate');
    createPortal(new THREE.Vector3(8, 0, 4), 'Gate C', true);

    // Instanced crowd particles
    const particleCount = 300;
    const particleGeo = new THREE.BoxGeometry(0.12, 0.22, 0.12);
    const particleMat = new THREE.MeshStandardMaterial({ color: 0x374151 });
    const instancedMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    scene.add(instancedMesh);

    // Particle tracking
    interface ParticleState {
      t: number;
      speed: number;
      route: 'MAIN' | 'ALT';
      lateralOffset: number;
    }

    const particles: ParticleState[] = Array.from({ length: particleCount }, () => ({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.003,
      route: 'MAIN',
      lateralOffset: (Math.random() - 0.5) * 0.5,
    }));

    const dummy = new THREE.Object3D();

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const isAltActive = routeStateRef.current.isAlternateRouteActive;

      // Pulse alternate route line opacity
      if (isAltActive) {
        altLineMat.opacity = 0.8 + Math.sin(time * 5) * 0.2;
      } else {
        altLineMat.opacity = 0.25;
      }

      particles.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          // Decide route assignment at origin:
          // If alternate route is active: 30% take ALT, 70% take MAIN
          // If inactive: 100% take MAIN
          if (isAltActive) {
            p.route = Math.random() < 0.3 ? 'ALT' : 'MAIN';
          } else {
            p.route = 'MAIN';
          }
        }

        const curve = p.route === 'ALT' ? altCurve : mainCurve;
        const pos = curve.getPoint(p.t);
        const tangent = curve.getTangent(p.t);

        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        pos.addScaledVector(normal, p.lateralOffset);

        dummy.position.copy(pos);
        dummy.position.y += 0.12;
        dummy.lookAt(pos.clone().add(tangent));
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });

      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-gray-200 bg-[#FCFCFD] shadow-xs select-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xs">
          <span className="font-mono text-[11px] font-semibold text-gray-800">
            3D FLOW DIVERSION SIMULATION
          </span>
        </div>
        <div className="font-mono text-[10px] text-gray-400 pl-1">
          PHYSICAL SPLIT: 70% MAIN / 30% BYPASS
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
        <span className="px-2 py-1 rounded bg-orange-50 border border-orange-200 text-orange-700 font-mono text-[10px] font-semibold">
          SIMULATED ROUTING
        </span>
      </div>

      {/* Live Route Flow Split Controls */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-96 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="text-xs font-bold text-gray-900">FLOW SPLIT REGULATION</div>
          <span
            className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
              isAlternateRouteActive
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isAlternateRouteActive ? 'DIVERTING 30%' : '100% MAIN ARTERY'}
          </span>
        </div>

        <div className="space-y-2 py-2 text-xs">
          <div>
            <div className="flex justify-between font-mono text-[11px] text-gray-600">
              <span>Main Route (Sector 12 → Main Gate):</span>
              <span className="font-bold text-gray-900">
                {isAlternateRouteActive ? '70%' : '100%'}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-gray-800 rounded-full transition-all duration-700"
                style={{ width: isAlternateRouteActive ? '70%' : '100%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono text-[11px] text-gray-600">
              <span>Alternate Route B (Sector 12 → Gate C):</span>
              <span className="font-bold text-orange-600">
                {isAlternateRouteActive ? '30%' : '0%'}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-700"
                style={{ width: isAlternateRouteActive ? '30%' : '0%' }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={toggleAlternateRouting}
          className={`w-full mt-2 py-2 px-3 rounded-lg font-mono text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 ${
            isAlternateRouteActive
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {isAlternateRouteActive
            ? 'DEACTIVATE ALTERNATE ROUTING'
            : 'ACTIVATE ALTERNATE ROUTING (DIVERT 30%)'}
        </button>
      </div>
    </div>
  );
};
