export default [
  {
    path: "/",
    name: "IndexView",
    component: () => import("@/views/IndexView.vue"),
    children: [
      {
        path: "/login",
        name: "LoginView",
        component: () => import("@/views/LoginView.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("@/views/CartView.vue"),
  },
  {
    path: "/orders",
    name: "OrdersView",
    component: () => import("@/views/OrdersView.vue"),
    meta: {
      layout: "AppLayoutWithSidebar",
      title: "История заказов",
    },
  },
  {
    path: "/profile",
    name: "ProfileView",
    component: () => import("@/views/ProfileView.vue"),
    meta: {
      layout: "AppLayoutWithSidebar",
      title: "Мои данные",
    },
  },
];
