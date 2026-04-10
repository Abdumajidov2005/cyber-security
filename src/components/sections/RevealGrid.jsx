import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { courses } from '../../data/courses';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../utils/formatDuration';
import { Star, Clock, BookOpen } from 'lucide-react';

const levelColors = {
  Beginner: 'success',
  Intermediate: 'accent',
  Advanced: 'danger',
};

export function RevealGrid() {
  const ref = useScrollReveal({ stagger: true });

  return (
    <section className="py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-accent" />
              <span className="text-accent text-xs uppercase tracking-[0.3em]">Kurslar</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl tracking-wider text-text">
              MASHHUR KURSLAR
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors flex items-center gap-2 self-start md:self-auto"
          >
            Barchasini ko'rish <span>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {courses.slice(0, 6).map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              data-reveal
              className="group bg-bg hover:bg-surface transition-colors duration-300 p-8 flex flex-col gap-4 border border-transparent hover:border-white/10"
            >
              {/* Category line */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted">
                  {course.category}
                </span>
                <Badge variant={levelColors[course.level] || 'default'}>
                  {course.level}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl tracking-wider text-text group-hover:text-accent transition-colors leading-tight">
                {course.title}
              </h3>

              <p className="text-muted text-sm leading-relaxed line-clamp-2">
                {course.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted mt-auto pt-4 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen size={11} /> {course.lessons} dars
                </span>
                <span className="flex items-center gap-1 ml-auto">
                  <Star size={11} className="text-accent fill-accent" /> {course.rating}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className={course.isFree ? 'text-accent font-semibold text-sm' : 'text-text text-sm font-semibold'}>
                  {formatPrice(course.price)}
                </span>
                <span className="text-accent text-xs group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
