# ripple-vanity
Simple node.js script to create Ripple "vanity" wallets.  These are secp256k1 public/private key pairs, where the public key encodes to a base58 address containing a search string.

Eg, `ripp1eB4QF5dxUpL7H3CGmQaZEAiKHsPo5`

Uses the Ripple-developed `ripple-keypairs` module and has no other dependencies.

On a standard circa-2017 laptop (i7 2.4Ghz), finding a wallet containing a three-character search string will usually take fewer than 10,000 attempts and less than a minute using one core. It's possible to run multiple instances of the script to utilise more cores simultaneously. (Note that each additional character in the search string may take around 58 times longer than the previous benchmark.)

Dependencies:   
`npm install ripple-keypairs`

Usage:  
`node vanity-ripple.js <search-string> <number-of-attempts>`  
`node vanity-ripple.js xrp 100000`  

String format:   
`<search-string>` may be comprised of any of these characters:  
`123456789 ABCDEFGH JKLMN PQRSTUVWXYZabcdefghijk mnopqrstuvwxyz`  

(Note: `0`, `I`, `O` and `l` are excluded, as per [base58](https://en.wikipedia.org/wiki/Base58) convention.)
