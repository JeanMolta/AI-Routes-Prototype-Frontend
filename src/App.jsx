import React, { useState, useEffect, useRef } from 'react';
import MapComponent from './components/MapComponent';
import { Shield, Navigation, AlertTriangle, Settings, CheckCircle2, Search, MapPin, Loader2, X } from 'lucide-react';

function App() {
  const [tripState, setTripState] = useState('idle'); // 'idle', 'calculating', 'active', 'arrived'
  const [analysisMessage, setAnalysisMessage] = useState('');
  
  // Search States
  const [originQuery, setOriginQuery] = useState('');
  const [destQuery, setDestQuery] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  // Constants
  const ORIGIN_TARGET = "Universidad Icesi";
  const DEST_TARGET = "Alfaguara (Jamundí)";

  const originSuggestions = [ORIGIN_TARGET, "Universidad del Valle", "Pontificia Universidad Javeriana"].filter(s => 
    s.toLowerCase().includes(originQuery.toLowerCase())
  );

  const destSuggestions = [DEST_TARGET, "Pance (Cali)", "Ciudad Jardín", "Jamundí Centro"].filter(s => 
    s.toLowerCase().includes(destQuery.toLowerCase())
  );

  const analysisSteps = [
    "Escaneando zonas oscuras...",
    "Scanning Panamericana security reports...",
    "Analyzing historical crime hotspots...",
    "Verificando reportes en Panamericana...",
    "Optimizing route for maximum safety...",
    "Finalizing secure corridor..."
  ];

  const handleStartAnalysis = () => {
    if (!selectedOrigin || !selectedDest) return;
    
    setTripState('calculating');
    setAnalysisMessage(analysisSteps[0]);
    let step = 1;
    
    // Simulate dynamic analysis messages over 4 seconds
    const interval = setInterval(() => {
      if (step < analysisSteps.length) {
        setAnalysisMessage(analysisSteps[step]);
        step++;
      }
    }, 650);

    // Finalize after 4 seconds
    setTimeout(() => {
      clearInterval(interval);
      setTripState('active');
    }, 4000);
  };

  const handleFinishTrip = () => {
    setTripState('arrived');
  };

  const handleReset = () => {
    setTripState('idle');
    setOriginQuery('');
    setDestQuery('');
    setSelectedOrigin(null);
    setSelectedDest(null);
  };

  const canStartTrip = selectedOrigin === ORIGIN_TARGET && selectedDest === DEST_TARGET;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-96 bg-slate-800 border-r border-slate-700 flex flex-col p-6 shadow-2xl z-30">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">SafeRoute AI</h1>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Prototype v1.3</span>
          </div>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* Trip Planning Panel */}
          <div className="space-y-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Route Selection</p>
            
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700 space-y-5 shadow-inner">
              {/* Origin Input */}
              <div className="space-y-2 relative">
                <label className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Origin
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={originQuery}
                    onChange={(e) => {
                      setOriginQuery(e.target.value);
                      setShowOriginSuggestions(true);
                      if (selectedOrigin) setSelectedOrigin(null);
                    }}
                    onFocus={() => setShowOriginSuggestions(true)}
                    placeholder="Search origin (e.g. Uni...)"
                    className={`w-full bg-slate-800 border ${selectedOrigin ? 'border-blue-500/50' : 'border-slate-700'} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600`}
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  {originQuery && (
                    <button onClick={() => {setOriginQuery(''); setSelectedOrigin(null)}} className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showOriginSuggestions && originQuery && !selectedOrigin && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {originSuggestions.length > 0 ? originSuggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setOriginQuery(s);
                          setSelectedOrigin(s);
                          setShowOriginSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-700 flex items-center gap-3 transition-colors border-b border-slate-700/50 last:border-0"
                      >
                        <MapPin size={14} className="text-blue-500" />
                        <span>{s}</span>
                      </button>
                    )) : (
                      <div className="px-4 py-3 text-sm text-slate-500 italic">No locations found</div>
                    )}
                  </div>
                )}
              </div>

              {/* Connector */}
              <div className="flex justify-center -my-2 relative z-0">
                <div className="w-1.5 h-4 border-l-2 border-dashed border-slate-700 ml-[-29px]" />
              </div>

              {/* Destination Input */}
              <div className="space-y-2 relative">
                <label className="text-[10px] text-slate-500 uppercase font-bold flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Destination
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={destQuery}
                    onChange={(e) => {
                      setDestQuery(e.target.value);
                      setShowDestSuggestions(true);
                      if (selectedDest) setSelectedDest(null);
                    }}
                    onFocus={() => setShowDestSuggestions(true)}
                    placeholder="Search destination (e.g. Alfa...)"
                    className={`w-full bg-slate-800 border ${selectedDest ? 'border-emerald-500/50' : 'border-slate-700'} rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-600`}
                  />
                  <Navigation className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  {destQuery && (
                    <button onClick={() => {setDestQuery(''); setSelectedDest(null)}} className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white">
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {showDestSuggestions && destQuery && !selectedDest && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {destSuggestions.length > 0 ? destSuggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          setDestQuery(s);
                          setSelectedDest(s);
                          setShowDestSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-700 flex items-center gap-3 transition-colors border-b border-slate-700/50 last:border-0"
                      >
                        <MapPin size={14} className="text-emerald-500" />
                        <span>{s}</span>
                      </button>
                    )) : (
                      <div className="px-4 py-3 text-sm text-slate-500 italic">No locations found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Status Section */}
          <div className="space-y-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Security Protocol</p>
            
            {tripState === 'idle' && (
              <div className={`p-4 rounded-xl transition-all duration-300 ${canStartTrip ? 'bg-blue-600/20 border border-blue-500/40' : 'bg-slate-700/30 border border-slate-700/50'}`}>
                <p className="text-xs leading-relaxed text-slate-300">
                  {canStartTrip 
                    ? "Ready to secure Juan's route from Universidad Icesi to Alfaguara." 
                    : "Please select valid origin and destination to begin safety analysis."}
                </p>
              </div>
            )}

            {tripState === 'calculating' && (
              <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <p className="text-[11px] text-blue-400 font-bold uppercase tracking-wider">{analysisMessage}</p>
                </div>
              </div>
            )}

            {tripState === 'active' && (
              <div className="bg-emerald-900/20 border border-emerald-900/50 p-4 rounded-xl group transition-all">
                <div className="flex items-center gap-2 text-emerald-500 mb-2 font-bold text-[10px] uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Route Secured</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">AI algorithms are bypassing 3 critical risk zones in the corridor.</p>
              </div>
            )}

            {tripState === 'arrived' && (
              <div className="bg-emerald-600/20 border border-emerald-500/60 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 mb-2 font-bold text-[10px] uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Arrived Safely</span>
                </div>
                <p className="text-xs text-emerald-100/80">Juan is home. Trip data successfully purged for security.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {tripState === 'idle' && (
            <button 
              disabled={!canStartTrip}
              onClick={handleStartAnalysis}
              className={`w-full font-bold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                canStartTrip 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 active:scale-[0.98]' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'
              }`}
            >
              <Search className="w-4 h-4" />
              Find Safe Route
            </button>
          )}

          {tripState === 'active' && (
            <button 
              onClick={handleFinishTrip}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-4 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-900/40 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Finish Trip
            </button>
          )}

          {(tripState === 'arrived' || tripState === 'active') && (
            <button 
              onClick={handleReset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 px-4 rounded-2xl transition-all duration-300 text-xs shadow-lg"
            >
              New Analysis
            </button>
          )}
          
          <div className="flex justify-between items-center px-2 pt-5 border-t border-slate-700/50 mt-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${tripState === 'active' ? 'bg-emerald-500' : 'bg-slate-600'} animate-pulse`} />
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">System {tripState}</span>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-600 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Map Area */}
      <main className="flex-1 relative bg-[#010a17]">
        <MapComponent 
          tripState={tripState} 
          analysisMessage={analysisMessage} 
          selectedOrigin={selectedOrigin}
          selectedDest={selectedDest}
        />
        
        {/* Active Trip Info Card */}
        {tripState === 'active' && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 p-5 rounded-[2rem] shadow-2xl flex items-center justify-between border-b-emerald-500/50 border-b-2">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20">
                  <Navigation className="w-5 h-5 text-emerald-500 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-emerald-500 tracking-wider">Live Secure Route</h4>
                  <p className="text-sm font-bold text-white">Monitoring Security Logs</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-500 uppercase font-black">Arrival</p>
                <p className="text-xl font-black text-white">9:34<span className="text-xs font-normal text-slate-500 ml-1">PM</span></p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
