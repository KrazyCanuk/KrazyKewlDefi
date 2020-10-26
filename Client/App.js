import React from 'react';
import logo from './bird.png';
import './App.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TabNav from './TabNav';
import { Component } from 'react';
import TronWeb from 'tronweb';
import Utils from './Utils';
import TronLinkState from './TronLinkState';

const testHost="https://127.0.0.1:8090";
const full='https://api.trongrid.io';

const tronWeb=new TronWeb({
  fullHost:testHost,
  privateKey:'your privatekey'
  })
  
  const issueAddress="yourAddr";
  const contractAddress="contractAddr";

export default class App extends React.Component {
constructor(props){
  super(props)
  this.state={
    value:0,
  
  tronWeb: {
    installed: false,
    loggedIn: false
  },
}

}

async componentDidMount() {
  this.setState({loading:true})

  await new Promise(resolve => {
    const tronWebState = {
      installed: !!window.tronWeb,
      loggedIn: window.tronWeb && window.tronWeb.ready
    };

    if (tronWebState.installed) {
      this.setState({
        tronWeb: tronWebState
      });

      return resolve();
    }

    let tries = 0;

    const timer = setInterval(() => {
      if (tries >= 10) {
        const TRONGRID_API = "https://api.trongrid.io";

        window.tronWeb = new TronWeb(
          TRONGRID_API,
          TRONGRID_API,
          TRONGRID_API
        );

        this.setState({
          tronWeb: {
            installed: false,
            loggedIn: false
          }
        });
        clearInterval(timer);
        return resolve();
      }

      tronWebState.installed = !!window.tronWeb;
      tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

      if (!tronWebState.installed) {
        return tries++;
      }

      this.setState({
        tronWeb: tronWebState
      });

      resolve();
    }, 100);
  });

  if (!this.state.tronWeb.loggedIn) {
    // Set default address (foundation address) used for contract calls
    // Directly overwrites the address object if TronLink disabled the
    // function call
    window.tronWeb.defaultAddress = {
      hex: window.tronWeb.address.toHex(issueAddress),
      base58: issueAddress
    };

    window.tronWeb.on("addressChange", () => {
      if (this.state.tronWeb.loggedIn) {
        return;
      }

      this.setState({
        tronWeb: {
          installed: true,
          loggedIn: true
        }
      });
    });
  }

 await Utils.setTronWeb(window.tronWeb);

}



  render(){
    if(!this.state.tronWeb.installed)return <TronLinkState/>
    if(!this.state.tronWeb.loggedIn)return<TronLinkState installed/>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />      
      </header>
      <TabNav/>
      <hr width="100%" size="8" color="white" align="center"></hr>
      <center><h4>Crypto Prices</h4></center>
      <br/>
    </div>
  );
}
}
