const a = 7;
const b = 3;

function encryptMessage(msg) {
    let cipher = '';
    for (let i = 0; i < msg.length; i++) {
        if (msg[i] !== ' ') {
            cipher += String.fromCharCode(
                ((a * (msg[i].charCodeAt(0) - 65) + b) % 26) + 65,
            );
        } else {
            cipher += msg[i];
        }
    }
    return cipher;
}

function decryptCipher(cipher) {
    let msg = '';
    let a_inv = 0;
    let flag = 0;

    for (let i = 0; i < 26; i++) {
        flag = (a * i) % 26;

        if (flag === 1) {
            a_inv = i;
        }
    }
    for (let i = 0; i < cipher.length; i++) {
        if (cipher[i] !== ' ') {
            msg += String.fromCharCode(
                ((a_inv * (cipher[i].charCodeAt(0) + 65 - b)) % 26) + 65,
            );
        } else {
            msg += cipher[i];
        }
    }
    return msg;
}

function bruteForceAttack(msg) {
    const results = [];

    for (let possibleA = 1; possibleA < 26; possibleA++) {
        let possibleAInv = 0;
        let flag = 0;

        for (let i = 0; i < 26; i++) {
            flag = (possibleA * i) % 26;

            if (flag === 1) {
                possibleAInv = i;
            }
        }

        for (let possibleB = 0; possibleB < 26; possibleB++) {
            let possibleDecrypted = '';
            for (let i = 0; i < msg.length; i++) {
                if (msg[i] !== ' ') {
                    const charCode =
                        ((possibleAInv *
                            (msg[i].charCodeAt(0) + 65 - possibleB)) %
                            26) +
                        65;
                    possibleDecrypted += String.fromCharCode(charCode);
                } else {
                    possibleDecrypted += msg[i];
                }
            }
            results.push({
                a: possibleA,
                b: possibleB,
                cipherText: encryptMessage(possibleDecrypted),
            });
        }
    }

    return results;
}

const msg = 'TRESOR';
const cipherText = encryptMessage(msg);
console.log(`Encrypted Message is: ${cipherText}`);

const decryptedText = decryptCipher(cipherText);
console.log(`Decrypted Message is: ${decryptedText}`);

const results = bruteForceAttack(cipherText);

// Print all results
results.forEach((result) => {
    console.log(`a: ${result.a}, b: ${result.b}, Cipher: ${result.cipherText}`);
});
