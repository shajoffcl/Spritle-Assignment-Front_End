import React from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";
import { agentIsLogin, agentLogOut } from "../../../services/authService";
import {Link} from "react-router-dom";
import "./dashboard.css";

export default function Dashboard(props) {
  const [agentData, setAgentData] = React.useState({});

  if (!agentIsLogin()) {
    props.history.push("/agent/signin");
  }
  
  React.useEffect(() => {
    const id = localStorage.getItem("id");
    Axios.get(`http://localhost:8080/agent/access/${id}`).then((res) => {
      setAgentData(res.data);
    });
  }, []);

  return (
    <div id="container">
      <div id="header">
        <h1>DashBoard</h1>
        <Button variant="contained" onClick={() => agentLogOut(props)}>
          LogOut
        </Button>
      </div>
      <div id="main">
        <div id="profile">
          <h2>Agent Profile</h2>
          <div id="profile-picture">Picture not available</div>
          <div id="profile-details">
            <h3> {!agentData.name ? "Name not available" : agentData.name}</h3>
            <p>{agentData.username}</p>
            <p>
              {!agentData.contact ? "Contact not available" : agentData.contact}
            </p>
            <p>{agentData.email}</p>
            <p>
              {!agentData.address ? "Address not available" : agentData.address}
            </p>
            <Link to="/agent/edit_details">Edit details</Link>
          </div>
        </div>
        <div id="seats-configuration"></div>
      </div>
      <footer></footer>
    </div>
  );
}
