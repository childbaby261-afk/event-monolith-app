"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
const event_manager_js_1 = require("../patterns/singleton/event.manager.js");
const websocket_service_js_1 = require("../patterns/observer/websocket.service.js");
const notification_factory_js_1 = require("../patterns/factory/notification.factory.js");
const eventManager = event_manager_js_1.EventManager.getInstance();
const wsService = websocket_service_js_1.WebSocketService.getInstance();
exports.eventController = {
    async createEvent(eventData, userId) {
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
    async updateEvent(eventId, updates, userId, userRole) {
        const event = eventManager.getEvent(eventId);
        if (!event)
            throw new Error('Event not found');
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
    async deleteEvent(eventId, userId, userRole) {
        const event = eventManager.getEvent(eventId);
        if (!event)
            throw new Error('Event not found');
        // Check permissions
        if (event.organizerId !== userId && userRole !== 'ADMIN') {
            throw new Error('Not authorized to delete this event');
        }
        // In real implementation, delete from database
        console.log(`🗑️ Event deleted: ${event.title} by user ${userId}`);
        wsService.notify('EVENT_DELETED', { eventId });
        return { message: 'Event deleted successfully' };
    },
    async approveEvent(eventId) {
        const event = eventManager.getEvent(eventId);
        if (!event)
            throw new Error('Event not found');
        const approvedEvent = { ...event, approved: true };
        eventManager.registerEvent(approvedEvent);
        wsService.notifyEventUpdated(approvedEvent);
        console.log(`✅ Event approved: ${event.title}`);
        return approvedEvent;
    }
};
//# sourceMappingURL=event.controller.js.map