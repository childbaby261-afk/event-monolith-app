export declare const rsvpController: {
    createRSVP(eventId: string, userId: string, status?: string): Promise<{
        id: string;
        eventId: string;
        userId: string;
        status: string;
        createdAt: string;
    }>;
    getUserRSVPs(userId: string): Promise<{
        id: string;
        eventId: string;
        userId: string;
        status: string;
        event: {
            id: string;
            title: string;
            date: string;
        };
    }[]>;
    updateRSVP(rsvpId: string, status: string, userId: string): Promise<{
        id: string;
        status: string;
        updatedAt: string;
    }>;
};
//# sourceMappingURL=rsvp.controller.d.ts.map