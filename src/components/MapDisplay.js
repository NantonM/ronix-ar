// src/components/MapDisplay.js
"use client";

import React, { useState, useCallback } from 'react'; // Añadimos useState y useCallback
import { GoogleMap, LoadScriptNext, MarkerF, InfoWindowF } from '@react-google-maps/api'; // Añadimos InfoWindowF

const MapDisplay = ({ initialCenter, zoomLevel, locations, onMarkerClick: propagateMarkerClick, onMapClick: propagateMapClick }) => {
  const [selectedLocation, setSelectedLocation] = useState(null); // Para guardar la ubicación seleccionada

  const mapContainerStyle = {
    width: '100%',
    height: '100%', // Para que ocupe el 100% de su contenedor padre (.mapWrapper)
    minHeight: '450px',
    borderRadius: 'inherit',
  };

  const center = initialCenter || {
    lat: -34.603722,
    lng: -58.381592
  };

  const currentZoom = zoomLevel || 10;

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  };

  const apiKey = process.env.NEXT_PUBLIC_Maps_API_KEY;

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (propagateMarkerClick) {
      propagateMarkerClick(location); // Notificamos al componente padre
    }
  };

  const handleMapClick = () => {
    setSelectedLocation(null); // Cierra InfoWindow si se hace clic en el mapa
    if (propagateMapClick) {
      propagateMapClick(); // Notificamos al componente padre
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedLocation(null);
    if (propagateMapClick) { // Asumimos que clicar la X es como clicar el mapa para el padre
        propagateMapClick();
    }
  }


  if (!apiKey) {
    return (
      <div style={{padding: "20px", backgroundColor: "#fff3f3", border:"1px solid #ffcccc", borderRadius: "8px", textAlign: "center", color: "#555", height: "100%", display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <h4>⚠️ Error de Configuración del Mapa</h4>
        <p className="mb-1">La Clave API de Google Maps no está definida.</p>
        <p className="mb-0"><small>Verifica tu archivo <code>.env.local</code> (<code>NEXT_PUBLIC_Maps_API_KEY</code>) y reinicia el servidor.</small></p>
      </div>
    );
  }

  return (
    <LoadScriptNext
      googleMapsApiKey={apiKey}
      loadingElement={<div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0'}}>Cargando mapa...</div>}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={currentZoom}
        options={mapOptions}
        onClick={handleMapClick} // Manejador para clic en el mapa
      >
        {locations && locations.map(location => (
          <MarkerF
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
            onClick={() => handleMarkerClick(location)} // Manejador para clic en el marcador
          />
        ))}

        {selectedLocation && (
          <InfoWindowF
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            onCloseClick={handleInfoWindowClose} // Manejador para cierre del InfoWindow
            options={{
              pixelOffset: new window.google.maps.Size(0, -35) // Ajusta la posición del InfoWindow
            }}
          >
            <div>
              <h6>{selectedLocation.name}</h6>
              <p style={{fontSize: '0.85rem', marginBottom: '0.25rem'}}>{selectedLocation.address}</p>
              {selectedLocation.phone && <p style={{fontSize: '0.85rem', marginBottom: '0'}}><small>Tel: {selectedLocation.phone}</small></p>}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapDisplay;