const Notification = ({ message, isError }) => {
  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const failureStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) {
    return <div></div>;
  }
  return (
    <div className="notification" style={isError ? failureStyle : successStyle}>
      {message}
    </div>
  );
};

export default Notification;
