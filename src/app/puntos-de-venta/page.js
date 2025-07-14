"use client";

import React, { useState, useEffect } from 'react';
import MapDisplay from '@/components/MapDisplay';
import styles from './puntosDeVenta.module.css'; // Asegúrate de que este archivo se esté importando

export default function PuntosDeVentaPage() {
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [mapCenter, setMapCenter] = useState({ lat: -38.416097, lng: -63.616672 });
  const [mapZoom, setMapZoom] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para la ubicación activa (la que se seleccionó)
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    async function loadLocations() {
      // ... (tu lógica para cargar ubicaciones desde /api/locations) ...
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) throw new Error('No se pudieron cargar las ubicaciones.');
        const data = await response.json();
        setAllLocations(data);
        setFilteredLocations(data);
        const uniqueProvinces = [...new Set(data.map(loc => loc.province))].sort();
        setProvinces(uniqueProvinces);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadLocations();
  }, []);

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setActiveLocation(null); // Limpiar la selección al cambiar de provincia

    if (province === "all") {
      setFilteredLocations(allLocations);
      setMapCenter({ lat: -38.416097, lng: -63.616672 });
      setMapZoom(4);
    } else {
      const filtered = allLocations.filter(loc => loc.province === province);
      setFilteredLocations(filtered);
      if (filtered.length > 0) {
        setMapCenter({ lat: filtered[0].lat, lng: filtered[0].lng });
        setMapZoom(9);
      }
    }
  };

  const handleLocationItemClick = (location) => {
    setMapCenter({ lat: location.lat, lng: location.lng });
    setMapZoom(15);
    // Actualizamos el estado para saber qué ubicación está activa
    setActiveLocation(location); 
    // Log para depurar: verifica en la consola del navegador si esto se ejecuta
    console.log("Ubicación activa seteada:", location); 
  };

  const renderContent = () => {
    if (isLoading) { /* ... JSX de carga ... */ }
    if (error) { /* ... JSX de error ... */ }

    return (
      <div className="row">
        <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
          <div className="sticky-top" style={{top: '80px'}}>
            <div className={styles.filtersContent}>
              <h5 className="mb-3 fw-bold">Ubicaciones</h5>
              <div className="mb-4">
                <label htmlFor="province-filter" className="form-label">Filtrar por Provincia:</label>
                <select id="province-filter" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="all">Todas las Provincias</option>
                  {provinces.map(prov => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
              </div>
              <div className={styles.locationListScrollable}>
                {filteredLocations.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {filteredLocations.map(loc => {
                      // Determinamos si este ítem es el que está activo
                      const isActive = activeLocation && activeLocation.id === loc.id;
                      
                      return (
                        <li 
                          key={loc.id} 
                          // --- CAMBIO CLAVE AQUÍ ---
                          // Aplicamos la clase de módulo condicionalmente
                          className={`${styles.locationItem} list-group-item list-group-item-action ${isActive ? styles.activeLocationItem : ''}`}
                          onClick={() => handleLocationItemClick(loc)}
                        >
                          <strong className={styles.locationName}>{loc.name}</strong>
                          <p className={`${styles.locationAddressMb0} mb-0`}><small>{loc.address}, {loc.city}</small></p>
                        </li>
                      );
                    })}
                  </ul>
                ) : <p className="text-muted small p-2">No se encontraron ubicaciones para esta selección.</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-7">
          <div className={styles.mapWrapper}>
            <MapDisplay 
              initialCenter={mapCenter} 
              zoomLevel={mapZoom}
              locations={filteredLocations} 
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    // ---- CAMBIO PRINCIPAL AQUÍ ----
    // Quitamos las clases de padding de Bootstrap y usamos nuestra clase del módulo
    <div className={`container ${styles.pageContainer}`}>
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Puntos de Venta</h1>
        <p className="lead">Encuentra nuestras herramientas y distribuidores autorizados.</p>
      </div>
      {renderContent()}
    </div>
  );
}