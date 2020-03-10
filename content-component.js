import React, { Component } from 'react'
import { connect } from 'react-redux'
import {exchangeSelector } from '../store/selectors'
import { loadAllOrders,subscribeToEvents } from '../store/interactions'
import Balance from './Balance'
import  Trades from './Trades'
import OrderBook from './OrderBook'
import PriceChart from './PriceChart'
import MyTransactions from './MyTransactions'
import NewOrder from './NewOrder'



class Content extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props)
  }

  async loadBlockchainData(props) {
    const { dispatch, exchange} = props
    await loadAllOrders(exchange, dispatch)
    await subscribeToEvents(exchange, dispatch)
  }
  render(){
    return (
      <div className="content">
        <div className="vertical-split">
        <Balance />
         <NewOrder/>
         </div>
           <OrderBook />
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">
             <PriceChart />
              </div>
            </div>
            <MyTransactions />
          </div>
          <Trades />

         </div>        
    )  
  }
}

function mapStateToProps(state) {
  return {
   exchange: exchangeSelector(state)
  }
}

export default connect(mapStateToProps)(Content);
