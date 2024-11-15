import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import "./userform.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3 className="user-form-title">Sign Up</h3>
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
        <span className="criteria">
          Password must be at least 8 characters.
        </span>
      </fieldset>
      <button disabled={isLoading}>Sign Up</button>
      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default Signup;
