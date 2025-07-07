import React from 'react';
import { Scale, Apple, Activity, Users, Calendar, MessageCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Kilo Yönetimi',
      description: 'Sağlıklı kilo verme ve kilo alma programları ile ideal kilonuza ulaşın.',
      features: ['Kişiye özel diyet', 'Haftalık takip', 'Motivasyon desteği']
    },
    {
      icon: <Apple className="w-8 h-8" />,
      title: 'Beslenme Danışmanlığı',
      description: 'Yaşam tarzınıza uygun beslenme alışkanlıkları geliştirin.',
      features: ['Beslenme eğitimi', 'Menü planlama', 'Alışveriş rehberi']
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Spor Beslenmesi',
      description: 'Sporcu performansını artıran özel beslenme programları.',
      features: ['Performans artırıcı', 'Toparlanma desteği', 'Antrenman öncesi/sonrası']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Aile Beslenmesi',
      description: 'Tüm aile için sağlıklı beslenme alışkanlıkları.',
      features: ['Çocuk beslenmesi', 'Hamilelik dönemi', 'Yaşlı beslenmesi']
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Online Takip',
      description: 'Uzaktan danışmanlık ve sürekli destek sistemi.',
      features: ['Video görüşme', 'WhatsApp desteği', 'Mobil uygulama']
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Grup Eğitimleri',
      description: 'Beslenme konularında grup halinde eğitim programları.',
      features: ['Workshop\'lar', 'Seminerler', 'Pratik uygulamalar']
    }
  ];

  return (
    <section id="hizmetler" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hizmetlerim
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Size özel beslenme çözümleri ile sağlıklı yaşam yolculuğunuzda yanınızdayım
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-100"
            >
              <div className="text-green-600 mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition-colors duration-200 font-medium">
                Detayları Gör
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;