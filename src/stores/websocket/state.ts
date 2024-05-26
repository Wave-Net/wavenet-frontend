import { Message, StatMessage, PacketMessage } from "./types";

export const state = () => ({
  websocket: null as WebSocket | null,
  isConnected: false,
  message: {} as Message,
  packetMessages: [] as PacketMessage[],
  statMessage: { type: "", data: [] } as StatMessage,
});
