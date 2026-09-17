import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroKumbhScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 550;

    // 1. Scene setup with Minimal White Studio Aesthetic
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);
    scene.fog = new THREE.FogExp2(0xfcfcfd, 0.022);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(16, 14, 18);
    camera.lookAt(0, 1, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 4. Studio Soft Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(20, 30, 15);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 5;
    mainLight.shadow.camera.far = 60;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);

    // Subtle orange point fill
    const orangeAccentLight = new THREE.PointLight(0xff6b00, 2.0, 30);
    orangeAccentLight.position.set(0, 4, 0);
    scene.add(orangeAccentLight);

    // 5. Materials
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      roughness: 0.85,
      metalness: 0.05,
    });

    const riverMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8eef5,
      roughness: 0.15,
      metalness: 0.2,
    });

    const sectorMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      metalness: 0.1,
    });

    const sectorLineMaterial = new THREE.LineBasicMaterial({
      color: 0xd1d5db,
      transparent: true,
      opacity: 0.6,
    });

    // 6. Terrain & River
    const terrainGeo = new THREE.PlaneGeometry(36, 36, 24, 24);
    const terrainMesh = new THREE.Mesh(terrainGeo, groundMaterial);
    terrainMesh.rotation.x = -Math.PI / 2;
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // River curve representing Triveni Sangam channel
    const riverGeo = new THREE.PlaneGeometry(36, 7, 12, 12);
    const riverMesh = new THREE.Mesh(riverGeo, riverMaterial);
    riverMesh.rotation.x = -Math.PI / 2;
    riverMesh.position.set(0, 0.02, -7);
    riverMesh.rotation.z = 0.15;
    scene.add(riverMesh);

    // Grid lines for high-tech architectural feel
    const gridHelper = new THREE.GridHelper(36, 36, 0xe5e7eb, 0xf3f4f6);
    gridHelper.position.y = 0.03;
    scene.add(gridHelper);

    // 7. Sectors (Clean geometric raised plinths)
    const sectorCoords = [
      { x: -6, z: 4, label: 'Sector 01', w: 4, d: 4, h: 0.4 },
      { x: -1, z: 5, label: 'Sector 02', w: 4, d: 4, h: 0.5 },
      { x: 5, z: 4, label: 'Sector 03', w: 4, d: 4, h: 0.6 },
      { x: -6, z: -1, label: 'Sector 04', w: 4, d: 3.5, h: 0.7 },
      { x: 5, z: -1, label: 'Sector 12 (Critical)', w: 4.5, d: 4, h: 1.2, isHot: true },
      { x: -2, z: -1, label: 'Central Ghat Plaza', w: 3, d: 3, h: 0.3 },
    ];

    const sectorGroup = new THREE.Group();
    sectorCoords.forEach((sec) => {
      const boxGeo = new THREE.BoxGeometry(sec.w, sec.h, sec.d);
      const mat = sec.isHot
        ? new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            metalness: 0.1,
          })
        : sectorMaterial;

      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.position.set(sec.x, sec.h / 2 + 0.05, sec.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      sectorGroup.add(mesh);

      // Edges helper
      const edges = new THREE.EdgesGeometry(boxGeo);
      const line = new THREE.LineSegments(
        edges,
        sec.isHot ? new THREE.LineBasicMaterial({ color: 0xff6b00, linewidth: 1.5 }) : sectorLineMaterial
      );
      mesh.add(line);

      // Add a subtle beacon light if hot
      if (sec.isHot) {
        const beaconGeo = new THREE.CylinderGeometry(0.04, 0.04, 2, 8);
        const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.8 });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(0, sec.h / 2 + 1, 0);
        mesh.add(beacon);
      }
    });
    scene.add(sectorGroup);

    // 8. Command Center Spire (Minimalist White Monolith)
    const towerGeo = new THREE.BoxGeometry(1.2, 4.5, 1.2);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.3,
      metalness: 0.7,
    });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(0, 2.25, 0);
    tower.castShadow = true;
    scene.add(tower);

    // Spire beacon on top
    const spireTopGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const spireTopMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
    const spireTop = new THREE.Mesh(spireTopGeo, spireTopMat);
    spireTop.position.set(0, 4.7, 0);
    scene.add(spireTop);

    // 9. Floating Sensor Nodes & Orange Data Flow Splines
    const sensorNodePositions = [
      new THREE.Vector3(-6, 2.5, 4),
      new THREE.Vector3(5, 2.8, 4),
      new THREE.Vector3(-6, 2.6, -1),
      new THREE.Vector3(5, 3.2, -1),
      new THREE.Vector3(-1, 2.2, 5),
      new THREE.Vector3(0, 2.0, -5),
    ];

    const sensorNodesGroup = new THREE.Group();
    const sensorSpheres: THREE.Mesh[] = [];

    sensorNodePositions.forEach((pos) => {
      // Stanchion
      const poleGeo = new THREE.CylinderGeometry(0.03, 0.03, pos.y, 8);
      const poleMat = new THREE.MeshBasicMaterial({ color: 0xd1d5db });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(pos.x, pos.y / 2, pos.z);
      sensorNodesGroup.add(pole);

      // Node head
      const nodeGeo = new THREE.OctahedronGeometry(0.24, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.4,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      sensorSpheres.push(node);
      sensorNodesGroup.add(node);

      // Data connection line to central spire
      const points = [
        pos,
        new THREE.Vector3(pos.x * 0.5, pos.y + 0.5, pos.z * 0.5),
        new THREE.Vector3(0, 4.5, 0),
      ];
      const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xff6b00,
        transparent: true,
        opacity: 0.45,
      });
      const dataLine = new THREE.Line(lineGeo, lineMat);
      sensorNodesGroup.add(dataLine);
    });
    scene.add(sensorNodesGroup);

    // 10. Crowd Flow Particles (Instanced Mesh for high 60fps performance)
    const particleCount = 450;
    const particleGeo = new THREE.BoxGeometry(0.09, 0.18, 0.09);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0x4b5563,
      roughness: 0.5,
    });
    const instancedParticles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    instancedParticles.castShadow = true;

    // Defined paths representing pilgrim routes from Gates to Sangam
    const routes = [
      // Route 1: Sector 01 to Sangam Central
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, 0.2, 8),
        new THREE.Vector3(-6, 0.3, 4),
        new THREE.Vector3(-2, 0.3, 2),
        new THREE.Vector3(0, 0.3, -4),
      ]),
      // Route 2: Sector 03 to Sector 12 Ghats
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(10, 0.2, 8),
        new THREE.Vector3(5, 0.3, 4),
        new THREE.Vector3(5, 0.8, -1),
        new THREE.Vector3(3, 0.3, -5),
      ]),
      // Route 3: Cross Concourse
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-8, 0.2, 0),
        new THREE.Vector3(-3, 0.3, 0),
        new THREE.Vector3(0, 0.3, 1),
        new THREE.Vector3(5, 0.4, 1),
      ]),
    ];

    const particleStates = Array.from({ length: particleCount }, () => ({
      routeIdx: Math.floor(Math.random() * routes.length),
      t: Math.random(),
      speed: 0.0008 + Math.random() * 0.0012,
      lateralOffset: (Math.random() - 0.5) * 0.7,
    }));

    const dummy = new THREE.Object3D();
    scene.add(instancedParticles);

    // 11. Interactive Camera Orbit controls (Clean mouse/touch drag)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0.5;
    let targetRotationX = 0.38;
    let currentRotationY = 0.5;
    let currentRotationX = 0.38;
    let radius = 26;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      targetRotationY += deltaX * 0.006;
      targetRotationX = Math.max(0.12, Math.min(1.1, targetRotationX + deltaY * 0.005));

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      radius = Math.max(16, Math.min(38, radius + e.deltaY * 0.02));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // 12. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto rotation when idle
      if (!isDragging) {
        targetRotationY += 0.001;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;

      camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
      camera.position.y = radius * Math.sin(currentRotationX);
      camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
      camera.lookAt(0, 1.2, 0);

      // Rotate sensor node octahedrons & subtle pulse
      sensorSpheres.forEach((sphere, i) => {
        sphere.rotation.y = elapsedTime * 0.8 + i;
        sphere.position.y = sensorNodePositions[i].y + Math.sin(elapsedTime * 2 + i) * 0.08;
      });

      // Subtle light pulse
      orangeAccentLight.intensity = 1.8 + Math.sin(elapsedTime * 3) * 0.6;

      // Update crowd particles
      particleStates.forEach((p, i) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;

        const route = routes[p.routeIdx];
        const pos = route.getPoint(p.t);
        const tangent = route.getTangent(p.t);

        // Calculate lateral offset perpendicular to tangent in XZ plane
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        pos.addScaledVector(normal, p.lateralOffset);

        dummy.position.copy(pos);
        dummy.position.y += 0.09; // elevate slightly above terrain
        dummy.lookAt(pos.clone().add(tangent));
        dummy.updateMatrix();
        instancedParticles.setMatrixAt(i, dummy.matrix);
      });
      instancedParticles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Responsive Resize handling
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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-2xl overflow-hidden border border-gray-200 bg-[#FCFCFD] shadow-xs select-none">
      {!webGlSupported ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-50">
          <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-3">
            <span className="text-orange-600 font-mono text-xs">3D</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">WebGL Acceleration Unavailable</p>
          <p className="text-xs text-gray-500 max-w-sm mt-1">
            Rendering interactive architectural map in standard precision 2D view.
          </p>
        </div>
      ) : (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      )}

      {/* 3D Scene HUD Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] font-medium text-gray-700 tracking-wider">
            3D SPATIAL TERRAIN ENGINE
          </span>
        </div>
        <div className="font-mono text-[10px] text-gray-400 pl-1">
          ORBIT: DRAG • ZOOM: SCROLL • TILT: VERTICAL
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
        <div className="px-2 py-1 rounded bg-orange-50/90 border border-orange-200/70 text-orange-700 font-mono text-[10px] font-medium tracking-wide">
          SIMULATION / DEMO DATA
        </div>
      </div>

      {/* Floating telemetry legend */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-sm pointer-events-auto">
        <div className="flex items-center justify-between text-xs pb-1.5 border-b border-gray-100">
          <span className="font-semibold text-gray-900">SIMULATED ENVIRONMENT</span>
          <span className="font-mono text-[11px] text-orange-600 font-medium">KUMBH SECTORS 01–12</span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
          <div>
            <div className="text-[10px] text-gray-400 font-mono">FLOW RATE</div>
            <div className="font-mono text-xs font-semibold text-gray-800">450 p/min</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-mono">TOP ELEVATION</div>
            <div className="font-mono text-xs font-semibold text-orange-600">Sector 12 (High)</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-mono">ACTIVE BEACONS</div>
            <div className="font-mono text-xs font-semibold text-gray-800">06 Nodes</div>
          </div>
        </div>
      </div>
    </div>
  );
};
