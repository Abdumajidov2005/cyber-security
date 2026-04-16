import React, { useState, useMemo } from 'react';
import { Search, Eye, Edit2, Trash2, Ban } from 'lucide-react';
import { mockUsers } from '../../data/admin';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Pagination } from '../../components/admin/DataTable';
import { UserDetail } from './UserDetail';

const PER_PAGE = 10;

export function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const q = search.toLowerCase();
      const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole = !filterRole || u.role === filterRole;
      const matchStatus = !filterStatus || u.status === filterStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, filterRole, filterStatus]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleBan = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === 'banned' ? 'active' : 'banned' } : u
    ));
  };

  const deleteUser = (id) => {
    if (window.confirm('Delete this user?')) setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 pl-8 pr-4 py-2 text-xs text-text placeholder:text-muted focus:outline-none focus:border-accent/40 w-52"
          />
        </div>
        <select
          value={filterRole}
          onChange={e => { setFilterRole(e.target.value); setPage(1); }}
          className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={filterStatus}
          onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
          className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface border border-white/8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                {['Avatar', 'Name', 'Email', 'Role', 'Joined', 'Enrollments', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(user => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 bg-accent/15 flex items-center justify-center text-accent text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text font-medium text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-muted text-xs">{user.email}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.role} /></td>
                  <td className="px-4 py-3 text-muted text-xs">{user.joined}</td>
                  <td className="px-4 py-3 text-text/70 text-xs">{user.enrollments}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-1.5 text-muted hover:text-accent transition-colors"
                        title="View"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => toggleBan(user.id)}
                        className={`p-1.5 transition-colors ${user.status === 'banned' ? 'text-green-400 hover:text-green-300' : 'text-muted hover:text-amber-400'}`}
                        title={user.status === 'banned' ? 'Unban' : 'Ban'}
                      >
                        <Ban size={13} />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-1.5 text-muted hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-muted text-sm">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      {/* User detail modal */}
      {selectedUser && (
        <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
