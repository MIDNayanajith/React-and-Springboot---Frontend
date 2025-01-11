import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/UseLocalStorage";

const AssignmentView = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [assignment, setAssignments] = useState(null);

  useEffect(() => {
    fetch(`/api/assignments/${assignmentId}`, {
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
  return (
    <div>
      <h1>Assignment {assignmentId}</h1>

      {assignment ? (
        <>
          <h3>Status: {assignment.status}</h3>
          <h3>
            GitHub URL: <input type="url" id="githuburl" />
          </h3>
          <h3>
            Branch: <input type="text" id="branch" />
          </h3>
          <button>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;
