import { createPinia } from "pinia";
import { useWebSocketStore } from "./websocket";
import * as websocketTypes from './websocket/types';

const pinia = createPinia();

export { useWebSocketStore, websocketTypes };
export default pinia;
