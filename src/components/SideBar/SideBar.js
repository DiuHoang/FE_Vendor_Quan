import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: ""
        }
        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.name = user[0].name;
        this.state.status = user[0].status;
    }
    handleClick(e) {
        e.preventDefault();
        alert('Tài khoản sẽ được kích hoạt khi admin đã phê duyệt!');
      }
    render() {
        if(this.state.status !== "Đã được phê duyệt"){
            return (
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="nav-profile-image">
                            <img src="assets/images/faces/face1.jpg" alt="profile" />
                            <span className="login-status online" />
                            {/*change to offline or busy as needed*/}
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">{this.state.name}</span>
                            </div>
                        </a>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link" onClick={this.handleClick}>
                                <span className="menu-title">Dashboard</span>
                                <i className="mdi mdi-home menu-icon" />
                            </Link>
                        </li>
    
                        <li className="nav-item">
                            <Link to="#" className="nav-link" onClick={this.handleClick}>
                                <span className="menu-title">Quản Lí Sản Phẩm</span>
                                <i className="mdi mdi-basket menu-icon" />
                            </Link>
                        </li>
    
                        <li className="nav-item">
                            <Link to="#" className="nav-link" onClick={this.handleClick}>
                                <span className="menu-title">Quản Lí Đơn Hàng</span>
                                <i className="mdi mdi-file-document-box menu-icon" />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="#" className="nav-link" onClick={this.handleClick}>
                                <span className="menu-title">Quản Lí Liên Lạc</span>
                                <i className="mdi mdi-phone menu-icon" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        }else{
            return (
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="nav-profile-image">
                            <img src="assets/images/faces/face1.jpg" alt="profile" />
                            <span className="login-status online" />
                            {/*change to offline or busy as needed*/}
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">{this.state.name}</span>
                            </div>
                        </a>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                <span className="menu-title">Dashboard</span>
                                <i className="mdi mdi-home menu-icon" />
                            </Link>
                        </li>
    
                        <li className="nav-item">
                            <Link to="/product" className="nav-link">
                                <span className="menu-title">Quản Lí Sản Phẩm</span>
                                <i className="mdi mdi-basket menu-icon" />
                            </Link>
                        </li>
    
                        <li className="nav-item">
                            <Link to="/order" className="nav-link">
                                <span className="menu-title">Quản Lí Đơn Hàng</span>
                                <i className="mdi mdi-file-document-box menu-icon" />
                            </Link>
                            {/* <div className="collapse show" id="general-pages" style={{}}>
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item"> <Link to="/order" className="nav-link">Đơn hàng mới </Link></li>
                                    <li className="nav-item"> <Link to="/list_order" className="nav-link"> Đơn hàng đang xử lí</Link></li> 
                                    <li className="nav-item"> <Link to="/order_success" className="nav-link"> Đơn hàng thành công</Link></li> 
                                    <li className="nav-item"> <Link to="/order_failed" className="nav-link"> Đơn hàng đã từ chối</Link></li> 
                                </ul>
                            </div> */}
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                <span className="menu-title">Quản Lí Liên Lạc</span>
                                <i className="mdi mdi-phone menu-icon" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            );
        }
        
    }
}
export default SideBar;