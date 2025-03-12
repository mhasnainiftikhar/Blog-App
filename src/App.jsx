import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import "./App.css";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div>
      <h1 class="text-3xl font-bold text-center text-black-500
        bg-orange-500 p-15 m-15 rounded-lg shadow-lg">
        Hello world! {" "}
      </h1>
    </div>
  ) : null;
}

export default App;
