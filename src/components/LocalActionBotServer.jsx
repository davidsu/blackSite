import React from "react"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const LocalActionBotServer = ({
  setLocalActionBotServer,
  isLocalActionBotServer
}) => {
  const switchControl = (
    <Switch
      checked={isLocalActionBotServer}
      onChange={() => setLocalActionBotServer(!isLocalActionBotServer)}
      color="primary"
      data-testid="LocalActionBotServer"
    />
  )
  return (
    <FormControlLabel
      value="start"
      control={switchControl}
      label="Local Action Bot Server"
      labelPlacement="start"
    />
  )
}
export default LocalActionBotServer
