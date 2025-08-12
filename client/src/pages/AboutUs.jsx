import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import doc from "../photo/imgs/docts.png";
import velu from "../photo/imgs/velu.png";
import Team from "../photo/imgs/team.png";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <main className="py-6 px-6 max-mx-25 sm:px-6 lg:px-8">
      <section className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12 text-center">
        <div className="sm:w-1/2">
          <img
            src={velu}
            alt={t('About.our_story')}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 text-left max-sm:text-center">
          <h2 className="text-[80px] max-lg:text-[60px] max-sm:text-[40px] font-bold text-gray-800 mb-4">
            {t('About.our_story')}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {t('About.our_story_desc')}
          </p>
        
        </div>
      </section>

      <section className="bg-[#F19A56] pt-10 px-8 rounded-3xl mb-3 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="w-full sm:w-1/2">
            <img
              src={doc}
              alt={t('About.join_us')}
              className="w-full mb-0 h-auto rounded-lg object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2 text-center pb-2">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
              {t('About.join_us')}
            </h2>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              {t('About.join_us_desc')}
            </p>
            <div className="flex justify-center items-center space-x-15">
              <Link to="/SignUp">
                <button className="px-12 py-4 bg-black text-white rounded-full hover:bg-orange-900 transition duration-300">
                  {t('About.join_button')}
                </button>
              </Link>  
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;