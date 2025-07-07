import React, { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Dyt. <span className="text-green-600">Ayşe Yılmaz</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#anasayfa" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Ana Sayfa
            </a>
            <a href="#hizmetler" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Hizmetler
            </a>
            <a href="#hakkimda" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Hakkımda
            </a>
            <a href="#yorumlar" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Yorumlar
            </a>
            <a href="#iletisim" className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              İletişim
            </a>
          </nav>

          <div className="hidden md:flex items-center">
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg">
              Randevu Al
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-green-200/50">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a href="#anasayfa" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Ana Sayfa
            </a>
            <a href="#hizmetler" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Hizmetler
            </a>
            <a href="#hakkimda" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Hakkımda
            </a>
            <a href="#yorumlar" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              Yorumlar
            </a>
            <a href="#iletisim" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium">
              İletişim
            </a>
            <div className="px-3 py-2">
              <button className="w-full bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-200 font-medium">
                Randevu Al
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;