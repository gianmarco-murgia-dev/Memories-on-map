class SearchButton {
  static buildSearchButton(Map) {
    const buttonTemplate = `<div class="leaflet-search"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path></svg></div><div class="auto-search-wrapper max-height"><input type="text" id="marker" autocomplete="off"  aria-describedby="instruction" aria-label="Search ..." /><div id="instruction" class="hidden">When autocomplete results are available use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.</div></div>`;

    // create custom button
    const searchControl = L.Control.extend({
      // button position
      options: {
        position: "topleft",
        className: "leaflet-autocomplete",
      },

      // method
      onAdd: function () { return this._initialLayout(); },

      _initialLayout: function () {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar " + this.options.className
        );

        L.DomEvent.disableClickPropagation(container);

        container.innerHTML = buttonTemplate;

        return container;
      },
    });

    Map.addControl(new searchControl());

    // input element
    const root = document.getElementById("marker");

    function addClassToParent() {
      const searchBtn = document.querySelector(".leaflet-search");
      searchBtn.addEventListener("click", (e) => {
        // toggle class
        e.target
          .closest(".leaflet-autocomplete")
          .classList.toggle("active-autocomplete");

        // add placeholder
        root.placeholder = "Search ...";

        // focus on input
        root.focus();

        // click on clear button
        clickOnClearButton();
      });
    }

    // function click on clear button
    function clickOnClearButton() {
      document.querySelector(".auto-clear").click();
    }

    addClassToParent();

    // function clear input
    Map.on("click", () => {
      document
        .querySelector(".leaflet-autocomplete")
        .classList.remove("active-autocomplete");

      clickOnClearButton();
    });

    // autocomplete section
    // more config find in https://github.com/tomickigrzegorz/autocomplete
    // --------------------------------------------------------------

    new Autocomplete("marker", {
      delay: 200,
      selectFirst: true,
      howManyCharacters: 2,

      onSearch: function ({ currentValue }) {
        const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&q=${encodeURI(
          currentValue
        )}`;

        /**
         * Promise
         */
        return new Promise((resolve) => {
          fetch(api)
            .then((response) => response.json())
            .then((data) => {
              resolve(data.features);
            })
            .catch((error) => {
              console.error(error);
            });
        });
      },

      onResults: ({ currentValue, matches, template }) => {
        const regex = new RegExp(currentValue, "i");
        // checking if we have results if we don't
        // take data from the noResults method
        return matches === 0
          ? template
          : matches
            .map((element) => {
              return `
                <li role="option">
                  <p>${element.properties.display_name.replace(
                regex,
                (str) => `<b>${str}</b>`
              )}</p>
                </li> `;
            })
            .join("");
      },

      onSubmit: ({ object }) => {
        var Zoom = 8;
        var ShowMarkerOnSearch = false;
        const { display_name } = object.properties;
        const cord = object.geometry.coordinates;

        if (ShowMarkerOnSearch) {
          // custom id for marker
          // const customId = Math.random();

          // remove last marker
          Map.eachLayer(function (layer) {
            if (layer.options && layer.options.pane === "markerPane") {
              if (layer._icon.classList.contains("leaflet-marker-locate")) {
                Map.removeLayer(layer);
              }
            }
          });

          // add marker
          const marker = L.marker([cord[1], cord[0]], {
            title: display_name,
          });

          // add marker to map
          marker.addTo(Map).bindPopup(display_name);


          // add class to marker
          L.DomUtil.addClass(marker._icon, "leaflet-marker-locate");
        }
        // set marker to coordinates
        //Map.setView([cord[1], cord[0]], 8);
        Map.flyTo([cord[1], cord[0]], Zoom);
      },

      // the method presents no results
      noResults: ({ currentValue, template }) =>
        template(`<li>No results found: "${currentValue}"</li>`),
    });

  }
}