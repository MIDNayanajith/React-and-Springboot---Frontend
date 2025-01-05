import { useEffect } from "react";
import "./App.css";
import { useLocalState } from "./util/UseLocalStorage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard"; // Import your Dashboard component
import HomePage from "./HomePage";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "isuranga",
  //       password: "asdfasdf",
  //     };

  //     fetch("http://localhost:5000/api/auth/login", {
  //       // Replace with your API's base URL
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify(reqBody),
  //     })
  //       .then((response) => Promise.all([response.json(), response.headers]))
  //       .then(([body, headers]) => {
  //         const token = headers.get("authorization");
  //         setJwt(token);
  //         console.log(`WE HAVE JWT: ${token}`); // Corrected template literal
  //       })
  //       .catch((error) => {
  //         console.error("Error during login:", error);
  //       });
  //   }
  // }, [jwt]);

  useEffect(() => {
    console.log(`JWT IS : ${jwt}`);
  }, [jwt]);

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
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
