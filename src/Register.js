import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Login extends Component {
    submit = (e) => {
        e.preventDefault();
        const data = {
            name: this.name,
            email:this.email,
            password:this.password,
            password_confirmation: this.confirm_password
        }

        axios.post('auth/vendorRegister',data)
            .then(() => {
                alert("Đăng kí thành công!");
                this.props.history.push("/");
            }).catch((error) => {
                alert("Vui Kiểm tra lại thông tin đăng nhập!");
                console.log(error);
            })
    }
    render() {
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex align-items-center auth">
                        <div className="row flex-grow">
                            <div className="col-lg-4 mx-auto">
                                <div className="auth-form-light text-left p-5">
                                    <div className="brand-logo">
                                        QueenParty
                                    </div>
                                    <h4>Vui lòng đăng nhập!</h4>
                                    <form className="pt-3" onSubmit={this.submit}>
                                        <div className="form-group">
                                            <input type="text" required className="form-control form-control-lg" id="exampleInputName" placeholder="Tên" 
                                                   name="name" onChange={e=>this.name= e.target.value}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" required className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" 
                                                   name="email" onChange={e=>this.email= e.target.value}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Mật khẩu" 
                                                   name="password" onChange={e=>this.password= e.target.value}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Xác Nhận Mật khẩu" 
                                                   name="confirm_password" onChange={e=>this.confirm_password= e.target.value}/>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">ĐĂNG KÍ</button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light"> Đã có tài khoản? <Link to="/" className="nav-link">Đăng nhập ngay</Link></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;