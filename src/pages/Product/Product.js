import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            activePage:1,
            itemsCountPerPage:1,
            pageRangeDisplayed: 3,
            totalItemsCount:1,
            id:''
        };
        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.id = user[0].id;
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount(){
        axios.get('get_product/'+this.state.id)
        .then(res => {
            this.setState({
                products: res.data.data
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }
    
    handlePageChange(pageNumber) {
        console.log("active page is ${pageNumber}");
        //this.setState({activePage: pageNumber});
        axios.get('get_product/'+this.state.id+'?page='+pageNumber)
        .then(res => {
            this.setState({
                products: res.data.data,
                itemsCountPerPage:res.data.per_page,
                totalItemsCount:res.data.total,
                activePage:res.data.current_page
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }

    deleteProduct(id){
        axios.delete('admin_product/'+id)
            .then((res) => {
                alert("Xóa sản phẩm thành công!");
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
                                    </span> Quản Lí Sản Phẩm
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
                                            Danh sách sản phẩm
                                        </h5>
                                        <nav aria-label="breadcrumb">
                                            <Link to="/add_product" className="nav-link">
                                                <h5 className="page-title">
                                                    Thêm mới
                                                </h5>
                                            </Link>
                                        </nav>
                                    </div>
                                    <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th> ID </th>
                                            <th> Hình ảnh </th>
                                            <th> Tên </th>
                                            <th> Giá </th>
                                            <th> Tác vụ </th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {
                                                this.state.products.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{item.id}</td>
                                                        <td><img src={item.picture}/></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.price.toLocaleString()} VND</td>
                                                        <td><span>
                                                                <button type="submit" onClick={()=>this.deleteProduct(item.id)} className="btn btn-gradient-primary btn-rounded btn-icon"><i className="mdi mdi-delete" /></button>
                                                                <button type="submit" className="btn btn-gradient-primary btn-rounded btn-icon">
                                                                    <Link to={{pathname:'/edit_product', state: {id:item.id, name:item.name, discount:item.discount, price:item.price, service_category_id: item.service_category_id, vendor_id: item.vendor_id, description: item.description, picture:item.picture}}} className="nav-link">
                                                                        <i className="mdi mdi-pot-mix" />
                                                                    </Link>
                                                                </button>
                                                            </span>
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

export default Product;