import React, { Component } from 'react'
import Table from './table'
import Menu from '../../menu/menuadmin'
export default class index extends Component {
    render() {
        return (
            <div>
            <Menu />
                <Table />
            </div>
        )
    }
}
