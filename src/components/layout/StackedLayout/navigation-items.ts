import { type UserRole } from "@/lib/schemas/UserRole";
import {
    Cog6ToothIcon,
    DocumentIcon,
    UserCircleIcon,
    ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

export function getUserMenuLinks(role?: UserRole) {
    switch (role) {
        case "Student":
            return [
                {
                    text: "Мій профіль",
                    Icon: UserCircleIcon,
                    href: "/me",
                },
                {
                    text: "Мої резюме",
                    Icon: DocumentIcon,
                    href: "/my-cvs",
                },
                {
                    text: "Налаштування",
                    Icon: Cog6ToothIcon,
                    href: "/me/edit",
                },
            ];
        case "Company":
            return [
                { text: "Дошка", Icon: ChartBarSquareIcon, href: "/me" },
                {
                    text: "Публічний профіль",
                    Icon: ChartBarSquareIcon,
                    href: "/public-profile",
                },
                {
                    text: "Налаштування",
                    Icon: Cog6ToothIcon,
                    href: "/public-profile/edit",
                },
            ];
        default:
            return [];
    }
}

export function getNavigationLinks(role?: UserRole) {
    switch (role) {
        case "Student":
            return [
                {
                    text: "Стрічка",
                    href: "/posts",
                    exact: true,
                },
                {
                    text: "Вакансії",
                    href: "/job-offers",
                    exact: true,
                },
                {
                    text: "Компанії",
                    href: "/companies",
                    exact: true,
                },
                {
                    text: "Студенти",
                    href: "/students",
                    exact: true,
                },
            ];
        case "Company":
            return [
                {
                    text: "Вакансії",
                    href: "/my-job-offers",
                    exact: true,
                },
                {
                    text: "Публікації",
                    href: "/my-posts",
                    exact: true,
                },
                {
                    text: "Резюме",
                    href: "/cvs",
                    exact: true,
                },
            ];
        default:
            return [];
    }
}
