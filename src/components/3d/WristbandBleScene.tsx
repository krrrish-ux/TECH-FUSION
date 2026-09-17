import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSimulation } from '../../context/SimulationContext';

export const WristbandBleScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { lostPerson } = useSimulation();
  const stateRef = useRef({ lostPerson });

  useEffect(() => {
    stateRef.current = { lostPerson };
  }, [lostPerson]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 700;
    let height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcfcfd);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 7, 10);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);

    const grid = new THREE.GridHelper(16, 16, 0xe5e7eb, 0xf3f4f6);
    grid.position.y = -1.2;
    scene.add(grid);

    // 1. 3D Minimalist Wristband
    const wristbandGroup = new THREE.Group();
    wristbandGroup.position.set(0, 0.4, 0);

    // Band ring (Torus)
    const bandGeo = new THREE.TorusGeometry(1.4, 0.28, 20, 60);
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      roughness: 0.35,
      metalness: 0.2,
    });
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    bandMesh.rotation.x = Math.PI / 2;
    wristbandGroup.add(bandMesh);

    // Core sensor pill module
    const moduleGeo = new THREE.BoxGeometry(0.7, 0.35, 1.0);
    const moduleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.5,
    });
    const moduleMesh = new THREE.Mesh(moduleGeo, moduleMat);
    moduleMesh.position.set(0, 0.22, -1.35);
    wristbandGroup.add(moduleMesh);

    // LED Status Light
    const ledGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0, 0.4, -1.35);
    wristbandGroup.add(ledMesh);

    scene.add(wristbandGroup);

    // 2. Surrounding ESP32 Receiver Towers
    const receivers = [
      { id: 'ESP-R1', pos: new THREE.Vector3(-4.5, 0, -2.5), label: 'Node 07A' },
      { id: 'ESP-R2', pos: new THREE.Vector3(4.5, 0, -2.5), label: 'Node 07B' },
      { id: 'ESP-R3', pos: new THREE.Vector3(0, 0, 4.5), label: 'Node 07C' },
    ];

    const receiverMeshes: THREE.Group[] = [];
    const signalLines: THREE.Line[] = [];

    receivers.forEach((rec) => {
      const g = new THREE.Group();
      g.position.copy(rec.pos);

      // Stanchion
      const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 2.4, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 0;
      g.add(pole);

      // Antenna head
      const headGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const headMat = new THREE.MeshStandardMaterial({ color: 0x111827 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.3;
      g.add(head);

      const antPinGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 6);
      const antPinMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
      const antPin = new THREE.Mesh(antPinGeo, antPinMat);
      antPin.position.y = 1.7;
      g.add(antPin);

      scene.add(g);
      receiverMeshes.push(g);

      // Signal beam line from wristband to receiver
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0.6, 0),
        new THREE.Vector3(rec.pos.x, 1.3, rec.pos.z),
      ]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0xff6b00,
        dashSize: 0.3,
        gapSize: 0.15,
        transparent: true,
        opacity: 0.8,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      scene.add(line);
      signalLines.push(line);
    });

    // 3. Concentric BLE Signal Pulse Rings
    const ringCount = 3;
    const pulseRings: THREE.Mesh[] = [];
    for (let r = 0; r < ringCount; r++) {
      const pRingGeo = new THREE.RingGeometry(0.2, 0.28, 32);
      const pRingMat = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(pRingGeo, pRingMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 0.4;
      scene.add(ringMesh);
      pulseRings.push(ringMesh);
    }

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const currentPerson = stateRef.current.lostPerson;

      // Gentle wristband floating & rotation
      wristbandGroup.rotation.y = time * 0.4;
      wristbandGroup.position.y = 0.4 + Math.sin(time * 1.5) * 0.08;

      // Color coding LED and pulses according to status
      let ledColor = 0x10b981; // Green
      let waveColor = 0xff6b00; // Orange

      if (currentPerson.status === 'SOS_ACTIVE') {
        ledColor = 0xe11d48;
        waveColor = 0xe11d48;
      } else if (currentPerson.status === 'TAMPER_DETECTED' || currentPerson.status === 'LOST_SIGNAL') {
        ledColor = 0xd97706;
        waveColor = 0xd97706;
      } else if (currentPerson.status === 'SEARCHING') {
        ledColor = 0x3b82f6;
        waveColor = 0x3b82f6;
      }

      ledMat.color.setHex(ledColor);

      // Animate concentric BLE waves expanding outwards
      pulseRings.forEach((ring, index) => {
        const tOffset = index / ringCount;
        const speed = currentPerson.status === 'SOS_ACTIVE' ? 1.5 : 0.8;
        const progress = ((time * speed) + tOffset) % 1;

        if (currentPerson.status === 'LOST_SIGNAL') {
          ring.visible = false;
        } else {
          ring.visible = true;
          const currentRadius = 0.4 + progress * 5.0;
          ring.scale.set(currentRadius, currentRadius, currentRadius);
          (ring.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.7;
          (ring.material as THREE.MeshBasicMaterial).color.setHex(waveColor);
        }
      });

      // Signal lines toggle
      signalLines.forEach((sLine) => {
        if (currentPerson.status === 'LOST_SIGNAL') {
          sLine.visible = false;
        } else {
          sLine.visible = true;
          (sLine.material as THREE.LineDashedMaterial).color.setHex(waveColor);
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
              lostPerson.status === 'SOS_ACTIVE'
                ? 'bg-rose-500 animate-ping'
                : lostPerson.status === 'LOST_SIGNAL'
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          />
          <span className="font-mono text-[11px] font-semibold text-gray-800">
            3D BLE SAFETY-BAND & RECEIVER MESH
          </span>
        </div>
        <div className="font-mono text-[10px] text-gray-400 pl-1">
          FREQUENCY: 2.4 GHZ BLE CHIRP • RANGE: ~15-25M PER NODE
        </div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none">
        <span
          className={`px-2 py-1 rounded font-mono text-[10px] font-semibold tracking-wider ${
            lostPerson.status === 'SOS_ACTIVE'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : lostPerson.status === 'LOST_SIGNAL'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}
        >
          {lostPerson.status}
        </span>
      </div>

      {/* Receiver node telemetry footer */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm text-xs font-mono">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-gray-400 text-[10px]">DEVICE ID:</span>{' '}
            <span className="font-bold text-gray-900">{lostPerson.personId}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[10px]">SIGNAL RSSI:</span>{' '}
            <span className="font-bold text-orange-600">
              {lostPerson.status === 'LOST_SIGNAL' ? 'DISCONNECTED' : `${lostPerson.rssi} dBm`}
            </span>
          </div>
          <div>
            <span className="text-gray-400 text-[10px]">ZONE:</span>{' '}
            <span className="font-bold text-gray-800">{lostPerson.lastDetectedZone}</span>
          </div>
        </div>

        <div className="text-[11px] text-gray-500">
          A lost signal is not a conclusion — it is a signal to verify.
        </div>
      </div>
    </div>
  );
};
