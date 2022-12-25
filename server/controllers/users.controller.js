const UsersRepository = require("./../repositories/Users.repository");
const usersRepository = new UsersRepository();
const { isValidObjectId } = require("./../validators/mongoId.validator");
const registerValidator = require("./../validators/user.validator");
const bcrypt = require("bcrypt");
const { PropertyExist, BodyNotSent } = require("../errors/BadRequest.errors");
const {
  MissingPropertyError,
  InvalidProperty,
  ValidationError,
} = require("../errors/validation.errors");
const {
  EntityNotFound,
  PropertyNotFound,
} = require("../errors/NotFound.errors");
const { ServerUnableError } = require("../errors/internal.errors");

exports.usersController = {
  async getUsers(req, res, next) {
    const data = await usersRepository.find();
    if (!data) throw new EntityNotFound("Users");
    res.status(200).json(data);
  },

  async getUser(req, res, next) {
    if (!req.params) throw new MissingPropertyError("ID");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    const { id } = req.params;
    const data = await usersRepository.retrieve(id);
    if (!data) throw new EntityNotFound("User");
    res.status(200).json(data);
  },

  async createUser(req, res, next) {
    if (!req.body) throw new BodyNotSent();

    const isValid = registerValidator(req.body);
    if (isValid[0]?.message) {
      throw new ValidationError(isValid[0].message);
    }

    let { body: User } = req;
    const existuser = await usersRepository.retrieveEmail(User.email);
    if (existuser) throw new PropertyExist("Email");

    const hashedPassword = await privateHashPassword(User.password);
    User = { ...User, password: hashedPassword };
    const data = await usersRepository.create(User);
    res.status(201).json({ data });
  },

  async updateUser(req, res, next) {
    if (!req.body) throw new BodyNotSent();
    if (!req.params.id) throw new MissingPropertyError("ID");
    if (!req.body.password) throw new MissingPropertyError("Password");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    let {
      body: User,
      params: { id },
    } = req;
    User = { ...User, password: await privateHashPassword(User.password) };
    const data = await usersRepository.update(id, User);
    if (!data) throw new ServerUnableError("update");
    res.status(201).json(data);
  },

  async removeUser(req, res, next) {
    if (!req.params) throw new BodyNotSent();
    if (!req.params.id) throw new MissingPropertyError("ID");
    if (!isValidObjectId(req.params.id)) throw new InvalidProperty("ID");

    const { id } = req.params;
    const data = await usersRepository.delete(id);
    if (!data) throw new ServerUnableError("delete");
    res.status(200).json(data);
  },
};

const privateHashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};
