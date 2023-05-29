import { UserRole } from "../schemas/UserRole";

export function matchUserRole(val: string): UserRole {
  switch (val.toUpperCase()) {
    case "COMPANY":
      return "Company";
    default:
      return "Student";
  }
}
