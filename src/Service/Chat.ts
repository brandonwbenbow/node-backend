// General Chat Service
    // Will be extendable for specific use cases,
    // just helps manage session info/client to socket connection

import { WebSocketServer } from 'ws';

import { Server } from './Server';
import { Service, ServiceConfig } from '../Type/Service';

export interface ChatManagerConfig extends ServiceConfig {

}

export class ChatService extends Service {
    private SocketServer: WebSocketServer;

    constructor(config?: ChatManagerConfig) {
        super(config);
        this.SocketServer =  new WebSocketServer({ noServer: !!config?.server });
    }

    async Start() {
        
    }

    // handling upgrade, if passed Server instance use that, if not use your own
}