"use client";

import { useParams, useRouter } from "next/navigation";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import * as client from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();

  const isNewAssignment = aid === "new";

  const [assignment, setAssignment] = useState({
    name: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (!isNewAssignment) {
      // For editing existing assignment, you could fetch it from the API
      // For now, we'll rely on the form being empty for new assignments
      // In a complete implementation, add a getAssignment API call here
    }
  }, [aid, isNewAssignment]);

  useEffect(() => {
  const fetchAssignment = async () => {
    if (!isNewAssignment) {
      try {
        const fetchedAssignment = await client.findAssignmentById(
          cid as string,
          aid as string
        );
        setAssignment({
          name: fetchedAssignment.name || "",
          description: fetchedAssignment.description || "",
          points: fetchedAssignment.points || 100,
          dueDate: fetchedAssignment.dueDate || "",
          availableFrom: fetchedAssignment.availableFrom || "",
          availableUntil: fetchedAssignment.availableUntil || "",
        });
      } catch (error) {
        console.error("Error fetching assignment:", error);
      }
    }
  };
  
  fetchAssignment();
}, [aid, cid, isNewAssignment]);

  const handleSave = async () => {
    if (isNewAssignment) {
      await client.createAssignment(cid as string, assignment);
    } else {
      await client.updateAssignment(cid as string, aid as string, assignment);
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