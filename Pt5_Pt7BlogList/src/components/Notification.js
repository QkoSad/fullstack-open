import { useSelector} from "react-redux";

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);

  if (!notifications.length) return <></>;

  const style = {listStyleType:'none'}
  return (
    <ul style={style}>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
  );
};

export default Notification;
