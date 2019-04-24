let ResConstant = require('./ResConstant');

class ErrorHandler {
  handle(errKey) {
    if (ResConstant[errKey]) {
      return ResConstant[errKey];
    }
    return false;
  }
}

module.exports = new ErrorHandler();