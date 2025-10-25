// Singleton Pattern: Event Manager from your previous design
import { WebSocketService } from '../observer/websocket.service.js';
import { NotificationFactory } from '../factory/notification.factory.js';

export class EventManager {
  private static instance: EventManager;
  private events: Map<string, any> = new Map();
  private registeredUsers: Map<string, Set<string>> = new Map(); // eventId -> userIds

  private constructor() {
    console.log('⚡ Event Manager Singleton initialized');
  }

  // Singleton instance getter
  static getInstance(): EventManager {
    if (!EventManager.instance) {
      EventManager.instance = new EventManager();
    }
    return EventManager.instance;
  }

  // Core methods from your sequence diagram
  async checkCapacity(eventId: string): Promise<boolean> {
    const event = this.events.get(eventId);
    if (!event) return false;

    const registered = this.registeredUsers.get(eventId)?.size || 0;
    return registered < event.capacity;
  }

  async reserveSpot(userId: string, eventId: string): Promise<boolean> {
    if (!await this.checkCapacity(eventId)) {
      // Notify that event is full (from your sequence diagram)
      const wsService = WebSocketService.getInstance();
      wsService.notifyEventFull({ eventId, userId });
      
      const notification = NotificationFactory.createConfirmationNotification(
        this.events.get(eventId), 
        true
      );
      await notification.send(userId, 'Event is full');
      
      return false;
    }

    // Reserve spot
    if (!this.registeredUsers.has(eventId)) {
      this.registeredUsers.set(eventId, new Set());
    }
    this.registeredUsers.get(eventId)!.add(userId);

    // Send confirmation notification (from your sequence diagram)
    const notification = NotificationFactory.createConfirmationNotification(
      this.events.get(eventId), 
      false
    );
    await notification.send(userId, 'Spot reserved successfully');

    // Notify all subscribers about the new registration
    const wsService = WebSocketService.getInstance();
    wsService.notifyRSVPAdded({ eventId, userId });

    console.log(`✅ Reserved spot for user ${userId} in event ${eventId}`);
    return true;
  }

  // Event management methods
  registerEvent(event: any) {
    this.events.set(event.id, event);
    console.log(`📅 Event registered: ${event.title}`);
    
    // Notify about new event
    const wsService = WebSocketService.getInstance();
    wsService.notifyEventCreated(event);
  }

  getEvent(eventId: string) {
    return this.events.get(eventId);
  }

  getRegisteredUsers(eventId: string): string[] {
    return Array.from(this.registeredUsers.get(eventId) || []);
  }

  // AI Suggester integration (from your sequence diagram)
  async suggestEvents(userId: string): Promise<any[]> {
    console.log(`🤖 AI suggesting events for user ${userId}`);
    // Mock AI suggestions - in real implementation, integrate with AI service
    return Array.from(this.events.values()).slice(0, 3);
  }
}
