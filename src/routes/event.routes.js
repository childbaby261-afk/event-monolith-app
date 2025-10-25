"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = void 0;
const event_controller_js_1 = require("../controllers/event.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const eventRoutes = (req, res) => {
    const url = req.url;
    const method = req.method;
    // GET /events - Public endpoint
    if (url === '/events' && method === 'GET') {
        event_controller_js_1.eventController.getEvents()
            .then(events => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ events }));
        })
            .catch(error => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
        });
        return true;
    }
    // POST /events - Create event (Organizer/Admin only)
    if (url === '/events' && method === 'POST') {
        (0, auth_middleware_js_1.authMiddleware)(req, res, () => {
            (0, auth_middleware_js_1.requireRole)(['ORGANIZER', 'ADMIN'])(req, res, () => {
                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', async () => {
                    try {
                        const eventData = JSON.parse(body);
                        const event = await event_controller_js_1.eventController.createEvent(eventData, req.user.id);
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Event created successfully', event }));
                    }
                    catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: error.message }));
                    }
                });
            });
        });
        return true;
    }
    // PUT /events/:id - Update event
    if (url?.startsWith('/events/') && method === 'PUT') {
        (0, auth_middleware_js_1.authMiddleware)(req, res, () => {
            const eventId = url.split('/')[2];
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', async () => {
                try {
                    const updates = JSON.parse(body);
                    const event = await event_controller_js_1.eventController.updateEvent(eventId, updates, req.user.id, req.user.role);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Event updated successfully', event }));
                }
                catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        });
        return true;
    }
    // PUT /events/:id/approve - Approve event (Admin only)
    if (url?.startsWith('/events/') && url.endsWith('/approve') && method === 'PUT') {
        (0, auth_middleware_js_1.authMiddleware)(req, res, () => {
            (0, auth_middleware_js_1.requireRole)(['ADMIN'])(req, res, () => {
                const eventId = url.split('/')[2];
                event_controller_js_1.eventController.approveEvent(eventId)
                    .then(event => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Event approved successfully', event }));
                })
                    .catch(error => {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: error.message }));
                });
            });
        });
        return true;
    }
    return false;
};
exports.eventRoutes = eventRoutes;
//# sourceMappingURL=event.routes.js.map