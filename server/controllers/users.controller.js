const UsersRepository = require("./../repositories/Users.repository");
const usersRepository = new UsersRepository();
const { isValidObjectId } = require("./../validators/mongoId.validator");
const registerValidator = require("./../validators/user.validator");
const bcrypt = require("bcrypt");

exports.usersController = {
  async getUsers(req, res, next) {
    const data = await usersRepository.find();
    if (!data) throw new Error({ message: "No Users Found", status: 404 });
    res.status(200).json(data);
  },

  async getUser(req, res, next) {
    if (!req.params || !isValidObjectId(req.params.id)) {
      throw new Error("User id not incorrect");
    }
    const { id } = req.params;
    const data = await usersRepository.retrieve(id);
    if (!data) throw new Error("User not found...");
    res.status(200).json(data);
  },

  async createUser(req, res, next) {
    if (!req.body) throw new Error("User details not sent...");

    const isValid = registerValidator(req.body);
    if (isValid[0]?.message) {
      throw new Error(isValid[0].message);
    }

    let { body: User } = req;
    const existuser = await usersRepository.retrieveEmail(User.email);
    if (existuser) throw new Error("Email exist");

    const hashedPassword = await privateHashPassword(User.password);
    User = { ...User, password: hashedPassword };
    console.log(User);
    const data = await usersRepository.create(User);
    res.status(201).json({ data });
  },

  async updateUser(req, res, next) {
    if (
      !req.body ||
      !req.params ||
      !req.body.password ||
      !isValidObjectId(req.params.id)
    )
      throw new Error("User details incorrect...");
    let {
      body: User,
      params: { id },
    } = req;
    User = { ...User, password: await privateHashPassword(User.password) };
    const data = await usersRepository.update(id, User);
    if (!data) throw new Error("Unable to update user...");
    res.status(201).json(data);
  },

  async removeUser(req, res, next) {
    if (!req.params || !isValidObjectId(req.params.id))
      throw new Error("User details not sent...");
    const { id } = req.params;
    const data = await usersRepository.delete(id);
    if (!data) throw new Error("Unable to delete user from db...");
    res.status(200).json(data);
  },
};

const privateHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};
