import React from "react"
// eslint-disable-next-line camelcase
import { js_beautify } from "js-beautify"
import hljs from "highlight.js/lib/highlight"
import javascript from "highlight.js/lib/languages/javascript"
import "highlight.js/styles/default.css"
import "highlight.js/styles/darkula.css"

hljs.registerLanguage("javascript", javascript)
function getHtml(snippet) {
  const result = {
    __html: hljs.highlight("javascript", js_beautify(snippet)).value
  }
  return result
}

const SnippetCodeDisplayer = ({ snippet, snippetFiles }) => (
  <pre className="prettyprint lang-js">
    <code
      data-testid="snippetTextInput"
      dangerouslySetInnerHTML={getHtml(
        snippet || snippetFiles.snippetOnPage || ""
      )}
    />
  </pre>
)

export default SnippetCodeDisplayer
