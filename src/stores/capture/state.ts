import { Message, PacketMessage, StatMessage } from "./types";

export const state = () => ({
  websocket: null as WebSocket | null,
  isConnected: false,
  message: {} as Message,
  packetMessages: [] as PacketMessage[],
  statMessages: [] as StatMessage[],
});
