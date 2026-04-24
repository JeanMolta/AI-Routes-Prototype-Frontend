import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getSafetyData } from '../services/dataService';

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

// Custom styling for specific markers
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
  const [safetyData, setSafetyData] = React.useState({ dangerZones: [], safeRoute: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSafetyData();
        setSafetyData(data);
      } catch (error) {
        console.error("Error fetching safety data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Center of the map
  const center = [3.3015, -76.5356];
  
  // Coordinates provided for markers
  const icesiCoords = [3.3419, -76.53];
  const homeCoords = [3.2612, -76.5413];

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 z-[2000] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3 shadow-2xl">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-slate-200">Loading safety intelligence...</span>
          </div>
        </div>
      )}

      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <ZoomControl position="bottomright" />

        {/* Safe Route Polyline */}
        {safetyData.safeRoute.length > 0 && (
          <Polyline 
            positions={safetyData.safeRoute}
            pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.6, dashArray: '10, 10' }}
          />
        )}

        {/* Danger Zones */}
        {safetyData.dangerZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{ 
              color: '#ef4444', 
              fillColor: '#ef4444', 
              fillOpacity: 0.2,
              weight: 1
            }}
          >
            <Popup>
              <div className="text-xs font-sans">
                <span className="font-bold text-red-600 uppercase">Riesgo Detectado</span>
                <p className="mt-1 text-slate-700">{zone.label}</p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Origin Marker */}
        <Marker position={icesiCoords} icon={originIcon}>
          <Popup>
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
