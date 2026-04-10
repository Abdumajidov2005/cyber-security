import React, { useState } from 'react';
import { CheckCircle, Play, Lock, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function LessonSidebar({ curriculum, currentLessonId, completedLessons = [], onSelectLesson }) {
  const [openSections, setOpenSections] = useState(
    curriculum.map((_, i) => i)
  );

  const toggleSection = (i) => {
    setOpenSections((prev) =>
      prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i]
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-surface border-l border-white/10">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-display text-sm tracking-widest text-text">DARSLAR</h3>
      </div>

      {curriculum.map((section, i) => {
        const isOpen = openSections.includes(i);
        return (
          <div key={i} className="border-b border-white/5">
            <button
              onClick={() => toggleSection(i)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors text-left"
            >
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                {section.section}
              </span>
              <ChevronDown
                size={12}
                className={cn('text-muted transition-transform', isOpen && 'rotate-180')}
              />
            </button>

            {isOpen && (
              <div>
                {section.lessons.map((lesson) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson)}
                      className={cn(
                        'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-t border-white/5',
                        isCurrent
                          ? 'bg-accent/10 border-l-2 border-l-accent'
                          : 'hover:bg-white/3'
                      )}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle size={13} className="text-accent" />
                        ) : isCurrent ? (
                          <Play size={13} className="text-accent" />
                        ) : (
                          <div className="w-3 h-3 border border-white/20 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          'text-xs leading-relaxed',
                          isCurrent ? 'text-accent' : isDone ? 'text-muted' : 'text-text'
                        )}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">{lesson.duration}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
