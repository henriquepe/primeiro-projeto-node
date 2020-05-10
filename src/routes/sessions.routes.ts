import { Router } from 'express';
import AuthtenticateUserService from '../services/AuthtenticateUserService';

// import { getCustomRepository } from 'typeorm';
// import AppointmentsRepository from '../repositories/AppointmentsRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authtenticateUser = new AuthtenticateUserService();

    await authtenticateUser.execute({
      email,
      password,
    });

    return response.send({ ok: true });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;

/*

  Conceitos de JWT -->
    O Jwt é uma metodologia para fazermos autenticação em API's de formato
    RESTFUL.

    Json Web Tocken

    POST url/sessions

    {
      "email": "anyEmail",
      "password": "anyPassword"
    }












*/
