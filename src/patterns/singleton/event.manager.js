"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
// Singleton Pattern: Event Manager from your previous design
const websocket_service_js_1 = require("../observer/websocket.service.js");
const notification_factory_js_1 = require("../factory/notification.factory.js");
class EventManager {
    static instance;
    events = new Map();
    registeredUsers = new Map(); // eventId -> userIds
    constructor() {
        console.log('⚡ Event Manager Singleton initialized');
    }
    // Singleton instance getter
    static getInstance() {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }
    // Core methods from your sequence diagram
    async checkCapacity(eventId) {
        const event = this.events.get(eventId);
        if (!event)
            return false;
        const registered = this.registeredUsers.get(eventId)?.size || 0;
        return registered < event.capacity;
    }
    async reserveSpot(userId, eventId) {
        if (!await this.checkCapacity(eventId)) {
            // Notify that event is full (from your sequence diagram)
            const wsService = websocket_service_js_1.WebSocketService.getInstance();
            wsService.notifyEventFull({ eventId, userId });
            const notification = notification_factory_js_1.NotificationFactory.createConfirmationNotification(this.events.get(eventId), true);
            await notification.send(userId, 'Event is full');
            return false;
        }
        // Reserve spot
        if (!this.registeredUsers.has(eventId)) {
            this.registeredUsers.set(eventId, new Set());
        }
        this.registeredUsers.get(eventId).add(userId);
        // Send confirmation notification (from your sequence diagram)
        const notification = notification_factory_js_1.NotificationFactory.createConfirmationNotification(this.events.get(eventId), false);
        await notification.send(userId, 'Spot reserved successfully');
        // Notify all subscribers about the new registration
        const wsService = websocket_service_js_1.WebSocketService.getInstance();
        wsService.notifyRSVPAdded({ eventId, userId });
        console.log(`✅ Reserved spot for user ${userId} in event ${eventId}`);
        return true;
    }
    // Event management methods
    registerEvent(event) {
        this.events.set(event.id, event);
        console.log(`📅 Event registered: ${event.title}`);
        // Notify about new event
        const wsService = websocket_service_js_1.WebSocketService.getInstance();
        wsService.notifyEventCreated(event);
    }
    getEvent(eventId) {
        return this.events.get(eventId);
    }
    getRegisteredUsers(eventId) {
        return Array.from(this.registeredUsers.get(eventId) || []);
    }
    // AI Suggester integration (from your sequence diagram)
    async suggestEvents(userId) {
        console.log(`🤖 AI suggesting events for user ${userId}`);
        // Mock AI suggestions - in real implementation, integrate with AI service
        return Array.from(this.events.values()).slice(0, 3);
    }
}
exports.EventManager = EventManager;
//# sourceMappingURL=event.manager.js.map