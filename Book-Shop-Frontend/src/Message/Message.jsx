import "./Message.css";

const Message = ({ message, type }) => {
  return message ? <div className={`message ${type}`}>{message}</div> : null;
};

export default Message;
