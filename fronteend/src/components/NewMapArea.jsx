/* global google */
import React, { useState, useEffect, useRef } from "react";
import { GoogleMapsProvider, useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { useFavorites } from './FavoritesContext'; // Importação do contexto de favoritos
import trash_red from "../assets/trash_red.png";
import trash_yellow from "../assets/trash_yellow.png";
import trash_green from "../assets/trash_green.png";
import trash_warning from "../assets/trash_warning.png";

const mapOptions = {
  zoom: 8,
  center: {
      lat: -8.0476,
      lng: -34.8770
  },
};


function NewMapArea() {
    const [mapContainer, setMapContainer] = useState(null);
    const { favorites, colectAreas, selectedArea, trashColectAreas, trashStatus } = useFavorites(); // Uso do contexto de favoritos
   
    const { zoomLevel } = useFavorites();
    return (
        <GoogleMapsProvider 
            googleMapsAPIKey="AIzaSyC7wmmdu6ma7gtXlxsrw2aKwPiTbi46OLY"
            mapOptions={{...mapOptions, zoom: zoomLevel }}
            mapContainer={mapContainer}
        >
            <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
            <Location favorites={favorites} colectAreas={colectAreas} selectedArea={selectedArea} trashColectAreas={trashColectAreas} trashStatus={trashStatus}/>
        </GoogleMapsProvider>
    );
}

function Location({ favorites, colectAreas, selectedArea, trashColectAreas, trashStatus }) {

    const map = useGoogleMap();
    const markerRef = useRef(null);
    
    // console.log(parseFloat(selectedArea.latitude));
    // console.log(parseFloat(selectedArea.longitude));
    
    useEffect(() => {
      if (typeof window.google === "undefined" || !map || markerRef.current) return;
      markerRef.current = new google.maps.Marker({
        map,
      });
    }, [map]);
    
    useEffect(() => {
      if (typeof window.google === "undefined" || !markerRef.current) return;
      if (selectedArea && selectedArea.latitude && selectedArea.longitude) {
        const newLat = parseFloat(selectedArea.latitude);
        const newLng = parseFloat(selectedArea.longitude);
        
        if (!isNaN(newLat) && !isNaN(newLng)) {
          markerRef.current.setPosition({ lat: newLat, lng: newLng });
          map.panTo({ lat: newLat, lng: newLng });
        }
      }
    }, [map, selectedArea]);
    
    useEffect(() => {
      if (typeof window.google === "undefined" || !map) return;
      
      favorites.forEach((fav) => {
        new google.maps.Marker({
          map,
          position: { lat: parseFloat(fav.latitude), lng: parseFloat(fav.longitude) },
          icon: trash_warning // ou a URL para seu ícone de favorito
        });
      });

      // Adicionando as lixeiras
      trashStatus.forEach((area) => {

        let icon = trash_warning
        if (area.status == "full") {icon = trash_red}
        else if (area.status == "medium") {icon = trash_green}
        else if (area.status == "empty") {icon = trash_yellow}

        new google.maps.Marker({
          map,
          position: { lat: parseFloat(area.latitude), lng: parseFloat(area.longitude) },
          icon: icon // ou a URL para seu ícone personalizado
        });
      });
    }, [favorites, trashStatus, map]);

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
