import { MonitorMessage } from "./types";

export const state = () => ({
  websocket: null as WebSocket | null,
  isConnected: false,
  monitorMessage: { type: "", data: [] } as MonitorMessage,
});
