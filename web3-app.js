import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar'
import Content from './Content'
import { connect } from 'react-redux'
import {
   loadWeb3, 
   loadAccount, 
   loadToken, 
   loadExchange 
 } from '../store/interactions'
 import { contractsLoadedSelector } from '../store/selectors'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData(this.props.dispatch)
  }
  async loadBlockchainData(dispatch){
    const web3 = loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    //console.log("networkId", networkId)
    await loadAccount(web3, dispatch)
    //console.log("abi", Token.abi)
    //console.log("address", Token.networks[networkId].address)
    //console.log("accounts", accounts)
   
    const token = await loadToken(web3, networkId, dispatch)
    if(!token){
      window.alert('Token SmartContract not detected on the current network. Please select another network with Metamask.')
      return
    }     
    const exchange = loadExchange(web3, networkId, dispatch)
    if(!exchange){
      window.alert('Exchange SmartContract not detected on the current network. Please select another network with Metamask.')
      return
    }     
  }

  render() {
    return (
      <div>
        <Navbar/>
        { this.props.contractsLoaded ? <Content/> : <div className="content"></div> }
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return {
   contractsLoaded: contractsLoadedSelector(state)
  }
}

export default connect(mapStateToProps)(App)
