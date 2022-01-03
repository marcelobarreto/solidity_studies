import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x27A5ae5B4d2719417b652fc19b967f831F6628f0');

export default instance;
