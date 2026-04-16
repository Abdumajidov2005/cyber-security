import React, { useState } from 'react';
import { instructors } from '../../data/instructors';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Star, Users, BookOpen } from 'lucide-react';

export function InstructorManagement() {
  const [list] = useState(instructors.map(i => ({ ...i, status: 'active' })));

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map(inst => (
          <div key={inst.id} className="bg-surface border border-white/8 p-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-accent/15 flex items-center justify-center text-accent text-lg font-bold flex-shrink-0">
                {inst.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-text font-medium text-sm truncate">{inst.name}</h3>
                  <StatusBadge status="instructor" />
                </div>
                <p className="text-xs text-muted mt-0.5 truncate">{inst.title}</p>
              </div>
            </div>

            <p className="text-xs text-text/60 leading-relaxed line-clamp-2">{inst.bio}</p>

            <div className="grid grid-cols-3 gap-2 border-t border-white/8 pt-3">
              <div className="flex flex-col items-center gap-1">
                <BookOpen size={13} className="text-accent" />
                <span className="text-sm text-text font-medium">{inst.courses}</span>
                <span className="text-[10px] text-muted">Courses</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Users size={13} className="text-accent" />
                <span className="text-sm text-text font-medium">{inst.students?.toLocaleString()}</span>
                <span className="text-[10px] text-muted">Students</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Star size={13} className="text-accent" />
                <span className="text-sm text-text font-medium">{inst.rating}</span>
                <span className="text-[10px] text-muted">Rating</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-1.5 text-xs border border-white/10 text-muted hover:text-text hover:border-white/20 transition-colors uppercase tracking-wider">
                View Profile
              </button>
              <button className="flex-1 py-1.5 text-xs border border-accent/30 text-accent hover:bg-accent/8 transition-colors uppercase tracking-wider">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
