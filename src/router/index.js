import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import LoginView from '../views/LoginView.vue';
import UserView from '../views/user/UserView.vue';
import UserProducts from '../views/user/UserProducts.vue';
import UserEdit from '../views/user/UserEdit.vue';
import UserPurchase from '../views/user/UserPurchase.vue';
import UserSales from '../views/user/UserSales.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/produto/:id',
    name: 'product',
    component: ProductView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/usuario',
    component: UserView,
    children: [
      {
        path: '',
        name: 'user',
        component: UserProducts,
      },

      {
        path: 'compras',
        name: 'purchases',
        component: UserPurchase,
      },
      {
        path: 'vendas',
        name: 'sales',
        component: UserSales,
      },
      {
        path: 'editar',
        name: 'user-edit',
        component: UserEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;
