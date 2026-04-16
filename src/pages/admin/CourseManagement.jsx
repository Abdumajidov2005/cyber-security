import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Eye, Trash2 } from 'lucide-react';
import { courses } from '../../data/courses';
import { DataTable, Pagination } from '../../components/admin/DataTable';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { Button } from '../../components/ui/Button';

const PER_PAGE = 10;

const initialCourses = courses.map((c, i) => ({
  ...c,
  status: i % 4 === 3 ? 'draft' : 'published',
}));

export function CourseManagement() {
  const navigate = useNavigate();
  const [list, setList] = useState(initialCourses);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const categories = [...new Set(courses.map(c => c.category))];
  const levels = [...new Set(courses.map(c => c.level))];

  const filtered = useMemo(() => {
    return list.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = !filterCat || c.category === filterCat;
      const matchLevel = !filterLevel || c.level === filterLevel;
      const matchStatus = !filterStatus || c.status === filterStatus;
      return matchSearch && matchCat && matchLevel && matchStatus;
    });
  }, [list, search, filterCat, filterLevel, filterStatus]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleStatus = (id) => {
    setList(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'published' ? 'draft' : 'published' } : c
    ));
  };

  const deleteCourse = (id) => {
    if (window.confirm('Delete this course?')) setList(prev => prev.filter(c => c.id !== id));
  };

  const bulkAction = (action) => {
    if (action === 'delete') {
      if (window.confirm(`Delete ${selected.length} courses?`)) {
        setList(prev => prev.filter(c => !selected.includes(c.id)));
        setSelected([]);
      }
    } else {
      setList(prev => prev.map(c =>
        selected.includes(c.id) ? { ...c, status: action } : c
      ));
      setSelected([]);
    }
  };

  const columns = [
    {
      key: 'id',
      label: '#',
      render: (_, row) => <span className="text-muted text-xs">{row.id}</span>,
    },
    {
      key: 'thumbnail',
      label: 'Thumb',
      render: (_, row) => (
        <div className="w-12 h-8 bg-white/5 border border-white/8 flex items-center justify-center text-muted text-[10px]">
          {row.thumbnail ? <img src={row.thumbnail} alt="" className="w-full h-full object-cover" /> : 'IMG'}
        </div>
      ),
    },
    { key: 'title', label: 'Title', sortable: true, render: (v) => <span className="text-text font-medium max-w-[180px] truncate block">{v}</span> },
    { key: 'category', label: 'Category', render: (v) => <span className="text-muted text-xs">{v}</span> },
    { key: 'level', label: 'Level', render: (v) => <span className="text-muted text-xs">{v}</span> },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (v) => v === 0 ? <span className="text-green-400 text-xs">Free</span> : <span className="text-xs">{v.toLocaleString()} so'm</span>,
    },
    { key: 'students', label: 'Students', sortable: true, render: (v) => <span className="text-xs">{v?.toLocaleString()}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (v, row) => (
        <button onClick={(e) => { e.stopPropagation(); toggleStatus(row.id); }}>
          <StatusBadge status={v} />
        </button>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => navigate(`/admin/courses/${row.id}`)}
            className="p-1.5 text-muted hover:text-accent transition-colors"
            title="Edit"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={() => navigate(`/courses/${row.slug}`)}
            className="p-1.5 text-muted hover:text-text transition-colors"
            title="Preview"
          >
            <Eye size={13} />
          </button>
          <button
            onClick={() => deleteCourse(row.id)}
            className="p-1.5 text-muted hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="bg-surface border border-white/8 pl-8 pr-4 py-2 text-xs text-text placeholder:text-muted focus:outline-none focus:border-accent/40 w-48"
            />
          </div>
          <select
            value={filterCat}
            onChange={e => { setFilterCat(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={filterLevel}
            onChange={e => { setFilterLevel(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          >
            <option value="">All Levels</option>
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className="bg-surface border border-white/8 px-3 py-2 text-xs text-text focus:outline-none focus:border-accent/40"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <Link to="/admin/courses/new">
          <Button size="sm" className="gap-1.5">
            <Plus size={13} /> Add Course
          </Button>
        </Link>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 bg-accent/8 border border-accent/20 px-4 py-2 text-xs">
          <span className="text-accent">{selected.length} selected</span>
          <button onClick={() => bulkAction('published')} className="text-green-400 hover:underline">Publish</button>
          <button onClick={() => bulkAction('draft')} className="text-muted hover:underline">Unpublish</button>
          <button onClick={() => bulkAction('delete')} className="text-red-400 hover:underline">Delete</button>
          <button onClick={() => setSelected([])} className="ml-auto text-muted hover:text-text">Clear</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-surface border border-white/8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/8">
                <th className="px-4 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={selected.length === paginated.length && paginated.length > 0}
                    onChange={e => setSelected(e.target.checked ? paginated.map(r => r.id) : [])}
                    className="accent-accent"
                  />
                </th>
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-3 text-left text-xs uppercase tracking-widest text-muted font-medium whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row, i) => (
                <tr key={row.id || i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={e => setSelected(prev =>
                        e.target.checked ? [...prev, row.id] : prev.filter(id => id !== row.id)
                      )}
                      className="accent-accent"
                    />
                  </td>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-text/80 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-muted text-sm">
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
      </div>
    </div>
  );
}
