const ResConstant = require('../tools/ResConstant');
const GroupModel = require('../models/index').Group;
const UserModel = require('../models/index').User;
const ContactModel = require('../models/index').Contact;

class GroupController {
  constructor() {}

  async add(ctx) {
    const name = ctx.request.body.name;
    if (!name) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const userId = ctx.passport.userId;
    let user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
    let group = await GroupModel.create({
      name: name
    });
    await user.addGroup(group);
    ctx.returnValue(ResConstant.GROUP_ADD_SUCCESS.key, {
      groupId: group.id
    })
  }

  async get(ctx) {
    const userId = ctx.passport.userId;
    const user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
    const groupList = await user.getGroups({
      attributes: ['id', 'name']
    });
    ctx.returnValue(ResConstant.GROUP_GET_SUCCESS.key, {
      count: groupList.length,
      list: groupList
    })
  }

  async getContactList(ctx) {
    const groupId = ctx.params.groupId;
    if (!groupId) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const userId = ctx.passport.userId;
    const group = await GroupModel.findOne({
      attributes: ['id', 'name'],
      where: {
        user_id: userId,
        id: groupId
      }
    });
    const contactList = await group.getContacts({
      attributes: ['id', 'name', 'phoneNumber', 'birthday'],
    })
    ctx.returnValue(ResConstant.GROUP_INFO_GET_SUCCESS.key, {
      id: group.id,
      name: group.name,
      count: contactList.length,
      list: contactList
    })
  }

  async addContact(ctx) {
    const groupId = ctx.params.groupId;
    const userId = ctx.passport.userId;
    const contactId = ctx.request.body.contactId;
    if (!groupId || !contactId) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    let group = await GroupModel.findOne({
      attributes: ['id', 'name'],
      where: {
        user_id: userId,
        id: groupId
      }
    });
    const contact = await ContactModel.findOne({
      attributes: ['id', 'name', 'phoneNumber', 'birthday'],
      where: {
        user_id: userId,
        id: contactId
      }
    })
    await group.addContact(contact);
    ctx.returnValue(ResConstant.GROUP_ADD_CONTACT_SUCCESS.key)
  }

  async put(ctx) {
    const {
      id,
      name
    } = ctx.request.body;
    if (!id || !name) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const userId = ctx.passport.userId;
    let group = await GroupModel.findOne({
      attributes: ['id', 'name'],
      where: {
        user_id: userId,
        id: id
      }
    })
    await group.update({
      name
    })
    ctx.returnValue(ResConstant.GROUP_PUT_SUCCESS.key, group)
  }

  async del(ctx) {
    const groupId = ctx.request.body.id;
    const userId = ctx.passport.userId;
    let group = await GroupModel.findOne({
      where: {
        user_id: userId,
        id: groupId
      }
    });
    await group.setContacts([]);
    await group.destroy();
    ctx.returnValue(ResConstant.GROUP_DEL_SUCCESS.key)
  }

  async removeContact(ctx) {
    const groupId = ctx.params.groupId;
    const userId = ctx.passport.userId;
    const contactId = ctx.request.body.contactId;
    if (!groupId || !contactId) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    let group = await GroupModel.findOne({
      attributes: ['id', 'name'],
      where: {
        user_id: userId,
        id: groupId
      }
    });
    const contact = await ContactModel.findOne({
      attributes: ['id', 'name', 'phoneNumber', 'birthday'],
      where: {
        user_id: userId,
        id: contactId
      }
    })
    await group.removeContact(contact);
    ctx.returnValue(ResConstant.GROUP_DEL_CONTACT_SUCCESS.key)
  }
}

module.exports = new GroupController();