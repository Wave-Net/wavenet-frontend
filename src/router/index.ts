import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "@/page/DeviceMonitoringPage.vue";
import DashboardView from "@/page/CapturePage.vue";
import FlowchartView from "@/page/FlowchartPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
		name: "home",
    component: MainView,
  },
  {
    path: "/capture-page",
		name: "capture-page",
    component: DashboardView,
  },
  {
    path: "/flowchart-page",
		name: "flowchart-page",
    component: FlowchartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
