import React, { useState } from 'react';
import { ChevronDown, Play, Lock, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export function CurriculumAccordion({ curriculum, completedLessons = [], courseSlug }) {
  const [openSections, setOpenSections] = useState([0]);

  const toggleSection = (i) => {
    setOpenSections((prev) =>
      prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i]
    );
  };

  const totalLessons = curriculum.reduce((acc, s) => acc + s.lessons.length, 0);
  const totalDuration = curriculum
    .flatMap((s) => s.lessons)
    .reduce((acc, l) => {
      const [m, s] = l.duration.split(':').map(Number);
      return acc + m * 60 + s;
    }, 0);

  const formatTotal = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl tracking-wider">O'QUV DASTURI</h3>
        <span className="text-muted text-xs">
          {totalLessons} dars · {formatTotal(totalDuration)}
        </span>
      </div>

      <div className="border border-white/10">
        {curriculum.map((section, i) => {
          const isOpen = openSections.includes(i);
          return (
            <div key={i} className="border-b border-white/10 last:border-b-0">
              {/* Section header */}
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs tracking-widest text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-medium text-sm text-text">{section.section}</span>
                  <span className="text-muted text-xs">({section.lessons.length} dars)</span>
                </div>
                <ChevronDown
                  size={14}
                  className={cn(
                    'text-muted transition-transform duration-300',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Lessons */}
              {isOpen && (
                <div className="bg-surface/50">
                  {section.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 px-5 py-3 border-t border-white/5 hover:bg-white/3 transition-colors"
                      >
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          {isCompleted ? (
                            <CheckCircle size={14} className="text-accent" />
                          ) : lesson.free ? (
                            <Play size={12} className="text-accent" />
                          ) : (
                            <Lock size={12} className="text-muted" />
                          )}
                        </div>
                        <span className={cn(
                          'text-sm flex-1',
                          isCompleted ? 'text-muted line-through' : 'text-text'
                        )}>
                          {lesson.title}
                        </span>
                        {lesson.free && !isCompleted && (
                          <span className="text-[10px] text-accent uppercase tracking-wider border border-accent/30 px-1.5 py-0.5">
                            Bepul
                          </span>
                        )}
                        <span className="text-muted text-xs shrink-0">{lesson.duration}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
