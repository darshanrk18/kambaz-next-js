"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { FaBook, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import AssignmentsControls from "./AssignmentsControls";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();

  const courseAssignments = assignments.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (assignment: any) => assignment.course === cid
  );

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div>
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {courseAssignments.map((assignment: any) => (
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