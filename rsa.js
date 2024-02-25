// CODE WORKS WITH UPPERCASE ONLY AND SPACES, LOWER CASES WILL RESULT IN WRONG OUTPUTS

function ipgcd(a, b) {
    let a1 = 1;
    let b2 = 1;
    let a2 = 0;
    let z = 0;
    let a3 = b;
    let b3 = a;
    let t1;
    let t2 = 0;
    let t3;
    let b1 = 0;

    while (b3 !== 1 && b3 > 1) {
        z = Math.floor(a3 / b3);
        t1 = a1 - z * b1;
        t2 = a2 - z * b2;
        t3 = a3 - z * b3;
        a1 = b1;
        a2 = b2;
        a3 = b3;
        b1 = t1;
        b2 = t2;
        b3 = t3;
    }
    if (b3 === 0) {
        return 'pas inverse';
    }
    return (b2 + b) % b;
}
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
function stringToCharCodeArray(text) {
    return text.split('').map((char) => {
        if (char === ' ') {
            return char;
        }
        return char.charCodeAt(0) - 64;
    });
}
function charCodeArrayToString(charCodeArray) {
    return charCodeArray
        .map((char) => {
            if (char === ' ') {
                return char;
            }
            return String.fromCharCode(char + 64);
        })
        .join('');
}
function isPrime(number) {
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}
function encryption(e, n, text) {
    const charCodeArray = stringToCharCodeArray(text);
    const result = [];
    for (let i = 0; i < charCodeArray.length; i++) {
        if (charCodeArray[i] === ' ') {
            result.push(' ');
        } else {
            result.push(charCodeArray[i] ** e % n);
        }
    }
    return result;
}
function decryption(d, n, encryptedArray) {
    const result = [];
    for (let i = 0; i < encryptedArray.length; i++) {
        if (encryptedArray[i] === ' ') {
            result.push(' ');
        } else {
            result.push(encryptedArray[i] ** d % n);
        }
    }
    return result;
}
function main() {
    const p = 11;
    const q = 3;
    const eArray = [];
    if (!(isPrime(p) && isPrime(q))) {
        console.log("P or Q isn't prime");
        return;
    }
    const n = q * p;
    const phiN = (q - 1) * (p - 1);
    for (let i = 2; i < phiN; i++) {
        if (isPrime(i) && gcd(i, phiN) === 1 && i > 3 && i < phiN) {
            eArray.push(i);
        }
    }
    const d = ipgcd(eArray[0], phiN);
    console.log(`Q: ${q}, P: ${p}, N: ${n}, PhiN: ${phiN}`);
    console.log(`Possible e values: ${eArray}`);
    console.log(`Chosen public exponent (e): ${eArray[0]}`);
    console.log(`Calculated private exponent (d): ${d}`);
    console.log(`Public key is: (${eArray[0]},${n})`);
    console.log(`Private key is: (${d},${n})`);

    const plaintext = 'FARIDA IS GREAT TEACHER :SMILEYFACE:';
    const encrypted = encryption(eArray[0], n, plaintext);
    console.log(`Encrypted: ${encrypted}, ${charCodeArrayToString(encrypted)}`);

    const decrypted = decryption(d, n, encrypted);
    console.log(`Decrypted: ${decrypted}, ${charCodeArrayToString(decrypted)}`);
}

main();
