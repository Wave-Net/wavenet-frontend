import { defineStore } from "pinia";
import { state } from "./state";
import { Message, StatMessage, PacketMessage } from "./types";

export const useWebSocketStore = defineStore("websocket", {
  state: state,
  actions: {
    connect(url: string) {
      if (!this.isConnected) {
        this.websocket = new WebSocket(url);
        this.websocket.onopen = () => {
          this.isConnected = true;
          console.log("웹소켓 연결됨");
        };
        this.websocket.onmessage = (event) => {
          // console.log(event.data);
          const receivedData = JSON.parse(event.data) as Message;
          if (receivedData.type === "stats") {
            const statMessage = JSON.parse(event.data) as StatMessage;
            this.statMessage = statMessage;
            console.log("받은 데이터:", statMessage);
          }
        };
        this.websocket.onclose = () => {
          this.isConnected = false;
          console.log("웹소켓 연결 종료");
        };
        this.websocket.onerror = (error) => {
          console.error("웹소켓 에러 발생:", error);
        };
      } else {
        console.log("웹소켓 이미 연결됨");
      }
    },
    disconnect() {
      if (this.isConnected && this.websocket) {
        this.websocket.close();
        this.websocket = null;
        this.isConnected = false;
      }
    },
    startCapture(options?: { filter?: string; interface?: string }) {
      if (this.websocket && this.isConnected) {
        const message = {
          type: "start_capture",
          options: options || {},
        };
        this.packetMessages = [];
        this.websocket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket 연결이 되어있지 않습니다.");
      }
    },
    stopCapture() {
      if (this.websocket && this.isConnected) {
        const message = {
          type: "stop_capture",
        };
        this.websocket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket 연결이 되어있지 않습니다.");
      }
    },
  },
});
