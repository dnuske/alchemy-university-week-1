const express = require("express");
const app = express();
const cors = require("cors");
const {recoverKey} = require("./cryptonuske");
const {toHex} = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

// 1
// private key: ec2669be9b90ddb08c5e1122d22431d72253fbfe1dd7c9c75de1b0cf247b75d8
// public key(address): 046e4fb547fab0f8eeb5e4929079ac17a6365a81cc7b3f946d3b151d0e5d861c9c8482975c6627bd8d167568c1885a024227e68d57c4d2945843ccf4783dc716a0
// 2
// private key: 72372531eb1d6fbf9f1095e3d4df310520567546854abdabedbdf6c1817bf1b0
// public key (address): 047595f9b5310d0fd976dfd16d1a57a7cf296edfd28b2a4c587c3b080b091faa248c43ecf93e6af8e79b92185b4d90988a17e0112407aaba2ce6faff2ca7019bff
// 3
// private key: 96ee71f146aa5312eb08a0f0385ccab48300bddd50f393131754e3291dbedffb
// public key(address): 04b44adbefd12cec168a9d65cd19118c79c78070688252d8e17ea22b9e211240a155b5e6d9beb7d5b48104e0534bb886dcb96f9c99dede4f875f3d718e8c86b4e7

const balances = {
  "046e4fb547fab0f8eeb5e4929079ac17a6365a81cc7b3f946d3b151d0e5d861c9c8482975c6627bd8d167568c1885a024227e68d57c4d2945843ccf4783dc716a0": 100,
  "047595f9b5310d0fd976dfd16d1a57a7cf296edfd28b2a4c587c3b080b091faa248c43ecf93e6af8e79b92185b4d90988a17e0112407aaba2ce6faff2ca7019bff": 50,
  "04b44adbefd12cec168a9d65cd19118c79c78070688252d8e17ea22b9e211240a155b5e6d9beb7d5b48104e0534bb886dcb96f9c99dede4f875f3d718e8c86b4e7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature

  let recipient;
  let sender;
  let amount;

  // const { sender, recipient, amount } = req.body;
  const { msg, signature, recoveryBit } = req.body;
  const parsedMsg = JSON.parse(msg);

  recipient = parsedMsg.recipient;
  amount = parsedMsg.amount;

  console.log(" --- ", typeof msg, typeof signature, typeof recoveryBit)
  recoverKey(msg, signature, recoveryBit)
    .then((pubk) => {
      sender = pubk;
      console.log(`
      
      pubk ${pubk}
      
      `)

      setInitialBalance(sender);
      setInitialBalance(recipient);



      if (balances[sender] < amount) {
        console.log(" transacción exitosa ")
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        console.warn(" falta balance ")
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
      }
    })
    .catch((e) => {
      console.error(e)
      res.status(500).send({ message: "quien te conoce" });
    })

});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
