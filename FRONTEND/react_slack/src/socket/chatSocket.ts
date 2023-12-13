
import { io, Socket } from "socket.io-client";
import { getItem } from "src/utility/localStorageControl";

export class chatClient {
  static socket: Socket;
  static debug = true;
  static status = "disconnected";
  static room: string | null = null;
  static begin(room = null) {
    this.socket = io(process.env.REACT_APP_SOCKET_HOST + ":" + process.env.REACT_APP_SOCKET_PORT, {
      transports: ['polling'],
      extraHeaders: { Authorization: `Bearer ${getItem("access_token")}` },
    });
    this.init(room);
  }
  static connect(room = null) {
    this.room = room;
    this.socket.connect();
  }
  static init(room: string | null = null) {
    this.room = room;
    this.socket.on("connect", () => {
      if (this.debug)
        console.log(
          "Conectado a " + process.env.REACT_APP_SOCKET_HOST + ":" + process.env.REACT_APP_SOCKET_PORT
        );
      this.status = "connected";
      if (this.room) {
        this.registerRoom(this.room);
      }
    });
    this.socket.on("error", (error: any) => {
      console.log(error);
    });
    this.socket.on("disconnect", () => {
      if (this.debug)
        console.log(
          "Desconectado de " + process.env.REACT_APP_SOCKET_HOST + ":" + process.env.REACT_APP_SOCKET_PORT
        );
      this.status = "disconected";
    });
    this.socket.on("connect_error", (error: Error) => {
      if (this.debug) console.log("Error conectando: " + error);
      this.status = "error_conection";
    });
    this.socket.on("reconnecting", (error: string) => {
      if (this.debug) console.log("Reconectando Intento: " + error);
      this.status = "reconnecting";
    });
  }
  static registerRoom(room: string) {
    if (!this.socket){
      this.init(room);
    } else {
      this.socket.emit('register', room.toString(), (data: any) => {
        console.log(`register to room ${room}`, data)
      });
    }
  }
}
