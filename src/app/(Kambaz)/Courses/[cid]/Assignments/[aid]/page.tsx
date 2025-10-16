"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../Database";
import { Form, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div>Assignment with ID {String(aid)} not found.</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Editing Assignment: {assignment.name}</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment.name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={4} defaultValue={assignment.description} />
        </Form.Group>

        <Row className="mb-3 align-items-center">
          <Col md={2} className="text-end">
            <Form.Label className="col-form-label">Points</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control type="number" defaultValue={assignment.points} />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2} className="text-end">
            <Form.Label className="col-form-label">Assign To</Form.Label>
          </Col>
          <Col md={10}>
            <div className="card">
              <div className="card-body">
                <Form.Group>
                  <Form.Label>
                    <strong>Due</strong>
                  </Form.Label>
                  <Form.Control type="date" defaultValue={assignment.endDate} />
                </Form.Group>
                <Row className="mt-3">
                  <Col>
                    <Form.Label>
                      <strong>Available from</strong>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={assignment.startDate}
                    />
                  </Col>
                  <Col>
                    <Form.Label>
                      <strong>Until</strong>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      defaultValue={assignment.endDate}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Form>

      <hr />
      <div className="d-flex justify-content-end">
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <Link
          href={`/Courses/${cid}/Assignments`}
          className="btn btn-danger"
        >
          Save
        </Link>
      </div>
    </div>
  );
}