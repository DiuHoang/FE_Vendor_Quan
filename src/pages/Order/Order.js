import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            orders: [],
            activePage:1,
            itemsCountPerPage:1,
            pageRangeDisplayed: 3,
            totalItemsCount:1
        };
        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.id = user[0].id;
    }

    componentDidMount() {
        axios.get('order_list/'+this.state.id)
        .then(res => {
            this.setState({
                orders: res.data
            });
            console.log(this.state.orders[0].name)
        })
        .catch((error) => {
        console.log(error);
        })
    }
    handlePageChange(pageNumber) {
        console.log("active page is ${pageNumber}");
        axios.get('order_list?page='+pageNumber)
        .then(res => {
            this.setState({
                orders: res.data,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                activePage:res.data.current_page
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }
    render() {
        return (
            <div className="container-scroller">
                <Header/>
                <div className="container-fluid page-body-wrapper">
                    <SideBar/>
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">
                                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                    <i className="mdi mdi-basket menu-icon" />
                                    </span> Quản Lí Nhà Cung Cấp
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span />Tổng Quan <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Danh sách đơn hàng</h4>
                                        <p className="card-description"> (Click vào tên khách hàng để xem chi tiết)
                                        </p>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th> ĐH</th>
                                                    <th> Tên </th>
                                                    <th> Số điện thoại </th>
                                                    <th> Ngày đặt </th>
                                                    <th> Ngày giao </th>
                                                    <th> Địa chị </th>
                                                    <th> Trạng thái </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.orders.map((item,index)=>(
                                                    <tr className="table-info"key={index}>
                                                        <td> ĐH{index+1} </td>
                                                        <td>
                                                            <Link to={{pathname:'/order_detail', state: {vendor_id: this.state.id,id:item.id, name:item.name, phone:item.phone, address:item.address, created_at:item.created_at, order_time:item.order_time, status:item.status, note:item.note}}} className="nav-link">
                                                                {item.name}
                                                            </Link>
                                                        </td>
                                                        <td> {item.phone} </td>
                                                        <td> {item.created_at} </td>
                                                        <td> {item.order_time} </td>
                                                        <td> {item.address} </td>
                                                        <td> {item.status} </td>
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Order;