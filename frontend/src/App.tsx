import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Logout from "./components/Logout/Logout";
import Register from "./pages/Register/Register";
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "/api/isAuthenticated",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            setIsLoggedIn(false);
            console.log("An error occurred.");
          } else {
            const data = await response.json();
            if (data.message === "Authenticated") {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkIsLoggedIn();
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        <Route path="*" element={isLoggedIn ? <Home /> : <Login/>} />
      </Routes>
    </>
  );
}

export default App;
