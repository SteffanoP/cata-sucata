/* global google */
import { useEffect, useState, useRef } from "react";
import { useGoogleMap } from "@ubilabs/google-maps-react-hooks"; 

function Location({ lati, long }) {
    const [lat, setLat] = useState(-8.0522);
    const [lng, setLng] = useState(-34.9286);
    const map = useGoogleMap();
    const markerRef = useRef();

    console.log(lati, "e", long);
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
        {/* <input
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
        /> */}
      </div>
    );
}

export default Location;