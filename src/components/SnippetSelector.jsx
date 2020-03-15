import React from "react"

import SnippetSelectorComboBox from "./SnippetSelectorComboBox"
import SnippetCodeDisplayer from "./SnippetCodeDisplayer"

const SnippetSelector = props => {
  return (
    <div className="leftAlign">
      <SnippetSelectorComboBox {...props} />
      <SnippetCodeDisplayer {...props} />
    </div>
  )
}

export default SnippetSelector
