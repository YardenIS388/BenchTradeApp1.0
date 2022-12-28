const jwt = require("jsonwebtoken");
const usersRepository = require("../repositories/utils/userRepo.object");
const bcrypt = require("bcrypt");
const { isEmail } = require("./../validators/email.validator");
const { BodyNotSent } = require("./../errors/BadRequest.errors");
const {
  MissingPropertyError,
  RegisterError,
} = require("./../errors/validation.errors");

exports.authController = {
  login: async (req, res) => {
    if (!req.body) throw new BodyNotSent();
    if (!req.body.email) throw new MissingPropertyError("email");
    if (!req.body.password) throw new MissingPropertyError("password");

    const { email, password } = req.body;
    const existingUser = await usersRepository.retrieveByEmail(email);
    if (!existingUser) throw new RegisterError();

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) throw new RegisterError();
    const user = { email: existingUser.email, fullName: existingUser.fullName };
    const token = generateToken(user);
    res.status(200).json({ token });
  },
};

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, fullName: user.fullName, email: user.email },
    process.env.JWT_SECRET
  );
  return token;
};