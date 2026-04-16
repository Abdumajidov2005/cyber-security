import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { courses } from '../../data/courses';
import { Button } from '../../components/ui/Button';

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const emptyForm = {
  title: '', slug: '', description: '', category: '', level: 'Beginner',
  price: '', isFree: false, thumbnail: '',
  curriculum: [{ section: 'Section 1', lessons: [{ title: '', duration: '', isFree: false }] }],
};

const categories = ['Web Security', 'Network Security', 'Malware Analysis', 'Cryptography', 'Blue Team'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

export function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== 'new';

  const existing = isEdit ? courses.find(c => String(c.id) === String(id)) : null;
  const [form, setForm] = useState(existing ? {
    title: existing.title,
    slug: existing.slug,
    description: existing.description || '',
    category: existing.category,
    level: existing.level,
    price: existing.price,
    isFree: existing.isFree,
    thumbnail: existing.thumbnail || '',
    curriculum: existing.curriculum.map(s => ({
      section: s.section,
      lessons: s.lessons.map(l => ({ title: l.title, duration: l.duration, isFree: l.free })),
    })),
  } : emptyForm);

  const [openSections, setOpenSections] = useState(() => form.curriculum.map((_, i) => i));

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const addSection = () => {
    setForm(p => ({
      ...p,
      curriculum: [...p.curriculum, { section: `Section ${p.curriculum.length + 1}`, lessons: [{ title: '', duration: '', isFree: false }] }],
    }));
    setOpenSections(p => [...p, form.curriculum.length]);
  };

  const removeSection = (si) => {
    setForm(p => ({ ...p, curriculum: p.curriculum.filter((_, i) => i !== si) }));
    setOpenSections(p => p.filter(i => i !== si).map(i => i > si ? i - 1 : i));
  };

  const updateSection = (si, val) => {
    setForm(p => {
      const c = [...p.curriculum];
      c[si] = { ...c[si], section: val };
      return { ...p, curriculum: c };
    });
  };

  const addLesson = (si) => {
    setForm(p => {
      const c = [...p.curriculum];
      c[si] = { ...c[si], lessons: [...c[si].lessons, { title: '', duration: '', isFree: false }] };
      return { ...p, curriculum: c };
    });
  };

  const removeLesson = (si, li) => {
    setForm(p => {
      const c = [...p.curriculum];
      c[si] = { ...c[si], lessons: c[si].lessons.filter((_, i) => i !== li) };
      return { ...p, curriculum: c };
    });
  };

  const updateLesson = (si, li, key, val) => {
    setForm(p => {
      const c = [...p.curriculum];
      const lessons = [...c[si].lessons];
      lessons[li] = { ...lessons[li], [key]: val };
      c[si] = { ...c[si], lessons };
      return { ...p, curriculum: c };
    });
  };

  const toggleSection = (i) => {
    setOpenSections(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
  };

  const handleSubmit = (status) => {
    console.log('Saving course:', { ...form, status });
    navigate('/admin/courses');
  };

  return (
    <div className="max-w-3xl flex flex-col gap-6">
      {/* Basic info */}
      <div className="bg-surface border border-white/8 p-6 flex flex-col gap-4">
        <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/8 pb-3">Basic Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted uppercase tracking-wider">Title *</label>
            <input
              value={form.title}
              onChange={e => { set('title', e.target.value); set('slug', slugify(e.target.value)); }}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40"
              placeholder="Course title"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted uppercase tracking-wider">Slug</label>
            <input
              value={form.slug}
              onChange={e => set('slug', e.target.value)}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text/60 focus:outline-none focus:border-accent/40"
              placeholder="auto-generated"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-muted uppercase tracking-wider">Description</label>
          <textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={4}
            className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40 resize-none"
            placeholder="Course description..."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted uppercase tracking-wider">Category</label>
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40"
            >
              <option value="">Select...</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted uppercase tracking-wider">Level</label>
            <select
              value={form.level}
              onChange={e => set('level', e.target.value)}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40"
            >
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted uppercase tracking-wider">Price (so'm)</label>
            <input
              type="number"
              value={form.isFree ? 0 : form.price}
              onChange={e => set('price', Number(e.target.value))}
              disabled={form.isFree}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40 disabled:opacity-40"
              placeholder="249000"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => set('isFree', !form.isFree)}
            className={`w-10 h-5 rounded-full transition-colors relative ${form.isFree ? 'bg-accent' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${form.isFree ? 'left-5' : 'left-0.5'}`} />
          </button>
          <span className="text-sm text-text/70">Is Free</span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="bg-surface border border-white/8 p-6 flex flex-col gap-4">
        <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/8 pb-3">Thumbnail</h2>
        <div className="flex gap-4 items-start">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs text-muted uppercase tracking-wider">Thumbnail URL</label>
            <input
              value={form.thumbnail}
              onChange={e => set('thumbnail', e.target.value)}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40"
              placeholder="https://..."
            />
          </div>
          <div className="w-24 h-16 bg-bg border border-white/8 flex items-center justify-center text-muted text-xs flex-shrink-0 mt-6 overflow-hidden">
            {form.thumbnail ? <img src={form.thumbnail} alt="" className="w-full h-full object-cover" /> : 'Preview'}
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="bg-surface border border-white/8 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/8 pb-3">
          <h2 className="text-xs uppercase tracking-widest text-muted">Curriculum</h2>
          <button
            onClick={addSection}
            className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 transition-colors"
          >
            <Plus size={12} /> Add Section
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {form.curriculum.map((sec, si) => (
            <div key={si} className="border border-white/8">
              {/* Section header */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-white/3">
                <GripVertical size={14} className="text-muted/40 cursor-grab" />
                <input
                  value={sec.section}
                  onChange={e => updateSection(si, e.target.value)}
                  className="flex-1 bg-transparent text-sm text-text focus:outline-none"
                  placeholder="Section title"
                />
                <button onClick={() => toggleSection(si)} className="text-muted hover:text-text p-1">
                  {openSections.includes(si) ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
                <button onClick={() => removeSection(si)} className="text-muted hover:text-red-400 p-1">
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Lessons */}
              {openSections.includes(si) && (
                <div className="p-3 flex flex-col gap-2">
                  {sec.lessons.map((lesson, li) => (
                    <div key={li} className="flex items-center gap-2">
                      <GripVertical size={12} className="text-muted/30 cursor-grab flex-shrink-0" />
                      <input
                        value={lesson.title}
                        onChange={e => updateLesson(si, li, 'title', e.target.value)}
                        className="flex-1 bg-bg border border-white/8 px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/40"
                        placeholder="Lesson title"
                      />
                      <input
                        value={lesson.duration}
                        onChange={e => updateLesson(si, li, 'duration', e.target.value)}
                        className="w-20 bg-bg border border-white/8 px-2 py-1.5 text-xs text-text focus:outline-none focus:border-accent/40"
                        placeholder="12:30"
                      />
                      <label className="flex items-center gap-1 text-xs text-muted cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lesson.isFree}
                          onChange={e => updateLesson(si, li, 'isFree', e.target.checked)}
                          className="accent-accent"
                        />
                        Free
                      </label>
                      <button onClick={() => removeLesson(si, li)} className="text-muted hover:text-red-400 p-1">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addLesson(si)}
                    className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors mt-1 ml-5"
                  >
                    <Plus size={11} /> Add Lesson
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <button
          onClick={() => navigate('/admin/courses')}
          className="px-5 py-2.5 text-xs text-muted border border-white/10 hover:border-white/20 hover:text-text transition-colors uppercase tracking-wider"
        >
          Cancel
        </button>
        <Button variant="outline" size="sm" onClick={() => handleSubmit('draft')}>
          Save as Draft
        </Button>
        <Button size="sm" onClick={() => handleSubmit('published')}>
          Publish
        </Button>
      </div>
    </div>
  );
}
