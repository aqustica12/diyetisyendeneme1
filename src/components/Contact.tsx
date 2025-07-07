import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="iletisim" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            İletişim
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sağlıklı yaşam yolculuğunuza bugün başlayın. Randevu almak için iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Adres</h4>
                    <p className="text-gray-600">
                      Bağdat Caddesi No: 123/A<br />
                      Kadıköy, İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Telefon</h4>
                    <p className="text-gray-600">+90 555 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">E-posta</h4>
                    <p className="text-gray-600">info@dytayseyilmaz.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-green-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                      <p>Cumartesi: 09:00 - 15:00</p>
                      <p>Pazar: Kapalı</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Hızlı İletişim</h4>
                <div className="flex space-x-4">
                  <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-200">
                    <Phone className="w-4 h-4 mr-2" />
                    Ara
                  </button>
                  <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </button>
                  <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-200">
                    <Calendar className="w-4 h-4 mr-2" />
                    Randevu
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mesaj Gönder</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors duration-200"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors duration-200"
                      placeholder="Telefon numaranız"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors duration-200"
                    placeholder="E-posta adresiniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konu
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors duration-200">
                    <option>Konu seçiniz</option>
                    <option>Kilo Verme</option>
                    <option>Kilo Alma</option>
                    <option>Spor Beslenmesi</option>
                    <option>Online Danışmanlık</option>
                    <option>Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-colors duration-200"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 transform hover:scale-105"
                >
                  Mesaj Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;