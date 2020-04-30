import React from "react"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const IsLocalPrelib = ({ setLocalPrelib, isUsingLocalPrelib }) => {
  const switchControl = (
    <Switch
      checked={isUsingLocalPrelib}
      onChange={() => setLocalPrelib(!isUsingLocalPrelib)}
      label="Lib Version: Paste or Choose"
      color="primary"
      data-testid="IsLocalPrelib"
    />
  )
  return (
    <FormControlLabel
      value="start"
      control={switchControl}
      label="Use Local Prelib"
      labelPlacement="start"
    />
  )
}

export default IsLocalPrelib
