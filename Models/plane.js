import * as THREE from "three";

// export class Plane {
//   constructor(color, width, height) {
//     this.color = color;
//     this.width = width;
//     this.height = height;
//   }
//   getPlane() {
//     const planegeometry = new THREE.PlaneGeometry(this.width, this.height);
//     const planematerial = new THREE.MeshBasicMaterial({
//       color: this.color,
//       opacity: 0.1,
//       combine: { blur: 0.2 },
//       reflectivity: 20,
//     });
//     return new THREE.Mesh(planegeometry, planematerial);
//   }
// }

export function Plane(
  width,
  height,
  color,
  DoubleSide = true,
  opacity = 0.1,
  map = null
) {
  const geometry = new THREE.PlaneGeometry(width, height);
  let material;
  if (map) {
    material = new THREE.MeshBasicMaterial({
      opacity: opacity,
      combine: { blur: 0.2 },
      reflectivity: 20,
      side: DoubleSide ? THREE.DoubleSide : THREE.FrontSide,
      map: new THREE.TextureLoader().load(map),
    });
  } else {
    material = new THREE.MeshBasicMaterial({
      color: color,
      opacity: opacity,
      combine: { blur: 0.2 },
      reflectivity: 20,
      side: DoubleSide ? THREE.DoubleSide : THREE.FrontSide,
    });
  }
  return new THREE.Mesh(geometry, material);
}

// const materialsInfo = {
//     MeshBasicMaterial: {
//       color: 0xffffff,
//       map: null,
//       opacity: 1,
//       transparent: false,
//       side: THREE.FrontSide,
//       wireframe: false,
//     },
//     MeshLambertMaterial: {
//       color: 0xffffff,
//       map: null,
//       emissive: 0x000000,
//       emissiveIntensity: 1,
//       opacity: 1,
//       transparent: false,
//     },
//     MeshPhongMaterial: {
//       color: 0xffffff,
//       map: null,
//       specular: 0x111111,
//       shininess: 30,
//       emissive: 0x000000,
//       emissiveIntensity: 1,
//       opacity: 1,
//       transparent: false,
//     },
//     MeshStandardMaterial: {
//       color: 0xffffff,
//       map: null,
//       roughness: 0.5,
//       metalness: 0.5,
//       emissive: 0x000000,
//       emissiveIntensity: 1,
//       opacity: 1,
//       transparent: false,
//     },
//     PointsMaterial: {
//       color: 0xffffff,
//       map: null,
//       size: 1,
//       sizeAttenuation: true,
//       opacity: 1,
//       transparent: false,
//     },
//     LineBasicMaterial: {
//       color: 0xffffff,
//       linewidth: 1,
//       linecap: "round",
//       linejoin: "round",
//     },
//   };
