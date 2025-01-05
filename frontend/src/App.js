import "./App.css";
<<<<<<< Updated upstream
=======
import { useLocalState } from "./util/UseLocalStorage";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import HomePage from "./HomePage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
>>>>>>> Stashed changes

function App() {
  const reqBody = {
    username: "isuranga",
    password: "asdfasdf",
  };

<<<<<<< Updated upstream
  fetch("api/auth/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(reqBody),
  })
    .then((response) => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      const authValue = headers.get("authorization");
      console.log(authValue);
      console.log(body);
    });

  return <div className="App"></div>;
=======
  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       username: "isuranga",
  //       password: "asdfasdf",
  //     };

  //     fetch("api/auth/login", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "post",
  //       body: JSON.stringify(reqBody),
  //     })
  //       .then((response) => Promise.all([response.json(), response.headers]))
  //       .then(([body, headers]) => {
  //         setJwt(headers.get("authorization"));
  //         console.log("WE HAVE JWT: ${jwt}");
  //       });
  //   }
  // }, []);

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
>>>>>>> Stashed changes
}

export default App;
