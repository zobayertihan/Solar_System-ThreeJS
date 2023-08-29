async function getPlanetDetails(planetName) {
  return await fetch(`data/planet.json`)
    .then((response) => response.json())
    .then((data) => data[planetName])
    .catch((error) => console.error(error));
}

// Get the planet name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const planetName = urlParams.get("planet");

// Get planet details and display them
getPlanetDetails(planetName).then((planet) => {
  const planetDetailsContainer = document.getElementById("planet-details");
  planetDetailsContainer.innerHTML = `
    <h1>${planet.name}</h1>
    <p>Diameter: ${planet.diameter}</p>
    <p>Distance from Sun: ${planet.distanceFromSun}</p>
    <p>${planet.description}</p>
    <a href="/index.html" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 4px; border: none; cursor: pointer;">Back</a>
  `;
});