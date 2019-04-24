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
  },
  ERROR_ARGUMENTS: {
    code: 1,
    message: '错误的参数',
    key: 'ERROR_ARGUMENTS'
  }
}
let userMessage = {
  EMAIL_USED: {
    code: 100,
    message: '邮箱已经注册',
    key: 'EMAIL_USED'
  },
  EMAIL_ERROR: {
    code: 101,
    message: '邮箱错误',
    key: 'EMAIL_ERROR'
  }
}

let resConstant = {
  ...systemMessage,
  ...userMessage
}

module.exports = resConstant;