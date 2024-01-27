import EventEmitter from "events";

import { Service, ServiceConfig } from "../Type/Service";

export enum EventType {
    Failure = 0,
    Database_Failure = 100,
    Database_Ready = 101,
}

export class Event {
    static Emitter = new EventEmitter();

    static Emit = (type: EventType, ...data: any[]) => { Event.Emitter.emit(Event.Type(type), ...data); }
    static Type(type: EventType) { return `${EventType[type]}`; }

    // static Listeners = new Map<EventType, Function[]>();
    static Listen = (type: EventType, callback: (...args: any[]) => void) => { this.Emitter.on(Event.Type(type), callback); }
    static Remove = (type: EventType, callback: (...args: any[]) => void) => { this.Emitter.removeListener(Event.Type(type), callback); }
    static RemoveAll = (type: EventType) => { this.Emitter.removeAllListeners(Event.Type(type)); }

    constructor(type: EventType, ...data: any[]) { Event.Emit(type, ...data); }
}

export interface EventServiceConfig extends ServiceConfig {

}

export class EventService extends Service {
    constructor(config?: EventServiceConfig) {
        super(config);
    }

    async Start() {
        
    }
}