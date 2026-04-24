import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getSafetyData } from '../services/dataService';
import { Shield } from 'lucide-react';

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

const MapComponent = ({ tripState, analysisMessage, selectedOrigin, selectedDest }) => {
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
      {/* Initial Data Loading - Only for first initialization */}
      {loading && (
        <div className="absolute inset-0 z-[6000] bg-slate-900 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-slate-400">Initializing Intelligence Layer...</span>
          </div>
        </div>
      )}

      {/* AI Analysis Overlay - Active during 'calculating' state */}
      {tripState === 'calculating' && (
        <div className="absolute inset-0 z-[5000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-500">
          <div className="bg-slate-900 border border-slate-700/50 p-10 rounded-[2.5rem] max-w-sm w-full shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-blue-500/10 rounded-full" />
              <div className="absolute inset-0 w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-0 m-auto w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">AI Secure Sync</h3>
              <p className="text-slate-400 text-sm font-medium h-10 px-4 leading-tight">{analysisMessage}</p>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '70%' }} />
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

        {/* Happy Path Rendering: Zonas y Ruta Solo aparecen en estado activo/arrived */}
        {(tripState === 'active' || tripState === 'arrived') && (
          <>
            {/* Active Secure Route (Emerald Green) */}
            {safetyData.safeRoute.length > 0 && (
              <Polyline 
                positions={safetyData.safeRoute}
                smoothFactor={1}
                pathOptions={{ color: '#10b981', weight: 5, opacity: 0.9 }}
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
          </>
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

        {/* Origin Marker - Only show if selected */}
        {selectedOrigin && (
          <Marker position={icesiCoords} icon={originIcon}>
            <Popup>
              <div className="font-sans text-slate-900">
                <h3 className="font-bold">Universidad ICESI</h3>
                <p className="text-[10px]">Origen verificado.</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker - Only show if selected */}
        {selectedDest && (
          <Marker position={homeCoords} icon={destIcon}>
            <Popup>
              <div className="font-sans text-slate-900">
                <h3 className="font-bold">Alfaguara (Home)</h3>
                <p className="text-[10px]">Destino final seguro.</p>
              </div>
            </Popup>
          </Marker>
        )}
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
