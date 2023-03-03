
let config = {
    minZoom: 3,
    maxZoom: 18,
    fullscreenControl: true,
};
const initialZoom = 4;
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

HomeButton.buildHomeButton(map);
SearchButton.buildSearchButton(map);

const points = [
    {
        lat: 52.228785157729114,
        lng: 21.006867885589603,
        title: "Lviv",
        image: "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg",
    },
    {
        lat: 52.22923201880194,
        lng: 21.00897073745728,
        title: "China",
        image: "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg",
    },
    {
        lat: 52.22963944703663,
        lng: 21.01091265678406,
        title: "Morocco",
        image: "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg",
    },
    {
        lat: 52.229928587386496,
        lng: 21.01218938827515,
        title: "Israel",
        image: "https://cdn3.vectorstock.com/i/1000x1000/35/52/placeholder-rgb-color-icon-vector-32173552.jpg",
    },
];


points.forEach(singlePoint => {
    var imageOnMap = new imagePreviewOnMap(singlePoint.lat, singlePoint.lng, singlePoint.title, singlePoint.image);
    imageOnMap.showImagePreviewOnMap(map);
});
