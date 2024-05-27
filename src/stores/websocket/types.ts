export interface Message {
  type: string;
  data: string;
}

export interface Device {
  ip: string;
  mac: string;
  hostname: string;
}

export interface StatInfo {
  send_pkt: number;
  recv_pkt: number;
  send_data: number;
  recv_data: number;
}

export interface StatMessageData {
  device: Device;
  stat: StatInfo;
}

export interface StatMessage {
  type: string;
  data: StatMessageData[];
}

export interface PacketMessage {
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
