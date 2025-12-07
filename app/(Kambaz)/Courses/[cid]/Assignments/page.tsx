"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { FaBook, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as client from "./client";
import AssignmentsControls from "./AssignmentsControls";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    setAssignments(assignments);
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      await client.deleteAssignment(cid as string, assignmentId);
      fetchAssignments();
    }
  };

  return (
    <div>
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0">
        {assignments
          .filter((assignment) => assignment && assignment._id)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <FaBook className="me-2 text-success" />
                <Link
                  href={`/Courses/${cid}/Assignments/${assignment._id}`}
                  className="text-decoration-none"
                >
                  {assignment.name}
                </Link>
              </div>
              <div className="d-flex gap-2">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() =>
                    router.push(`/Courses/${cid}/Assignments/${assignment._id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(assignment._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
