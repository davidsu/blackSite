import React from "react"
import TextField from "@material-ui/core/TextField"
import capitalize from "lodash/capitalize"
import Autocomplete from "./AutoComplete"

const createLabel = (settingType, hasValue) =>
  hasValue
    ? `Custom ${settingType}`
    : `walkme_custom_user_settings_${settingType}`

const UserSettingText = ({ settingType, value, onChange }) => (
  <TextField
    style={{ width: "95%" }}
    label={createLabel(settingType, !!value)}
    value={value || ""}
    onChange={({ target }) => onChange(target.value)}
  />
)

const makeUserSettings = props =>
  ["guid", "url"].map(key => (
    <div key={key}>
      <UserSettingText
        settingType={key}
        onChange={props[`set${capitalize(key)}`]}
        value={props[key]}
      />
      <br />
      <br />
    </div>
  ))

const makeEnvCombo = ({ setEnv, env }) => (
  <Autocomplete
    options={["production", "preview", "play", "test", "success"]}
    value={env || ""}
    onChange={setEnv}
    label={createLabel("env", !!env)}
    data-testid="customUserSettingsEnv"
  />
)
const CustomUserSettings = props => (
  <div>
    {makeUserSettings(props)}
    <br />
    {makeEnvCombo(props)}
    <br />
  </div>
)

export default CustomUserSettings
