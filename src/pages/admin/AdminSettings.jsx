import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Save } from 'lucide-react';

function Section({ title, children }) {
  return (
    <div className="bg-surface border border-white/8 p-6 flex flex-col gap-4">
      <h2 className="text-xs uppercase tracking-widest text-muted border-b border-white/8 pb-3">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-muted uppercase tracking-wider">{label}</label>
      {children}
      {hint && <p className="text-[11px] text-muted/60">{hint}</p>}
    </div>
  );
}

export function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'CyberLearn',
    platformUrl: 'https://cyberlearn.uz',
    supportEmail: 'support@cyberlearn.uz',
    instructorShare: 70,
    platformFee: 30,
    currency: 'UZS',
    maintenanceMode: false,
    registrationOpen: true,
    emailVerification: true,
    maxFileSize: 500,
    defaultLanguage: 'uz',
  });

  const set = (key, val) => setSettings(p => ({ ...p, [key]: val }));

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="max-w-2xl flex flex-col gap-5">
      <Section title="General">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Platform Name">
            <input value={settings.platformName} onChange={e => set('platformName', e.target.value)}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40" />
          </Field>
          <Field label="Platform URL">
            <input value={settings.platformUrl} onChange={e => set('platformUrl', e.target.value)}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40" />
          </Field>
        </div>
        <Field label="Support Email">
          <input value={settings.supportEmail} onChange={e => set('supportEmail', e.target.value)}
            className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40" />
        </Field>
        <Field label="Default Language">
          <select value={settings.defaultLanguage} onChange={e => set('defaultLanguage', e.target.value)}
            className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40">
            <option value="uz">O'zbek</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </Field>
      </Section>

      <Section title="Revenue Sharing">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Instructor Share (%)" hint="Percentage paid to instructors">
            <input type="number" min={0} max={100} value={settings.instructorShare}
              onChange={e => { set('instructorShare', Number(e.target.value)); set('platformFee', 100 - Number(e.target.value)); }}
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40" />
          </Field>
          <Field label="Platform Fee (%)" hint="Platform's cut">
            <input type="number" value={settings.platformFee} readOnly
              className="bg-bg border border-white/8 px-3 py-2 text-sm text-muted cursor-not-allowed" />
          </Field>
        </div>
        <Field label="Currency">
          <select value={settings.currency} onChange={e => set('currency', e.target.value)}
            className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40">
            <option value="UZS">UZS — Uzbek So'm</option>
            <option value="USD">USD — US Dollar</option>
          </select>
        </Field>
      </Section>

      <Section title="Access Control">
        {[
          { key: 'registrationOpen', label: 'Open Registration', hint: 'Allow new users to register' },
          { key: 'emailVerification', label: 'Email Verification', hint: 'Require email verification on signup' },
          { key: 'maintenanceMode', label: 'Maintenance Mode', hint: 'Show maintenance page to all visitors' },
        ].map(({ key, label, hint }) => (
          <div key={key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div>
              <p className="text-sm text-text">{label}</p>
              <p className="text-xs text-muted">{hint}</p>
            </div>
            <button
              onClick={() => set(key, !settings[key])}
              className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${settings[key] ? 'bg-accent' : 'bg-white/10'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${settings[key] ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        ))}
      </Section>

      <Section title="Media">
        <Field label="Max Upload Size (MB)">
          <input type="number" value={settings.maxFileSize} onChange={e => set('maxFileSize', Number(e.target.value))}
            className="bg-bg border border-white/8 px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40 w-32" />
        </Field>
      </Section>

      <div className="flex justify-end">
        <Button size="sm" onClick={handleSave} className="gap-2">
          <Save size={13} /> Save Settings
        </Button>
      </div>
    </div>
  );
}
