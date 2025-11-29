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

export type Auth_Signup_2_props = {
  apartment: string;
  apartmentouched: boolean;
  city: string;
  cityTouched: boolean;
  country: string;
  countryTouched: boolean;
  zip: string;
  zipTouched: boolean;
  phoneNumber: string;
  phnoeNumberTouched: boolean;
  streetAddressTouched: boolean;
  streetAddress: string;
  setcountryTouched: (value: boolean) => void;
  setcityTouched: (value: boolean) => void;
  setApartmentTouched: (value: boolean) => void;
  setZipTouched: (value: boolean) => void;
  setPhoneNumberTouched: (value: boolean) => void;
  setstreetAddressTouched: (value: boolean) => void;
  setCountry: (value: string) => void;
  setCity: (value: string) => void;
  setApartment: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setZip: (value: string) => void;
  setStreetAddress: (value: string) => void;
};

export type CustomInput_props = {
  value: string;
  setValue: (value: string) => void;
  valueTouched: boolean;
  setValueTouched: (value: boolean) => void;
};
