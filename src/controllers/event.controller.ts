import { EventManager } from "../patterns/singleton/event.manager.js";
import { WebSocketService } from "../patterns/observer/websocket.service.js";
import { NotificationFactory } from "../patterns/factory/notification.factory.js";

const eventManager = EventManager.getInstance();
const wsService = WebSocketService.getInstance();

export const eventController = {
  async createEvent(eventData: any, userId: string) {
    const event = {
      id: `event-${Date.now()}`,
      ...eventData,
      organizerId: userId,
      createdAt: new Date().toISOString(),
      approved: eventData.role === 'ADMIN' // Auto-approve for admins
    };

    eventManager.registerEvent(event);
    
    // Notify all clients about new event
    wsService.notifyEventCreated(event);
    
    console.log(`📅 Event created: ${event.title} by user ${userId}`);
    
    return event;
  },

  async getEvents() {
    // In real implementation, fetch from database
    // For now, return from EventManager
    return [
      { id: '1', title: 'Community Meetup', capacity: 50, description: "A great community event", approved: true },
      { id: '2', title: 'Tech Conference 2024', capacity: 100, description: "Annual technology conference", approved: true }
    ];
  },

  async updateEvent(eventId: string, updates: any, userId: string, userRole: string) {
    const event = eventManager.getEvent(eventId);
    if (!event) throw new Error('Event not found');
    
    // Check permissions
    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new Error('Not authorized to update this event');
    }

    const updatedEvent = { ...event, ...updates };
    eventManager.registerEvent(updatedEvent); // Update in manager
    
    wsService.notifyEventUpdated(updatedEvent);
    
    console.log(`✏️ Event updated: ${event.title} by user ${userId}`);
    
    return updatedEvent;
  },

  async deleteEvent(eventId: string, userId: string, userRole: string) {
    const event = eventManager.getEvent(eventId);
    if (!event) throw new Error('Event not found');
    
    // Check permissions
    if (event.organizerId !== userId && userRole !== 'ADMIN') {
      throw new Error('Not authorized to delete this event');
    }

    // In real implementation, delete from database
    console.log(`🗑️ Event deleted: ${event.title} by user ${userId}`);
    
    wsService.notify('EVENT_DELETED', { eventId });
    
    return { message: 'Event deleted successfully' };
  },

  async approveEvent(eventId: string) {
    const event = eventManager.getEvent(eventId);
    if (!event) throw new Error('Event not found');

    const approvedEvent = { ...event, approved: true };
    eventManager.registerEvent(approvedEvent);
    
    wsService.notifyEventUpdated(approvedEvent);
    
    console.log(`✅ Event approved: ${event.title}`);
    
    return approvedEvent;
  }
};
