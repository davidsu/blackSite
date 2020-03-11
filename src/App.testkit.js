import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { createStore } from 'redux'
import { reducer } from './store/reducers'
import { Provider } from 'react-redux'
export default ({snippet = 'dummy', walkmeUrl = 'production'} = {}) => {
  const store = createStore(reducer, {snippet, walkmeUrl})
  const rendered = render(<Provider store={store}><App /></Provider>);
  const getLoadWalkMeButton = () => rendered.getByTestId('loadWalkMeButton')
  const getSnippetTextArea = () => rendered.getByTestId('snippetTextInput')
  const getSnippetSelector = () => rendered.getByTestId('snippetSelector')
  return {
    store,
    rendered,
    getLoadWalkMeButton,
    getSnippetTextArea,
    getSnippetSelector
  }
}
