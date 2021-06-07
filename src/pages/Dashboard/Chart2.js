import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import axios from 'axios';
export default class Chart2 extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        chart2: []
    };
}

componentDidMount() {
    axios.get('chart2')
    .then(res => {
        this.setState({
          chart2: res.data
        });
    })
    .catch((error) => {
    console.log(error);
    })
}
  render() {
    return (
      <div className="card">
        <div style={{ width: '100%' }}>
          <LineChart
            width={950}
            height={300}
            data={ [
              { name: 'Tháng 1', uv: this.state.chart2.month1 },
              { name: 'Tháng 2', uv: this.state.chart2.month2 },
              { name: 'Tháng 3', uv: this.state.chart2.month3 },
              { name: 'Tháng 4', uv: this.state.chart2.month4 },
              { name: 'Tháng 5', uv: this.state.chart2.month5 },
              { name: 'Tháng 6', uv: this.state.chart2.month6 },
              { name: 'Tháng 7', uv: this.state.chart2.month7 },
              { name: 'Tháng 8', uv: this.state.chart2.month8 },
              { name: 'Tháng 9', uv: this.state.chart2.month9 },
              { name: 'Tháng 10', uv: this.state.chart2.month10 },
              { name: 'Tháng 11', uv: this.state.chart2.month11},
              { name: 'Tháng 12', uv: this.state.chart2.month12}
            ]
            }
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        </div>
      </div>
    );
  }
}
