import { useState } from "react";
import server from "./server";
import {recoverKey, signMessage} from "./cryptonuske.js";
import {toHex} from "ethereum-cryptography/utils";

function TransferSigned({ setBalance }) {
  const [messageBlob, setMessageBlob] = useState("");

const setValue = (setter) => (evt) => setter(evt.target.value);
  async function transfer(evt) {
    evt.preventDefault();

    try {

      console.log(' ---- -r', messageBlob)
      const res = await server.post(`send`, JSON.parse(messageBlob));
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
        set message blob
        <input
          placeholder="1, 2, 3..."
          value={messageBlob}
          onChange={setValue(setMessageBlob)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default TransferSigned;
