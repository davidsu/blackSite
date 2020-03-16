import React, { useRef } from "react"
import Button from "@material-ui/core/Button"

export default ({ state, loadConfigFile }) => {
  const fileLoaderElement = useRef(null)
  return (
    <div>
      <Button
        style={{ width: "50%", marginLeft: "0" }}
        color="secondary"
        data-testid="dumpConfigButton"
        variant="contained"
        href={`data:text/plain;charset=utf-8,${JSON.stringify(state, null, 4)}`}
        download="walkmeDeveloperExtensionDumpedConfiguration.json"
      >
        Dump Configuration
      </Button>
      <Button
        style={{ width: "50%", marginLeft: "0" }}
        color="primary"
        data-testid="loadExternalConfigButton"
        variant="contained"
        onClick={() => fileLoaderElement.current.click()}
      >
        Load Configuration
      </Button>
      <input
        ref={fileLoaderElement}
        id="boo"
        type="file"
        name="name"
        style={{ display: "none" }}
        onChange={e => {
          loadConfigFile(e.target.files[0])
          e.target.value = ""
        }}
      />
    </div>
  )
}
