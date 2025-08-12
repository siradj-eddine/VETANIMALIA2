import React from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
    localStorage.setItem('preferredLanguage', lng); // Save preference
  };

  const languages = [
    { code: 'fr', label: 'Français', short: 'FR' },
    { code: 'ar', label: 'العربية', short: 'AR' }
  ];

  return (
    <div className="relative group">
      <button 
        aria-label="Language selector"
        className="flex items-center gap-1 p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <GlobeAltIcon className="h-5 w-5" />
        <span className="text-sm font-medium uppercase">
          {i18n.language === 'fr' ? 'FR' : 'AR'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-50">
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
    </div>
  );
};

export default LanguageSwitcher;