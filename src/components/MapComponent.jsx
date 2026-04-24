import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet when using build tools
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom styling for specific markers if needed
const originIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapComponent = () => {
  // Center of the map (roughly between ICESI and Jamundí)
  const center = [3.3015, -76.5356];
  
  // Coordinates provided
  const icesiCoords = [3.3419, -76.53];
  const homeCoords = [3.2612, -76.5413];

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true}
        zoomControl={false} // We'll add it in a specific position
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <ZoomControl position="bottomright" />

        {/* Origin Marker */}
        <Marker position={icesiCoords} icon={originIcon}>
          <Popup className="custom-popup">
            <div className="font-sans">
              <h3 className="font-bold text-slate-900 leading-tight">ICESI (Origen)</h3>
              <p className="text-xs text-slate-600 mt-1">Starting point for safety analysis.</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker position={homeCoords} icon={destIcon}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-slate-900 leading-tight">Home (Destino)</h3>
              <p className="text-xs text-slate-600 mt-1">Arrival: Alfaguara, Jamundí.</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating Info Overlays */}
      <div className="absolute top-6 right-6 z-[1000] space-y-3">
        <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-700 max-w-xs">
          <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Live Telemetry</h4>
          <div className="flex justify-between items-center text-sm">
            <span>Zone Safety Index</span>
            <span className="text-emerald-400 font-bold">8.4/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
