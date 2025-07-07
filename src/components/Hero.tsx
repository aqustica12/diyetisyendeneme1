import React from 'react';
import { Heart, Star, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section id="anasayfa" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                <Heart className="w-4 h-4 mr-2" />
                Sağlıklı Yaşam Uzmanı
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Sağlıklı Beslenme ile
                <span className="text-green-600 block">
                  Hayalinizdeki Vücuda
                </span>
                Ulaşın
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Kişiye özel beslenme programları ile sağlıklı kilo verme ve yaşam tarzı değişikliği. 
                15 yıllık deneyimimle yanınızdayım.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Ücretsiz Konsültasyon
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200">
                Hizmetleri İncele
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">500+</span>
                </div>
                <p className="text-gray-600 text-sm">Mutlu Danışan</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-gray-600 text-sm">Değerlendirme</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">15</span>
                </div>
                <p className="text-gray-600 text-sm">Yıl Deneyim</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Diyetisyen Ayşe Yılmaz" 
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sağlıklı Yaşam</p>
                    <p className="text-sm text-gray-600">Uzmanı</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg z-20">
              <p className="font-semibold">Online Danışmanlık</p>
              <p className="text-sm opacity-90">Mevcut</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;