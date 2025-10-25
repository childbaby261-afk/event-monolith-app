"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const authRoutes = (req, res) => {
    const url = req.url;
    const method = req.method;
    // Auth routes
    if (url === '/auth/register' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { email, password, role } = JSON.parse(body);
                const result = await auth_controller_js_1.authController.registerUser(email, password, role);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
            catch (error) {
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
                const result = await auth_controller_js_1.authController.loginUser(email, password);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            }
            catch (error) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: error.message }));
            }
        });
        return true;
    }
    if (url === '/auth/users' && method === 'GET') {
        // Protected route - requires authentication
        (0, auth_middleware_js_1.authMiddleware)(req, res, async () => {
            (0, auth_middleware_js_1.requireRole)(['ADMIN'])(req, res, async () => {
                try {
                    const users = await auth_controller_js_1.authController.getUsers();
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ users }));
                }
                catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        });
        return true;
    }
    return false;
};
exports.authRoutes = authRoutes;
//# sourceMappingURL=auth.routes.js.map