import { Package } from './types';

export const DOMESTIC_PACKAGES: Package[] = [
  // ADVENTURE PACKAGES
  {
    id: 'leh-bike',
    title: 'Leh Ladakh Bike Expedition',
    description: 'The ultimate bucket-list journey through the highest motorable passes. Ride from Srinagar to Leh, exploring Kargil, Nubra Valley, and the stunning Pangong Lake.',
    price: 32000,
    duration: '10 Days / 9 Nights',
    destinations: ['Srinagar', 'Kargil', 'Leh', 'Nubra Valley', 'Pangong Lake'],
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-99f9d4c11b11?auto=format&fit=crop&w=1200&q=100',
    isBudget: false,
    rating: 5.0,
    category: 'adventure',
    highlights: ['Bike Riding', 'Camping', 'Highest Passes', 'Magnetic Hill'],
    bestTimeToVisit: 'June to September',
    thingsToDo: ['Off-road Biking', 'Lakeside Camping', 'Monastery Visits'],
    localCuisine: ['Thukpa', 'Mokthuk', 'Skyu']
  },
  {
    id: 'man-adv',
    title: 'Thrilling Himachal Expedition',
    description: 'Experience the adrenaline of Manali, Solang Valley, Kasol, and Tosh. Perfect for young travelers and adventure enthusiasts looking for mountain vibes.',
    price: 12500,
    duration: '6 Days / 5 Nights',
    destinations: ['Manali', 'Solang Valley', 'Kasol', 'Tosh'],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=100',
    isBudget: true,
    rating: 4.8,
    category: 'adventure',
    highlights: ['Paragliding', 'Trekking', 'River Rafting', 'Riverside Camping'],
    bestTimeToVisit: 'April to June & October to February',
    thingsToDo: ['Solang Paragliding', 'Tosh Trek', 'Kasol Cafe Hopping'],
    localCuisine: ['Siddu', 'Babru', 'Kasol Street Food']
  },
  {
    id: 'ris-adv',
    title: 'Rishikesh Adventure Escape',
    description: 'The ultimate river rafting and camping retreat. Face the mighty Ganga rapids and find your calm with evening aartis and yoga.',
    price: 6500,
    duration: '3 Days / 2 Nights',
    destinations: ['Rishikesh', 'Shivpuri'],
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-23a9d7cd991e?auto=format&fit=crop&w=1200&q=100',
    isBudget: true,
    rating: 4.7,
    category: 'adventure',
    highlights: ['River Rafting', 'Bungee Jumping', 'Zipline', 'Cliff Jumping'],
    bestTimeToVisit: 'March to May & September to November',
    thingsToDo: ['White Water Rafting', 'Bungee from 83m', 'Riverside Camping'],
    localCuisine: ['Aloo Puri', 'Chotiwala Special', 'Masala Chai']
  },
  {
    id: 'kas-adv',
    title: 'Snow & Adventure Kashmir Tour',
    description: 'Paradise for adventure seekers. Skiing in Gulmarg, trekking in Sonmarg, and beautiful meadow walks in Pahalgam.',
    price: 21000,
    duration: '6 Days / 5 Nights',
    destinations: ['Srinagar', 'Gulmarg', 'Sonmarg', 'Pahalgam'],
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=100',
    isBudget: false,
    rating: 4.9,
    category: 'adventure',
    highlights: ['Gondola Rides', 'Trekking', 'Skiing', 'Snow Activities'],
    bestTimeToVisit: 'December to March (for Snow Games)',
    thingsToDo: ['Gulmarg Skiing', 'Sonmarg Glacier Trek', 'Aru Valley Walk'],
    localCuisine: ['Wazwan', 'Kashmiri Pulao', 'Kahwa']
  },
  {
    id: 'spi-adv',
    title: 'Extreme Spiti Valley Journey',
    description: 'A rugged road trip through the world\'s most treacherous roads. Visit ancient monasteries and stay in the highest villages in the world.',
    price: 26000,
    duration: '9 Days / 8 Nights',
    destinations: ['Shimla', 'Kaza', 'Chandratal', 'Manali'],
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=100',
    isBudget: false,
    rating: 4.9,
    category: 'adventure',
    highlights: ['Off-road Adventure', 'High Altitude Camping', 'Monastery Visits', 'Stargazing'],
    bestTimeToVisit: 'June to September',
    thingsToDo: ['Kee Monastery Visit', 'Chandratal Camping', 'Kunzum Pass Drive'],
    localCuisine: ['Tibetan Butter Tea', 'Spiti Sea Buckthorn Juice']
  },

  // FAMILY PACKAGES
  {
    id: 'kas-fam',
    title: 'Kashmir Family Paradise',
    description: 'A magical family vacation. Enjoy houseboat stays, Shikara rides on Dal Lake, and scenic picnics in Gulmarg gardens.',
    price: 19500,
    duration: '5 Days / 4 Nights',
    destinations: ['Srinagar', 'Gulmarg', 'Pahalgam'],
    imageUrl: 'https://images.unsplash.com/photo-1566833925227-ded430635422?auto=format&fit=crop&w=1200&q=100',
    isBudget: false,
    rating: 4.8,
    category: 'family',
    highlights: ['Houseboat Stay', 'Shikara Ride', 'Saffron Farm Visit', 'Family Picnics'],
    bestTimeToVisit: 'April to June',
    thingsToDo: ['Dal Lake Boating', 'Gondola Ride', 'Betaab Valley Sightseeing'],
    localCuisine: ['Kashmiri Rajma', 'Dum Aloo', 'Phirni']
  },
  {
    id: 'ker-fam',
    title: 'Kerala Family Backwaters',
    description: 'Relax in the serene backwaters of Alleppey on a private houseboat and explore the tea-covered hills of Munnar.',
    price: 16800,
    duration: '6 Days / 5 Nights',
    destinations: ['Munnar', 'Alleppey', 'Thekkady'],
    imageUrl: 'https://images.unsplash.com/photo-1602216058441-99945a908480?auto=format&fit=crop&w=1200&q=100',
    isBudget: false,
    rating: 4.9,
    category: 'family',
    highlights: ['Houseboat Experience', 'Tea Garden Walks', 'Elephant Safari', 'Kathakali Show'],
    bestTimeToVisit: 'September to March',
    thingsToDo: ['Backwater Cruise', 'Periyar Wildlife Safari', 'Tea Museum Visit'],
    localCuisine: ['Appam with Stew', 'Banana Fritters', 'Kerala Sadhya']
  },
  {
    id: 'raj-fam',
    title: 'Rajasthan Royal Heritage',
    description: 'Discover the grand forts of Jaipur, the romantic lakes of Udaipur, and the golden sands of Jaisalmer with your family.',
    price: 24500,
    duration: '8 Days / 7 Nights',
    destinations: ['Jaipur', 'Udaipur', 'Jaisalmer'],
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=100',
    isBudget: false,
    rating: 4.8,
    category: 'family',
    highlights: ['Desert Safari', 'Fort Light & Sound Show', 'Cultural Dances', 'Lake Boating'],
    bestTimeToVisit: 'November to February',
    thingsToDo: ['Amer Fort Elephant Ride', 'Jaisalmer Desert Camping', 'City Palace Visit'],
    localCuisine: ['Dal Baati Churma', 'Ghevar', 'Ker Sangri']
  },

  // BUDGET PACKAGES
  {
    id: 'jai-bud',
    title: 'Weekend Jaipur Tour',
    description: 'A quick budget-friendly getaway to the Pink City. Explore major heritage sites and shop at traditional bazaars.',
    price: 4999,
    duration: '2 Days / 1 Night',
    destinations: ['Jaipur'],
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=100',
    isBudget: true,
    rating: 4.6,
    category: 'budget',
    highlights: ['Hawa Mahal Visit', 'Johari Bazaar Shopping', 'Budget Stays', 'Local Street Food'],
    bestTimeToVisit: 'October to March',
    thingsToDo: ['Exploring Forts', 'Night Photography at Hawa Mahal', 'Shopping'],
    localCuisine: ['Rawat ki Pyaaz Kachori', 'Lassi at Lassiwala']
  },
  {
    id: 'thai-bud',
    title: 'Thailand Under Budget',
    description: 'Our special international budget deal. Experience the vibrant life of Bangkok and the beautiful beaches of Pattaya at unbelievable prices.',
    price: 29999,
    duration: '5 Days / 4 Nights',
    destinations: ['Bangkok', 'Pattaya'],
    imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=100',
    isBudget: true,
    rating: 4.7,
    category: 'budget',
    highlights: ['Coral Island Tour', 'Floating Markets', 'Temples of Bangkok', 'Street Life'],
    bestTimeToVisit: 'November to February',
    thingsToDo: ['Island Hopping', 'Thai Massage', 'Street Food Tour'],
    localCuisine: ['Pad Thai', 'Mango Sticky Rice', 'Tom Yum Soup']
  },
  {
    id: 'goa-bud',
    title: 'Goa Backpacker Package',
    description: 'Vibrant beaches, night markets, and fun scooty rides. The best of North Goa designed specifically for student and budget groups.',
    price: 7999,
    duration: '4 Days / 3 Nights',
    destinations: ['Anjuna', 'Baga', 'Vagator'],
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=100',
    isBudget: true,
    rating: 4.5,
    category: 'budget',
    highlights: ['Beach Shacks', 'Night Markets', 'Scooter Rental Included', 'Hostel Stays'],
    bestTimeToVisit: 'November to February',
    thingsToDo: ['Cafe Hopping', 'Beach Volleyball', 'Dancing at Shacks'],
    localCuisine: ['Goan Fish Thali', 'Feni', 'Ros Omelette']
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: '10 Ways to Eat Like a Local for Under $5',
    excerpt: 'Discover the hidden street food gems in Mumbai that the guidebooks don\'t tell you about...',
    author: 'Ravi Verma',
    date: 'March 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Backpacking Through Himachal: A 7-Day Guide',
    excerpt: 'How to see the best of the Himalayas on a shoestring budget. Routes, stays, and more.',
    author: 'Rahul Sharma',
    date: 'April 2, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Offbeat Kerala: Beyond the Backwaters',
    excerpt: 'Exploring the hidden waterfalls and spice plantations of Wayanad.',
    author: 'Priya Iyer',
    date: 'May 10, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80'
  }
];
