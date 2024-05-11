import { defineStore } from "pinia";

interface Message {
  message_type: string;
}

interface StatMessage {
  totalStat: {
    send_pkt: number;
    recv_pkt: number;
    send_data: number;
    recv_data: number;
  };
  statDelta: {
    send_pkt: number;
    recv_pkt: number;
    send_data: number;
    recv_data: number;
  };
}

interface PacketMessage {
  // 공통 필드
  index: number;
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
    keep_alive?: number;
    clientId: string;
    willtopic?: string;
    willmsg?: string;
    username?: string;
    password?: string;
  };

  // MQTT CONNACK 정보
  connack?: {
    ackflag: number;
    return_code?: number;
  };

  // MQTT PUBLISH 정보
  publish?: {
    topic: string;
    msgid?: number;
    msgvalue: string;
  };

  // MQTT PUBACK 정보
  puback?: {
    msgid: number;
  };

  // MQTT PUBREC 정보
  pubrec?: {
    msgid: number;
  };

  // MQTT PUBREL 정보
  pubrel?: {
    msgid: number;
  };

  // MQTT PUBCOMP 정보
  pubcomp?: {
    msgid: number;
  };
  
  // MQTT SUBSCRIBE 정보
  subscribe?: {
    msgid: number;
    topic_filters: {
      topic: string;
      qos: number;
    }[];
  };
  
  // MQTT SUBACK 정보
  suback?: {
    msgid: number;
    return_code: number;
  };
  
  // MQTT UNSUBSCRIBE 정보
  unsubscribe?: {
    msgid: number;
    topic_filters: string[];
  };
  
  // MQTT UNSUBACK 정보
  unsuback?: {
    msgid: number;
  };
}

// 수신된 메시지의 타입을 정의하는 인
export const useWebSocketStore = defineStore("websocket", {
  state: () => ({
    websocket: null as WebSocket | null,
    isConnected: false,
    message: {} as Message,
    packetMessages: [] as PacketMessage[],
    statMessage: {} as StatMessage
  }),
  actions: {
    connect(url: string) {
      this.websocket = new WebSocket(url);
      this.websocket.onopen = () => {
        this.isConnected = true;
        console.log("웹소켓 연결됨");
      };
      this.websocket.onmessage = (event) => {
        const receivedData = JSON.parse(event.data) as Message;
        if (receivedData.message_type === "stat") {
          const statMessage = JSON.parse(event.data) as StatMessage;
          this.statMessage = statMessage;
          console.log("받은 데이터:", statMessage);
        }
        if (receivedData.message_type === "packet") {
          const packetMessage = JSON.parse(event.data) as PacketMessage;
          this.packetMessages.push(packetMessage);
          console.log("받은 데이터:", packetMessage);
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

