import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getAuth } from "firebase/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/meet/:roomId",
    name: "meet",
    component: () => import("../views/MeetPage.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/AuthPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/auth");
  } else {
    next();
  }
});

export default router;
