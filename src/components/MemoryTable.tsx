import React, { useState } from 'react';
import { siteContent, type MemoryItem } from '../data/content';
import { ChevronDown } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { EmbeddedVinylGrid } from './EmbeddedVinylGrid';

export const MemoryTable: React.FC = () => {
  const { memories } = siteContent;
  // Strictly single active item state: only one box open at a time (defaulting to song memory #18 or #1)
  const [activeId, setActiveId] = useState<number | null>(18);

  const handleToggle = (id: number) => {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
      soundFX.playSparkle();
    }
  };

  return (
    <section id="memories-table" className="pt-10 pb-16 px-4 sm:px-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Continuous 2-Column Table Grid (cells touching with shared borders, no gaps) */}
        <div className="border-2 border-black bg-white grid grid-cols-1 md:grid-cols-2">
          {memories.map((item: MemoryItem, index: number) => {
            const isOpen = activeId === item.id;
            const isMilestone21 = item.id === 21;
            const isSongMemory = item.id === 18;
            const isEvenColumn = index % 2 === 1;

            return (
              <div
                key={item.id}
                className={`border-b border-black transition-colors ${
                  // Left/right border handling so borders seamlessly touch without double thickness
                  !isMilestone21 && !isEvenColumn ? 'md:border-r md:border-black' : ''
                } ${
                  isMilestone21 ? 'md:col-span-2 border-b-0' : ''
                } ${
                  isOpen ? 'bg-gray-50' : 'bg-white hover:bg-neutral-50'
                }`}
              >
                {/* Accordion Box Header / Trigger */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    {/* Regular Number Tag (1, 2, 3... 21) */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-hpChapter font-bold text-base sm:text-lg flex-shrink-0 border border-black transition-colors ${
                        isOpen
                          ? 'bg-black text-white'
                          : 'bg-white text-black group-hover:bg-black group-hover:text-white'
                      }`}
                    >
                      {item.id}
                    </div>

                    {/* Clean Title */}
                    <h3
                      className={`font-hpChapter font-bold text-base sm:text-xl tracking-wide truncate ${
                        isOpen ? 'text-black' : 'text-black group-hover:underline'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Chevron Indicator */}
                  <div
                    className={`p-2 transition-transform duration-200 flex-shrink-0 text-black ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Expanded Qualitative Memory Panel */}
                {isOpen && (
                  <div className="px-6 sm:px-10 pb-8 pt-3 border-t border-black bg-white book-fade-in">
                    <div className="py-3">
                      <p className="font-hpBody text-black text-lg sm:text-2xl leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>

                    {/* Embedded 2 by 2 Vinyl Record Grid inside Memory #18 (The Songs Memory) */}
                    {isSongMemory && (
                      <EmbeddedVinylGrid />
                    )}

                    {item.quote && (
                      <div className="mt-5 pt-4 border-t border-dashed border-gray-400 flex items-center justify-between text-sm sm:text-base font-hpEngraved italic text-gray-700">
                        <span>“{item.quote}”</span>
                        <span className="font-hpChapter font-bold not-italic text-xs uppercase tracking-wider text-black">
                          ⚡ Memory {item.id} of 21
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
