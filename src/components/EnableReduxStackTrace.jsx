import React from "react"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const EnableReduxStackTrace = ({ setReduxStackTrace, isReduxStackTraceOn }) => {
  const switchControl = (
    <Switch
      checked={isReduxStackTraceOn}
      onChange={() => setReduxStackTrace(!isReduxStackTraceOn)}
      color="primary"
      data-testid="EnableReduxStackTrace"
    />
  )
  return (
    <FormControlLabel
      value="start"
      control={switchControl}
      label="Redux Stack Trace"
      labelPlacement="start"
    />
  )
}

export default EnableReduxStackTrace
