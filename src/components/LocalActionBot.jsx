import React from "react"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const LocalActionBot = ({ setLocalActionBot, isLocalActionBot }) => {
  const switchControl = (
    <Switch
      checked={isLocalActionBot}
      onChange={() => setLocalActionBot(!isLocalActionBot)}
      color="primary"
      data-testid="LocalActionBot"
    />
  )
  return (
    <FormControlLabel
      value="start"
      control={switchControl}
      label="Local Action Bot"
      labelPlacement="start"
    />
  )
}
export default LocalActionBot
