import React from 'react';
import { X, BookOpen, CreditCard, Activity } from 'lucide-react';
import { StatusBadge } from '../../components/admin/StatusBadge';

const mockEnrolledCourses = [
  { title: 'SQL Injection Mastery', progress: 100 },
  { title: 'XSS Attacks', progress: 27 },
  { title: 'Web App Pentest', progress: 11 },
];

const mockPayments = [
  { id: 'PAY-0012', course: 'XSS Attacks', amount: 249000, date: '2024-02-10', status: 'success' },
  { id: 'PAY-0008', course: 'Web App Pentest', amount: 349000, date: '2024-01-22', status: 'success' },
];

const mockActivity = [
  { text: 'Completed lesson: DOM-Based XSS', date: '2024-04-09' },
  { text: 'Enrolled in Web App Pentest', date: '2024-03-15' },
  { text: 'Earned certificate: SQL Injection Mastery', date: '2024-03-10' },
  { text: 'Completed lesson: Union-Based Attacks', date: '2024-02-28' },
  { text: 'Enrolled in XSS Attacks', date: '2024-02-10' },
];

export function UserDetail({ user, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface border border-white/10 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8 sticky top-0 bg-surface z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/15 flex items-center justify-center text-accent font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-text font-medium">{user.name}</h3>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={user.role} />
            <StatusBadge status={user.status} />
            <button onClick={onClose} className="text-muted hover:text-text p-1 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Profile info */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Joined', value: user.joined },
              { label: 'Enrollments', value: user.enrollments },
              { label: 'Status', value: user.status },
            ].map(item => (
              <div key={item.label} className="bg-bg border border-white/8 p-3">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm text-text">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Enrolled courses */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={13} className="text-accent" />
              <h4 className="text-xs uppercase tracking-widest text-muted">Enrolled Courses</h4>
            </div>
            <div className="flex flex-col gap-2">
              {mockEnrolledCourses.map((c, i) => (
                <div key={i} className="flex items-center gap-3 bg-bg border border-white/8 px-3 py-2">
                  <span className="text-sm text-text/80 flex-1">{c.title}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/5">
                      <div className="h-full bg-accent" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted w-8 text-right">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment history */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={13} className="text-accent" />
              <h4 className="text-xs uppercase tracking-widest text-muted">Payment History</h4>
            </div>
            <div className="border border-white/8">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/8">
                    {['ID', 'Course', 'Amount', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-muted uppercase tracking-wider font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockPayments.map(p => (
                    <tr key={p.id} className="border-b border-white/5">
                      <td className="px-3 py-2 text-muted">{p.id}</td>
                      <td className="px-3 py-2 text-text/80">{p.course}</td>
                      <td className="px-3 py-2 text-text">{p.amount.toLocaleString()} so'm</td>
                      <td className="px-3 py-2 text-muted">{p.date}</td>
                      <td className="px-3 py-2"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity log */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={13} className="text-accent" />
              <h4 className="text-xs uppercase tracking-widest text-muted">Activity Log</h4>
            </div>
            <div className="flex flex-col gap-1.5">
              {mockActivity.map((a, i) => (
                <div key={i} className="flex items-center justify-between bg-bg border border-white/8 px-3 py-2">
                  <span className="text-xs text-text/70">{a.text}</span>
                  <span className="text-xs text-muted ml-4 flex-shrink-0">{a.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
