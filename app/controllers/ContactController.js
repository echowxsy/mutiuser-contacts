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

}

module.exports = new ContactController();