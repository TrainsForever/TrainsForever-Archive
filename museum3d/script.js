import * as THREE from "three";

// ================================
// Scene
// ================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xddeeff);

// ================================
// Camera
// ================================

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 8);

// ================================
// Renderer
// ================================

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("museum"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ================================
// Lights
// ================================

scene.add(new THREE.AmbientLight(0xffffff, 2));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 10, 5);
scene.add(sun);

// ================================
// Floor
// ================================

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        color:0xeeeeee
    })
);

floor.rotation.x = -Math.PI/2;
scene.add(floor);

// ================================
// Wall Material
// ================================

const wallMaterial = new THREE.MeshStandardMaterial({
    color:0xffffff
});
