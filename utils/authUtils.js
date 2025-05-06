const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME;

const hashPassword = async (password) => {
    let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return hashedPassword;
};

const comparePassword = async (storedPassword, password) => {
    let passwordMatch = await bcrypt.compare(password, storedPassword);

    return passwordMatch;
};

const createAccessToken = (payload) => {
    let token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
    });
    return token;
};

const createRefreshToken = (payload) => {
    let token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY_TIME,
    });
    return token;
};

const verifyRefreshToken = (token) => {
    try {
        const payload = jwt.verify(token, REFRESH_TOKEN_SECRET);
        return payload;
    } catch (err) {
    }
};

const verifyAccessToken = (token) => {
    try {
        const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return payload;
    } catch (err) {
    }
};

module.exports = {
    hashPassword,
    comparePassword,
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}