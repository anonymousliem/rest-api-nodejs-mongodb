import React, { Component } from 'react'
import Menu from '../../menu/menu'

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
            <Menu />
            <p>Halo {localStorage.getItem("username")}, anda login sebagai {localStorage.getItem("Role")} </p>
            </div>
        )
    }
}
