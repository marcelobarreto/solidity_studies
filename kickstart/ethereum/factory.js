import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x60a53b732B9ae0618c99bf9D1cfE713701A39E9B');

export default instance;
