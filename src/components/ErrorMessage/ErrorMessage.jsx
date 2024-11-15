import errorIcon from "../../assets/error-icon.svg";
import "./error.css";

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-container">
      <img src={errorIcon} className="error-icon" alt="" />
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
