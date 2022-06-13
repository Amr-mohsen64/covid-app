import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignUp from "./components/SignUp";
import { Dashboard } from "./components/dashboard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <div className=" d-flex align-items-center justify-content-center mt-5">
            <AuthProvider>
              <Routes>
                <Route path="/" exact element={<Login />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<SignUp />} />
                <Route path="/dashboard" exact element={<Dashboard />} />
              </Routes>
            </AuthProvider>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
