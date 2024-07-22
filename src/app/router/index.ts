import CategoriesProductsPage from "@/pages/CategoriesProductsPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ProductInfo from "@/pages/ProductInfo.vue";
import ShoppingCart from "@/pages/ShoppingCart.vue";
import CategoriesModule from "@/shared/ui/CategoriesModule.vue";
import ProductsModule from "@/shared/ui/ProductsModule.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Categories & products",
      component: CategoriesProductsPage,
      redirect: "/categories",
      children: [
        {
          path: "/categories",
          name: "categories",
          component: CategoriesModule,
        },
        {
          path: "/products",
          name: "products",
          component: ProductsModule,
        },
      ],
    },
    {
      path: "/product/:prod_id",
      component: ProductInfo,
    },
    { path: "/cart", component: ShoppingCart },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
    },
  ],
});

export default router;
