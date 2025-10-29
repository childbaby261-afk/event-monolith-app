export declare const eventController: {
    createEvent(eventData: any, userId: string): Promise<any>;
    getEvents(): Promise<{
        id: string;
        title: string;
        capacity: number;
        description: string;
        approved: boolean;
    }[]>;
    updateEvent(eventId: string, updates: any, userId: string, userRole: string): Promise<any>;
    deleteEvent(eventId: string, userId: string, userRole: string): Promise<{
        message: string;
    }>;
    approveEvent(eventId: string): Promise<any>;
};
//# sourceMappingURL=event.controller.d.ts.map