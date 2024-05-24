import { createPinia } from "pinia";
import { useWebSocketStore } from "./websocket";

const pinia = createPinia();

export { useWebSocketStore };
export default pinia;
