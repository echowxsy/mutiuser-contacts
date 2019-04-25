let process = require('process');

let JsonWebToken = {
  scret: process.env.JWT_SCRET ? process.env.JWT_SCRET : 'test_scret',
  expiresIn: '2h',
  notBefore: '2h',
};

module.exports = JsonWebToken;