import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit {
  constructor() {}

  @WebSocketServer()
  server: Server;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async afterInit(_server: Server) {}

  async handleConnection(client: Socket) {
    console.log('handleConnection');
    let authorization = client.handshake.headers.authorization;
    authorization = authorization?.replace('Bearer ', '');
    console.log(client.handshake.headers);
    if (!authorization?.length) {
      client.disconnect();
    }
  }

  @SubscribeMessage('register')
  async registerRoom(
    @MessageBody() room: number,
    @ConnectedSocket() client: Socket,
  ) {
    this.server.emit('notification', `new client joined the room ${room}`);
    await client.join(`${room}`);
    return {
      OK: true,
    };
  }
}
