import { useEffect, useState } from 'react';

import './App.css';
import web3 from './web3';
import lottery from './lottery';

function App() {
  const [account, setAccount] = useState('');
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('0');
  const [value, setValue] = useState(0);
  const [lastWinner, setLastWinner] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    web3.eth.getAccounts().then((accounts) => setAccount(accounts[0]));
    lottery.methods.manager().call().then(setManager);
    lottery.methods.getLastWinner().call().then(setLastWinner);
    lottery.methods.getPlayers().call().then(setPlayers);
    web3.eth.getBalance(lottery.options.address).then(setBalance);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage('Waiting on transaction success');

    try {
      await lottery.methods.enter().send({ from: account, value: web3.utils.toWei(value, 'ether') })
      setMessage('You have been entered successfully!');
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const pickWinner = async () => {
    setMessage('Waiting on transaction success');
    await lottery.methods.pickWinner().send({ from: account });
    setMessage('A winner has been picked!');
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>Hello <b>{account.toUpperCase()}</b>!</p>
      <p>This contract is managed by <b>{manager.toUpperCase()}</b></p>
      <p><b>Last winner: {lastWinner.toUpperCase()}</b></p>
      <p>There are currently <b>{players.length}</b> people entered, competing to win <b>{web3.utils.fromWei(balance, 'ether')} ether!</b></p>

      <hr />

      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={event => setValue(event.target.value)}
            type="number"
          />
        </div>

        <button>Enter</button>
      </form>

      <hr />

      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinner}>Pick a winner!</button>

      <hr />

      <h1>{message}</h1>
    </div>
  );
}

export default App;
