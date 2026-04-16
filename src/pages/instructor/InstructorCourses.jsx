import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Eye } from 'lucide-react';
import { courses } from '../../data/courses';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Button } from '../../components/ui/Button';

const myCourses = courses.slice(0, 4).map((c, i) => ({
  ...c,
  status: i % 3 === 2 ? 'draft' : 'published',
  revenue: c.students * (c.price || 0) * 0.7,
}));

export function InstructorCourses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Link to="/instructor/courses/new">
          <Button size="sm" className="gap-1.5">
            <Plus size={13} /> New Course
          </Button>
        </Link>
      </div>

      <div className="bg-surface border border-white/8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['Title', 'Students', 'Rating', 'Revenue (70%)', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myCourses.map(c => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3 text-text font-medium max-w-[200px] truncate">{c.title}</td>
                  <td className="px-5 py-3 text-text/70">{c.students?.toLocaleString()}</td>
                  <td className="px-5 py-3 text-accent">★ {c.rating}</td>
                  <td className="px-5 py-3 text-text">{c.revenue > 0 ? `${c.revenue.toLocaleString()} so'm` : '—'}</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/instructor/courses/${c.id}`} className="p-1.5 text-muted hover:text-accent transition-colors">
                        <Edit2 size={13} />
                      </Link>
                      <Link to={`/courses/${c.slug}`} className="p-1.5 text-muted hover:text-text transition-colors">
                        <Eye size={13} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
