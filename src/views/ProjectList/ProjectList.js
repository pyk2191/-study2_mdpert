import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { ProjectToolbar, ProjectTable } from './components';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class ProjectList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      users : []
    };
  };
  
  componentDidMount() {
    axios.get('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/list', {
      headers: {
        "Authorization": window.localStorage.getItem("JWT")
      }
    })
    .then( response => { 
      console.log("SUCCESS  :  :  "+response.data);
      this.setState({ users:response.data });
    }) // SUCCESS
    .catch( response => { 
      console.log("ERROR  :  :  "+response); 
    }); // ERROR
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ProjectToolbar />
        <div className={classes.content}>
          <ProjectTable users={this.state.users} />
        </div>
      </div>
    );
  }
};

ProjectList.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProjectList);
