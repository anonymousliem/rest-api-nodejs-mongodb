import React, { Component } from 'react'

export default class index extends Component {
    componentDidMount(){
        var status = localStorage.getItem("token");
        if(!status){
            alert('harap login terlebih dahulu');
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                <p>ini halaman user</p>
            </div>
        )
    }
}
