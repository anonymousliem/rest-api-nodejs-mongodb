import React, { Component } from 'react'

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
                <p>INI HALAMAN ADMIN</p>
            </div>
        )
    }
}
