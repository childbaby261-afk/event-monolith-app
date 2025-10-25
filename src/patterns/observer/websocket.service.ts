// Observer Pattern: WebSocket Service for real-time notifications
export class WebSocketService {
  private static instance: WebSocketService;
  private connections: Set<WebSocket> = new Set();

  // Singleton implementation
  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  // Observer pattern methods
  subscribe(ws: WebSocket) {
    this.connections.add(ws);
    console.log(`👥 New WebSocket connection. Total: ${this.connections.size}`);
  }

  unsubscribe(ws: WebSocket) {
    this.connections.delete(ws);
    console.log(`👥 WebSocket disconnected. Total: ${this.connections.size}`);
  }

  notify(message: string, data?: any) {
    const notification = JSON.stringify({ type: message, data, timestamp: new Date().toISOString() });
    
    this.connections.forEach(ws => {
      if (ws.readyState === ws.OPEN) {
        ws.send(notification);
      }
    });
    
    console.log(`📢 Broadcast: ${message} to ${this.connections.size} clients`);
  }

  // Specific notification types from your previous design
  notifyEventCreated(event: any) {
    this.notify('EVENT_CREATED', event);
  }

  notifyEventUpdated(event: any) {
    this.notify('EVENT_UPDATED', event);
  }

  notifyRSVPAdded(rsvp: any) {
    this.notify('RSVP_ADDED', rsvp);
  }

  notifyEventFull(event: any) {
    this.notify('EVENT_FULL', event);
  }
}
