import { eventController } from "../controllers/event.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";

export const eventRoutes = (req: any, res: any) => {
  const url = req.url;
  const method = req.method;

  // GET /events - Public endpoint
  if (url === '/events' && method === 'GET') {
    eventController.getEvents()
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
    authMiddleware(req, res, () => {
      requireRole(['ORGANIZER', 'ADMIN'])(req, res, () => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            const eventData = JSON.parse(body);
            const event = await eventController.createEvent(eventData, req.user.id);
            
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Event created successfully', event }));
          } catch (error: any) {
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
    authMiddleware(req, res, () => {
      const eventId = url.split('/')[2];
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const updates = JSON.parse(body);
          const event = await eventController.updateEvent(eventId, updates, req.user.id, req.user.role);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Event updated successfully', event }));
        } catch (error: any) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    });
    return true;
  }

  // PUT /events/:id/approve - Approve event (Admin only)
  if (url?.startsWith('/events/') && url.endsWith('/approve') && method === 'PUT') {
    authMiddleware(req, res, () => {
      requireRole(['ADMIN'])(req, res, () => {
        const eventId = url.split('/')[2];
        eventController.approveEvent(eventId)
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
