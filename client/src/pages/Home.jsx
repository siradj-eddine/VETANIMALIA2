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
      color: "bg-[var(--mainOrange)]",
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6  " style={{ fontFamily: "Kiwi Maru, serif" }}>
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
          <h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {t('hero.title1')} <br />
            <span className="text-[var(--mainOrange)]">{t('hero.title2')}</span>
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

      {/* ABOUT */}
        <section
          aria-labelledby="about-heading"
          className="mt- rounded-3xl bg-[var(--mainOrange)]/10 p-6 sm:p-8  ring-1 ring-[var(--mainOrange)]/20"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 id="about-heading" className={`text-2xl sm:text-3xl font-semibold text-gray-900 ${isRTL ? "text-right" : "text-left"}`}>
              {t("about.title")}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* left card */}
            <article className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={clinicImage}
                  alt={t("about.aboutUsImageAlt")}
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{t("about.aboutUsTitle")}</h3>
              <p className="mt-2 text-gray-600">{t("about.aboutUsDescription")}</p>
            </article>

            {/* right info grid */}
            <div className="lg:col-span-3 grid gap-6 sm:grid-cols-2">
              {infoCards.map((info) => (
                <article
                  key={info.id}
                  className={`rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl ${isRTL ? "text-right" : "text-left"}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">{info.title}</h3>
                    <img
                      src={info.image}
                      alt={info.alt}
                      className="h-12 w-12 rounded-md object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-600">{info.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section aria-labelledby="services-heading" className="mt-10">
          <header className="text-center">
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-semibold text-gray-900">
              {t("servicesSection.title")}
            </h2>
          </header>

          {/* primary */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {primaryServices.map((service) => (
              <article
                key={service.id}
                className={`${service.color} relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ring-1 ring-black/5`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="sm:w-2/3">
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                    <p className="mt-2 text-white/90">{service.description}</p>
                    {service.buttonText && (
                      <Link
                        to="/contact"
                        className="mt-4 inline-flex rounded-xl bg-white/95 px-4 py-2 font-medium text-black shadow hover:bg-white"
                      >
                        {service.buttonText}
                      </Link>
                    )}
                  </div>
                  <div className="sm:w-1/3">
                    <div className="mx-auto aspect-square w-28 overflow-hidden rounded-xl bg-white/10 p-2 backdrop-blur">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* secondary */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryServices.map((service) => {
              const Card = (
                <article
                  key={service.id}
                  className={`${service.color} group relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ring-1 ring-black/5 transition`}
                >
                  <div className="flex min-h-[200px] flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold">{service.title}</h3>
                      <p className="mt-2 text-white/90">{service.description}</p>
                    </div>
                    {service.image && (
                      <div className="mt-4 flex items-end">
                        <div className="aspect-square w-24 overflow-hidden rounded-xl bg-white/10 p-2 backdrop-blur">
                          <img
                            src={service.image}
                            alt={service.alt}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );

              return service.buttonText ? (
                <Link to="/contact" key={`link-${service.id}`} aria-label={`Learn more about ${service.title}`}>
                  {Card}
                </Link>
              ) : (
                Card
              );
            })}
          </div>
        </section>

        {/* PET TIPS */}
        <section
          aria-labelledby="pet-tips-heading"
          className="mt-10 rounded-3xl bg-[#d2ac11] p-6 text-gray-900 shadow-lg ring-1 ring-black/5"
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <img
              src={largeDogImage}
              alt={t("tipsSection.imageAlt")}
              className="h-40 w-40 rounded-2xl object-cover"
              loading="lazy"
            />
            <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
              <h3 id="pet-tips-heading" className="text-2xl font-extrabold">
                {t("tipsSection.title")}
              </h3>
              <p className="mt-2 leading-relaxed text-gray-800">
                {t("tipsSection.description1")}
                <span className="mt-1 block">{t("tipsSection.description2")}</span>
              </p>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section 
        className="flex flex-col flex-wrap justify-between bg-gray-200 text-center py-8 sm:py-12 px-4 sm:px-6 rounded-3xl mt-8 sm:mb-12 transition-all duration-300"
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