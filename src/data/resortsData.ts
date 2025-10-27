export interface RoomType {
  name: string;
  nameAr: string;
  description: string;
  size: string;
  capacity: string;
  amenities: string[];
  image: string;
}

export interface Restaurant {
  name: string;
  nameAr: string;
  cuisine: string;
  cuisineAr: string;
  description: string;
  descriptionAr: string;
}

export interface Amenity {
  category: string;
  categoryAr: string;
  items: string[];
}

export interface ResortData {
  slug: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  region: string;
  rating: number;
  description: string;
  descriptionAr: string;
  heroImage: string;
  gallery: string[];
  rooms: RoomType[];
  restaurants: Restaurant[];
  amenities: Amenity[];
  spa: {
    name: string;
    description: string;
    treatments: string[];
  };
  activities: string[];
  checkIn: string;
  checkOut: string;
  website: string;
}

export const resortsData: Record<string, ResortData> = {
  "ritz-carlton-maldives": {
    slug: "ritz-carlton-maldives",
    name: "The Ritz-Carlton Maldives",
    nameAr: "ريتز كارلتون المالديف",
    location: "Fari Islands, Maldives",
    locationAr: "جزر فاري، المالديف",
    region: "Maldives",
    rating: 5,
    description: "Be surrounded by azure sky and ocean at The Ritz-Carlton Maldives, Fari Islands, featuring luxury villas and world-class amenities.",
    descriptionAr: "استمتع بالسماء الزرقاء والمحيط في ريتز كارلتون المالديف، جزر فاري، مع فيلات فاخرة ووسائل راحة عالمية المستوى.",
    heroImage: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80"
    ],
    rooms: [
      {
        name: "Overwater Villa",
        nameAr: "فيلا فوق الماء",
        description: "Spacious overwater villa with private infinity pool and direct lagoon access",
        size: "240 sq m",
        capacity: "3 adults or 2 adults + 2 children",
        amenities: ["Private Pool", "Ocean Views", "Butler Service", "Premium Bedding"],
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
      },
      {
        name: "Beach Villa",
        nameAr: "فيلا الشاطئ",
        description: "Beachfront villa with garden, private pool and direct beach access",
        size: "220 sq m",
        capacity: "3 adults or 2 adults + 2 children",
        amenities: ["Private Pool", "Beach Access", "Outdoor Shower", "Garden"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
      },
      {
        name: "Two-Bedroom Water Villa",
        nameAr: "فيلا مائية بغرفتي نوم",
        description: "Expansive family villa with two bedrooms and stunning ocean panoramas",
        size: "380 sq m",
        capacity: "5 adults or 4 adults + 3 children",
        amenities: ["Two Bedrooms", "Private Pool", "Living Room", "Family Friendly"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
      }
    ],
    restaurants: [
      {
        name: "Summer Pavilion",
        nameAr: "جناح الصيف",
        cuisine: "Cantonese",
        cuisineAr: "كانتوني",
        description: "Authentic Cantonese cuisine with fresh seafood and dim sum",
        descriptionAr: "مأكولات كانتونية أصيلة مع المأكولات البحرية الطازجة والدمس"
      },
      {
        name: "La Locanda",
        nameAr: "لا لوكاندا",
        cuisine: "Italian",
        cuisineAr: "إيطالي",
        description: "Contemporary Italian dining with homemade pasta and wood-fired pizzas",
        descriptionAr: "مطعم إيطالي معاصر مع المعكرونة محلية الصنع والبيتزا المخبوزة بالحطب"
      },
      {
        name: "Beach Shack",
        nameAr: "كوخ الشاطئ",
        cuisine: "International",
        cuisineAr: "عالمي",
        description: "Casual beachfront dining with grilled specialties and fresh seafood",
        descriptionAr: "تناول طعام غير رسمي على الشاطئ مع المشويات والمأكولات البحرية الطازجة"
      },
      {
        name: "Arabesque",
        nameAr: "أرابيسك",
        cuisine: "Middle Eastern",
        cuisineAr: "شرق أوسطي",
        description: "Levantine-inspired cuisine in an intimate setting",
        descriptionAr: "مأكولات مستوحاة من بلاد الشام في أجواء حميمة"
      }
    ],
    amenities: [
      {
        category: "Pools & Beach",
        categoryAr: "المسابح والشاطئ",
        items: ["3 Swimming Pools", "Private Beach", "Beach Club", "Water Sports Center"]
      },
      {
        category: "Wellness & Spa",
        categoryAr: "العافية والسبا",
        items: ["Full-Service Spa", "Fitness Center", "Yoga Pavilion", "Beauty Salon"]
      },
      {
        category: "Family Facilities",
        categoryAr: "المرافق العائلية",
        items: ["Kids Club", "Children's Pool", "Teen Lounge", "Babysitting Services"]
      },
      {
        category: "Recreation",
        categoryAr: "الترفيه",
        items: ["Tennis Court", "Water Sports", "Diving Center", "Excursions"]
      }
    ],
    spa: {
      name: "The Ritz-Carlton Spa",
      description: "Overwater spa sanctuary offering holistic treatments inspired by Maldivian traditions",
      treatments: ["Signature Massages", "Facial Treatments", "Body Wraps", "Hydrotherapy"]
    },
    activities: [
      "Snorkeling & Diving",
      "Sunset Cruises",
      "Island Hopping",
      "Fishing Trips",
      "Water Sports",
      "Spa Treatments",
      "Cooking Classes",
      "Cultural Activities"
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    website: "https://www.ritzcarlton.com/en/hotels/maldives"
  },
  
  "patina-maldives": {
    slug: "patina-maldives",
    name: "Patina Maldives",
    nameAr: "باتينا المالديف",
    location: "Fari Islands, North Malé Atoll",
    locationAr: "جزر فاري، جزيرة مالي الشمالية",
    region: "Maldives",
    rating: 5,
    description: "A 42-hectare island haven of freedom and wonder, offering perpetual flow of inspiration with world-class dining destinations.",
    descriptionAr: "ملاذ جزيرة بمساحة 42 هكتارًا من الحرية والعجائب، يقدم تدفقًا دائمًا من الإلهام مع وجهات طعام عالمية المستوى.",
    heroImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80"
    ],
    rooms: [
      {
        name: "Beach Pool Villa",
        nameAr: "فيلا شاطئية بمسبح",
        description: "Contemporary beach villa with infinity pool and garden sanctuary",
        size: "255 sq m",
        capacity: "3 adults or 2 adults + 1 child",
        amenities: ["Infinity Pool", "Beach Access", "Outdoor Bathtub", "Premium Sound System"],
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
      },
      {
        name: "Overwater Pool Villa",
        nameAr: "فيلا مائية بمسبح",
        description: "Elegant overwater sanctuary with lagoon access and infinity pool",
        size: "240 sq m",
        capacity: "3 adults or 2 adults + 1 child",
        amenities: ["Infinity Pool", "Lagoon Access", "Overwater Net", "Stargazing Deck"],
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
      },
      {
        name: "Two-Bedroom Beach Pool Villa",
        nameAr: "فيلا شاطئية بمسبح وغرفتي نوم",
        description: "Spacious family villa with two bedrooms and expansive living areas",
        size: "490 sq m",
        capacity: "6 adults or 4 adults + 4 children",
        amenities: ["Two Bedrooms", "Large Pool", "Private Beach", "Kitchen"],
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
      }
    ],
    restaurants: [
      {
        name: "Roots",
        nameAr: "روتس",
        cuisine: "Plant-Based",
        cuisineAr: "نباتي",
        description: "Innovative plant-based cuisine celebrating natural ingredients",
        descriptionAr: "مطبخ نباتي مبتكر يحتفل بالمكونات الطبيعية"
      },
      {
        name: "Kōen",
        nameAr: "كوين",
        cuisine: "Japanese",
        cuisineAr: "ياباني",
        description: "Authentic Japanese dining with omakase and teppanyaki",
        descriptionAr: "مطعم ياباني أصيل مع أوماكاسي وتيبانياكي"
      },
      {
        name: "Flo",
        nameAr: "فلو",
        cuisine: "Mediterranean",
        cuisineAr: "متوسطي",
        description: "Coastal Mediterranean flavors in a breezy setting",
        descriptionAr: "نكهات البحر المتوسط الساحلية في أجواء منعشة"
      },
      {
        name: "Helios",
        nameAr: "هيليوس",
        cuisine: "Greek",
        cuisineAr: "يوناني",
        description: "Contemporary Greek cuisine with sunset views",
        descriptionAr: "مطبخ يوناني معاصر مع إطلالات على الغروب"
      }
    ],
    amenities: [
      {
        category: "Pools & Beach",
        categoryAr: "المسابح والشاطئ",
        items: ["Main Pool", "Beach Club", "Private Beach Areas", "Infinity Pools"]
      },
      {
        category: "Wellness & Fitness",
        categoryAr: "العافية واللياقة",
        items: ["Spa", "Fitness Center", "Yoga Studio", "Meditation Gardens"]
      },
      {
        category: "Family & Kids",
        categoryAr: "العائلة والأطفال",
        items: ["Footprints Kids Club", "Teen Club", "Children's Pool", "Family Activities"]
      },
      {
        category: "Water Sports",
        categoryAr: "الرياضات المائية",
        items: ["Diving Center", "Snorkeling", "Kayaking", "Paddleboarding"]
      }
    ],
    spa: {
      name: "Flow",
      description: "Holistic wellness sanctuary combining Eastern and Western healing traditions",
      treatments: ["Watsu Therapy", "Sound Healing", "Traditional Massages", "Acupuncture"]
    },
    activities: [
      "Diving & Snorkeling",
      "Cultural Workshops",
      "Sunset Sailing",
      "Marine Biology Tours",
      "Cooking Classes",
      "Art Sessions",
      "Fitness Classes",
      "Meditation Sessions"
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    website: "https://www.patinamaldives.com"
  }
};

export const getAllResorts = (): ResortData[] => {
  return Object.values(resortsData);
};

export const getResortBySlug = (slug: string): ResortData | null => {
  return resortsData[slug] || null;
};

export const getResortsByRegion = (region: string): ResortData[] => {
  return Object.values(resortsData).filter(resort => resort.region === region);
};