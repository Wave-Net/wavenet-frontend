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

  //fixed mqtt
  name: string; //mqtt인지 확인할수 있는인지 .. 'MQTT'
  // mqtt_type: string; //'CONNECT' 같은 type
  mqtt_dup: number; //
  mqtt_qos: number;
  mqtt_retain: number;

  connect_proto_name: string;
  connect_mqtt_level: string; //connect_mqtt_version : v3.1 or v3.1.1 or v5.0 이런식으로 ..
  connect_usernameflag: number;
  connect_passwordflag: number;
  connect_willretainflag: number;
  connect_willQOSflag: number;
  connect_willflag: number;
  connect_cleansession: number;
  connect_reserved: number;
  connect_keep_alive: number;
  connect_clientId: string;

  //위 플래그가 1인 경우에만 주시면 될거같아요!
  connect_willtopic: string; //willflag == 1
  connect_willmsg: string; //willflag == 1
  connect_username: string; //usernameflag == 1
  connect_password: string; //passwordflag == 1

  connack_ackflag: number;
  connack_return_code: string; //'Connection Accepted'

  publish_topic: string;
  publish_msgid: string;
  publish_msgvalue: string;

  puback_msgid: string;

  pubrec_msgid: string;

  pubrel_msgid: string;

  pubcomp_msgid: string;
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
