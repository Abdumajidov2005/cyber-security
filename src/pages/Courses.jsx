import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { courses } from '../data/courses';
import { CourseCard } from '../components/course/CourseCard';
import { CourseCardSkeleton } from '../components/ui/Skeleton';
import { Footer } from '../components/layout/Footer';
import { PageTransition } from '../components/layout/PageTransition';
import { Badge } from '../components/ui/Badge';
import { useScrollReveal } from '../hooks/useScrollReveal';

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const categories = [...new Set(courses.map((c) => c.category))];

export function Courses() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFree, setShowFree] = useState(false);
  const [isLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ref = useScrollReveal({ stagger: true });

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchLevel = !selectedLevel || c.level === selectedLevel;
      const matchCategory = !selectedCategory || c.category === selectedCategory;
      const matchFree = !showFree || c.isFree;
      return matchSearch && matchLevel && matchCategory && matchFree;
    });
  }, [search, selectedLevel, selectedCategory, showFree]);

  const clearFilters = () => {
    setSearch('');
    setSelectedLevel('');
    setSelectedCategory('');
    setShowFree(false);
  };

  const hasFilters = search || selectedLevel || selectedCategory || showFree;

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Level */}
      <div>
        <h4 className="font-display text-sm tracking-widest mb-4 text-text">DARAJA</h4>
        <div className="space-y-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(selectedLevel === level ? '' : level)}
              className={`w-full text-left text-xs uppercase tracking-wider py-2 px-3 transition-colors ${
                selectedLevel === level
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'text-muted hover:text-text border border-transparent hover:border-white/10'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-display text-sm tracking-widest mb-4 text-text">KATEGORIYA</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              className={`w-full text-left text-xs uppercase tracking-wider py-2 px-3 transition-colors ${
                selectedCategory === cat
                  ? 'bg-accent/10 text-accent border border-accent/30'
                  : 'text-muted hover:text-text border border-transparent hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Free only */}
      <div>
        <h4 className="font-display text-sm tracking-widest mb-4 text-text">NARX</h4>
        <button
          onClick={() => setShowFree(!showFree)}
          className={`w-full text-left text-xs uppercase tracking-wider py-2 px-3 transition-colors ${
            showFree
              ? 'bg-accent/10 text-accent border border-accent/30'
              : 'text-muted hover:text-text border border-transparent hover:border-white/10'
          }`}
        >
          Faqat bepul
        </button>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full text-xs uppercase tracking-wider text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 py-2"
        >
          <X size={12} /> Filtrlarni tozalash
        </button>
      )}
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        {/* Header */}
        <div className="border-b border-white/10 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-accent" />
              <span className="text-accent text-xs uppercase tracking-[0.3em]">Katalog</span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl tracking-wider mb-6">KURSLAR</h1>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Kurs qidiring..."
                className="w-full bg-surface border border-white/10 text-text text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-accent/50 transition-colors placeholder:text-muted"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex gap-12">
            {/* Sidebar — desktop */}
            <aside className="hidden lg:block w-56 shrink-0">
              <FilterSidebar />
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-muted text-xs">
                    <span className="text-text font-semibold">{filtered.length}</span> kurs topildi
                  </span>
                  {hasFilters && (
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedLevel && (
                        <Badge variant="accent">
                          {selectedLevel}
                          <button onClick={() => setSelectedLevel('')} className="ml-1">×</button>
                        </Badge>
                      )}
                      {selectedCategory && (
                        <Badge variant="accent">
                          {selectedCategory}
                          <button onClick={() => setSelectedCategory('')} className="ml-1">×</button>
                        </Badge>
                      )}
                      {showFree && (
                        <Badge variant="free">
                          Bepul
                          <button onClick={() => setShowFree(false)} className="ml-1">×</button>
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile filter toggle */}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider text-muted hover:text-text transition-colors border border-white/10 px-3 py-2"
                >
                  <SlidersHorizontal size={12} /> Filtr
                </button>
              </div>

              {/* Mobile sidebar */}
              {sidebarOpen && (
                <div className="lg:hidden mb-8 p-6 border border-white/10 bg-surface">
                  <FilterSidebar />
                </div>
              )}

              {/* Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="font-display text-3xl tracking-wider text-muted mb-3">
                    KURS TOPILMADI
                  </p>
                  <p className="text-muted text-sm">Boshqa kalit so'z yoki filtr sinab ko'ring</p>
                  <button
                    onClick={clearFilters}
                    className="mt-6 text-xs uppercase tracking-wider text-accent hover:text-accent/80 transition-colors"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              ) : (
                <div
                  ref={ref}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-white/5"
                >
                  {filtered.map((course) => (
                    <div key={course.id} data-reveal className="bg-bg">
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
}
