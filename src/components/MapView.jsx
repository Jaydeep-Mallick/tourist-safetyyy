import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
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
        <Marker position={pos}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
