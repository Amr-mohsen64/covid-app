import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className=" d-flex align-items-center justify-content-center mt-5">
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/signup" exact element={<SignUp />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
