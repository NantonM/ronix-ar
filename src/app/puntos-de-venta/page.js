"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MapDisplay from '@/components/MapDisplay';
import styles from './puntosDeVenta.module.css';

export default function PuntosDeVentaPage() {
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [mapCenter, setMapCenter] = useState({ lat: -38.416097, lng: -63.616672 });
  const [mapZoom, setMapZoom] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    async function loadLocations() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/locations');
        if (!response.ok) {
          throw new Error('No se pudieron cargar las ubicaciones.');
        }
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
    setActiveLocation(null);

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
    setActiveLocation(location);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
    }

    if (error) {
      return <div className="alert alert-danger">Error: {error}</div>;
    }

    return (
      <div className="row">
        <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
          <div className="sticky-top" style={{top: '80px'}}>
            <div className={styles.filtersContent}>

              {/* --- BOTÓN MOVIDO AQUÍ ARRIBA --- */}
              <div className="d-grid mb-4">
                <Link href="/revendedores" className="btn btn-danger">
                  ¡Quiero ser un Punto Ronix!
                </Link>
              </div>

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
                      const isActive = activeLocation && activeLocation.id === loc.id;
                      return (
                        <li 
                          key={loc.id} 
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
    <div className={`container pt-5 pb-4`}>
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Puntos de Venta</h1>
        <p className="lead">Encuentra nuestras herramientas y distribuidores autorizados.</p>
      </div>
      {renderContent()}
    </div>
  );
}