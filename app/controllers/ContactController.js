const ResConstant = require('../tools/ResConstant');
const ContactModel = require('../models/index').Contact;
const UserModel = require('../models/index').User;


class ContactController {
  constructor() {}

  async add(ctx) {
    const {
      name,
      phoneNumber,
      birthday
    } = ctx.request.body;
    if (!name || !phoneNumber) {
      throw new Error(ResConstant.ERROR_ARGUMENTS.key);
    }
    const userId = ctx.passport.userId;
    let user = await UserModel.findOne({
      where: {
        id: userId
      }
    });
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
    const contactList = await user.getContacts({
      attributes: ['id', 'name', 'phoneNumber', 'birthday']
    });
    ctx.returnValue(ResConstant.CONTACT_GET_SUCCESS.key, contactList)
  }

  async put(ctx) {
    const {
      id,
      name,
      phoneNumber,
      birthday
    } = ctx.request.body;
    const userId = ctx.passport.userId;
    let contact = await ContactModel.findOne({
      attributes: ['id', 'name', 'phoneNumber', 'birthday'],
      where: {
        user_id: userId,
        id: id
      }
    })
    await contact.update({
      name,
      phoneNumber,
      birthday
    })
    ctx.returnValue(ResConstant.CONTACT_PUT_SUCCESS.key, contact)
  }
}

module.exports = new ContactController();