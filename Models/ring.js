import * as THREE from "three";

export function Ring(
  innerRadius,
  outerRadius,
  color = "#ffffff",
  map = null,
  material = "basic"
) {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
  let ringMaterial;
  //Map
  if (material === "basic") {
    if (map) {
      ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        map: new THREE.TextureLoader().load(map),
        side: THREE.DoubleSide,
      });
    } else {
      ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
      });
    }
  }
  if (material === "standard") {
    if (map) {
      ringMaterial = new THREE.MeshStandardMaterial({
        color: color,
        map: new THREE.TextureLoader().load(map),
        side: THREE.DoubleSide,
      });
    } else {
      ringMaterial = new THREE.MeshStandardMaterial({
        color: color,
        side: THREE.DoubleSide,
      });
    }
  }
  return new THREE.Mesh(geometry, ringMaterial);
}
