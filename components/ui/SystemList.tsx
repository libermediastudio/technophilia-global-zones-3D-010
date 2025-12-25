
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { CelestialBodyConfig } from '../../types/index.ts';

interface SystemListProps {
  bodies: CelestialBodyConfig[];
  onSelect: (id: string) => void;
  forceVisible?: boolean;
}

export const SystemList: React.FC<SystemListProps> = ({ bodies, onSelect, forceVisible = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Wykluczamy planety pasywne z listy celów
  const excludedIds = ['mercury', 'venus', 'jupiter', 'saturn', 'uranus', 'neptune'];
  
  const filteredBodies = bodies.filter(body => 
    !excludedIds.includes(body.id) &&
    (body.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     body.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`absolute top-24 right-6 md:right-10 w-[240px] pointer-events-none z-30 font-mono ${forceVisible ? 'block animate-fade-in' : 'hidden md:block'}`}>
       <div className="flex flex-col items-end">
           <div className="w-full pointer-events-auto flex flex-col">
               {/* Panel Title */}
               <div className="mb-2 text-right">
                  <span className="text-[9px] font-black tracking-[0.4em] text-[#E42737] uppercase">SYSTEM_TARGETS</span>
               </div>

               {/* Minimal Search */}
               <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder="SCAN_ARRAY" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 text-white text-[10px] py-1 outline-none focus:border-[#E42737] placeholder:text-white/20 uppercase tracking-[0.3em] transition-all font-bold" 
                    />
                    <Search size={12} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/20" />
               </div>

               {/* Transparent List */}
               <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden custom-scroll space-y-1 pr-4">
                  {filteredBodies.map((body) => {
                    const name = body.name === 'earth' ? 'TERRA' : (body.name === 'moon' ? 'LUNA' : body.name);
                    return (
                      <button key={body.id} onClick={() => onSelect(body.id)}
                        className="w-full text-right py-2 transition-all duration-300 group flex flex-col items-end opacity-40 hover:opacity-100">
                        <span className="text-[10px] tracking-[0.2em] text-white font-black uppercase transition-colors group-hover:text-[#E42737]">{name}</span>
                        <span className="text-[7px] text-white/30 uppercase tracking-[0.2em] mt-0.5">{body.type}</span>
                      </button>
                    );
                  })}
               </div>
           </div>
       </div>
    </div>
  );
};
