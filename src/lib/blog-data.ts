export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  authorImage: string;
  image: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'yaz-aylarinda-beslenme',
    title: 'Sıcak Havalarda Hafif ve Sağlıklı Beslenme Önerileri',
    excerpt: 'Yaz aylarında enerjinizi korumak ve serinlemek için tüketebileceğiniz besinler ve tarifler.',
    date: '15 Haziran 2024',
    category: 'Mevsimsel Beslenme',
    author: 'Kübra Akın',
    authorImage: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/800x400.png',
    content: '<p>Yazın gelmesiyle birlikte artan sıcaklar, beslenme alışkanlıklarımızda da değişiklik yapmayı gerektiriyor. Ağır ve yağlı yiyecekler yerine, hem serinletici hem de besleyici alternatiflere yönelmek, gün boyu enerjik kalmamızı sağlar.</p><h3>Bol Su Tüketimi Şart!</h3><p>Vücudun su ihtiyacı sıcak havalarda artar. Günde en az 2.5 - 3 litre su içmeyi ihmal etmeyin. Suya limon dilimleri, nane yaprakları veya salatalık ekleyerek daha ferahlatıcı hale getirebilirsiniz.</p><h3>Mevsim Meyve ve Sebzeleri</h3><p>Karpuz, kavun, çilek gibi su oranı yüksek meyveler hem tatlı ihtiyacınızı karşılar hem de serinletir. Salatalık, domates, marul gibi sebzelerle hazırlayacağınız bol yeşillikli salatalar, öğünlerinizi hafifletmenin en iyi yoludur.</p>'
  },
  {
    slug: 'ara-ogunlerin-onemi',
    title: 'Kan Şekerini Dengeleyen Sağlıklı Ara Öğün Alternatifleri',
    excerpt: 'Ara öğünler neden önemli? Kilo kontrolü ve enerji seviyeleri üzerindeki etkileri nelerdir?',
    date: '01 Haziran 2024',
    category: 'Genel İpuçları',
    author: 'Kübra Akın',
    authorImage: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/800x400.png',
    content: '<p>Ara öğünler, kan şekerini dengeleyerek bir sonraki ana öğünde aşırı yemenin önüne geçer. Bu sayede kilo kontrolünü kolaylaştırır ve gün içindeki enerji düşüşlerini engeller.</p><h3>Sağlıklı Seçenekler</h3><ul><li>Bir avuç çiğ badem veya ceviz</li><li>Bir kase yoğurt ve taze meyveler</li><li>Bir adet yeşil elma ve bir dilim peynir</li><li>Tam tahıllı kraker ve humus</li></ul><p>Bu seçenekler hem doyurucu hem de besleyicidir.</p>'
  },
  {
    slug: 'duygusal-yeme-ile-basa-cikma',
    title: 'Duygusal Yeme Krizleriyle Nasıl Başa Çıkılır?',
    excerpt: 'Stres, üzüntü veya sıkıntı anlarında yemeğe sarılmanın önüne nasıl geçebilirsiniz?',
    date: '20 Mayıs 2024',
    category: 'Psikoloji',
    author: 'Kübra Akın',
    authorImage: 'https://placehold.co/100x100.png',
    image: 'https://placehold.co/800x400.png',
    content: '<p>Duygusal yeme, açlık hissi olmadan, duygusal boşlukları doldurmak amacıyla yemek yeme davranışıdır. Bu durumla başa çıkmak için öncelikle farkındalık geliştirmek gerekir.</p><h3>Adımlar</h3><ol><li><b>Gerçekten aç mısınız?</b> Kendinize bu soruyu sorun. Fiziksel açlık yavaş yavaş gelirken, duygusal açlık aniden bastırır.</li><li><b>Alternatifler bulun:</b> Yürüyüşe çıkmak, müzik dinlemek, bir arkadaşınızla konuşmak gibi yeme dışı aktiviteler bulun.</li><li><b>Profesyonel destek alın:</b> Eğer tek başınıza başa çıkmakta zorlanıyorsanız bir uzmandan destek almak önemlidir.</li></ol>'
  }
];

export const categories = Array.from(new Set(posts.map(p => p.category)));
