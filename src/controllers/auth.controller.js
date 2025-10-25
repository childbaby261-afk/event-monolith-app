"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jwt_utils_js_1 = require("../utils/jwt.utils.js");
const notification_factory_js_1 = require("../patterns/factory/notification.factory.js");
// Temporary in-memory storage
const temporaryUsers = new Map();
exports.authController = {
    async registerUser(email, password, role = "ATTENDEE") {
        // Check if user already exists
        if (temporaryUsers.has(email)) {
            throw new Error("User already exists");
        }
        // Simple password storage (in production, use bcrypt)
        const user = {
            id: `user-${Date.now()}`,
            email,
            password: password, // In production: await bcrypt.hash(password, 10)
            role,
            createdAt: new Date()
        };
        temporaryUsers.set(email, user);
        // Send welcome notification using Factory Pattern
        const welcomeNotification = notification_factory_js_1.NotificationFactory.createWelcomeNotification();
        await welcomeNotification.send(email, "Welcome to Community Events! Your account has been created.");
        console.log(`✅ User registered: ${email} with role: ${role}`);
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            message: "User registered successfully (Development Mode)"
        };
    },
    async loginUser(email, password) {
        // Find user
        const user = temporaryUsers.get(email);
        if (!user)
            throw new Error("User not found");
        // Simple password check (in production, use bcrypt.compare)
        if (user.password !== password) {
            throw new Error("Invalid credentials");
        }
        // Generate JWT token
        const token = (0, jwt_utils_js_1.generateToken)({
            id: user.id,
            email: user.email,
            role: user.role
        });
        console.log(`✅ User logged in: ${email}`);
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        };
    },
    async getUsers() {
        return Array.from(temporaryUsers.values()).map(user => ({
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }));
    }
};
//# sourceMappingURL=auth.controller.js.map