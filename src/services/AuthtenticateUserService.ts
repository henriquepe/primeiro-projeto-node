import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

export default class AuthtenticateUserService {
  public async execute({ email, password }: Request): Promise<void> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error(
        'This user not exists, incorrect email/password combination'
      );
    }

    // user.password = senha criptografada lá do banco de dados
    // password lá dos parâmetros = senha não-criptografada enviada pelo usuário.

    const passwordMatched = compare(password, user.password);

    if (!passwordMatched) {
      throw new Error(
        'This user not exists, incorrect email/password combination'
      );
    }
  }
}
