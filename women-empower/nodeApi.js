const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Define product type structure

const products = [
  {
    id: 1,
    title: "Handcrafted Wooden Bowl",
    description: "Beautifully carved wooden bowl perfect for dining or décor.",
    netPrice: 1200,
    offerPrice: 950,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Artisan Ceramic Vase",
    description: "Elegant ceramic vase designed by local artists.",
    netPrice: 1800,
    offerPrice: 1500,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: true,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Organic Cotton Cushion Cover",
    description: "Eco-friendly cotton cushion cover with handmade prints.",
    netPrice: 500,
    offerPrice: 400,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: false,
    rating: 4.2,
  },
  {
    id: 4,
    title: "Bamboo Cutting Board",
    description: "Durable bamboo board, ideal for chopping and serving.",
    netPrice: 700,
    offerPrice: 550,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.4,
  },
  {
    id: 5,
    title: "Handwoven Jute Rug",
    description: "Natural jute rug for eco-friendly living spaces.",
    netPrice: 2500,
    offerPrice: 2000,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: true,
    rating: 4.6,
  },
  {
    id: 6,
    title: "Decorative Wall Mirror",
    description: "Antique-style mirror with handcrafted wooden frame.",
    netPrice: 3200,
    offerPrice: 2800,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: false,
    rating: 4.7,
  },
  {
    id: 7,
    title: "Terracotta Tea Set",
    description: "Rustic handcrafted terracotta tea set for six.",
    netPrice: 2200,
    offerPrice: 1800,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.3,
  },
  {
    id: 8,
    title: "Woolen Hand-Knitted Blanket",
    description: "Cozy and warm woolen blanket, hand-knitted with love.",
    netPrice: 3500,
    offerPrice: 2999,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: true,
    rating: 4.9,
  },
  {
    id: 9,
    title: "Macrame Wall Hanging",
    description: "Bohemian-style macrame décor for modern walls.",
    netPrice: 1600,
    offerPrice: 1350,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: true,
    rating: 4.4,
  },
  {
    id: 10,
    title: "Clay Cooking Pot",
    description: "Traditional clay pot to enhance natural flavors in cooking.",
    netPrice: 900,
    offerPrice: 750,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.1,
  },
  {
    id: 11,
    title: "Hand-Painted Coasters",
    description: "Set of 6 wooden coasters with colorful hand painting.",
    netPrice: 600,
    offerPrice: 480,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: false,
    rating: 4.2,
  },
  {
    id: 12,
    title: "Embroidered Table Runner",
    description: "Traditional embroidered runner to enhance your dining table.",
    netPrice: 1400,
    offerPrice: 1150,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: true,
    rating: 4.5,
  },
  {
    id: 13,
    title: "Wooden Jewelry Box",
    description: "Intricately carved jewelry box for precious items.",
    netPrice: 2100,
    offerPrice: 1750,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: true,
    rating: 4.7,
  },
  {
    id: 14,
    title: "Recycled Glass Lamp",
    description: "Eco-friendly lamp made from recycled glass bottles.",
    netPrice: 2800,
    offerPrice: 2400,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: false,
    rating: 4.6,
  },
  {
    id: 15,
    title: "Handcrafted Wooden Spoon Set",
    description: "Set of 5 wooden spoons, perfect for daily kitchen use.",
    netPrice: 750,
    offerPrice: 600,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.3,
  },
];

const wishlist = [
  {
    id: 1,
    title: "Handcrafted Wooden Bowl",
    description: "Beautifully carved wooden bowl perfect for dining or décor.",
    netPrice: 1200,
    offerPrice: 950,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Artisan Ceramic Vase",
    description: "Elegant ceramic vase designed by local artists.",
    netPrice: 1800,
    offerPrice: 1500,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: true,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Organic Cotton Cushion Cover",
    description: "Eco-friendly cotton cushion cover with handmade prints.",
    netPrice: 500,
    offerPrice: 400,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: false,
    rating: 4.2,
  },
  {
    id: 4,
    title: "Bamboo Cutting Board",
    description: "Durable bamboo board, ideal for chopping and serving.",
    netPrice: 700,
    offerPrice: 550,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.4,
  },
  {
    id: 5,
    title: "Handwoven Jute Rug",
    description: "Natural jute rug for eco-friendly living spaces.",
    netPrice: 2500,
    offerPrice: 2000,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: true,
    rating: 4.6,
  },
  {
    id: 6,
    title: "Decorative Wall Mirror",
    description: "Antique-style mirror with handcrafted wooden frame.",
    netPrice: 3200,
    offerPrice: 2800,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: false,
    rating: 4.7,
  },
  {
    id: 7,
    title: "Terracotta Tea Set",
    description: "Rustic handcrafted terracotta tea set for six.",
    netPrice: 2200,
    offerPrice: 1800,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.3,
  },
  
];

const bestProducts = [
  {
    id: 1,
    title: "Handcrafted Wooden Bowl",
    description: "Beautifully carved wooden bowl perfect for dining or décor.",
    netPrice: 1200,
    offerPrice: 950,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Home & Kitchen",
    stock: true,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Artisan Ceramic Vase",
    description: "Elegant ceramic vase designed by local artists.",
    netPrice: 1800,
    offerPrice: 1500,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Decor",
    stock: true,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Organic Cotton Cushion Cover",
    description: "Eco-friendly cotton cushion cover with handmade prints.",
    netPrice: 500,
    offerPrice: 400,
    currency: "INR",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Standing_white_tiger.jpg",
    category: "Textiles",
    stock: false,
    rating: 4.2,
  },
];
const categories = [
  "Rangoli",
  "Spiritual",
  "Resin",
  "Shubh Labh",
  "Lapdesk",
  "Diya & Thali",
  "Decor",
  "Gift"
];

const allArtists = [
  {
    id: 1,
    name: "Priya Sharma",
    description: "Expert in traditional rangoli designs with 8+ years experience",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    image: "/images/man1.jpg",
    category: "Rangoli",
    rating: 4.8,
    experience: "8 years",
    speciality: "Traditional & Modern Rangoli",
    completedWorks: 150,
    topRated: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    description: "Spiritual art specialist creating beautiful Buddha paintings",
    phone: "+91 87654 32109",
    location: "Delhi, NCR",
    image: "/images/man1.jpg",
    category: "Spiritual",
    rating: 4.9,
    experience: "12 years",
    speciality: "Buddha & Religious Art",
    completedWorks: 200,
    topRated: true
  },
  {
    id: 3,
    name: "Anita Verma",
    description: "Creative resin artist making customized epoxy resin art pieces",
    phone: "+91 99876 54321",
    location: "Bangalore, Karnataka",
    image: "/images/man1.jpg",
    category: "Resin",
    rating: 4.7,
    experience: "6 years",
    speciality: "Resin Coasters & Wall Art",
    completedWorks: 120,
    topRated: false
  },
  {
    id: 4,
    name: "Suresh Gupta",
    description: "Designer of decorative Shubh Labh door hangings",
    phone: "+91 91234 56789",
    location: "Jaipur, Rajasthan",
    image: "/images/man1.jpg",
    category: "Shubh Labh",
    rating: 4.6,
    experience: "9 years",
    speciality: "Handmade Torans & Shubh Labh Hangings",
    completedWorks: 180,
    topRated: true
  },
  {
    id: 5,
    name: "Neha Patel",
    description: "Lapdesk product designer with ergonomic solutions",
    phone: "+91 93456 78901",
    location: "Ahmedabad, Gujarat",
    image: "/images/man1.jpg",
    category: "Lapdesk",
    rating: 4.5,
    experience: "5 years",
    speciality: "Customized Wooden Lapdesks",
    completedWorks: 90,
    topRated: false
  }
  // continue for the rest...
];
 const eventsData = [
  {
    id: '1',
    title: 'Diwali Rangoli Workshop',
    description: 'Learn traditional rangoli patterns and modern designs for Diwali celebrations',
    date: '2025-10-25',
    time: '10:00 AM - 2:00 PM',
    location: 'Mumbai Community Center',
    type: 'workshop',
    category: 'Rangoli',
    maxParticipants: 30,
    currentParticipants: 18,
    image: '/images/traditional.png',
    featured: true,
    tags: ['Diwali', 'Traditional', 'Colors'],
    status: 'upcoming',
    rating: 4.8,
    discount: '15% OFF',
  },
  {
    id: '2',
    title: 'Ganesh Chaturthi Idol Workshop',
    description: 'Eco-friendly clay idol making with step by step guidance',
    date: '2025-09-01',
    time: '11:00 AM - 3:00 PM',
    location: 'Pune Art Studio',
    type: 'workshop',
    category: 'Spiritual',
    maxParticipants: 25,
    currentParticipants: 20,
    image: '/images/traditional.png',
    featured: true,
    tags: ['Ganesh', 'Eco-friendly', 'Clay'],
    status: 'upcoming',
    rating: 4.7,
    discount: '10% OFF',
  },
  {
    id: '3',
    title: 'Christmas Wreath Making',
    description: 'Craft beautiful wreaths with natural and decorative materials',
    date: '2025-12-15',
    time: '2:00 PM - 6:00 PM',
    location: 'Delhi Craft Hub',
    type: 'craft-session',
    category: 'Decor',
    maxParticipants: 20,
    currentParticipants: 12,
    image: '/images/traditional.png',
    featured: false,
    tags: ['Christmas', 'Decor', 'Handmade'],
    status: 'upcoming',
    rating: 4.5,
  },
  {
    id: '4',
    title: 'Raksha Bandhan Thali Decoration',
    description: 'Decorate Rakhi pooja thalis with beads, mirrors and flowers',
    date: '2025-08-10',
    time: '4:00 PM - 7:00 PM',
    location: 'Ahmedabad Cultural Hall',
    type: 'workshop',
    category: 'Diya & Thali',
    maxParticipants: 40,
    currentParticipants: 28,
    image: '/images/traditional.png',
    featured: false,
    tags: ['Raksha Bandhan', 'Thali', 'Craft'],
    status: 'completed',
    rating: 4.2,
  },
  {
    id: '5',
    title: 'Navratri Garba Night',
    description: 'Celebrate Navratri with dance, music and festive vibes',
    date: '2025-10-05',
    time: '7:00 PM - 11:00 PM',
    location: 'Vadodara Stadium',
    type: 'celebration',
    category: 'Decor',
    maxParticipants: 500,
    currentParticipants: 430,
    image: '/images/traditional.png',
    featured: true,
    tags: ['Navratri', 'Garba', 'Festival'],
    status: 'ongoing',
    rating: 4.9,
    discount: '20% OFF',
  },
  {
    id: '6',
    title: 'Makar Sankranti Kite Flying',
    description: 'Kite flying competition and family activities',
    date: '2025-01-14',
    time: '9:00 AM - 5:00 PM',
    location: 'Ahmedabad Riverfront',
    type: 'festival',
    category: 'Decor',
    maxParticipants: 200,
    currentParticipants: 200,
    image: '/images/traditional.png',
    featured: false,
    tags: ['Kite', 'Festival', 'Makar Sankranti'],
    status: 'completed',
    rating: 4.6,
  },
  {
    id: '7',
    title: 'Karwa Chauth Thali Decoration',
    description: 'Special decoration ideas for Karwa Chauth pooja thalis',
    date: '2025-10-20',
    time: '5:00 PM - 8:00 PM',
    location: 'Jaipur Women Center',
    type: 'workshop',
    category: 'Diya & Thali',
    maxParticipants: 35,
    currentParticipants: 15,
    image: '/images/traditional.png',
    featured: false,
    tags: ['Karwa Chauth', 'Tradition', 'Decor'],
    status: 'upcoming',
    rating: 4.4,
  },
  {
    id: '8',
    title: 'Holi Organic Colors Workshop',
    description: 'Make your own organic colors for a safe and eco-friendly Holi',
    date: '2025-03-20',
    time: '10:00 AM - 1:00 PM',
    location: 'Lucknow Eco Center',
    type: 'workshop',
    category: 'Rangoli',
    maxParticipants: 50,
    currentParticipants: 37,
    image: '/images/traditional.png',
    featured: true,
    tags: ['Holi', 'Organic', 'Colors'],
    status: 'completed',
    rating: 4.8,
    discount: '5% OFF',
  },
  {
    id: '9',
    title: 'Valentine Resin Art',
    description: 'Create resin art pieces as gifts for your loved ones',
    date: '2025-02-12',
    time: '12:00 PM - 4:00 PM',
    location: 'Chandigarh Art School',
    type: 'workshop',
    category: 'Resin',
    maxParticipants: 25,
    currentParticipants: 20,
    image: '/images/traditional.png',
    featured: false,
    tags: ['Valentine', 'Art', 'Gift'],
    status: 'completed',
    rating: 4.3,
  },
  {
    id: '10',
    title: 'Independence Day Celebration',
    description: 'Flag hoisting, cultural performances and patriotic songs',
    date: '2025-08-15',
    time: '9:00 AM - 12:00 PM',
    location: 'Delhi Red Fort',
    type: 'celebration',
    category: 'Decor',
    maxParticipants: 1000,
    currentParticipants: 950,
    image: '/images/traditional.png',
    featured: true,
    tags: ['Independence', 'Patriotism', 'Cultural'],
    status: 'upcoming',
    rating: 5.0,
  },
  {
    id: '11',
    title: 'Eid Special Sweet Making',
    description: 'Learn to cook Sheer Khurma and other Eid sweets',
    date: '2025-04-10',
    time: '3:00 PM - 7:00 PM',
    location: 'Hyderabad Food Studio',
    type: 'workshop',
    category: 'Gift',
    maxParticipants: 30,
    currentParticipants: 28,
    image: '/images/eid.png',
    featured: false,
    tags: ['Eid', 'Cooking', 'Sweet'],
    status: 'completed',
    rating: 4.7,
  },
  {
    id: '12',
    title: 'Janmashtami Matki Decoration',
    description: 'Decorate matkis with paint, glitter and embellishments',
    date: '2025-08-16',
    time: '2:00 PM - 6:00 PM',
    location: 'Mathura Temple Hall',
    type: 'craft-session',
    category: 'Decor',
    maxParticipants: 40,
    currentParticipants: 30,
    image: '/images/janmashtami.png',
    featured: false,
    tags: ['Janmashtami', 'Matki', 'Decor'],
    status: 'upcoming',
    rating: 4.6,
    discount: '10% OFF',
  },
  {
    id: '13',
    title: 'Onam Pookalam Contest',
    description: 'Flower carpet making competition for Onam',
    date: '2025-09-10',
    time: '9:00 AM - 2:00 PM',
    location: 'Kochi Community Park',
    type: 'festival',
    category: 'Decor',
    maxParticipants: 100,
    currentParticipants: 85,
    image: '/images/onam.png',
    featured: false,
    tags: ['Onam', 'Flowers', 'Pookalam'],
    status: 'ongoing',
    rating: 4.5,
  },
  {
    id: '14',
    title: 'Lohri Bonfire Night',
    description: 'Celebrate Lohri with bonfire, songs and dance',
    date: '2025-01-13',
    time: '7:00 PM - 11:00 PM',
    location: 'Punjab Village Resort',
    type: 'celebration',
    category: 'Decor',
    maxParticipants: 300,
    currentParticipants: 270,
    image: '/images/lohri.png',
    featured: false,
    tags: ['Lohri', 'Bonfire', 'Dance'],
    status: 'completed',
    rating: 4.4,
  },
  {
    id: '15',
    title: 'Gudi Padwa Celebration',
    description: 'Maharashtrian New Year festival with traditional performances',
    date: '2025-03-30',
    time: '8:00 AM - 1:00 PM',
    location: 'Mumbai Grounds',
    type: 'festival',
    category: 'Spiritual',
    maxParticipants: 400,
    currentParticipants: 390,
    image: '/images/gudi.png',
    featured: true,
    tags: ['Gudi Padwa', 'Tradition', 'Festival'],
    status: 'completed',
    rating: 4.9,
  },
  {
    id: '16',
    title: 'Shubh Labh Toran Making',
    description: 'Create decorative torans with beads and fabric for Diwali',
    date: '2025-10-18',
    time: '11:00 AM - 2:00 PM',
    location: 'Surat Craft Studio',
    type: 'craft-session',
    category: 'Shubh Labh',
    maxParticipants: 30,
    currentParticipants: 22,
    image: '/images/toran.png',
    featured: false,
    tags: ['Diwali', 'Decor', 'Craft'],
    status: 'upcoming',
    rating: 4.6,
  },
];

const cartItems = [
 
   {
    id: 1,
    name: "Handcrafted Wooden Bowl",
    price: 1200,
    offerPrice: 950,
 quantity: 1,
  category: "Home & Kitchen",
  },
  {
    id: 2,
    name: "Artisan Ceramic Vase",
    price: 1800,
    offerPrice: 1500,
    quantity: 2,
       image: "/images/art1.jpg",
        category: "Decor",
  },
     
];
// API route
app.get("/api/products", (req, res) => {
console.log('called')
   const search = req.query.search?.toLowerCase() || "";

  if (search) {
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search) 
       
    );
    return res.json(filtered);
  }

  res.json(products);
});
app.get("/api/best-products", (req, res) => {
  res.json(bestProducts);
});
app.get("/api/trending-products", (req, res) => {
  res.json(bestProducts);
});

app.get("/api/artist", (req, res) => {
  res.json(allArtists);
  
});
app.get("/api/top-artist", (req, res) => {
  res.json(allArtists);
  
});
app.get("/api/events", (req, res) => {
  res.json(eventsData);
  
});
app.get("/api/events", (req, res) => {
  res.json(eventsData);
  
});

app.get("/api/featured-events", (req, res) => {
   const featuredEvents = eventsData.filter(
    (e) => e.featured && e.status !== "completed"
  );
  res.json(featuredEvents);
  
});

app.get("/api/popular-course", (req, res) => {
  res.json(products);
});
app.get("/api/category", (req, res) => {
  res.json( categories);
});


app.get("/api/cart", (req, res) => {
  res.json(cartItems);
});

app.get("/api/wishlist", (req, res) => {
  res.json(wishlist);
});



// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
