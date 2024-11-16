import "./status.css";

const StatusMessage = ({ status, textColor }) => {
  return (
    <div className="status-container">
      <span className={`status ${textColor}`}>{status}</span>
    </div>
  );
};

export default StatusMessage;
