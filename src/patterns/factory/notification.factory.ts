// Factory Pattern: Notification Factory from your previous design
export interface Notification {
  send(to: string, message: string): Promise<boolean>;
  getType(): string;
}

export class EmailNotification implements Notification {
  async send(to: string, message: string): Promise<boolean> {
    console.log(`📧 EMAIL to ${to}: ${message}`);
    // In real implementation: integrate with Ethereal/Nodemailer
    return true;
  }

  getType(): string {
    return 'EMAIL';
  }
}

export class PushNotification implements Notification {
  async send(to: string, message: string): Promise<boolean> {
    console.log(`📱 PUSH to ${to}: ${message}`);
    // In real implementation: integrate with push service
    return true;
  }

  getType(): string {
    return 'PUSH';
  }
}

export class SMSNotification implements Notification {
  async send(to: string, message: string): Promise<boolean> {
    console.log(`💬 SMS to ${to}: ${message}`);
    // In real implementation: integrate with SMS service
    return true;
  }

  getType(): string {
    return 'SMS';
  }
}

// Notification Factory (from your previous design)
export class NotificationFactory {
  static createNotification(type: 'email' | 'push' | 'sms'): Notification {
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
  static createConfirmationNotification(event: any, isFull: boolean = false) {
    const message = isFull 
      ? `Event "${event.title}" is now full` 
      : `You registered for "${event.title}"`;
    
    return this.createNotification('email');
  }

  static createWelcomeNotification() {
    return this.createNotification('email');
  }
}
