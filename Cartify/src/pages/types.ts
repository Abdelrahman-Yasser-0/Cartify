export type products = {
  id?: string;
  title: string;
  brand: string;
  rate: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imgurl: string;
  sku?: string;
  category?: string;
  colors?: string[];
  description?: string;
  specifications?: { [key: string]: string };
  reviews?: Array<{
    author: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  inStock?: boolean;
  shortDescription?: string;
};
