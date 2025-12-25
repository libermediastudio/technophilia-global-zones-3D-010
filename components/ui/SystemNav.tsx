
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
    <div className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none flex flex-col items-center pb-6 safe-bottom">
      
      {/* Zoom Slider Section */}
      <div className="mb-4 pointer-events-auto flex items-center gap-3 px-4 w-full max-w-lg justify-center">
         <div className="relative flex items-center flex-1 max-w-[200px]">
            <input 
                type="range" min="0" max="100" value={zoomLevel} 
                onChange={(e) => onZoomChange(parseInt(e.target.value))}
                className="w-full h-[1px] bg-white/10 appearance-none cursor-pointer focus:outline-none relative z-10
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-1 [&::-webkit-slider-thumb]:h-4 
                  [&::-webkit-slider-thumb]:bg-[#E42737] [&::-webkit-slider-thumb]:shadow-[0_0_8px_#E42737]
                  [&::-moz-range-thumb]:w-1 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#E42737] [&::-moz-range-thumb]:border-none
                "
            />
         </div>
         <span className="text-[10px] text-white/40 font-mono font-black tracking-[0.2em] w-8 text-center">{zoomLevel}%</span>
         
         {isMobile && (
            <div className="flex items-center gap-1 border-l border-white/10 pl-2">
                <button onClick={(e) => { e.stopPropagation(); onToggleMobileInfo(); }} className="p-2 text-[#E42737]/60 active:text-[#E42737] transition-colors"><Info size={16} /></button>
                <button onClick={(e) => { e.stopPropagation(); onToggleMobileList(); }} className="p-2 text-[#E42737]/60 active:text-[#E42737] transition-colors"><Crosshair size={16} /></button>
            </div>
         )}
      </div>

      {/* Navigation Rail */}
      <div className="pointer-events-auto flex items-center border-t border-white/10 pt-4 w-full justify-center">
         <div className="flex items-center gap-5 px-4">
            <button 
                onClick={() => onViewModeChange('ORBIT')}
                className={`transition-colors duration-300 ${viewMode === 'ORBIT' ? 'text-[#E42737]' : 'text-white/20 hover:text-white/50'}`}
                title="ORBIT"
            ><Orbit size={18} /></button>
            <button 
                onClick={() => onViewModeChange('SYSTEM')}
                className={`transition-colors duration-300 ${viewMode === 'SYSTEM' ? 'text-[#E42737]' : 'text-white/20 hover:text-white/50'}`}
                title="SYSTEM"
            ><Sun size={18} /></button>
         </div>

         <div className="w-[1px] h-3 bg-white/10 mx-2"></div>

         <div className="flex items-center px-4 overflow-hidden max-w-[calc(100vw-120px)] md:max-w-4xl">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {visibleBodies.map((body) => {
                const isActive = body.id === currentBodyId;
                const name = body.name === 'earth' ? 'TERRA' : body.name === 'moon' ? 'LUNA' : body.name;
                return (
                  <button
                    key={body.id}
                    onClick={() => onSelectBody(body.id)}
                    className={`
                      text-[10px] font-mono tracking-[0.2em] uppercase font-black whitespace-nowrap px-4 py-1.5 border transition-all
                      ${isActive 
                        ? 'text-white border-[#E42737] bg-[#E42737]/5' 
                        : 'text-white/20 border-transparent hover:text-white/60 hover:border-white/10'}
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
