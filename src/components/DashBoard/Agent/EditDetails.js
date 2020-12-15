import React from "react";
import Axios from "axios";
import { Button } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { agentIsLogin, agentLogOut } from "../../../services/authService";
import "./editDetails.css";

function EditDetails(props) {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [open, setOpen] = React.useState(false);

  if (!agentIsLogin()) {
    props.history.push("/agent/signin");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validate = () => {
    if (name === "" || contact === "" || address === "") {
      window.alert("Please fill required detail");
      return;
    }
    return true;
  };

  const handleEdit = () => {
    if (validate()) {
      const id = localStorage.getItem("id");
      Axios.patch(`http://localhost:8080/agent/update/${id}`, {
        name,
        contact,
        address,
      }).then(() => {
        setOpen(true);
      });
      setName("");
      setContact("");
      setAddress("");
    }
  };

  return (
    <div id="container">
      <div id="header">
        <h1>DashBoard</h1>
        <Button variant="contained" onClick={() => agentLogOut(props)}>
          LogOut
        </Button>
      </div>
      <div id="main">
        <div id="form-container">
          <h2>Edit Details</h2>
          <div className="input">
            <div>Name</div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="input">
            <div>Contact</div>
            <input
              type="text"
              name="name"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />
          </div>
          <div className="input">
            <div>Address</div>
            <input
              type="text"
              name="name"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Save Changes
          </Button>
          <Link to="/agent/dashboard">Back to profile</Link>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Successfully Updated
          </Alert>
        </Snackbar>
      </div>
      <footer></footer>
    </div>
  );
}

export default EditDetails;
