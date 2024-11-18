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
          // Register the service worker
          const registration = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered successfully:", registration);

          // Wait for service worker to be ready
          const readyRegistration = await navigator.serviceWorker.ready;
          console.log("Service Worker is ready:", readyRegistration);

          // Subscribe to push notifications
          const subscription = await readyRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey:
              "BOVlE1Aq0kJ6mmVnBxIGbm-n42eax2uvdsjnvDZ6FMWfOavajJ6XLnndmHOHdhaAJM8lP_8CBMnCTi2VAW5pdVI", // Your VAPID public key
          });
          console.log("Push subscription successful:", subscription);

          // Send subscription to your backend
          await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscribe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          });
        } else {
          console.error(
            "Service Worker or PushManager is not supported in this browser."
          );
        }
      } catch (error) {
        console.error("Error during subscription:", error);
      }
    }

    // Call this function on app load or user login
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
