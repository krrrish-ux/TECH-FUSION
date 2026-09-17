import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SensorStream {
  id: string;
  name: string;
  type: string;
  angle: number;
  radius: number;
  color: number;
  rate: string;
  summary: string;
}

export const SensorFusionScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredStream, setHoveredStream] = useState<string | null>(null);
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    hoveredRef.current = hoveredStream;
  }, [hoveredStream]);

  const streams: SensorStream[] = [
    { id: 'CAM', name: 'CAMERA (CV)', type: 'Computer Vision', angle: 0, radius: 8, color: 0x2563eb, rate: '1,842 p/min', summary: 'Spatial density bounding boxes & optical velocity' },
    { id: 'IR', name: 'IR / ToF', type: 'Beam-Break Array', angle: Math.PI / 3, radius: 8, color: 0xe11d48, rate: '+380 net/hr', summary: 'Directional ingress/egress checkpoint tallies' },
    { id: 'BLE', name: 'BLE RECEIVERS', type: 'RF Beacons', angle: (2 * Math.PI) / 3, radius: 8, color: 0x9333ea, rate: '312 tags', summary: 'Safety wristband RSSI proximity & zone dwell' },
    { id: 'BME', name: 'BME280 SENSORS', type: 'Micro-Climate', angle: Math.PI, radius: 8, color: 0x059669, rate: '32.4°C / 61%', summary: 'Thermal stress & atmospheric barometric shift' },
    { id: 'ACO', name: 'ACOUSTIC', type: 'Sound Level', angle: (4 * Math.PI) / 3, radius: 8, color: 0xd97706, rate: '78 dB', summary: 'Ambient decibel surges & vocal frequency energy' },
    { id: 'ESP', name: 'ESP32 NODES', type: 'Edge Gateways', angle: (5 * Math.PI) / 3, radius: 8, color: 0x4b5563, rate: '24 nodes', summary: 'Distributed mesh packet aggregator & edge filter' },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 700;
    let height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 15, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const coreLight = new THREE.PointLight(0xff6b00, 3, 20);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Tech Grid Base
    const grid = new THREE.GridHelper(24, 24, 0xe5e7eb, 0xf3f4f6);
    grid.position.y = -2;
    scene.add(grid);

    // 1. Central 3D AI Fusion Core
    const coreGroup = new THREE.Group();
    // Inner glowing icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Outer wireframe shell
    const outerGeo = new THREE.IcosahedronGeometry(2.5, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerWireMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerWireMesh);

    // Concentric orbiting rings
    const ringGeo = new THREE.TorusGeometry(3.2, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd1d5db, transparent: true, opacity: 0.6 });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 4;
    coreGroup.add(ringMesh2);

    scene.add(coreGroup);

    // 2. Peripheral Sensor Satellites & Spline Flow Lines
    const streamGroups: Map<string, { group: THREE.Group; line: THREE.Line; packets: THREE.Mesh[] }> = new Map();

    streams.forEach((st) => {
      const posX = Math.cos(st.angle) * st.radius;
      const posZ = Math.sin(st.angle) * st.radius;
      const posY = 0;

      const satGroup = new THREE.Group();
      satGroup.position.set(posX, posY, posZ);

      // Node marker
      const satGeo = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const satMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.4,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satGroup.add(satMesh);

      // Node border
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(satGeo),
        new THREE.LineBasicMaterial({ color: 0x9ca3af })
      );
      satMesh.add(edge);

      scene.add(satGroup);

      // Spline curve to AI Core
      const pStart = new THREE.Vector3(posX, posY, posZ);
      const pMid = new THREE.Vector3(posX * 0.5, 1.2, posZ * 0.5);
      const pEnd = new THREE.Vector3(0, 0, 0);
      const curve = new THREE.QuadraticBezierCurve3(pStart, pMid, pEnd);

      const curvePoints = curve.getPoints(30);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xe5e7eb,
        transparent: true,
        opacity: 0.5,
      });
      const streamLine = new THREE.Line(lineGeo, lineMat);
      scene.add(streamLine);

      // Animated traveling data packets
      const packetCount = 4;
      const packets: THREE.Mesh[] = [];
      const packetGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });

      for (let p = 0; p < packetCount; p++) {
        const pMesh = new THREE.Mesh(packetGeo, packetMat);
        scene.add(pMesh);
        packets.push(pMesh);
      }

      streamGroups.set(st.id, { group: satGroup, line: streamLine, packets });
    });

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const hovered = hoveredRef.current;

      // Core rotation & gentle breathing pulse
      coreGroup.rotation.y = time * 0.3;
      coreGroup.rotation.x = Math.sin(time * 0.5) * 0.1;

      const scalePulse = 1.0 + Math.sin(time * 3) * 0.05;
      coreMesh.scale.set(scalePulse, scalePulse, scalePulse);

      outerWireMesh.rotation.y = -time * 0.4;
      outerWireMesh.rotation.z = time * 0.2;

      ringMesh1.rotation.z = time * 0.25;
      ringMesh2.rotation.x = time * 0.2;

      // Animate packet travel
      streams.forEach((st, idx) => {
        const item = streamGroups.get(st.id);
        if (!item) return;

        const isHovered = hovered === st.id;
        const lineMat = item.line.material as THREE.LineBasicMaterial;

        if (isHovered) {
          lineMat.color.setHex(0xff6b00);
          lineMat.opacity = 1.0;
        } else {
          lineMat.color.setHex(hovered ? 0xf3f4f6 : 0xd1d5db);
          lineMat.opacity = hovered ? 0.2 : 0.6;
        }

        // Move packets along curve
        const posX = Math.cos(st.angle) * st.radius;
        const posZ = Math.sin(st.angle) * st.radius;
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(posX, 0, posZ),
          new THREE.Vector3(posX * 0.5, 1.2, posZ * 0.5),
          new THREE.Vector3(0, 0, 0)
        );

        item.packets.forEach((pMesh, pIdx) => {
          const tOffset = (pIdx / item.packets.length);
          const t = ((time * (isHovered ? 0.8 : 0.4)) + tOffset + idx * 0.1) % 1;
          const pt = curve.getPoint(t);
          pMesh.position.copy(pt);
          pMesh.visible = isHovered || !hovered;
          (pMesh.material as THREE.MeshBasicMaterial).color.setHex(isHovered ? 0xea580c : 0xff6b00);
        });
      });

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

  const activeStreamInfo = streams.find((s) => s.id === hoveredStream);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-gray-200 bg-[#FCFCFD] shadow-xs select-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
          <span className="font-mono text-[11px] font-semibold text-gray-800">
            3D SENSOR FUSION AI ENGINE
          </span>
        </div>
        <div className="font-mono text-[10px] text-gray-400 pl-1">
          CONVERGING 6 HETEROGENEOUS SIGNALS INTO ONE ESTIMATE
        </div>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-none">
        <span className="px-2 py-1 rounded bg-gray-50 border border-gray-200 text-gray-700 font-mono text-[10px]">
          FUSION PIPELINE: ACTIVE
        </span>
      </div>

      {/* Stream Selector Buttons / Badges */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 items-center justify-between pointer-events-auto">
        <div className="flex flex-wrap gap-1.5">
          {streams.map((st) => (
            <button
              key={st.id}
              onMouseEnter={() => setHoveredStream(st.id)}
              onMouseLeave={() => setHoveredStream(null)}
              onClick={() => setHoveredStream(hoveredStream === st.id ? null : st.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                hoveredStream === st.id
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white/90 text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>

        {activeStreamInfo && (
          <div className="w-full md:w-auto p-2.5 px-3 rounded-lg bg-white/95 backdrop-blur-md border border-gray-200 shadow-xs text-xs font-mono">
            <span className="font-bold text-gray-900">{activeStreamInfo.name}: </span>
            <span className="text-gray-600">{activeStreamInfo.summary}</span>
            <span className="ml-2 font-bold text-orange-600">({activeStreamInfo.rate})</span>
          </div>
        )}
      </div>
    </div>
  );
};
