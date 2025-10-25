"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpRoutes = void 0;
const rsvp_controller_js_1 = require("../controllers/rsvp.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const rsvpRoutes = (req, res) => {
    const url = req.url;
    const method = req.method;
    // POST /events/:id/rsvp - RSVP to event
    if (url?.startsWith('/events/') && url.endsWith('/rsvp') && method === 'POST') {
        (0, auth_middleware_js_1.authMiddleware)(req, res, () => {
            (0, auth_middleware_js_1.requireRole)(['ATTENDEE', 'ORGANIZER', 'ADMIN'])(req, res, () => {
                const eventId = url.split('/')[2];
                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', async () => {
                    try {
                        const { status } = JSON.parse(body);
                        const rsvp = await rsvp_controller_js_1.rsvpController.createRSVP(eventId, req.user.id, status);
                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'RSVP created successfully', rsvp }));
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
    // GET /rsvp/my - Get user's RSVPs
    if (url === '/rsvp/my' && method === 'GET') {
        (0, auth_middleware_js_1.authMiddleware)(req, res, () => {
            rsvp_controller_js_1.rsvpController.getUserRSVPs(req.user.id)
                .then(rsvps => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ rsvps }));
            })
                .catch(error => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            });
        });
        return true;
    }
    return false;
};
exports.rsvpRoutes = rsvpRoutes;
//# sourceMappingURL=rsvp.routes.js.map