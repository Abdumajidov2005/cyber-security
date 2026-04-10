import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../utils/formatDuration';
import { cn } from '../../utils/cn';

const levelColors = {
  Beginner: 'success',
  Intermediate: 'accent',
  Advanced: 'danger',
};

export function CourseListItem({ course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 px-4 border-b border-white/5 hover:bg-accent/[0.04] transition-all duration-400 overflow-hidden"
    >
      {/* Hover underline */}
      <div
        className="absolute bottom-0 left-0 h-px bg-accent transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: '100%',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.closest('a');
          const show = () => (el.style.transform = 'scaleX(1)');
          const hide = () => (el.style.transform = 'scaleX(0)');
          parent.addEventListener('mouseenter', show);
          parent.addEventListener('mouseleave', hide);
        }}
      />

      {/* Number */}
      <span className="font-display text-3xl text-white/10 w-10 shrink-0 group-hover:text-accent/20 transition-colors">
        {String(course.id).padStart(2, '0')}
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-display text-xl tracking-wider text-text group-hover:text-accent transition-colors">
            {course.title}
          </h3>
          <Badge variant={course.isFree ? 'free' : levelColors[course.level] || 'default'}>
            {course.isFree ? 'Bepul' : course.level}
          </Badge>
        </div>
        <p className="text-muted text-xs line-clamp-1">{course.subtitle}</p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-muted shrink-0">
        <span className="hidden md:flex items-center gap-1">
          <Clock size={10} /> {course.duration}
        </span>
        <span className="hidden md:flex items-center gap-1">
          <BookOpen size={10} /> {course.lessons} dars
        </span>
        <span className="flex items-center gap-1">
          <Star size={10} className="text-accent fill-accent" /> {course.rating}
        </span>
      </div>

      {/* Price + Arrow */}
      <div className="flex items-center gap-3 shrink-0">
        <span className={cn(
          'text-sm font-semibold',
          course.isFree ? 'text-accent' : 'text-text'
        )}>
          {formatPrice(course.price)}
        </span>
        <ArrowRight
          size={14}
          className="text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
        />
      </div>
    </Link>
  );
}
