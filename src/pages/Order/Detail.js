import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.location.state.id,
            vendor_id: this.props.location.state.vendor_id,
            orders: [],
            name:this.props.location.state.name,
            phone:this.props.location.state.phone,
            address:this.props.location.state.address,
            created_at:this.props.location.state.created_at,
            order_time:this.props.location.state.order_time,
            status:this.props.location.state.status,
            note:this.props.location.state.note,
            total:''
        };
        
        // axios.get('order_detail/'+this.state.id+'/'+this.state.vendor_id)
        // .then(res => {
        //     this.setState({
        //         orders: res.data[0]
        //     });
        //     this.setState({
        //         total: res.data[1]
        //     });
        //     console.log(this.state.total)
        // })
        // .catch((error) => {
        // console.log(error);
        // })
    }
    componentDidMount() {
        axios.get('order_detail/'+this.state.id+'/'+this.state.vendor_id)
        .then(res => {
            this.setState({
                orders: res.data[0]
            });
            this.setState({
                total: res.data[1]
            });
            console.log(this.state.total)
        })
        .catch((error) => {
        console.log(error);
        })
    }
    acceptProduct(id){
        axios.put('admin_order/'+id, {status: "ĐH đang xử lí"})
            .then(() => {
                alert("Đã được phê duyệt!");
                this.componentDidMount();
                this.props.history.push("/order");
            }).catch((error) => {
                console.log(error)
            })
    }

    refusedProduct(id){
        axios.put('admin_order/'+id, {status:"ĐH từ chối"})
            .then(() => {
                alert("Đã hủy đơn hàng!");
                this.componentDidMount();
                this.props.history.push("/order");
            }).catch((error) => {
                console.log(error)
            })
    }
    successProduct(id){
        axios.put('admin_order/'+id, {status:"ĐH thành công"})
            .then(() => {
                alert("Đã hoàn thành đơn hàng thành công!");
                this.componentDidMount();
                this.props.history.push("/order");
            }).catch((error) => {
                console.log(error)
            })
    }
    render() {
        if(this.state.status === "ĐH mới"){
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
                                        </span> Quản Lí Đơn Hàng - Chi Tiết Đơn Hàng
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
                                            <span>
                                                <button type="button" onClick={()=>this.acceptProduct(this.state.id)} className="btn btn-success btn-fw" style={{marginBottom: '20px'}}>Chấp nhận</button>
                                                <button type="button" onClick={()=>this.refusedProduct(this.state.id)} className="btn btn-danger btn-fw" style={{marginLeft: '20px', marginBottom: '20px'}}>Từ chối</button>
                                            </span>
                                            <h4 className="card-title">Thông tin khách hàng</h4>
                                            <p>Họ và tên: {this.state.name}</p>
                                            <p>Số điện thoại: {this.state.phone}</p>
                                            <p>Địa chỉ: {this.state.address}</p>
                                            <p>Ngày đặt hàng: {this.state.created_at}</p>
                                            <p>Ngày giao hàng: {this.state.order_time}</p>
                                            <p>Tình trạng đơn hàng: {this.state.status}</p>
                                            <p>Ghi chú: {this.state.note}</p>
                                            {/* <p>Tổng số tiền đã thanh toán: 23131</p>
                                            <p>Tổng số tiền phải thanh toán:213131</p> */}
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">Danh sách sản phẩm đặt mua</h4>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th> STT</th>
                                                        <th> Tên SP</th>
                                                        <th> Giá  </th>
                                                        <th> Số lượng </th>
                                                        <th> Tổng Tiền </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.orders.map((item,index)=>(
                                                        <tr className="table-info"key={index}>
                                                            <td>{index+1} </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.price.toLocaleString()} </td>
                                                            <td>{item.quantity} </td>
                                                            <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                                    <p></p>
                                                    <h6>Thành tiền: {this.state.total.toLocaleString()} VND</h6>
                                            </table>
                                        </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>  
            );
        }else if(this.state.status === "ĐH đang xử lí"){
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
                                        </span> Quản Lí Đơn Hàng - Chi Tiết Đơn Hàng
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
                                            <span>
                                                <button type="button" onClick={()=>this.successProduct(this.state.id)} className="btn btn-warning btn-fw" style={{marginBottom: '20px'}}>Hoàn Thành</button>
                                            </span>
                                            <h4 className="card-title">Thông tin khách hàng</h4>
                                            <p>Họ và tên: {this.state.name}</p>
                                            <p>Số điện thoại: {this.state.phone}</p>
                                            <p>Địa chỉ: {this.state.address}</p>
                                            <p>Ngày đặt hàng: {this.state.created_at}</p>
                                            <p>Ngày giao hàng: {this.state.order_time}</p>
                                            <p>Tình trạng đơn hàng: {this.state.status}</p>
                                            <p>Ghi chú: {this.state.note}</p>
                                            {/* <p>Tổng số tiền đã thanh toán: 23131</p>
                                            <p>Tổng số tiền phải thanh toán:213131</p> */}
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">Danh sách sản phẩm đặt mua</h4>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th> STT</th>
                                                        <th> Tên SP</th>
                                                        <th> Giá  </th>
                                                        <th> Số lượng </th>
                                                        <th> Khuyến mãi </th>
                                                        <th> Tổng Tiền </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.orders.map((item,index)=>(
                                                        <tr className="table-info"key={index}>
                                                            <td>{index+1} </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.price.toLocaleString()} </td>
                                                            <td>{item.quantity} </td>
                                                            <td>{item.discount} % </td>
                                                            <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                                    <p></p>
                                                    <h6>Thành tiền: {this.state.total.toLocaleString()} VND</h6>
                                            </table>
                                        </div>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </div>  
            );
        }else{
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
                                        </span> Quản Lí Đơn Hàng - Chi Tiết Đơn Hàng
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
                                            <h4 className="card-title">Thông tin khách hàng</h4>
                                            <p>Họ và tên: {this.state.name}</p>
                                            <p>Số điện thoại: {this.state.phone}</p>
                                            <p>Địa chỉ: {this.state.address}</p>
                                            <p>Ngày đặt hàng: {this.state.created_at}</p>
                                            <p>Ngày giao hàng: {this.state.order_time}</p>
                                            <p>Tình trạng đơn hàng: {this.state.status}</p>
                                            <p>Ghi chú: {this.state.note}</p>
                                            {/* <p>Tổng số tiền đã thanh toán: 23131</p>
                                            <p>Tổng số tiền phải thanh toán:213131</p> */}
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">Danh sách sản phẩm đặt mua</h4>
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th> STT</th>
                                                        <th> Tên SP</th>
                                                        <th> Giá  </th>
                                                        <th> Số lượng </th>
                                                        <th> Khuyến mãi </th>
                                                        <th> Tổng Tiền </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.orders.map((item,index)=>(
                                                        <tr className="table-info"key={index}>
                                                            <td>{index+1} </td>
                                                            <td>{item.name}</td>
                                                            <td>{item.price.toLocaleString()} </td>
                                                            <td>{item.quantity} </td>
                                                            <td>{item.discount} % </td>
                                                            <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                                                        </tr>
                                                    ))
                                                    }
                                                </tbody>
                                                    <p></p>
                                                    <h6>Thành tiền: {this.state.total.toLocaleString()} VND</h6>
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
}

export default Detail;