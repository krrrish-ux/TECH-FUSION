import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSimulation } from '../../context/SimulationContext';

export const Esp32NodeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isNode07Failed, triggerSensorFailure, restoreSensorNode07 } = useSimulation();
  const stateRef = useRef({ isNode07Failed });

  useEffect(() => {
    stateRef.current = { isNode07Failed };
  }, [isNode07Failed]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 700;
    let height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(6, 14, 8);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(16, 16, 0xe5e7eb, 0xf3f4f6);
    grid.position.y = -1.5;
    scene.add(grid);

    // 1. Central ESP32 Board representation (Minimalist PCB)
    const espGroup = new THREE.Group();

    // PCB board substrate
    const pcbGeo = new THREE.BoxGeometry(3.0, 0.15, 2.0);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Matte dark graphite
      roughness: 0.3,
      metalness: 0.4,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    espGroup.add(pcbMesh);

    // Metal RF Shield can (ESP-WROOM-32 module)
    const canGeo = new THREE.BoxGeometry(1.4, 0.22, 1.3);
    const canMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.2,
      metalness: 0.8,
    });
    const canMesh = new THREE.Mesh(canGeo, canMat);
    canMesh.position.set(-0.6, 0.16, 0);
    espGroup.add(canMesh);

    // PCB Trace Antenna (Meander track)
    const antGeo = new THREE.BoxGeometry(0.5, 0.04, 1.6);
    const antMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });
    const antMesh = new THREE.Mesh(antGeo, antMat);
    antMesh.position.set(1.1, 0.1, 0);
    espGroup.add(antMesh);

    // Power & Status LEDs
    const pwrLedGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const pwrLedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const pwrLed = new THREE.Mesh(pwrLedGeo, pwrLedMat);
    pwrLed.position.set(-1.2, 0.12, 0.7);
    espGroup.add(pwrLed);

    const statLedGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const statLedMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const statLed = new THREE.Mesh(statLedGeo, statLedMat);
    statLed.position.set(-1.2, 0.12, 0.4);
    espGroup.add(statLed);

    scene.add(espGroup);

    // 2. Peripheral daughterboard sensors connected to ESP32
    const daughterSensors = [
      { id: 'IR', name: 'IR / ToF', pos: new THREE.Vector3(-4.5, 0, -2.5), color: 0xe11d48 },
      { id: 'BME', name: 'BME280', pos: new THREE.Vector3(4.5, 0, -2.5), color: 0x059669 },
      { id: 'BLE', name: 'BLE ANT', pos: new THREE.Vector3(-4.5, 0, 2.5), color: 0x9333ea },
      { id: 'ACO', name: 'ACOUSTIC', pos: new THREE.Vector3(4.5, 0, 2.5), color: 0xd97706 },
    ];

    const sensorPackets: THREE.Mesh[] = [];
    const busLines: THREE.Line[] = [];

    daughterSensors.forEach((sensor) => {
      // Sensor pod
      const podGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
      const podMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.3,
      });
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.position.copy(sensor.pos);
      scene.add(pod);

      const podPin = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshBasicMaterial({ color: sensor.color })
      );
      podPin.position.set(sensor.pos.x, sensor.pos.y + 0.2, sensor.pos.z);
      scene.add(podPin);

      // Bus line to ESP32
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        sensor.pos,
        new THREE.Vector3(sensor.pos.x * 0.3, 0.1, sensor.pos.z * 0.3),
        new THREE.Vector3(0, 0.1, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x9ca3af,
        transparent: true,
        opacity: 0.6,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      busLines.push(line);

      // Data packet
      const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff6b00 })
      );
      scene.add(packet);
      sensorPackets.push(packet);
    });

    // 3. Uplink Stream: ESP32 -> Wi-Fi/LoRa Gateway -> AI Kumbh
    const uplinkTarget = new THREE.Vector3(0, 4.2, 0);
    const uplinkLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(0, 2.1, 0),
      uplinkTarget,
    ]);
    const uplinkLineMat = new THREE.LineDashedMaterial({
      color: 0xff6b00,
      dashSize: 0.3,
      gapSize: 0.15,
      transparent: true,
      opacity: 0.9,
    });
    const uplinkLine = new THREE.Line(uplinkLineGeo, uplinkLineMat);
    uplinkLine.computeLineDistances();
    scene.add(uplinkLine);

    // Gateway icon above
    const gwGeo = new THREE.OctahedronGeometry(0.35, 0);
    const gwMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.6 });
    const gwMesh = new THREE.Mesh(gwGeo, gwMat);
    gwMesh.position.copy(uplinkTarget);
    scene.add(gwMesh);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const isFailed = stateRef.current.isNode07Failed;

      espGroup.rotation.y = time * 0.15;
      gwMesh.rotation.y = time * 0.8;

      if (isFailed) {
        // Node 07 Failed - Red blink, cut uplink
        statLedMat.color.setHex(0xe11d48);
        uplinkLine.visible = false;
        gwMesh.visible = false;
      } else {
        // Normal operation - Green blink, active pulse packets
        statLedMat.color.setHex(Math.sin(time * 6) > 0 ? 0x10b981 : 0x065f46);
        uplinkLine.visible = true;
        gwMesh.visible = true;
      }

      // Animate packet travel into ESP32
      daughterSensors.forEach((sensor, i) => {
        const packet = sensorPackets[i];
        if (isFailed) {
          packet.visible = false;
        } else {
          packet.visible = true;
          const t = (time * 0.6 + i * 0.25) % 1;
          const pos = new THREE.Vector3().lerpVectors(sensor.pos, new THREE.Vector3(0, 0.1, 0), t);
          packet.position.copy(pos);
        }
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

  return (
    <div className="relative w-full h-[440px] rounded-2xl overflow-hidden border border-gray-200 bg-[#FCFCFD] shadow-xs select-none">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xs">
          <span
            className={`w-2 h-2 rounded-full ${
              isNode07Failed ? 'bg-rose-600' : 'bg-emerald-500 animate-ping'
            }`}
          />
          <span className="font-mono text-[11px] font-semibold text-gray-800">
            ESP32 DISTRIBUTED EDGE NODE 07
          </span>
        </div>
        <div className="font-mono text-[10px] text-gray-400 pl-1">
          BUS PROTOCOLS: I2C • SPI • UART • LORAWAN / WI-FI MESH
        </div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none">
        <span
          className={`px-2 py-1 rounded font-mono text-[10px] font-semibold ${
            isNode07Failed
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {isNode07Failed ? 'STATUS: OFFLINE (FAILOVER)' : 'STATUS: ONLINE (99.98%)'}
        </span>
      </div>

      {/* Interactive Controls & Resiliency Demo */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm pointer-events-auto">
        <div className="text-xs font-mono">
          <div className="font-bold text-gray-900">
            {isNode07Failed ? 'DATA REDUNDANCY ACTIVE' : 'INTEGRATED MULTI-SENSOR BUS'}
          </div>
          <div className="text-gray-500 text-[11px]">
            {isNode07Failed
              ? 'Mesh routing reroutes IR, BME280 & BLE through Node 06 and Node 08.'
              : 'IR/ToF + BME280 + BLE + Acoustic aggregated every 2000ms.'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isNode07Failed ? (
            <button
              onClick={restoreSensorNode07}
              className="py-1.5 px-3 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold hover:bg-gray-800 transition-colors shadow-xs"
            >
              RESTORE NODE 07
            </button>
          ) : (
            <button
              onClick={triggerSensorFailure}
              className="py-1.5 px-3 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-semibold hover:bg-rose-100 transition-colors"
            >
              SIMULATE SENSOR FAILURE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
