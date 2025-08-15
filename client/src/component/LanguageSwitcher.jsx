import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    localStorage.setItem('preferredLanguage', lng);
    setIsOpen(false); // Close menu after click
  };

  const languages = [
    { code: 'fr', label: 'Français', short: 'FR' },
    { code: 'ar', label: 'العربية', short: 'AR' }
   
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={switcherRef}>
      <button
        aria-label="Language selector"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span className="text-sm font-medium uppercase">
          {i18n.language === 'fr'
            ? 'FR'
            : 'AR'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex w-full items-center px-4 py-2 text-sm ${
                  i18n.language === lang.code
                    ? 'bg-[#FFBD89] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                lang={lang.code}
                dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
              >
                <span className="flex-1 text-left">{lang.label}</span>
                <span className="text-xs opacity-70">{lang.short}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;