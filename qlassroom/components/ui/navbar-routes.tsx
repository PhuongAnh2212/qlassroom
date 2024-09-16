'use client';

import { usePathname } from "next/navigation";
import { LogOut } from 'lucide-react';
import Link from "next/link";
import { Button } from "@nextui-org/button";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    // const router = useRouter();

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/chapter");

    return (
        <div>
            { isTeacherPage || isPlayerPage ? (
                <Link href="/">
                <Button size="sm" variant="light">
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit 
                </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button size="sm" variant="light">
                        Teacher mode
                    </Button>
                </Link>
            )} 
        </div>
    )
}