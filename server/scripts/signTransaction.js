const { toHex} = require("ethereum-cryptography/utils");
const {signMessage} = require("../cryptonuske");

async function sign(recipient, sendAmount, senderPrivateKey   ) {

  const msg = JSON.stringify({
    amount: parseInt(sendAmount),
    recipient,
  })
  const [_signature, recoveryBit] = await signMessage(senderPrivateKey, msg)
  const signature = toHex(_signature);
  // console.log( 'msg' , msg, signature, recoveryBit)
  return JSON.stringify({msg, signature, recoveryBit })
}



(async () => {
  const recipient = '046e4fb547fab0f8eeb5e4929079ac17a6365a81cc7b3f946d3b151d0e5d861c9c8482975c6627bd8d167568c1885a024227e68d57c4d2945843ccf4783dc716a0'
  const sendAmount = 25
  const senderPrivateKey = '96ee71f146aa5312eb08a0f0385ccab48300bddd50f393131754e3291dbedffb'

  const text = await sign(recipient, sendAmount, senderPrivateKey);
  console.log(text);
})();

