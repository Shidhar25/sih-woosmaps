let map: woosmap.map.Map;

function initMap(): void {
  console.log("init map");
  map = new window.woosmap.map.Map(
    document.getElementById("map") as HTMLElement,
    {},
  );

  const conf: woosmap.map.IndoorRendererOptions = {
    defaultFloor: 0, //Render map with default floor
    venue: "gdn_doc",
    responsive: "desktop",
  };

  const widgetConf: woosmap.map.IndoorWidgetOptions = {
    units: "metric", // Define the distance unit for route distance calculation
  };

  const indoorRenderer = new woosmap.map.IndoorWidget(widgetConf, conf);

  indoorRenderer.setMap(map);

  // Indoor event that is triggered when the user click on a POI.
  indoorRenderer.addListener(
    "indoor_feature_selected",
    (feature: woosmap.map.GeoJSONFeature) => {
      console.log("Feature: ", feature);
    },
  );

  // Indoor event that is triggered when the indoor venue is loaded.
  indoorRenderer.addListener(
    "indoor_venue_loaded",
    (venue: woosmap.map.Venue) => {
      console.log("Venue: ", venue);

      map.fitBounds(
        new woosmap.map.LatLngBounds(
          { lat: 3.9217, lng: 43.60675 },
          { lat: 3.9218, lng: 43.60665 },
        ),
      );
      hideLoader();
    },
  );
}

const hideLoader = () => {
  (document.querySelector(".progress") as HTMLElement).remove();
};

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;

export {};
