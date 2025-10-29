"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFactory = exports.SMSNotification = exports.PushNotification = exports.EmailNotification = void 0;
class EmailNotification {
    async send(to, message) {
        console.log(`📧 EMAIL to ${to}: ${message}`);
        // In real implementation: integrate with Ethereal/Nodemailer
        return true;
    }
    getType() {
        return 'EMAIL';
    }
}
exports.EmailNotification = EmailNotification;
class PushNotification {
    async send(to, message) {
        console.log(`📱 PUSH to ${to}: ${message}`);
        // In real implementation: integrate with push service
        return true;
    }
    getType() {
        return 'PUSH';
    }
}
exports.PushNotification = PushNotification;
class SMSNotification {
    async send(to, message) {
        console.log(`💬 SMS to ${to}: ${message}`);
        // In real implementation: integrate with SMS service
        return true;
    }
    getType() {
        return 'SMS';
    }
}
exports.SMSNotification = SMSNotification;
// Notification Factory (from your previous design)
class NotificationFactory {
    static createNotification(type) {
        switch (type) {
            case 'email':
                return new EmailNotification();
            case 'push':
                return new PushNotification();
            case 'sms':
                return new SMSNotification();
            default:
                throw new Error(`Unknown notification type: ${type}`);
        }
    }
    // Specific factory methods from your sequence diagram
    static createConfirmationNotification(event, isFull = false) {
        const message = isFull
            ? `Event "${event.title}" is now full`
            : `You registered for "${event.title}"`;
        return this.createNotification('email');
    }
    static createWelcomeNotification() {
        return this.createNotification('email');
    }
}
exports.NotificationFactory = NotificationFactory;
//# sourceMappingURL=notification.factory.js.map