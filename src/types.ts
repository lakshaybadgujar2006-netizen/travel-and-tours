export interface Package {
  id?: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  destinations: string[];
  imageUrl: string;
  isBudget: boolean;
  rating: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  highlights?: string[];
  category?: 'adventure' | 'family' | 'budget' | 'trending';
  bestTimeToVisit?: string;
  thingsToDo?: string[];
  localCuisine?: string[];
}

export interface Booking {
  id?: string;
  packageId: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  travelDates: {
    start: string;
    end: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

export interface Review {
  id?: string;
  userName: string;
  rating: number;
  comment: string;
  packageId?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  excerpt?: string;
  content?: string;
  author: string;
  date?: string;
  imageUrl: string;
  publishedAt?: string;
}
