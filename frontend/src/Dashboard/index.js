import React from "react";
import { useLocalState } from "../util/UseLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

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
        <button onClick={() => createAssignment()}>
          {" "}
          Submit new Assignment{" "}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
