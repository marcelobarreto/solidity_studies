import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x26FcCBa99b2D0a2Ca881AAb3a4F954a9BCaC4fC2');

export default instance;
