import { authController } from "../controllers/auth.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";

export const authRoutes = (req: any, res: any) => {
  const url = req.url;
  const method = req.method;

  // Auth routes
  if (url === '/auth/register' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email, password, role } = JSON.parse(body);
        const result = await authController.registerUser(email, password, role);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error: any) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
    return true;
  }

  if (url === '/auth/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email, password } = JSON.parse(body);
        const result = await authController.loginUser(email, password);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error: any) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
    return true;
  }

  if (url === '/auth/users' && method === 'GET') {
    // Protected route - requires authentication
    authMiddleware(req, res, async () => {
      requireRole(['ADMIN'])(req, res, async () => {
        try {
          const users = await authController.getUsers();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ users }));
        } catch (error: any) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    });
    return true;
  }

  return false;
};
