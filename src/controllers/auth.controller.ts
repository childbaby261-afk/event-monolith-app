import { generateToken } from "../utils/jwt.utils.js";
import { NotificationFactory } from "../patterns/factory/notification.factory.js";

// Temporary in-memory storage
const temporaryUsers = new Map();

export const authController = {
  async registerUser(email: string, password: string, role: string = "ATTENDEE") {
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
    const welcomeNotification = NotificationFactory.createWelcomeNotification();
    await welcomeNotification.send(email, "Welcome to Community Events! Your account has been created.");

    console.log(`✅ User registered: ${email} with role: ${role}`);
    
    return { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      message: "User registered successfully (Development Mode)"
    };
  },

  async loginUser(email: string, password: string) {
    // Find user
    const user = temporaryUsers.get(email);
    if (!user) throw new Error("User not found");

    // Simple password check (in production, use bcrypt.compare)
    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = generateToken({ 
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
