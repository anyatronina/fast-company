import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import UserPage from "./components/userPage";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:postId" component={UserPage} />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  );
}

export default App;
