import React from 'react';
import { siteContent, type TimelineMilestone } from '../data/content';

export const TimelineSection: React.FC = () => {
  const { timelineTitle, timelineSubtitle, milestones } = siteContent;

  return (
    <section id="timeline" className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="font-hpTitle text-xl sm:text-3xl font-bold tracking-hp-wide uppercase text-black mb-1">
            {timelineTitle}
          </h2>
          <p className="font-hpEngraved italic text-xs sm:text-sm text-gray-600">
            {timelineSubtitle}
          </p>
        </div>

        {/* Chapters Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone: TimelineMilestone, idx: number) => {
            const isFinal = idx === milestones.length - 1;

            return (
              <div
                key={idx}
                className={`border p-5 flex flex-col justify-between transition-all ${
                  isFinal
                    ? 'border-2 border-black bg-gray-50'
                    : 'border-black bg-white hover:bg-gray-50/50'
                }`}
              >
                <div>
                  {/* Chapter Header */}
                  <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
                    <span className="font-hpChapter font-bold text-xs uppercase tracking-hp-wide text-black">
                      {milestone.chapterNumber}
                    </span>
                    <span className="font-hpEngraved italic text-xs text-gray-600">
                      {milestone.timeframe}
                    </span>
                  </div>

                  <h3 className="font-hpChapter font-bold text-base text-black mb-2">
                    {milestone.title}
                  </h3>

                  <p className="font-hpBody text-gray-900 text-sm sm:text-base leading-relaxed mb-4">
                    {milestone.description}
                  </p>
                </div>

                {/* Chapter Annotation */}
                <div className="pt-2 border-t border-dashed border-gray-300 flex items-center justify-between text-xs font-hpEngraved italic text-gray-600">
                  <span>✦ {milestone.annotation}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Rule */}
        <div className="hp-rule mt-12" />
      </div>
    </section>
  );
};
