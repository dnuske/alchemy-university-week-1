import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import * as secp from "ethereum-cryptography/secp256k1";

export function hashMessage(message) {
    const r = utf8ToBytes(message);
    const hash = keccak256(r)
    console.log(hash)
    return hash;
}

// this funcion returns signed hash and recovery bit
// const [sig, recoveryBit] = await signMessage('hello world');
export async function signMessage(privateKey, msg) {
    const hash = hashMessage(msg);
    const signed = secp.sign(hash, privateKey, {recovered: true});
    console.log(signed)
    return signed;
}

// this function returns the public key (aka the address) from a signed mesage-hash-recoveryBit
export async function recoverKey(message, signature, recoveryBit) {
    // message.then((m) => console.log)
    const hm = hashMessage(message);
    console.log(" --- hm ", typeof message, typeof hm, message, hm)

    return secp.recoverPublicKey(hm, signature, recoveryBit)
}
