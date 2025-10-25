export declare const authController: {
    registerUser(email: string, password: string, role?: string): Promise<{
        id: string;
        email: string;
        role: string;
        message: string;
    }>;
    loginUser(email: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            role: any;
        };
    }>;
    getUsers(): Promise<{
        id: any;
        email: any;
        role: any;
        createdAt: any;
    }[]>;
};
//# sourceMappingURL=auth.controller.d.ts.map