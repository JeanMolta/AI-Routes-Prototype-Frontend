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

const MapComponent = ({ tripState, analysisMessage }) => {
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
      {/* Initial Data Loading */}
      {loading && (
        <div className="absolute inset-0 z-[2000] bg-slate-900 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-slate-400">Initializing Intelligence Layer...</span>
          </div>
        </div>
      )}

      {/* AI Analysis Overlay */}
      {tripState === 'calculating' && (
        <div className="absolute inset-0 z-[2000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center">
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 max-w-sm w-full shadow-2xl flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <Shield className="absolute inset-0 m-auto w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Security</h3>
              <p className="text-slate-400 text-sm h-10">{analysisMessage}</p>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full animate-[progress_3s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>
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

        {/* Safe Route Polyline (Dashed Blue - Idle/Planning) */}
        {tripState === 'idle' && safetyData.safeRoute.length > 0 && (
          <Polyline 
            positions={safetyData.safeRoute}
            pathOptions={{ color: '#3b82f6', weight: 2, opacity: 0.3, dashArray: '5, 10' }}
          />
        )}

        {/* Active Secure Route (Emerald Green) */}
        {(tripState === 'active' || tripState === 'arrived') && safetyData.safeRoute.length > 0 && (
          <Polyline 
            positions={safetyData.safeRoute}
            pathOptions={{ color: '#10b981', weight: 5, opacity: 0.8 }}
          />
        )}

        {/* Juan's Position Marker (Pulsing Circle) */}
        {tripState === 'active' && (
          <Circle
            center={icesiCoords}
            radius={80}
            pathOptions={{ 
              color: '#3b82f6', 
              fillColor: '#3b82f6', 
              fillOpacity: 0.6,
              className: 'animate-pulse' 
            }}
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
              fillOpacity: 0.15,
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
            <div className="font-sans text-slate-900">
              <h3 className="font-bold">Universidad ICESI</h3>
              <p className="text-[10px]">Punto de inicio seguro.</p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker position={homeCoords} icon={destIcon}>
          <Popup>
            <div className="font-sans text-slate-900">
              <h3 className="font-bold">Alfaguara (Home)</h3>
              <p className="text-[10px]">Destino final verificado.</p>
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
