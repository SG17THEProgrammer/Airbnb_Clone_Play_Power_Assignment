export interface RoomPhoto {
  id: string;
  url: string;
  alt: string;
  roomName: string;
}

export interface Room {
  id: string;
  name: string;
  subtitle: string;
  photos: { id: string; url: string; alt: string }[];
}

export const rooms: Room[] = [
  {
    id: "living-room-1",
    name: "Living room 1",
    subtitle: "Sofa · Air conditioning · Ceiling fan · TV",
    photos: [
      { id: "lr1-1", url: "/images/lr-1.jpeg", alt: "Living room with rattan furniture and warm lighting" },
      { id: "lr1-2", url: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=80", alt: "Living room seating area with cushions" },
      { id: "lr1-3", url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80", alt: "Living room ottoman and lounge chairs" },
    ],
  },
  {
    id: "living-room-2",
    name: "Living room 2",
    subtitle: "Ceiling fan · Hot tub",
    photos: [
      { id: "lr2-1", url: "/images/lr-2.jpeg", alt: "Second living room with stone accent wall" },
      { id: "lr2-2", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80", alt: "Rooftop jacuzzi deck view" },
      { id: "lr2-3", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", alt: "Building lobby seating" },
      { id: "lr2-4", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", alt: "Building lobby seating" },
      { id: "lr2-5", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", alt: "Building lobby seating" },
      { id: "lr2-6", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", alt: "Building lobby seating" },
      { id: "lr2-7", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80", alt: "Building lobby seating" },
    ],
  },
  {
    id: "full-kitchen",
    name: "Full kitchen",
    subtitle:"Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
    photos: [
      { id: "fk-1", url: "/images/fk.jpeg", alt: "Full kitchen with wooden cabinetry" },
      { id: "fk-2", url: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1600&q=80", alt: "Bedroom with soft ambient lighting" },
      // { id: "fk-3", url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80", alt: "Bedroom closet and mirror" },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    subtitle: "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
    photos: [
      { id: "bd-1", url: "/images/bd.jpeg", alt: "Cozy bedroom with warm natural light" },
      { id: "bd-2", url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=80", alt: "Bedroom nightstand and lamp" },
      { id: "bd-3", url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=80", alt: "Bedroom nightstand and lamp" },
      { id: "bd-4", url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=80", alt: "Bedroom nightstand and lamp" },
      { id: "bd-5", url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=80", alt: "Bedroom nightstand and lamp" },
      { id: "bd-6", url: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1600&q=80", alt: "Bedroom nightstand and lamp" },
    ],
  },
  {
    id: "full-bathroom",
    name: "Full bathroom",
    subtitle: "Hairdryer · Hot water · Shampoo · Shower gel",
    photos: [
      { id: "fb-1", url: "/images/fb.jpeg", alt: "Bathroom with private jacuzzi" },
      // { id: "fb-2", url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1600&q=80", alt: "Bathroom vanity and mirror" },
    ],
  },
  {
    id: "gym",
    name: "Gym",
    subtitle: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
    photos: [
      { id: "gy-1", url: "/images/gym.jpeg", alt: "Building gym with equipment" },
      { id: "gy-2", url: "/images/gym.jpeg", alt: "Building gym with equipment" },
      { id: "gy-3", url: "/images/gym.jpeg", alt: "Building gym with equipment" },
      { id: "gy-4", url: "/images/gym.jpeg", alt: "Building gym with equipment" },
      { id: "gy-5", url: "/images/gym.jpeg", alt: "Building gym with equipment" },
    ],
  },
  {
    id: "exterior",
    name: "Exterior",
    subtitle: "",
    photos: [
      { id: "ex-1", url: "/images/ext.jpeg", alt: "Colorful apartment building exterior" },
      { id: "ex-2", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=80", alt: "Building entrance walkway" },
      { id: "ex-3", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=80", alt: "Building entrance walkway" },
      { id: "ex-4", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=80", alt: "Building entrance walkway" },
      { id: "ex-5", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=80", alt: "Building entrance walkway" },
      { id: "ex-6", url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1600&q=80", alt: "Building entrance walkway" },
    ],
  },
  {
    id: "pool",
    name: "Pool",
    subtitle: "Pool",
    photos: [
      { id: "po-1", url: "/images/pool.jpeg", alt: "Rooftop swimming pool" },
      { id: "po-2", url: "/images/pool.jpeg", alt: "Rooftop swimming pool" },
      { id: "po-3", url: "/images/pool.jpeg", alt: "Rooftop swimming pool" },
    ],
  },
  {
    id: "additional",
    name: "Additional photos",
    subtitle: "",
    photos: [
      { id: "ad-1", url: "/images/ad-1.jpeg", alt: "additinal-pic1" },
      { id: "ad-2", url: "/images/ad-2.jpeg", alt: "additinal-pic2" },
      { id: "ad-3", url: "/images/ad-3.jpeg", alt: "additinal-pic3" },
      { id: "ad-4", url: "/images/ad-3.jpeg", alt: "additinal-pic4" },
      { id: "ad-5", url: "/images/ad-3.jpeg", alt: "additinal-pic5" },
      { id: "ad-6", url: "/images/ad-3.jpeg", alt: "additinal-pic6" },
      { id: "ad-7", url: "/images/ad-3.jpeg", alt: "additinal-pic7" },
      { id: "ad-8", url: "/images/ad-3.jpeg", alt: "additinal-pic8" },
      { id: "ad-9", url: "/images/ad-3.jpeg", alt: "additinal-pic9" },
      { id: "ad-10", url: "/images/ad-3.jpeg", alt: "additinal-pic10" },
    ],
  },
];

// Flattened, ordered list across all rooms — used for hero grid + lightbox navigation
export const photos: RoomPhoto[] = rooms.flatMap((room) =>
  room.photos.map((p) => ({ ...p, roomName: room.name }))
);

export const amenities = [
  { icon: "ChefHat", label: "Kitchen", sub: "", available: true },
  { icon: "Wifi", label: "Wifi", sub: "", available: true },
  { icon: "Laptop", label: "Dedicated workspace", sub: "", available: true },
  { icon: "Car", label: "Free parking on premises", sub: "", available: true },
  { icon: "Waves", label: "Pool", sub: "", available: true },
  { icon: "Droplets", label: "Hot tub", sub: "", available: true },
  { icon: "PawPrint", label: "Pets allowed", sub: "", available: true },
  { icon: "Camera", label: "Exterior security cameras on property", sub: "", available: true },
  { icon: "AlertTriangle", label: "Carbon monoxide alarm", sub: "", available: false },
  { icon: "Siren", label: "Smoke alarm", sub: "", available: false },
];

export const highlights = [
  { icon: "TreePine", title: "Outdoor entertainment", sub: "The pool and alfresco dining are great for summer trips." },
  { icon: "Fan", title: "Designed for staying cool", sub: "Beat the heat with the A/C and ceiling fan." },
  { icon: "DoorClosed", title: "Self check-in", sub: "You can check in with the building staff." },
];

export const ratingCategories = [
  { label: "Overall rating", value: 4.95 },
  { label: "Cleanliness", value: 5.0 },
  { label: "Accuracy", value: 5.0 },
  { label: "Check-in", value: 5.0 },
  { label: "Communication", value: 5.0 },
  { label: "Location", value: 4.8 },
  { label: "Value", value: 4.8 },
];

export const reviewTags = [
  { label: "Comfort", count: 6 },
  { label: "Accuracy", count: 5 },
  { label: "Hot tub", count: 5 },
  { label: "Condition", count: 4 },
  { label: "Hospitality", count: 8 },
  { label: "Cleanliness", count: 4 },
  { label: "Amenities", count: 2 },
];

export const reviews = [
  { id: 1, name: "Amit", timeOnAirbnb: "2 months on Airbnb", when: "1 week ago", rating: 5, text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property." , image : "" },
  { id: 2, name: "Aheesh", timeOnAirbnb: "3 years on Airbnb", when: "2 weeks ago", rating: 5, text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again." , image : "./images/aheesh.jpeg" },
  { id: 3, name: "Samiksha", timeOnAirbnb: "8 months on Airbnb", when: "May 2026", rating: 5, text: "the host nitish was really great help" , image : "./images/sami.jpeg" },
  { id: 4, name: "Vedant", timeOnAirbnb: "4 years on Airbnb", when: "May 2026", rating: 5, text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine." , image : "" },
  { id: 5, name: "Vaibhav S", timeOnAirbnb: "3 years on Airbnb", when: "May 2026", rating: 5, text: "Great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too." , image : "./images/vaibh.jpeg" },
  { id: 6, name: "Mohd", timeOnAirbnb: "5 years on Airbnb", when: "May 2026", rating: 4, text: "Great place. Exactly as described in the listing." , image : "./images/mohd.jpeg" },
];

export const listing = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  propertyType: "Entire serviced apartment in Candolim, India",
  guests: 3,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  location: "Candolim, Goa, India",
  rating: 4.95,
  reviewCount: 19,
  isGuestFavorite: true,
  host: {
    name: "Mirashya Homes",
    isSuperhost: false,
    yearsHosting: 2,
    reviewCount: 1463,
    hostRating: 4.68,
    responseRate: "100%",
    responseTime: "Responds within an hour",
    avatar: "/images/host.jpeg",
  },
  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴",
  nights: 5,
  checkIn: "10/18/2026",
  checkOut: "10/23/2026",
  pricePerNight: 5700,
  currency: "₹",
  totalBeforeTaxes: 28499,
};

export const amenityCategories = [
  {
    category: "Bathroom",
    items: [
      { label: "Hairdryer", icon: "Wind", available: true },
      { label: "Cleaning products", icon: "SprayCan", available: true },
      { label: "Shampoo", icon: "Droplet", available: true },
      { label: "Hot water", icon: "Waves", available: true },
      { label: "Shower gel", icon: "Droplet", available: true },
    ],
  },
  {
    category: "Kitchen",
    items: [
      { label: "Kitchen", icon: "ChefHat", available: true },
      { label: "Refrigerator", icon: "Refrigerator", available: true },
      { label: "Microwave", icon: "Microwave", available: true },
      { label: "Cooking basics", icon: "CookingPot", available: true },
      { label: "Dishes and silverware", icon: "UtensilsCrossed", available: true },
      { label: "Cooker", icon: "CookingPot", available: true },
    ],
  },
  {
    category: "Heating and cooling",
    items: [
      { label: "Air conditioning", icon: "Snowflake", available: true },
      { label: "Ceiling fan", icon: "Fan", available: true },
    ],
  },
  {
    category: "Home safety",
    items: [
      { label: "Exterior security cameras on property", icon: "Camera", available: true },
      { label: "Carbon monoxide alarm", icon: "AlertTriangle", available: false },
      { label: "Smoke alarm", icon: "Siren", available: false },
    ],
  },
  {
    category: "Internet and office",
    items: [
      { label: "Wifi", icon: "Wifi", available: true },
      { label: "Dedicated workspace", icon: "Laptop", available: true },
    ],
  },
  {
    category: "Location features",
    items: [{ label: "Private entrance", icon: "DoorOpen", available: true }],
  },
  {
    category: "Outdoor",
    items: [
      { label: "Patio or balcony", icon: "Trees", available: true },
      { label: "Outdoor dining area", icon: "UtensilsCrossed", available: true },
    ],
  },
  {
    category: "Parking and facilities",
    items: [
      { label: "Free parking on premises", icon: "Car", available: true },
      { label: "Pool", icon: "Waves", available: true },
      { label: "Gym", icon: "Dumbbell", available: true },
      { label: "Hot tub", icon: "Droplets", available: true },
    ],
  },
];

export const nearbyStays = [
  { title: "Beautiful Studio with a view to die for", price: 23600, rating: 4.91, url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80" },
  { title: "NAQAB - 1bhk with private pool", price: 42218, rating: 4.95, url: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80" },
  { title: "Greentique Luxury Flat with plunge pool, Calangute", price: 44506, rating: 4.94, url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { title: "The Tropical Studio | 5 mins to Beach", price: 22824, rating: 4.96, url: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=600&q=80" },
  { title: "Luxury Casa Bella 1BHK with plunge pool, Calangute", price: 39942, rating: 4.95, url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" },
  { title: "Sea Breeze 2BHK near Baga Beach", price: 31200, rating: 4.89, url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" },
  { title: "Cozy Cottage with Garden, Anjuna", price: 27850, rating: 4.92, url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" },
  { title: "Heritage Villa with Private Pool, Assagao", price: 52300, rating: 4.98, url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80" },
];

export const coHosts = [
  { name: "Sharath", avatar: "/images/co1.jpg" },
  { name: "Aman Dev Pahwa", avatar: "/images/co2.jpg" },
  { name: "Maria Karen Priyanka", avatar: "/images/co3.jpg" },
  { name: "Simran", avatar: "/images/rev5.jpeg" },
  { name: "Pallavi", avatar: "/images/rev1.jpeg" },
  { name: "Sanyukta", avatar: "/images/rev2.jpeg" },
  { name: "Shruti", avatar: "", initial: "S", bg: "bg-pink-200 text-pink-800" },
  { name: "Amisha", avatar: "", initial: "A", bg: "bg-blue-200 text-blue-800" },
];

export const hostFacts = [
  { icon: "Lightbulb", text: "Born in the 80s" },
  { icon: "GraduationCap", text: "Where I went to school: NICMAR GOA" },
];