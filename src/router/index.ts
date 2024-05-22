import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainView from "../page/iot-monitoring-page.vue";
import DashboardView from "../page/capture-page.vue";
import FlowchartView from "../page/flowchart-page.vue";

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
