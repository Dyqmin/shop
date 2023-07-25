import { injectProductDetailsFeature, injectProductsFeature } from "@shop-project/shop/client/products/data-access";
import { ResolveFn } from "@angular/router";

export const resolveProducts: ResolveFn<void> = () => {
  const productsFeature = injectProductsFeature();
  productsFeature.init();
};

export const productDetailResolver: ResolveFn<void> = (route) => {
  const productsFeature = injectProductDetailsFeature();
  productsFeature.fetchProduct(+route.paramMap.get('productId')!);
};
