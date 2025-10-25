export interface JWTPayload {
    id: string;
    email: string;
    role: string;
}
export declare function generateToken(payload: JWTPayload): string;
export declare function verifyToken(token: string): JWTPayload | null;
//# sourceMappingURL=jwt.utils.d.ts.map