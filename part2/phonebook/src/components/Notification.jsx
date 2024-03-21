const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

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

  if (!error) {
    return <div style={successStyle}>{message}</div>;
  } else {
    return <div style={failureStyle}>{message}</div>;
  }
};

export default Notification;
