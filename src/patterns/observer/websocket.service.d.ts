export declare class WebSocketService {
    private static instance;
    private connections;
    static getInstance(): WebSocketService;
    subscribe(ws: WebSocket): void;
    unsubscribe(ws: WebSocket): void;
    notify(message: string, data?: any): void;
    notifyEventCreated(event: any): void;
    notifyEventUpdated(event: any): void;
    notifyRSVPAdded(rsvp: any): void;
    notifyEventFull(event: any): void;
}
//# sourceMappingURL=websocket.service.d.ts.map