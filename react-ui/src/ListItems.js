import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'; //Daniela
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom'

const itemStyle = {
  color: 'white'
}

export const mainListItems = (
  <div>
    <ListItem button component={NavLink} exact path to='/dashboard' style={itemStyle} activeClassName="Mui-selected">
      <ListItemIcon style={itemStyle}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/calendar' style={itemStyle} activeClassName="Mui-selected">
      <ListItemIcon style={itemStyle}>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/exercises' style={itemStyle} activeClassName="Mui-selected">
      <ListItemIcon style={itemStyle}>
        <FitnessCenterIcon />
      </ListItemIcon>
      <ListItemText primary="My Exercises" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/profile' style={itemStyle} activeClassName="Mui-selected">
      <ListItemIcon style={itemStyle}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/' style={{ color: '#990000' }} activeClassName="Mui-selected"
      onClick={() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
      }}
    >
      <ListItemIcon style={{ color: '#990000' }}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
