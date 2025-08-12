import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import RegisterImage from '../photo/imgs/register2.jpg';

const LoginPage = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <main className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t('login.title')}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            {t('login.subtitle')}
          </p>
        </header>

        {/* Login Card */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Login Form Section */}
            <article className="w-full lg:w-1/2 p-8 sm:p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t('login.welcome')}
                </h2>
                
         
                
                <div className="flex items-center my-6" aria-hidden="true">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">{t('login.or')}</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('login.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="votre@email.com"
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      aria-required="true"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('login.password')}
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                      aria-required="true"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
              
                    
                    </div>
           
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                    aria-label={t('login.login')}
                  >
                    {t('login.login')}
                  </button>
                </form>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                  {t('login.no_account')}{' '}
                  <Link 
                    to="/signup" 
                    className="font-medium text-orange-400 hover:text-orange-500"
                    aria-label={t('login.signup')}
                  >
                    {t('login.signup')}
                  </Link>
                </p>
              </div>
            </article>
            
            {/* Visual Section */}
            <aside className="hidden lg:block lg:w-1/2 bg-orange-50">
              <img
                src={RegisterImage}
                alt={t('login.image_alt')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;