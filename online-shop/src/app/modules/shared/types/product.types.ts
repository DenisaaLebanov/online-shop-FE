export type ProductDetails = {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  imageUrl: string;
  productCategoryDto: {
    categoryId: string;
    categoryName: string;
    productDescription: string;
  };
};
