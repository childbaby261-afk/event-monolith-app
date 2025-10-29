"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketService = void 0;
// Observer Pattern: WebSocket Service for real-time notifications
class WebSocketService {
    static instance;
    connections = new Set();
    // Singleton implementation
    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }
    // Observer pattern methods
    subscribe(ws) {
        this.connections.add(ws);
        console.log(`👥 New WebSocket connection. Total: ${this.connections.size}`);
    }
    unsubscribe(ws) {
        this.connections.delete(ws);
        console.log(`👥 WebSocket disconnected. Total: ${this.connections.size}`);
    }
    notify(message, data) {
        const notification = JSON.stringify({ type: message, data, timestamp: new Date().toISOString() });
        this.connections.forEach(ws => {
            if (ws.readyState === ws.OPEN) {
                ws.send(notification);
            }
        });
        console.log(`📢 Broadcast: ${message} to ${this.connections.size} clients`);
    }
    // Specific notification types from your previous design
    notifyEventCreated(event) {
        this.notify('EVENT_CREATED', event);
    }
    notifyEventUpdated(event) {
        this.notify('EVENT_UPDATED', event);
    }
    notifyRSVPAdded(rsvp) {
        this.notify('RSVP_ADDED', rsvp);
    }
    notifyEventFull(event) {
        this.notify('EVENT_FULL', event);
    }
}
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map