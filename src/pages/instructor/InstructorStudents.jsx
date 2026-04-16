import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockUsers } from '../../data/admin';

const myStudents = mockUsers
  .filter(u => u.role === 'student')
  .map(u => ({
    ...u,
    course: ['SQL Injection Mastery', 'XSS Attacks', 'Web App Pentest'][u.enrollments % 3],
    progress: Math.floor(Math.random() * 100),
    lastActive: '2026-04-' + String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'),
  }));

export function InstructorStudents() {
  const [search, setSearch] = useState('');

  const filtered = myStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-64">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-surface border border-white/8 pl-8 pr-4 py-2 text-xs text-text placeholder:text-muted focus:outline-none focus:border-accent/40 w-full"
        />
      </div>

      <div className="bg-surface border border-white/8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['Student', 'Email', 'Course', 'Progress', 'Last Active'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-accent/15 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <span className="text-text text-sm">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted text-xs">{s.email}</td>
                  <td className="px-5 py-3 text-text/70 text-xs">{s.course}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-white/5">
                        <div className="h-full bg-accent" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted text-xs">{s.lastActive}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted text-sm">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
