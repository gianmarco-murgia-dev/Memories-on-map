let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};
const initialZoom = 18;
const homeLat = 52.22977;
const HomeLng = 21.01178;

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

//START return to home button
const htmlTemplate = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z" /></svg>';

// create custom button
const customControl = L.Control.extend({
  options: { position: "topleft", },

  onAdd: function (map) {
    const btn = L.DomUtil.create("button");
    btn.title = "back to home";
    btn.innerHTML = htmlTemplate;
    btn.className += "leaflet-bar back-to-home";

    return btn;
  },
});

// adding new button to map controll
map.addControl(new customControl());

const buttonBackToHome = document.querySelector(".back-to-home");
buttonBackToHome.addEventListener("click", () => {
  map.flyTo([lat, lng], zoom);
});