import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
  import { ARButton } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/webxr/ARButton.js";
  import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/loaders/GLTFLoader.js";

const map= L.map("map", { center: [], );

const scene= new THREE.scene();
const camera= new THREE.PerspectiveCamera({ fov: 60, aspect: window.innerWidth/window.innerHeight, near: 0.1, far: 1000 });
scene.add(camera);
const renderer= new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
scene.add(renderer);

