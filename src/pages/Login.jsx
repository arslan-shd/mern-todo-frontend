import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import "./userform.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  // Subscribe the user for push notifications
  async function subscribeUser() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BOVlE1Aq0kJ6mmVnBxIGbm-n42eax2uvdsjnvDZ6FMWfOavajJ6XLnndmHOHdhaAJM8lP_8CBMnCTi2VAW5pdVI", // Use your VAPID public key
      });

      // Send subscription to your backend
      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    setEmail("");
    setPassword("");
    // Call this function on app load or user login
    subscribeUser();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3 className="user-form-title">Log In</h3>
      <fieldset>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </fieldset>
      <button disabled={isLoading}>Log In</button>
      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default Login;
