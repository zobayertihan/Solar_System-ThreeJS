import * as THREE from "three";

export function Sphere(
  radius,
  color = "#ffffff",
  map = null,
  material = "basic"
) {
  const geometry = new THREE.SphereGeometry(radius);
  let sphareMaterial;
  //Map
  if (material === "basic") {
    if (map) {
      sphareMaterial = new THREE.MeshBasicMaterial({
        color: color,
        map: new THREE.TextureLoader().load(map),
      });
    } else {
      sphareMaterial = new THREE.MeshBasicMaterial({ color: color });
    }
  }
  if (material === "standard") {
    if (map) {
      sphareMaterial = new THREE.MeshStandardMaterial({
        color: color,
        map: new THREE.TextureLoader().load(map),
      });
    } else {
      sphareMaterial = new THREE.MeshStandardMaterial({ color: color });
    }
  }
  return new THREE.Mesh(geometry, sphareMaterial);
}
