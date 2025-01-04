import { useEffect } from "react";
import "./App.css";
import { useLocalState } from "./util/UseLocalStorage";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  useEffect(() => {
    if (!jwt) {
      const reqBody = {
        username: "isuranga",
        password: "asdfasdf",
      };

      fetch("api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(reqBody),
      })
        .then((response) => Promise.all([response.json(), response.headers]))
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
          console.log("WE HAVE JWT: ${jwt}");
        });
    }
  }, []);

  useEffect(() => {
    console.log(`JWT IS : ${jwt}`);
  }, [jwt]);

  return (
    <div className="App">
      <h1>Hello</h1>
      <div>JWT VALUE IS : {jwt}</div>
    </div>
  );
}

export default App;
