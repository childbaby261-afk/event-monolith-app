"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpController = void 0;
const event_manager_js_1 = require("../patterns/singleton/event.manager.js");
const websocket_service_js_1 = require("../patterns/observer/websocket.service.js");
const notification_factory_js_1 = require("../patterns/factory/notification.factory.js");
const eventManager = event_manager_js_1.EventManager.getInstance();
const wsService = websocket_service_js_1.WebSocketService.getInstance();
exports.rsvpController = {
    async createRSVP(eventId, userId, status = "GOING") {
        const event = eventManager.getEvent(eventId);
        if (!event)
            throw new Error('Event not found');
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
    async getUserRSVPs(userId) {
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
    async updateRSVP(rsvpId, status, userId) {
        // In real implementation, update in database
        console.log(`✏️ RSVP updated: ${rsvpId} -> ${status} by user ${userId}`);
        return {
            id: rsvpId,
            status,
            updatedAt: new Date().toISOString()
        };
    }
};
//# sourceMappingURL=rsvp.controller.js.map