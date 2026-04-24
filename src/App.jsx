import React from 'react';
import MapComponent from './components/MapComponent';
import { Shield, Navigation, AlertTriangle, Settings } from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-900 text-white">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col p-6 shadow-2xl z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SafeRoute AI</h1>
        </div>

        <div className="space-y-6 flex-1">
          <div className="space-y-4">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Mobility Intelligence</p>
            <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
              <div className="flex items-center gap-3 mb-2">
                <Navigation className="w-5 h-5 text-blue-400" />
                <span className="font-semibold text-sm">Active Route</span>
              </div>
              <div className="space-y-3 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                  <div>
                    <p className="text-xs text-slate-400">Origin</p>
                    <p className="text-sm font-medium">Universidad ICESI</p>
                  </div>
                </div>
                <div className="h-4 w-px bg-slate-600 ml-1" />
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  <div>
                    <p className="text-xs text-slate-400">Destination</p>
                    <p className="text-sm font-medium">Jamundí - Alfaguara</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-900/30 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Safety Alert</span>
            </div>
            <p className="text-xs text-slate-300">Analysis coverage: 4.2km remaining with valid safety logs.</p>
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
            Start Safe Analysis
          </button>
          <div className="flex justify-between items-center px-2 py-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400">System Ready</span>
            </div>
            <Settings className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Map Area */}
      <main className="flex-1 relative">
        <MapComponent />
      </main>
    </div>
  );
}

export default App;
