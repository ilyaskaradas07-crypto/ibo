import { TourTranslationContent } from '../types';

export const TURKISH_TOUR_TRANSLATIONS: Record<string, TourTranslationContent> = {
  'boat-tour': {
    name: 'Alanya Tekne Turu (Korsan Gemisi)',
    shortDescription: 'Tarihi Kızıl Kule, Tersane, Korsanlar ve Aşıklar Mağaraları ile Kleopatra Plajı etrafında yüzme molalı klasik tekne turu.',
    description: 'Geleneksel ahşap korsan gemisiyle Alanya yarımadasının eşsiz koylarını keşfedin. Berrak turkuaz sularda yüzme molaları, açık büfe öğle yemeği, animasyon ve köpük partisi eşliğinde unutulmaz bir Akdeniz günü yaşayın.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Denizden Alanya Kalesi ve Kızıl Kule manzarası', 'Korsanlar, Aşıklar ve Fosforlu Mağaraları', 'Kleopatra Plajı açıklarında yüzme molası', 'Gemide açık büfe öğle yemeği & köpük partisi'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tekne turu', 'Açık büfe öğle yemeği', 'Tam kapsamlı yolcu sigortası'],
    excluded: ['İçecekler (isteğe bağlı)', 'Kişisel harcamalar', 'Fotoğrafçı çekimleri'],
    whatToBring: ['Mayo ve havlu', 'Güneş kremi ve güneş gözlüğü', 'Deniz ayakkabısı', 'İçecekler için harçlık'],
    safetyNotes: 'Yetişkinler ve çocuklar için can yelekleri teknede mevcuttur.',
    itinerary: [
      { time: '08:45', title: 'Otelden Alınış', description: 'Otelinizin güvenlik kapısından konforlu transfer.' },
      { time: '09:30', title: 'Limandan Hareket', description: 'Tarihi Kızıl Kule ve Tersane yanından denize açılış.' },
      { time: '11:00', title: 'Mağaralar ve Yüzme', description: 'Korsanlar ve Aşıklar mağarası önünde yüzme molası.' },
      { time: '12:30', title: 'Teknede Öğle Yemeği', description: 'Izgara tavuk, makarna ve taze Akdeniz salatası.' },
      { time: '14:00', title: 'Kleopatra Plajı Açıkları', description: 'Turkuaz sularda serinletici yüzme keyfi.' },
      { time: '15:30', title: 'Limana Dönüş & Otele Transfer', description: 'Transfer aracıyla otelinize dönüş.' }
    ]
  },
  'green-canyon': {
    name: 'Yeşil Kanyon Katamaran Turu (Green Canyon)',
    shortDescription: 'Oymapınar Barajı\'nın zümrüt yeşili sularında huzurlu katamaran turu, kanyon yüzme molası ve göl kenarı öğle yemeği.',
    description: 'Toros Dağları\'nın kucağındaki Oymapınar Baraj Gölü\'nde, doğanın kalbinde huzurlu bir gün. Zümrüt rengi berrak sularda yüzme molası, göl kenarında taze alabalık veya ızgara öğle yemeği ve sınırsız alkolsüz içecekler.',
    operatingDays: 'Pazartesi, Çarşamba, Cuma, Pazar',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Oymapınar Barajı panoramik manzarası', 'Yeşil Kanyon\'da zümrüt sularında yüzme', 'Göl kenarı restoranda lezzetli öğle yemeği', 'Sınırsız alkolsüz içecekler'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Katamaran tekne turu', 'Öğle yemeği (Tavuk/Balık)', 'Sınırsız alkolsüz içecekler', 'Sigorta'],
    excluded: ['Alkollü içecekler', 'Kişisel harcamalar'],
    whatToBring: ['Mayo ve havlu', 'Güneş kremi', 'Kamera'],
    itinerary: [
      { time: '08:30', title: 'Otelden Alınış', description: 'Alanya bölgesinden hareket.' },
      { time: '10:00', title: 'Baraj Gölü & Tekneye Biniş', description: 'Katamaran ile kanyon yolculuğu.' },
      { time: '12:30', title: 'Öğle Yemeği', description: 'Göl manzaralı restoranda lezzetli menü.' },
      { time: '14:00', title: 'Yüzme Molası', description: 'Zümrüt yeşili sularda serinleme.' },
      { time: '16:00', title: 'Otele Dönüş', description: 'Otele konforlu transfer.' }
    ]
  },
  'green-canyon-zoo': {
    name: 'Yeşil Kanyon & Aslan Parkı (Hayvanat Bahçesi)',
    shortDescription: 'Yeşil Kanyon katamaran turu ve Manavgat Aslan Parkı hayvanat bahçesi ziyaretiyle aileler için harika bir kombinasyon.',
    description: 'Yeşil Kanyon\'un eşsiz doğasını Manavgat Hayvanat Bahçesi ve Aslan Parkı ziyaretiyle birleştiren dopdolu aile turu. Aslan yavrularını yakından görün, katamaranla kanyonu gezin.',
    operatingDays: 'Salı, Perşembe, Cumartesi',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Manavgat Aslan Parkı ve hayvanat bahçesi', 'Yeşil Kanyon katamaran gezisi', 'Yüzme molaları', 'Öğle yemeği dahil'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Hayvanat bahçesi giriş bileti', 'Tekne turu', 'Öğle yemeği', 'Sigorta'],
    excluded: ['İçecekler', 'Hayvanlarla özel fotoğraf çekimi'],
    whatToBring: ['Rahat ayakkabılar', 'Mayo ve havlu', 'Güneş şapkası'],
    itinerary: [
      { time: '08:30', title: 'Otelden Alınış', description: 'Otel transferi.' },
      { time: '10:00', title: 'Aslan Parkı Gezisi', description: 'Hayvanat bahçesi ziyareti.' },
      { time: '12:00', title: 'Kanyon Tekne Turu & Yemek', description: 'Katamaran turu ve öğle yemeği.' },
      { time: '16:30', title: 'Otele Dönüş', description: 'Otele transfer.' }
    ]
  },
  'relax-boat': {
    name: 'Sessiz & Sakin Tekne Turu (Relax Boat)',
    shortDescription: 'Yüksek sesli müzik ve animasyonsuz, dinlendirici ve huzurlu ahşap yat turu. Sadece deniz ve güneş.',
    description: 'Gürültüden uzak, sakin ve dinlendirici bir deniz günü arayanlar için özel tasarlanmış yat turu. Kitabınızı okuyun, berrak koylarda yüzün, huzurun tadını çıkarın.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Müziksiz ve animasyonsuz huzurlu atmosfer', 'Sakin koylarda uzun yüzme molaları', 'Lezzetli taze öğle yemeği', 'Daha az yolcu kapasitesi'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tekne turu', 'Öğle yemeği', 'Sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    whatToBring: ['Havlu, kitap, güneş kremi, şapka'],
    itinerary: [
      { time: '09:00', title: 'Otelden Alınış', description: 'Otelden transfer.' },
      { time: '10:00', title: 'Sakin Koylarda Seyir', description: 'Ulaş Barajı ve Kleopatra açıklarında seyir.' },
      { time: '15:00', title: 'Dönüş', description: 'Otele dönüş transferi.' }
    ]
  },
  'diving': {
    name: 'Tüplü Dalış (Scuba Diving)',
    shortDescription: 'Alanya\'nın sualtı mağaraları ve resiflerinde profesyonel eğitmenler eşliğinde 2 kez tüplü dalış.',
    description: 'Akdeniz\'in sualtı dünyasını keşfedin! Deneyimli PADI/CMAS eğitmenleri eşliğinde hem yeni başlayanlar hem de sertifikalı dalgıçlar için 2 ayrı dalış seansı, ekipman ve teknede öğle yemeği dahil.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['2 ayrı koyda tüplü dalış seansı', 'Profesyonel PADI/CMAS eğitmen rehberliği', 'Sualtı faunası ve mağaraları keşfi', 'Teknede öğle yemeği'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tüm profesyonel dalış ekipmanları', '2 adet dalış', 'Öğle yemeği', 'Dalış sigortası'],
    excluded: ['Sualtı fotoğraf ve video çekimleri', 'İçecekler'],
    whatToBring: ['Mayo ve havlu', 'Güneş kremi', 'Dalgıç sertifikası (varsa)'],
    safetyNotes: 'Yüzme bilmek yeterlidir. Kalp veya astım rahatsızlığı olanlar için uygun değildir.',
    itinerary: [
      { time: '08:30', title: 'Otelden Alınış', description: 'Limana transfer.' },
      { time: '09:30', title: 'Güvenlik Brifingi & 1. Dalış', description: 'Eğitim ve sığ su alıştırması.' },
      { time: '12:30', title: 'Öğle Yemeği', description: 'Teknede sıcak öğle yemeği.' },
      { time: '13:30', title: '2. Dalış Seansı', description: 'Resif dalışı ve serbest yüzme.' },
      { time: '16:00', title: 'Otele Dönüş', description: 'Otele transfer.' }
    ]
  },
  'turkish-bath-hamam': {
    name: 'Geleneksel Türk Hamamı & Spa Masajı',
    shortDescription: 'Göbek taşı, kese köpük masajı, sauna, jakuzi ve aromaterapi yağ masajı ile tam yenilenme.',
    description: 'Tatilinize cildinizi güneşe hazırlayarak başlayın! Tarihi Türk hamamı kültürünü yaşatan mermer göbek taşında terleme, kese ile ölü derilerden arınma, bol köpük masajı ve 20 dakikalık aromaterapi yağ masajı.',
    operatingDays: 'Her Gün (Esnek Saatler)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Isıtmalı mermer göbek taşı & sauna', 'Geleneksel kese ve köpük masajı', '20 dakikalık tüm vücut yağ masajı', 'Yüz maskesi ve rahatlama alanı'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Sauna ve buhar odası', 'Kese ve köpük masajı', 'Aromaterapi yağ masajı', 'Türk çayı ikramı'],
    excluded: ['Ekstra medikal masajlar', 'Kişisel bakım ürünleri'],
    whatToBring: ['Mayo / bikini', 'Kişisel terlik (isteğe bağlı)'],
    itinerary: [
      { time: 'Randevu', title: 'Otelden Alınış', description: 'Seçtiğiniz saatte otelden transfer.' },
      { time: '+15 dk', title: 'Sauna & Buhar Odası', description: 'Gözeneklerin açılması ve rahatlama.' },
      { time: '+45 dk', title: 'Kese & Köpük', description: 'Tellak eşliğinde kese ve köpük banyosu.' },
      { time: '+90 dk', title: 'Yağ Masajı & Dinlenme', description: 'Aromaterapik masaj ve çay ikramı.' },
      { time: '+120 dk', title: 'Otele Dönüş', description: 'Otele konforlu transfer.' }
    ]
  },
  'land-of-legends': {
    name: 'Land of Legends Tema Parkı & Aquapark',
    shortDescription: 'Türkiye\'nin en büyük tema parkı! Hyper Coaster, dev dalga havuzları, 40+ su kaydırağı ve gösteriler.',
    description: 'Antalya Belek\'teki dev eğlence dünyası The Land of Legends\'a günübirlik heyecan dolu gezi. 62 metre yüksekliğindeki Hyper Coaster, Typhoon Coaster, sayısız su kaydırağı ve yunus gösterileriyle rüya gibi bir gün.',
    operatingDays: 'Salı, Çarşamba, Cuma, Cumartesi, Pazar',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Hyper Coaster & Typhoon Coaster trenleri', '40\'tan fazla su kaydırağı ve dev dalga havuzu', 'Yunus gösterisi', 'Tema park alışveriş caddesi'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tema park ve Aquapark tam gün giriş bileti', 'Tüm kaydıraklar ve trenler', 'Sigorta'],
    excluded: ['Park içi yiyecek ve içecekler', 'Yunuslarla yüzme', 'Kişisel harcamalar'],
    whatToBring: ['Mayo, havlu, güneş kremi, rahat ayakkabılar, kredi kartı/para'],
    itinerary: [
      { time: '08:00', title: 'Otelden Alınış', description: 'Belek Land of Legends\'a yolculuk.' },
      { time: '10:30', title: 'Parka Giriş', description: 'Aquapark ve tema parkta serbest zaman.' },
      { time: '17:00', title: 'Buluşma & Dönüş', description: 'Alanya otellerine transfer.' }
    ]
  },
  'land-of-legends-night-show': {
    name: 'Land of Legends Gece Işık & Şato Gösterisi',
    shortDescription: 'Masalsı şato önünde müzikal tekne geçidi, su ve lazer gösterileri ile alışveriş caddesi gezisi.',
    description: 'Akşam serinliğinde The Land of Legends\'ın büyüleyici masal şatosunu ziyaret edin. Kanal boyunca müzikal gösteriler, ışık, lazer ve fıskiye dansları eşliğinde dünyaca ünlü markaların mağazalarını gezin.',
    operatingDays: 'Salı, Perşembe, Cumartesi',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Masal Şatosu ışık ve lazer gösterisi', 'Kanal boyunca müzikli tekne geçit töreni', 'Lüks alışveriş caddesinde serbest zaman', 'Akşam serinliğinde aile boyu eğlence'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Gösteri alanı girişi', 'Rehberlik', 'Sigorta'],
    excluded: ['Akşam yemeği ve içecekler', 'Kişisel alışverişler'],
    whatToBring: ['Rahat giysiler, kamera, harçlık'],
    itinerary: [
      { time: '16:30', title: 'Otelden Alınış', description: 'Otelden hareket.' },
      { time: '19:00', title: 'Alışveriş Caddesi Serbest Zaman', description: 'Kanal boyu yürüyüş ve akşam yemeği molası.' },
      { time: '21:30', title: 'Büyük Şato Gösterisi', description: 'Müzikli geçit ve lazer şovu.' },
      { time: '23:00', title: 'Otele Dönüş', description: 'Alanya\'ya dönüş transferi.' }
    ]
  },
  'jeep-safari': {
    name: 'Alanya Jeep Safari (Toros Dağları & Dimçayı)',
    shortDescription: 'Üstü açık ciplerle Toros Dağları off-road macerası, su savaşları, Dim Mağarası ve Dimçayı üzerinde öğle yemeği.',
    description: 'Alanya\'nın en popüler ve eğlenceli turu! Üstü açık Land Rover ciplerle dağ köyleri, portakal bahçeleri ve off-road parkurlarında su savaşları. Tur sonunda serin Dimçayı üzerinde yüzen çardaklarda leziz öğle yemeği ve yüzme keyfi.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Toros Dağları off-road ve cip su savaşları', 'Dimçayı üzerinde yüzen masalarda öğle yemeği', 'Dim Mağarası ve dağ köyü ziyareti', 'Panoramik Alanya manzarası fotoğraf molası'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Cip safari ve yakıt', 'Dimçayı kenarında öğle yemeği', 'Profesyonel şoför ve rehber', 'Sigorta'],
    excluded: ['İçecekler', 'Dim Mağarası giriş ücreti (isteğe bağlı)', 'Su tabancası kiralama'],
    whatToBring: ['Güneş gözlüğü ve şapka', 'Islanmaya uygun kıyafetler', 'Mayo ve havlu', 'Telefon için su geçirmez kılıf'],
    itinerary: [
      { time: '08:45', title: 'Otelden Alınış', description: 'Üstü açık ciplerle hareket.' },
      { time: '10:00', title: 'Toros Dağları & Köy Ziyareti', description: 'Dağ yollarında eğlenceli sürüş.' },
      { time: '12:30', title: 'Dimçayı Öğle Yemeği & Yüzme', description: 'Nehir üzerinde yemek ve serinleme.' },
      { time: '15:30', title: 'Otele Dönüş', description: 'Otellere transfer.' }
    ]
  },
  'quad-safari': {
    name: 'ATV Quad Safari (Dağ Parkuru)',
    shortDescription: 'Toros Dağları\'nın çam ormanlarında ve patika yollarında çamur, su ve toz dolu heyecanlı ATV sürüşü.',
    description: 'Ehliyet gerektirmeyen, kullanımı son derece kolay güçlü ATV motorlarla doğada adrenalin dolu 2.5 saatlik sürüş deneyimi. Nehir geçişleri, engebeli patikalar ve harika doğa manzaraları.',
    operatingDays: 'Her Gün (Günde 3 Seans)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['2 saatten fazla aktif ATV quad sürüşü', 'Ehliyet şartı yok, otomatik vites', 'Çamurlu parkurlar ve orman yolları', 'Test sürüşü ve güvenlik eğitimi'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'ATV motor ve kask', 'Test sürüşü ve rehberlik', 'Tam sigorta'],
    excluded: ['Toz maskesi ve bandana', 'Gözlük kiralama', 'Fotoğraf ve video çekimi', 'İçecekler'],
    whatToBring: ['Kirlenebilecek rahat kıyafetler', 'Kapalı ayakkabı (spor ayakkabı)', 'Güneş gözlüğü'],
    safetyNotes: '16 yaş altı çocuklar yetişkinlerin arkasında yolcu olarak katılabilir.',
    itinerary: [
      { time: 'Seans Saati', title: 'Otelden Alınış', description: 'Safari istasyonuna transfer.' },
      { time: '+30 dk', title: 'Bilgilendirme & Test Sürüşü', description: 'Kask takma ve test parkuru.' },
      { time: '+60 dk', title: 'Orman ve Dağ Sürüşü', description: 'Konvoy halinde heyecanlı safari.' },
      { time: '+150 dk', title: 'Otele Dönüş', description: 'Otellere dönüş transferi.' }
    ]
  },
  'buggy-safari': {
    name: 'Buggy Safari (Off-Road Macerası)',
    shortDescription: 'Kafes korumalı özel buggy araçlarıyla Toros eteklerinde tozlu ve çamurlu doğa parkurunda sürüş heyecanı.',
    description: 'Direksiyon ve pedallarla araba gibi kolay kullanılan off-road buggy araçlarıyla güvenli ve çok eğlenceli safari. Arkadaşınızla yan yana oturarak parkurun tadını çıkarın.',
    operatingDays: 'Her Gün (Günde 3 Seans)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Yan yana iki kişilik buggy sürüşü', 'Güvenlik kafesli özel araçlar', 'Su ve çamur geçişli parkur', 'Ehliyet gerektirmez'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Buggy araç ve kask', 'Eğitmen rehberliği', 'Sigorta'],
    excluded: ['Bandana / toz maskesi', 'İçecekler', 'Fotoğraf & video'],
    whatToBring: ['Spor ayakkabı, rahat kıyafetler, güneş gözlüğü'],
    itinerary: [
      { time: 'Seans', title: 'Otelden Alınış', description: 'İstasyona transfer.' },
      { time: '+30 dk', title: 'Test Sürüşü & Brifing', description: 'Araç tanıtımı.' },
      { time: '+60 dk', title: 'Buggy Safari', description: 'Dağ parkurunda konvoy.' },
      { time: '+150 dk', title: 'Otele Dönüş', description: 'Otele dönüş transferi.' }
    ]
  },
  'rafting-combo': {
    name: 'Köprülü Kanyon Rafting (Zipline & Kanyon Turu)',
    shortDescription: 'Köprülü Kanyon Milli Parkı\'nda 14 km rafting macerası, nehir kenarında öğle yemeği ve serin sular.',
    description: 'Toros Dağları\'ndan fışkıran buz gibi turkuaz sularda unutulmaz rafting deneyimi! 14 kilometrelik parkurda profesyonel bot rehberleri eşliğinde köpüklü dalgalarla mücadele edin, tarihi köprüde yüzün.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['14 km rafting parkuru', 'Tarihi Roma Köprüsü yüzme molası', 'Nehir kenarında sıcak öğle yemeği', 'Profesyonel nehir rehberleri'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Rafting botu, kürek, kask ve can yeleği', 'Nehir kenarı öğle yemeği', 'Profesyonel rehberlik', 'Rafting sigortası'],
    excluded: ['Nehir ayakkabısı (satın alma/kiralama)', 'İçecekler', 'Zipline (ekstra paket istenirse)', 'Fotoğraf ve video'],
    whatToBring: ['Mayo ve havlu', 'Islanmaya uygun deniz ayakkabısı', 'Güneş kremi', 'Yedek kuru kıyafet'],
    itinerary: [
      { time: '08:00', title: 'Otelden Alınış', description: 'Köprülü Kanyon\'a yolculuk.' },
      { time: '10:30', title: 'Ekipman & Brifing', description: 'Can yeleği ve kask dağıtımı.' },
      { time: '11:15', title: 'Rafting Başlangıcı (14 km)', description: 'Dalgalı sularda eğlenceli kürek çekme.' },
      { time: '13:30', title: 'Öğle Yemeği', description: 'Nehir kenarında ızgara tavuk ve salata.' },
      { time: '16:30', title: 'Otele Dönüş', description: 'Otellere transfer.' }
    ]
  },
  'paragliding': {
    name: 'Alanya Yamaç Paraşütü (Paragliding)',
    shortDescription: '800 metre yükseklikteki Yassıtepe\'den Kleopatra Plajı\'na profesyonel pilotla tandem uçuş.',
    description: 'Alanya\'yı kuş bakışı izleyin! Profesyonel lisanslı pilot eşliğinde Toros Dağları\'ndan havalanın. Alanya Kalesi, masmavi deniz ve altın kumsalların üzerinde 15-20 dakika süzülerek Kleopatra Plajı\'na yumuşak iniş yapın.',
    operatingDays: 'Her Gün (Hava Durumuna Bağlı)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['800m Yassıtepe zirvesinden kalkış', 'Kleopatra Plajı\'na yumuşak sahil inişi', 'Alanya Kalesi ve yarımada kuşbakışı manzarası', 'Deneyimli THK lisanslı tandem pilotları'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tepeye 4x4 transfer', 'Tüm profesyonel uçuş ekipmanları', 'Tandem pilot hizmeti', 'Uçuş sigortası'],
    excluded: ['Pilot tarafından çekilen aksiyon kamera fotoğrafları ve videoları'],
    whatToBring: ['Spor ayakkabı (zorunlu)', 'Güneş gözlüğü', 'Rahat spor kıyafetler'],
    safetyNotes: 'Maksimum kilo sınırı 105 kg\'dır. Kalp rahatsızlığı ve hamileler için uygun değildir.',
    itinerary: [
      { time: 'Seans Saati', title: 'Otelden Alınış', description: 'Kleopatra ofisine transfer.' },
      { time: '+20 dk', title: 'Zirveye Çıkış (800m)', description: 'Dağ yoluyla kalkış pistine ulaşım.' },
      { time: '+45 dk', title: 'Tandem Uçuş (15-20 dk)', description: 'Akdeniz üzerinde süzülüş.' },
      { time: '+75 dk', title: 'Kleopatra Plajı İniş & Dönüş', description: 'Sahile iniş ve otele transfer.' }
    ]
  },
  'night-safari': {
    name: 'Alanya Gece Safari (Kale Günbatımı & Off-Road)',
    shortDescription: 'Üstü açık ciplerle Alanya Kalesi gün batımı, panoramik gece ışıkları, Dimçayı eğlencesi ve akşam yemeği.',
    description: 'Gündüz sıcağından kaçıp Alanya\'nın büyüleyici gece ışıklarını keşfedin! Ciplerle kale surlarında gün batımı fotoğrafı, ardından Dimçayı vadisinde akşam yemeği, animasyon ve dans gösterisi.',
    operatingDays: 'Her Gün (Akşam)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Alanya Kalesi terasından romantik gün batımı', 'Işıklandırılmış Alanya panoraması', 'Dim Vadisi restoranda akşam yemeği', 'Canlı müzik ve animasyon gösterisi'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Cip safari turu', 'Akşam yemeği', 'Rehberlik ve sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    whatToBring: ['Akşam serinliği için hafif hırka, kamera, rahat ayakkabılar'],
    itinerary: [
      { time: '17:30', title: 'Otelden Alınış', description: 'Akşam üzeri ciplerle hareket.' },
      { time: '18:30', title: 'Kale Gün Batımı Molası', description: 'Panoramik fotoğraf çekimi.' },
      { time: '20:00', title: 'Dim Vadisi Akşam Yemeği', description: 'Canlı müzik eşliğinde akşam yemeği.' },
      { time: '23:30', title: 'Otele Dönüş', description: 'Otellere transfer.' }
    ]
  },
  'alanya-city-tour': {
    name: 'Alanya Şehir Turu & Teleferik (Damlataş & Kale)',
    shortDescription: 'Alanya Teleferik ile kaleye çıkış, Damlataş Mağarası, Kleopatra Plajı ve Seyir Terası gezisi.',
    description: 'Alanya\'nın simgelerini tek bir konforlu turda keşfedin! Astıma iyi gelen binlerce yıllık sarkıtlarıyla ünlü Damlataş Mağarası, teleferikle ortaçağ Alanya Kalesi\'ne çıkış ve şehri tepeden gören panoramik teras.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Alanya Teleferik (kablolu teleferik) deneyimi', 'Tarihi Alanya Kalesi ve cam teras', 'Damlataş Mağarası ziyareti', 'Alanya Seyir Terası fotoğraf molası'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Teleferik biletleri', 'Damlataş Mağarası girişi', 'Rehberlik hizmeti', 'Sigorta'],
    excluded: ['Kişisel harcamalar', 'Yiyecek ve içecekler'],
    whatToBring: ['Rahat yürüyüş ayakkabıları, şapka, kamera'],
    itinerary: [
      { time: '16:00', title: 'Otelden Alınış', description: 'Öğleden sonra konforlu başlangıç.' },
      { time: '16:30', title: 'Damlataş & Kleopatra Plajı', description: 'Mağara ziyareti.' },
      { time: '17:30', title: 'Teleferik ile Kaleye Çıkış', description: 'Surlar ve kale ziyareti.' },
      { time: '19:30', title: 'Seyir Terası & Otele Dönüş', description: 'Panoramik şehir manzarası ve transfer.' }
    ]
  },
  'sapadere-canyon': {
    name: 'Sapadere Kanyonu & Şelale Doğa Turu',
    shortDescription: 'Toros Dağları\'nın derinliklerinde ahşap yürüyüş yolları, buz gibi şelaleler, mağara ve köy ziyareti.',
    description: 'Doğa tutkunları için eşsiz bir kaçış noktası. 750 metre uzunluğundaki ahşap yürüyüş köprüleri üzerinde kanyonun içinden yürüyün, çağlayan şelalelerin altındaki doğal havuzlarda serinleyin, ipek dokuma köyünü ziyaret edin.',
    operatingDays: 'Her Gün',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['750 metrelik ahşap kanyon yürüyüş parkuru', 'Doğal şelaleler altında yüzme molası', 'Cüceler Mağarası ziyareti', 'Kanyon restoranda lezzetli öğle yemeği'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Kanyon giriş bileti', 'Öğle yemeği (Tavuk/Balık)', 'Rehberlik', 'Sigorta'],
    excluded: ['İçecekler', 'Cüceler Mağarası giriş bileti (isteğe bağlı)'],
    whatToBring: ['Mayo ve havlu (suda yüzmek isteyenler için)', 'Rahat yürüyüş ayakkabısı', 'Güneş kremi'],
    itinerary: [
      { time: '09:00', title: 'Otelden Alınış', description: 'Doğu Alanya\'ya hareket.' },
      { time: '10:30', title: 'Cüceler Mağarası', description: 'Sarkıt ve dikitler mağarası.' },
      { time: '11:30', title: 'Sapadere Kanyon Yürüyüşü', description: 'Ahşap yolda yürüyüş ve şelale molası.' },
      { time: '13:30', title: 'Öğle Yemeği', description: 'Kanyon restoranında yemek.' },
      { time: '16:00', title: 'Otele Dönüş', description: 'Otellere transfer.' }
    ]
  },
  'syedra-gazipasa': {
    name: 'Syedra Antik Kenti & Gazipaşa Kral Koyu Turu',
    shortDescription: 'Tarihi Syedra kenti kalıntıları, Gazipaşa Yalan Dünya Mağarası ve Kral Koyu (Delikdeniz) doğal havuzları.',
    description: 'Turistik kalabalıklardan uzak, tarih ve doğanın harmanlandığı özel bir rota. Deniz manzaralı antik Syedra kenti, 5 milyon yıllık Yalan Dünya Mağarası ve doğal kaya kemeriyle büyüleyen Kral Koyu\'nda yüzme.',
    operatingDays: 'Pazartesi, Perşembe, Pazar',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Deniz manzaralı Syedra Antik Kenti', 'Doğal havuz Kral Koyu (Delikdeniz) yüzme', 'Yalan Dünya Mağarası', 'Öğle yemeği dahil'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Örenyeri girişleri', 'Öğle yemeği', 'Rehberlik', 'Sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    whatToBring: ['Yürüyüş ayakkabısı, mayo, havlu, şapka'],
    itinerary: [
      { time: '08:30', title: 'Otelden Alınış', description: 'Gazipaşa istikametine hareket.' },
      { time: '09:30', title: 'Syedra Antik Kenti', description: 'Tarihi kalıntılar ve mozaikler.' },
      { time: '12:00', title: 'Öğle Yemeği', description: 'Bölgesel lezzetler.' },
      { time: '13:30', title: 'Kral Koyu (Delikdeniz)', description: 'Doğal havuzda yüzme molası.' },
      { time: '16:30', title: 'Otele Dönüş', description: 'Otele transfer.' }
    ]
  },
  'pamukkale': {
    name: 'Pamukkale & Hierapolis Günübirlik Turu',
    shortDescription: 'UNESCO Dünya Mirası beyaz traverten terasları, antik Hierapolis tiyatrosu ve Kleopatra Termal Havuzu.',
    description: 'Dünyanın 8. harikası kabul edilen Pamukkale\'nin bembeyaz kalsiyum travertenlerinde çıplak ayakla yürüyün. Antik Hierapolis kentinin devasa tiyatrosunu gezin ve tarihi sütunlar arasında şifalı Kleopatra Havuzu\'nda yüzün.',
    operatingDays: 'Salı, Cuma, Pazar',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Pamukkale beyaz traverten terasları', 'Hierapolis antik kenti ve nekropol', 'Kleopatra Antik Termal Havuzu', 'Açık büfe öğle yemeği dahil'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Klimalı konforlu otobüs', 'Pamukkale & Hierapolis giriş bileti', 'Öğle yemeği', 'Profesyonel lisanslı rehber', 'Sigorta'],
    excluded: ['Kleopatra Havuzu yüzme bileti (isteğe bağlı)', 'Kahvaltı ve akşam yemeği', 'İçecekler'],
    whatToBring: ['Pasaport veya kimlik', 'Mayo ve havlu', 'Güneş gözlüğü ve şapka', 'Rahat yürüyüş ayakkabısı'],
    itinerary: [
      { time: '03:30', title: 'Erken Otel Alınışı', description: 'Klimalı otobüsle hareket ve kahvaltı molası.' },
      { time: '09:30', title: 'Pamukkale\'ye Varış', description: 'Travertenler ve Hierapolis gezisi.' },
      { time: '13:30', title: 'Öğle Yemeği', description: 'Açık büfe öğle yemeği.' },
      { time: '15:00', title: 'Dönüş Yolculuğu', description: 'Akşam üzeri Alanya\'ya varış.' }
    ]
  },
  'cappadocia': {
    name: 'Kapadokya 2 Günlük Tur (Otel & Balon Seyri Dahil)',
    shortDescription: 'Peri bacaları, Göreme, yeraltı şehirleri, 1 gece otel konaklaması ve sabah sıcak hava balonları seyri.',
    description: 'Masal diyarı Kapadokya\'ya büyüleyici 2 günlük yolculuk! Volkanik tüflerden oluşan peri bacaları, yeraltı şehirleri, Göreme açık hava vadileri, konaklama ve sabah yüzlerce sıcak hava balonunun gökyüzüne yükselişini izleme fırsatı.',
    operatingDays: 'Salı - Çarşamba / Cuma - Cumartesi',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Peri bacaları ve vadiler gezisi', 'Yeraltı şehri ziyareti', '1 gece Kapadokya otel konaklaması (akşam yemeği dahil)', 'Sabah balon kalkışını izleme (veya uçuş imkanı)'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', '1 gece otel konaklaması', '1 akşam yemeği ve 1 kahvaltı', 'Profesyonel kokartlı rehber', 'Klimalı otobüs', 'Sigorta'],
    excluded: ['Öğle yemekleri ve içecekler', 'Sıcak hava balonu uçuş bileti (ayrıca rezerve edilir)', 'Müze girişleri'],
    whatToBring: ['Pasaport/kimlik', 'Mevsime uygun sıcak kıyafet (sabahları serindir)', 'Rahat yürüyüş ayakkabısı', 'Kamera'],
    itinerary: [
      { time: '1. Gün 04:00', title: 'Alanya\'dan Hareket', description: 'Toros Dağları ve Konya üzerinden yolculuk.' },
      { time: '1. Gün 12:00', title: 'Kapadokya Vadileri', description: 'Hayal Vadisi, Paşabağ ve yeraltı şehri.' },
      { time: '1. Gün 19:00', title: 'Otele Giriş & Akşam Yemeği', description: 'Dinlenme.' },
      { time: '2. Gün 05:30', title: 'Balon Seyri & Gün Doğumu', description: 'Gökyüzündeki balonların büyüsü.' },
      { time: '2. Gün 13:00', title: 'Dönüş Yolculuğu', description: 'Akşam Alanya otellerine varış.' }
    ]
  },
  'manavgat-side-aspendos': {
    name: 'Side Antik Kenti, Aspendos Tiyatrosu & Manavgat Şelalesi',
    shortDescription: 'Roma döneminden kalma Aspendos tiyatrosu, Side Apollon Tapınağı ve Manavgat Şelalesi kültür turu.',
    description: 'Antalya\'nın en görkemli tarihi miraslarını keşfedin! Akustiği bozulmamış 2000 yıllık Aspendos Roma Tiyatrosu, deniz kenarındaki Side Apollon Tapınağı ve gürül gürül akan Manavgat Şelalesi.',
    operatingDays: 'Pazartesi, Perşembe',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Dünyanın en iyi korunmuş Aspendos Antik Tiyatrosu', 'Side Apollon Tapınağı ve antik liman', 'Manavgat Şelalesi fotoğraf molası', 'Öğle yemeği dahil'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Aspendos ve şelale giriş biletleri', 'Öğle yemeği', 'Profesyonel rehber', 'Sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    whatToBring: ['Rahat ayakkabılar, şapka, güneş gözlüğü, kamera'],
    itinerary: [
      { time: '08:30', title: 'Otelden Alınış', description: 'Batıya hareket.' },
      { time: '10:00', title: 'Aspendos Tiyatrosu', description: '2000 yıllık tiyatro ziyareti.' },
      { time: '12:30', title: 'Öğle Yemeği', description: 'Nehir kenarı restoranda yemek.' },
      { time: '14:00', title: 'Side Antik Kenti & Apollon Tapınağı', description: 'Tarihi sokaklar ve sahil gezisi.' },
      { time: '16:00', title: 'Manavgat Şelalesi', description: 'Şelale molası.' },
      { time: '17:30', title: 'Otele Dönüş', description: 'Otellere transfer.' }
    ]
  },
  'side-mix-tour': {
    name: 'Side Mix Turu (Tekne, Cabrio Otobüs & Şelale)',
    shortDescription: 'Üstü açık cabrio safari otobüsü, Manavgat tekne turu, Side kenti ve şelale ziyareti.',
    description: 'Kültür, safari ve tekne turunu birleştiren zengin içerikli gün! Üstü açık araçlarla keyifli yolculuk, Manavgat Nehri üzerinde tekne turu, nehir ve denizin birleştiği kumsalda yüzme.',
    operatingDays: 'Salı, Cuma, Pazar',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Üstü açık cabrio araçlarla safari', 'Manavgat nehir teknesi turu', 'Nehir ile deniz arasında yüzme molası', 'Side tarihi çarşı gezisi'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tekne turu', 'Öğle yemeği', 'Rehberlik', 'Sigorta'],
    excluded: ['İçecekler', 'Şelale girişi'],
    whatToBring: ['Mayo, havlu, güneş kremi, şapka'],
    itinerary: [
      { time: '08:45', title: 'Otelden Alınış', description: 'Cabrio araçla hareket.' },
      { time: '10:30', title: 'Manavgat Tekne Gezisi', description: 'Nehirde yüzme ve tekne keyfi.' },
      { time: '13:00', title: 'Öğle Yemeği', description: 'Teknede yemek.' },
      { time: '15:00', title: 'Side Antik Şehir Gezisi', description: 'Tarihi kentte serbest zaman.' },
      { time: '17:30', title: 'Otele Dönüş', description: 'Otellere transfer.' }
    ]
  },
  'skydiving': {
    name: 'Tandem Paraşütle Atlama (Skydiving)',
    shortDescription: '4000 metre yükseklikten uçaktan serbest düşüş! Türkiye sahilinde nihai adrenalin deneyimi.',
    description: 'Hayatınızın en unutulmaz deneyimi! Profesyonel atlayış pilotuna bağlı olarak 4000 metre (yaklaşık 12.000 feet) irtifadan uçaktan atlayın. 200 km/s hızla 45 saniyelik serbest düşüşün ardından paraşüt açılışı ve muhteşem sahil manzarası.',
    operatingDays: 'Her Gün (Hava Şartlarına Uygunsa)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['4000 metre uçak irtifasından atlayış', '45 saniyelik adrenalin dolu serbest düşüş', 'Akdeniz kıyısı ve Toros Dağları manzarası', 'Uluslararası lisanslı master pilotlar'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Uçak uçuşu ve atlayış', 'Tüm profesyonel ekipmanlar', 'Tam kapsamlı ekstrem spor sigortası'],
    excluded: ['Özel kameraman video ve fotoğraf paketi'],
    whatToBring: ['Rahat spor kıyafetler', 'Bağcıklı spor ayakkabı', 'Pasaport'],
    safetyNotes: 'Maksimum kilo sınırı 95 kg. 18 yaş altı ebeveyn onayı gerektirir.',
    itinerary: [
      { time: 'Sabah Seansı', title: 'Havaalanına Transfer', description: 'Atlayış merkezine gidiş.' },
      { time: '+45 dk', title: 'Güvenlik Eğitimi & Kıyafet', description: 'Brifing ve tulum giyme.' },
      { time: '+90 dk', title: 'Uçakla 4000m\'ye Tırmanış', description: 'Heyecanlı yükseliş.' },
      { time: '+110 dk', title: 'Atlayış & Yumuşak İniş', description: 'Serbest düşüş ve paraşüt süzülüşü.' },
      { time: '+150 dk', title: 'Otele Dönüş', description: 'Sertifika teslimi ve transfer.' }
    ]
  },
  'sunset-boat-tour': {
    name: 'Alanya Günbatımı Tekne Turu (Sunset Cruise)',
    shortDescription: 'Altın sarısı Alanya gün batımı eşliğinde akşam tekne turu, akşam yemeği ve gece yüzmesi.',
    description: 'Gündüz sıcağından sonra serin akşam esintisinde Alanya Kalesi\'nin arkasında batan güneşi izleyin. Akdeniz üzerinde altın saatler, lezzetli akşam yemeği ve gün batımında denize girme keyfi.',
    operatingDays: 'Her Gün (Akşam)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['Alanya Kalesi arkasında gün batımı manzarası', 'Akşam serinliğinde açık deniz yüzme molası', 'Teknede akşam yemeği', 'Daha sakin ve romantik atmosfer'],
    included: ['Ücretsiz gidiş-dönüş otel transferi', 'Tekne turu', 'Akşam yemeği', 'Sigorta'],
    excluded: ['İçecekler', 'Kişisel harcamalar'],
    whatToBring: ['Mayo ve havlu', 'Kamera', 'Akşam için hafif giysi'],
    itinerary: [
      { time: '17:00', title: 'Otelden Alınış', description: 'Limana transfer.' },
      { time: '17:45', title: 'Limandan Çıkış', description: 'Kızıl Kule önünden gün batımına doğru seyir.' },
      { time: '19:15', title: 'Gün Batımı & Yüzme', description: 'Altın saatlerde yüzme molası.' },
      { time: '20:00', title: 'Akşam Yemeği', description: 'Teknede sıcak ızgara yemeği.' },
      { time: '21:30', title: 'Otele Dönüş', description: 'Otele transfer.' }
    ]
  },
  'vip-yacht': {
    name: 'Özel VIP Yat Kiralama (Private Charter)',
    shortDescription: 'Yalnızca ailenize veya grubunuza özel lüks yat, kaptan, özel aşçı, yüzme molaları ve VIP servis.',
    description: 'Alanya\'nın en özel deneyimi! Tamamen grubunuza tahsis edilmiş lüks motoryat ile istediğiniz koylarda yüzme özgürlüğü. Özel şef tarafından hazırlanan taze balık veya et menüsü, meyve tabağı ve VIP konfor.',
    operatingDays: 'Her Gün (Özel Rezervasyon)',
    pickupInstructions: 'Lütfen tur saatinizden 10 dakika önce otelinizin güvenlik kapısında bekleyiniz.',
    highlights: ['100% grubunuza özel lüks motoryat', 'Kişiye özel rota ve yüzme molaları', 'Özel aşçıdan gurme Akdeniz öğle/akşam yemeği', 'Güneşlenme minderleri, ses sistemi ve VIP salon'],
    included: ['Ücretsiz VIP araçla gidiş-dönüş otel transferi', 'Özel yat, yakıt ve kaptan', 'Öğle veya akşam yemeği', 'Soft içecekler & taze meyve ikramı', 'Sigorta'],
    excluded: ['İthal alkollü içecekler (isteğe bağlı sipariş edilebilir)'],
    whatToBring: ['Mayo, havlu, güneş kremi, şapka'],
    itinerary: [
      { time: 'Esnek Saat', title: 'VIP Transfer', description: 'Otelden marinaya özel transfer.' },
      { time: '+30 dk', title: 'Yata Biniş & Şampanya/İçecek', description: 'Kaptanın rotası ve seyir.' },
      { time: '+120 dk', title: 'Özel Koyda Gurme Yemek', description: 'Taze ızgara menüsü.' },
      { time: '+240 dk', title: 'Marinaya Dönüş & Transfer', description: 'Otele VIP transfer.' }
    ]
  },
  'antalya-airport-transfer': {
    name: 'Antalya Havalimanı VIP Transfer (AYT)',
    shortDescription: 'Antalya Havalimanı (AYT) ile Alanya otelleri arası doğrudan özel Mercedes Vito VIP transfer.',
    description: 'Turist otobüslerini beklemeden ailenize ve grubunuza özel klimalı lüks Mercedes Vito ile doğrudan otelinize gidin. Terminal çıkışında isimli karşılama, ücretsiz çocuk koltuğu, canlı uçuş takibi ve sabit 80 € araç fiyatı.',
    operatingDays: '7/24 Her Gün',
    pickupInstructions: 'Şoförünüz havalimanı çıkışında elinde adınızın yazılı olduğu tabela ile bekleyecektir.',
    highlights: ['Araç başı sabit 80 € (8 kişiye kadar tek fiyat)', 'Canlı uçuş rötarları takibi & ücretsiz bekleme', 'Yalnızca size özel Mercedes Vito VIP araç', 'Kapıdan kapıya doğrudan transfer'],
    included: ['Özel Mercedes Vito araç ve profesyonel şoför', 'Tüm otoyol ve yakıt giderleri', 'İsimli terminal karşılama', 'Ücretsiz çocuk koltuğu', 'Yolcu sigortası'],
    excluded: ['Ekstra rota sapmaları'],
    whatToBring: ['Pasaport ve uçuş bilgileri'],
    itinerary: [
      { time: 'Uçak İnişi', title: 'Terminal Çıkışında Karşılama', description: 'İsim tabelasıyla karşılama ve bavul yardımı.' },
      { time: '+15 dk', title: 'VIP Araca Biniş', description: 'Doğrudan Alanya\'ya hareket.' },
      { time: '+105 dk', title: 'Otel Resepsiyonuna Varış', description: 'Otelinize konforlu varış.' }
    ]
  },
  'gazipasa-airport-transfer': {
    name: 'Gazipaşa Havalimanı VIP Transfer (GZP)',
    shortDescription: 'Gazipaşa-Alanya Havalimanı (GZP) ile oteliniz arası hızlı 35-45 dakikalık Mercedes Vito transferi.',
    description: 'Gazipaşa Havalimanı\'ndan Alanya otellerine en hızlı ve konforlu ulaşım yolu! Sadece 35-45 dakikada otelinize varın. İsimli karşılama, araç başı net 45 € sabit fiyat, gece veya bagaj farkı yok.',
    operatingDays: '7/24 Her Gün',
    pickupInstructions: 'Şoförünüz havalimanı çıkışında elinde adınızın yazılı olduğu tabela ile bekleyecektir.',
    highlights: ['Sabit 45 € araç başı fiyat (8 kişiye kadar)', '35-45 dakikalık hızlı sahil yolculuğu', 'Kapıdan kapıya VIP teslimat', 'Gece tarifesi farkı yok'],
    included: ['Özel Mercedes Vito ve şoför', 'Tüm yol masrafları', 'İsimli karşılama', 'Çocuk koltuğu', 'Sigorta'],
    excluded: ['Ekstra güzergah dışı duraklar'],
    whatToBring: ['Uçuş detayları'],
    itinerary: [
      { time: 'Uçuş İnişi', title: 'Kapıda Karşılama', description: 'İsim tabelalı karşılama.' },
      { time: '+10 dk', title: 'Hareket', description: 'Alanya istikametine seyir.' },
      { time: '+40 dk', title: 'Otele Teslimat', description: 'Otel kapısında bırakılış.' }
    ]
  }
};
