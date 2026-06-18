import * as THREE from 'three';

// ── Scene timeline (seconds) ──
export const S = { intro:0, arch:7, archZoom:19, surface:22, sel:30, mod:37, print:46, hist:53, outro:56, end:58 };

// ── Arch positioning (ported from app's types.ts) ──
function computeArchPositions(kU, kL, yL, widths, gap) {
  const r = {};
  const left = (k, y, q) => {
    let cx = 0;
    for (let p = 1; p <= Object.keys(widths).length; p++) {
      if (!widths[p]) continue;
      const w = widths[p]; cx += w / 2;
      const x = cx, z = -k * x * x, ry = Math.atan(-2 * k * x);
      r[q + '_' + p] = { position: [x, y, z], rotation: [0, ry, 0] };
      cx += w / 2 + gap;
    }
  };
  left(kU, 0, '2'); left(kL, yL, '3');
  for (let p = 1; p <= 8; p++) { if (!r['2_' + p]) continue; const s = r['2_' + p]; r['1_' + p] = { position: [-s.position[0], s.position[1], s.position[2]], rotation: [0, -s.rotation[1], 0] }; }
  for (let p = 1; p <= 8; p++) { if (!r['3_' + p]) continue; const s = r['3_' + p]; r['4_' + p] = { position: [-s.position[0], s.position[1], s.position[2]], rotation: [0, -s.rotation[1], 0] }; }
  return r;
}

export const ADULT_WIDTHS = { 1:0.55, 2:0.45, 3:0.52, 4:0.48, 5:0.48, 6:0.68, 7:0.65, 8:0.60 };
export const PEDIA_WIDTHS = { 1:0.44, 2:0.36, 3:0.42, 4:0.55, 5:0.52 };
export const POS_ADULT = computeArchPositions(0.12, 0.14, -1.8, ADULT_WIDTHS, 0.04);
export const POS_PEDIA = computeArchPositions(0.16, 0.18, -1.5, PEDIA_WIDTHS, 0.04);

export const UP_ADULT = { 1:'11', 2:'11', 3:'13', 4:'14', 5:'15', 6:'16', 7:'17', 8:'18' };
export const LO_ADULT = { 1:'31', 2:'32', 3:'33', 4:'34', 5:'35', 6:'36', 7:'37', 8:'38' };
export const UP_PEDIA = { 1:'11', 2:'11', 3:'13', 4:'16', 5:'17' };
export const LO_PEDIA = { 1:'31', 2:'32', 3:'33', 4:'36', 5:'37' };
export const MIRROR_Q = { '1': true, '2': false, '3': false, '4': true };

// ── FDI → model file mapping ──
export const FDI_MODEL = {};
[11,12,13,14,15,16,17,18].forEach(f => FDI_MODEL[f] = String(f));
[21,22,23,24,25,26,27,28].forEach(f => FDI_MODEL[f] = String({21:11,22:11,23:13,24:14,25:15,26:16,27:17,28:18}[f]));
[31,32,33,34,35,36,37,38].forEach(f => FDI_MODEL[f] = String(f));
[41,42,43,44,45,46,47,48].forEach(f => FDI_MODEL[f] = String({41:31,42:32,43:33,44:34,45:35,46:36,47:37,48:38}[f]));

// ── Surface directions (tooth_16, frontAz = -70°) ──
export const FRONT_AZ = -70 * Math.PI / 180;
export const buccalDir = new THREE.Vector3(Math.sin(FRONT_AZ), 0, Math.cos(FRONT_AZ)).normalize();
export const lingualDir = buccalDir.clone().negate();
const perp = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), buccalDir).normalize();
export const mesialDir = perp.x > 0 ? perp : perp.clone().negate();
export const distalDir = mesialDir.clone().negate();

// ── Zone colors ──
export const ZONE_COLORS_VEC = [
  new THREE.Vector3(0.078, 0.722, 0.651), new THREE.Vector3(0.976, 0.451, 0.086),
  new THREE.Vector3(0.545, 0.361, 0.965), new THREE.Vector3(0.918, 0.702, 0.031),
  new THREE.Vector3(0.149, 0.388, 0.922), new THREE.Vector3(0.925, 0.282, 0.600),
  new THREE.Vector3(0.396, 0.639, 0.051),
];
export const ZONE_HEX = ['#14b8a6', '#f97316', '#8b5cf6', '#eab308', '#2563eb', '#ec4899', '#65a30d'];
export const ZONE_NAMES = ['Occlusal', 'Buccal', 'Lingual', 'Mesial', 'Distal', 'Cervical', 'Root'];

// ── Surface sequence (for surface rotation scene) ──
export const SURF_SEQ = [
  { z: 1, az: FRONT_AZ, label: 'Buccal' },
  { z: 2, az: FRONT_AZ + Math.PI, label: 'Lingual' },
  { z: 3, az: Math.atan2(mesialDir.x, mesialDir.z), label: 'Mesial' },
  { z: 4, az: Math.atan2(distalDir.x, distalDir.z), label: 'Distal' },
  { z: 0, az: FRONT_AZ - 0.3, label: 'Occlusal' },
];
export const SURF_HOLD = 1.6;

// ── Selector sequence ──
export const SEL_SEQ = [
  { t: 0, fdi: 16 }, { t: 1.2, fdi: 15 }, { t: 2.2, fdi: 14 }, { t: 3.0, fdi: 13 },
  { t: 3.7, fdi: 22 }, { t: 4.5, fdi: 26 }, { t: 5.5, fdi: 36 }, { t: 6.3, fdi: 11 },
];

// ── Camera ──
export const ARCH_TARGET = new THREE.Vector3(0, -0.55, -0.3);
export const SURF_R = 5.6;
export const EYE_POL = Math.PI / 2 + 0.15;

// ── Tooth names ──
export const TOOTH_NAMES = {
  11:'Upper Right Central Incisor',12:'Upper Right Lateral Incisor',13:'Upper Right Canine',
  14:'Upper Right First Premolar',15:'Upper Right Second Premolar',16:'Upper Right First Molar',
  17:'Upper Right Second Molar',18:'Upper Right Third Molar',
  21:'Upper Left Central Incisor',22:'Upper Left Lateral Incisor',23:'Upper Left Canine',
  24:'Upper Left First Premolar',25:'Upper Left Second Premolar',26:'Upper Left First Molar',
  27:'Upper Left Second Molar',28:'Upper Left Third Molar',
  31:'Lower Left Central Incisor',32:'Lower Left Lateral Incisor',33:'Lower Left Canine',
  34:'Lower Left First Premolar',35:'Lower Left Second Premolar',36:'Lower Left First Molar',
  37:'Lower Left Second Molar',38:'Lower Left Third Molar',
  41:'Lower Right Central Incisor',42:'Lower Right Lateral Incisor',43:'Lower Right Canine',
  44:'Lower Right First Premolar',45:'Lower Right Second Premolar',46:'Lower Right First Molar',
  47:'Lower Right Second Molar',48:'Lower Right Third Molar',
};

// ── Helpers ──
export function sphere(r, phi, theta) {
  const sp = r * Math.sin(phi);
  return new THREE.Vector3(sp * Math.sin(theta), r * Math.cos(phi), sp * Math.cos(theta));
}
export function shortAngleDelta(a, b) {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}
export function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

export const UPPER_FDI = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
export const LOWER_FDI = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
