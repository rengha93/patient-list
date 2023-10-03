import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import classes from './patientlist.module.css';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PatientInfo from './patientinfo/patientinfo';

const PatientList = () => {

  return (
    <div className={classes.patientlistcontainer}>
      <div className={classes.patientlistHeader}>
            <TextField
              fullWidth
              placeholder="Search for anything"
              variant="standard"
              className={classes.noUnderline}
              style={{
                fontSize: '12px',
                padding: '4px 20px'
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{fontSize: '18px'}}/>
                  </InputAdornment>
                ),
              }}
            />
            <div className={classes.drmenu}>
              <Avatar src={'/assets/pexels-kindel-media-8566428.jpg'} className={classes.avatar} />
              <p className={classes.drname}> Dr. Morgan</p>
            </div>
      </div>

      {/* patient subheader */}
      <div className={classes.patientlistsubheader}>
            <div className={classes.patientlistTitle}>
              Patient List
            </div>
            <div className={classes.patientlistInfo}>
                <div className={classes.manageaccount}>
                  <PersonSearchOutlinedIcon />
                </div>
                <p className={classes.time}>5:32:00</p>
                <div className={classes.stopmenu}>
                  <div className={classes.stopIcon}>
                    <StopCircleIcon />
                  </div>
                  <div className={classes.moreIcon}>
                    <MoreHorizIcon />
                  </div>
                </div>
            </div>
      </div>

      {/* patient info table and filter */}
      <PatientInfo />
    </div>
  )
}

export default PatientList;