/* global google */

import { React, useState, useEffect, useRef } from "react";
import { GoogleMapsProvider, useGoogleMap } from '@ubilabs/google-maps-react-hooks';

const mapOptions = {
    zoom: 12,
    center: {
        lat: -8.0522,
        lng: -34.9286
    },
};

function NewMapArea() {
    const[mapContainer, setMapContainer] = useState(null);
    
    return(
        <GoogleMapsProvider googleMapsAPIKey="AIzaSyC7wmmdu6ma7gtXlxsrw2aKwPiTbi46OLY"
            mapOptions={mapOptions}
            mapContainer={mapContainer}
        >
            <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }}/>
            <Location/>
        </GoogleMapsProvider>
    );
}

function Location(){
    const [lat, setLat] = useState(-8.0);
    const [lgn, setLgn] = useState(-34.9);
    const { map } = useGoogleMap();
    const markRef = useRef();

    useEffect(()=>{
        if (!map || markRef.current) return;
        markRef.current = new google.maps.Marker({ map });
    }, [map]); 

    useEffect(() => {
        if(!markRef.current) return;
        if(isNaN(lat) || isNaN(lgn)) return;
        markRef.current.setPosition({ lat, lgn });
        map.panTo({ lat, lgn });
        //console.log({lat, lgn});
    }, [lat, lgn, map]);

    return <div className ="lat-lng">
        <input type="number" 
        value={lat} 
        onChange={event => setLat(parseFloat(event.target.value))}
        step={0.01}
        />
        <input type="number" 
        value={lgn} 
        onChange={event => setLgn(parseFloat(event.target.value))}
        step={0.01}
        />
    </div>
}

export default NewMapArea;