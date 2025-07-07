import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Hakkımızda
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Teknolojinin sınırlarını zorlayarak, kullanıcılarımıza en iyi deneyimi sunmak için sürekli yenilik yapıyoruz. 
              Modern çözümlerimiz ile işletmenizi geleceğe taşıyoruz.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Uzman ekibimiz, cutting-edge teknolojiler kullanarak sizin için özel çözümler geliştiriyor. 
              Kalite ve müşteri memnuniyeti bizim önceliğimiz.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">İnovasyon</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Kalite</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-gray-700">Güvenilirlik</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">5+</div>
                <div className="text-xl mb-6">Yıllık Deneyim</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="opacity-90">Proje</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="opacity-90">Ekip Üyesi</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">98%</div>
                    <div className="opacity-90">Memnuniyet</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="opacity-90">Destek</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;