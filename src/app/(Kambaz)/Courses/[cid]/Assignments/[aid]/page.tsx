"use client";

import { useParams, useRouter } from "next/navigation";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  const isNewAssignment = aid === "new";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState({
    _id: "",
    name: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid as string,
  });

  useEffect(() => {
    if (!isNewAssignment && existingAssignment) {
      setAssignment({
        _id: existingAssignment._id,
        name: existingAssignment.name || "",
        description: existingAssignment.description || "",
        points: existingAssignment.points || 100,
        dueDate: existingAssignment.dueDate || "",
        availableFrom: existingAssignment.availableFrom || "",
        availableUntil: existingAssignment.availableUntil || "",
        course: existingAssignment.course || (cid as string),
      });
    }
  }, [aid, existingAssignment, isNewAssignment, cid]);

  const handleSave = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div>
      <h2 className="mb-4">
        {isNewAssignment ? "New Assignment" : `Editing: ${assignment.name}`}
      </h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.name}
            onChange={(e) =>
              setAssignment({ ...assignment, name: e.target.value })
            }
            placeholder="New Assignment"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="New Assignment Description"
          />
        </Form.Group>

        <Row className="mb-3 align-items-center">
          <Col md={2} className="text-end">
            <Form.Label className="col-form-label">Points</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value),
                })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2} className="text-end">
            <Form.Label className="col-form-label">Assign</Form.Label>
          </Col>
          <Col md={10}>
            <div className="card">
              <div className="card-body">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <strong>Due</strong>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.dueDate}
                    onChange={(e) =>
                      setAssignment({ ...assignment, dueDate: e.target.value })
                    }
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        <strong>Available from</strong>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={assignment.availableFrom}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            availableFrom: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>
                        <strong>Until</strong>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={assignment.availableUntil}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            availableUntil: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Form>

      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}