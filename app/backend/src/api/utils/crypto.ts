import { hash, compare } from 'bcryptjs';

const hashPassword = async (password: string): Promise<string> => {
  const hashed = await hash(password, 10);
  return hashed;
};

export const decodeHash = async (passToCompare: string, hashPass: string): Promise<boolean> => {
  const pass = await compare(passToCompare, hashPass);
  return pass;
};

export default hashPassword;
