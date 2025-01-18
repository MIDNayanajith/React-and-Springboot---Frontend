import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/UseLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../service/fetchservice";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height for centering
        textAlign: "center", // Center-align text
      }}
    >
      <h1>Welcome To Dashboard</h1>
      <div style={{ margin: "2em" }}>
        {assignments ? (
          assignments.map((assignment) => (
            <div key={assignment.id}>
              <Link to={`/assignments/${assignment.id}`}>
                Assignment Id : {assignment.id}
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}

        <button onClick={() => createAssignment()}>
          {" "}
          Submit new Assignment{" "}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
