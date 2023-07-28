import { ProductDetails } from '../types/product.types';

export function getProductDetailsMock(
  name: string = 'product1'
): ProductDetails {
  return {
    name: name,
    category: 'category1',
    price: 10,
    description: 'description1',
  };
}

export function getAllProductsDetailsMock(
  numberOfProducts: number
): ProductDetails[] {
  const products = [];
  for (let index = 0; index < numberOfProducts; index++)
    products.push(getProductDetailsMock(`product${index}`));

  return products;
}
