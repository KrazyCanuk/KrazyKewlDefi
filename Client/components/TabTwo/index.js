import React from 'react';
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, CardFooter
  } from 'reactstrap';
import Swal from 'sweetalert2';
import UserInfo from '../UserInfo';
import withReactContent from 'sweetalert2-react-content';
import Utils from '../Utils';

const MySwal = withReactContent(Swal);

export default class TabTwo extends React.Component {
constructor(props){
    super(props)
    this.state={
        value:0,
        withdrawValue:0,
        depostValue:0,
        accountAddress: "account address will show up here",
        accountBalance: "account balance will show up here",
        contractBalanceRate:0,
    userPercentRate:0,
    userAvailable:0,
    userTotalDeposits:0,
    userTotalWithdrawn:0,
    userAmountOfDeposits:0,
    userLastDepositTime:0

    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWithdrawChange = this.handleWithdrawChange.bind(this);
    this.handleSubmitWithdraw = this.handleSubmitWithdraw.bind(this);
}

 


handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    if(this.state.value < 100){
        MySwal.fire({
            title:'You need 100 trx to Invest...',
            icon:'error'
        })
    }else{
        alert('at else....')
        this.Invest();
    }
  }

  handleWithdrawChange(event) {
    this.setState({value: event.target.withdrawValue});
  }

  handleSubmitWithdraw(event) {
    alert('A name was submitted: ' + this.state.withdrawValue);
    event.preventDefault();
  }

  async Invest(){
    await Utils.contract.Deposit().send({
        shouldPollResponse: true,
        callValue: this.state.value * 1000000
      }).then(function(res){
        MySwal.fire({
          title:'Transaction Success!'
        })
      }).catch(function(err){
  console.log('Err',err)
      })
  }
  
  async Withdraw(){
  
  var withdrawAmount=this.state.withdrawValue * 1000000
  
    await Utils.contract.Withdraw(withdrawAmount).send({
        shouldPollResponse: true,
        callValue: withdrawAmount
      }).then(function(res){
  console.log(res);
      }).catch(function(err){
  console.log('Err',err)
      })
  }

    render(){
        const { accountAddress, accountBalance } = this.state;

  return (
    <div>
<h4>TRX Investor Plan</h4>
<br/>
  <h5 ><UserInfo/></h5>
<div>
<CardDeck>
      <Card style={{ backgroundColor: '#333', borderColor: '#e60073' }}>
        <CardBody>
          <CardTitle>Why Should I Invest?</CardTitle>
          <CardText>* Unlimited earnings with always growing rates
<br/>* We provide investment conditions with growing percentage,depending on basic interest rate
<br/>* smart-contract total balance bonus and personal "hodl-bonus"
<br/>* Maximal available profit = +200% per every deposit</CardText>
        </CardBody>
      </Card>
      <Card style={{ backgroundColor: '#333', borderColor: '#e60073' }}>
        <CardBody>
          <CardTitle>How Much Do You Want to Invest?</CardTitle>
          <CardText>
              Minimum amount is 100trx
          <form onSubmit={this.handleSubmit}>
        <label>
          Amount of TRX to Invest:<br/>
          <input type="number" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br/>
        <input type="submit" value="Invest" />
      </form>
          </CardText>
          
              <CardText>Withdraw Investment</CardText>
          <form onSubmit={this.handleSubmitWithdraw}>
        <label>
          Amount to Withdraw:<br/>
          <input type="text" value={this.state.withdrawValue} onChange={this.handleWithdrawChange} />
        </label>
        <br/>
        <input type="submit" value="Withdraw" />
      </form>
        </CardBody>
      </Card>
      <Card style={{ backgroundColor: '#333', borderColor: '#e60073' }}>
        <CardBody>
          <CardTitle>Account Info</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
  <CardText></CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </CardDeck>
</div>
    </div>

    
  );
}
}
