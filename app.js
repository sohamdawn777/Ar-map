import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.0/build/three.module.js";
  import { ARButton } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/webxr/ARButton.js";
  import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.164.0/examples/jsm/loaders/GLTFLoader.js";

window.addEventListener("DOMContentLoaded", () => { 

function onLoad(gltf) {

document.getElementById("loader-element").style.visibility= "hidden";
document.getElementById("progress-bar").style.visibility= "hidden";

gltf.scene.position.set(0,0,0);
gltf.scene.scale.set(1,1,1);
scene.add(gltf.scene);

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

function modelLoad(event) {

glbLoader.load(currentMarker.options.modelUrl, onLoad, onProgress, onError);

}

async function setupXR(event) {

const xrSession= renderer.xr.getSession();
const space= await xrSession.requestReferenceSpace("local-floor");
const source= await xrSession.requestHitTestSource({space: "viewerSpace" });

}

const map= L.map("map", { center: [22.526911,88.377648], zoom: 19, maxZoom: 19, minZoom: 1 });

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19, minZoom: 1, tms: false }).addTo(map);

let data= [{lat: 22.526911, lon: 88.377648, model: "https://raw.githubusercontent.com/sohamdawn777/Ar-map/main/model1.glb"}, {lat: 22.5999666, lon: 88.3729349, model: "https://raw.githubusercontent.com/sohamdawn777/Ar-map/main/model2.glb"}, {lat: 22.56492395, lon: 88.35405545738757, model: "https://raw.githubusercontent.com/sohamdawn777/Ar-map/main/model3.glb"}];

for (let j of data) {

const marker = L.marker([j.lat, j.lon], { 
    icon: L.icon({ iconUrl: "Icon.png", iconSize: [32,32], iconAnchor: [16,32], popupAnchor: [0,-32] }),
    title: "Graffiti Spot", draggable: false, riseOnHover: true, modelUrl: j.model }).addTo(map);

marker.bindPopup(`<p>This is sample text.</p>`, { maxWidth: 200, minWidth: 50, autoPan: true, closeButton: true, keepInView: true });

}

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

const glbLoader= new GLTFLoader();

const arBtn= ARButton.createButton(renderer);
arBtn.id="AR";
arBtn.style.position= "fixed";
arBtn.style.bottom= "20px";
arBtn.style.right= "20px";
arBtn.style.zIndex= 9999;
arBtn.style.visibility= "hidden";
document.body.appendChild(arBtn);
arBtn.addEventListener("click", modelLoad);

renderer.xr.addEventListener("sessionstart", setupXR);

let currentMarker= null;

if (arBtn) {
marker.on("popupopen", () => {
document.querySelector("#AR").style.visibility= "visible";
currentMarker= marker;
});
}
});