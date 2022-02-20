const jwt = require('jsonwebtoken');

const SECRET = "secret";

function encodeData(data) {
    const encoded = jwt.sign(
        data,
        SECRET
    );
    return encoded;
}

function decodedData(encodedData) {
    const data = jwt.verify(
        encodedData,
        SECRET
    );
    return data;
}

module.exports = {
    encodeData,
    decodedData
}