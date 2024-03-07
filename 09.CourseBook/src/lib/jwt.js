const util = require('util');
const jsonwebtoken = require('jsonwebtoken');

const jwt = {
    sing: util.promisify(jsonwebtoken.sign),
    verify: util.promisify(jsonwebtoken.verify),
};

module.exports = jwt;