import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';
import axios from 'axios';
import {storage} from '../../firebase';
class EditProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
           name: this.props.location.state.name,
           picture: this.props.location.state.picture,
           price: this.props.location.state.price,
           discount: this.props.location.state.discount,
           description: this.props.location.state.description,
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
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
            description: this.state.description,
        }

        console.log(product);
        axios.patch('admin_product/'+this.props.location.state.id,product)
            .then((res) => {
                alert("Cập nhật thành công!");
                console.log(res);
                this.props.history.push("/product");
            }).catch((error) => {
                console.log(error);
                alert("Vui lòng cập nhật một vài thông tin!");
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
                                    </span> Quản lí sản phẩm - Cập nhật sản phẩm
                                </h3>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <form className="forms-sample"onSubmit={this.submit}>
                                        <center><img src={this.state.picture} alt="" width={250} height={250}/></center>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputName1">Tên sản phẩm</label>
                                            <input type="text" className="form-control" id="exampleInputName1" name="name" value={this.state.name} onChange={(e) => this.onChangeHandler(e)}/> 
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPrice">Giá sản phẩm</label>
                                            <input type="number" className="form-control" id="exampleInputPrice" name="price" value={this.state.price} onChange={(e) => this.onChangeHandler(e)}/>
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="exampleInputPrice">Khuyến mãi</label>
                                            <input type="number" className="form-control" id="exampleInputPrice" name="discount" value={this.state.discount} onChange={(e) => this.onChangeHandler(e)}/>
                                        </div> */}

                                        <div className="form-group">
                                            <label htmlFor="formFileMultiple" className="form-label">Ảnh sản phẩm</label>
                                            <input className="form-control" type="file" id="formFileMultiple" name="picture" onChange={this.handleUpload}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleDescription">Mô tả</label>
                                            <textarea className="form-control" id="exampleDescription" name="description" value={this.state.description} onChange={(e) => this.onChangeHandler(e)}/>
                                        </div>
                                        <button type="submit" className="btn btn-gradient-primary mr-2">Cập nhật</button>
                                    </form>
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

export default EditProduct;