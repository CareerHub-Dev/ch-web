import { z } from 'zod';

const UserRoleSchema = z.enum(['Student', 'Company']);
export default UserRoleSchema;

export type UserRole = z.infer<typeof UserRoleSchema>;
