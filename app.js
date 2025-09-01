import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
  import { ARButton } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/webxr/ARButton.js";
  import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/loaders/GLTFLoader.js";

function onLoad(gltf) {

document.getElementById("loader-element").style.visibility= "hidden";
document.getElementById("progress-bar").style.visibility= "hidden";

gltf.position.set(0,0,0);
gltf.scale.set(1,1,1);

renderer.setAnimationLoop(() => {
renderer.render(scene, camera);
});
}

function onProgress(xhr) {

let progressBar= document.getElementById("progress-bar");
progressBar.style.width= ((xhr.loaded/xhr.total)*100).toFixed(2) + "%";

}

function onError(error) {

let err= document.getElementById("error");
err.innerHTML=`An Error Occurred: ${error}.`;

}

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

const ambLight= new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambLight);

const dirLight= new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const renderer= new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.xr.enabled= true;
navigator.xr.requestSession({"immersive-ar", {requiredFeatures: ["hit-test"]});

const arBtn= ARButton.createButton(renderer);
arBtn.style.position= "fixed";
arBtn.style.bottom= 20px;
arBtn.style.right= 20px;
arBtn.style.zIndex= 
document.body.appendChild(arBtn);

xrSession.requestReferenceSpace("local");
xrSession.requestHitTestSource({space: "viewerSpace"});

const model= new THREE.GLTFLoader();
model.load("https://raw.githubusercontent.com/sohamdawn777/Ar-map/main/model.glb", onLoad, onProgress, onError);



