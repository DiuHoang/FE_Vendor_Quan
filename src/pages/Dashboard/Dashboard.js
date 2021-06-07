import React, { Component } from 'react';
import Cards from './Cards';
import ChartSection from './ChartSection';
import Chart2 from './Chart2';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: ""
        }
        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.status = user[0].status;
    }
    render() {
        if(this.state.status !== "Đã được phê duyệt"){
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
                                    <i className="mdi mdi-home" />
                                        </span> Dashboard
                                    </h3>
                                    <nav aria-label="breadcrumb">
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item active" aria-current="page">
                                                <span />Tổng Quan <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <Cards/>
                                <div className="content-wrapper d-flex align-items-center text-center error-page bg-primary">
                                <div className="row flex-grow">
                                    <div className="col-lg-7 mx-auto text-white">
                                    <div className="row align-items-center d-flex flex-row">
                                        <div className="col-lg-6 text-lg-right pr-lg-4">
                                        <h1 className="display-1 mb-0"><i className="mdi mdi-account-remove" /></h1>
                                        </div>
                                        <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                                        <h2>XIN LỖI!</h2>
                                        <h3 className="font-weight-light">
                                            Tài khoản chưa được phê duyệt, vui lòng chờ trong giây lát!
                                        </h3>
                                        </div>
                                    </div>
                                    <div className="row mt-5">
                                        <div className="col-12 mt-xl-2">
                                        <p className="text-white font-weight-medium text-center">
                                            Copyright © QueenParty 2021
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            );
        }

        else{
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
                                        <i className="mdi mdi-home" />
                                            </span> Dashboard
                                        </h3>
                                        <nav aria-label="breadcrumb">
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item active" aria-current="page">
                                                    <span />Tổng Quan <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <Cards/><h4>Người dùng mới</h4>
                                    <Chart2/>
                                </div>
                                <Footer/>
                            </div>
                        </div>
                    </div> 
                );
            }
    }
}

export default Dashboard;