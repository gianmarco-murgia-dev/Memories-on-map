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