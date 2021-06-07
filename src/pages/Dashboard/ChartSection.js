import React, { PureComponent } from 'react';
import { PieChart, Pie, Tooltip} from 'recharts';
import axios from 'axios';
export default class ChartSection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        ChartSection: []
    };
}

componentDidMount() {
    axios.get('chart_section')
    .then(res => {
        this.setState({
          ChartSection: res.data
        });
        console.log(this.state.ChartSection.totalLoamay)
    })
    .catch((error) => {
    console.log(error);
    })
}

  render() {
    return (
          <div className="card">
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={
                  [
                    { name: 'Loa Máy', value: this.state.ChartSection.totalLoamay},
                    { name: 'Bánh Kem', value: this.state.ChartSection.totalBanhkem},
                    { name: 'Đồ Trang Trí', value: this.state.ChartSection.totalTrangtri},
                    { name: 'Thức Ăn', value: this.state.ChartSection.totalThucan}
                  ]
                }
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
            <Tooltip />
            </PieChart>
          </div>
    );
  }
}

