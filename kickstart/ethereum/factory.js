import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0xE28af96C6F07d61317AcF38Aced74399d06719fB');

export default instance;
