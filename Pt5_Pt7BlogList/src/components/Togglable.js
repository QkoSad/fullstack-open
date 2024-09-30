import { useState } from "react";

const Togglable = ({ children, buttonLabel1, buttonLabel2 = "cancel" }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel1}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{buttonLabel2}</button>
      </div>
    </div>
  );
};

export default Togglable;
