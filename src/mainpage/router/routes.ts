import type { RouteRecordRaw } from "vue-router"

export const mainpageRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "landing",
    component: () => import("../landing.vue")
  }
]
