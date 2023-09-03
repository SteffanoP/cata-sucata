/* global google */
import React, { useState, useEffect, useRef } from "react";
import { GoogleMapsProvider, useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { useFavorites } from './FavoritesContext'; // Importação do contexto de favoritos
import trashIcon from "../assets/trash.png";

const mapOptions = {
    zoom: 12,
    center: {
        lat: -8.0522,
        lng: -34.9286
    },
};

function NewMapArea() {
    const [mapContainer, setMapContainer] = useState(null);
    const { favorites, colectAreas } = useFavorites(); // Uso do contexto de favoritos

    return (
        <GoogleMapsProvider 
            googleMapsAPIKey="AIzaSyC7wmmdu6ma7gtXlxsrw2aKwPiTbi46OLY"
            mapOptions={mapOptions}
            mapContainer={mapContainer}
        >
            <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
            <Location favorites={favorites} colectAreas={colectAreas} />
        </GoogleMapsProvider>
    );
}

function Location({ favorites, colectAreas }) {
    const [lat, setLat] = useState(-8.0);
    const [lng, setLng] = useState(-34.9);
    const map = useGoogleMap();
    const markerRef = useRef(null);

    useEffect(() => {
      if (typeof window.google === "undefined" || !map || markerRef.current) return;
      markerRef.current = new google.maps.Marker({
        map,
        icon: trashIcon // ou a URL para seu ícone personalizado
      });
    }, [map]);
    
    useEffect(() => {
      if (typeof window.google === "undefined" || !markerRef.current) return;
      if (isNaN(lat) || isNaN(lng)) return;
      markerRef.current.setPosition({ lat, lng });
      map.panTo({ lat, lng });
    }, [lat, lng, map]);
    
    useEffect(() => {
      if (typeof window.google === "undefined" || !map) return;
      
      favorites.forEach((fav) => {
        new google.maps.Marker({
          map,
          position: { lat: parseFloat(fav.latitude), lng: parseFloat(fav.longitude) },
          icon: trashIcon // ou a URL para seu ícone de favorito
        });
      });

      // Adicionando markers para colectAreas
      colectAreas.forEach((area) => {
        new google.maps.Marker({
          map,
          position: { lat: parseFloat(area.latitude), lng: parseFloat(area.longitude) },
          icon: trashIcon // ou a URL para seu ícone personalizado
        });
      });
    }, [favorites, colectAreas, map]);

    return (
        <div></div>
    );
}

// Isso abaixo é apenas um teste que estou trabalhando
// const weatherData = {
//   A: {
//     name: "Toronto",
//     position: { lat: 43.66293, lng: -79.39314 },
//     climate: "Raining",
//     temp: 20,
//     fiveDay: [15, 18, 12, 22, 20],
//   },
//   B: {
//     name: "Guelph",
//     position: { lat: 43.544811, lng: -80.248108 },
//     climate: "Cloudy",
//     temp: 20,
//     fiveDay: [15, 18, 12, 22, 20],
//   },
//   C: {
//     name: "Orangeville",
//     position: { lat: 43.919239, lng: -80.097412 },
//     climate: "Sunny",
//     temp: 20,
//     fiveDay: [15, 18, 12, 22, 20],
//   },
// };

// function Weather({ map }) {
//   const [data, setData] = useState(weatherData);
//   // const [highlight, setHighlight] = useState();
//   // const [editing, setEditing] = useState();

//   return(
//     <>
//       {Object.entries(data).map(([key, weather]) => (
//         <Marker key={key} map={map} position={weather.position}>
//           <div className={'marker'}>
//             <h2>{weather.climate}</h2>
//           </div>
//         </Marker>
//       ))}
//     </>
//   );
// }

// function Marker({ map, children, position }) {
//   const markerRef = useRef();
//   const rootRef = useRef();

//   useEffect(() => {
//     if (!rootRef.current) {
//       const container = document.createElement("div");
//       rootRef.current = createRoot(container);

//       markerRef.current = new google.maps.Marker({
//         position,
//         content: container,
//       });
//     }
//     return () => (markerRef.current.map = null);
//   }, []);

//   useEffect(() => {
//     rootRef.current.render(children);
//     markerRef.current.position = position;
//     markerRef.current.map = map;
//     //const listener = markerRef.current.addListener("click", onClick);
//     //return () => listener.remove();
//   }, [map, position, children]);
// }

// function Location() {
//   const [lat, setLat] = useState(-8.0522);
//   const [lng, setLng] = useState(-34.9286);
//   const map = useGoogleMap();
//   const markerRef = useRef();

//   useEffect(() => {
//     if (map && !window.google) {
//       console.error("Google Maps API não carregada");
//       return;
//     }

//     if (map && !markerRef.current) {
//       markerRef.current = new google.maps.Marker({
//         position: { lat, lng },
//         map: map,
//       });
//     }
//   }, [map, lat, lng]);

//   useEffect(() => {
//     if (markerRef.current && !isNaN(lat) && !isNaN(lng)) {
//       markerRef.current.setPosition(new google.maps.LatLng(lat, lng));
//       map.panTo(new google.maps.LatLng(lat, lng));
//     }
//   }, [lat, lng, map]);

//   return (
//     <div className="lat-lng">
//       {/* <input
//         type="number"
//         value={lat}
//         onChange={(event) => setLat(parseFloat(event.target.value))}
//         step={0.01}
//       />
//       <input
//         type="number"
//         value={lng}
//         onChange={(event) => setLng(parseFloat(event.target.value))}
//         step={0.01}
//       /> */}
//     </div>
//   );
// }

export default NewMapArea;
