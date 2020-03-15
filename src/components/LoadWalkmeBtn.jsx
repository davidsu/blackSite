import React from "react"
import Button from "@material-ui/core/Button"
import { loadWalkMe } from "../core"

export default () => {
  return (
    <Button
      style={{ width: "50%", marginLeft: "0" }}
      color="primary"
      data-testid="loadWalkMeButton"
      onClick={loadWalkMe}
      variant="contained"
    >
      (RE)LOAD WALKME
    </Button>
  )
}
