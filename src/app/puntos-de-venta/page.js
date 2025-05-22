// src/app/puntos-de-venta/page.js
"use client";

import React, { useState, useEffect } from 'react';
import MapDisplay from '@/components/MapDisplay'; // Asegúrate que la ruta sea correcta
import { DUMMY_LOCATIONS } from '@/data/locations'; // Asegúrate que la ruta sea correcta
import styles from './puntosDeVenta.module.css'; // Tu archivo de estilos
import Link from 'next/link'; // Para los enlaces de "Volver" en caso de error

export default function PuntosDeVentaPage() {
  const [allLocations] = useState(DUMMY_LOCATIONS);
  const [filteredLocations, setFilteredLocations] = useState(DUMMY_LOCATIONS);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  
  const [mapCenter, setMapCenter] = useState(
    DUMMY_LOCATIONS.length > 0
      ? { lat: DUMMY_LOCATIONS[0].lat, lng: DUMMY_LOCATIONS[0].lng }
      : { lat: -34.603722, lng: -58.381592 } // Buenos Aires como fallback
  );
  const [mapZoom, setMapZoom] = useState(10); // Zoom inicial del mapa

  // Estado para la ubicación seleccionada (para el InfoWindow)
  const [activeLocation, setActiveLocation] = useState(null);

  // Efecto para extraer las provincias únicas de nuestras ubicaciones
  useEffect(() => {
    if (allLocations && allLocations.length > 0) {
      const uniqueProvinces = [...new Set(allLocations.map(loc => loc.province))].sort();
      setProvinces(uniqueProvinces);

      // Ajustar el zoom inicial si hay varias provincias/ubicaciones y no hay filtro activo
      if (!selectedProvince) {
        if (uniqueProvinces.length > 1) {
          setMapZoom(6); // Zoom más alejado si hay múltiples provincias
          setMapCenter({ lat: -38.416097, lng: -63.616672 }); // Centro de Argentina
        } else if (allLocations.length === 1) {
          setMapZoom(13); // Zoom más cercano si solo hay una ubicación
          setMapCenter({ lat: allLocations[0].lat, lng: allLocations[0].lng });
        } else if (allLocations.length > 0) {
           setMapCenter({ lat: allLocations[0].lat, lng: allLocations[0].lng });
           setMapZoom(10); // Un zoom intermedio si hay varias ubicaciones en una sola provincia
        }
      }
    }
  }, [allLocations, selectedProvince]); // Depende de allLocations y selectedProvince para reajustar zoom/centro inicial

  // Manejador para el cambio en el selector de provincia
  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setActiveLocation(null); // Cerramos cualquier InfoWindow al cambiar de provincia

    if (province === "") {
      setFilteredLocations(allLocations);
      // Reajustar centro y zoom para "Todas las Provincias"
      if (allLocations.length > 1 && provinces.length > 1) {
        setMapCenter({ lat: -38.416097, lng: -63.616672 });
        setMapZoom(6);
      } else if (allLocations.length > 0) {
        setMapCenter({ lat: allLocations[0].lat, lng: allLocations[0].lng });
        setMapZoom(10);
      }
    } else {
      const filtered = allLocations.filter(loc => loc.province === province);
      setFilteredLocations(filtered);
      if (filtered.length > 0) {
        setMapCenter({ lat: filtered[0].lat, lng: filtered[0].lng });
        setMapZoom(12);
      } else {
        // Si no hay resultados para la provincia, podemos centrar en una vista general
        setMapCenter({ lat: -38.416097, lng: -63.616672 });
        setMapZoom(4);
      }
    }
  };

  // Se llama al hacer clic en un ítem de la lista O en un marcador del mapa
  const handleLocationSelect = (location) => {
    if (activeLocation && activeLocation.id === location.id) {
      setActiveLocation(null); // Si se clica el mismo, se deselecciona (cierra InfoWindow)
    } else {
      setActiveLocation(location);
      setMapCenter({ lat: location.lat, lng: location.lng }); // Centra en la ubicación
      setMapZoom(15); // Zoom más cercano al seleccionar
    }
  };
  
  // Se llama cuando se cierra el InfoWindow desde el mapa (clic en mapa o 'x' del InfoWindow)
  const handleMapInteractionClose = () => {
    setActiveLocation(null);
  };

  return (
    <div className={`container-fluid py-4 ${styles.pageContainer || ''}`}>
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Puntos de Venta</h1>
        <p className="lead">
          Encuentra nuestras herramientas y distribuidores autorizados cerca de ti.
        </p>
      </div>

      <div className={styles.redBackgroundContainer}>
        <div className="row align-items-stretch">
          
          <div className="col-lg-4 col-md-5 mb-4 mb-md-0 d-flex flex-column">
            <div className="mb-4 p-3 bg-light rounded shadow-sm">
              <label htmlFor="province-filter" className={`form-label fw-bold ${styles.filterLabel || ''}`}>
                Filtrar por Provincia:
              </label>
              <select
                id="province-filter"
                className="form-select form-select-lg"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option value="">Todas las Provincias</option>
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
            
            <div className={`${styles.listSectionWrapper} flex-grow-1 d-flex flex-column`}>
              <h2 className={`h5 mb-2 ${styles.listTitle || ''}`}> 
                Direcciones {selectedProvince ? `en ${selectedProvince}` : '(Todas)'}:
              </h2>
              {filteredLocations.length > 0 ? (
                <div className={styles.locationListScrollable}>
                  <ul className="list-group">
                    {filteredLocations.map(loc => (
                      <li
                        key={loc.id}
                        className={`list-group-item list-group-item-action ${styles.locationItem || ''} ${activeLocation && activeLocation.id === loc.id ? styles.activeLocationItem || 'active' : ''}`}
                        onClick={() => handleLocationSelect(loc)}
                        style={{ cursor: 'pointer' }}
                      >
                        <strong className={styles.locationName || ''}>{loc.name}</strong>
                        <p className={`${styles.locationAddressMb0 || ''} mb-0`}><small>{loc.address} ({loc.province})</small></p>
                        {loc.phone && <p className={`${styles.locationPhoneMb0 || ''} mb-0`}><small>Tel: {loc.phone}</small></p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className={`text-center text-muted mt-3 ${styles.noResultsText || ''}`}>
                  No se encontraron puntos de venta para la selección actual.
                </p>
              )}
            </div>
          </div>

          <div className="col-lg-8 col-md-7 d-flex">
            <div className={`${styles.mapWrapper} flex-grow-1`}>
              <MapDisplay
                initialCenter={mapCenter}
                zoomLevel={mapZoom}
                locations={filteredLocations}
                selectedLocation={activeLocation}
                onMarkerClick={handleLocationSelect}
                onInfoWindowClose={handleMapInteractionClose}
                onMapClick={handleMapInteractionClose} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}