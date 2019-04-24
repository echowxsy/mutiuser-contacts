let systemMessage = { //code range(-1,9)
  SYSTEM_SUCCESS: {
    code: 0,
    message: '请求成功',
    key: 'SYSTEM_SUCCESS'
  },
  SYSTEM_ERROR: {
    code: -1,
    message: '系统异常',
    key: 'SYSTEM_ERROR'
  }
}

let resConstant = {
  ...systemMessage,
}

module.exports = resConstant;