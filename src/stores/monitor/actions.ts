import { defineStore } from "pinia";
import { state } from "./state";
import { MonitorMessage } from "./types";

export const useMonitorStore = defineStore("websocket", {
  state: state,
  actions: {
    connect() {
      if (!this.isConnected) {
        this.websocket = new WebSocket('ws://localhost:8000/monitor');
        this.websocket.onopen = () => {
          this.isConnected = true;
          console.log("모니터 웹소켓 연결");
        };
        this.websocket.onmessage = (event) => {
          console.log(event.data);
          const monitorMessage = JSON.parse(event.data) as MonitorMessage;
          this.monitorMessage = monitorMessage;
          console.log("모니터 웹소켓 데이터:", monitorMessage);
        };
        this.websocket.onclose = () => {
          this.isConnected = false;
          console.log("모니터 웹소켓 연결 종료");
        };
        this.websocket.onerror = (error) => {
          console.error("모니터 웹소켓 에러 발생:", error);
        };
      } else {
        console.log("모니터 웹소켓 이미 연결됨");
      }
    },
    disconnect() {
      if (this.isConnected && this.websocket) {
        this.websocket.close();
        this.websocket = null;
        this.isConnected = false;
        console.log("모니터 웹소켓 연결 종료");
      }
    },
  },
});
