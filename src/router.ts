import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import Product from './pages/Product.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false } // Разрешаем доступ всем пользователям
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresAuth: false } // Разрешаем доступ всем пользователям
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: false } // Разрешаем доступ всем пользователям
  },
  {
    path: '/Product',
    name: 'Product',
    component: Product,
    meta: { requiresAuth: false } // Разрешаем доступ всем пользователям
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});


router.beforeEach((to, _, next) => {
  const role = localStorage.getItem('role');
  // Проверяем требуется ли аутентификация для доступа к маршруту
  if (to.meta.requiresAuth && role !== 'auth') {
    // Если требуется аутентификация и пользователь не авторизован,
    // перенаправляем на страницу входа
    next('/');
  } else {
    // В противном случае, разрешаем доступ
    next();
  }
});

export default router;

