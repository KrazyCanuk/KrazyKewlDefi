import React from 'react';
import KrazyLogo from './deficon.png';
import './krazyguide.css';

const WEBSTORE_URL='https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const logo=(
    <div className='logo'>
        <img src={KrazyLogo} alt='KKG'/>
        </div>
);

const openTronLinkWallet = () =>{
    window.open(WEBSTORE_URL,'_blank');
};

const TronLinkState = props =>{
    const{
        installed=false
    }= props;

    if(!installed){
        return(
            <center>
            <div className='tronLink' onClick={openTronLinkWallet}>
            <div className='info'>
                <h1><center>TronLink Plugin or TronWallet App required to continue!</center></h1>
                <p>
                If TronLink extension is not installed, No worries because you can get
                one here: 
                <a href={WEBSTORE_URL}>
                    Install from your extension platform
                </a>
                Once installed, return back and refresh this Krazy Page
                </p>
            </div>
            </div>
            </center>
        );
    }

    return(
        <center>
        <div  className='tronLink hover' onClick={openTronLinkWallet}>
            <div className='info'>
                <h1>Login required</h1>
                <p>
                TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your
                    first wallet or decrypt a previously-created wallet.
                </p>
            </div>
        </div>
        </center>
    )
}
export default TronLinkState;
