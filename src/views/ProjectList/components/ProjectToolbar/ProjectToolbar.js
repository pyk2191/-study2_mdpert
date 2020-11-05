import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Link } from '@material-ui/core';
import axios from 'axios';
import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const ProjectToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  useEffect(() => {
    axios.get('http://127.0.0.1:7070/starj-frame-demo/api/jwt/user-type', {
      headers: { // 요청 헤더
        "Authorization": window.localStorage.getItem("JWT")
      }
    }).then( response1 => { 
      if(response1.data === 2){
        document.getElementById("button_hint").style.display = 'none';
      }else{
        document.getElementById("button_hint").style.display = 'block';
      }
    }).catch(function (error) {
      console.log("ERROR  :  :  "+error);
    });
  }, []);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Link component={RouterLink} to="/projectDetail" variant="h6" id='button_hint' >
          <Button color="primary" variant="contained">
            프로젝트 등록
          </Button>
        </Link>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  );
};

ProjectToolbar.propTypes = {
  className: PropTypes.string
};

export default ProjectToolbar;
