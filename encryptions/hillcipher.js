function egcd(a, b) {
    let a1 = 1;
    let b2 = 1;
    let a2 = 0;
    let q = 0;
    let a3 = b;
    let b3 = a;
    let t1;
    let t2 = 0;
    let t3;
    let b1 = 0;

    while (b3 !== 1 && b3 > 1) {
        q = Math.floor(a3 / b3);
        t1 = a1 - q * b1;
        t2 = a2 - q * b2;
        t3 = a3 - q * b3;
        a1 = b1;
        a2 = b2;
        a3 = b3;
        b1 = t1;
        b2 = t2;
        b3 = t3;
    }
    if (b3 == 0) {
        return 'pas inverse';
    }
    return (b2 + 26) % 26;
}

function loggy(TextVector, keyMatrix, cipheredSequence, plainSequence) {
    console.log(
        'Text Vector: ',
        TextVector,
        '\n',
        'Key Matrix: ',
        keyMatrix,
        '\n',
        'Ciphered Sequence :',
        cipheredSequence,
        '\n',
        'Decrypted Sequence :',
        plainSequence,
    );
}
function matrixToAscii(matrix) {
    const asciiMatrix = [];
    let asciiValue = 0;
    for (let i = 0; i < matrix.length; i++) {
        const row = [];
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] <= 90) {
                asciiValue = matrix[i][j] + 65;
            } else if (matrix[i][j] >= 97) {
                asciiValue = matrix[i][j] + 97;
            }
            const asciiChar = String.fromCharCode(asciiValue);
            row.push(asciiChar);
        }
        asciiMatrix.push(row);
    }

    return asciiMatrix;
}

function calcInverse(keyMatrix) {
    const det =
        keyMatrix[0][0] * keyMatrix[1][1] - keyMatrix[0][1] * keyMatrix[1][0];
    const invertedMatrix = [
        [keyMatrix[1][1], (-keyMatrix[0][1] + 26) % 26],
        [(-keyMatrix[1][0] + 26) % 26, keyMatrix[0][0]],
    ];
    const invertedDet = egcd(det, 26);
    const flatMapped = invertedMatrix
        .flat()
        .map((el) => (el * invertedDet + 26) % 26);

    const invertedKeyMatrix = [flatMapped.slice(0, 2), flatMapped.slice(2, 4)];
    return invertedKeyMatrix;
}

function fixParams(key, text, m) {
    const TextVector = Array.from({ length: Math.round(text.length / m) }, () =>
        Array(m).fill(0),
    );
    const keyMatrix = Array.from({ length: m }, () => Array(m).fill(0));
    const cipherMatrix = Array(m).fill(0);
    let k = 0;
    let temp = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            temp = key[k].charCodeAt(0);
            if (temp <= 90) {
                keyMatrix[i][j] = temp % 65;
            } else if (temp >= 97) {
                keyMatrix[i][j] = temp % 97;
            }
            k++;
        }
    }
    const invertedMatrix = calcInverse(keyMatrix);
    let e = 0;
    for (let i = 0; i < TextVector.length; i++) {
        for (let j = 0; j < m; j++) {
            if (!text[e]) {
                text += 'x';
            }
            temp = text[e].charCodeAt(0);
            if (temp <= 90) {
                TextVector[i][j] = temp % 65;
            } else if (temp >= 97) {
                TextVector[i][j] = temp % 97;
            }
            e++;
        }
    }
    return { keyMatrix, cipherMatrix, TextVector, invertedMatrix };
}

function encrypt(TextVector, keyMatrix, cipherMatrix) {
    for (let i = 0; i < keyMatrix.length; i++) {
        cipherMatrix[i] = 0;
        for (let j = 0; j < TextVector.length; j++) {
            cipherMatrix[i] += keyMatrix[i][j] * TextVector[j];
        }
        cipherMatrix[i] %= 26;
    }
}

function decrypt(cipheredSequence, invertedMatrix, plainSequence) {
    for (let i = 0; i < invertedMatrix.length; i++) {
        plainSequence[i] = 0;
        for (let j = 0; j < cipheredSequence.length; j++) {
            plainSequence[i] += invertedMatrix[i][j] * cipheredSequence[j];
        }
        plainSequence[i] %= 26;
    }
}

function HillCipher(text, m, key) {
    let cipheredSequence = [];
    const plainMatrix = [];
    let plainSequence = [];
    let { keyMatrix, cipherMatrix, TextVector, invertedMatrix } = fixParams(
        key,
        text,
        m,
    );
    for (let i = 0; i < TextVector.length; i++) {
        encrypt(TextVector[i], keyMatrix, cipherMatrix);
        cipheredSequence.push([...cipherMatrix]);
    }
    for (let i = 0; i < cipheredSequence.length; i++) {
        decrypt(cipheredSequence[i], invertedMatrix, plainMatrix);
        plainSequence.push([...plainMatrix]);
    }

    TextVector = matrixToAscii(TextVector);
    cipheredSequence = matrixToAscii(cipheredSequence);
    plainSequence = matrixToAscii(plainSequence);
    loggy(TextVector, keyMatrix, cipheredSequence, plainSequence);
}

HillCipher('pouvoir', 2, 'JEFH');

/* CODE STILL NEEDS MORE IMPROVEMENTS REGARDING CASE SENSITIVITY OTHER THAN THAT EVERYTHING WORKS */
