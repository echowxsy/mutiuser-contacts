const ResConstant = require('../tools/ResConstant');
const ContactModel = require('../models/index').Contact;
const UserModel = require('../models/index').User;
const GroupModel = require('../models/index').Group;
let validator = require('validator');

class ContactController {
  constructor() {}

  async add(ctx) {
    const {
      name,
      phoneNumber,
      birthday
    } = ctx.request.body;
    if (!name || !validator.isMobilePhone(phoneNumber)) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const userId = ctx.passport.userId;
    let user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error(ResConstant.ILLEGAL_REQUEST.key);
    }
    let contact = await ContactModel.create({
      name: name,
      phoneNumber: phoneNumber,
      birthday: birthday,
    });
    await user.addContact(contact);
    ctx.returnValue(ResConstant.CONTACT_ADD_SUCCESS.key, {
      contactId: contact.id
    })
  }

  async get(ctx) {
    const userId = ctx.passport.userId;
    const user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new Error(ResConstant.ILLEGAL_REQUEST.key);
    }
    const contactList = await user.getContacts({
      include: {
        model: GroupModel,
        attributes: ['id', 'name']
      },
      attributes: ['id', 'name', 'phoneNumber', 'birthday']
    });
    const keyword = ctx.query.s;
    if (!keyword) {
      ctx.returnValue(ResConstant.CONTACT_GET_SUCCESS.key, {
        count: contactList.length,
        list: contactList
      })
    }
    const regExp = new RegExp(keyword);
    let hitList = [];
    contactList.forEach(element => {
      if (regExp.test(element.name) || regExp.test(element.phoneNumber) || regExp.test(element.birthday)) {
        hitList.push(element)
      }
    });
    ctx.returnValue(ResConstant.CONTACT_GET_SUCCESS.key, {
      count: hitList.length,
      list: hitList
    })
  }

  async put(ctx) {
    const {
      id,
      name,
      phoneNumber,
      birthday
    } = ctx.request.body;
    if (!name || !validator.isMobilePhone(phoneNumber)) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const userId = ctx.passport.userId;
    let contact = await ContactModel.findOne({
      attributes: ['id', 'name', 'phoneNumber', 'birthday'],
      where: {
        user_id: userId,
        id: id
      }
    })
    if (!contact) {
      throw new Error(ResConstant.ILLEGAL_REQUEST.key);
    }
    await contact.update({
      name,
      phoneNumber,
      birthday
    })
    ctx.returnValue(ResConstant.CONTACT_PUT_SUCCESS.key, contact)
  }

  async del(ctx) {
    const id = ctx.request.body.id;
    const userId = ctx.passport.userId;
    let contact = await ContactModel.findOne({
      where: {
        user_id: userId,
        id: id
      }
    })
    if (!contact) {
      throw new Error(ResConstant.ILLEGAL_REQUEST.key);
    }
    await contact.destroy()
    ctx.returnValue(ResConstant.CONTACT_DEL_SUCCESS.key)
  }

}

module.exports = new ContactController();