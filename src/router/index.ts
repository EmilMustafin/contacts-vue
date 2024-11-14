import { createRouter, createWebHistory } from 'vue-router';
import HomeViews from '@/views/HomeViews.vue';

const routes = [{ path: '/', component: HomeViews }];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
