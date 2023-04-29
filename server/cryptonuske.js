const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex} = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");

function hashMessage(message) {
    const r = utf8ToBytes(message);
    const hash = keccak256(r)
    // console.log(hash)
    return hash;
}

// this funcion returns signed hash and recovery bit
// const [sig, recoveryBit] = await signMessage('hello world');
async function signMessage(privateKey, msg) {
    const hash = hashMessage(msg);
    const signed = secp.sign(hash, privateKey, {recovered: true});
    // console.log(signed)
    return signed;
}

// this function returns the public key (aka the address) from a signed mesage-hash-recoveryBit
async function recoverKey(message, signature, recoveryBit) {
    const hm = hashMessage(message);
    return toHex(secp.recoverPublicKey(hm, signature, recoveryBit));
}

// function verifySignature(signature, message, public
// const isValidSignature = secp.verify(signature, toHex(hashMessage(message)), publicKey);
module.exports = {
    hashMessage,
    signMessage,
    recoverKey
}