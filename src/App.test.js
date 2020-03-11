import * as core from './core'
import testkit from './App.testkit'
import { fireEvent } from '@testing-library/react';
import {snippetFiles} from './consts'

test('should loadWalkMe on btn click', () => {
  const spyLoad = jest.spyOn(core, 'loadWalkMe')
  fireEvent.click(testkit().getLoadWalkMeButton())
  expect(spyLoad).toHaveBeenCalledWith('dummy')
});

test('should show snippet on load', () => {
  const text = testkit({snippet: 'someSnippet'}).getSnippetTextArea()
  expect(text.value).toEqual('someSnippet')
});

fit('should select snippet through select box', () => {
  const spyLoad = jest.spyOn(core, 'loadWalkMe')
  const kit = testkit()
  const snippetSelector = kit.getSnippetSelector()
  debugger
  fireEvent.change(snippetSelector, {target: {value: 'end user IDP' }})
  debugger
  expect(kit.store.getState().snippet).toEqual(snippetFiles['end user IDP'])
  expect(spyLoad).toHaveBeenCalledWith(snippetFiles['end user IDP'])
})
