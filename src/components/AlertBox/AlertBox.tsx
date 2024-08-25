import {Dispatch, FC, SetStateAction} from "react";
import {Alert} from "react-bootstrap";

type TAlert = {
  show: boolean;
  variant: string;
  message: string;
};
interface IAlertBox {
  alert: TAlert;
  setAlert: Dispatch<SetStateAction<TAlert>>;
}

const AlertBox: FC<IAlertBox> = ({alert, setAlert}) => {
  return alert.show && alert.message && alert.variant ? (
    <Alert
      variant={alert.variant as "success" | "danger" | "warning" | "info"}
      onClose={() =>
        setAlert((prev) => ({
          ...prev,
          show: false,
          message: "",
        }))
      }
      dismissible
    >
      {alert.message}
    </Alert>
  ) : null;
};

export default AlertBox;
