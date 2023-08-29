import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import earthImg from "./img/earth.jpg";
import jupiterImg from "./img/jupiter.jpg";
import marsImg from "./img/mars.jpg";
import mercuryImg from "./img/mercury.jpg";
import neptuneImg from "./img/neptune.jpg";
import plutoImg from "./img/pluto.jpg";
import saturnImg from "./img/saturn.jpg";
import saturnRingImg from "./img/saturnRing.png";
import sunImg from "./img/sun.jpg";
import uranusImg from "./img/uranus.jpg";
import uranusRingImg from "./img/uranusRing.png";
import venusImg from "./img/venus.jpg";
import starImg from "./img/stars-1.jpg";
import ufo from "./img/ufo.png";
import { Sphare } from "./Models/sphare";
import { Ring } from "./Models/ring";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-90, 140, 140);

// Renderer
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//
const gridHelper = new THREE.GridHelper(500, 50);
scene.add(gridHelper);

// Sun
const sun = new Sphare(4, null, sunImg);
scene.add(sun);

//Planet

function createPlanet(size, texture, position, ring) {
  const planet = new Sphare(size, null, texture, "basic");
  const planetObj = new THREE.Object3D();
  planetObj.add(planet);

  if (ring) {
    const planetRing = new Ring(
      ring.innerRadius,
      ring.outerRadius,
      ring.color,
      ring.texture,
      ring.material
    );
    planetObj.add(planetRing);
    planetRing.position.x = position;
    planetRing.rotation.x = -0.5 * Math.PI;

    // Store the ring reference in userData
    planetRing.userData.ringData = {
      planetRing,
      defaultMaterial: planetRing.material,
    };
  }
  scene.add(planetObj);
  planet.position.x = position;

  // Store the original position as a property of the planet object
  planet.originalXPosition = position;
  planetObj.originalXPosition = position;
  // Store the planet reference in userData
  planet.userData.planetData = {
    planet,
    planetObj,
    defaultMaterial: planet.material,
  };
  return { planet, planetObj };
}

const murcury = new createPlanet(3.2, mercuryImg, 28);
const venus = new createPlanet(5.8, venusImg, 44);
const earth = new createPlanet(6, earthImg, 62);
const mars = new createPlanet(4, marsImg, 78);
const jupiter = new createPlanet(12, jupiterImg, 100);
const saturn = new createPlanet(10, saturnImg, 138, {
  innerRadius: 10,
  outerRadius: 20,
  color: null,
  texture: saturnRingImg,
  material: "basic",
});
const uranus = new createPlanet(7, uranusImg, 176, {
  innerRadius: 7,
  outerRadius: 12,
  color: null,
  texture: uranusRingImg,
  material: "basic",
});
const neptune = new createPlanet(7, neptuneImg, 200);
const pluto = new createPlanet(2.8, plutoImg, 230);

// Ray Caster
const rayCaster = new THREE.Raycaster();
const planetsForRaycasting = [
  murcury.planet,
  venus.planet,
  earth.planet,
  mars.planet,
  jupiter.planet,
  saturn.planet,
  uranus.planet,
  neptune.planet,
  pluto.planet,
];

//OnClick Function
let focusedPlanet = null;

function onClick(event) {
  const normalizedCoords = {
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2 + 1,
  };

  rayCaster.setFromCamera(normalizedCoords, camera);

  const intersects = rayCaster.intersectObjects(planetsForRaycasting);

  if (intersects.length > 0) {
    // Check if a planet was already focused and reset its state
    if (focusedPlanet) {
      //   const { planet, planetObj } = focusedPlanet;
      //   planet.scale.set(1, 1, 1);
      //   planet.material = focusedPlanet.defaultMaterial;
      //   planet.position.x = planet.originalXPosition;
      //   planet.rotation.y = 0;
      //   focusedPlanet = null;
      resetFocusedPlanet(focusedPlanet);
    }

    const clickedPlanet = intersects[0].object.userData.planetData;
    const { planet, planetObj } = clickedPlanet;
    console.log(planetObj.userData.ringData);
    planet.scale.set(3, 3, 3);
    planet.position.x = 100;

    if (planetObj.userData.ringData) {
      const { planetRing } = planetObj.userData.ringData;
      planetRing.scale.set(3, 3, 3);
      planetRing.position.x = 100;
    }

    focusedPlanet = clickedPlanet;
  } else {
    // Reset the focused planet's position if no planet is clicked
    if (focusedPlanet) {
      //   const { planet, planetObj } = focusedPlanet;
      //   planet.position.x = planet.originalXPosition;
      //   planet.scale.set(1, 1, 1);
      //   planet.rotation.y = 0;
      //   focusedPlanet = null;
      resetFocusedPlanet(focusedPlanet);
    }
  }
}

function resetFocusedPlanet(planetData) {
  const { planet, planetObj } = planetData;
  planet.scale.set(1, 1, 1);
  planet.position.x = planet.originalXPosition;

  if (planetObj.userData.ringData) {
    const { planetRing, defaultMaterial } = planetObj.userData.ringData;
    planetRing.scale.set(1, 1, 1);
    planetRing.position.x = planet.originalXPosition;
    planetRing.material = defaultMaterial;
  }

  planet.rotation.y = 0;
  focusedPlanet = null;
}

renderer.domElement.addEventListener("click", onClick);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 10000, 1000000);
scene.add(pointLight);

// Cube Background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starImg,
  starImg,
  starImg,
  starImg,
  starImg,
  starImg,
]);

// Animation Function
function animate() {
  //SelfRotation
  sun.rotateY(0.004);
  murcury.planet.rotateY(0.004);
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.02);
  mars.planet.rotateY(0.018);
  jupiter.planet.rotateY(0.04);
  saturn.planet.rotateY(0.038);
  uranus.planet.rotateY(0.03);
  neptune.planet.rotateY(0.032);
  pluto.planet.rotateY(0.008);
  // Around Sun Rotation
  murcury.planetObj.rotateY(0.04);
  venus.planetObj.rotateY(0.015);
  earth.planetObj.rotateY(0.01);
  mars.planetObj.rotateY(0.008);
  jupiter.planetObj.rotateY(0.002);
  saturn.planetObj.rotateY(0.0009);
  uranus.planetObj.rotateY(0.0004);
  neptune.planetObj.rotateY(0.0001);
  pluto.planetObj.rotateY(0.00007);

  // Loop through all planets and perform rotations based on focus
  const planets = [
    murcury.planet,
    venus.planet,
    earth.planet,
    mars.planet,
    jupiter.planet,
    saturn.planet,
    uranus.planet,
    neptune.planet,
    pluto.planet,
  ];

  for (const planet of planets) {
    const planetData = planet.userData.planetData;
    if (planetData && focusedPlanet === planetData) {
      planet.rotation.y = 0;
      planetData.planetObj.rotation.y = 0;
    }
  }

  renderer.render(scene, camera);
}

// Animation Loop
renderer.setAnimationLoop(animate);

// Resize Event Handling
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
