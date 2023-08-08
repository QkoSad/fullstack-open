import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Navigation from "./components/Navigation";

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <div className="container">
      <Router>
        <Navigation user={user} setUser={setUser} />
        <Notification />
        {!user && <Login setUser={setUser} />}
        {user && <Blogs />}
        <Routes>
          <Route path="/" element={<> </>} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
