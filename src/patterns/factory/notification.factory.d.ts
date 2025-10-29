export interface Notification {
    send(to: string, message: string): Promise<boolean>;
    getType(): string;
}
export declare class EmailNotification implements Notification {
    send(to: string, message: string): Promise<boolean>;
    getType(): string;
}
export declare class PushNotification implements Notification {
    send(to: string, message: string): Promise<boolean>;
    getType(): string;
}
export declare class SMSNotification implements Notification {
    send(to: string, message: string): Promise<boolean>;
    getType(): string;
}
export declare class NotificationFactory {
    static createNotification(type: 'email' | 'push' | 'sms'): Notification;
    static createConfirmationNotification(event: any, isFull?: boolean): Notification;
    static createWelcomeNotification(): Notification;
}
//# sourceMappingURL=notification.factory.d.ts.map