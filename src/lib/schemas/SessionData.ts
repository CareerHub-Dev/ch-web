import { z } from "zod";
import UserRoleSchema from "./UserRole";

const SessionDataSchema = z.object({
    accountId: z.string(),
    role: UserRoleSchema,
    jwtToken: z.string(),
    jwtTokenExpires: z.string(),
    refreshToken: z.string(),
    refreshTokenExpires: z.string(),
});
export default SessionDataSchema;

export type SessionData = z.infer<typeof SessionDataSchema>;
