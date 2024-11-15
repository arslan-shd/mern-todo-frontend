import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import "./userform.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    setEmail("");
    setPassword("");
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
