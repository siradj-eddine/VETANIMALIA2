import { FaFacebook, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();


  return (
    <div>
      <footer className="bg-white p-8">
        <div className="text-center space-y-6">
          {/* Social Media Links */}
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/profile.php?id=100091730273953&mibextid=ZbWKwL">
            <FaFacebook size={30} className="text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
            </a>
            <a href="https://wa.me/+213770807185">
            <FaWhatsapp size={30} className="text-black cursor-pointer hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/cabinet_vetanimalia25?igsh=MWM0c3J3Zzh1bWg2dA==">
            <FaInstagram size={30} className="text-pink-500 cursor-pointer hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.tiktok.com/@vetanimalia_25?_t=ZM-8yi5u8XHpUW&_r=1">
            <FaTiktok size={30} className=" cursor-pointer hover:scale-110 transition-transform" />
          </a>
          </div>
          {/* Footer Text */}
          <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;