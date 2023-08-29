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
import { Sphere } from "./Models/sphare";
import { Ring } from "./Models/ring";

const urlParams = new URLSearchParams(window.location.search);
const planetName = urlParams.get("planet");
console.log(planetName);

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
// const gridHelper = new THREE.GridHelper(500, 50);
// scene.add(gridHelper);

// Sun
const sun = new Sphere(4, null, sunImg);
scene.add(sun);

//Planet

function createPlanet(texture, name, ring = null) {
  const planet = new Sphere(50, null, texture, "basic");
  const position = 0;
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
  planet.name = name;
  // Store the original position as a property of the planet object
  planet.originalXPosition = position;
  // Store the planet reference in userData
  planet.userData.planetData = {
    planet,
    planetObj,
    defaultMaterial: planet.material,
  };
  return { planet, planetObj };
}

const murcury = new createPlanet(mercuryImg, "mercury");
const venus = new createPlanet(venusImg, "venus");
const earth = new createPlanet(earthImg, "earth");
const mars = new createPlanet(marsImg, "mars");
const jupiter = new createPlanet(jupiterImg, "jupiter");
const saturn = new createPlanet(saturnImg, "saturn", {
  innerRadius: 50,
  outerRadius: 80,
  color: null,
  texture: saturnRingImg,
  material: "basic",
});
const uranus = new createPlanet(uranusImg, "uranus", {
  innerRadius: 50,
  outerRadius: 80,
  color: null,
  texture: uranusRingImg,
  material: "basic",
});
const neptune = new createPlanet(neptuneImg, "neptune");
const pluto = new createPlanet(plutoImg, "pluto");

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
  //   sun.rotateY(0.004);
  sun.visible = false;
  murcury.planet.rotateY(0.002);
  venus.planet.rotateY(0.002);
  earth.planet.rotateY(0.002);
  mars.planet.rotateY(0.002);
  jupiter.planet.rotateY(0.002);
  saturn.planet.rotateY(0.002);
  uranus.planet.rotateY(0.002);
  neptune.planet.rotateY(0.002);
  pluto.planet.rotateY(0.002);

  const allPlanets = [
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

  saturn.planetObj.name = "saturn";
  uranus.planetObj.name = "uranus";
  const allRings = [saturn.planetObj, uranus.planetObj];

  for (const planet of allPlanets) {
    planet.visible = false;
  }

  for (const ring of allRings) {
    if (ring) {
      ring.visible = false;
    }
  }

  if (planetName) {
    const selectedPlanet = allPlanets.find(
      (planet) => planet.name === planetName
    );
    if (selectedPlanet) {
      selectedPlanet.visible = true;
      if (planetName === "saturn" || planetName === "uranus") {
        const selectedRing = allRings.find(
          (ringObj) => ringObj.name === planetName
        );
        if (selectedRing) {
          selectedRing.visible = true;
        }
      }
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
