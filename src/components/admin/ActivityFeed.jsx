import React from 'react';
import { UserPlus, Star, CreditCard, BookOpen } from 'lucide-react';

const iconMap = {
  enroll:  { Icon: BookOpen,   color: 'text-accent',      bg: 'bg-accent/10' },
  review:  { Icon: Star,       color: 'text-amber-400',   bg: 'bg-amber-400/10' },
  payment: { Icon: CreditCard, color: 'text-green-400',   bg: 'bg-green-400/10' },
  user:    { Icon: UserPlus,   color: 'text-blue-400',    bg: 'bg-blue-400/10' },
};

export function ActivityFeed({ items }) {
  return (
    <div className="bg-surface border border-white/8 p-5">
      <h3 className="text-xs uppercase tracking-widest text-muted mb-4">Recent Activity</h3>
      <div className="flex flex-col divide-y divide-white/5">
        {items.map((item) => {
          const { Icon, color, bg } = iconMap[item.icon] || iconMap.user;
          return (
            <div key={item.id} className="flex items-start gap-3 py-3">
              <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center ${bg}`}>
                <Icon size={14} className={color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text/80 leading-snug">{item.text}</p>
                <p className="text-xs text-muted mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
