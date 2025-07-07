import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Elif Kaya',
      age: '28 yaş',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: '6 ayda 15 kilo verdim ve artık çok daha enerjik hissediyorum. Ayşe hanımın programı gerçekten işe yarıyor!',
      result: '15 kg verdi'
    },
    {
      name: 'Mehmet Özkan',
      age: '35 yaş',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Spor yaparken doğru beslenmeyi öğrendim. Performansım arttı ve daha hızlı toparlanıyorum.',
      result: 'Kas kütlesi arttı'
    },
    {
      name: 'Zeynep Demir',
      age: '42 yaş',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Hamilelik dönemimde çok yardımcı oldu. Hem sağlıklı kilo aldım hem de bebeğim için en iyisini yaptım.',
      result: 'Sağlıklı hamilelik'
    },
    {
      name: 'Ali Yıldız',
      age: '29 yaş',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Online takip sistemi çok pratik. İş yoğunluğuma rağmen programımı takip edebiliyorum.',
      result: '12 kg verdi'
    },
    {
      name: 'Fatma Şen',
      age: '38 yaş',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Tüm aile olarak beslenme alışkanlıklarımızı değiştirdik. Çocuklarım da çok daha sağlıklı besleniyor.',
      result: 'Aile sağlığı'
    },
    {
      name: 'Burak Kılıç',
      age: '31 yaş',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      text: 'Diyabet riskimi azalttım ve kan değerlerim normale döndü. Çok teşekkür ederim!',
      result: 'Sağlık iyileşti'
    }
  ];

  return (
    <section id="yorumlar" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Danışan Yorumları
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sağlıklı yaşam yolculuğunda başarıya ulaşan danışanlarımın deneyimleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-100"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.age}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <Quote className="w-8 h-8 text-green-600 opacity-20 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed mb-4 relative z-10">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium inline-block">
                {testimonial.result}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Siz de Başarı Hikayenizi Yazın
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;