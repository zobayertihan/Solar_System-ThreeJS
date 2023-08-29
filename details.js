const planetData = [
  {
    name: "Mercury",
    diameter: "4,880 km",
    distanceFromSun: "57.9 million km",
    description: "The closest planet to the Sun.",
  },
  {
    name: "Venus",
    diameter: "12,104 km",
    distanceFromSun: "108.2 million km",
    description: "Known for its thick and toxic atmosphere.",
  },
  {
    name: "Earth",
    diameter: "12,742 km",
    distanceFromSun: "149.6 million km",
    description: "Our home planet with diverse ecosystems.",
  },
  {
    name: "Mars",
    diameter: "6,779 km",
    distanceFromSun: "227.9 million km",
    description: "The 'Red Planet' with a thin atmosphere.",
  },
  {
    name: "Jupiter",
    diameter: "139,822 km",
    distanceFromSun: "778.5 million km",
    description: "The largest planet in our solar system.",
  },
  {
    name: "Saturn",
    diameter: "116,464 km",
    distanceFromSun: "1.4 billion km",
    description: "Known for its stunning ring system.",
  },
  {
    name: "Uranus",
    diameter: "50,724 km",
    distanceFromSun: "2.9 billion km",
    description:
      "Tilted on its side, rotating nearly perpendicular to its orbit.",
  },
  {
    name: "Neptune",
    diameter: "49,244 km",
    distanceFromSun: "4.5 billion km",
    description: "The farthest known planet from the Sun.",
  },
  {
    name: "Pluto",
    diameter: "2,377 km",
    distanceFromSun: "5.9 billion km",
    description: "A dwarf planet with a highly elliptical orbit.",
  },
];

console.log(planetData);
// Get the planet name from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const planetName = urlParams.get("planet");

// Get planet details and display them
planetData.map((planet) => {
  if (planet.name.toLowerCase() === planetName) {
    const planetDetailsContainer = document.getElementById("planet-details");
    planetDetailsContainer.innerHTML = `
      <h1>${planet.name}</h1>
      <p>Diameter: ${planet.diameter}</p>
      <p>Distance from Sun: ${planet.distanceFromSun}</p>
      <p>${planet.description}</p>
      <a href="/index.html" style="display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 4px; border: none; cursor: pointer;">Back</a>
    `;
  }
});
