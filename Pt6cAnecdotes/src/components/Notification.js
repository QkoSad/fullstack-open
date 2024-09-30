import { useContext } from "react";
import { NotificationContex } from "../notificationContex";

const Notification = () => {
  const [value, dispatch] = useContext(NotificationContex);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!value) return null;

  return <div style={style}>{value}</div>;
};

export default Notification;
