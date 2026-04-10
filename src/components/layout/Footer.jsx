import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-accent" />
              <span className="font-display text-lg tracking-widest">CYBERLEARN</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              O'zbekistondagi eng yaxshi kiberxavfsizlik ta'lim platformasi.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[Twitter, Github, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-muted hover:text-accent transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display tracking-widest text-sm mb-4 text-text">KURSLAR</h4>
            <ul className="space-y-2">
              {['Web Security', 'Penetration Testing', 'Malware Analysis', 'Blue Team', 'CTF'].map((item) => (
                <li key={item}>
                  <Link
                    to="/courses"
                    className="text-muted text-sm hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display tracking-widest text-sm mb-4 text-text">KOMPANIYA</h4>
            <ul className="space-y-2">
              {['Biz haqimizda', 'Instruktorlar', 'Blog', 'Karyera', 'Aloqa'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted text-sm hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display tracking-widest text-sm mb-4 text-text">YORDAM</h4>
            <ul className="space-y-2">
              {["FAQ", "Maxfiylik siyosati", "Foydalanish shartlari", "Qaytarish siyosati"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted text-sm hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs tracking-wider">
            © 2024 CyberLearn. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-muted text-xs tracking-wider">
            Toshkent, O'zbekiston
          </p>
        </div>
      </div>
    </footer>
  );
}
