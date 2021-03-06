import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import './Order.css';
class List_Order_Failed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            activePage:1,
            itemsCountPerPage:1,
            pageRangeDisplayed: 3,
            totalItemsCount:1
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    componentDidMount() {
        axios.get('order_cancel')
        .then(res => {
            this.setState({
                orders: res.data.data 
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }
    
    handlePageChange(pageNumber) {
        console.log("active page is ${pageNumber}");
        //this.setState({activePage: pageNumber});
        axios.get('order_cancel?page='+pageNumber)
        .then(res => {
            this.setState({
                orders: res.data.data,
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
                                    <i className="mdi mdi-file-document-box menu-icon" />
                                    </span> Qu???n L?? ????n H??ng
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span />T???ng Quan<i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">????n h??ng ???? t??? ch???i</h4>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th> ID</th>
                                                    <th> T??n </th>
                                                    <th> S??? ??i???n tho???i </th>
                                                    <th> Th???i gian </th>
                                                    <th> Tr???ng th??i </th>
                                                    <th> Chi ti???t </th>
                                                </tr>
                                                </thead>
                                        <tbody>
                                            {
                                                this.state.orders.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.order_time}</td>
                                                        <td>
                                                            <button type="button" class="btn btn-gradient-info btn-rounded btn-fw">???? b??? t??? ch???i</button>
                                                        </td>
                                                        <td>
                                                            <button type="submit">
                                                                <Link to={{pathname:'/order_detail', state: {id:item.id}}} className="nav-link">
                                                                    <i className="mdi mdi-alert-octagon" />
                                                                </Link>
                                                            </button>
                                                            
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                                        onChange={this.handlePageChange.bind(this)}
                                        itemClass="page-item"
                                        linkClass="page-link "
                                        />
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

export default List_Order_Failed;