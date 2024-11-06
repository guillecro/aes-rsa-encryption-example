/** 
 * This is a test case of encrypting a message with AES and encrypting the AES key with RSA.
 * Ana sends a encrypted message to Bob, the message was encrypted with AES and the AES key was encrypted with Bob's public key.
 * Bob decrypts the AES key with his private key and then decrypts the message with the AES key.
 * 
 * In the example, Ana uses Bob's public key to encrypt the AES key, and Bob uses his private key to decrypt the AES key.
 * 
 * This is a simple example, in a real world scenario, the public key should be fetched from a server 
 * and the private key should be stored securely.
 * 
 */

import CryptoJS from "crypto-js";
import forge from "node-forge";


class Person {
  constructor() {
    var pki = forge.pki;
    var rsa = forge.pki.rsa;
    
    var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});
    var pubKeyPEM = pki.publicKeyToPem(keypair.publicKey);
    var privKeyPEM = pki.privateKeyToPem(keypair.privateKey);

    this.publicKey = pubKeyPEM;
    this.privateKey = privKeyPEM;
  }

  getPublicKey() {
    return this.publicKey;
  }

  getPrivateKey() {
    return this.privateKey;
  }
}


// =======================================================

// ORIGINAL ENCRYPT MESSAGE FUNCTION
// ----------------------------------
// Encrypt a message with AES and encrypt the AES key with the recipient's public key
export async function encryptMessage(message, recipientPublicKey) {
  // Generate AES key (128-bit)
  const aesKey = forge.random.getBytesSync(16);
  const aesKeyHex = forge.util.bytesToHex(aesKey); // Convert to hex string
  
  // Encrypt the message with AES key
  const encryptedMessage = CryptoJS.AES.encrypt(message, aesKeyHex).toString();

  // Convert recipient public key PEM to forge object
  const publicKey = forge.pki.publicKeyFromPem(recipientPublicKey);

  // Encrypt AES key with recipient's public key (RSA)
  const encryptedAESKey = forge.util.encode64(publicKey.encrypt(aesKey));

  return {
    encryptedMessage,
    encryptedAESKey,
  };
}

// ORIGINAL DECRYPT MESSAGE FUNCTION
// ----------------------------------
// Decrypt a message by first decrypting the AES key using the private RSA key
// export async function decryptMessage(encryptedMessage, encryptedAESKey) {
//   const privateKeyPem = await getPrivateKey();
//   if (!privateKeyPem) throw new Error("Private key not found");

//   // Convert private key PEM to forge object
//   const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

//   // Decrypt AES key using RSA private key
//   const aesKey = privateKey.decrypt(forge.util.decode64(encryptedAESKey));
//   const aesKeyHex = forge.util.bytesToHex(aesKey); // Convert to hex string

//   // Decrypt message using AES key
//   const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, aesKeyHex).toString(CryptoJS.enc.Utf8);

//   return decryptedMessage;
// }

//Decrypt a message by first decrypting the AES key using the private RSA key
export async function decryptMessage(encryptedMessage, encryptedAESKey, myPrivateKey) {
  // const privateKeyPem = await getPrivateKey();
  const privateKeyPem = myPrivateKey;
  if (!privateKeyPem) throw new Error("Private key not found");

  // Convert private key PEM to forge object
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

  // Decrypt AES key using RSA private key
  const aesKey = privateKey.decrypt(forge.util.decode64(encryptedAESKey));
  const aesKeyHex = forge.util.bytesToHex(aesKey); // Convert to hex string

  // Decrypt message using AES key
  const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, aesKeyHex).toString(CryptoJS.enc.Utf8);

  return decryptedMessage;
}

// =======================================================

const ana = new Person();
const bob = new Person();

console.log('Ana public key:\n', ana.getPublicKey());
console.log('Ana private key:\n', ana.getPrivateKey());

console.log('Bob public key:\n', bob.getPublicKey());
console.log('Bob private key:\n', bob.getPrivateKey());

// Ana sends a message to Bob
const message = "Hi Bob! How are you! I hope you're doing just fine!";
// Ana encrypts the message and sends it to Bob using Bob's public key
const encryptedData = await encryptMessage(message, bob.getPublicKey());
console.log('Encrypted data:', encryptedData);

// Bob receives the message and decrypts it
const decryptedMessage = await decryptMessage(encryptedData.encryptedMessage, encryptedData.encryptedAESKey, bob.getPrivateKey());
console.log('Decrypted message:', decryptedMessage);
