export declare class EventManager {
    private static instance;
    private events;
    private registeredUsers;
    private constructor();
    static getInstance(): EventManager;
    checkCapacity(eventId: string): Promise<boolean>;
    reserveSpot(userId: string, eventId: string): Promise<boolean>;
    registerEvent(event: any): void;
    getEvent(eventId: string): any;
    getRegisteredUsers(eventId: string): string[];
    suggestEvents(userId: string): Promise<any[]>;
}
//# sourceMappingURL=event.manager.d.ts.map