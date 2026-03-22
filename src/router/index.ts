import { createRouter, createWebHistory } from "vue-router"

import { usageGuideRoutes } from "@/workspace/usage-guide/router/routes"
import { mainpageRoutes } from "@/mainpage/router/routes"
import { affiliateRoutes } from "@/workspace/affiliate/router/routes"
import { offersRoutes } from "@/workspace/offers/router/routes"
import { screensRoutes } from "@/workspace/screens/router/routes"
import { membershipRoutes } from "@/workspace/membership/router/routes"
import { designTasksRoutes } from "@/workspace/design-tasks/router/routes"
import { settingsRoutes } from "@/workspace/settings/router/routes"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...usageGuideRoutes,
    ...mainpageRoutes,
    ...affiliateRoutes,
    ...offersRoutes,
    ...screensRoutes,
    ...membershipRoutes,
    ...designTasksRoutes,
    ...settingsRoutes
  ]
})

export default router
