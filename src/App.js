import { Outlet } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Login from "./components/Login";

function App() {
  const isAuthenticaed = useSelector((store) => store.auth.isAuthenticaed);

  return <div className="">{isAuthenticaed ? <Outlet /> : <Login />}</div>;
}

export default App;
