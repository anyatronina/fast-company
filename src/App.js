import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import EditUserPage from "./components/page/editUserPage";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";

function App() {
  return (
    <div>
      <NavBar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/users/:userId?/edit" component={EditUserPage} />
            <Route path="/users/:userId?" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
