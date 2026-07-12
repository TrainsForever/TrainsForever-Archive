import * as THREE from "three";

// ---------------- Scene ----------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xddeeff);

// ---------------- Camera ----------------
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 8);

// ---------------- Renderer ----------------
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("museum"),
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ---------------- Lights ----------------
scene.add(new THREE.AmbientLight(0xffffff, 2));

const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 10, 5);
scene.add(sun);

// ---------------- Floor ----------------
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: 0xeeeeee
  })
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// ---------------- Wall Material ----------------
const wallMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff
});

// ---------------- Back Wall ----------------
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(20, 6, 0.3),
  wallMaterial
);

backWall.position.set(0, 3, -10);
scene.add(backWall);

// ---------------- Left Wall ----------------
const leftWall = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 6, 20),
  wallMaterial
);

leftWall.position.set(-10, 3, 0);
scene.add(leftWall);

// ---------------- Right Wall ----------------
const rightWall = leftWall.clone();
rightWall.position.x = 10;
scene.add(rightWall);

// ==================================================
// FRONT WALL WITH 3 DOOR OPENINGS
// ==================================================

// Left section
const frontLeft = new THREE.Mesh(
  new THREE.BoxGeometry(4.5, 6, 0.3),
  wallMaterial
);

frontLeft.position.set(-7.75, 3, 10);
scene.add(frontLeft);

// Middle section
const frontMiddle = new THREE.Mesh(
  new THREE.BoxGeometry(5, 2, 0.3),
  wallMaterial
);

frontMiddle.position.set(0, 5, 10);
scene.add(frontMiddle);

// Right section
const frontRight = new THREE.Mesh(
  new THREE.BoxGeometry(4.5, 6, 0.3),
  wallMaterial
);
// ---------------- Walls ----------------

const walls = [
  backWall,
  leftWall,
  rightWall,
  frontLeft,
  frontMiddle,
  frontRight
];
frontRight.position.set(7.75, 3, 10);
scene.add(frontRight);

// =============================
// Movement
// =============================

const keys = {};

const walkSpeed = 0.08;
const sprintSpeed = 0.16;

document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});
function updateMovement() {

    const speed = keys["ShiftLeft"] ? sprintSpeed : walkSpeed;

    const oldX = camera.position.x;
    const oldZ = camera.position.z;

    if (keys["KeyW"]) camera.translateZ(-speed);
    if (keys["KeyS"]) camera.translateZ(speed);
    if (keys["KeyA"]) camera.translateX(-speed);
    if (keys["KeyD"]) camera.translateX(speed);

    // Keep player inside museum
    if (
        camera.position.x < -9 ||
        camera.position.x > 9 ||
        camera.position.z < -9 ||
        camera.position.z > 9
    ) {
        camera.position.x = oldX;
        camera.position.z = oldZ;
    }

}

// =============================
// Animation
// =============================

function animate() {

  requestAnimationFrame(animate);

  updateMovement();

  renderer.render(scene, camera);

}
// ---------------- Mobile Touch ----------------

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (event) => {

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;

});

document.addEventListener("touchmove", (event) => {

    const touch = event.touches[0];

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    camera.position.x += deltaX * 0.01;
    camera.position.z += deltaY * 0.01;

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

});
animate();

// =============================
// Resize
// =============================

window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});

// ---------------- Mouse Look ----------------

let yaw = 0;
let pitch = 0;

document.body.addEventListener("click", () => {
    document.body.requestPointerLock();
});

document.addEventListener("mousemove", (event) => {

    if (document.pointerLockElement !== document.body) return;

    yaw -= event.movementX * 0.002;
    pitch -= event.movementY * 0.002;

    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

});
