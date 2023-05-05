import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import "./styles/global.css";
import { useContext, useEffect } from "react";
import { AppContext } from "./components/Context/AppContext";

function App() {
  const { setPageLoaded } = useContext(AppContext);

  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, 2000);
  }, [setPageLoaded]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
