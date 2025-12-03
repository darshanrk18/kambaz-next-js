"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();

  // Extract the last segment from the pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Capitalize the first letter of the page name
  const pageName = lastSegment
    ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    : "Home";

  return (
    <span>
      {course?.name} &gt; {pageName}
    </span>
  );
}