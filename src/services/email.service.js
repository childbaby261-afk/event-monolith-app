"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
exports.emailService = {
    async sendWelcomeEmail(email) {
        console.log(`📧 Welcome email would be sent to: ${email}`);
        console.log(`📧 Mock: "Welcome to Community Events! Your account has been created."`);
        return { success: true, message: "Mock email sent" };
    }
};
//# sourceMappingURL=email.service.js.map