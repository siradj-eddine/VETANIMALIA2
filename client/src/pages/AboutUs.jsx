import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import doc from "../photo/imgs/docts.png";
import velu from "../photo/imgs/velu.png";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F5]" style={{ fontFamily: "Kiwi Maru, serif" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* OUR STORY */}
        <section
          aria-labelledby="our-story-heading"
          className="relative overflow-hidden rounded-3xl bg-white/70 p-6 sm:p-10 shadow-sm backdrop-blur-sm"
        >
          
          <div className="grid gap-8 lg:grid-cols-2 ">
            <div className="order-1 lg:order-1">
              <div className="relative mx-auto aspect-[4/3] max-w-xl overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={velu}
                  alt={t("About.our_story")}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="order-2 lg:order-2 flex flex-col justify-center">
              <h1 id="our-story-heading" className="text-4xl max-lg:text-3xl max-sm:text-2xl font-bold tracking-tight text-gray-900">
                {t("About.our_story")}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                {t("About.our_story_desc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--mainOrange)] px-5 py-2.5 text-white shadow hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mainOrange)]/60"
                >
                  {t("About.cta.contactUs", { defaultValue: "Contact us" })}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50"
                >
                  {t("About.cta.viewServices", { defaultValue: "View services" })}
                </Link>
              </div>
            </div>

            
          </div>

          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--mainOrange)] to-transparent" />
        </section>

        {/* JOIN US */}
        <section
          aria-labelledby="join-us-heading"
          className="mt-10 rounded-3xl bg-[var(--mainOrange)] p-6 sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex items-center">
              <div className={`w-full ${isRTL ? "text-right" : "text-left"}`}>
                <h2 id="join-us-heading" className="text-3xl sm:text-4xl font-extrabold text-amber-50">
                  {t("About.join_us")}
                </h2>
                <p className="mt-3 text-lg leading-relaxed  text-amber-50">
                  {t("About.join_us_desc")}
                </p>
                <div className="mt-6">
                  <Link to="/SignUp" className="inline-flex rounded-full bg-black px-8 py-3 font-medium text-white shadow hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50">
                    {t("About.join_button")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/3] max-w-xl overflow-hidden rounded-2xl bg-white  shadow-lg">
                <img
                  src={doc}
                  alt={t("About.join_us")}
                  className="h-full w-full rounded-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
