/* global google */
import React, { useState, useEffect, useRef } from "react";
import { GoogleMapsProvider, useGoogleMap, useDirectionsService } from '@ubilabs/google-maps-react-hooks';
import { useFavorites } from './FavoritesContext'; // Importação do contexto de favoritosmpo
import example from "../assets/example_rotaColeta.js";
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
  const { favorites, colectAreas, trashColectAreas, trashStatus, } = useFavorites(); // Uso do contexto de favoritos
  const { zoomLevel } = useFavorites();
  const selectedArea = useFavorites().selectedArea;

  return (
    <GoogleMapsProvider
      googleMapsAPIKey="AIzaSyDkCadcGmYqC47tyi5UW-_VpNdmV10Mpwk"
      mapOptions={{ ...mapOptions, zoom: zoomLevel }}
      mapContainer={mapContainer}
    >
      <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
      <Location favorites={favorites} colectAreas={colectAreas} selectedArea={selectedArea} trashColectAreas={trashColectAreas} trashStatus={trashStatus} />
    </GoogleMapsProvider>
  );
}

function Location({ favorites, colectAreas, selectedArea, trashColectAreas, trashStatus }) {

  trashStatus = example
 
  const map = useGoogleMap();

  const markerRef = useRef(null);

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
      if (area.status == "full") { icon = trash_red }
      else if (area.status == "medium") { icon =  trash_yellow}
      else if (area.status == "empty") { icon =  trash_green}

      new google.maps.Marker({
        map,
        position: { lat: parseFloat(area.latitude), lng: parseFloat(area.longitude) },
        icon: icon // ou a URL para seu ícone personalizado
      });
    });
  }, [favorites, trashStatus, map]);

  // Visualização das rotas

  const { directionsService, directionsRenderer } = useDirectionsService({
    renderOnMap: true, // Se deseja renderizar as direções no mapa
    renderOptions: {
      suppressMarkers: true,// Aqui você pode definir opções de renderização para o DirectionsRenderer, se necessário
    },
  });

  useEffect(() => {
    if (typeof window.google === "undefined" || !map || !markerRef.current) return;
    if (selectedArea && selectedArea.latitude && selectedArea.longitude && selectedArea.nome) {

      const trashBinWaypoints = []

      trashStatus.forEach((bin) => {
        if (bin.areacoleta == selectedArea.nome) {
          if (bin.status !== "empty") {
            const latlon = new google.maps.LatLng(bin.latitude, bin.longitude)
            let binLocation = {
              location: latlon
            }
            trashBinWaypoints.push(binLocation)
          }
        }
      });

      const originCoords = new google.maps.LatLng(
        parseFloat(selectedArea.latitude),
        parseFloat(selectedArea.longitude)
      );

      const destinationCoords = new google.maps.LatLng(
        parseFloat(selectedArea.latitude),
        parseFloat(selectedArea.longitude)
      );

      const routeRequest = {
        origin: originCoords,
        destination: destinationCoords,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        waypoints: trashBinWaypoints
      };

      // Verifique se directionsRenderer está definido e não é nulo antes de usar setDirections
      if (directionsRenderer) {
        // Envia a solicitação para o Directions Service
        directionsService.route(routeRequest, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            // Define a rota no Directions Renderer para exibi-la no mapa
            directionsRenderer.setDirections(response);
          } else {
            console.error("Error calculating directions:", status);
          }
        });
      } else {
        console.error("directionsRenderer is not defined or is null.");
      }
    }
  }, [map, directionsService, directionsRenderer, selectedArea]);

  return (
    <div></div>
  );
}


export default NewMapArea;
