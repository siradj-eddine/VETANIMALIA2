import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// Import images with descriptive names
import catHomeImage from "../photo/imgs/cathomeu.png";
import diamondIcon from "../photo/imgs/diamon.png";
import bookIcon from "../photo/imgs/book.png";
import peopleIcon from "../photo/imgs/ppl2.png";
import clinicImage from "../photo/imgs/vetrine.png";
import surgeryImage from "../photo/imgs/surger3.png";
import therapyImage from "../photo/imgs/terapy.png";
import serviceImage from "../photo/imgs/ser.png";
import largeDogImage from "../photo/imgs/bigdog.png";
import dogCategory1 from "../photo/imgs/dog1.png";
import dogCategory2 from "../photo/imgs/dog2.png";
import dogCategory3 from "../photo/imgs/dog3.png";
import largeCatImage from "../photo/imgs/bigcat.png";
import qrCodeImage from "../photo/imgs/VETANIMALIA (2).png";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Data structures
  const blogCategories = [
    {
      id: 1,
      title: t('blogCategories.1.title'),
      image: dogCategory1,
      alt: t('blogCategories.1.altText'),
    },
    {
      id: 2,
      title: t('blogCategories.2.title'),
      image: dogCategory2,
      alt: t('blogCategories.2.altText'),
    },
    {
      id: 3,
      title: t('blogCategories.3.title'),
      image: dogCategory3,
      alt: t('blogCategories.3.altText'),
    },
  ];

  const primaryServices = [
    {
      id: 1,
      title: t('services2.1.title'),
      description: t('services2.1.description'),
      buttonText: t('services2.1.buttonText'),
      color: "bg-[#6A7AFF]",
      image: surgeryImage,
      alt: t('services2.1.altText'),
      btn: "bg-white text-black",
    },
    {
      id: 2,
      title: t('services2.2.title'),
      description: t('services2.2.description'),
      buttonText: t('services2.2.buttonText'),
      color: "bg-[#6A7AFF]",
      image: therapyImage,
      alt: t('services2.2.altText'),
      btn: "bg-white text-black",
    },
  ];

  const secondaryServices = [
    {
      id: 3,
      title: t('services.3.title'),
      description: t('services.3.description'),
      color: "bg-[#6A7AFF]",
      image: serviceImage,
      alt: t('services.3.altText'),
      btn: "bg-white text-black",
    },
    {
      id: 4,
      title: t('services.4.title'),
      description: t('services.4.description'),
      color: "bg-[#6A7AFF]",
      btn: "bg-white text-black",
    },
    {
      id: 5,
      title: t('services.5.title'),
      description: t('services.5.description'),
      buttonText: t('services.5.buttonText'),
      color: "bg-[#F19A56]",
      btn: "bg-black text-white",
    },
  ];

  const infoCards = [
    {
      id: 1,
      title: t('infos.1.title'),
      description: t('infos.1.description'),
      buttonText: t('infos.1.buttonText'),
      color: "bg-indigo-400",
      image: diamondIcon,
      alt: t('infos.1.altText'),
    },
    {
      id: 2,
      title: t('infos.2.title'),
      description: t('infos.2.description'),
      buttonText: t('infos.2.buttonText'),
      color: "bg-indigo-400",
      image: bookIcon,
      alt: t('infos.2.altText'),
    },
    {
      id: 3,
      title: t('infos.3.title'),
      description: t('infos.3.description'),
      buttonText: t('infos.3.buttonText'),
      color: "bg-indigo-400",
      image: peopleIcon,
      alt: t('infos.3.altText'),
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="flex flex-col pt-3 my-0 sm:flex-row items-center justify-center px-4 sm:px-8 md:px-16 rounded-3xl space-y-8 sm:space-y-0 sm:space-x-8 md:space-x-16 transition-all duration-300"
        aria-labelledby="hero-heading"
      >
        <img
          src={catHomeImage}
          alt={t('hero.altText')}
          className="w-full max-sm:w-1/2 max-sm:hidden sm:w-1/2 md:w-2/5 rounded-lg transition-all duration-300 transform "
          loading="lazy"
        />

        <div className={`text-center sm:text-left w-full sm:w-1/2 space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {t('hero.title1')} <br />
            <span className="text-[#F19A56]">{t('hero.title2')}</span>
          </h1>

          <div className="space-y-4 text-sm sm:text-base md:text-lg">
            <p className="text-gray-700 font-medium">{t('hero.doctor')}</p>
            <p className="text-gray-600">{t('hero.address')}</p>
            <p className="text-gray-600">{t('hero.phone')}</p>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-semibold">
                {t('hero.openingHours')}
              </p>
              <div className="group relative mr-20">
                <img 
                  src={qrCodeImage} 
                  alt={t('hero.qrAlt')} 
                  className="w-30 h-30 rounded-sm border border-gray-200"
                  loading="lazy"
                />
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('hero.qrTooltip')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="px-4 py-8 sm:py-12 mb-4 bg-[#F19A56] text-center flex flex-col rounded-3xl mx-2 sm:mx-8 md:mx-16 transition-all duration-300"
        aria-labelledby="about-heading"
      >
        <div className="flex justify-between items-center w-full mb-6 sm:mb-8">
          <h2 id="about-heading" className={`text-2xl sm:text-3xl w-1/2 max-sm:w-full font-semibold text-gray-800 mb-4 sm:mb-0 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('about.title')}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center w-full gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
          <article className="flex flex-col bg-white p-3 sm:p-4 items-center rounded-3xl shadow-lg w-full lg:w-2/5 transition-all duration-300 hover:shadow-xl">
            <img
              src={clinicImage}
              alt={t('about.aboutUsImageAlt')}
              className="w-fit rounded-xl mb-4 object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('about.aboutUsTitle')}
            </h3>
            <p className="text-gray-600 text-center sm:text-left">
              {t('about.aboutUsDescription')}
            </p>
          </article>

          <div className="w-full lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {infoCards.map((info) => (
                <article
                  key={info.id}
                  className={`bg-white p-4 sm:p-6 rounded-3xl shadow-lg w-full min-h-[200px] sm:min-h-[270px] flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mr-3">
                      {info.title}
                    </h2>
                    <img
                      src={info.image}
                      alt={info.alt}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-contain transition-transform duration-300 hover:rotate-12"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-600 text-sm text-start sm:text-base">
                    {info.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="bg-gray-100 min-h-screen font-serif rounded-3xl px-4 sm:px-6 md:px-8 py-8 transition-all duration-300">
        <header className="flex justify-center text-black text-center py-4 sm:py-6">
          <h1 className="font-light text-3xl sm:text-4xl transition-all duration-300">
            {t('servicesSection.title')}
          </h1>
        </header>

        <main>
          {/* Primary Services */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
            {primaryServices.map((service) => (
              <article
                key={service.id}
                className={`flex flex-col sm:flex-row ${service.color} p-4 sm:p-6 shadow-lg rounded-3xl ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <div className="w-full sm:w-2/3 mb-4 sm:mb-0 sm:pr-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="w-full sm:w-1/3 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </section>

          {/* Secondary Services */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-4 sm:my-6">
            {secondaryServices.map((service) => (
              service.buttonText ? (
                <Link to='/contact' key={service.id} aria-label={`Learn more about ${service.title}`}>
                  <article
                    className={`flex flex-col justify-between ${service.color} p-4 sm:p-6 shadow-lg rounded-3xl ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <div className="flex flex-col items-center sm:items-start">
                      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-4">
                        {service.title}
                      </h2>
                      <p className="text-white text-sm sm:text-base leading-relaxed text-center sm:text-left mb-4 sm:mb-6">
                        {service.description}
                      </p>
                    </div>
                    {service.image && (
                      <div className="flex justify-center sm:justify-start mb-4 sm:mb-6">
                        <img
                          src={service.image}
                          alt={service.alt}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </article>
                </Link>
              ) : (
                <article
                  key={service.id}
                  className={`flex flex-col justify-between ${service.color} p-4 sm:p-6 shadow-lg rounded-3xl ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex flex-col items-center sm:items-start">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-4">
                      {service.title}
                    </h2>
                    <p className="text-white text-sm sm:text-base leading-relaxed text-center sm:text-left mb-4 sm:mb-6">
                      {service.description}
                    </p>
                  </div>
                  {service.image && (
                    <div className="flex justify-center sm:justify-start mb-4 sm:mb-6">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-contain transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  )}
                </article>
              )
            ))}
          </section>
        </main>

        {/* Pet Tips Section */}
        <section 
          className="bg-[#d2ac11] flex flex-col sm:flex-row text-center sm:text-left py-4 sm:py-6 px-4 sm:px-6 rounded-3xl my-4 sm:my-6 transition-all duration-300"
          aria-labelledby="pet-tips-heading"
        >
          <div className="flex justify-center sm:justify-start mb-4 sm:mb-0 sm:mr-4">
            <img
              src={largeDogImage}
              alt={t('tipsSection.imageAlt')}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-4xl object-cover"
              loading="lazy"
            />
          </div>
          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 id="pet-tips-heading" className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-2">
              {t('tipsSection.title')}
            </h2>
            <p className="text-gray-700 text-sm mb-3 mr-3 leading-relaxed">
              {t('tipsSection.description1')}
              <span className="max-lg:hidden block mr-1">
                {t('tipsSection.description2')}
              </span>
            </p>
          </div>
        </section>
      </div>

      {/* Blog Section */}
      <section 
        className="flex flex-col flex-wrap justify-between bg-gray-200 text-center py-8 sm:py-12 px-4 sm:px-6 rounded-3xl mx-2 sm:mx-8 md:mx-16 mb-8 sm:mb-12 transition-all duration-300"
        aria-labelledby="blog-heading"
      >
        <header className="w-full mb-6 sm:mb-8">
          <h2 id="blog-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
            {t('blogSection.title')}
          </h2>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
            {t('blogSection.subtitle')}
          </h3>
        </header>
        
        <div className="flex justify-between items-center">
          <div className="flex justify-end items-center max-lg:justify-center max-sm:justify-center flex-wrap gap-4 sm:gap-6 w-2/3 mb-6 sm:mb-8">
            {blogCategories.map((category) => (
              <article
                key={category.id}
                className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg text-center flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                  {category.title}
                </h3>
                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-3">
                  <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-contain rounded-md transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>

          <img
            src={largeCatImage}
            alt={t('blogSection.catImageAlt')}
            className="w-xs max-sm:hidden rounded-xl transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;