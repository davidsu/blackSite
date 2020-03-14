import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './store'
import {loadWalkMe} from './core'
import { Provider } from 'react-redux'
import { INITIALIZE } from './store/actionTypes'

window.store = store
ReactDOM.render(
    (<Provider store={store}>
        <App />
    </Provider>)
    , document.getElementById('root'));
if(window?.chrome?.tabs) {
    window.chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        window.chrome.tabs.sendMessage(tabs[0].id, 'getInitialState', function(response) {
            store.dispatch({type: INITIALIZE, payload: response})
        });
    });
} else { 
    loadWalkMe()
}
