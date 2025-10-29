import { rsvpController } from "../controllers/rsvp.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";

export const rsvpRoutes = (req: any, res: any) => {
  const url = req.url;
  const method = req.method;

  // POST /events/:id/rsvp - RSVP to event
  if (url?.startsWith('/events/') && url.endsWith('/rsvp') && method === 'POST') {
    authMiddleware(req, res, () => {
      requireRole(['ATTENDEE', 'ORGANIZER', 'ADMIN'])(req, res, () => {
        const eventId = url.split('/')[2];
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            const { status } = JSON.parse(body);
            const rsvp = await rsvpController.createRSVP(eventId, req.user.id, status);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'RSVP created successfully', rsvp }));
          } catch (error: any) {
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
    authMiddleware(req, res, () => {
      rsvpController.getUserRSVPs(req.user.id)
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
