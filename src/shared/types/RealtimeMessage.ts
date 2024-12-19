import { SocketIOMessage } from "./SocketIOMessage";
import { WSMessage } from "./WSMessage";

export type RealtimeMessage = WSMessage & SocketIOMessage;