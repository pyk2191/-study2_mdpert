import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  // CardActions,
  Divider,
  IconButton,
  Grid,
  // Button,
  TextField
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserDetail = props => {
  const { history, className } = props;

  const handleBack = () => {
    history.goBack();
  };
  const classes = useStyles();

  const [values, setValues] = useState({
    userNo: '',
    userName: '',
    userPhone: '',
    userEmail: '',
    details: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    let searchUUID=window.location.search.substr('4',window.location.search.length);
    if(searchUUID.length > 0){
      axios.get('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/user/selectUser', {
        params: { // query string
          userNo: searchUUID
        },
        headers: { // 요청 헤더
          "Authorization": window.localStorage.getItem("JWT")
        }
      }).then( response => { 
        
        setValues({
          userNo        : response.data.USER_NO,
          userName			: response.data.NAME,
          userPhone		  : response.data.PHONE,
          userEmail		  : response.data.EMAIL,
          details			  : response.data.DETAILS
        });
      }) // SUCCESS
      .catch( response => { 
        console.log("ERROR  :  :  "+response); 
      }); // ERROR
    }else{

    }
  }, []);

  return (
    <Card className={clsx(classes.root, className)}>
      <form
        autoComplete="off"
        noValidate
      > 
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <CardHeader
          title="지원자 상세"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="성명"
                margin="dense"
                name="userName"
                onChange={handleChange}
                required
                value={values.userName}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="연락처"
                margin="dense"
                name="userPhone"
                onChange={handleChange}
                required
                value={values.userPhone}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="email"
                margin="dense"
                name="userEmail"
                onChange={handleChange}
                type='email'
                required
                value={values.userEmail}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="가용기술"
                margin="dense"
                name="details"
                onChange={handleChange}
                value={values.details}
                variant="outlined"
                multiline
                rows={6} 
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="이력서"
                margin="dense"
                name="file"
                onChange={handleChange}
                value={values.file}
                variant="outlined"
                type="file"
                InputLabelProps={{ shrink: true, }} 
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

UserDetail.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default UserDetail;
