import React, { useState } from 'react';
import { Plus, Trash2, Clock } from 'lucide-react';

export function NotePanel({ lessonId, currentTime }) {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        timestamp: currentTime,
        lessonId,
      },
    ]);
    setInput('');
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-display text-sm tracking-widest text-text">ESLATMALAR</h3>
      </div>

      {/* Input */}
      <div className="p-4 border-b border-white/10">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Eslatma qo'shing..."
          className="w-full bg-bg border border-white/10 text-text text-xs p-3 resize-none h-20 focus:outline-none focus:border-accent/50 transition-colors placeholder:text-muted"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) addNote();
          }}
        />
        <button
          onClick={addNote}
          className="mt-2 w-full flex items-center justify-center gap-2 border border-accent/30 text-accent text-xs uppercase tracking-wider py-2 hover:bg-accent/10 transition-colors"
        >
          <Plus size={12} /> Qo'shish
        </button>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notes.length === 0 ? (
          <p className="text-muted text-xs text-center py-8">
            Hali eslatmalar yo'q
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border border-white/5 p-3 group hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-[10px] text-accent">
                  <Clock size={9} /> {formatTime(note.timestamp)}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={11} />
                </button>
              </div>
              <p className="text-xs text-text leading-relaxed">{note.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
