import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  BarChart,
  Cell,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { setAmountPredictBarchartActiveID } from '../../actions/presentationBlockActions'

import './AmountPredictBarchart.css'

class AmountPredictBarchart extends Component {
  handleBarClick = data => {
    this.props.setAmountPredictBarchartActiveID(data._id)
  }

  render() {
    const { activeID } = this.props.presentationBlock.amountPredictBarchart
    return (
      <div id="amountPredictBarchart" className="card">
        <p>每小時總車流量預測</p>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={this.props.data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="time"
              interval={10}
              tick={{ transform: 'translate(0, 4)' }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="總車流量" fill="#8884d8" onClick={this.handleBarClick}>
              {this.props.data.map(data => (
                <Cell
                  cursor="pointer"
                  fill={data._id === activeID ? '#82ca9d' : '#8884d8'}
                  key={data._id}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

AmountPredictBarchart.propTypes = {
  data: PropTypes.array.isRequired,
  setAmountPredictBarchartActiveID: PropTypes.func.isRequired,
  presentationBlock: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  presentationBlock: state.presentationBlock,
})

export default connect(mapStateToProps, { setAmountPredictBarchartActiveID })(
  AmountPredictBarchart
)
