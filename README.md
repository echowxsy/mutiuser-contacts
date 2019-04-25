# MutiUser Contacts 项目

这是一个多用户通讯录系统的后端Demo

## 安装部署

### 环境依赖

- Mysql
- Node.js

### 部署

```bash
git clone https://github.com/Echowxsy/mutiuser-contacts.git
cd mutiuser-contacts
//docker run --name mysql -d -e MYSQL_ROOT_PASSWORD=root -p 3306:3306  mysql:5.6
npm install
npm run test
npm run start
```

### Docker方式

```bash
//启动
docker-compose up -d
//关闭
docker-compose down
```

访问[http://localhost:3002/v1/](http://localhost:3002/v1/)

### API

使用`npm run doc`生成文档或参考`Postman`
[Postman collections](https://www.getpostman.com/collections/78b93eecede739b8d284)

## 目标

### 功能目标

- [x] 用户通过有效邮箱注册，注册完成可以拥有自己的通讯录服务
- [x] 通讯录条目内容为(姓名，电话号码，生日/年龄)
- [x] 用户可以创建通讯录分组
- [x] 用户可以添加，修改和删除通讯录条目
- [x] 支持各个条件的模糊查询

### 技术目标

- [x] 使用任一Node.js主流框架
- [x] 使用 Restful API
- [x] 用户登录成功后需要JWT控制访问
- [x] 需要使用主流数据库存储数据(包括mongodb)
- [ ] 需要附上完整的项目和环境搭建说明文档

### 额外目标

- [x] 有完整和嚴密的錯誤處理和提示
- [x] 有完整的Unit Test代碼
- [x] 代碼規範，架構清晰，文件分組合理
- [x] 有cache機制  
- [x] 使用Docker或Docker Compose
- [x] 對涉及到用戶的敏感信息有加密

## 项目分析

业务部分并不复杂，难点体现在模糊查询部分，针对个人通讯录，平均条目数可以认为200人（参考微信好友平均数）。因此我们可以将用户的通讯录加载进内存中进行搜索。
技术目标中没有难点。
额外目标中，cache机制可以分两级，一个是针对mysql的缓存，一个是针对请求的缓存。

## 项目计划

- [x] 创建项目框架，使用koa2
- [x] 实现用户登录注册（增删查改）以及权限管理（JWT认证）
- [x] 实现通讯录的增删查改
- [x] 实现分组的增删查改
- [x] 完善单元测试与接口测试
- [x] 实现打包部署
