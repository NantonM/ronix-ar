// src/app/puntos-de-venta/page.js
"use client";

import React, { useState, useEffect } from 'react';
import MapDisplay from '@/components/MapDisplay';
import { DUMMY_LOCATIONS } from '@/data/locations';
import styles from './puntosDeVenta.module.css';
import Link from 'next/link'; // Aunque no se use explícitamente aquí, buena práctica tenerlo si es una página.

export default function PuntosDeVentaPage() {
  const [allLocations] = useState(DUMMY_LOCATIONS);
  const [filteredLocations, setFilteredLocations] = useState(DUMMY_LOCATIONS);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  
  const [mapCenter, setMapCenter] = useState(
    DUMMY_LOCATIONS.length > 0
      ? { lat: DUMMY_LOCATIONS[0].lat, lng: DUMMY_LOCATIONS[0].lng }
      : { lat: -34.603722, lng: -58.381592 } 
  );
  const [mapZoom, setMapZoom] = useState(10);

  useEffect(() => {
    const uniqueProvinces = [...new Set(allLocations.map(loc => loc.province))].sort();
    setProvinces(uniqueProvinces);
    if (allLocations.length > 1 && uniqueProvinces.length > 1) {
      setMapZoom(6); 
      setMapCenter({ lat: -38.416097, lng: -63.616672 }); // Centro de Argentina
    } else if (allLocations.length === 1) {
      setMapZoom(13); 
    }
  }, [allLocations]); // Este effect se corre una vez ya que allLocations no cambia

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);

    if (province === "") {
      setFilteredLocations(allLocations);
      setMapCenter(allLocations.length > 0 ? { lat: allLocations[0].lat, lng: allLocations[0].lng } : { lat: -38.416097, lng: -63.616672 });
      setMapZoom(allLocations.length > 1 && provinces.length > 1 ? 6 : 10);
    } else {
      const filtered = allLocations.filter(loc => loc.province === province);
      setFilteredLocations(filtered);
      if (filtered.length > 0) {
        setMapCenter({ lat: filtered[0].lat, lng: filtered[0].lng });
        setMapZoom(12);
      } else {
        setMapCenter({ lat: -38.416097, lng: -63.616672 }); // Centro de Argentina si no hay resultados
        setMapZoom(4);
      }
    }
  };

  const handleLocationItemClick = (location) => {
    setMapCenter({ lat: location.lat, lng: location.lng });
    setMapZoom(15); 
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
        <div className="row align-items-stretch"> {/* align-items-stretch para que las columnas intenten igualar altura */}
          
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

            <div className={`${styles.listSectionWrapper} flex-grow-1 d-flex flex-column`}> {/* flex-grow-1 para que crezca y d-flex para el scrollable */}
              <h2 className={`h5 mb-2 ${styles.listTitle || ''}`}> 
                Direcciones {selectedProvince ? `en ${selectedProvince}` : '(Todas)'}:
              </h2>
              {filteredLocations.length > 0 ? (
                <div className={styles.locationListScrollable}>
                  <ul className="list-group">
                    {filteredLocations.map(loc => (
                      <li
                        key={loc.id}
                        className={`list-group-item list-group-item-action ${styles.locationItem || ''}`}
                        onClick={() => handleLocationItemClick(loc)}
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

          <div className="col-lg-8 col-md-7 d-flex"> {/* d-flex para que .mapWrapper pueda usar flex-grow-1 */}
            <div className={`${styles.mapWrapper} flex-grow-1`}> {/* flex-grow-1 para que ocupe el alto */}
              <MapDisplay
                initialCenter={mapCenter}
                zoomLevel={mapZoom}
                locations={filteredLocations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}