// General Chat Service
    // Will be extendable for specific use cases,
    // just helps manage session info/client to socket connection

import { WebSocketServer } from 'ws';

import { Server } from './Server';

export interface ChatManagerConfig {
    server: Server
}

export class ChatManager {
    private SocketServer: WebSocketServer;

    private config: ChatManagerConfig | undefined;

    constructor(config?: ChatManagerConfig) {
        this.SocketServer =  new WebSocketServer({ noServer: !!config?.server });
    }

    // handling upgrade, if passed Server instance use that, if not use your own
}