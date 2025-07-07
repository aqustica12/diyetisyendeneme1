import React from 'react';
import { Award, BookOpen, Heart, Users } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Sertifikalar',
      items: ['Beslenme ve Diyetetik Lisans', 'Spor Beslenmesi Sertifikası', 'Obezite Danışmanlığı']
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Eğitim',
      items: ['Hacettepe Üniversitesi', 'Beslenme ve Diyetetik', 'Yüksek Lisans']
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Deneyim',
      items: ['15 yıl klinik deneyim', '500+ başarılı danışan', 'Hastane tecrübesi']
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Uzmanlık',
      items: ['Kilo yönetimi', 'Spor beslenmesi', 'Metabolik hastalıklar']
    }
  ];

  return (
    <section id="hakkimda" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Diyetisyen ofis" 
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Mutlu Danışan</div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Hakkımda
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Merhaba! Ben Diyetisyen Ayşe Yılmaz. 15 yıldır beslenme ve diyetetik alanında 
              çalışıyor, insanların sağlıklı yaşam alışkanlıkları edinmelerine yardımcı oluyorum.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Hacettepe Üniversitesi Beslenme ve Diyetetik bölümünden mezun olduktan sonra, 
              çeşitli hastanelerde klinik deneyim kazandım. Şimdi kendi kliniğimde, 
              kişiye özel beslenme programları ile danışanlarımın hedeflerine ulaşmalarına 
              yardımcı oluyorum.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="text-green-600 mr-3">{achievement.icon}</div>
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  </div>
                  <ul className="space-y-1">
                    {achievement.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;