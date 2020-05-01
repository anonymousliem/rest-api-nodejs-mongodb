import React, { Component } from 'react'
import Menu from '../../menu/menuadmin'
export default class index extends Component {
    componentDidMount(){
        var Role = localStorage.getItem("Role")
        var status = localStorage.getItem("token");
        if(!status){
            alert('harap login terlebih dahulu');
            this.props.history.push('/login');
        }else{
            if(Role !== "admin"){
                alert('anda tidak punya akses ke sini');
                this.props.history.push('/user');
            }
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
