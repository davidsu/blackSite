import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

export default ({
  onChange,
  value,
  options,
  label,
  "data-testid": dataTestid
}) => (
  <Autocomplete
    freeSolo
    openOnFocus
    selectOnFocus
    options={options}
    getOptionLabel={option => option}
    data-testid={dataTestid}
    size="small"
    onChange={(e, _value) => {
      onChange(_value)
    }}
    value={value || ""}
    renderInput={params => (
      <TextField
        onChange={({ target }) => {
          onChange(target.value)
        }}
        {...params}
        size="small"
        label={label}
        variant="outlined"
      />
    )}
  />
)
