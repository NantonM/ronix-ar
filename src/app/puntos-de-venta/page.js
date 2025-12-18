"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MapDisplay from "@/components/MapDisplay";
import styles from "./puntosDeVenta.module.css";

/* ---------------- NORMALIZADOR ---------------- */
const normalizeText = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default function PuntosDeVentaPage() {
  const [allLocations, setAllLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const [mapCenter, setMapCenter] = useState({
    lat: -38.416097,
    lng: -63.616672,
  });
  const [mapZoom, setMapZoom] = useState(4);

  const [activeLocation, setActiveLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  /* ---------------- MOBILE DETECTION ---------------- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ---------------- DATA LOAD ---------------- */
  useEffect(() => {
    async function loadLocations() {
      try {
        const response = await fetch("/api/locations");
        if (!response.ok) {
          throw new Error("No se pudieron cargar las ubicaciones.");
        }

        const data = await response.json();
        setAllLocations(data);
        setFilteredLocations(data);

        /* Provincias sin duplicados */
        const provinceMap = new Map();
        data.forEach(loc => {
          const key = normalizeText(loc.province);
          if (!provinceMap.has(key)) {
            provinceMap.set(key, loc.province.trim());
          }
        });
        setProvinces([...provinceMap.values()].sort());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadLocations();
  }, []);

  /* ---------------- FILTERS ---------------- */
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedCity("all");
    setActiveLocation(null);

    if (province === "all") {
      setFilteredLocations(allLocations);
      setCities([]);
      setMapCenter({ lat: -38.416097, lng: -63.616672 });
      setMapZoom(4);
      return;
    }

    const filtered = allLocations.filter(
      l => normalizeText(l.province) === normalizeText(province)
    );

    setFilteredLocations(filtered);

    /* Localidades sin duplicados */
    const cityMap = new Map();
    filtered.forEach(loc => {
      const key = normalizeText(loc.city);
      if (!cityMap.has(key)) {
        cityMap.set(key, loc.city.trim());
      }
    });
    setCities([...cityMap.values()].sort());

    if (filtered.length > 0) {
      setMapCenter({ lat: filtered[0].lat, lng: filtered[0].lng });
      setMapZoom(9);
    }
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setActiveLocation(null);

    if (city === "all") {
      setFilteredLocations(
        allLocations.filter(
          l => normalizeText(l.province) === normalizeText(selectedProvince)
        )
      );
      return;
    }

    const filtered = allLocations.filter(
      l =>
        normalizeText(l.province) === normalizeText(selectedProvince) &&
        normalizeText(l.city) === normalizeText(city)
    );

    setFilteredLocations(filtered);

    if (filtered.length > 0) {
      setMapCenter({ lat: filtered[0].lat, lng: filtered[0].lng });
      setMapZoom(13);
    }
  };

  const handleLocationItemClick = (location) => {
    setActiveLocation(location);
    setMapCenter({ lat: location.lat, lng: location.lng });
    setMapZoom(15);
  };

  /* ---------------- RENDER ---------------- */
  if (isLoading) {
    return <div className="text-center py-5">Cargando...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
  <div className={styles.wrapper}>
    <div className="container pt-5 pb-4">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">Nuestros Puntos de Venta</h1>
        <p className="lead">Encuentra nuestros distribuidores autorizados.</p>
      </div>
</div>

      <div className="row">
        {/* ---------- LEFT COLUMN ---------- */}
        <div className="col-lg-4 col-md-5 mb-4">

          <div className="d-grid mb-4">
            <Link href="/revendedores" className="btn btn-danger">
              ¡Quiero ser un Punto Ronix!
            </Link>
          </div>

          {/* ---------- MOBILE ---------- */}
          {isMobile ? (
            <details className={styles.mobileAccordion}>
              <summary>Buscar puntos de venta</summary>

              <div className="mb-3">
                <label className="form-label">Provincia</label>
                <select
                  className="form-select"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="all">Todas</option>
                  {provinces.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {cities.length > 0 && (
                <div className="mb-3">
                  <label className="form-label">Localidad</label>
                  <select
                    className="form-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="all">Todas</option>
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              <ul className="list-group">
                {filteredLocations.map(loc => (
                  <li
                    key={loc.id}
                    className="list-group-item"
                    onClick={() => handleLocationItemClick(loc)}
                  >
                    <strong>{loc.name}</strong>
                    <div className="small">{loc.address}, {loc.city}</div>
                  </li>
                ))}
              </ul>
            </details>
          ) : (

          /* ---------- DESKTOP ---------- */
            <div className={styles.locationListScrollable}>
              <label className="form-label fw-bold">Filtrar por Provincia</label>
              <select
                className="form-select mb-3"
                value={selectedProvince}
                onChange={handleProvinceChange}
              >
                <option value="all">Todas las Provincias</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <ul className="list-group list-group-flush">
                {filteredLocations.map(loc => {
                  const isActive = activeLocation?.id === loc.id;
                  return (
                    <li
                      key={loc.id}
                      className={`${styles.locationItem} list-group-item list-group-item-action ${isActive ? styles.activeLocationItem : ""}`}
                      onClick={() => handleLocationItemClick(loc)}
                    >
                      <strong className={styles.locationName}>{loc.name}</strong>
                      <p className={`${styles.locationAddressMb0} mb-0`}>
                        <small>{loc.address}, {loc.city}</small>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* ---------- MAP ---------- */}
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
    </div>
  );
}
