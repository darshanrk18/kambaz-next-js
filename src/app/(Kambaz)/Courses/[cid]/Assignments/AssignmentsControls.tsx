"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function AssignmentsControls() {
  const { cid } = useParams();
  const router = useRouter();

  return (
    <div className="d-flex justify-content-end mb-3">
      <Button
        variant="danger"
        onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
      >
        <FaPlus className="me-2" />
        Assignment
      </Button>
    </div>
  );
}