export function getPlanetDetails(planetName) {
  return fetch(`data/planet.json`)
    .then((response) => response.json())
    .then((data) => data[planetName])
    .catch((error) => console.error(error));
}
