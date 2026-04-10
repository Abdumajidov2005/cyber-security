import React, { useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, StickyNote, Menu, X } from 'lucide-react';
import { getCourseBySlug } from '../data/courses';
import { VideoPlayer } from '../components/player/VideoPlayer';
import { LessonSidebar } from '../components/player/LessonSidebar';
import { NotePanel } from '../components/player/NotePanel';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';

export function Learn() {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const course = getCourseBySlug(slug);

  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'notes'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-3xl text-muted tracking-wider">KURS TOPILMADI</p>
      </div>
    );
  }

  const allLessons = course.curriculum.flatMap((s) => s.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId) || allLessons[0];
  const currentIndex = allLessons.indexOf(currentLesson);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  const handleLessonComplete = useCallback(() => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons((prev) => [...prev, currentLesson.id]);
      toast({ message: `"${currentLesson.title}" dars tugadi!`, type: 'success' });
    }
  }, [currentLesson, completedLessons, toast]);

  const handleSelectLesson = (lesson) => {
    navigate(`/learn/${slug}/${lesson.id}`);
  };

  const progress = Math.round((completedLessons.length / allLessons.length) * 100);

  return (
    <div className="h-screen flex flex-col bg-bg overflow-hidden">
      {/* Top bar */}
      <div className="h-12 border-b border-white/10 bg-surface flex items-center px-4 gap-4 shrink-0 z-10">
        <Link
          to={`/courses/${slug}`}
          className="flex items-center gap-1.5 text-muted hover:text-text transition-colors text-xs uppercase tracking-wider"
        >
          <ChevronLeft size={13} /> Kursga qaytish
        </Link>

        <div className="h-4 w-px bg-white/10" />

        <span className="font-display text-sm tracking-wider text-text truncate hidden sm:block">
          {course.title}
        </span>

        <div className="ml-auto flex items-center gap-4">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-24 h-1 bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted">{progress}%</span>
          </div>

          {/* Sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted hover:text-text transition-colors"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video + lesson info */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video */}
          <div className="w-full bg-black">
            <VideoPlayer lesson={currentLesson} onComplete={handleLessonComplete} />
          </div>

          {/* Lesson info */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">
                    {course.curriculum.find((s) =>
                      s.lessons.some((l) => l.id === currentLesson.id)
                    )?.section}
                  </p>
                  <h1 className="font-display text-3xl tracking-wider">{currentLesson.title}</h1>
                </div>
                <span className="text-muted text-xs shrink-0">{currentLesson.duration}</span>
              </div>

              <p className="text-muted text-sm leading-relaxed mb-8">
                Bu darsda {currentLesson.title.toLowerCase()} mavzusini chuqur o'rganamiz.
                Amaliy misollar va real stsenariylar orqali bilimlaringizni mustahkamlaysiz.
              </p>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                {prevLesson ? (
                  <button
                    onClick={() => handleSelectLesson(prevLesson)}
                    className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted hover:text-text transition-colors"
                  >
                    ← {prevLesson.title}
                  </button>
                ) : <div />}

                {nextLesson && (
                  <button
                    onClick={() => handleSelectLesson(nextLesson)}
                    className="flex items-center gap-2 text-xs uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
                  >
                    Keyingi: {nextLesson.title} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-72 xl:w-80 shrink-0 flex flex-col border-l border-white/10 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-white/10 shrink-0">
              <button
                onClick={() => setActiveTab('lessons')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs uppercase tracking-wider transition-colors',
                  activeTab === 'lessons' ? 'text-accent border-b border-accent' : 'text-muted hover:text-text'
                )}
              >
                <FileText size={12} /> Darslar
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs uppercase tracking-wider transition-colors',
                  activeTab === 'notes' ? 'text-accent border-b border-accent' : 'text-muted hover:text-text'
                )}
              >
                <StickyNote size={12} /> Eslatmalar
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'lessons' ? (
                <LessonSidebar
                  curriculum={course.curriculum}
                  currentLessonId={currentLesson.id}
                  completedLessons={completedLessons}
                  onSelectLesson={handleSelectLesson}
                />
              ) : (
                <NotePanel lessonId={currentLesson.id} currentTime={currentTime} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
