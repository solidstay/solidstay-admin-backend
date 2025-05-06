const CryptoJS = require('crypto-js')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

const decryptData = (encryptedText) => {
    try {
        // Split the encrypted text to get the IV and ciphertext
        const parts = encryptedText.split(':');
        const iv = CryptoJS.enc.Hex.parse(parts[0]);
        const ciphertext = CryptoJS.enc.Base64.parse(parts[1]);

        // Decrypt the data
        const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, CryptoJS.enc.Hex.parse(ENCRYPTION_KEY), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.log('Error in decryption: ', error);
        const newError = new Error('Failed to decrypt data!');
        newError.code = 400;
        throw newError;
    }
};

module.exports = { decryptData };
