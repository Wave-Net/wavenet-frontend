import { defineStore } from "pinia";

// 수신된 메시지의 타입을 정의하는 인터페이스
interface Message {
  type: string;
  flags: string;
  length: string;
  data: string;
  timestamp: number; // 메시지 수신 시간 추가
}

export const useWebSocketStore = defineStore("websocket", {
  state: () => ({
    websocket: null as WebSocket | null,
    isConnected: false,
    messages: [] as Message[],
  }),
  actions: {
    connect(url: string) {
      this.websocket = new WebSocket(url);
      this.websocket.onopen = () => {
        this.isConnected = true;
        console.log("웹소켓 연결됨");
      };
      this.websocket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data) as Message; // 타입 단언 추가
        receivedData.timestamp = Date.now(); // 메시지 수신 시간 추가
        console.log("받은 데이터:", receivedData);
        this.messages.push(receivedData);
      };
      this.websocket.onclose = () => {
        this.isConnected = false;
        console.log("웹소켓 연결 종료");
      };
      this.websocket.onerror = (error) => {
        console.error("웹소켓 에러 발생:", error);
      };
    },
    disconnect() {
      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
        this.isConnected = false;
      }
    },
  },
});