let map: woosmap.map.Map;

function initMap(): void {
  console.log("init map");

  // Configure map with blank style
  const mapOptions: woosmap.map.MapOptions = {
    center: { lat: 18.5288, lng: 73.8739 }, // Initial center of the map
    zoom: 19, // Initial zoom level
    
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [
          { visibility: "off" }, // Hides all geometries
        ],
      },
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          { visibility: "off" }, // Hides all labels
        ],
      },
    ],
  };

  map = new window.woosmap.map.Map(
    document.getElementById("map") as HTMLElement,
    mapOptions
  );

  const conf: woosmap.map.IndoorRendererOptions = {
    defaultFloor: 0, // Render map with default floor
    venue: "gdn_doc",
    responsive: "desktop",
  };

  const widgetConf: woosmap.map.IndoorWidgetOptions = {
    units: "metric", // Define the distance unit for route distance calculation
  };

  const indoorRenderer = new woosmap.map.IndoorWidget(widgetConf, conf);

  indoorRenderer.setMap(map);

  // Indoor event that is triggered when the indoor venue is loaded.
  indoorRenderer.addListener(
    "indoor_venue_loaded",
    (venue: woosmap.map.Venue) => {
      console.log("Venue: ", venue);

      // Check if setTilt and setHeading methods are available
      if (typeof map.setTilt === 'function' && typeof map.setHeading === 'function') {
        map.setTilt(60); // Set tilt to 60 degrees for a dramatic angle
        map.setHeading(90); // Set heading to 90 degrees (east-facing)
      } else {
        console.warn("setTilt or setHeading method is not available on the map object.");
      }

      map.fitBounds(
        new woosmap.map.LatLngBounds(
          { lat: 18.52865916985, lng: 73.87381378802 },
          { lat: 18.52899162937, lng: 73.8739565355 }
        )
      );
      hideLoader();
    }
  );

  // Indoor event that is triggered when the user clicks on a POI.
  indoorRenderer.addListener(
    "indoor_feature_selected",
    (feature: woosmap.map.GeoJSONFeature) => {
      console.log("Feature: ", feature);
    }
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
