import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/UseLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../service/fetchservice";
import Card from "react-bootstrap/Card";
import { Badge, Button } from "react-bootstrap";
const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    ajax("/api/assignments", "GET", jwt).then((assignmentsData) => {
      setAssignments(assignmentsData);
    });
  }, []);

  function createAssignment() {
    ajax("api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `assignments/${assignment.id}`;
    });
  }

  return (
    <div style={{ margin: "2em" }}>
      <h2>Welcome To Dashboard</h2>
      <div className="mb-5 me-3 mt-3">
        <Button variant="success" onClick={() => createAssignment()}>
          Submit new Assignment
        </Button>
      </div>

      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fit,18rem)" }}
        >
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              style={{ width: "18rem", height: "18rem" }}
            >
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment#{assignment.number}</Card.Title>
                <div className="d-flex align-items-start">
                  <Badge pill bg="info" style={{ fontSize: "1em" }}>
                    {assignment.status}
                  </Badge>
                </div>
                <Card.Text style={{ marginTop: "1rem" }}>
                  <div>
                    <b>GitHub URL: {assignment.githuburl}</b>
                  </div>
                  <div>
                    <b>Branch : {assignment.branch}</b>
                  </div>
                </Card.Text>

                <Button
                  onClick={() => {
                    window.location.href = `/assignments/${assignment.id}`;
                  }}
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
