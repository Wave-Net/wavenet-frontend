import { defineStore } from "pinia";

// 수신된 메시지의 타입을 정의하는 인터페이스
interface Message {
  protocol: string;
  timestamp: number;
  time_of_day: number;
  seconds_since_beginning: number;
  seconds_since_previous: number;
  source_ip: string;
  destination_ip: string;
  source_port: number;
  destination_port: number;
  mqtt_type: string;
  qos: number;
  length: number;
  flags?: number; // 선택적 필드
  topic?: string; // 선택적 필드
  value?: string; // 선택적 필드
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
    startCapture(options?: { filter?: string; interface?: string }) {
      if (this.websocket && this.isConnected) {
        const message = {
          type: "start_capture",
          options: options || {},
        };
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
