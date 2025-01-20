import { createRouter, createWebHistory } from 'vue-router';
import { isAuth } from "@/api";
const checkAuth = (to, from, next) => {
    if (!localStorage.getItem('token')) {
        next({ name: 'login' });
    }
    else {
        isAuth().then(() => next())
            .catch(() => next({ name: 'login' }));
    }
};
const routes = [
    {
        path: '/',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "about" */ '../views/Welcome.vue')
    },
    {
        path: '/invitation',
        name: 'Invitation',
        component: () => import(/* webpackChunkName: "about" */ '../views/Invitation.vue')
    },
    {
        path: '/app',
        name: 'Home',
        beforeEnter: checkAuth,
        redirect: { name: 'Contacts' },
        children: [
            {
                path: '/capture',
                name: 'Capture',
                beforeEnter: checkAuth,
                component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
            },
            {
                path: '/contacts',
                name: 'Contacts',
                beforeEnter: checkAuth,
                component: () => import(/* webpackChunkName: "about" */ '../views/ContactsView.vue')
            },
            {
                path: '/contacts/:id',
                name: 'Contact Detail',
                beforeEnter: checkAuth,
                component: () => import(/* webpackChunkName: "about" */ '../views/ContactDetailView.vue')
            },
            {
                path: '/profile',
                name: 'Profile',
                beforeEnter: checkAuth,
                component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
    },
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});
export default router;
//# sourceMappingURL=index.js.map