import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([0]);

  useEffect(() => {
    axios.get('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/user/list', {
      headers: {
        "Authorization": window.localStorage.getItem("JWT")
      }
    })
    .then( response => { 
      console.log("SUCCESS  :  :  "+response.data);
      setUsers(response.data);
    }) // SUCCESS
    .catch( response => { 
      console.log("ERROR  :  :  "+response); 
    }); // ERROR
  }, []);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default UserList;
