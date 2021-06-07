import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import {storage} from '../../firebase';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name: "",
            price: "",
            discount:"",
            description:"",
            service_category_id:"",
            vendor_id: "",
            User:[]
        }

        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.id = user[0].id;
        this.state.service_category_id = user[0].service_category_id;
        console.log(this.state.id);
        // axios.get('admin_product/'+this.state.id)
        // .then(res => {
        //     this.state.User = res.data
        //     this.state.service_category_id = this.state.User.service_category_id;
        //     this.state.vendor_id = this.state.User.vendor_id;
        // })
        // .catch((error) => {
        // console.log(error);
        // })

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload = (e) => {
        const files = e.target.files[0]
        const uploadTask = storage.ref(`images/${files.name}`).put(files);
        uploadTask.on('state_changed', 
            () => {
            // complete function ....
            storage.ref('images').child(files.name).getDownloadURL().then(url => {
                this.state.picture = url;
                console.log("avatar:"+this.state.picture);
            })
        });    
    }

    submit = (event) => {
        event.preventDefault();
        let product = {
            name: this.state.name,
            picture: this.state.picture,
            price: this.state.price,
            discount: 0,
            quantity:1,
            description: this.state.description,
            service_category_id: this.state.service_category_id,
            vendor_id: this.state.id
        }
        console.log(product);

        axios.post('admin_product',product)
            .then(() => {
                alert("Thêm sản phẩm thành công!");
                this.props.history.push("/product");
            }).catch((error) => {
                alert("Vui lòng điền thông tin!");
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
                                </span> Quản lí sản phẩm - Thêm mới sản phẩm
                            </h3>
                        </div>
                        <div className="card">
                            <div className="card-body">
                            <form className="forms-sample" onSubmit={this.submit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputName1">Tên sản phẩm</label>
                                        <input type="text" required className="form-control" id="exampleInputName1" name="name" onChange={e=>this.state.name= e.target.value}/> 
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPrice">Giá sản phẩm</label>
                                        <input type="number" required className="form-control" id="exampleInputPrice" name="price" onChange={e=>this.state.price= e.target.value}/>
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="exampleInputDiscount">Khuyến mãi</label>
                                        <input type="number" className="form-control" id="exampleInputDiscount" placeholder="% Khuyến mãi" name="discount" onChange={e=>this.state.discount= e.target.value} min="0" max="100" required="true" message="1-100 là hợp lệ"/>
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="formFileMultiple" className="form-label">Ảnh sản phẩm</label><br></br>
                                        <input className="form-control" name="image" id="image" required type="file" onChange={this.handleUpload}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleDescription">Mô tả</label>
                                        <textarea className="form-control" required id="exampleDescription" name="description" onChange={e=>this.state.description= e.target.value}/>
                                    </div>
                                    <button type="submit" className="btn btn-gradient-primary mr-2">Thêm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </div> 
    )
  }
}

export default AddProduct;