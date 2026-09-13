export type FoodCategory =
  | "Meals"
  | "Snacks"
  | "Beverages"
  | "Desserts";

export interface MockFoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: FoodCategory;
  available: boolean;
  isSpecial?: boolean;
}

export const categories: Array<"All" | FoodCategory> = [
  "All",
  "Meals",
  "Snacks",
  "Beverages",
  "Desserts",
];

export const mockMenu: MockFoodItem[] = [
  {
    id: "paneer-roll",
    name: "Paneer Roll",
    description: "Soft paratha with spiced paneer, onions and mint chutney.",
    price: 60,
    image: "https://images.archanaskitchen.com/images/recipes/snack-recipes/roll-recipes-wraps-frankies/Paneer_Tikka_Kathi_Roll_Recipe_video_2_7087c91b21.jpg",
    category: "Snacks",
    available: true,
    isSpecial: true,
  },
  {
    id: "chicken-burger",
    name: "Chicken Burger",
    description: "Crispy chicken patty with lettuce, tomato and house sauce.",
    price: 90,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    category: "Meals",
    available: true,
  },
  {
    id: "masala-dosa",
    name: "Masala Dosa",
    description: "Crisp dosa filled with seasoned potato, served with chutney.",
    price: 70,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=85",
    category: "Meals",
    available: true,
  },
  {
    id: "samosa",
    name: "Samosa",
    description: "Crisp pastry filled with spiced potato and peas.",
    price: 20,
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85",
    category: "Snacks",
    available: true,
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    description: "Chilled, creamy coffee finished with a light foam.",
    price: 50,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
    category: "Beverages",
    available: true,
  },
  {
    id: "veg-sandwich",
    name: "Veg Sandwich",
    description: "Toasted bread layered with fresh vegetables and cheese.",
    price: 55,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85",
    category: "Snacks",
    available: true,
  },
  {
    id: "french-fries",
    name: "French Fries",
    description: "Golden, crisp fries with a lightly seasoned finish.",
    price: 60,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
    category: "Snacks",
    available: false,
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    description: "Soft milk-solid dumplings soaked in fragrant sugar syrup.",
    price: 35,
    image: "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=1200&q=85",
    category: "Desserts",
    available: true,
  },
];
