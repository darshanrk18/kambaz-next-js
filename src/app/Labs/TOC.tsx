"use client";

import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface NavItemConfig {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
  external?: boolean;
}

export default function TOC() {
  const pathname = usePathname();

  const navItems: NavItemConfig[] = useMemo(
    () => [
      {
        href: "/Labs",
        label: "Labs",
        isActive: (path) => {
          const isExactLabsPath = path === "/Labs";
          const isOnAnyLabPage = path.startsWith("/Labs/Lab");
          return isExactLabsPath && !isOnAnyLabPage;
        },
      },
      {
        href: "/Labs/Lab1",
        label: "Lab 1",
        isActive: (path) => path === "/Labs/Lab1" || path.startsWith("/Labs/Lab1/"),
      },
      {
        href: "/Labs/Lab2",
        label: "Lab 2",
        isActive: (path) => path === "/Labs/Lab2" || path.startsWith("/Labs/Lab2/"),
      },
      {
        href: "/Labs/Lab3",
        label: "Lab 3",
        isActive: (path) => path === "/Labs/Lab3" || path.startsWith("/Labs/Lab3/"),
      },
      {
        href: "/Labs/Lab4",
        label: "Lab 4",
        isActive: (path) => path === "/Labs/Lab4" || path.startsWith("/Labs/Lab4/"),
      },
      {
        href: "/",
        label: "Kambaz",
        isActive: (path) => path === "/" || path.startsWith("/Dashboard") || path.startsWith("/Account") || path.startsWith("/Courses"),
      },
      {
        href: "https://github.com/darshanrk18/kambaz-next-js",
        label: "My GitHub",
        isActive: () => false,
        external: true,
      },
    ],
    []
  );

  return (
    <Nav variant="pills">
      {navItems.map((item) => (
        <NavItem key={item.href}>
          {item.external ? (
            <NavLink href={item.href} target="_blank" rel="noopener noreferrer" className={`nav-link ${item.isActive(pathname) ? "active" : ""}`}>
              {item.label}
            </NavLink>
          ) : (
            <NavLink href={item.href} as={Link} className={`nav-link ${item.isActive(pathname) ? "active" : ""}`}>
              {item.label}
            </NavLink>
          )}
        </NavItem>
      ))}
    </Nav>
  );
}
