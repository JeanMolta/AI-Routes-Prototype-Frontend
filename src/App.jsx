import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import { Shield, Navigation, AlertTriangle, Settings, CheckCircle2, Search, MapPin, Loader2 } from 'lucide-react';

function App() {
  const [tripState, setTripState] = useState('idle'); // 'idle', 'calculating', 'active', 'arrived'
  const [analysisMessage, setAnalysisMessage] = useState('');

  const analysisSteps = [
    "Checking Bochalema lighting...",
    "Scanning Panamericana security reports...",
    "Analyzing historical crime hotspots...",
    "Optimizing route for maximum safety...",
    "Finalizing secure corridor..."
  ];

  const handleStartAnalysis = () => {
    setTripState('calculating');
    let step = 0;
    
    // Simulate dynamic analysis messages
    const interval = setInterval(() => {
      if (step < analysisSteps.length) {
        setAnalysisMessage(analysisSteps[step]);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => setTripState('active'), 500);
      }
    }, 700);
  };

  const handleFinishTrip = () => {
    setTripState('arrived');
  };

  const handleReset = () => {
    setTripState('idle');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col p-6 shadow-2xl z-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SafeRoute AI</h1>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* Trip Planning Panel */}
          <div className="space-y-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Trip Planning</p>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 text-blue-500"><MapPin size={14} /></div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Origin</p>
                <p className="text-sm font-semibold">Universidad ICESI</p>
              </div>
              <div className="h-px bg-slate-700/50" />
              <div className="relative pl-6">
                <div className="absolute left-0 top-1 text-emerald-500"><Navigation size={14} /></div>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Destination</p>
                <p className="text-sm font-semibold">Alfaguara - Home</p>
              </div>
            </div>
          </div>

          {/* Dynamic Status Section */}
          <div className="space-y-4">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Security Analysis</p>
            
            {tripState === 'idle' && (
              <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-xl">
                <p className="text-xs text-blue-200 leading-relaxed">
                  Juan, the system is ready to calculate the safest route for your trip tonight at 9:15 PM.
                </p>
              </div>
            )}

            {tripState === 'calculating' && (
              <div className="bg-slate-900/50 border border-blue-500/30 p-4 rounded-xl flex flex-col items-center gap-3 animate-pulse">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-[11px] text-blue-400 font-medium text-center">{analysisMessage}</p>
              </div>
            )}

            {tripState === 'active' && (
              <div className="bg-emerald-900/10 border border-emerald-900/30 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-500 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase">Route Secured</span>
                </div>
                <p className="text-xs text-slate-300">Live monitoring enabled. Avoiding 3 high-risk zones detected in your area.</p>
              </div>
            )}

            {tripState === 'arrived' && (
              <div className="bg-emerald-600/20 border border-emerald-500 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase">Success</span>
                </div>
                <p className="text-xs text-emerald-100 font-medium">Juan arrived safely. Session data encrypted and deleted for privacy.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {tripState === 'idle' && (
            <button 
              onClick={handleStartAnalysis}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-xl shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Find Safe Route
            </button>
          )}

          {tripState === 'active' && (
            <button 
              onClick={handleFinishTrip}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-2"
            >
              Finish Trip
            </button>
          )}

          {(tripState === 'arrived' || tripState === 'active') && (
            <button 
              onClick={handleReset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-3 px-4 rounded-xl transition-all duration-300 text-xs"
            >
              Start New Analysis
            </button>
          )}
          
          <div className="flex justify-between items-center px-2 pt-4 border-t border-slate-700 mt-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${tripState === 'active' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
              <span className="text-[9px] text-slate-500 font-bold uppercase">System: {tripState}</span>
            </div>
            <Settings className="w-3.5 h-3.5 text-slate-600 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Map Area */}
      <main className="flex-1 relative bg-slate-900">
        <MapComponent tripState={tripState} analysisMessage={analysisMessage} />
        
        {/* Active Trip Info Card */}
        {tripState === 'active' && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-lg px-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                  <Navigation className="w-6 h-6 text-emerald-500 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Secure Navigation Active</h4>
                  <p className="text-xs text-slate-400">Avoiding 3 identified risk hotspots.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Estimated Arrival</p>
                <p className="text-lg font-black text-white leading-none">9:34 PM</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
