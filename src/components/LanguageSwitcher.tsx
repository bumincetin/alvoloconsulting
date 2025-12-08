"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  { code: 'tr', label: 'Türkçe' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={handleChange}
        className="p-2 rounded-md border focus:outline-none transition-colors text-sm font-medium"
        style={{
          borderColor: 'var(--border-primary)',
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          minWidth: '100px'
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--brand-blue)';
          e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
        }}
        onMouseOver={e => {
          e.currentTarget.style.borderColor = 'var(--brand-blue)';
        }}
        onMouseOut={e => {
          if (document.activeElement !== e.currentTarget) {
            e.currentTarget.style.borderColor = 'var(--border-primary)';
          }
        }}
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} style={{backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)'}}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}; 