import { defineStore } from "pinia";
import { state } from "./state";
import { Message, PacketMessage, StatMessage } from "./types";

export const useCaptureStore = defineStore("websocket", {
  state: state,
  actions: {
    connect() {
      if (!this.isConnected) {
        this.websocket = new WebSocket("http://localhost:8000/capture");
        this.websocket.onopen = () => {
          this.isConnected = true;
          console.log("패킷캡쳐 웹소켓 연결됨");
        };
        this.websocket.onmessage = (event) => {
          // console.log(event.data);
          const receivedData = JSON.parse(event.data) as Message;
          if (receivedData.type === "packet") {
            const packetMessage = receivedData.data;
            this.packetMessages.push(packetMessage);
          } else if (receivedData.type === "stat") {
            const statMessage = receivedData.data;
            console.log(statMessage);
            this.statMessage = statMessage;
          }
        };
        this.websocket.onclose = () => {
          this.isConnected = false;
          console.log("패킷캡쳐 웹소켓 연결 종료");
        };
        this.websocket.onerror = (error) => {
          console.error("패킷캡쳐 웹소켓 에러 발생:", error);
        };
      } else {
        console.log("패킷캡쳐 웹소켓 이미 연결됨");
      }
    },
    disconnect() {
      if (this.isConnected && this.websocket) {
        this.websocket.close();
        this.websocket = null;
        this.isConnected = false;
      }
    },
    startCapture(device_ip: String) {
      if (this.websocket && this.isConnected) {
        console.log("start capture");
        this.packetMessages = [];
        this.isCapturing = true;
        const message = {
          type: "start_capture",
          data: device_ip,
        };
        this.websocket.send(JSON.stringify(message));
      } else {
        console.error("WebSocket 연결이 되어있지 않습니다.");
      }
    },
    stopCapture() {
      if (this.websocket && this.isConnected) {
        console.log("stop capture");
        const message = {
          type: "stop_capture",
        };
        this.websocket.send(JSON.stringify(message));
        this.isCapturing = false;
      } else {
        console.error("WebSocket 연결이 되어있지 않습니다.");
      }
    },
  },
});
