import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import EditUserPage from "./components/page/editUserPage";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/edit" component={EditUserPage} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Main} />
      </Switch>
    </div>
  );
}

export default App;
