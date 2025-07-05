
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/admin", label: "Genel Bakış" },
    { href: "/admin/clients", label: "Danışan Yönetimi" },
    { href: "/admin/appointments", label: "Randevu Yönetimi" },
    { href: "/admin/blog", label: "Blog Yönetimi" },
    { href: "/admin/campaigns", label: "Kampanya" },
];

export function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="mb-8">
            <div className="border-b">
                <div className="-mb-px flex space-x-8" aria-label="Tabs">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                                pathname === link.href
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
