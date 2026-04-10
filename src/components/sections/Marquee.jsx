import React from 'react';

const items = [
  'SQL INJECTION',
  'XSS ATTACKS',
  'PENETRATION TESTING',
  'MALWARE ANALYSIS',
  'CRYPTOGRAPHY',
  'BURP SUITE',
  'METASPLOIT',
  'OSINT',
  'ACTIVE DIRECTORY',
  'CTF CHALLENGES',
  'REVERSE ENGINEERING',
  'THREAT HUNTING',
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-white/10 py-4 overflow-hidden bg-surface/50">
      <div
        className="marquee-track flex gap-0 whitespace-nowrap"
        style={{
          animation: 'marquee 18s linear infinite',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="font-display text-sm tracking-[0.2em] text-muted hover:text-accent transition-colors cursor-default">
              {item}
            </span>
            <span className="text-accent/40 text-xs">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
