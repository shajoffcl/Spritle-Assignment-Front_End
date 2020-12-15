import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Snackbar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AgentCreate(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({
    email: "",
    ticket: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (property, event) => {
    const userCopy = { ...user };
    userCopy[property] = event.target.value;
    setUser(userCopy);
  };

  const validate = () => {
    if (user.email === "" || user.ticket === "") {
      window.alert("Please enter required fields");
      return;
    }
    if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email))){
        window.alert("Please enter a valid E-mail");
        return;
    }
    return true;
  };

  const handleCreate = () => {
    if (validate()) {
      Axios.post("http://localhost:8080/agent/create", {
        email: user.email,
        ticket: user.ticket,
      }).then(() => {
        setOpen(true);
      });
    }
    setUser({
      email: "",
      ticket: ""
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a new agent
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(event) => handleChange("email", event)}
              value={user.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="ticket"
              label="Number of Tickets"
              name="ticket"
              onChange={(event) => handleChange("ticket", event)}
              value={user.ticket}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleCreate}
        >
          Add Agent
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Successfully Generated
        </Alert>
      </Snackbar>
    </Container>
  );
}
