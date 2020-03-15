import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}))

function makeList(qaFeatures, deleteFeature) {
  return qaFeatures.map(feature => (
    <ListItem key={feature}>
      <ListItemText primary={feature} />
      <ListItemSecondaryAction
        onClick={() => {
          debugger
          deleteFeature(feature)
        }}
      >
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))
}
export default function InteractiveList({
  qaFeatures,
  addFeature,
  deleteFeature
}) {
  const classes = useStyles()

  function onKeyUp(e) {
    if (e.key === "Control" || e.key === "Enter") {
      debugger
      addFeature(e.target.value)
      e.target.value = ''
    }  
  }

  return (
    <div className={classes.demo}>
      <TextField
        style={{ width: "95%" }}
        label="Add Qa Feature"
        onKeyUp={onKeyUp}
      />
      <List>{makeList(qaFeatures, deleteFeature)}</List>
    </div>
  )
}
