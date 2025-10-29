export const emailService = {
  async sendWelcomeEmail(email: string) {
    console.log(`📧 Welcome email would be sent to: ${email}`);
    console.log(`📧 Mock: "Welcome to Community Events! Your account has been created."`);
    
    return { success: true, message: "Mock email sent" };
  }
};