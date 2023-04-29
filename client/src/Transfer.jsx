import { useState } from "react";
import server from "./server";
import {recoverKey, signMessage} from "./cryptonuske.js";
import {toHex} from "ethereum-cryptography/utils";

function Transfer({ senderPrivateKey, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    // sign message
    const msg = JSON.stringify({
      amount: parseInt(sendAmount),
      recipient,
    })
    const [_signature, recoveryBit] = await signMessage(senderPrivateKey, msg)
    const signature = toHex(_signature);
    console.log( 'msg' , msg, signature, recoveryBit)

    try {

      const r = await recoverKey(msg, signature, recoveryBit)
      console.log('r', r)
      const res = await server.post(`send`, {msg: msg, signature: signature, recoveryBit: recoveryBit});
      console.log(res)



      setBalance(res.data.balance);
    } catch (ex) {
      console.error(ex)
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
