import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3)
  }
}));

const ProjectDetail = props => {
  const { history, className } = props;

  const handleBack = () => {
    history.goBack();
  };
  
  const classes = useStyles();

  const [values, setValues] = useState({
    id:'',
    projectName: '',
    startDate: '',
    endDate: '',
    orderCompany: '',
    detailContent: '',
    inchargeEmail: '',
    inchargePhone: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  //프로젝트 등록
  const handleCreatProject = event => {
    event.preventDefault();
    axios.post('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/create', {
        "NAME": values.projectName,
        "DETAILS": values.detailContent,
        "OWNER": values.orderCompany,
        "CONTACT_EMAIL": values.inchargeEmail,
        "CONTACT_PHONE": values.inchargePhone,
        "PLAN_BEGIN_DT":values.startDate,
        "PLAN_END_DT":values.endDate
      },{
        headers: {
        "Authorization": window.localStorage.getItem("JWT")
      }})
      .then(function (response) {
        history.push('./projectList');
      })
      .catch(function (error) {
        console.log("ERROR  :  :  "+error);
      });

  };

  useEffect(() => {
    let searchUUID=window.location.search.substr('4',window.location.search.length);
    if(searchUUID.length > 0){
      axios.get('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/selectDetail', {
        params: { // query string
          UUID: searchUUID
        },
        headers: { // 요청 헤더
          "Authorization": window.localStorage.getItem("JWT")
        }
      }).then( response => { 
        setValues({
          id				    : response.data.UUID,
          projectName		: response.data.NAME,
          startDate		  : response.data.PLAN_BEGIN_DT,
          endDate			  : response.data.PLAN_END_DT,
          orderCompany	: response.data.OWNER,
          detailContent	: response.data.DETAILS,
          inchargeEmail	: response.data.CONTACT_EMAIL,
          inchargePhone	: response.data.CONTACT_PHONE
        })
        axios.get('http://127.0.0.1:7070/starj-frame-demo/api/jwt/user-type', {
          headers: { // 요청 헤더
            "Authorization": window.localStorage.getItem("JWT")
          }
        }).then( response1 => { 
          if(response1.data === 2){
            document.getElementById("eventBtn1").style.display = 'none';
            document.getElementById("eventBtn2").style.display = 'none';
            document.getElementById("eventBtn3").style.display = 'none';
          }else{
            document.getElementById("eventBtn4").style.display = 'none';
            document.getElementById("eventBtn5").style.display = 'none';
            if(searchUUID.length > 0){
              document.getElementById("eventBtn1").style.display = 'none';
            }
          }
        }).catch(function (error) {
          console.log("ERROR  :  :  "+error);
        });
      }) // SUCCESS
      .catch( response => { 
        console.log("ERROR  :  :  "+response); 
      }); // ERROR
    }else{
      document.getElementById("eventBtn2").style.display = 'none';
      document.getElementById("eventBtn4").style.display = 'none';
      document.getElementById("eventBtn5").style.display = 'none';
    }
  }, []);

  //프로젝트 수정
  const handleUpdataDetail = event => {
    axios.put('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/update', {
      "UUID": values.id,
      "NAME": values.projectName,
      "DETAILS": values.detailContent,
      "OWNER": values.orderCompany,
      "CONTACT_EMAIL": values.inchargeEmail,
      "CONTACT_PHONE": values.inchargePhone,
      "PLAN_BEGIN_DT":values.startDate,
      "PLAN_END_DT":values.endDate
    },{
    headers: {
      "Authorization": window.localStorage.getItem("JWT")
    }})
    .then(function (response) {
      alert("성공");
    })
    .catch(function (error) {
      console.log("ERROR  :  :  "+error);
    });
  }

  //프로젝트 삭제
  const handleDeleteDetail = event => {
    let searchUUID=window.location.search.substr('4',window.location.search.length);
    axios.delete('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/delete', {
      params: { // query string
        UUID: searchUUID
      },
      headers: { // 요청 헤더
        "Authorization": window.localStorage.getItem("JWT")
      }
    }).then(function (response) {
      history.push('./projectList');
    })
    .catch(function (error) {
      console.log("ERROR  :  :  "+error);
    });
  }


  //프로젝트 지원
  const handleApply = event => {
    alert("?");
    let searchUUID=window.location.search.substr('4',window.location.search.length);
    axios.post('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/apply', {
        UUID: searchUUID
      },{
        headers: {
        "Authorization": window.localStorage.getItem("JWT")
      }})
      .then(function (response) {
      alert("지원 성공")
    })
    .catch(function (error) {
      alert("지원 실패 하였습니다.");
      console.log("ERROR  :  :  "+error);
    });
  }

  //지원 삭제
  const handleApplyDelete = event => {
    let searchUUID=window.location.search.substr('4',window.location.search.length);
    axios.delete('http://127.0.0.1:7070/starj-frame-demo/api/portal/app-data/mps/project/deleteApply', {
      params: { // query string
        UUID: searchUUID
      },
      headers: { // 요청 헤더
        "Authorization": window.localStorage.getItem("JWT")
      }
    }).then(function (response) {
      alert("지원취소 성공");
    })
    .catch(function (error) {
      console.log("ERROR  :  :  "+error);
    });
  }

  return (
    <Card className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate onSubmit={handleCreatProject}> 
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <CardHeader title="프로젝트" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="프로젝트명"
                margin="dense"
                name="projectName"
                onChange={handleChange}
                required
                value={values.projectName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={2} xs={5}>
              <TextField
                fullWidth
                type="date" 
                label="프로젝트 시작일"
                margin="dense"
                name="startDate"
                onChange={handleChange}
                required
                value={values.startDate}
                variant="outlined"
                InputLabelProps={{ shrink: true, }}
              />
              </Grid>
            <Grid item md={2} xs={5}>
              <TextField
                fullWidth
                type="date" 
                label="프로젝트 종료일"
                margin="dense"
                name="endDate"
                onChange={handleChange}
                required
                value={values.endDate}
                variant="outlined"
                InputLabelProps={{ shrink: true, }}
              />
            </Grid> 
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="발주처"
                margin="dense"
                name="orderCompany"
                onChange={handleChange}
                required
                value={values.orderCompany}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                id="email"
                label="담당자 email"
                margin="dense"
                name="inchargeEmail"
                onChange={handleChange}
                type='email'
                required
                value={values.inchargeEmail}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="담당자 전화"
                margin="dense"
                name="inchargePhone"
                onChange={handleChange}
                required
                type="text"
                value={values.inchargePhone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="상세내용"
                margin="dense"
                name="detailContent"
                onChange={handleChange}
                value={values.detailContent}
                variant="outlined"
                multiline
                rows={6} 
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
          <div>
            <Button className={classes.button} id="eventBtn1" color="primary" fullWidth size="large" variant="contained" type="submit">
              등록
            </Button>
            <Button className={classes.button} id="eventBtn2"  color="primary" fullWidth size="large" variant="contained" onClick={handleUpdataDetail}>
              수정
            </Button>
            <Button className={classes.button} id="eventBtn3"  color="primary" fullWidth size="large" variant="contained" onClick={handleDeleteDetail}>
              삭제
            </Button>
            <Button className={classes.button} id="eventBtn4"  color="primary" fullWidth size="large" variant="contained" onClick={handleApply}>
              지원
            </Button>
            <Button className={classes.button} id="eventBtn5"  color="primary" fullWidth size="large" variant="contained" onClick={handleApplyDelete}>
              지원 취소
            </Button>
          </div>
      </form>
    </Card>
  );
};

ProjectDetail.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object
};

export default ProjectDetail;
