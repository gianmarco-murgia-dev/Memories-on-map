class imagePreviewOnMap {
    constructor(Lat, Lng, Title, ImageUrl) {
        this.lat = Lat;
        this.lng = Lng;
        this.title = Title;
        this.imageUrl = ImageUrl;
    }

    showImagePreviewOnMap(Map) {
        const myIcon = L.icon({
            iconUrl: this.imageUrl,
            className: "image-icon",
            iconSize: [100, 60],
            iconAnchor: [50, 50],
            popupAnchor: [0, -40],
        });

        // create marker and add to map
        let marker = L.marker([this.lat, this.lng], { icon: myIcon }).addTo(Map);

        const idMarker = marker._leaflet_id;

        // add popup when click on photo
        marker.bindPopup(`
            <div style="text-align: center;">
            <div style="text-transform: uppercase; font-weight: bold;">${this.title} id: ${idMarker}<div>
            </div>
        `);

        function centerOnMarker(e, Zoom = 18) {
            Map.setView(e.target.getLatLng(), Zoom);
        }
        
        // click on marker center marker on map
        marker.on("click", centerOnMarker);
    }
}

/*
const points = [
    {
        lat: 52.228785157729114,
        lng: 21.006867885589603,
        title: "Lviv",
        image: "https://grzegorztomicki.pl/images/lwow/576/IMG_0202.jpg",
    },
    {
        lat: 52.22923201880194,
        lng: 21.00897073745728,
        title: "China",
        image: "https://grzegorztomicki.pl/images/chiny/576/IMG_8413.jpg",
    },
    {
        lat: 52.22963944703663,
        lng: 21.01091265678406,
        title: "Morocco",
        image: "https://grzegorztomicki.pl/images/maroko/576/IMG_0738.jpg",
    },
    {
        lat: 52.229928587386496,
        lng: 21.01218938827515,
        title: "Israel",
        image: "https://grzegorztomicki.pl/images/izrael/576/IMG_2071.jpg",
    },
];
*/
