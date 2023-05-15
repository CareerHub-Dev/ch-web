import parseJson from "../json-safe-parse";
import SessionDataSchema from "../schemas/SessionData";
import { type UserRole } from "../schemas/UserRole";

function wrapError<T>(error: T) {
    return {
        error,
    };
}

function sessionMiddleware(
    cookies: Partial<{
        [key: string]: string;
    }>,
    allowedRoles?: Array<UserRole>
) {
    const storedHttpCookie = cookies["ch-http"];
    if (!storedHttpCookie) {
        return wrapError("No cookie found");
    }

    const parsedHttpCookie = parseJson(storedHttpCookie);
    if (!parsedHttpCookie.success) {
        return wrapError("Cookie parse error");
    }

    const sessionData = SessionDataSchema.safeParse(parsedHttpCookie.data);
    if (!sessionData.success) {
        return wrapError("Session data parse error");
    }

    const session = sessionData.data;

    if (allowedRoles !== undefined && !allowedRoles.includes(session.role)) {
        return wrapError("Oh, you do not have the right...");
    }

    return session;
}
export default sessionMiddleware;
