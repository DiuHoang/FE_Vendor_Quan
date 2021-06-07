import React, { Component } from 'react';
import axios from 'axios';
class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_card: [], 
            id:''
        };
        var retrievedData = localStorage.getItem("User");
        var user = JSON.parse(retrievedData);
        this.state.id = user[0].id;
        axios.get('total_card/'+this.state.id)
        .then(res => {
            this.setState({
                total_card: res.data
            });
        })
        .catch((error) => {
        console.log(error);
        })
    }
    render() {
        return (
            <div>
                 <div className="row">
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-danger card-img-holder text-white">
                            <div className="card-body">
                                <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                <h4 className="font-weight-normal mb-3">Tổng số khách hàng<i className="mdi mdi-chart-line mdi-24px float-right" />
                                </h4>
                                <h2 className="mb-5">{this.state.total_card.totalUser}</h2>
                            </div>
                        </div>
                    </div>
                <div className="col-md-4 stretch-card grid-margin">
                    <div className="card bg-gradient-info card-img-holder text-white">
                        <div className="card-body">
                            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                            <h4 className="font-weight-normal mb-3">Tổng số đơn hàng<i className="mdi mdi-bookmark-outline mdi-24px float-right" />
                            </h4>
                            <h2 className="mb-5">{this.state.total_card.totalOrder}</h2>
                        </div>
                    </div>
                </div>
                    <div className="col-md-4 stretch-card grid-margin">
                        <div className="card bg-gradient-success card-img-holder text-white">
                        <div className="card-body">
                            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                            <h4 className="font-weight-normal mb-3">Doanh thu<i className="mdi mdi-diamond mdi-24px float-right" />
                            </h4>
                            <h2 className="mb-5">{this.state.total_card.totalRevenue} VND</h2>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;