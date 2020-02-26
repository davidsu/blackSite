import React from 'react'
import { sources } from './consts'
import {invert} from 'lodash'

const walkmeCustomeLibUrl = 'walkmeCustomeLibUrl'
const urlSrc = localStorage.getItem('walkmeCustomeLibUrl') || 'production'
class WalkMeUrl extends React.Component {
    constructor() {
        super()
        this.state = {key: invert(sources)[urlSrc] || 'production'}
        this.change = this.change.bind(this)
        this.makeRadio = this.makeRadio.bind(this)
    }
    change(e) {
        const key = e.target.value
        const urlSrc = sources[key]
        if(key === 'production') {
            localStorage.removeItem(walkmeCustomeLibUrl)
            console.log('you are not on local lib')
        } else {
            localStorage.setItem(walkmeCustomeLibUrl, urlSrc)
            console.log('you are on localLib ' + urlSrc)
        }
        this.setState({key})
    }

    makeRadio() {
        return Object.keys(sources).map(value => ( 
            <div key={value}>
                <input 
                    style={{marginTop: '15px', marginRight: '8px'}}
                    type="radio"
                    name="wm_source"
                    onChange={this.change}
                    value={value}
                    checked={value === this.state.key}
                />
                {value}
            </div>
        ))
    }
    render () {
        return (
            <div style={{textAlign: 'left', width: '140px', margin: 'auto'}}>
                {this.makeRadio()}
            </div>
        )
    }
}
export default WalkMeUrl
