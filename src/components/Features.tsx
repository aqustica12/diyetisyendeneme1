import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Hızlı Performans',
      description: 'Optimized kod yapısı ile yıldırım hızında yükleme süreleri.'
    },
    {
      icon: '🔒',
      title: 'Güvenli Altyapı',
      description: 'En yüksek güvenlik standartları ile verileriniz güvende.'
    },
    {
      icon: '📱',
      title: 'Mobil Uyumlu',
      description: 'Tüm cihazlarda mükemmel görünüm ve kullanım deneyimi.'
    },
    {
      icon: '⚡',
      title: 'Anlık Güncellemeler',
      description: 'Gerçek zamanlı senkronizasyon ile her zaman güncel kalın.'
    },
    {
      icon: '🎨',
      title: 'Modern Tasarım',
      description: 'Kullanıcı deneyimini ön planda tutan çağdaş arayüz.'
    },
    {
      icon: '📊',
      title: 'Detaylı Analitik',
      description: 'Kapsamlı raporlar ve analizler ile verilerinizi anlayın.'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Özellikler
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern teknoloji ile güçlendirilmiş özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;