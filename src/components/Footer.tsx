import React from 'react';
import { Leaf, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-green-400" />
              <h3 className="text-2xl font-bold">
                Dyt. <span className="text-green-400">Ayşe Yılmaz</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              15 yıllık deneyimimle sağlıklı beslenme ve yaşam tarzı değişikliği konularında 
              size rehberlik ediyorum. Kişiye özel çözümlerle hedeflerinize ulaşın.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Hizmetler</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Kilo Yönetimi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Beslenme Danışmanlığı</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Spor Beslenmesi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Online Takip</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Grup Eğitimleri</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Bağdat Cad. No:123/A Kadıköy</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+90 555 123 4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">info@dytayseyilmaz.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200 text-sm font-medium">
                Randevu Al
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Diyetisyen Ayşe Yılmaz. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;