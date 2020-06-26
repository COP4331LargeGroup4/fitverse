import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home'; //Daniela
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom'

export const mainListItems = (
  <div>
    <ListItem button component={NavLink} exact path to='/dashboard' activeClassName="Mui-selected">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/calendar' activeClassName="Mui-selected">
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Calendar" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/profile' activeClassName="Mui-selected">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button component={NavLink} exact path to='/' activeClassName="Mui-selected">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
