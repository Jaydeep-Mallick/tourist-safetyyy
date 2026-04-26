import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const markerSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 24 36">
    <path fill="#4e6de4" d="M12 0C5.93 0 1 4.93 1 11c0 8.6 11 25 11 25s11-16.4 11-25C23 4.93 18.07 0 12 0z"/>
    <circle cx="12" cy="11" r="5" fill="#fff"/>
  </svg>
`);

const mapMarkerIcon = L.icon({
  iconUrl: `data:image/svg+xml,${markerSvg}`,
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -36],
});

export default function MapView({ setLocation }) {
  const [pos, setPos] = useState([12.97, 77.59]);

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(
      (p) => {
        const newPos = [p.coords.latitude, p.coords.longitude];
        setPos(newPos);
        setLocation && setLocation(newPos);
      },
      () => {},
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  return (
    <div className="map-frame">
      <MapContainer center={pos} zoom={13} className="dashboard-map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={pos} icon={mapMarkerIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
