import {SET_SNIPPET, SET_WALKME_URL} from './actionTypes'
const initialState = {
    snippet: window.localStorage.getItem('snippet') || '',
    walkmeUrl: localStorage.getItem('walkmeCustomeLibUrl') || 'production'
}
const reducer = (state = initialState, action) => {
    //eslint-disable-next-line
    switch(action.type) {
        case SET_SNIPPET: 
            return {...state, snippet: action.payload.replace(/<script.*?>(.*)<\/script>/, '$1')}
        case SET_WALKME_URL: 
            return  {...state, walkmeUrl: action.payload}
    }
    return state
}

export {reducer}
