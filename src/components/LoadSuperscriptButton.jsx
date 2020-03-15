import React from "react"
import Button from "@material-ui/core/Button"
import { loadSuperscript } from "../core"

export default () => (
  <Button
  style={{width: "45%", marginRight:"0"}}
    color="secondary"
    data-testid="loadSuperscript"
    onClick={loadSuperscript}
    variant="contained"
  >
    Load Superscript
  </Button>
)
