// src/components/MapDisplay.js
"use client";

import React from 'react';
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';

const MapDisplay = ({ initialCenter, zoomLevel, locations }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%', // Para que ocupe el 100% de su contenedor padre (.mapWrapper)
    minHeight: '450px', // Altura mínima
    borderRadius: 'inherit', // Hereda el border-radius del wrapper
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
      >
        {locations && locations.map(location => (
          <MarkerF
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
            // onClick={() => console.log(`${location.name} clicked`)}
          />
        ))}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default MapDisplay;