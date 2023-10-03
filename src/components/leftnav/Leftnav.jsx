import React from 'react';
import classes from './leftnav.module.css';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styled from 'styled-components';

const Icon = styled.div`
    margin: 4px;
`;

const IconComponent = ({icon}) => {
    return (
        <Icon>
            {icon}
        </Icon>
    )
}

const Leftnav = () => {
  return (
    <div className={classes.leftnavContainer}>
        <div className={classes.topmenu}>
            <IconComponent icon={<AccountCircleIcon />}/>
            <IconComponent icon={<FormatListBulletedIcon />}/>
            <IconComponent icon={<AccessTimeIcon />}/>
        </div>
        <div className={classes.bottommenu}>
            <IconComponent icon={ <TuneIcon />}/>
            <IconComponent icon={<HelpOutlineIcon />}/>
        </div>
    </div>
  )
}

export default Leftnav