import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/UseLocalStorage";
import ajax from "../service/fetchservice";

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
    <div>
      <h1>Assignment {assignmentId}</h1>

      {assignment ? (
        <>
          <h3>Status: {assignment.status}</h3>
          <h3>
            GitHub URL:{" "}
            <input
              type="url"
              id="githuburl"
              onChange={(e) => updateAssignment("githuburl", e.target.value)}
              value={assignment.githuburl}
            />
          </h3>
          <h3>
            Branch:{" "}
            <input
              type="text"
              id="branch"
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
            />
          </h3>
          <button onClick={() => save()}>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentView;
