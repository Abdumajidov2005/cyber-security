import React, { useState, useMemo } from 'react';
import { Check, EyeOff, Trash2, Star } from 'lucide-react';
import { mockReviews, ratingDistribution } from '../../data/reviews';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { RatingChart } from '../../components/admin/EnrollmentChart';

export function ReviewModeration() {
  const [reviews, setReviews] = useState(mockReviews);
  const [filter, setFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = [...new Set(mockReviews.map(r => r.course.slug))].map(slug => {
    const r = mockReviews.find(r => r.course.slug === slug);
    return { slug, title: r.course.title };
  });

  const filtered = useMemo(() => {
    return reviews.filter(r => {
      const matchFilter = filter === 'all' || r.status === filter;
      const matchCourse = !selectedCourse || r.course.slug === selectedCourse;
      return matchFilter && matchCourse;
    });
  }, [reviews, filter, selectedCourse]);

  const approve = (id) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
  const hide = (id) => setReviews(prev => prev.map(r => r.id === id ? { ...r, status: 'hidden' } : r));
  const remove = (id) => { if (window.confirm('Delete review?')) setReviews(prev => prev.filter(r => r.id !== id)); };

  const tabs = ['all', 'pending', 'approved', 'hidden'];

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex gap-1">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                filter === t
                  ? 'bg-accent text-bg font-semibold'
                  : 'border border-white/10 text-muted hover:text-text hover:border-white/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
        >
          <option value="">All Courses</option>
          {courses.map(c => <option key={c.slug} value={c.slug}>{c.title}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Reviews list */}
        <div className="xl:col-span-2 flex flex-col gap-3">
          {filtered.map(review => (
            <div key={review.id} className="bg-surface border border-white/8 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 bg-accent/15 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                    {review.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-text font-medium">{review.user}</span>
                      <span className="text-xs text-muted">on</span>
                      <span className="text-xs text-accent truncate">{review.course.title}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < review.rating ? 'text-accent fill-accent' : 'text-white/10'}
                        />
                      ))}
                      <span className="text-xs text-muted ml-1">{review.date}</span>
                    </div>
                    <p className="text-sm text-text/70 mt-2 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <StatusBadge status={review.status} />
                  <div className="flex items-center gap-1">
                    {review.status !== 'approved' && (
                      <button
                        onClick={() => approve(review.id)}
                        className="p-1.5 text-muted hover:text-green-400 transition-colors"
                        title="Approve"
                      >
                        <Check size={13} />
                      </button>
                    )}
                    {review.status !== 'hidden' && (
                      <button
                        onClick={() => hide(review.id)}
                        className="p-1.5 text-muted hover:text-amber-400 transition-colors"
                        title="Hide"
                      >
                        <EyeOff size={13} />
                      </button>
                    )}
                    <button
                      onClick={() => remove(review.id)}
                      className="p-1.5 text-muted hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-surface border border-white/8 p-10 text-center text-muted text-sm">
              No reviews found
            </div>
          )}
        </div>

        {/* Rating distribution */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-widest text-muted">Rating Distribution</h3>
          {courses.map(c => (
            <div key={c.slug} className="bg-surface border border-white/8 p-4">
              <p className="text-xs text-text/70 mb-2 truncate">{c.title}</p>
              <RatingChart data={ratingDistribution[c.slug] || [0, 0, 0, 0, 0]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
