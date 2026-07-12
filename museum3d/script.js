import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdfefff);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 2, 8);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("museum"),
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(5, 10, 5);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        color: 0xf5f5f5
    })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Back Wall
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(20,6,0.3),
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
);

backWall.position.set(0,3,-10);
scene.add(backWall);

// Left Wall
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.3,6,20),
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
);

leftWall.position.set(-10,3,0);
scene.add(leftWall);

// Right Wall
const rightWall = leftWall.clone();
rightWall.position.x = 10;
scene.add(rightWall);

// Ceiling
const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
);

ceiling.rotation.x = Math.PI / 2;
ceiling.position.y = 6;
scene.add(ceiling);

// Animate
function animate(){

    requestAnimationFrame(animate);

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});
