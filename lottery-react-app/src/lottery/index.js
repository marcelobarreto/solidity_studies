import web3 from '../web3';
import abi from './abi';

const address = '0xee5ec556b12D49A990f47Cf48840F37594FF3149';

export default new web3.eth.Contract(abi, address);
