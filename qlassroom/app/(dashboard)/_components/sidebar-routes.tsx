"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from '../../styles/sidebar.module.css';

// Define a type for the route objects
interface Route {
    label: string;
    href: string;
}

const teacherRoutes: Route[] = [
    {
        label: "Course",
        href: "/teacher/courses",
    },
    {
        label: "Analytics",
        href: "/teacher/analytics",
    },
    {
        label: "Manage",
        href: "/teacher/manage",
    }
];

const guestRoutes: Route[] = [
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Course",
        href: "/course", // Fixed typo from "/coures" to "/course"
    },
    {
        label: "Feedback",
        href: "/feedback",
    }
];

// Define props type for SidebarItem
interface SidebarItemProps {
    label: string;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href }) => (
    <Link href={href} className={styles['nav-link']}>
        {label}
    </Link>
);

export const SidebarRoutes = () => { 
    const pathname = usePathname();

    // Check if the current page is part of teacher routes
    const isTeacherPage = pathname?.includes("/teacher");

    // Determine the routes based on user role
    const routes: Route[] = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex space-x-4">
            {routes.map((route, index) => (
                <SidebarItem key={index} label={route.label} href={route.href} />
            ))}
        </div>
    );
};
