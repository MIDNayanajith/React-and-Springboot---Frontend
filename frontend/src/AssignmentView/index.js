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
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatus, setAssignmentStatus] = useState([]);

  async function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    await setAssignments(newAssignment);
  }

  function save() {
    console.log(`status is ${assignment.status}`);

    // Ensure the status is updated before submitting
    if (assignment.status === assignmentStatus[0].status) {
      console.log("setting new status to be");
      updateAssignment("status", assignmentStatus[1].status);
    }

    ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
      (assignmentsData) => {
        setAssignments(assignmentsData);
        console.log("Assignment updated:", assignmentsData);
      }
    );
  }

  useEffect(() => {
    ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(
      (assignmentResponse) => {
        let assignmentsData = assignmentResponse.assignment;
        if (assignmentsData.branch === null) assignmentsData.branch = "";
        if (assignmentsData.githuburl === null) assignmentsData.githuburl = "";
        setAssignments(assignmentsData);
        setAssignmentEnums(assignmentResponse.assignmentEnum);
        setAssignmentStatus(assignmentResponse.statusEnums);
        console.log(assignmentResponse.statusEnums);
      }
    );
  }, []);

  useEffect(() => {
    console.log(assignmentEnums);
  }, [assignmentEnums]);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : <></>}
        </Col>

        <Col>
          <Badge pill bg="info" style={{ fontSize: "1em" }}>
            {assignment.status}
          </Badge>
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignement Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                id="assignmentName"
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an Assignment"
                }
                onSelect={(selectedElement) => {
                  updateAssignment("number", selectedElement);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item
                    key={assignmentEnum.assignmentNum}
                    eventKey={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="githuburl">
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

          <Form.Group as={Row} className="mb-3" controlId="branch">
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
