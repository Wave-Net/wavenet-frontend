import { defineStore } from "pinia";

// 수신된 메시지의 타입을 정의하는 인터페이스
interface Message {
  // 메시지의 속성들을 정의
  type: string;
  flags: string;
  length: string;
  data: string;
}

export const useWebSocketStore = defineStore("websocket", {
  state: () => ({
    websocket: null as WebSocket | null, // 웹소켓 객체
    isConnected: false, // 웹소켓 연결 상태
    messages: [] as Message[], // 수신된 메시지들
  }),
  actions: {
    connect() {
      this.websocket = new WebSocket("ws://localhost:8765");
      this.websocket.onopen = () => {
        this.isConnected = true;
        console.log("웹소켓 connect");
      };
      this.websocket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data);
        console.log("받은 데이터:", receivedData);
        this.messages.push(receivedData);
      };
      this.websocket.onclose = () => {
        this.isConnected = false;
      };
    },
    disconnect() {
      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
        this.isConnected = false;
        console.log("웹소켓 disconnect");
      }
    },
  },
});
