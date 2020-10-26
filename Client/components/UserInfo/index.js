import React,{Component,useState} from 'react';
import Utils from '../Utils';
import { Badge } from 'reactstrap';

export default class UserInfo extends React.Component{
    constructor(props){
        super(props);

        this.state={
            accountAddress:"Login to your Wallet",
            accountBalance:"Login to see balance",
            value:0,
            
        }
    }

async componentDidMount(){
    
    this.fetchAccountAddress();
    this.fetcthAccountBalance();
}

async fetchAccountAddress(){
    const account=await window.tronWeb.trx.getAccount();
    const accountAddress=account.address;
    const accountAddressInBase58=window.tronWeb.address.fromHex(accountAddress);

    this.setState({
        accountAddress:accountAddressInBase58
    })

}


async fetcthAccountBalance(){
    const balanceInSun=await window.tronWeb.trx.getBalance('TZAx5wc61aX5wg232cL5RT9fuVLr8EDEyL');
    const balanceInTRX = window.tronWeb.fromSun(balanceInSun);
    const changeBackToSun=window.tronWeb.toSun(balanceInTRX)

    this.setState({
        accountBalance:balanceInTRX
    })
}
render(){
    const {accountAddress,accountBalance}=this.state;

    return(
   <div>
       <h5>Your Address: <Badge color='secondary'>{accountAddress}</Badge> </h5>

       <br/>
       <h5>Contract Address Amount:<Badge color='secondary'>{accountBalance}</Badge></h5>
   </div>
   
    )
}
}