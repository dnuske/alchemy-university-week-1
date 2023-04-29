import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import TransferSigned from "./TransferSigned.jsx";


function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setAddress={setAddress}
        address={address}
      />
      {/*<Transfer setBalance={setBalance} senderPrivateKey={privateKey} />*/}
      <TransferSigned setBalance={setBalance} />
    </div>
  );
}

export default App;
