import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, Users } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatPrice } from '../../utils/formatDuration';
import { cn } from '../../utils/cn';

const levelColors = {
  Beginner: 'success',
  Intermediate: 'accent',
  Advanced: 'danger',
};

export function CourseCard({ course, className }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className={cn(
        'group block bg-surface border border-white/5 hover:border-accent/20 transition-all duration-400',
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-44 bg-bg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl text-white/5 tracking-widest">
            {course.title.charAt(0)}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={course.isFree ? 'free' : 'default'}>
            {course.isFree ? 'Bepul' : course.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={levelColors[course.level] || 'default'}>
            {course.level}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg tracking-wider text-text group-hover:text-accent transition-colors leading-tight mb-2">
          {course.title}
        </h3>
        <p className="text-muted text-xs leading-relaxed line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[11px] text-muted mb-4">
          <span className="flex items-center gap-1">
            <Clock size={10} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={10} /> {course.lessons}
          </span>
          <span className="flex items-center gap-1">
            <Users size={10} /> {course.students.toLocaleString()}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-1">
            <Star size={11} className="text-accent fill-accent" />
            <span className="text-xs text-text font-medium">{course.rating}</span>
            <span className="text-xs text-muted">({course.reviews})</span>
          </div>
          <span className={cn(
            'text-sm font-semibold',
            course.isFree ? 'text-accent' : 'text-text'
          )}>
            {formatPrice(course.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
