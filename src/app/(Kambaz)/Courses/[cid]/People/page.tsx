"use client";

import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function PeoplePage() {
  const { cid } = useParams();
  redirect(`/Courses/${cid}/People/Table`);
}