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

export interface MonitorMessageData {
  device: Device;
  stat: StatInfo;
}

export interface MonitorMessage {
  type: string;
  data: MonitorMessageData[];
}
