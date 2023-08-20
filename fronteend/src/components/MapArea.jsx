/* global google */

import React, { useEffect } from 'react';
import customIcon from '../assets/trash.png';

function GoogleMapComponent() {
  useEffect(() => {
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(-8.0522, -34.9286), // Centro de Recife
        zoom: 16,
        mapTypeControl: false,  // Remove o controle de troca entre mapa e satélite
        streetViewControl: false 
      });

      const icons = {
        custom: {
          icon: customIcon
        },
      };

      const features = [
        {
          position: new google.maps.LatLng(-8.0512, -34.9296),
          type: "custom",
        },
        {
          position: new google.maps.LatLng(-8.0712, -34.9296),
          type: "custom",
        },
        {
          position: new google.maps.LatLng(-8.0512, -34.9396),
          type: "custom",
        },
        {
          position: new google.maps.LatLng(-8.0612, -34.9396),
          type: "custom",
        },
        
        
      ];

      for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
          position: features[i].position,
          icon: icons[features[i].type].icon,
          map: map,
        });
      }
    }

    if(!window.google) {
      window.initMap = initMap;
      
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7wmmdu6ma7gtXlxsrw2aKwPiTbi46OLY&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
      
      // Removerá o script apenas se ele foi adicionado por este componente
      return () => {
        document.body.removeChild(script);
      }
    } else {
      initMap();
    }

  }, []);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
}

export default GoogleMapComponent;
