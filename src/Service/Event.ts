import EventEmitter from "events";

export enum EventType {
    Failure = 0
}

export class Event {
    static Emitter = new EventEmitter();
    static toString(type: EventType) { return `${EventType[type]}`; }
    static Emit = (type: EventType, ...data: any[]) => { Event.Emitter.emit(this.toString(type), ...data); }
    constructor(type: EventType, ...data: any[]) { Event.Emit(type, ...data); }
}