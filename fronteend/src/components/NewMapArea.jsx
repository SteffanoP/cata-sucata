/* global google */
import React, { useState, useEffect, useRef } from "react";
import { GoogleMapsProvider, useGoogleMap } from "@ubilabs/google-maps-react-hooks";

const mapOptions = {
  zoom: 12,
  center: {
    lat: -8.0522,
    lng: -34.9286,
  },
};

function NewMapArea() {
  const [mapContainer, setMapContainer] = useState(null);

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="AIzaSyC7wmmdu6ma7gtXlxsrw2aKwPiTbi46OLY"
      mapOptions={mapOptions}
      mapContainer={mapContainer}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
      <Location />
    </GoogleMapsProvider>
  );
}

function Location() {
  const [lat, setLat] = useState(-8.0522);
  const [lng, setLng] = useState(-34.9286);
  const map = useGoogleMap();
  const markerRef = useRef();

  useEffect(() => {
    if (map && !window.google) {
      console.error("Google Maps API não carregada");
      return;
    }

    if (map && !markerRef.current) {
      markerRef.current = new google.maps.Marker({
        position: { lat, lng },
        map: map,
      });
    }
  }, [map, lat, lng]);

  useEffect(() => {
    if (markerRef.current && !isNaN(lat) && !isNaN(lng)) {
      markerRef.current.setPosition(new google.maps.LatLng(lat, lng));
      map.panTo(new google.maps.LatLng(lat, lng));
    }
  }, [lat, lng, map]);

  return (
    <div className="lat-lng">
      <input
        type="number"
        value={lat}
        onChange={(event) => setLat(parseFloat(event.target.value))}
        step={0.01}
      />
      <input
        type="number"
        value={lng}
        onChange={(event) => setLng(parseFloat(event.target.value))}
        step={0.01}
      />
    </div>
  );
}

export default NewMapArea;
