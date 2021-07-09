import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

export const createHash = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const verifyPassword = ({ password, hash }) => {
  const isEqualPassword = bcrypt.compareSync(password, hash);

  return isEqualPassword;
};
