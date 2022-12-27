import { authService } from "fbase";
import { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  const [isInit, setIsInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      if (!isInit) {
        setIsInit(true);
      }
    });
  }, []);

  return (
    <>
      {isInit ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
