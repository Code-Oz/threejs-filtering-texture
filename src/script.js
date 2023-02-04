import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createMesh } from "./create-mesh";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loadingManager: loading started");
};
loadingManager.onLoaded = () => {
  console.log("loadingManager: loading finished");
};
loadingManager.onProgress = () => {
  console.log("loadingManager: loading progressing");
};
loadingManager.onError = () => {
  console.log("loadingManager: loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const bigColorTextureWithoutFilter = textureLoader.load(
  "/textures/checkerboard-1024x1024.png"
);

const littleColorTextureWithoutFilter = textureLoader.load(
  "/textures/checkerboard-8x8.png"
);

const bigColorTextureWithNearestFilter = textureLoader.load(
  "/textures/checkerboard-1024x1024.png"
);
bigColorTextureWithNearestFilter.minFilter = THREE.NearestFilter;

const littleColorTextureWithNearestFilter = textureLoader.load(
  "/textures/checkerboard-8x8.png"
);
littleColorTextureWithNearestFilter.magFilter = THREE.NearestFilter;

/**
 * Object
 */
// Little Texture, no filtering
const firstCube = createMesh(
  { x: 1, y: 0, z: 0 },
  littleColorTextureWithoutFilter
);
// Big Texture, no filtering
const thirdCube = createMesh(
  { x: 3, y: 0, z: 0 },
  bigColorTextureWithoutFilter
);
// Little Texture, nearest filtering
const secondCube = createMesh(
  { x: -1, y: 0, z: 0 },
  littleColorTextureWithNearestFilter
);
// Big Texture, nearest filtering
const fourthCube = createMesh(
  { x: -3, y: 0, z: 0 },
  bigColorTextureWithNearestFilter
);

scene.add(firstCube, secondCube, thirdCube, fourthCube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
