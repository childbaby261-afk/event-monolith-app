// PHASE 6: SWAGGER DOCUMENTATION ADDED
console.log("🚀 Community Event App - SWAGGER DOCUMENTATION ADDED");

import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { WebSocketService } from './patterns/observer/websocket.service.js';
import { EventManager } from './patterns/singleton/event.manager.js';
import { NotificationFactory } from './patterns/factory/notification.factory.js';
import { authRoutes } from './routes/auth.routes.js';
import { eventRoutes } from './routes/event.routes.js';
import { rsvpRoutes } from './routes/rsvp.routes.js';

// Initialize your patterns
const eventManager = EventManager.getInstance();
const wsService = WebSocketService.getInstance();

// Mock some events for testing
eventManager.registerEvent({
  id: '1',
  title: 'Community Meetup',
  description: 'A great community event',
  capacity: 50,
  date: new Date().toISOString(),
  approved: true
});

eventManager.registerEvent({
  id: '2', 
  title: 'Tech Conference 2024',
  description: 'Annual technology conference',
  capacity: 100,
  date: new Date().toISOString(),
  approved: true
});

console.log("🎉 Systems Initialized:");
console.log("   ⚡ Singleton: Event Manager with 2 events");
console.log("   🔄 Observer: WebSocket Service ready");
console.log("   🏭 Factory: Notification System ready");
console.log("   🔐 Authentication: JWT System ready");
console.log("   📅 Event Management: CRUD Operations ready");
console.log("   👍 RSVP System: Attendee Management ready");
console.log("   📚 Swagger: API Documentation ready");

// Create HTTP server
const server = createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`🌐 ${method} ${url} - Processing request...`);
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Swagger documentation endpoint
  if (url === '/swagger' && method === 'GET') {
    console.log("📚 Serving Swagger documentation");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
<!DOCTYPE html>
<html>
<head>
    <title>Community Event App - API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script>
        SwaggerUIBundle({
            dom_id: '#swagger-ui',
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.presets.standalone
            ],
            url: '/swagger.json',
            docExpansion: 'none',
            operationsSorter: 'alpha'
        });
    </script>
</body>
</html>
    `);
    return;
  }

  // Swagger JSON specification
  if (url === '/swagger.json' && method === 'GET') {
    console.log("📚 Serving Swagger JSON");
    const swaggerSpec = {
      openapi: "3.0.0",
      info: {
        title: "Community Event App API",
        version: "1.0.0",
        description: "A complete event management system with authentication, roles, and real-time updates. Built with design patterns from previous assignment."
      },
      servers: [{ url: "http://localhost:3002", description: "Development Server" }],
      paths: {
        "/": { get: { summary: "API Status", responses: { "200": { description: "API is running" } } } },
        "/health": { get: { summary: "Health Check", responses: { "200": { description: "System status" } } } },
        "/test-patterns": { get: { summary: "Test Design Patterns", responses: { "200": { description: "Patterns status" } } } },
        "/events": { 
          get: { summary: "Get All Events", responses: { "200": { description: "List of approved events" } } },
          post: { 
            summary: "Create Event", 
            security: [{ bearerAuth: [] }],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      capacity: { type: "number" },
                      date: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            },
            responses: { 
              "201": { description: "Event created" },
              "401": { description: "Unauthorized" },
              "403": { description: "Forbidden - insufficient role" }
            } 
          }
        },
        "/auth/register": { 
          post: { 
            summary: "Register User",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: { type: "string", format: "email" },
                      password: { type: "string" },
                      role: { type: "string", enum: ["ATTENDEE", "ORGANIZER", "ADMIN"] }
                    }
                  }
                }
              }
            },
            responses: { 
              "201": { description: "User registered" },
              "400": { description: "Bad request" }
            } 
          } 
        },
        "/auth/login": { 
          post: { 
            summary: "Login User",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      email: { type: "string", format: "email" },
                      password: { type: "string" }
                    }
                  }
                }
              }
            },
            responses: { 
              "200": { description: "Login successful" },
              "401": { description: "Invalid credentials" }
            } 
          } 
        },
        "/events/{id}/rsvp": { 
          post: { 
            summary: "RSVP to Event", 
            security: [{ bearerAuth: [] }],
            parameters: [
              { 
                name: "id", 
                in: "path", 
                required: true,
                schema: { type: "string" },
                description: "Event ID"
              }
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      status: { type: "string", enum: ["GOING", "MAYBE", "NOT_GOING"] }
                    }
                  }
                }
              }
            },
            responses: { 
              "201": { description: "RSVP created" },
              "400": { description: "Event full or not found" },
              "401": { description: "Unauthorized" }
            } 
          }
        },
        "/rsvp/my": { 
          get: { 
            summary: "Get My RSVPs", 
            security: [{ bearerAuth: [] }],
            responses: { 
              "200": { description: "User RSVPs" },
              "401": { description: "Unauthorized" }
            } 
          } 
        }
      },
      components: {
        securitySchemes: {
          bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
        }
      }
    };
    res.writeHead(200, { 'Content-Type': "application/json" });
    res.end(JSON.stringify(swaggerSpec));
    return;
  }

  // Handle authentication routes
  if (authRoutes(req, res)) {
    return;
  }

  // Handle event routes
  if (eventRoutes(req, res)) {
    return;
  }

  // Handle RSVP routes
  if (rsvpRoutes(req, res)) {
    return;
  }

  // Existing routes
  if (url === '/' && method === 'GET') {
    console.log("✅ Serving main endpoint");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ Community Event API - Swagger Documentation ACTIVE!\n\nVisit: http://localhost:3002/swagger\n\nSystems:\n- Singleton: Event Manager\n- Observer: WebSocket Service\n- Factory: Notification System\n- Authentication: JWT System\n- Event Management: CRUD Operations\n- RSVP System: Attendee Management\n- Swagger: API Documentation');
    return;
  }

  if (url === '/health' && method === 'GET') {
    console.log("✅ Serving health check");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: "OK",
      phase: 6,
      timestamp: new Date().toISOString(),
      systems: {
        authentication: "JWT System Ready",
        observer: "WebSocket Real-time Updates",
        factory: "Notification System", 
        singleton: "Event Manager",
        eventManagement: "CRUD Operations Ready",
        rsvpSystem: "Attendee Management Ready",
        documentation: "Swagger API Docs Ready"
      },
      message: "Swagger documentation implemented!"
    }));
    return;
  }

  if (url === '/test-patterns' && method === 'GET') {
    console.log("✅ Testing design patterns");
    const emailNotif = NotificationFactory.createNotification('email');
    const pushNotif = NotificationFactory.createNotification('push');
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      patterns: {
        singleton: "Event Manager initialized with events",
        factory: "Notification Factory working - Email & Push created",
        observer: "WebSocket Service ready for connections",
        authentication: "JWT System ready for authentication",
        eventManagement: "CRUD operations implemented",
        rsvpSystem: "Attendee RSVP management ready"
      },
      testNotifications: [
        emailNotif.getType(),
        pushNotif.getType()
      ]
    }));
    return;
  }

  console.log("❌ 404 - Not Found:", url);
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found - Available endpoints: /, /health, /swagger, /test-patterns, /events, /auth/register, /auth/login, /auth/users, /events/:id/rsvp, /rsvp/my');
});

// WebSocket server (Observer Pattern)
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('👥 New WebSocket connection established');
  wsService.subscribe(ws);
  
  ws.send(JSON.stringify({ 
    type: 'WELCOME', 
    message: 'Connected to real-time event & RSVP updates',
    systems: ['Authentication', 'Observer', 'Factory', 'Singleton', 'Event Management', 'RSVP System', 'Swagger Docs']
  }));

  ws.on('close', () => {
    console.log('👥 WebSocket connection closed');
    wsService.unsubscribe(ws);
  });

  ws.on('message', (message) => {
    console.log('💬 WebSocket message received:', message.toString());
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`\n🎯 SERVER RUNNING: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/swagger`);
  console.log(`\n📍 AVAILABLE ENDPOINTS:`);
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   GET  http://localhost:${PORT}/swagger (API Documentation)`);
  console.log(`   GET  http://localhost:${PORT}/test-patterns`);
  console.log(`   GET  http://localhost:${PORT}/events`);
  console.log(`   POST http://localhost:${PORT}/events (Organizer/Admin)`);
  console.log(`   POST http://localhost:${PORT}/events/:id/rsvp (RSVP to event)`);
  console.log(`   GET  http://localhost:${PORT}/rsvp/my (My RSVPs)`);
  console.log(`   POST http://localhost:${PORT}/auth/register`);
  console.log(`   POST http://localhost:${PORT}/auth/login`);
  console.log(`\n🚀 SWAGGER DOCUMENTATION READY!`);
  console.log(`📋 Visit http://localhost:3002/swagger for API docs`);
});
