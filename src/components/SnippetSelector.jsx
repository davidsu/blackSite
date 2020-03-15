import React from "react"

import SnippetSelectorComboBox from "./SnippetSelectorComboBox"
import SnippetCodeDisplayer from "./SnippetCodeDisplayer"

const SnippetSelector = props => {
  return (
    <div style={{ textAlign: "left" }}>
      <SnippetSelectorComboBox {...props} />
      <SnippetCodeDisplayer {...props} />
    </div>
  )
}

export default SnippetSelector
