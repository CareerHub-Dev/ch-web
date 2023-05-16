import useSession from "@/hooks/useSession";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Fragment, type ReactNode } from "react";
import cn from "classnames";
import Link from "next/link";
import NavigationLink from "./NavigationLink";
import UserAvatar from "./UserAvatar";
import NavigationLinkMobile from "./NavigationLinkMobile";
import AuthLinks from "./AuthLinks";
import AuthLinksMobile from "./AuthLinksMobile";
import { getNavigationLinks, getUserMenuLinks } from "./navigation-items";
import { Background } from "../Background";

export default function StackedLayout(props: { children: ReactNode }) {
    const { pathname, replace } = useRouter();
    const { data: session, status, logout } = useSession();
    const links = getNavigationLinks(session?.role);
    const menuLinks = getUserMenuLinks(session?.role);

    const handleLogoutClick = () => {
        logout();
        replace("/auth/login");
    };

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-white shadow-sm">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Image
                                            className="block h-5 w-auto lg:hidden"
                                            height={20}
                                            width={120}
                                            src="/ch.svg"
                                            alt="CareerHub"
                                        />
                                        <Image
                                            className="hidden h-5 w-auto lg:block"
                                            height={20}
                                            width={120}
                                            src="/ch.svg"
                                            alt="CareerHub"
                                        />
                                    </div>
                                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                        {links.map((link, linkIndex) => (
                                            <NavigationLink
                                                key={linkIndex}
                                                href={link.href}
                                                text={link.text}
                                                isActive={
                                                    link.exact
                                                        ? pathname === link.href
                                                        : pathname.includes(
                                                              link.href
                                                          )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    {status === "authenticated" ? (
                                        <>
                                            <button
                                                type="button"
                                                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu
                                                as="div"
                                                className="relative ml-3"
                                            >
                                                <div>
                                                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                                        <span className="sr-only">
                                                            Open user menu
                                                        </span>
                                                        <UserAvatar />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {menuLinks.map(
                                                            (
                                                                link,
                                                                linkIndex
                                                            ) => (
                                                                <Menu.Item
                                                                    key={
                                                                        linkIndex
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                    }) => (
                                                                        <Link
                                                                            href={
                                                                                link.href
                                                                            }
                                                                            className={cn(
                                                                                active
                                                                                    ? "bg-gray-100"
                                                                                    : "",
                                                                                "block px-4 py-2 text-sm text-gray-700"
                                                                            )}
                                                                        >
                                                                            {
                                                                                link.text
                                                                            }
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                            )
                                                        )}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={
                                                                        handleLogoutClick
                                                                    }
                                                                    className={cn(
                                                                        active
                                                                            ? "bg-gray-100"
                                                                            : "",
                                                                        "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                                                    )}
                                                                >
                                                                    {"Вийти"}
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </>
                                    ) : status === "unauthenticated" ? (
                                        <AuthLinks />
                                    ) : null}
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 pt-2 pb-3">
                                {links.map((link, linkIndex) => (
                                    <NavigationLinkMobile
                                        key={linkIndex}
                                        text={link.text}
                                        href={link.href}
                                        isActive={
                                            link.exact
                                                ? pathname === link.href
                                                : pathname.includes(link.href)
                                        }
                                    />
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 pb-3">
                                {status === "authenticated" ? (
                                    <>
                                        <div className="flex items-center px-4">
                                            <div className="flex-shrink-0">
                                                <UserAvatar />
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-base font-medium text-gray-800">
                                                    {"Username"}
                                                </div>
                                                <div className="text-sm font-medium text-gray-500">
                                                    {"User email"}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <span className="sr-only">
                                                    View notifications
                                                </span>
                                                <BellIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                        <div className="mt-3 space-y-1">
                                            {menuLinks.map(
                                                (link, linkIndex) => (
                                                    <Link
                                                        key={linkIndex}
                                                        href={link.href}
                                                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        {link.text}
                                                    </Link>
                                                )
                                            )}
                                            <button
                                                onClick={handleLogoutClick}
                                                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full text-left"
                                            >
                                                {"Вийти"}
                                            </button>
                                        </div>
                                    </>
                                ) : status === "unauthenticated" ? (
                                    <AuthLinksMobile />
                                ) : null}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <main className="py-10">
                <Background />
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {props.children}
                </div>
            </main>
        </div>
    );
}
