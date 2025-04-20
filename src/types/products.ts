export interface ProductInterface {
  id: number;
  title?: string;
  category?: string;
  date?: Date | string | null; 
  price?: number;
  description?: string;
  stock?: number;
  rating?: number;
}
