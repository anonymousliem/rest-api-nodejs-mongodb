import React, { Component } from 'react'

export default class logout extends Component {
    componentDidMount(){
        localStorage.clear();
        this.props.history.push('/login')
    }
    render() {
        
        return (
            <div>
                
            </div>
        )
    }
}
