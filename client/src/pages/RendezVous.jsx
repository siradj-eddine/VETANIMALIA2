import React, { useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaPaw, FaUser, FaPhone, FaNotesMedical } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const RendezVous = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  
  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
           {
      // Explicitly map form fields to template variables
      // parentName: e.target.parentName.value,
      // petName: e.target.petName.value,
      // petBreed: e.target.petBreed.value,
      // meetDate: e.target.meetDate.value,
      // phoneNumber: e.target.phoneNumber.value,
      // symptoms: e.target.symptoms.value
    }
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSendStatus("success");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSendStatus("error");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen w-full flex flex-col font-sans">
      <main className="flex justify-center items-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
          <header className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {t('appointment.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto">
              {t('appointment.subtitle')}
            </p>
          </header>

          {/* Status Messages */}
          {sendStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 font-medium">
                    {t('appointment.success_message')}
                  </p>
                </div>
              </div>
            </div>
          )}
          {sendStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">
                    {t('appointment.error_message')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form 
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Parent Name with Icon */}
            <div className="relative">
              <label htmlFor="parentName" className="block text-gray-700 font-medium mb-2">
                <FaUser className="inline mr-2 text-orange-400" />
                {t('appointment.owner')}
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                placeholder={t('appointment.owner_placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              />
              <FaUser className="absolute left-3 top-11 text-gray-400" />
            </div>
            
            {/* Pet Breed */}
            <div>
              <label htmlFor="petBreed" className="block text-gray-700 font-medium mb-2">
                {t('appointment.breed')}
              </label>
              <select
                id="petBreed"
                name="petBreed"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              >
                <option value="">{t('appointment.breed_placeholder')}</option>
                <option value="dog">{t('appointment.breed_options.dog')}</option>
                <option value="cat">{t('appointment.breed_options.cat')}</option>
                <option value="bird">{t('appointment.breed_options.bird')}</option>
                <option value="rodent">{t('appointment.breed_options.rodent')}</option>
                <option value="other">{t('appointment.breed_options.other')}</option>
              </select>
            </div>
            
            {/* Date with Icon */}
            <div className="relative">
              <label htmlFor="meetDate" className="block text-gray-700 font-medium mb-2">
                <FaCalendarAlt className="inline mr-2 text-orange-400" />
                {t('appointment.date')}
              </label>
              <input
                type="date"
                id="meetDate"
                name="meetDate"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              />
              <FaCalendarAlt className="absolute left-3 top-11 text-gray-400" />
            </div>
            
            {/* Pet Name with Icon */}
            <div className="relative">
              <label htmlFor="petName" className="block text-gray-700 font-medium mb-2">
                <FaPaw className="inline mr-2 text-orange-400" />
                {t('appointment.pet')}
              </label>
              <input
                type="text"
                id="petName"
                name="petName"
                placeholder={t('appointment.pet_placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                
              />
              <FaPaw className="absolute left-3 top-11 text-gray-400" />
            </div>
            
            {/* Phone Number with Icon */}
            <div className="relative">
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                <FaPhone className="inline mr-2 text-orange-400" />
                {t('appointment.phone')}
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                required
              />
              <FaPhone className="absolute left-3 top-11 text-gray-400" />
            </div>
            
            {/* Symptoms with Icon */}
            <div className="md:col-span-2 relative">
              <label htmlFor="symptoms" className="block text-gray-700 font-medium mb-2">
                <FaNotesMedical className="inline mr-2 text-orange-400" />
                {t('appointment.symptoms')}
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent min-h-[120px]"
                rows="4"
              ></textarea>
              <FaNotesMedical className="absolute left-3 top-12 text-gray-400" />
            </div>
            
            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSending}
                className={`w-full ${isSending ? 'bg-orange-300' : 'bg-orange-400 hover:bg-orange-500'} text-white font-bold py-4 px-6 rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 text-lg`}
              >
                {isSending ? t('appointment.sending') : t('appointment.submit')}
              </button>
            </div>
          </form>
          
          {/* Emergency Notice */}
          <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {t('appointment.emergency')} <span className="font-bold">0770807185</span> (24h/24)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RendezVous;