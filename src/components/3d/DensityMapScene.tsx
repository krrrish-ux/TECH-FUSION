import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSimulation } from '../../context/SimulationContext';
import { SectorId } from '../../types';

export const DensityMapScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const {
    sectors,
    selectedSectorId,
    setSelectedSectorId,
    isEmergencyActive,
    isAlternateRouteActive,
  } = useSimulation();

  const sceneStateRef = useRef({
    selectedSectorId,
    isEmergencyActive,
    isAlternateRouteActive,
    sectors,
  });

  useEffect(() => {
    sceneStateRef.current = {
      selectedSectorId,
      isEmergencyActive,
      isAlternateRouteActive,
      sectors,
    };
  }, [selectedSectorId, isEmergencyActive, isAlternateRouteActive, sectors]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 700;
    let height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfbfbfc);
    scene.fog = new THREE.FogExp2(0xfbfbfc, 0.025);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(12, 16, 16);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
    dirLight.position.set(15, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Ground grid
    const grid = new THREE.GridHelper(28, 28, 0xe5e7eb, 0xf3f4f6);
    grid.position.y = 0.02;
    scene.add(grid);

    // Sector blocks mapped to coordinates
    const sectorConfig: Array<{
      id: SectorId;
      label: string;
      baseX: number;
      baseZ: number;
      sizeX: number;
      sizeZ: number;
    }> = [
      { id: 'SECTOR_12', label: 'Sector 12', baseX: 4.5, baseZ: -2.5, sizeX: 4.5, sizeZ: 4.5 },
      { id: 'SECTOR_07', label: 'Sector 07', baseX: -4.5, baseZ: 3.5, sizeX: 4.2, sizeZ: 4.0 },
      { id: 'SECTOR_04', label: 'Sector 04', baseX: -4.0, baseZ: -3.5, sizeX: 4.0, sizeZ: 4.0 },
      { id: 'SECTOR_01', label: 'Sector 01', baseX: 4.0, baseZ: 4.0, sizeX: 4.2, sizeZ: 4.2 },
    ];

    // Create 3D sector pillars with height representing density
    const sectorMeshes: Map<SectorId, { mesh: THREE.Mesh; edges: THREE.LineSegments; beacon?: THREE.Group }> = new Map();
    const raycastableMeshes: THREE.Mesh[] = [];

    sectorConfig.forEach((cfg) => {
      const geo = new THREE.BoxGeometry(cfg.sizeX, 1, cfg.sizeZ);
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.4,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { sectorId: cfg.id };
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      raycastableMeshes.push(mesh);

      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xd1d5db, linewidth: 1.5 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      mesh.add(edges);

      // Warning marker group
      const beaconGroup = new THREE.Group();
      const markerGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.8 });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.y = 1.0;
      beaconGroup.add(markerMesh);

      const ringGeo = new THREE.RingGeometry(0.2, 0.35, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xff6b00, side: THREE.DoubleSide });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 2.0;
      beaconGroup.add(ringMesh);

      mesh.add(beaconGroup);

      sectorMeshes.set(cfg.id, { mesh, edges, beacon: beaconGroup });
    });

    // Connecting route lines between sectors and Gates
    const routeMaterial = new THREE.LineDashedMaterial({
      color: 0x9ca3af,
      dashSize: 0.4,
      gapSize: 0.2,
    });
    const alternateRouteMat = new THREE.LineBasicMaterial({
      color: 0xff6b00,
      linewidth: 2,
    });

    // Main Route: Sector 12 to Main Gate
    const mainRoutePoints = [
      new THREE.Vector3(4.5, 0.1, -2.5),
      new THREE.Vector3(2.0, 0.1, -1.0),
      new THREE.Vector3(0.0, 0.1, 0.0),
      new THREE.Vector3(-1.0, 0.1, 7.0), // Main Gate
    ];
    const mainRouteCurve = new THREE.CatmullRomCurve3(mainRoutePoints);
    const mainRouteGeo = new THREE.BufferGeometry().setFromPoints(mainRouteCurve.getPoints(30));
    const mainRouteLine = new THREE.Line(mainRouteGeo, routeMaterial);
    mainRouteLine.computeLineDistances();
    scene.add(mainRouteLine);

    // Alternate Route: Sector 12 -> Route B -> Gate C
    const altRoutePoints = [
      new THREE.Vector3(4.5, 0.1, -2.5),
      new THREE.Vector3(6.5, 0.1, -1.0),
      new THREE.Vector3(7.5, 0.1, 3.0),
      new THREE.Vector3(7.0, 0.1, 7.0), // Gate C
    ];
    const altRouteCurve = new THREE.CatmullRomCurve3(altRoutePoints);
    const altRouteGeo = new THREE.BufferGeometry().setFromPoints(altRouteCurve.getPoints(30));
    const altRouteLine = new THREE.Line(altRouteGeo, alternateRouteMat);
    scene.add(altRouteLine);

    // Orbit & Pan interaction
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    let rotY = 0.6;
    let rotX = 0.55;
    let camDist = 24;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPos = { x, y };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

      rotY += (x - prevPos.x) * 0.007;
      rotX = Math.max(0.15, Math.min(1.2, rotX + (y - prevPos.y) * 0.006));
      prevPos = { x, y };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camDist = Math.max(14, Math.min(34, camDist + e.deltaY * 0.02));
    };

    // Click selection via Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(raycastableMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const sId = hit.userData.sectorId as SectorId;
        if (sId) {
          setSelectedSectorId(sId);
        }
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('click', onClick);

    // Animation loop with dynamic elevation response
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      const current = sceneStateRef.current;

      camera.position.x = camDist * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = camDist * Math.sin(rotX);
      camera.position.z = camDist * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 0.8, 0);

      // Dynamically update terrain height based on density
      sectorConfig.forEach((cfg) => {
        const sectorData = current.sectors[cfg.id];
        const meshEntry = sectorMeshes.get(cfg.id);
        if (!meshEntry || !sectorData) return;

        const densityPct = sectorData.currentDensity;
        // Terrain height proportional to density:
        // 40% -> 0.8 height; 87% -> 2.6 height; 94% -> 3.5 height
        const targetHeight = (densityPct / 100) * 3.5 + 0.4;

        meshEntry.mesh.scale.y += (targetHeight - meshEntry.mesh.scale.y) * 0.08;
        meshEntry.mesh.position.set(cfg.baseX, meshEntry.mesh.scale.y / 2, cfg.baseZ);

        // Highlight selected or critical sector
        const isSelected = current.selectedSectorId === cfg.id;
        const isCritical = sectorData.riskLevel === 'CRITICAL';

        if (isSelected) {
          (meshEntry.edges.material as THREE.LineBasicMaterial).color.setHex(0xff6b00);
          (meshEntry.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xfaf5ff);
        } else if (isCritical) {
          (meshEntry.edges.material as THREE.LineBasicMaterial).color.setHex(0xe11d48);
          (meshEntry.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xfff1f2);
        } else {
          (meshEntry.edges.material as THREE.LineBasicMaterial).color.setHex(0xd1d5db);
          (meshEntry.mesh.material as THREE.MeshStandardMaterial).color.setHex(0xffffff);
        }

        // Animate beacon if warning
        if (meshEntry.beacon) {
          meshEntry.beacon.visible = isCritical || isSelected;
          meshEntry.beacon.position.y = 0.5; // sits on top of scaled mesh
          meshEntry.beacon.rotation.y = time * 2;
        }
      });

      // Animate alternate route glow
      if (current.isAlternateRouteActive) {
        altRouteLine.visible = true;
        (altRouteLine.material as THREE.LineBasicMaterial).opacity = 0.6 + Math.sin(time * 6) * 0.4;
      } else {
        altRouteLine.visible = false;
      }

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
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('click', onClick);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeSector = sectors[selectedSectorId];

  return (
    <div className="relative w-full h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-gray-200 bg-[#FBFBFC] shadow-xs select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span className="font-mono text-[11px] font-semibold text-gray-800">
            DENSITY-TO-ELEVATION MESH
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400 pl-1">
          CLICK SECTOR TO INSPECT TELEMETRY
        </span>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="px-2 py-1 rounded bg-white/90 backdrop-blur-md border border-gray-200 font-mono text-[10px] text-gray-600">
          HEIGHT = DENSITY RATIO
        </div>
      </div>

      {/* Dynamic Sector Telemetry Inspection Card */}
      <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-84 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm pointer-events-auto">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div>
            <div className="text-[10px] font-mono text-gray-400 tracking-wider">SELECTED SECTOR</div>
            <div className="font-bold text-gray-900 text-sm">{activeSector.name}</div>
          </div>
          <span
            className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold tracking-wider ${
              activeSector.riskLevel === 'CRITICAL'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : activeSector.riskLevel === 'HIGH'
                ? 'bg-orange-50 text-orange-700 border border-orange-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {activeSector.riskLevel}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 text-xs border-b border-gray-100">
          <div>
            <span className="text-[11px] text-gray-400">CURRENT DENSITY</span>
            <div className="font-mono text-lg font-bold text-gray-900">
              {activeSector.currentDensity}%
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  activeSector.currentDensity > 80 ? 'bg-rose-500' : 'bg-orange-500'
                }`}
                style={{ width: `${activeSector.currentDensity}%` }}
              />
            </div>
          </div>
          <div>
            <span className="text-[11px] text-gray-400">PREDICTED (+30M)</span>
            <div className="font-mono text-lg font-bold text-orange-600">
              {activeSector.predictedDensity}%
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-500"
                style={{ width: `${activeSector.predictedDensity}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-2 text-[11px]">
          <span className="text-gray-400 font-mono text-[10px]">RECOMMENDED ACTION</span>
          <p className="text-gray-800 font-medium mt-0.5 leading-snug">
            {activeSector.recommendedAction}
          </p>
        </div>

        {/* Sector Quick switcher */}
        <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-100">
          {(['SECTOR_12', 'SECTOR_07', 'SECTOR_04', 'SECTOR_01'] as SectorId[]).map((sId) => (
            <button
              key={sId}
              onClick={() => setSelectedSectorId(sId)}
              className={`flex-1 py-1 text-[10px] font-mono rounded border transition-colors ${
                selectedSectorId === sId
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {sId.replace('SECTOR_', 'S-')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
