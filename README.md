# AES and RSA Encryption Example between Two Parties

This project demonstrates how to encrypt a message using AES and then encrypt the AES key using RSA. 

The example involves two parties, Ana and Bob, where Ana sends an encrypted message to Bob. 

The message is encrypted with AES, and the AES key is encrypted with Bob's public key. 

Bob then decrypts the AES key with his private key and uses it to decrypt the message.

## Prerequisites

- Node.js (I'm using Node v18.0.0)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
  ```sh
  git clone <repository-url>
  cd <repository-directory>
  ```

2. Install the dependencies:
  ```sh
  npm install
  ```

## Usage

1. Run the script:
  ```sh
  node index.js
  ```

2. The script will generate RSA key pairs for Ana and Bob, encrypt a message from Ana to Bob, and then decrypt the message using Bob's private key. The output will be displayed in the console.

## Example Output

```sh
Ana public key:
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----

Ana private key:
-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----

Bob public key:
-----BEGIN PUBLIC KEY-----
...
-----END PUBLIC KEY-----

Bob private key:
-----BEGIN PRIVATE KEY-----
...
-----END PRIVATE KEY-----

Encrypted data: {
  encryptedMessage: '...',
  encryptedAESKey: '...'
}

Decrypted message: Hi Bob! How are you! I hope you're doing just fine!
```

## Explanation

1. **Key Generation**: Both Ana and Bob generate their own RSA key pairs.
2. **Message Encryption**: Ana encrypts the message using an AES key and then encrypts the AES key using Bob's public key.
3. **Message Decryption**: Bob decrypts the AES key using his private key and then decrypts the message using the AES key.

## Security Considerations

- In a real-world scenario, the public key should be fetched from a trusted server, and the private key should be stored securely.
- Ensure that the private keys are never exposed or logged in production environments.

## Dependencies

- `crypto-js`: For AES encryption and decryption.
- `node-forge`: For RSA key generation and encryption/decryption.

