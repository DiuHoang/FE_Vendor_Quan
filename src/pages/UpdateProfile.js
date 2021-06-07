import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SideBar from '../components/SideBar/SideBar';
import axios from 'axios';
import {storage} from '../firebase/index';
class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            phone: "",
            address: "",
            url_avatar: "",
            description: "",
            url_document: "",
            service_category_id:2
        }
        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.id = user[0].id;
        this.handleUpload1 = this.handleUpload1.bind(this);
        this.handleUpload2 = this.handleUpload2.bind(this);
    }
    handleUpload1 = (e) => {
        const files = e.target.files[0]
        const uploadTask = storage.ref(`images/${files.name}`).put(files);
        uploadTask.on('state_changed', 
            () => {
            // complete function ....
            storage.ref('images').child(files.name).getDownloadURL().then(url => {
                this.state.url_avatar = url;
                console.log("avatar:"+this.state.url_avatar);
            })
        });    
    }

    handleUpload2 = (e) => {
        const files = e.target.files[0]
        const uploadTask = storage.ref(`images/${files.name}`).put(files);
        uploadTask.on('state_changed', 
            () => {
            // complete function ....
            storage.ref('images').child(files.name).getDownloadURL().then(url => {
                this.state.url_document = url;
                console.log(url);
            })
        });    
    }

    submit = (event) => {
        event.preventDefault();
        let user_infor = {
            phone: this.state.phone,
            address: this.state.address,
            avatar: this.state.url_avatar,
            description:this.state.description,
            document: this.state.url_document,
            status:"Chờ phê duyệt",
            service_category_id:this.state.service_category_id
        }
        console.log(user_infor);

        axios.patch('vendor_update_profile/'+this.state.id, user_infor)
            .then((res) => {
                alert("Cập nhật thành công!");
                this.props.history.push("/dashboard");
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
                                </span> Cập Nhật Thông Tin Nhà Hàng
                            </h3>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <form className="forms-sample" onSubmit={this.submit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPhone">Số điện thoại</label>
                                        <input type="tel" required className="form-control" id="exampleIn putPhone" name="phone" onChange={e=>this.state.phone= e.target.value}/> 
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputName1">Địa chỉ</label>
                                        <input type="text" required className="form-control" id="exampleIn putName1" name="address" onChange={e=>this.state.address= e.target.value}/> 
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleDescription">Giới thiệu ngắn về cửa hàng</label>
                                        <textarea className="form-control" required id="exampleDescription" name="description" onChange={e=>this.state.description= e.target.value}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputState">Loại sản phẩm</label>
                                        <select class="form-control" name="service_category_id" id ="service_category_id" onChange={e=>this.state.service_category_id= e.target.value}>
                                            <option value="2" >Bánh kem</option>
                                            <option value="1" >Loa máy</option>
                                            <option value="3" >Trang trí</option>
                                            <option value="4" >Thức ăn</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="formFileMultiple" className="form-label">Hình ảnh đại diện</label><br></br>
                                        <input className="form-control" id ="image1" name="image" required type="file" onChange={this.handleUpload1}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="formFileMultiple" className="form-label">Giấy chứng nhận ATTP/Kinh doanh</label><br></br>
                                        <input className="form-control" id ="image1" name="image" required type="file" onChange={this.handleUpload2}/>
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
export default UpdateProfile;