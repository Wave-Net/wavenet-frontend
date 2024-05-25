import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DeviceMonitoringPage from "@/pages/DeviceMonitoringPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
		name: "home",
    component: DeviceMonitoringPage,
  },
  // {
  //   path: "/capture-page",
	// 	name: "capture-page",
  //   component: DashboardView,
  // },
  // {
  //   path: "/flowchart-page",
	// 	name: "flowchart-page",
  //   component: FlowchartView,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
