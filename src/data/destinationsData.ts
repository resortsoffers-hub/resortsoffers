export interface DestinationData {
  name: string;
  arabicName: string;
  slug: string;
  heroImage: string;
  description: string;
  arabicDescription: string;
  bestTimeToVisit: {
    en: string;
    ar: string;
  };
  regions: Array<{
    name: string;
    arabicName: string;
    description: string;
    image: string;
  }>;
  topAttractions: Array<{
    title: string;
    titleAr: string;
    description: string;
  }>;
  activities: string[];
  cuisine: string[];
  faqs: Array<{
    question: string;
    questionAr: string;
    answer: string;
    answerAr: string;
  }>;
}

const rawDestinationsData: Record<string, DestinationData> = {
  maldives: {
    name: "Maldives",
    arabicName: "المالديف",
    slug: "maldives",
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1600&q=80",
    description: "Paradise islands perfect for honeymooners seeking romance in private water villas, families enjoying safe lagoons and kids clubs, and couples escaping to secluded luxury. World-class resorts offer halal-certified dining, overwater bungalows with direct ocean access, and exceptional hospitality in crystal-clear tropical waters.",
    arabicDescription: "جزر الجنة المثالية لشهر العسل في فيلات خاصة فوق الماء، والعائلات التي تستمتع بالبحيرات الآمنة ونوادي الأطفال، والأزواج الذين يبحثون عن الرفاهية المنعزلة. تقدم المنتجعات العالمية طعامًا حلالًا معتمدًا، وأكواخًا فوق الماء مع الوصول المباشر للمحيط، وضيافة استثنائية في المياه الاستوائية الصافية.",
    bestTimeToVisit: {
      en: "November to April - Dry season with excellent visibility for diving and perfect beach weather (25-30°C)",
      ar: "نوفمبر إلى أبريل - الموسم الجاف مع رؤية ممتازة للغوص وطقس شاطئي مثالي (25-30 درجة مئوية)"
    },
    regions: [
      {
        name: "Honeymoon Escapes",
        arabicName: "ملاذات شهر العسل",
        description: "Romantic overwater villas with private infinity pools, sunset views, and couples spa treatments",
        image: "/src/assets/maldives-ocean-pool.jpg"
      },
      {
        name: "Family Resorts",
        arabicName: "منتجعات عائلية",
        description: "Kids clubs, family water villas, safe shallow lagoons, and activities for all ages",
        image: "/src/assets/resorts/maldives-villa-pool.jpg"
      },
      {
        name: "Private Water Villas",
        arabicName: "فيلات خاصة فوق الماء",
        description: "Exclusive overwater bungalows with direct ocean access, glass floors, and butler service",
        image: "/src/assets/resorts/maldives-water-villa.jpg"
      },
      {
        name: "Halal Luxury",
        arabicName: "الفخامة الحلال",
        description: "Resorts offering halal-certified dining, alcohol-free options, and Muslim-friendly amenities",
        image: "/src/assets/maldives-patina.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Underwater Restaurant",
        titleAr: "مطعم تحت الماء",
        description: "Dine 5 meters below sea level surrounded by marine life"
      },
      {
        title: "Sandbank Picnics",
        titleAr: "نزهات على الجزر الرملية",
        description: "Private lunch on pristine uninhabited sandbanks"
      },
      {
        title: "Bioluminescent Beach",
        titleAr: "شاطئ متوهج بيولوجيا",
        description: "Witness the magical glowing waters at night on Vaadhoo Island"
      },
      {
        title: "Coral Reef Diving",
        titleAr: "الغوص في الشعاب المرجانية",
        description: "World-class diving with turtles, rays, and reef sharks"
      },
      {
        title: "Seaplane Tours",
        titleAr: "جولات بالطائرة المائية",
        description: "Aerial views of the stunning atolls and islands"
      },
      {
        title: "Spa Retreats",
        titleAr: "منتجعات السبا",
        description: "Overwater spa pavilions with ocean views"
      }
    ],
    activities: [
      "Scuba diving and snorkeling",
      "Dolphin watching cruises",
      "Sunset fishing trips",
      "Private island hopping",
      "Water sports (jet skiing, parasailing)",
      "Underwater photography",
      "Romantic beach dinners",
      "Spa and wellness treatments",
      "Yoga and meditation",
      "Marine biology experiences"
    ],
    cuisine: [
      "Mas Huni - Tuna and coconut breakfast",
      "Garudhiya - Traditional fish soup",
      "Fihunu Mas - Grilled fish BBQ",
      "Bis Keemiya - Samosas with tuna",
      "Kulhi Boakibaa - Spicy fish cake",
      "Fresh seafood platters"
    ],
    faqs: [
      {
        question: "Do I need a visa for Maldives?",
        questionAr: "هل أحتاج إلى تأشيرة للمالديف؟",
        answer: "All tourists receive a free 30-day visa on arrival. Valid passport required for 6 months beyond your stay.",
        answerAr: "جميع السياح يحصلون على تأشيرة مجانية لمدة 30 يومًا عند الوصول. جواز سفر ساري المفعول مطلوب لمدة 6 أشهر بعد إقامتك."
      },
      {
        question: "How do I get to my resort?",
        questionAr: "كيف أصل إلى منتجعي؟",
        answer: "Resorts are reached by speedboat (30-90 min) or seaplane (15-45 min). Your resort will arrange transfers from Malé airport.",
        answerAr: "يتم الوصول إلى المنتجعات بالقارب السريع (30-90 دقيقة) أو الطائرة المائية (15-45 دقيقة). سيرتب منتجعك النقل من مطار مالي."
      },
      {
        question: "What currency is used?",
        questionAr: "ما هي العملة المستخدمة؟",
        answer: "Maldivian Rufiyaa (MVR), but US Dollars are widely accepted. Most resorts operate in USD. Credit cards accepted everywhere.",
        answerAr: "الروفيه المالديفية (MVR)، لكن الدولار الأمريكي مقبول على نطاق واسع. معظم المنتجعات تعمل بالدولار الأمريكي. بطاقات الائتمان مقبولة في كل مكان."
      },
      {
        question: "Is Maldives family-friendly?",
        questionAr: "هل المالديف مناسبة للعائلات؟",
        answer: "Absolutely! Many resorts have kids clubs, family villas, and children's activities. Perfect for all ages.",
        answerAr: "بالتأكيد! العديد من المنتجعات لديها نوادي أطفال وفيلات عائلية وأنشطة للأطفال. مثالية لجميع الأعمار."
      }
    ]
  },
  
  dubai: {
    name: "Dubai",
    arabicName: "دبي",
    slug: "dubai",
    heroImage: "/src/assets/resorts/dubai-luxury.jpg",
    description: "Futuristic luxury, desert adventures, and world-class shopping in the heart of the UAE. Dubai combines modern architecture with traditional Arabian hospitality and endless entertainment options.",
    arabicDescription: "الرفاهية المستقبلية ومغامرات الصحراء والتسوق العالمي في قلب الإمارات العربية المتحدة. تجمع دبي بين العمارة الحديثة والضيافة العربية التقليدية وخيارات الترفيه اللامتناهية.",
    bestTimeToVisit: {
      en: "November to March - Pleasant weather with temperatures 20-30°C, perfect for outdoor activities",
      ar: "نوفمبر إلى مارس - طقس لطيف مع درجات حرارة 20-30 درجة مئوية، مثالي للأنشطة الخارجية"
    },
    regions: [
      {
        name: "Downtown Dubai",
        arabicName: "وسط مدينة دبي",
        description: "Home to Burj Khalifa, Dubai Mall, and the Dubai Fountain",
        image: "/src/assets/resorts/dubai-luxury.jpg"
      },
      {
        name: "Palm Jumeirah",
        arabicName: "نخلة جميرا",
        description: "Iconic man-made island with ultra-luxury resorts and residences",
        image: "/src/assets/resorts/dubai-luxury.jpg"
      },
      {
        name: "Dubai Marina",
        arabicName: "مرسى دبي",
        description: "Waterfront living with stunning skyscrapers and dining",
        image: "/src/assets/resorts/dubai-luxury.jpg"
      },
      {
        name: "Jumeirah Beach",
        arabicName: "شاطئ جميرا",
        description: "Pristine beaches with views of Burj Al Arab",
        image: "/src/assets/resorts/dubai-luxury.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Burj Khalifa",
        titleAr: "برج خليفة",
        description: "World's tallest building with observation deck on 124th floor"
      },
      {
        title: "Dubai Mall",
        titleAr: "دبي مول",
        description: "World's largest shopping mall with over 1,200 shops"
      },
      {
        title: "Dubai Fountain",
        titleAr: "نافورة دبي",
        description: "Spectacular choreographed fountain shows"
      },
      {
        title: "Desert Safari",
        titleAr: "رحلة صحراوية",
        description: "Dune bashing, camel rides, and Bedouin-style dinner"
      },
      {
        title: "Burj Al Arab",
        titleAr: "برج العرب",
        description: "Iconic 7-star hotel with stunning architecture"
      },
      {
        title: "Global Village",
        titleAr: "القرية العالمية",
        description: "Cultural and entertainment destination with pavilions from 75+ countries"
      }
    ],
    activities: [
      "Shopping at luxury malls",
      "Skydiving over Palm Jumeirah",
      "Desert safaris and dune bashing",
      "Yacht cruises",
      "Theme parks (IMG Worlds, Dubai Parks)",
      "Indoor skiing at Ski Dubai",
      "Hot air balloon rides",
      "Water sports and beach activities",
      "Fine dining experiences",
      "Spa and wellness retreats"
    ],
    cuisine: [
      "Shawarma - Traditional wrap",
      "Hummus and Falafel",
      "Machboos - Spiced rice with meat",
      "Luqaimat - Sweet dumplings",
      "Arabic Coffee and Dates",
      "International fine dining"
    ],
    faqs: [
      {
        question: "Do I need a visa for Dubai?",
        questionAr: "هل أحتاج إلى تأشيرة لدبي؟",
        answer: "Many nationalities receive visa-free entry or visa on arrival. GCC citizens need only their ID. Check UAE embassy for your requirements.",
        answerAr: "العديد من الجنسيات تحصل على دخول بدون تأشيرة أو تأشيرة عند الوصول. مواطنو دول مجلس التعاون يحتاجون فقط إلى بطاقة الهوية. تحقق من السفارة الإماراتية لمتطلباتك."
      },
      {
        question: "What is the dress code in Dubai?",
        questionAr: "ما هو قانون اللباس في دبي؟",
        answer: "Modest dress recommended in public places. Beachwear is fine at beaches and pools. Cover shoulders and knees at malls and restaurants.",
        answerAr: "يوصى بالملابس المحتشمة في الأماكن العامة. ملابس الشاطئ مقبولة في الشواطئ والمسابح. غطِ الكتفين والركبتين في المولات والمطاعم."
      },
      {
        question: "Is Dubai expensive?",
        questionAr: "هل دبي غالية؟",
        answer: "Dubai offers options for all budgets. Luxury experiences are world-class, but budget-friendly options exist for dining, shopping, and accommodation.",
        answerAr: "دبي توفر خيارات لجميع الميزانيات. التجارب الفاخرة عالمية المستوى، لكن توجد خيارات ميسورة التكلفة لتناول الطعام والتسوق والإقامة."
      }
    ]
  },

  thailand: {
    name: "Thailand",
    arabicName: "تايلاند",
    slug: "thailand",
    heroImage: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1600&q=80",
    description: "Experience the perfect blend of ancient culture, tropical beaches, and modern luxury in the Land of Smiles. Thailand offers world-class resorts, pristine islands, vibrant cities, and warm hospitality.",
    arabicDescription: "استمتع بمزيج مثالي من الثقافة القديمة والشواطئ الاستوائية والرفاهية الحديثة في بلد الابتسامات. تقدم تايلاند منتجعات عالمية المستوى وجزر نقية ومدن نابضة بالحياة وضيافة دافئة.",
    bestTimeToVisit: {
      en: "November to February - Cool and dry season with pleasant temperatures (18-32°C)",
      ar: "نوفمبر إلى فبراير - موسم بارد وجاف مع درجات حرارة لطيفة (18-32 درجة مئوية)"
    },
    regions: [
      {
        name: "Phuket",
        arabicName: "بوكيت",
        description: "Thailand's largest island, famous for stunning beaches, luxury resorts, and vibrant nightlife",
        image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80"
      },
      {
        name: "Bangkok",
        arabicName: "بانكوك",
        description: "Vibrant capital city with golden temples, luxury shopping, and world-class dining",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80"
      },
      {
        name: "Pattaya",
        arabicName: "باتايا",
        description: "Beach resort city with family attractions, water sports, and entertainment",
        image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?w=800&q=80"
      },
      {
        name: "Koh Samui",
        arabicName: "كوه ساموي",
        description: "Tropical paradise island with palm-fringed beaches and luxury wellness resorts",
        image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Grand Palace & Wat Phra Kaew",
        titleAr: "القصر الكبير ووات فرا كايو",
        description: "Bangkok's most sacred temple complex with stunning architecture"
      },
      {
        title: "Phi Phi Islands",
        titleAr: "جزر في في",
        description: "Crystal-clear waters, dramatic cliffs, and world-famous Maya Bay"
      },
      {
        title: "Floating Markets",
        titleAr: "الأسواق العائمة",
        description: "Traditional markets on canals selling local produce and crafts"
      },
      {
        title: "Elephant Nature Park",
        titleAr: "حديقة الفيلة الطبيعية",
        description: "Ethical elephant sanctuary in Chiang Mai"
      }
    ],
    activities: [
      "Island hopping boat tours",
      "Thai cooking classes",
      "Traditional Thai massage and spa treatments",
      "Scuba diving and snorkeling",
      "Muay Thai boxing experiences",
      "Temple tours and Buddhist ceremonies",
      "Night market shopping",
      "Jungle trekking and zip-lining"
    ],
    cuisine: [
      "Pad Thai - Stir-fried rice noodles",
      "Tom Yum Goong - Spicy shrimp soup",
      "Green Curry - Coconut-based curry",
      "Mango Sticky Rice - Sweet dessert"
    ],
    faqs: [
      {
        question: "Do I need a visa to visit Thailand?",
        questionAr: "هل أحتاج إلى تأشيرة لزيارة تايلاند؟",
        answer: "Many nationalities receive visa-free entry for 30-45 days. GCC citizens get 30 days visa-free. Check with Thai embassy for your specific requirements.",
        answerAr: "العديد من الجنسيات تحصل على دخول بدون تأشيرة لمدة 30-45 يومًا. مواطنو دول مجلس التعاون الخليجي يحصلون على 30 يومًا بدون تأشيرة."
      }
    ]
  },

  bali: {
    name: "Bali",
    arabicName: "بالي",
    slug: "bali",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=80",
    description: "Spiritual tranquility meets tropical paradise with temples, rice terraces, and luxury villas",
    arabicDescription: "الهدوء الروحي يلتقي بالجنة الاستوائية مع المعابد ومدرجات الأرز والفيلات الفاخرة",
    bestTimeToVisit: {
      en: "April to October - Dry season with sunny days and pleasant temperatures (26-30°C)",
      ar: "أبريل إلى أكتوبر - موسم جاف مع أيام مشمسة ودرجات حرارة لطيفة (26-30 درجة مئوية)"
    },
    regions: [
      {
        name: "Ubud",
        arabicName: "أوبود",
        description: "Cultural heart with rice terraces, art galleries, and yoga retreats",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
      },
      {
        name: "Seminyak",
        arabicName: "سيمينياك",
        description: "Upscale beach resort area with luxury hotels and fine dining",
        image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80"
      },
      {
        name: "Nusa Dua",
        arabicName: "نوسا دوا",
        description: "Pristine beaches with world-class resorts and golf courses",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80"
      },
      {
        name: "Uluwatu",
        arabicName: "أولواتو",
        description: "Dramatic clifftop temples and world-famous surf breaks",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Tanah Lot Temple",
        titleAr: "معبد تاناه لوت",
        description: "Iconic sea temple on a rock formation"
      },
      {
        title: "Tegalalang Rice Terraces",
        titleAr: "مدرجات أرز تيغالالانغ",
        description: "UNESCO-listed stunning rice paddies"
      },
      {
        title: "Sacred Monkey Forest",
        titleAr: "غابة القرود المقدسة",
        description: "Ancient temple complex with playful monkeys"
      },
      {
        title: "Mount Batur Sunrise Trek",
        titleAr: "رحلة شروق جبل باتور",
        description: "Active volcano with breathtaking sunrise views"
      }
    ],
    activities: [
      "Yoga and meditation retreats",
      "Surfing lessons",
      "Temple tours",
      "Traditional Balinese massage",
      "Cooking classes",
      "Rice terrace walks",
      "Snorkeling and diving",
      "Cultural dance performances"
    ],
    cuisine: [
      "Nasi Goreng - Fried rice",
      "Satay - Grilled skewers",
      "Babi Guling - Roast suckling pig",
      "Lawar - Traditional mix salad"
    ],
    faqs: [
      {
        question: "Do I need a visa for Bali?",
        questionAr: "هل أحتاج إلى تأشيرة لبالي؟",
        answer: "Many nationalities can get visa on arrival for 30 days. Check Indonesian embassy for your requirements.",
        answerAr: "العديد من الجنسيات يمكنها الحصول على تأشيرة عند الوصول لمدة 30 يومًا."
      }
    ]
  },

  japan: {
    name: "Japan",
    arabicName: "اليابان",
    slug: "japan",
    heroImage: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1600&q=80",
    description: "Ancient traditions harmonize with cutting-edge modernity in the Land of the Rising Sun",
    arabicDescription: "التقاليد القديمة تتناغم مع الحداثة المتطورة في بلد الشمس المشرقة",
    bestTimeToVisit: {
      en: "March to May & September to November - Cherry blossoms in spring, autumn foliage, mild weather",
      ar: "مارس إلى مايو وسبتمبر إلى نوفمبر - أزهار الكرز في الربيع، أوراق الخريف، طقس معتدل"
    },
    regions: [
      {
        name: "Tokyo",
        arabicName: "طوكيو",
        description: "Futuristic metropolis with neon lights, technology, and traditional temples",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
      },
      {
        name: "Kyoto",
        arabicName: "كيوتو",
        description: "Ancient capital with thousands of temples, geishas, and traditional gardens",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
      },
      {
        name: "Osaka",
        arabicName: "أوساكا",
        description: "Food capital with vibrant nightlife and historic castles",
        image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80"
      },
      {
        name: "Hokkaido",
        arabicName: "هوكايدو",
        description: "Northern island with ski resorts, hot springs, and natural beauty",
        image: "/src/assets/resorts/china-luxury.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Mount Fuji",
        titleAr: "جبل فوجي",
        description: "Iconic sacred mountain and UNESCO World Heritage site"
      },
      {
        title: "Fushimi Inari Shrine",
        titleAr: "ضريح فوشيمي إيناري",
        description: "Thousands of vermillion torii gates"
      },
      {
        title: "Tokyo Skytree",
        titleAr: "برج طوكيو سكاي تري",
        description: "Tallest structure in Japan with panoramic views"
      },
      {
        title: "Arashiyama Bamboo Grove",
        titleAr: "غابة الخيزران أراشياما",
        description: "Serene bamboo forest walkway"
      }
    ],
    activities: [
      "Traditional tea ceremonies",
      "Onsen (hot spring) bathing",
      "Sushi making classes",
      "Cherry blossom viewing",
      "Bullet train experiences",
      "Temple and shrine visits",
      "Sumo wrestling matches",
      "Geisha district tours"
    ],
    cuisine: [
      "Sushi and Sashimi",
      "Ramen - Noodle soup",
      "Tempura - Battered seafood",
      "Wagyu beef",
      "Matcha desserts"
    ],
    faqs: [
      {
        question: "Do I need a visa for Japan?",
        questionAr: "هل أحتاج إلى تأشيرة لليابان؟",
        answer: "Many nationalities can visit visa-free for up to 90 days. Check Japanese embassy for requirements.",
        answerAr: "العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  switzerland: {
    name: "Switzerland",
    arabicName: "سويسرا",
    slug: "switzerland",
    heroImage: "/src/assets/destinations/switzerland-hero.jpg",
    description: "Alpine luxury, pristine mountains, and world-renowned hospitality",
    arabicDescription: "الرفاهية الألبية والجبال النقية والضيافة ذات الشهرة العالمية",
    bestTimeToVisit: {
      en: "December to March for skiing, June to September for hiking and sightseeing",
      ar: "ديسمبر إلى مارس للتزلج، يونيو إلى سبتمبر للمشي لمسافات طويلة ومشاهدة المعالم"
    },
    regions: [
      {
        name: "Zermatt",
        arabicName: "زيرمات",
        description: "Car-free alpine village at the foot of the Matterhorn",
        image: "/src/assets/resorts/swiss-alps.jpg"
      },
      {
        name: "St. Moritz",
        arabicName: "سانت موريتز",
        description: "Glamorous ski resort with luxury hotels and boutiques",
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80"
      },
      {
        name: "Interlaken",
        arabicName: "إنترلاكن",
        description: "Adventure capital between two stunning alpine lakes",
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80"
      },
      {
        name: "Geneva",
        arabicName: "جنيف",
        description: "Cosmopolitan city on Lake Geneva with international flair",
        image: "/src/assets/destinations/switzerland-hero.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Matterhorn",
        titleAr: "ماترهورن",
        description: "Iconic pyramid-shaped mountain peak"
      },
      {
        title: "Jungfraujoch",
        titleAr: "يونغفراويوخ",
        description: "Top of Europe - highest railway station"
      },
      {
        title: "Lake Geneva",
        titleAr: "بحيرة جنيف",
        description: "Stunning alpine lake with mountain backdrop"
      },
      {
        title: "Glacier Express",
        titleAr: "قطار الجليد السريع",
        description: "Scenic train journey through the Alps"
      }
    ],
    activities: [
      "Skiing and snowboarding",
      "Mountain hiking",
      "Scenic train rides",
      "Chocolate factory tours",
      "Watch making workshops",
      "Paragliding",
      "Lake cruises",
      "Spa and wellness"
    ],
    cuisine: [
      "Fondue - Melted cheese",
      "Raclette - Grilled cheese",
      "Rösti - Potato pancake",
      "Swiss chocolate",
      "Alpine cheese varieties"
    ],
    faqs: [
      {
        question: "Do I need a visa for Switzerland?",
        questionAr: "هل أحتاج إلى تأشيرة لسويسرا؟",
        answer: "Switzerland is part of Schengen area. Many nationalities can visit visa-free for up to 90 days.",
        answerAr: "سويسرا جزء من منطقة شنغن. العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  italy: {
    name: "Italy",
    arabicName: "إيطاليا",
    slug: "italy",
    heroImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&q=80",
    description: "Renaissance art, world-class cuisine, and romantic landscapes",
    arabicDescription: "فن عصر النهضة والمأكولات العالمية والمناظر الطبيعية الرومانسية",
    bestTimeToVisit: {
      en: "April to June & September to October - Pleasant weather, fewer crowds, ideal for sightseeing",
      ar: "أبريل إلى يونيو وسبتمبر إلى أكتوبر - طقس لطيف، حشود أقل، مثالي لمشاهدة المعالم"
    },
    regions: [
      {
        name: "Tuscany",
        arabicName: "توسكانا",
        description: "Rolling hills, vineyards, and Renaissance cities",
        image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80"
      },
      {
        name: "Amalfi Coast",
        arabicName: "ساحل أمالفي",
        description: "Dramatic coastal cliffs with colorful villages",
        image: "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=800&q=80"
      },
      {
        name: "Lake Como",
        arabicName: "بحيرة كومو",
        description: "Elegant lakeside villas and mountain scenery",
        image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&q=80"
      },
      {
        name: "Sicily",
        arabicName: "صقلية",
        description: "Mediterranean island with ancient ruins and beaches",
        image: "/src/assets/resorts/italy-villa.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Colosseum",
        titleAr: "الكولوسيوم",
        description: "Ancient Roman amphitheater in Rome"
      },
      {
        title: "Venice Canals",
        titleAr: "قنوات البندقية",
        description: "Romantic gondola rides through historic waterways"
      },
      {
        title: "Florence Cathedral",
        titleAr: "كاتدرائية فلورنسا",
        description: "Iconic Duomo with Brunelleschi's dome"
      },
      {
        title: "Cinque Terre",
        titleAr: "تشينكوي تيري",
        description: "Five colorful coastal villages"
      }
    ],
    activities: [
      "Wine tasting in Tuscany",
      "Cooking classes",
      "Art museum tours",
      "Gondola rides",
      "Coastal hiking",
      "Opera performances",
      "Historic site visits",
      "Shopping in Milan"
    ],
    cuisine: [
      "Pizza Napoletana",
      "Fresh pasta dishes",
      "Risotto",
      "Gelato",
      "Tiramisu",
      "Italian wines"
    ],
    faqs: [
      {
        question: "Do I need a visa for Italy?",
        questionAr: "هل أحتاج إلى تأشيرة لإيطاليا؟",
        answer: "Italy is part of Schengen area. Many nationalities can visit visa-free for up to 90 days.",
        answerAr: "إيطاليا جزء من منطقة شنغن. العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  norway: {
    name: "Norway",
    arabicName: "النرويج",
    slug: "norway",
    heroImage: "/src/assets/destinations/norway-hero.jpg",
    description: "Dramatic fjords, Northern Lights, and Scandinavian elegance",
    arabicDescription: "المضايق الدرامية والأضواء الشمالية والأناقة الاسكندنافية",
    bestTimeToVisit: {
      en: "May to September for midnight sun and hiking, December to March for Northern Lights and skiing",
      ar: "مايو إلى سبتمبر لشمس منتصف الليل والمشي، ديسمبر إلى مارس للأضواء الشمالية والتزلج"
    },
    regions: [
      {
        name: "Oslo",
        arabicName: "أوسلو",
        description: "Modern capital with Viking history and museums",
        image: "/src/assets/destinations/norway-oslo.jpg"
      },
      {
        name: "Bergen",
        arabicName: "بيرغن",
        description: "Gateway to the fjords with colorful Bryggen wharf",
        image: "/src/assets/destinations/norway-bergen.jpg"
      },
      {
        name: "Tromsø",
        arabicName: "ترومسو",
        description: "Arctic city perfect for Northern Lights viewing",
        image: "/src/assets/destinations/norway-tromso.jpg"
      },
      {
        name: "Lofoten",
        arabicName: "لوفوتين",
        description: "Dramatic islands with fishing villages and mountains",
        image: "/src/assets/destinations/norway-lofoten.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Geirangerfjord",
        titleAr: "مضيق جيرانجر",
        description: "UNESCO World Heritage fjord with waterfalls"
      },
      {
        title: "Northern Lights",
        titleAr: "الأضواء الشمالية",
        description: "Aurora Borealis viewing in Arctic regions"
      },
      {
        title: "Preikestolen",
        titleAr: "صخرة المنبر",
        description: "Dramatic cliff overlooking Lysefjord"
      },
      {
        title: "Viking Ship Museum",
        titleAr: "متحف سفن الفايكنج",
        description: "Ancient Viking vessels in Oslo"
      }
    ],
    activities: [
      "Fjord cruises",
      "Northern Lights tours",
      "Hiking and trekking",
      "Dog sledding",
      "Whale watching",
      "Skiing",
      "Kayaking",
      "Midnight sun experiences"
    ],
    cuisine: [
      "Fresh salmon and seafood",
      "Brunost - Brown cheese",
      "Kjøttkaker - Meatballs",
      "Rakfisk - Fermented fish",
      "Cloudberries"
    ],
    faqs: [
      {
        question: "Do I need a visa for Norway?",
        questionAr: "هل أحتاج إلى تأشيرة للنرويج؟",
        answer: "Norway is part of Schengen area. Many nationalities can visit visa-free for up to 90 days.",
        answerAr: "النرويج جزء من منطقة شنغن. العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  finland: {
    name: "Finland",
    arabicName: "فنلندا",
    slug: "finland",
    heroImage: "/src/assets/destinations/finland-hero.jpg",
    description: "Arctic wilderness, glass igloos, and the magical Northern Lights experience",
    arabicDescription: "البرية القطبية والأكواخ الزجاجية وتجربة الأضواء الشمالية السحرية",
    bestTimeToVisit: {
      en: "December to March for winter activities and Northern Lights, June to August for midnight sun",
      ar: "ديسمبر إلى مارس للأنشطة الشتوية والأضواء الشمالية، يونيو إلى أغسطس لشمس منتصف الليل"
    },
    regions: [
      {
        name: "Lapland",
        arabicName: "لابلاند",
        description: "Arctic region with Santa Claus Village and Northern Lights",
        image: "/src/assets/resorts/finland-northern-lights.jpg"
      },
      {
        name: "Helsinki",
        arabicName: "هلسنكي",
        description: "Modern capital with design culture and Baltic Sea views",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80"
      },
      {
        name: "Rovaniemi",
        arabicName: "روفانيمي",
        description: "Official hometown of Santa Claus on the Arctic Circle",
        image: "https://images.unsplash.com/photo-1544894079-e81a9eb1da8b?w=800&q=80"
      },
      {
        name: "Lake District",
        arabicName: "منطقة البحيرات",
        description: "Thousands of lakes with summer cottages and saunas",
        image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Santa Claus Village",
        titleAr: "قرية سانتا كلوز",
        description: "Meet Santa at the Arctic Circle year-round"
      },
      {
        title: "Glass Igloos",
        titleAr: "الأكواخ الزجاجية",
        description: "Sleep under the Northern Lights in luxury"
      },
      {
        title: "Suomenlinna Fortress",
        titleAr: "قلعة سومنلينا",
        description: "UNESCO sea fortress in Helsinki"
      },
      {
        title: "Husky Safaris",
        titleAr: "رحلات الكلاب الهاسكي",
        description: "Dog sledding through snowy forests"
      }
    ],
    activities: [
      "Northern Lights viewing",
      "Husky and reindeer sledding",
      "Ice swimming and saunas",
      "Snowmobiling",
      "Cross-country skiing",
      "Meeting Santa Claus",
      "Glass igloo stays",
      "Midnight sun experiences"
    ],
    cuisine: [
      "Salmon soup",
      "Karjalanpiirakka - Rice pies",
      "Reindeer meat",
      "Cloudberry desserts",
      "Finnish rye bread"
    ],
    faqs: [
      {
        question: "Do I need a visa for Finland?",
        questionAr: "هل أحتاج إلى تأشيرة لفنلندا؟",
        answer: "Finland is part of Schengen area. Many nationalities can visit visa-free for up to 90 days.",
        answerAr: "فنلندا جزء من منطقة شنغن. العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  uk: {
    name: "United Kingdom",
    arabicName: "المملكة المتحدة",
    slug: "uk",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80",
    description: "Royal heritage, countryside estates, and sophisticated urban luxury",
    arabicDescription: "التراث الملكي والعقارات الريفية والرفاهية الحضرية المتطورة",
    bestTimeToVisit: {
      en: "May to September - Warmer weather, longer days, ideal for sightseeing and countryside visits",
      ar: "مايو إلى سبتمبر - طقس أكثر دفئًا، أيام أطول، مثالي لمشاهدة المعالم وزيارات الريف"
    },
    regions: [
      {
        name: "London",
        arabicName: "لندن",
        description: "Historic capital with royal palaces, museums, and West End shows",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
      },
      {
        name: "Scottish Highlands",
        arabicName: "المرتفعات الاسكتلندية",
        description: "Dramatic landscapes with castles, lochs, and whisky distilleries",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80"
      },
      {
        name: "Cotswolds",
        arabicName: "كوتسوولدز",
        description: "Picturesque villages with honey-colored stone cottages",
        image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80"
      },
      {
        name: "Edinburgh",
        arabicName: "إدنبرة",
        description: "Historic Scottish capital with castle and festivals",
        image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Buckingham Palace",
        titleAr: "قصر باكنغهام",
        description: "Official residence of the British monarch"
      },
      {
        title: "Tower of London",
        titleAr: "برج لندن",
        description: "Historic castle housing the Crown Jewels"
      },
      {
        title: "Stonehenge",
        titleAr: "ستونهنج",
        description: "Prehistoric monument and UNESCO site"
      },
      {
        title: "Edinburgh Castle",
        titleAr: "قلعة إدنبرة",
        description: "Historic fortress on volcanic rock"
      }
    ],
    activities: [
      "Royal palace tours",
      "West End theatre shows",
      "Afternoon tea experiences",
      "Castle visits",
      "Whisky tasting",
      "Countryside walks",
      "Museum exploration",
      "Harry Potter tours"
    ],
    cuisine: [
      "Fish and Chips",
      "Sunday Roast",
      "Afternoon Tea",
      "Shepherd's Pie",
      "Scottish Haggis",
      "English Breakfast"
    ],
    faqs: [
      {
        question: "Do I need a visa for the UK?",
        questionAr: "هل أحتاج إلى تأشيرة للمملكة المتحدة؟",
        answer: "Visa requirements vary by nationality. Many countries need a Standard Visitor visa. Check UK government website.",
        answerAr: "متطلبات التأشيرة تختلف حسب الجنسية. العديد من الدول تحتاج إلى تأشيرة زائر قياسية."
      }
    ]
  },

  china: {
    name: "China",
    arabicName: "الصين",
    slug: "china",
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600&q=80",
    description: "Ancient wonders, modern megacities, and rich cultural heritage",
    arabicDescription: "العجائب القديمة والمدن الضخمة الحديثة والتراث الثقافي الغني",
    bestTimeToVisit: {
      en: "April to May & September to October - Pleasant weather, fewer crowds, ideal for sightseeing",
      ar: "أبريل إلى مايو وسبتمبر إلى أكتوبر - طقس لطيف، حشود أقل، مثالي لمشاهدة المعالم"
    },
    regions: [
      {
        name: "Beijing",
        arabicName: "بكين",
        description: "Capital city with Forbidden City and Great Wall access",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80"
      },
      {
        name: "Shanghai",
        arabicName: "شنغهاي",
        description: "Modern metropolis with futuristic skyline and historic Bund",
        image: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=800&q=80"
      },
      {
        name: "Guilin",
        arabicName: "غويلين",
        description: "Stunning karst mountains and Li River scenery",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80"
      },
      {
        name: "Hong Kong",
        arabicName: "هونغ كونغ",
        description: "Vibrant city with skyline, shopping, and dim sum",
        image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Great Wall of China",
        titleAr: "سور الصين العظيم",
        description: "Ancient defensive wall stretching thousands of miles"
      },
      {
        title: "Forbidden City",
        titleAr: "المدينة المحرمة",
        description: "Imperial palace complex in Beijing"
      },
      {
        title: "Terracotta Army",
        titleAr: "جيش التيراكوتا",
        description: "Ancient clay soldiers in Xi'an"
      },
      {
        title: "Li River Cruise",
        titleAr: "رحلة نهر لي",
        description: "Scenic boat journey through karst landscapes"
      }
    ],
    activities: [
      "Great Wall hiking",
      "Kung Fu shows",
      "Tea ceremonies",
      "Calligraphy classes",
      "Panda viewing",
      "River cruises",
      "Temple visits",
      "Night market exploration"
    ],
    cuisine: [
      "Peking Duck",
      "Dim Sum",
      "Hot Pot",
      "Kung Pao Chicken",
      "Dumplings",
      "Chinese Tea"
    ],
    faqs: [
      {
        question: "Do I need a visa for China?",
        questionAr: "هل أحتاج إلى تأشيرة للصين؟",
        answer: "Most nationalities need a visa. Some cities offer 72-144 hour visa-free transit. Check Chinese embassy.",
        answerAr: "معظم الجنسيات تحتاج إلى تأشيرة. بعض المدن تقدم عبور بدون تأشيرة لمدة 72-144 ساعة."
      }
    ]
  },

  malaysia: {
    name: "Malaysia",
    arabicName: "ماليزيا",
    slug: "malaysia",
    heroImage: "/src/assets/resorts/malaysia-beach.jpg",
    description: "Tropical rainforests, pristine islands, and multicultural urban experiences",
    arabicDescription: "الغابات الاستوائية المطيرة والجزر النقية والتجارب الحضرية متعددة الثقافات",
    bestTimeToVisit: {
      en: "December to February - Dry season on west coast, ideal for beaches and islands",
      ar: "ديسمبر إلى فبراير - موسم جاف على الساحل الغربي، مثالي للشواطئ والجزر"
    },
    regions: [
      {
        name: "Kuala Lumpur",
        arabicName: "كوالالمبور",
        description: "Modern capital with Petronas Towers and diverse cuisine",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80"
      },
      {
        name: "Langkawi",
        arabicName: "لنكاوي",
        description: "Tropical island paradise with beaches and duty-free shopping",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
      },
      {
        name: "Penang",
        arabicName: "بينانج",
        description: "UNESCO heritage city famous for street food",
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80"
      },
      {
        name: "Sunway Lagoon",
        arabicName: "صنواي لاجون",
        description: "Water park and resort complex in Kuala Lumpur",
        image: "/src/assets/resorts/malaysia-beach.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Petronas Twin Towers",
        titleAr: "برجا بتروناس التوأم",
        description: "Iconic twin skyscrapers in Kuala Lumpur"
      },
      {
        title: "Batu Caves",
        titleAr: "كهوف باتو",
        description: "Hindu temple in limestone caves"
      },
      {
        title: "Cameron Highlands",
        titleAr: "مرتفعات كاميرون",
        description: "Tea plantations and cool mountain climate"
      },
      {
        title: "Sipadan Island",
        titleAr: "جزيرة سيبادان",
        description: "World-class diving destination"
      }
    ],
    activities: [
      "Island hopping",
      "Rainforest trekking",
      "Street food tours",
      "Diving and snorkeling",
      "Tea plantation visits",
      "Wildlife spotting",
      "Shopping in malls",
      "Cultural heritage tours"
    ],
    cuisine: [
      "Nasi Lemak - Coconut rice",
      "Satay - Grilled skewers",
      "Laksa - Spicy noodle soup",
      "Roti Canai - Flatbread",
      "Char Kway Teow - Fried noodles"
    ],
    faqs: [
      {
        question: "Do I need a visa for Malaysia?",
        questionAr: "هل أحتاج إلى تأشيرة لماليزيا؟",
        answer: "Many nationalities get visa-free entry for 30-90 days. GCC citizens get 90 days visa-free.",
        answerAr: "العديد من الجنسيات تحصل على دخول بدون تأشيرة لمدة 30-90 يومًا. مواطنو دول مجلس التعاون يحصلون على 90 يومًا."
      }
    ]
  },

  greece: {
    name: "Greece",
    arabicName: "اليونان",
    slug: "greece",
    heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&q=80",
    description: "Ancient history, stunning islands, and Mediterranean luxury await",
    arabicDescription: "التاريخ القديم والجزر الخلابة والرفاهية المتوسطية في انتظارك",
    bestTimeToVisit: {
      en: "April to June & September to October - Pleasant weather, fewer tourists, ideal for islands",
      ar: "أبريل إلى يونيو وسبتمبر إلى أكتوبر - طقس لطيف، سياح أقل، مثالي للجزر"
    },
    regions: [
      {
        name: "Santorini",
        arabicName: "سانتوريني",
        description: "Iconic white-washed buildings with blue domes and stunning sunsets",
        image: "/src/assets/destinations/greece-santorini.jpg"
      },
      {
        name: "Mykonos",
        arabicName: "ميكونوس",
        description: "Glamorous island with luxury pool villa hotels, pristine beaches, iconic windmills, and world-class honeymoon resorts including Belvedere, Cavo Tagoo, Myconian Collection, Katikies, and more",
        image: "/src/assets/destinations/greece-mykonos.jpg"
      },
      {
        name: "Crete",
        arabicName: "كريت",
        description: "Largest island with ancient ruins, beaches, and mountains",
        image: "/src/assets/destinations/greece-crete.jpg"
      },
      {
        name: "Athens",
        arabicName: "أثينا",
        description: "Historic capital with Acropolis and ancient monuments",
        image: "/src/assets/destinations/greece-athens.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Acropolis",
        titleAr: "الأكروبوليس",
        description: "Ancient citadel with Parthenon temple"
      },
      {
        title: "Santorini Sunset",
        titleAr: "غروب سانتوريني",
        description: "World-famous sunset views in Oia"
      },
      {
        title: "Delos Island",
        titleAr: "جزيرة ديلوس",
        description: "Sacred island with ancient ruins"
      },
      {
        title: "Meteora Monasteries",
        titleAr: "أديرة ميتيورا",
        description: "Clifftop monasteries with stunning views"
      }
    ],
    activities: [
      "Island hopping",
      "Ancient site tours",
      "Beach relaxation",
      "Wine tasting",
      "Sailing cruises",
      "Greek cooking classes",
      "Sunset watching",
      "Archaeological exploration"
    ],
    cuisine: [
      "Moussaka - Layered casserole",
      "Souvlaki - Grilled meat skewers",
      "Greek Salad with Feta",
      "Tzatziki - Yogurt dip",
      "Baklava - Sweet pastry",
      "Fresh seafood"
    ],
    faqs: [
      {
        question: "Do I need a visa for Greece?",
        questionAr: "هل أحتاج إلى تأشيرة لليونان؟",
        answer: "Greece is part of Schengen area. Many nationalities can visit visa-free for up to 90 days.",
        answerAr: "اليونان جزء من منطقة شنغن. العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  zanzibar: {
    name: "Zanzibar",
    arabicName: "زنجبار",
    slug: "zanzibar",
    heroImage: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=1600&q=80",
    description: "Exotic spice islands with white sand beaches and Swahili culture",
    arabicDescription: "جزر التوابل الغريبة مع الشواطئ الرملية البيضاء والثقافة السواحيلية",
    bestTimeToVisit: {
      en: "June to October - Dry season with pleasant temperatures and calm seas",
      ar: "يونيو إلى أكتوبر - موسم جاف مع درجات حرارة لطيفة وبحار هادئة"
    },
    regions: [
      {
        name: "Stone Town",
        arabicName: "ستون تاون",
        description: "UNESCO heritage site with Arab, Persian, and European architecture",
        image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80"
      },
      {
        name: "Nungwi",
        arabicName: "نونغوي",
        description: "Northern beach resort area with stunning sunsets",
        image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80"
      },
      {
        name: "Kendwa",
        arabicName: "كيندوا",
        description: "Pristine beach with minimal tidal changes",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
      },
      {
        name: "Paje",
        arabicName: "باجي",
        description: "Kitesurfing paradise on the east coast",
        image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Spice Tours",
        titleAr: "جولات التوابل",
        description: "Visit spice plantations and learn about exotic spices"
      },
      {
        title: "Prison Island",
        titleAr: "جزيرة السجن",
        description: "Historic island with giant tortoises"
      },
      {
        title: "Jozani Forest",
        titleAr: "غابة جوزاني",
        description: "Home to rare red colobus monkeys"
      },
      {
        title: "Mnemba Atoll",
        titleAr: "جزيرة منيمبا المرجانية",
        description: "World-class diving and snorkeling"
      }
    ],
    activities: [
      "Spice plantation tours",
      "Snorkeling and diving",
      "Dhow sailing cruises",
      "Kitesurfing",
      "Stone Town walking tours",
      "Beach relaxation",
      "Dolphin watching",
      "Sunset cruises"
    ],
    cuisine: [
      "Zanzibar Pizza - Street food specialty",
      "Urojo Soup - Spicy soup",
      "Biryani - Spiced rice",
      "Fresh seafood",
      "Coconut dishes",
      "Tropical fruits"
    ],
    faqs: [
      {
        question: "Do I need a visa for Zanzibar?",
        questionAr: "هل أحتاج إلى تأشيرة لزنجبار؟",
        answer: "Zanzibar is part of Tanzania. Many nationalities can get visa on arrival. Check Tanzania embassy.",
        answerAr: "زنجبار جزء من تنزانيا. العديد من الجنسيات يمكنها الحصول على تأشيرة عند الوصول."
      }
    ]
  },

  "south-africa": {
    name: "South Africa",
    arabicName: "جنوب أفريقيا",
    slug: "south-africa",
    heroImage: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3?w=1600&q=80",
    description: "Safari adventures, dramatic landscapes, and world-class wine estates",
    arabicDescription: "مغامرات السفاري والمناظر الطبيعية الدرامية ومزارع النبيذ العالمية",
    bestTimeToVisit: {
      en: "May to September - Dry winter season, best for safari and wildlife viewing",
      ar: "مايو إلى سبتمبر - موسم الشتاء الجاف، الأفضل للسفاري ومشاهدة الحياة البرية"
    },
    regions: [
      {
        name: "Cape Town",
        arabicName: "كيب تاون",
        description: "Stunning coastal city with Table Mountain and beaches",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80"
      },
      {
        name: "Kruger",
        arabicName: "كروجر",
        description: "World-famous national park for Big Five safaris",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80"
      },
      {
        name: "Garden Route",
        arabicName: "طريق الحديقة",
        description: "Scenic coastal drive with forests and lagoons",
        image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80"
      },
      {
        name: "Johannesburg",
        arabicName: "جوهانسبرغ",
        description: "Vibrant city with history and urban culture",
        image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Table Mountain",
        titleAr: "جبل الطاولة",
        description: "Iconic flat-topped mountain with cable car"
      },
      {
        title: "Kruger National Park",
        titleAr: "حديقة كروجر الوطنية",
        description: "Big Five safari experiences"
      },
      {
        title: "Cape Winelands",
        titleAr: "أراضي النبيذ في كيب",
        description: "World-class wine estates and tastings"
      },
      {
        title: "Robben Island",
        titleAr: "جزيرة روبن",
        description: "Historic prison where Mandela was held"
      }
    ],
    activities: [
      "Safari game drives",
      "Wine tasting tours",
      "Shark cage diving",
      "Hiking Table Mountain",
      "Penguin watching",
      "Township tours",
      "Scenic drives",
      "Beach activities"
    ],
    cuisine: [
      "Braai - South African BBQ",
      "Biltong - Dried meat",
      "Bobotie - Spiced mince",
      "Bunny Chow - Curry in bread",
      "Cape Malay cuisine",
      "South African wines"
    ],
    faqs: [
      {
        question: "Do I need a visa for South Africa?",
        questionAr: "هل أحتاج إلى تأشيرة لجنوب أفريقيا؟",
        answer: "Many nationalities can visit visa-free for up to 90 days. Check South African embassy for requirements.",
        answerAr: "العديد من الجنسيات يمكنها الزيارة بدون تأشيرة لمدة تصل إلى 90 يومًا."
      }
    ]
  },

  seychelles: {
    name: "Seychelles",
    arabicName: "سيشيل",
    slug: "seychelles",
    heroImage: "/src/assets/destinations/seychelles-hero.jpg",
    description: "Pristine beaches, granite boulders, and exclusive island resorts in the Indian Ocean",
    arabicDescription: "شواطئ نقية وصخور جرانيتية ومنتجعات جزر حصرية في المحيط الهندي",
    bestTimeToVisit: {
      en: "April to May & October to November - Calm seas, ideal for diving and beach activities",
      ar: "أبريل إلى مايو وأكتوبر إلى نوفمبر - بحار هادئة، مثالية للغوص وأنشطة الشاطئ"
    },
    regions: [
      {
        name: "Mahé",
        arabicName: "ماهي",
        description: "Main island with capital Victoria and stunning beaches",
        image: "/src/assets/destinations/seychelles-mahe.jpg"
      },
      {
        name: "Praslin",
        arabicName: "براسلين",
        description: "Home to Vallée de Mai UNESCO site and Anse Lazio beach",
        image: "/src/assets/destinations/seychelles-praslin.jpg"
      },
      {
        name: "La Digue",
        arabicName: "لا ديغ",
        description: "Tranquil island with iconic Anse Source d'Argent beach",
        image: "/src/assets/destinations/seychelles-la-digue.jpg"
      },
      {
        name: "Silhouette",
        arabicName: "سيلويت",
        description: "Mountainous island with luxury eco-resorts",
        image: "/src/assets/destinations/seychelles-silhouette.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Anse Source d'Argent",
        titleAr: "شاطئ آنس سورس دارجنت",
        description: "World's most photographed beach with granite boulders"
      },
      {
        title: "Vallée de Mai",
        titleAr: "وادي ماي",
        description: "UNESCO forest with rare Coco de Mer palms"
      },
      {
        title: "Aldabra Atoll",
        titleAr: "جزيرة ألدابرا المرجانية",
        description: "UNESCO site with giant tortoises"
      },
      {
        title: "Morne Seychellois",
        titleAr: "مورن سيشيلوا",
        description: "Highest peak with hiking trails and views"
      }
    ],
    activities: [
      "Island hopping",
      "Snorkeling and diving",
      "Beach relaxation",
      "Nature walks",
      "Giant tortoise viewing",
      "Sailing and cruises",
      "Fishing trips",
      "Spa treatments"
    ],
    cuisine: [
      "Grilled fish with Creole sauce",
      "Octopus curry",
      "Coconut-based dishes",
      "Fresh tropical fruits",
      "Shark chutney",
      "Ladob - Sweet dessert"
    ],
    faqs: [
      {
        question: "Do I need a visa for Seychelles?",
        questionAr: "هل أحتاج إلى تأشيرة لسيشيل؟",
        answer: "No visa required for tourists. Free visitor's permit issued on arrival for up to 3 months.",
        answerAr: "لا حاجة لتأشيرة للسياح. يتم إصدار تصريح زائر مجاني عند الوصول لمدة تصل إلى 3 أشهر."
      }
    ]
  },

  mauritius: {
    name: "Mauritius",
    arabicName: "موريشيوس",
    slug: "mauritius",
    heroImage: "/src/assets/destinations/mauritius-hero.jpg",
    description: "Tropical paradise offering diverse landscapes, luxury resorts, and vibrant culture",
    arabicDescription: "جنة استوائية تقدم مناظر طبيعية متنوعة ومنتجعات فاخرة وثقافة نابضة بالحياة",
    bestTimeToVisit: {
      en: "May to December - Cooler, drier weather ideal for beach activities and water sports",
      ar: "مايو إلى ديسمبر - طقس أكثر برودة وجفافًا مثالي لأنشطة الشاطئ والرياضات المائية"
    },
    regions: [
      {
        name: "North",
        arabicName: "الشمال",
        description: "Grand Baie area with beaches, shopping, and nightlife",
        image: "/src/assets/destinations/mauritius-north.jpg"
      },
      {
        name: "South",
        arabicName: "الجنوب",
        description: "Dramatic cliffs, waterfalls, and natural beauty",
        image: "/src/assets/destinations/mauritius-south.jpg"
      },
      {
        name: "East",
        arabicName: "الشرق",
        description: "Belle Mare beach and luxury resorts",
        image: "/src/assets/destinations/mauritius-east.jpg"
      },
      {
        name: "West",
        arabicName: "الغرب",
        description: "Flic en Flac beach and Le Morne mountain",
        image: "/src/assets/destinations/mauritius-west.jpg"
      }
    ],
    topAttractions: [
      {
        title: "Le Morne Brabant",
        titleAr: "لو مورن برابانت",
        description: "UNESCO mountain with hiking and kitesurfing"
      },
      {
        title: "Seven Colored Earths",
        titleAr: "الأراضي السبعة الملونة",
        description: "Unique geological formation with colorful sand dunes"
      },
      {
        title: "Chamarel Waterfall",
        titleAr: "شلال شاماريل",
        description: "Spectacular 100-meter waterfall"
      },
      {
        title: "Île aux Cerfs",
        titleAr: "جزيرة أو سيرف",
        description: "Paradise island with water sports and beaches"
      }
    ],
    activities: [
      "Catamaran cruises",
      "Snorkeling and diving",
      "Kitesurfing",
      "Dolphin watching",
      "Underwater sea walk",
      "Zip-lining",
      "Golf",
      "Spa treatments"
    ],
    cuisine: [
      "Dholl Puri - Flatbread with curry",
      "Vindaye - Fish curry",
      "Gateaux Piments - Chili cakes",
      "Biryani",
      "Fresh seafood",
      "Rum cocktails"
    ],
    faqs: [
      {
        question: "Do I need a visa for Mauritius?",
        questionAr: "هل أحتاج إلى تأشيرة لموريشيوس؟",
        answer: "No visa required for tourists. Free entry permit issued on arrival for up to 60 days.",
        answerAr: "لا حاجة لتأشيرة للسياح. يتم إصدار تصريح دخول مجاني عند الوصول لمدة تصل إلى 60 يومًا."
      }
    ]
  },

  tahiti: {
    name: "Tahiti & French Polynesia",
    arabicName: "تاهيتي وبولينيزيا الفرنسية",
    slug: "tahiti",
    heroImage: "/src/assets/resorts/bora-bora.jpg",
    description: "Overwater bungalows, turquoise lagoons, and pristine coral reefs in the heart of the South Pacific. French Polynesia offers unparalleled luxury and natural beauty across 118 islands.",
    arabicDescription: "أكواخ فوق الماء وبحيرات فيروزية وشعاب مرجانية نقية في قلب جنوب المحيط الهادئ. توفر بولينيزيا الفرنسية رفاهية وجمالًا طبيعيًا لا مثيل لهما عبر 118 جزيرة.",
    bestTimeToVisit: {
      en: "May to October - Dry season with perfect weather (24-28°C), ideal for water activities and less humidity",
      ar: "مايو إلى أكتوبر - موسم جاف مع طقس مثالي (24-28 درجة مئوية)، مثالي للأنشطة المائية ورطوبة أقل"
    },
    regions: [
      {
        name: "Tahiti",
        arabicName: "تاهيتي",
        description: "Main island with vibrant markets, black sand beaches, and Papeete city",
        image: "/src/assets/resorts/bora-bora.jpg"
      },
      {
        name: "Bora Bora",
        arabicName: "بورا بورا",
        description: "Legendary island with iconic overwater bungalows and Mount Otemanu",
        image: "/src/assets/resorts/bora-bora.jpg"
      },
      {
        name: "Moorea",
        arabicName: "موريا",
        description: "Heart-shaped island with dramatic peaks and pristine bays",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
      },
      {
        name: "Rangiroa",
        arabicName: "رانجيروا",
        description: "World's second-largest atoll, perfect for diving with dolphins and sharks",
        image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80"
      }
    ],
    topAttractions: [
      {
        title: "Overwater Bungalows",
        titleAr: "أكواخ فوق الماء",
        description: "Iconic luxury accommodations with glass floors and direct lagoon access"
      },
      {
        title: "Lagoonarium",
        titleAr: "متحف البحيرة",
        description: "Natural aquarium to swim with rays, sharks, and tropical fish"
      },
      {
        title: "Mount Otemanu",
        titleAr: "جبل أوتيمانو",
        description: "Extinct volcano providing stunning backdrop to Bora Bora"
      },
      {
        title: "Coral Gardens",
        titleAr: "حدائق المرجان",
        description: "World-class snorkeling spots with vibrant marine life"
      },
      {
        title: "Black Pearl Farms",
        titleAr: "مزارع اللؤلؤ الأسود",
        description: "Visit farms producing famous Tahitian black pearls"
      },
      {
        title: "Matira Beach",
        titleAr: "شاطئ ماتيرا",
        description: "One of the most beautiful public beaches in the South Pacific"
      }
    ],
    activities: [
      "Snorkeling and scuba diving",
      "Shark and ray feeding tours",
      "Lagoon boat tours",
      "Jet ski safaris",
      "Sunset sailing cruises",
      "Traditional Polynesian dance shows",
      "Pearl farm visits",
      "Island hopping adventures",
      "Helicopter tours",
      "4WD mountain safaris"
    ],
    cuisine: [
      "Poisson Cru - Raw fish in coconut milk",
      "Ma'a Tahiti - Traditional feast",
      "Fresh tropical fruits",
      "Grilled mahi-mahi",
      "Fafaru - Fermented fish",
      "French pastries and breads"
    ],
    faqs: [
      {
        question: "Do I need a visa for Tahiti and French Polynesia?",
        questionAr: "هل أحتاج إلى تأشيرة لتاهيتي وبولينيزيا الفرنسية؟",
        answer: "No visa required for most nationalities (including US, Canada, EU, GCC countries) for stays up to 90 days. As French Polynesia is a French overseas territory, visa requirements follow French regulations. Valid passport required for 6 months beyond stay.",
        answerAr: "لا حاجة لتأشيرة لمعظم الجنسيات (بما في ذلك الولايات المتحدة وكندا والاتحاد الأوروبي ودول مجلس التعاون الخليجي) للإقامة حتى 90 يومًا. جواز سفر ساري المفعول مطلوب لمدة 6 أشهر بعد الإقامة."
      },
      {
        question: "What currency is used in Tahiti?",
        questionAr: "ما هي العملة المستخدمة في تاهيتي؟",
        answer: "CFP Franc (XPF). Credit cards widely accepted at resorts and restaurants. ATMs available in main islands. 1 USD ≈ 100 XPF.",
        answerAr: "الفرنك الباسيفيكي (XPF). بطاقات الائتمان مقبولة على نطاق واسع في المنتجعات والمطاعم. أجهزة الصراف الآلي متوفرة في الجزر الرئيسية."
      },
      {
        question: "How do I get between islands?",
        questionAr: "كيف أنتقل بين الجزر؟",
        answer: "Air Tahiti operates domestic flights between islands (15-50 min). Ferry services available for nearby islands like Moorea. Many resorts arrange transfers and island-hopping packages.",
        answerAr: "تشغل طيران تاهيتي رحلات محلية بين الجزر (15-50 دقيقة). خدمات العبارات متاحة للجزر القريبة مثل موريا. العديد من المنتجعات ترتب النقل وباقات التنقل بين الجزر."
      },
      {
        question: "What language is spoken?",
        questionAr: "ما هي اللغة المستخدمة؟",
        answer: "French and Tahitian are official languages. English is widely spoken in tourist areas, resorts, and by tour operators. Many staff are multilingual.",
        answerAr: "الفرنسية والتاهيتية هي اللغات الرسمية. الإنجليزية مستخدمة على نطاق واسع في المناطق السياحية والمنتجعات ومن قبل منظمي الرحلات."
      },
      {
        question: "Is Tahiti expensive?",
        questionAr: "هل تاهيتي غالية؟",
        answer: "Tahiti is a luxury destination with higher prices, especially for resorts and dining. However, all-inclusive packages offer good value. Budget options exist on main islands. Water activities and natural attractions are moderately priced.",
        answerAr: "تاهيتي وجهة فاخرة بأسعار أعلى، خاصة للمنتجعات والطعام. ومع ذلك، الباقات الشاملة تقدم قيمة جيدة. توجد خيارات ميزانية في الجزر الرئيسية."
      }
    ]
  }
};

// Resolve local destination images from src/assets for production builds
const destImages = {
  ...import.meta.glob('../assets/destinations/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' }),
  ...import.meta.glob('../assets/resorts/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' }),
  ...import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' }),
} as Record<string, string>;

const resolveAsset = (p: string): string => {
  if (!p) return p;
  if (p.startsWith('http')) return p;
  // Normalize '/src/...' paths to match glob keys '../...'
  const normalized = p.replace(/^\/src\//, '../');
  return destImages[normalized] ?? p;
};

export const destinationsData: Record<string, DestinationData> = Object.fromEntries(
  Object.entries(rawDestinationsData).map(([slug, d]) => [
    slug,
    {
      ...d,
      heroImage: resolveAsset(d.heroImage),
      regions: d.regions.map((r) => ({ ...r, image: resolveAsset(r.image) })),
    },
  ]),
);

export const getAllDestinations = (): DestinationData[] => {
  return Object.values(destinationsData);
};

