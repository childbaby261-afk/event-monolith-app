import { EventManager } from "../patterns/singleton/event.manager.js";
import { WebSocketService } from "../patterns/observer/websocket.service.js";
import { NotificationFactory } from "../patterns/factory/notification.factory.js";

const eventManager = EventManager.getInstance();
const wsService = WebSocketService.getInstance();

export const rsvpController = {
  async createRSVP(eventId: string, userId: string, status: string = "GOING") {
    const event = eventManager.getEvent(eventId);
    if (!event) throw new Error('Event not found');

    // Check capacity
    const registeredUsers = eventManager.getRegisteredUsers(eventId);
    if (registeredUsers.length >= event.capacity) {
      throw new Error('Event is at full capacity');
    }

    // Create RSVP (in real implementation, save to database)
    const rsvp = {
      id: `rsvp-${Date.now()}`,
      eventId,
      userId,
      status,
      createdAt: new Date().toISOString()
    };

    // Reserve spot in EventManager
    eventManager.reserveSpot(userId, eventId);
    
    // Notify about new RSVP
    wsService.notifyRSVPAdded(rsvp);
    
    console.log(`✅ RSVP created: User ${userId} -> Event ${eventId} (${status})`);
    
    return rsvp;
  },

  async getUserRSVPs(userId: string) {
    // In real implementation, fetch from database
    // For now, return mock data
    return [
      {
        id: 'rsvp-1',
        eventId: '1',
        userId,
        status: 'GOING',
        event: {
          id: '1',
          title: 'Community Meetup',
          date: new Date().toISOString()
        }
      }
    ];
  },

  async updateRSVP(rsvpId: string, status: string, userId: string) {
    // In real implementation, update in database
    console.log(`✏️ RSVP updated: ${rsvpId} -> ${status} by user ${userId}`);
    
    return {
      id: rsvpId,
      status,
      updatedAt: new Date().toISOString()
    };
  }
};
