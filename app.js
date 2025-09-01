import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
  import { ARButton } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/webxr/ARButton.js";
  import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/loaders/GLTFLoader.js";

window.addEventListener("DOMContentLoaded", () => { 

const map= L.map("map", { center: [22.526911,88.377648], zoom: 19, maxZoom: 19, minZoom: 1 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19, minZoom: 1, tms: false }).addTo(map);

const marker = L.marker([22.526911,88.377648], { 
    icon: L.icon({ iconUrl: "graffitiIco.png", iconSize: [32,32], iconAnchor: [16,32], popupAnchor: [0,-32] }),
    title: "Graffiti Spot", draggable: false, riseOnHover: true }).addTo(map);

marker.bindPopup(`<p>This is sample text.</p>`, { maxWidth: 200, minWidth: 50, autoPan: true, closeButton: true, keepInView: true });

});

const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
scene.add(camera);
const renderer= new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

