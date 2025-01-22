import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/UseLocalStorage";
import ajax from "../service/fetchservice";
import {
  Button,
  Form,
  Col,
  Row,
  Container,
  Badge,
  DropdownButton,
  ButtonGroup,
  Dropdown,
} from "react-bootstrap";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignments] = useState({
    branch: "",
    githuburl: "",
  });

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignments(newAssignment);
  }

  function save() {
    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentsData) => {
        setAssignments(assignmentsData);
      }
    );
  }

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentsData) => {
        if (assignmentsData.branch === null) assignmentsData.branch = "";
        if (assignmentsData.githuburl === null) assignmentsData.githuburl = "";
        setAssignments(assignmentsData);
      }
    );
  }, []);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1>Assignment {assignmentId}</h1>
        </Col>

        <Col>
          <Badge pill bg="info" style={{ fontSize: "1em" }}>
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Assignement Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                id="assignmentName"
                variant={"info"}
                title="Assignment 1"
              >
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(
                  (assignmentNum) => (
                    <Dropdown.Item eventKey={assignmentNum}>
                      {assignmentNum}
                    </Dropdown.Item>
                  )
                )}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              GitHub URL:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                id="githuburl"
                onChange={(e) => updateAssignment("githuburl", e.target.value)}
                value={assignment.githuburl}
                placeholder="Enter github url here."
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Branch :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                id="branch"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
                placeholder="Enter branch url here."
              />
            </Col>
          </Form.Group>

          <Button variant="success" onClick={() => save()}>
            Submit Assignment
          </Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default AssignmentView;
