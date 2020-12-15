import React, { Component } from "react";
import { Button, Grid } from "@material-ui/core";
import "./home.css";

export default class Home extends Component {
  render() {
    return (
      <div id="home-container">
        <Grid container>
          <Grid item lg={10}>
            <h2>ONLINE TICKET BOOKING</h2>
          </Grid>
          <Grid container item lg={2} justify="space-around">
            <Button variant="outlined" color="primary" onClick={()=>this.props.history.push("/agent/signin")}>
              AGENT
            </Button>
            <Button variant="outlined" color="secondary" onClick={()=>this.props.history.push("/admin/signin")}>
              ADMIN
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
