import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex } from 'ethereum-cryptography/utils';

function Wallet({ privateKey, setAddress, address, setPrivateKey, balance, setBalance }) {
  async function onChange(evt) {
    const pk = evt.target.value;
    setPrivateKey(pk);
    let _address
    try{
      _address = toHex(secp.getPublicKey(pk));
    } catch (e) {
      // console.error(e);
      setAddress('');
      setBalance(0);
      return;
    }
    setAddress(_address);
    if (_address) {
      const {
        data: { balance },
      } = await server.get(`balance/${_address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        PK
        <input
          placeholder="not your private keys not your cryptos, but give it to me 👹"
          value={privateKey}
          onChange={onChange}
        >
        </input>
      </label>
      <input value={address} />
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
