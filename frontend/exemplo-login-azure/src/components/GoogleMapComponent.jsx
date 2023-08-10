import React, { useEffect } from 'react';
import customIcon from '../assets/trash.png';

function GoogleMapComponent() {
  useEffect(() => {
    function initMap() {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(-8.0522, -34.9286), 
        zoom: 16,
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
      ];

      for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
          position: features[i].position,
          icon: icons[features[i].type].icon,
          map: map,
        });
      }
    }

    window.initMap = initMap;

    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC7wmmdu6ma7gtXlxsrw2aKwPiTbi46OLY&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpeza ao desmontar o componente
      document.body.removeChild(script);
    }

  }, []);

  return (
    <div id="map" style={{ height: '700px', width: '100%' }}></div>
  );
}

export default GoogleMapComponent;
