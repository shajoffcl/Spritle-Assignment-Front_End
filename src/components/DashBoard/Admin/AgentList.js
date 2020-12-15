import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from "@material-ui/core";
import Axios from "axios";
import Title from './Title';


export default function AgentList(props) {
  const [agentList, setAgentList]=React.useState([]);
  React.useEffect(()=>{
    const id=setInterval(()=>{
      Axios.get("http://localhost:8080/agent/list")
    .then(response=>{
      setAgentList(response.data);
    });
    }, 500)
    return()=>{
      clearInterval(id);
    }
  },[]);

  const agreeOrNot=()=>{
    return window.confirm("Are you sure!");
  }
  const handleDelete=(id)=>{
    if(agreeOrNot()){
      Axios.delete("http://localhost:8080/agent/delete/"+id)
      .then((res)=>console.log(res));
    }
  }

  return (
    <React.Fragment>
      <Title>Agent List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Tickets</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agentList.map((agent) => (
            <TableRow key={agent._id}>
              <TableCell>{agent._id}</TableCell>
              <TableCell>{agent.username}</TableCell>
              <TableCell>{agent.email}</TableCell>
              <TableCell>{agent.ticket}</TableCell>
              <TableCell><Button onClick={()=>handleDelete(agent._id)}><DeleteIcon/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}