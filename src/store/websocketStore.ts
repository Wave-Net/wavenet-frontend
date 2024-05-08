import { defineStore } from "pinia";

// 수신된 메시지의 타입을 정의하는 인터페이스
interface Message {
  // 공통 필드
  protocol: string;
  timestamp: number;
  time_of_day: string;
  seconds_since_beginning: string;
  seconds_since_previous: string;
  source_ip: string;
  destination_ip: string;
  source_port: number;
  destination_port: number;
  length: number;

  // MQTT 헤더 정보
  header: {
    msg_len: number;
    dup: number;
    qos: number;
    retain: number;
  };

  // MQTT 타입
  type: string;

  // MQTT CONNECT 정보
  connect?: {
    proto_name: string;
    mqtt_level: string;
    usernameflag: number;
    passwordflag: number;
    willretainflag: number;
    willQOSflag: number;
    willflag: number;
    cleansession: number;
    reserved: number;
    keep_alive: number;
    clientId: string;
    willtopic?: string;
    willmsg?: string;
    username?: string;
    password?: string;
  };

  // MQTT CONNACK 정보
  connack?: {
    ackflag: number;
    return_code: string;
  };

  // MQTT PUBLISH 정보
  publish?: {
    topic: string;
    msgid: string;
    msgvalue: string;
  };

  // MQTT PUBACK 정보
  puback?: {
    msgid: string;
  };

  // MQTT PUBREC 정보
  pubrec?: {
    msgid: string;
  };

  // MQTT PUBREL 정보
  pubrel?: {
    msgid: string;
  };

  // MQTT PUBCOMP 정보
  pubcomp?: {
    msgid: string;
  };
}

export const useWebSocketStore = defineStore("websocket", {
  state: () => ({
    websocket: null as WebSocket | null,
    isConnected: false,
    messages: [] as Message[],
    totalStatics: {
      send_pkt: 0,
      recv_pkt: 0,
      send_data: 0,
      recv_data: 0,
    },
    staticsDelta: {
      send_pkt: 0,
      recv_pkt: 0,
      send_data: 0,
      recv_data: 0,
    },
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
        if ('total_statics' in receivedData) {
          this.totalStatics = (receivedData as any).total_statics;
          this.staticsDelta = (receivedData as any).statics_delta;
        } else {
          this.messages.push(receivedData); // totalStatics와 staticsDelta가 아닌 경우에만 messages에 추가
        }
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