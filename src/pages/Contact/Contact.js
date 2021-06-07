import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import Pagination from "react-js-pagination";
class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            activePage:1,
            itemsCountPerPage:1,
            pageRangeDisplayed: 3,
            totalItemsCount:1
        };
    }
    
    handlePageChange(pageNumber) {
        console.log("active page is ${pageNumber}");
        //this.setState({activePage: pageNumber});
        axios.get('admin_contact?page='+pageNumber)
        .then(res => {
            this.setState({
                contacts: res.data.data,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                activePage:res.data.current_page
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }


    componentDidMount() {
        axios.get('admin_vendor')
        .then(res => {
            this.setState({
                contacts: res.data.data
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }
    
    deleteContact(id){
        axios.delete('admin_contact/'+id)
            .then((res) => {
                alert("Delete successfully!");
                console.log(res);
                this.componentDidMount();
            }).catch((error) => {
                console.log(error)
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
                                    </span> Quản Lí Liên Lạc
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
                                    <div className="page-header">
                                        <h5 className="page-title">
                                            Danh sách
                                        </h5>
                                    </div>
                                    <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th> STT </th>
                                        <th> Email </th>
                                        <th> Số điện thoại </th>
                                        <th> Tác vụ </th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {
                                                this.state.contacts.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>
                                                            <button type="submit" onClick={()=>this.deleteContact(item.id)} className="btn btn-gradient-primary btn-rounded btn-icon"><i className="mdi mdi-delete" /></button>
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

export default Contact;