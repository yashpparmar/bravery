import {Alert} from "react-bootstrap";

const AlertBox = ({alert, setAlert}) => {
  return alert.show && alert.message && alert.variant ? (
    <Alert
      variant={alert.variant || "danger"}
      onClose={() =>
        setAlert({
          show: false,
          message: "",
        })
      }
      dismissible
    >
      {alert.message}
    </Alert>
  ) : null;
};

export default AlertBox;
