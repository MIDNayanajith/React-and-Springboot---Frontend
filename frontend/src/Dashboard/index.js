import React from "react";
import { useLocalState } from "../util/UseLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div>
      <h1>This is dashboard</h1>
      <div>JWT VALUE IS : {jwt}</div>
    </div>
  );
};

export default Dashboard;
