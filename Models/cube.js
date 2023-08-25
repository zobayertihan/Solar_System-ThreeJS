import * as THREE from "three";
export function Cube(width, height, depth, color = "#111111", map = null) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  let material;
  //Map
  if (map) {
    material = new THREE.MeshBasicMaterial({
      color: color,
      map: new THREE.TextureLoader().load(map),
    });
  } else {
    material = new THREE.MeshBasicMaterial({ color: color });
  }
  return new THREE.Mesh(geometry, material);
}
