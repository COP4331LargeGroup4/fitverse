import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function DailyChecklist() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]); // starts it off with a check at index.
  const array1 = ["ex1", "ex2", "ex3", "ex4"]; // will be the daily exercises

  const handleCheck = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    //alert(new Date()); alert for current date and time
  };

  return (
    <List className={classes.root}>
      {array1.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleCheck(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                color = "primary"
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={` ${value}`} />
          </ListItem>
        );
      })}
    </List>
  );
}