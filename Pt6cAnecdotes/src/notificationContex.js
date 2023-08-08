import { createContext , useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    case "REMOVE":
      return 0;
    default:
      return state;
  }
};
export const NotificationContex = createContext();

export const NotificationContexProvicer = ({children}) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    0
  );
  return (
    <NotificationContex.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContex.Provider>
  );
};
