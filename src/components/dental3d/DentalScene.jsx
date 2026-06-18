import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import {
  S, POS_ADULT, POS_PEDIA, UP_ADULT, LO_ADULT, UP_PEDIA, LO_PEDIA, MIRROR_Q,
  FDI_MODEL, FRONT_AZ, buccalDir, lingualDir, mesialDir, distalDir,
  ZONE_COLORS_VEC, ZONE_HEX, SURF_SEQ, SURF_HOLD, SEL_SEQ,
  ARCH_TARGET, SURF_R, EYE_POL, sphere, shortAngleDelta, easeInOut,
} from './constants';

const zoneUniform = { selectedZone: { value: -1 } };

function applyToothColor(group, isUpper) {
  const bb = new THREE.Box3().setFromObject(group);
  const sz = bb.getSize(new THREE.Vector3());
  let cervY, cejY, yDir;
  if (isUpper) { cervY = bb.min.y + sz.y * 0.42; cejY = bb.min.y + sz.y * 0.50; yDir = 1.0; }
  else { cervY = bb.max.y - sz.y * 0.42; cejY = bb.max.y - sz.y * 0.50; yDir = -1.0; }
  group.traverse(o => {
    if (!(o.isMesh && o.material)) return;
    const m = o.material; m.roughness = 0.55; m.metalness = 0.0;
    m.customProgramCacheKey = () => 'tp-tc';
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uCejY = { value: cejY }; sh.uniforms.uCervicalY = { value: cervY }; sh.uniforms.uYDir = { value: yDir };
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP=(modelMatrix*vec4(position,1.0)).xyz;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;\nuniform float uCejY;uniform float uCervicalY;uniform float uYDir;')
        .replace('#include <dithering_fragment>', `#include <dithering_fragment>
          float cejBlend;if(uYDir>0.0)cejBlend=smoothstep(uCervicalY-0.02,uCejY+0.01,vWP.y);else cejBlend=1.0-smoothstep(uCejY-0.01,uCervicalY+0.02,vWP.y);
          vec3 crownColor=vec3(0.95,0.93,0.90);vec3 rootL=vec3(0.85,0.78,0.67);vec3 rootD=vec3(0.76,0.66,0.52);
          vec3 rootColor=mix(rootL,rootD,cejBlend*0.4);vec3 baseColor=mix(crownColor,rootColor,cejBlend);
          float mid=(uCervicalY+uCejY)*0.5;float spread=abs(uCejY-uCervicalY)*1.2;float cMask=exp(-pow((vWP.y-mid)/spread,2.0)*3.0);
          baseColor=mix(baseColor,vec3(0.88,0.80,0.68),cMask*0.35);
          gl_FragColor.rgb=min(gl_FragColor.rgb*baseColor*1.18,vec3(1.0));`);
    };
    m.needsUpdate = true;
  });
}

function applyZoneShader(group) {
  const bb = new THREE.Box3().setFromObject(group);
  const sz = bb.getSize(new THREE.Vector3());
  const ctr = bb.getCenter(new THREE.Vector3());
  const cervY = bb.min.y + sz.y * 0.42, cejY = bb.min.y + sz.y * 0.50;
  const crownH = Math.abs(cervY - bb.min.y), occTop = bb.min.y + crownH * 0.45;
  group.traverse(o => {
    if (!(o.isMesh && o.material)) return;
    const m = o.material; m.roughness = 0.55; m.metalness = 0.0;
    m.customProgramCacheKey = () => 'tp-zone';
    m.onBeforeCompile = (sh) => {
      sh.uniforms.selectedZone = zoneUniform.selectedZone;
      sh.uniforms.zoneColors = { value: ZONE_COLORS_VEC };
      sh.uniforms.uCejY = { value: cejY }; sh.uniforms.uCervicalY = { value: cervY };
      sh.uniforms.uOcclusalTop = { value: occTop }; sh.uniforms.uCenterX = { value: ctr.x };
      sh.uniforms.uCenterZ = { value: ctr.z }; sh.uniforms.uYDir = { value: 1.0 };
      sh.uniforms.uMesialDir = { value: mesialDir }; sh.uniforms.uDistalDir = { value: distalDir };
      sh.uniforms.uBuccalDir = { value: buccalDir }; sh.uniforms.uLingualDir = { value: lingualDir };
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;varying vec3 vWN;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvWP=(modelMatrix*vec4(position,1.0)).xyz;vWN=normalize((modelMatrix*vec4(normal,0.0)).xyz);');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>',
        '#include <common>\nvarying vec3 vWP;varying vec3 vWN;\nuniform int selectedZone;uniform vec3 zoneColors[7];\nuniform float uCejY;uniform float uCervicalY;uniform float uOcclusalTop;uniform float uCenterX;uniform float uCenterZ;uniform float uYDir;\nuniform vec3 uMesialDir;uniform vec3 uDistalDir;uniform vec3 uBuccalDir;uniform vec3 uLingualDir;')
        .replace('#include <dithering_fragment>', `#include <dithering_fragment>
          float cejBlend=smoothstep(uCervicalY-0.02,uCejY+0.01,vWP.y);
          vec3 crownColor=vec3(0.95,0.93,0.90);vec3 rootL=vec3(0.85,0.78,0.67);vec3 rootD=vec3(0.76,0.66,0.52);
          vec3 rootColor=mix(rootL,rootD,cejBlend*0.4);vec3 baseColor=mix(crownColor,rootColor,cejBlend);
          float mid2=(uCervicalY+uCejY)*0.5;float spread2=abs(uCejY-uCervicalY)*1.2;float cMask=exp(-pow((vWP.y-mid2)/spread2,2.0)*3.0);
          baseColor=mix(baseColor,vec3(0.88,0.80,0.68),cMask*0.35);
          gl_FragColor.rgb=min(gl_FragColor.rgb*baseColor*1.18,vec3(1.0));
          float y=vWP.y;vec3 wn=normalize(vWN);int zone=-1;
          bool isRoot=(y>=uCejY);bool isCerv=(y>=uCervicalY&&y<uCejY);bool isOccY=(y<uOcclusalTop);
          if(isRoot)zone=6;else if(isCerv)zone=5;else if(isOccY)zone=0;
          else{vec3 nH=vec3(wn.x,0.0,wn.z);vec3 fromC=vec3(vWP.x-uCenterX,0.0,vWP.z-uCenterZ);
            vec3 guide=length(nH)>0.18?normalize(nH):(length(fromC)>1e-5?normalize(fromC):uLingualDir);
            float dm=dot(guide,uMesialDir),dd=dot(guide,uDistalDir),db=dot(guide,uBuccalDir),dl=dot(guide,uLingualDir);
            float best=dm;zone=3;if(dd>best){best=dd;zone=4;}if(db>best){best=db;zone=1;}if(dl>best){best=dl;zone=2;}}
          if(selectedZone==zone){vec3 zc=zoneColors[zone];
            float lumZ=dot(gl_FragColor.rgb,vec3(0.299,0.587,0.114));vec3 tinted=zc*clamp(lumZ*0.45+0.55,0.55,1.0);
            gl_FragColor.rgb=mix(gl_FragColor.rgb,tinted,0.78);}`);
    };
    m.needsUpdate = true;
  });
}

function buildArch(posMap, upMap, loMap, models, sf) {
  const arch = new THREE.Group();
  for (const q of ['1', '2', '3', '4']) {
    const isUp = q === '1' || q === '2';
    const map = isUp ? upMap : loMap;
    for (const pStr of Object.keys(map)) {
      const p = parseInt(pStr);
      const pk = q + '_' + p;
      const pose = posMap[pk]; if (!pose) continue;
      const src = models[map[p]]; if (!src) continue;
      const tooth = src.clone(true);
      const cb = new THREE.Box3().setFromObject(tooth);
      tooth.position.sub(cb.getCenter(new THREE.Vector3()));
      if (sf !== 1.0) tooth.scale.setScalar(sf);
      const inner = new THREE.Group(); inner.scale.x = MIRROR_Q[q] ? -1 : 1; inner.add(tooth);
      const outer = new THREE.Group(); outer.position.set(...pose.position); outer.rotation.set(...pose.rotation); outer.add(inner);
      arch.add(outer); outer.updateMatrixWorld(true); applyToothColor(outer, isUp);
    }
  }
  return arch;
}

function buildMixedArch(models) {
  const arch = new THREE.Group();
  for (const q of ['1', '2', '3', '4']) {
    const isUp = q === '1' || q === '2';
    const map = isUp ? UP_ADULT : LO_ADULT;
    for (let pos = 1; pos <= 8; pos++) {
      const pk = q + '_' + pos;
      const pose = POS_ADULT[pk]; if (!pose) continue;
      const src = models[map[pos]]; if (!src) continue;
      const tooth = src.clone(true);
      const cb = new THREE.Box3().setFromObject(tooth);
      tooth.position.sub(cb.getCenter(new THREE.Vector3()));
      const sf = pos <= 3 ? 0.82 : 1.0; tooth.scale.setScalar(sf);
      const inner = new THREE.Group(); inner.scale.x = MIRROR_Q[q] ? -1 : 1; inner.add(tooth);
      const outer = new THREE.Group(); outer.position.set(...pose.position); outer.rotation.set(...pose.rotation); outer.add(inner);
      arch.add(outer); outer.updateMatrixWorld(true); applyToothColor(outer, isUp);
    }
  }
  return arch;
}

function SceneContent({ timeRef, onTipUpdate, onSelectorUpdate, onPillUpdate }) {
  const { scene, camera, gl } = useThree();
  const archAdultRef = useRef(null);
  const archPediaRef = useRef(null);
  const archMixedRef = useRef(null);
  const singlePivotRef = useRef(null);
  const modelsRef = useRef({});
  const currentSingleFdiRef = useRef(0);
  const useZoneShaderRef = useRef(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;

    const keyL = new THREE.DirectionalLight(0xffffff, 1.0);
    keyL.position.set(3, 6, 6); scene.add(keyL);
    const rimL = new THREE.DirectionalLight(0x7c7bf0, 0.9);
    rimL.position.set(-4, -2, -5); scene.add(rimL);

    const pmrem = new THREE.PMREMGenerator(gl);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.5;

    const archAdult = new THREE.Group(); scene.add(archAdult); archAdultRef.current = archAdult;
    const archPedia = new THREE.Group(); scene.add(archPedia); archPediaRef.current = archPedia;
    const archMixed = new THREE.Group(); scene.add(archMixed); archMixedRef.current = archMixed;
    const singlePivot = new THREE.Group(); scene.add(singlePivot); singlePivotRef.current = singlePivot;
    archPedia.visible = false; archMixed.visible = false; singlePivot.visible = false;

    const draco = new DRACOLoader();
    draco.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.184.0/examples/jsm/libs/draco/');
    const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
    const load = (p) => new Promise((res, rej) => loader.load(p, g => res(g.scene), undefined, rej));

    const distinct = [...new Set([...Object.values(UP_ADULT), ...Object.values(LO_ADULT), ...Object.values(UP_PEDIA), ...Object.values(LO_PEDIA)])];
    Promise.all(distinct.map(async m => {
      const s = await load('/models/tooth_' + m + '.glb');
      return [m, s];
    })).then(results => {
      const models = {};
      results.forEach(([k, v]) => { models[k] = v; });
      modelsRef.current = models;

      archAdult.add(buildArch(POS_ADULT, UP_ADULT, LO_ADULT, models, 1.0));
      archPedia.add(buildArch(POS_PEDIA, UP_PEDIA, LO_PEDIA, models, 0.82));
      archMixed.add(buildMixedArch(models));
      loadedRef.current = true;
    }).catch(e => console.error('Model load error:', e));

    return () => {
      scene.remove(keyL); scene.remove(rimL);
      if (archAdultRef.current) scene.remove(archAdultRef.current);
      if (archPediaRef.current) scene.remove(archPediaRef.current);
      if (archMixedRef.current) scene.remove(archMixedRef.current);
      if (singlePivotRef.current) scene.remove(singlePivotRef.current);
    };
  }, []);

  const showSingleTooth = useCallback((fdi, withZone) => {
    const pivot = singlePivotRef.current; if (!pivot) return;
    while (pivot.children.length) pivot.remove(pivot.children[0]);
    const modelName = FDI_MODEL[fdi];
    const src = modelsRef.current[modelName]; if (!src) return;
    const root = src.clone(true);
    const box = new THREE.Box3().setFromObject(root);
    const c = box.getCenter(new THREE.Vector3());
    const s = box.getSize(new THREE.Vector3());
    root.position.sub(c);
    pivot.scale.setScalar(2.2 / (Math.max(s.x, s.y, s.z) || 1));
    pivot.add(root); pivot.updateMatrixWorld(true);
    if (withZone) applyZoneShader(pivot); else applyToothColor(pivot, fdi <= 28);
    currentSingleFdiRef.current = fdi;
    useZoneShaderRef.current = withZone;
  }, []);

  useFrame(() => {
    if (!loadedRef.current) return;
    const t = timeRef.current;
    const archAdult = archAdultRef.current;
    const archPedia = archPediaRef.current;
    const archMixed = archMixedRef.current;
    const singlePivot = singlePivotRef.current;
    if (!archAdult || !singlePivot) return;

    if (t < S.arch) {
      archAdult.visible = false; archPedia.visible = false; archMixed.visible = false; singlePivot.visible = false;
      return;
    }

    if (t < S.archZoom) {
      const ct = t - S.arch;
      archAdult.visible = (ct < 3 || ct >= 9); archPedia.visible = (ct >= 3 && ct < 6); archMixed.visible = (ct >= 6 && ct < 9);
      singlePivot.visible = false;
      const pillId = ct < 3 ? 'adult' : ct < 6 ? 'pedia' : ct < 9 ? 'mixed' : 'adult';
      onPillUpdate && onPillUpdate(pillId);
      const az = -0.05 + ct * 0.012;
      camera.position.set(ARCH_TARGET.x + Math.sin(az) * 25.5, ARCH_TARGET.y + 1.1, ARCH_TARGET.z + Math.cos(az) * 25.5);
      camera.lookAt(ARCH_TARGET); camera.fov = 35; camera.updateProjectionMatrix();
      onTipUpdate && onTipUpdate(null);
      return;
    }

    if (t < S.surface) {
      const zt = Math.min(1, (t - S.archZoom) / (S.surface - S.archZoom));
      const e = easeInOut(zt);
      archAdult.visible = (zt < 0.4); archPedia.visible = false; archMixed.visible = false;
      if (zt >= 0.35 && !singlePivot.visible) { showSingleTooth(26, true); singlePivot.visible = true; }
      singlePivot.visible = (zt >= 0.35);
      const az0 = -0.05 + 12 * 0.012;
      const startPos = new THREE.Vector3(ARCH_TARGET.x + Math.sin(az0) * 25.5, ARCH_TARGET.y + 1.1, ARCH_TARGET.z + Math.cos(az0) * 25.5);
      const endPos = sphere(SURF_R, EYE_POL, FRONT_AZ);
      camera.position.lerpVectors(startPos, endPos, e);
      const lookT = ARCH_TARGET.clone().lerp(new THREE.Vector3(0, 0, 0), e);
      camera.lookAt(lookT); camera.fov = 35 - e * 5; camera.updateProjectionMatrix();
      singlePivot.rotation.y = 0; singlePivot.rotation.x = 0; singlePivot.position.set(0, 0, 0);
      zoneUniform.selectedZone.value = -1;
      onTipUpdate && onTipUpdate(null);
      return;
    }

    if (t < S.sel) {
      archAdult.visible = false; archPedia.visible = false; archMixed.visible = false;
      if (currentSingleFdiRef.current !== 26 || !useZoneShaderRef.current) { showSingleTooth(26, true); singlePivot.visible = true; }
      singlePivot.visible = true; singlePivot.position.set(0, 0, 0);
      const st = t - S.surface;
      const idx = Math.min(SURF_SEQ.length - 1, Math.floor(st / SURF_HOLD));
      const nIdx = Math.min(SURF_SEQ.length - 1, idx + 1);
      const localT = (st - idx * SURF_HOLD) / SURF_HOLD;
      const move = Math.min(1, localT / 0.45); const e = easeInOut(move);
      const A = SURF_SEQ[idx], B = SURF_SEQ[nIdx];
      const az = A.az + shortAngleDelta(A.az, B.az) * e;
      camera.position.copy(sphere(SURF_R, EYE_POL, az)); camera.lookAt(0, 0, 0);
      camera.fov = 30; camera.updateProjectionMatrix();
      const cur = e < 0.6 ? A : B;
      zoneUniform.selectedZone.value = cur.z;
      singlePivot.rotation.y = 0; singlePivot.rotation.x = 0;
      const dirMap = { 0: new THREE.Vector3(0, -1, 0), 1: buccalDir, 2: lingualDir, 3: mesialDir, 4: distalDir };
      const p = dirMap[cur.z].clone().multiplyScalar(1.4); p.project(camera);
      const sx = (p.x * 0.5 + 0.5) * 1920, sy = (-p.y * 0.5 + 0.5) * 1080;
      const tipOpacity = (localT > 0.5 || idx > 0 || st > 0.8) ? 1 : Math.max(0, (st - 0.3) / 0.5);
      onTipUpdate && onTipUpdate({ x: sx, y: sy, label: cur.label, color: ZONE_HEX[cur.z], opacity: tipOpacity });
      return;
    }

    if (t < S.mod) {
      archAdult.visible = false; archPedia.visible = false; archMixed.visible = false;
      singlePivot.visible = true; singlePivot.position.set(0, 0.3, 0);
      onTipUpdate && onTipUpdate(null);
      zoneUniform.selectedZone.value = -1;
      const st = t - S.sel;
      let targetFdi = SEL_SEQ[0].fdi;
      for (const s of SEL_SEQ) { if (st >= s.t) targetFdi = s.fdi; }
      if (currentSingleFdiRef.current !== targetFdi || useZoneShaderRef.current) { showSingleTooth(targetFdi, false); }
      onSelectorUpdate && onSelectorUpdate(targetFdi);
      singlePivot.rotation.y = -0.3 + st * 0.15; singlePivot.rotation.x = 0.05;
      camera.position.set(0, 0.6, 6); camera.lookAt(0, 0.2, 0);
      camera.fov = 30; camera.updateProjectionMatrix();
      return;
    }

    if (t < S.print) {
      archAdult.visible = false; archPedia.visible = false; archMixed.visible = false;
      singlePivot.visible = true; onTipUpdate && onTipUpdate(null);
      if (currentSingleFdiRef.current !== 26) { showSingleTooth(26, true); }
      const mt = t - S.mod;
      const shiftX = -2.2;
      const shiftEase = Math.min(1, mt / 0.8);
      singlePivot.position.set(shiftX * easeInOut(shiftEase), 0, 0);
      singlePivot.rotation.y = FRONT_AZ + 0.15 + mt * 0.04; singlePivot.rotation.x = 0.05;
      if (mt < 3) zoneUniform.selectedZone.value = -1;
      else if (mt < 5) zoneUniform.selectedZone.value = 1;
      else if (mt < 7) zoneUniform.selectedZone.value = 0;
      else zoneUniform.selectedZone.value = -1;
      camera.position.set(shiftX * easeInOut(shiftEase), 0.2, 6);
      camera.lookAt(shiftX * easeInOut(shiftEase), 0, 0);
      camera.fov = 30; camera.updateProjectionMatrix();
      return;
    }

    archAdult.visible = false; archPedia.visible = false; archMixed.visible = false;
    singlePivot.visible = false; onTipUpdate && onTipUpdate(null);
  });

  return null;
}

const DentalScene = forwardRef(function DentalScene({ timeRef, onTipUpdate, onSelectorUpdate, onPillUpdate }, ref) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 35, near: 0.1, far: 100, position: [0, 0, 20] }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
      dpr={1}
    >
      <SceneContent
        timeRef={timeRef}
        onTipUpdate={onTipUpdate}
        onSelectorUpdate={onSelectorUpdate}
        onPillUpdate={onPillUpdate}
      />
    </Canvas>
  );
});

export default DentalScene;
