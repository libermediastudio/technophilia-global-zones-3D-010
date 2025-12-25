
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GlobeData, City } from '../../types/index.ts';

interface LocationListProps {
  data: GlobeData;
  onSelect: (city: City) => void;
  selectedCity: City | null;
  forceVisible?: boolean;
}

export const LocationList: React.FC<LocationListProps> = ({ data, onSelect, selectedCity, forceVisible = false }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!data.cities || data.cities.length === 0) return null;

  const filteredCities = data.cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (city.faction && city.faction.toLowerCase().includes(searchQuery.toLowerCase())) ||
    city.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`absolute top-24 right-6 md:right-10 w-[240px] pointer-events-none z-30 font-mono ${forceVisible ? 'block animate-fade-in' : 'hidden md:block'}`}>
       <div className="flex flex-col items-end">
           <div className="w-full pointer-events-auto flex flex-col">
               {/* Panel Title */}
               <div className="mb-2 text-right">
                  <span className="text-[9px] font-black tracking-[0.4em] text-[#E42737] uppercase">TARGET_LIST</span>
               </div>

               {/* Minimal Search */}
               <div className="relative mb-6">
                    <input 
                        type="text" 
                        placeholder="SCAN_SECTOR" 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 text-white text-[10px] py-1 outline-none focus:border-[#E42737] placeholder:text-white/20 uppercase tracking-[0.3em] transition-all font-bold" 
                    />
                    <Search size={12} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/20" />
               </div>

               {/* Transparent List */}
               <div className="max-h-[50vh] overflow-y-auto overflow-x-hidden custom-scroll space-y-1 pr-4">
                  {filteredCities.map((city) => {
                    const isSelected = selectedCity?.name === city.name;
                    return (
                      <button key={city.name} onClick={() => onSelect(city)}
                        className={`w-full text-right py-2 transition-all duration-300 relative group flex flex-col items-end
                            ${isSelected ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                      >
                        <span className={`text-[10px] tracking-[0.2em] uppercase font-black transition-colors ${isSelected ? 'text-[#E42737]' : 'text-white'}`}>
                            {city.name}
                        </span>
                        <span className="text-[7px] text-white/30 tracking-[0.2em] uppercase mt-0.5">{city.category}</span>
                        {isSelected && <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-1 h-1 bg-[#E42737] rounded-full"></div>}
                      </button>
                    );
                  })}
               </div>
           </div>
       </div>
    </div>
  );
};
