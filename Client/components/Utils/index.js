const contractAddress='contractAddr'

const utils = {
  tronWeb: false,
  contract: false,

  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddress);

  }
}
console.log("Contract loaded..." + contractAddress)
export default utils;
