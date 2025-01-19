import { useEffect } from "react";
import "./App.css";

import { useLocalState } from "./util/UseLocalStorage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard"; // Import your Dashboard component
import HomePage from "./HomePage";
import PrivateRoute from "./PrivateRoute";

import Login from "./Login";
import AssignmentView from "./AssignmentView";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <Routes>
      {/* Correctly pass a JSX element to the element prop */}
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
