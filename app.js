(function () {
  if (typeof MAPBOX_TOKEN === "undefined") {
    document.getElementById("config-warning").hidden = false;
    throw new Error("config.js 未載入，請依照 config.example.js 建立。");
  }

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    style: typeof MAPBOX_STYLE_URL !== "undefined"
      ? MAPBOX_STYLE_URL
      : "mapbox://styles/mapbox/streets-v11",
    center: [121.5654, 25.033],
    zoom: 12,
  });

  const landNumberField =
    typeof LAND_NUMBER_PROPERTY !== "undefined" ? LAND_NUMBER_PROPERTY : "land_number";
  const landNameField =
    typeof LAND_NAME_PROPERTY !== "undefined" ? LAND_NAME_PROPERTY : "land_name";

  let popup = null;
  let parcelsReady = false;
  const wmsTileUrl = typeof WMS_TILE_URL !== "undefined" ? WMS_TILE_URL : "";

  function updateDetails(feature) {
    const detailCard = document.getElementById("feature-details");
    detailCard.hidden = !feature;

    if (!feature) return;

    const props = feature.properties || {};
    document.getElementById("detail-number").textContent = props[landNumberField] || "—";
    document.getElementById("detail-name").textContent = props[landNameField] || "—";
  }

  function zoomToFeature(feature) {
    const geometry = feature.geometry;
    if (!geometry) return;

    if (geometry.type === "Point") {
      map.flyTo({ center: geometry.coordinates, zoom: 16 });
    } else {
      const bounds = new mapboxgl.LngLatBounds();
      const coords = geometry.type === "Polygon" ? geometry.coordinates : geometry.coordinates.flat(1);
      coords.flat(Infinity).forEach((value, idx, arr) => {
        if (idx % 2 === 0) {
          bounds.extend([arr[idx], arr[idx + 1]]);
        }
      });
      map.fitBounds(bounds, { padding: 32 });
    }
  }

  function handleFeatureSelection(feature, lngLat) {
    if (!feature) return;

    updateDetails(feature);

    if (popup) popup.remove();
    popup = new mapboxgl.Popup({ closeButton: true })
      .setLngLat(lngLat || map.getCenter())
      .setHTML(
        `<h3>${feature.properties?.[landNameField] || "—"}</h3>
         <p>地段號：${feature.properties?.[landNumberField] || "—"}</p>`
      )
      .addTo(map);
  }

  function addLayers() {
    if (wmsTileUrl) {
      map.addSource("nlsc-wms", {
        type: "raster",
        tiles: [wmsTileUrl],
        tileSize: 256,
        attribution:
          "<a href=\"https://maps.nlsc.gov.tw/\" target=\"_blank\">NLSC</a>",
      });

      map.addLayer({
        id: "nlsc-wms-layer",
        type: "raster",
        source: "nlsc-wms",
        paint: {
          "raster-opacity": 0.85,
        },
      });
    }

    map.addSource("land-parcels", {
      type: "geojson",
      data: LAND_API_URL,
    });

    map.addLayer({
      id: "land-parcel-fill",
      type: "fill",
      source: "land-parcels",
      paint: {
        "fill-color": "#ff6b6b",
        "fill-opacity": 0.35,
      },
    });

    map.addLayer({
      id: "land-parcel-outline",
      type: "line",
      source: "land-parcels",
      paint: {
        "line-color": "#ff9f43",
        "line-width": 1.2,
      },
    });

    parcelsReady = true;
  }

  map.on("load", addLayers);

  map.on("click", "land-parcel-fill", (e) => {
    const feature = e.features && e.features[0];
    handleFeatureSelection(feature, e.lngLat);
  });

  map.on("mouseenter", "land-parcel-fill", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "land-parcel-fill", () => {
    map.getCanvas().style.cursor = "";
  });

  document.getElementById("land-number-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const value = event.target.landNumber.value.trim();
    if (!value || !parcelsReady) return;

    const matches = map.querySourceFeatures("land-parcels", {
      filter: ["==", ["get", landNumberField], value],
    });

    if (!matches.length) {
      updateDetails(null);
      if (popup) popup.remove();
      alert(`找不到地段號為 ${value} 的地塊。`);
      return;
    }

    const target = matches[0];
    zoomToFeature(target);
    handleFeatureSelection(target);
  });
})();
