
import React from 'react';
import { Sun, Orbit, Info, Crosshair } from 'lucide-react';
import { CelestialBodyConfig } from '../../types/index.ts';

interface SystemNavProps {
  bodies: CelestialBodyConfig[];
  currentBodyId: string;
  viewMode: 'ORBIT' | 'SYSTEM';
  zoomLevel: number;
  onSelectBody: (id: string) => void;
  onViewModeChange: (mode: 'ORBIT' | 'SYSTEM') => void;
  onZoomChange: (value: number) => void;
  onToggleMobileInfo: () => void;
  onToggleMobileList: () => void;
  isMobile: boolean;
}

export const SystemNav: React.FC<SystemNavProps> = ({ 
  bodies, 
  currentBodyId, 
  viewMode,
  zoomLevel,
  onSelectBody, 
  onViewModeChange,
  onZoomChange,
  onToggleMobileInfo,
  onToggleMobileList,
  isMobile
}) => {
  const targetLinkIds = ['earth', 'moon', 'mars', 'belt', 'io', 'europa', 'ganymede', 'callisto'];
  const visibleBodies = bodies.filter(b => targetLinkIds.includes(b.id));

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none flex flex-col items-center pb-8 safe-bottom">
      
      {/* Enlarged Minimal Slider */}
      <div className="mb-6 pointer-events-auto flex items-center gap-6 px-6 md:px-0">
         <div className="relative flex items-center">
            <input 
                type="range" min="0" max="100" value={zoomLevel} 
                onChange={(e) => onZoomChange(parseInt(e.target.value))}
                className="w-64 md:w-96 h-[2px] bg-white/10 appearance-none cursor-pointer focus:outline-none relative z-10
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:h-6 
                  [&::-webkit-slider-thumb]:bg-[#E42737] [&::-webkit-slider-thumb]:shadow-[0_0_12px_#E42737]
                  [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-[#E42737] [&::-moz-range-thumb]:border-none
                "
            />
         </div>
         <span className="text-[11px] text-white/40 font-mono font-bold tracking-[0.3em] w-12">{zoomLevel}%</span>
         
         {isMobile && (
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                <button onClick={onToggleMobileInfo} className="p-3 text-[#E42737]/60 active:text-[#E42737]"><Info size={20} /></button>
                <button onClick={onToggleMobileList} className="p-3 text-[#E42737]/60 active:text-[#E42737]"><Crosshair size={20} /></button>
            </div>
         )}
      </div>

      {/* Enlarged Navigation Rail */}
      <div className="pointer-events-auto flex items-center border-t border-white/10 pt-6">
         <div className="flex items-center gap-6 px-6">
            <button 
                onClick={() => onViewModeChange('ORBIT')}
                className={`transition-all duration-300 ${viewMode === 'ORBIT' ? 'text-[#E42737] scale-125' : 'text-white/20 hover:text-white/50'}`}
                title="ORBIT"
            ><Orbit size={20} /></button>
            <button 
                onClick={() => onViewModeChange('SYSTEM')}
                className={`transition-all duration-300 ${viewMode === 'SYSTEM' ? 'text-[#E42737] scale-125' : 'text-white/20 hover:text-white/50'}`}
                title="SYSTEM"
            ><Sun size={20} /></button>
         </div>

         <div className="w-[1px] h-4 bg-white/10"></div>

         <div className="flex items-center px-6 overflow-hidden max-w-[calc(100vw-140px)] md:max-w-4xl">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
              {visibleBodies.map((body) => {
                const isActive = body.id === currentBodyId;
                const name = body.name === 'earth' ? 'TERRA' : body.name === 'moon' ? 'LUNA' : body.name;
                return (
                  <button
                    key={body.id}
                    onClick={() => onSelectBody(body.id)}
                    className={`
                      text-[11px] font-mono tracking-[0.4em] uppercase whitespace-nowrap px-5 py-2 border rounded-none transition-all
                      ${isActive 
                        ? 'text-white font-black border-[#E42737] bg-[#E42737]/5' 
                        : 'text-white/20 border-transparent hover:text-white/60 hover:border-white/20'}
                    `}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
         </div>
      </div>
    </div>
  );
};
