import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import AdminSignIn from "./components/SignIn/Admin/SignIn";
import AgentSignIn from "./components/SignIn/Agent/SignIn";
import AdminDashBoard from "./components/DashBoard/Admin/Dashboard";
import AgentDashBoard from "./components/DashBoard/Agent/Dashboard";
import EditDetails from "./components/DashBoard/Agent/EditDetails";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin/signin" component={AdminSignIn}/>
        <Route exact path="/agent/signin" component={AgentSignIn}/>
        <Route exact path="/admin/dashboard" component={AdminDashBoard}/>
        <Route exact path="/agent/dashboard" component={AgentDashBoard}/>
        <Route exact path="/agent/edit_details" component={EditDetails}/>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
