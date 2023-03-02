let config = {
    minZoom: 3,
    maxZoom: 18,
    fullscreenControl: true,
};
const initialZoom = 12;
const homeLat = 39.21666;
const HomeLng = 9.11666;

const lat = homeLat;
const lng = HomeLng;
const zoom = initialZoom;

// calling map
const map = L.map("map", config).setView([homeLat, HomeLng], initialZoom);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
