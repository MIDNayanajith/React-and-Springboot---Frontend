import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/UseLocalStorage";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetch("/api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((assignmentsData) => {
        setAssignments(assignmentsData);
      });
  }, []);

  function createAssignment() {
    fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((assignment) => {
        window.location.href = `assignments/${assignment.id}`;
      });
  }
  return (

    <div>
      <h1>This is dashboard</h1>
      <div>JWT VALUE IS : {jwt}</div>

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
            <div>
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
