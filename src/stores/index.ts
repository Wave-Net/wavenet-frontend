import { createPinia } from "pinia";
import { useMonitorStore } from "./monitor";
import { useCaptureStore } from "./capture";
import * as monitorMessageTypes from './monitor/types';
import * as captureMessageTypes from './capture/types';

const pinia = createPinia();

export { useMonitorStore, useCaptureStore, monitorMessageTypes, captureMessageTypes };
export default pinia;
