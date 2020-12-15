import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { Snackbar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import {
  MIN_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH
} from "../../../config/config.js";
import {adminDoLogin, adminIsLogin} from "../../../services/authService"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Ticket Booking System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [account, setAccount] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState({ username: "", password: "" });
  const [open, setOpen] = React.useState(false);

  if(adminIsLogin()){
    props.history.push("/admin/dashboard");
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
    validate(property);
  };

  const validate = (property) => {
    property === "username" ? validateUsername() : validatePassword();
  };

  const validateUsername = () => {
    const errorCopy = { ...error };
    if (account.username.includes(" ")) {
      errorCopy.username = "Username cannot contain a space";
    } else if (account.username.length < MIN_USERNAME_LENGTH) {
      errorCopy.username = `Username should be greater than ${MIN_USERNAME_LENGTH} chars`;
    } else {
      errorCopy.username = "";
    }
    setError(errorCopy);
  };

  const validatePassword = () => {
    const errorCopy = { ...error };
    if (account.password.length < MIN_PASSWORD_LENGTH) {
      errorCopy.password = `Password should be greater than ${MIN_PASSWORD_LENGTH} chars`;
    } else {
      errorCopy.password = "";
    }
    setError(errorCopy);
  };
  const handleLogin = () => {
    if(account.username==="" || account.password===""){
      window.alert("Please enter username and password!");
      return
    }
    Axios.post("http://localhost:8080/admin/access",{
      username:account.username,
      password:account.password
    }).then((res)=>{
      adminDoLogin(res.data._id);
      props.history.push("/admin/dashboard")
    },
    ()=>setOpen(true))
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="User-Name"
          name="username"
          autoFocus
          onChange={(event) => handleChange("username", event)}
          value={account.username}
          error={error.username.length > 0}
          helperText={error.username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(event) => handleChange("password", event)}
          value={account.password}
          error={error.password.length > 0}
          helperText={error.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Incorrect username or password
        </Alert>
      </Snackbar>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
