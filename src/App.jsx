import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar/Navbar";

import { useEffect } from "react";
import "./App.css";

const App = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    async function subscribeUser() {
      try {
        if ("serviceWorker" in navigator && "PushManager" in window) {
          const registration = await navigator.serviceWorker.register("/sw.js");

          // Subscribe to push notifications
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: import.meta.env.SUBSCRIPTION_PUBLIC_KEY,
          });

          // Send the subscription to the backend only if it's new
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/v1/subscribe/check`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ endpoint: subscription.endpoint }),
            }
          );

          const { exists } = await response.json();

          if (!exists) {
            // Save the new subscription to the backend
            await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscribe`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(subscription),
            });
          }
        }
      } catch (error) {
        console.error("Error subscribing user:", error);
      }
    }

    subscribeUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
