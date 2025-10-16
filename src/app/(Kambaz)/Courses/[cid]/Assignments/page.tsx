"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaBook } from "react-icons/fa";

export default function Assignments() {
  // 1. Retrieve the course ID from the URL
  const { cid } = useParams();

  // 2. Filter assignments for the current course
  const courseAssignments = db.assignments.filter(
    (assignment) => assignment._id === cid
  );

  return (
    <div>
      <h2>Assignments for Course {cid}</h2>
      <ListGroup className="rounded-0">
        {courseAssignments.map((assignment) => (
          // 3. Render each assignment as a link
          <ListGroupItem key={assignment._id}>
            <FaBook className="me-2 text-success" />
            <Link
              href={`/Courses/${cid}/Assignments/${assignment._id}`}
              className="text-decoration-none"
            >
              {assignment.name}
            </Link>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}