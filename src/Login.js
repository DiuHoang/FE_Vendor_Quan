import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            User: []
        };
    }
    submit = (e) => {
        e.preventDefault();
        const data = {
            email:this.email,
            password:this.password
        }

        axios.post('auth/vendorLogin',data)
            .then((res) => {
                this.setState({
                    User: res.data
                });
                if(this.state.User[0].status === "Chờ phê duyệt"){
                    alert("Chào mừng bạn đến với QueenParty!");
                    localStorage.setItem("User", JSON.stringify(this.state.User));
                    this.props.history.push("/update_profile");
                }else{
                    localStorage.setItem("User", JSON.stringify(this.state.User));
                    alert("Đăng nhập thành công!");
                    this.props.history.push("/dashboard");
                }
               
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
                                        QueenParty - Nhà Cung Cấp
                                    </div>
                                    <h4>Vui lòng đăng nhập!</h4>
                                    <form className="pt-3" onSubmit={this.submit}>
                                        <div className="form-group">
                                            <input type="email" required className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" 
                                                   name="email" onChange={e=>this.email= e.target.value}/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Mật khẩu" 
                                                    name="password" onChange={e=>this.password= e.target.value}/>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">ĐĂNG NHẬP</button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light"> Bạn chưa có tài khoản? <Link to="/register" className="nav-link">Tạo ngay</Link></div>
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