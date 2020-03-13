import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#AD4A01',
    padding: '14px 28px',
    'font-size': '16px',
    '&:hover': {
      backgroundColor: '#2f2f2f',
    }
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
          <Button
            className={classes.root}
            size="large"
            data-testid="loadWalkMeButton"
            onClick={() => this.props.loadWalkMe(this.props.snippet)}>
              LOAD WALKME
          </Button>
  )
}
